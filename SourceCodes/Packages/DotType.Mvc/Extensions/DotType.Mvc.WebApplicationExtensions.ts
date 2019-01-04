import { WebApplication } from '../../DotType.Hosting/WebApplication';
import { MvcWebServerMiddleware } from '../MvcWebServerMiddleware';
import { RouteEngine } from '../../DotType.Routing/RouteEngine';
import { Collection } from '../../DotType/Collection<T>';
import { NameValueObject } from '../../DotType/NameValueObject';
import { MvcRouteParser } from '../MvcRouteParser';
import { WebServer } from '../../DotType.WebServer/WebServer';

declare module '../../DotType.Hosting/WebApplication' 
{
    export interface WebApplication 
    {
        /** Indicates that the web application should use the Mvc pattern parser.  */
        UseMvc(): WebApplication;

        /** Tells application that it should use the default Route for Mvc.  */
        UseDefaultRoute(): WebApplication;
    }
}

WebApplication.prototype.UseMvc = function()
{
    if(this.WebHost.WebServer)
    {
        (this.WebHost.WebServer as WebServer).UseMiddleware(new MvcWebServerMiddleware(this));
    }
    if(this.RouteEngine == null || this.RouteEngine == undefined)
    {
        this.RouteEngine = new RouteEngine(new MvcRouteParser());
    }

    return this;
}

WebApplication.prototype.UseDefaultRoute = function()
{
    if(this.RouteEngine == null || this.RouteEngine == undefined)
    {
        this.RouteEngine = new RouteEngine();
    }

    var routeDefaults = new Collection<NameValueObject>();
    routeDefaults.Add(new NameValueObject("controller", "Home"));
    routeDefaults.Add(new NameValueObject("action", "Index"));
    routeDefaults.Add(new NameValueObject("parameters", "*"));
    this.RouteEngine.RegisterRoute("Default", "{controller}/{action}/{*}", routeDefaults);
    
    return this;
}