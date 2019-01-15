import { IMiddleware } from "../DotType.WebServer/Interfaces/IMiddleware";
import { Exception } from "../DotType/Exception";
import { Console } from "../DotType/Console";
import { IHttpContext } from "../DotType.Hosting/Interfaces/IHttpContext";
import { Check } from "../DotType/Check";
import { WebApplication } from "../DotType.Hosting/WebApplication";
import { ParsedUrl } from "../DotType.Routing/ParsedUrl";
import { RouteData } from "./RouteData";
import { Functions } from "../DotType/Functions";
import { ActionContext } from "./ActionContext";
import { ActionResult } from "./Results/ActionResult";
import "./Extensions/DotType.Mvc.IHttpContextExtensions";
import "../DotType/Extensions/DotType.StringExtensions"
import { StatusCodes } from "../DotType.Http/StatusCodes";

export class MvcWebServerMiddleware implements IMiddleware
{
    public readonly Name: string = "DotType Mvc parser";
    public readonly Version: string = "0.0.1-beta";
    public Order: number = 0;

    /** Gets or sets the WebApplication that this middleware is using. */
    public WebApplication: WebApplication;

    /**
     * Initializes a new instance of {MvcWebServerMiddleware} class.
     * @param webApplication The hosted WebApplication class.
     */
    constructor(webApplication: WebApplication)
    {
        Check.IsNullOrUndefined(webApplication);
        this.WebApplication = webApplication;
    }
    
    public async OnRequestAsync(httpContext: IHttpContext, caller: IMiddleware): Promise<void>
    {
        //Skipping browsers favicon.ico calls.
        if(httpContext.Request.Url === "/favicon.ico")
        {
            return;
        }
        var parsedUrl = await ((caller as MvcWebServerMiddleware).WebApplication as WebApplication).RouteEngine.ParseUrlAsync(httpContext.Request.Url);
        if(parsedUrl == null)
        {
            return;
        }
        
        httpContext.RouteData = await this.CreateRouteDataAsync(parsedUrl);
        var controllerImport = await import("../../Controllers/" + httpContext.RouteData.ControllerName);
        var controllerObject = new controllerImport[Object.keys(controllerImport)[0]];

        if(controllerObject.HttpMethod)
        {
            if(httpContext.Request.Method !== controllerObject.HttpMethod)
            {
                httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
                await httpContext.Response.EndAsync();
                return;
            }
        }

        var actionName = httpContext.RouteData.ActionName.ToPascalCase();
        var actionObject = controllerObject[actionName];
        
        if (typeof actionObject !== 'function')
        {
            throw new Exception(Exception.EXCEPTION_OBJECT_NOT_FOUND + ": '" + actionName + "'");
        }
        
        var argumentsCount = await Functions.GetArgumentsLengthAsync(controllerObject[actionName]);
        if(argumentsCount < httpContext.RouteData.Parameters.length) //TODO check for nullable parameters.
        {
            throw new Exception(Exception.EXCEPTION_OBJECT_NOT_FOUND + ": '" + actionName + "'");
        }

        controllerObject.HttpContext = httpContext;

        var functionResult = await actionObject.apply(controllerObject, httpContext.RouteData.Parameters);
        if(functionResult instanceof ActionResult)
        {
            await (functionResult as ActionResult).ExecuteResultAsync(new ActionContext(httpContext, httpContext.RouteData));
        }   
                 
        await httpContext.Response.EndAsync();
    }

    public async OnErrorAsync(exception: Exception): Promise<void>
    {
        Console.Write(exception);
    }

    /**
     * Parses the given ParsedUrl and creates the Mvc RouteData
     * @param parsedUrl 
     */
    private async CreateRouteDataAsync(parsedUrl: ParsedUrl): Promise<RouteData>
    {
        if(!parsedUrl)
        {
            throw new Exception(Exception.EXCEPTION_OBJECT_NOT_FOUND);
        }

        var route = parsedUrl.Find(t => t.Name === 'Route' );
        var controllerName = parsedUrl.Find(t=>t.Name === "controller");
        var actionName = parsedUrl.Find(t => t.Name === "action");
        var parameters = parsedUrl.Find(t=>t.Name === "parameters");

        Check.IsNullOrUndefined(route);
        Check.IsNullOrUndefined(controllerName);
        Check.IsNullOrUndefined(actionName);
        
        if(parameters)
        {
            return new RouteData(route!.Value, controllerName!.Value, actionName!.Value, parameters.Value);
        }

        return new RouteData(route!.Value, controllerName!.Value, actionName!.Value);
    }
}
