import { ServerResponse, Server, IncomingMessage } from "http";
import { IMiddleware } from "./Interfaces/IMiddleware";
import { Exception } from "../DotType/Exception";
import { HttpContext } from "../DotType.WebServer/HttpContext";
import { Response } from "./Response";
import { Request } from "./Request";
import { IWebServer } from "../DotType.Hosting/Interfaces/IWebServer.js";
import { Check } from "../DotType/Check.js";
import * as ConfigurationFile from "./Configuration/Configuration.json"; 

/**
 * Base clas of DotType server
 */
export class WebServer implements IWebServer
{

    //TODO use Collection<T> from DotType package for this array.
    /** Gets or sets the web server middleware. */
    private middleware: IMiddleware[] = [];

    /** The configuration used by web server */
    private configuration = ConfigurationFile;

    /** 
     * Indicates that server should use given middleware.
     * @param middleware The middleware that server will use during request.
     * @returns The current instance of webserver.
     */
    public UseMiddleware(middleware: IMiddleware): WebServer
    {
        Check.IsNullOrUndefined(middleware);

        for(let item of this.middleware)
        {
            if(item.Name === middleware.Name)
            {
                throw new Exception("The middleware with name '" + middleware.Name + "' already exists.");
            }
        }

        this.middleware.push(middleware);
        return this;
    }

    /** Runs the server */
    public async Run(): Promise<void>
    {
        this.configuration.WebServer.Http.Enabled ? await this.CreateHttpServerAsync() : null;
        this.configuration.WebServer.Https.Enabled ? await this.CreateHttpsServerAsync() : null;
        if(this.middleware.length > 0)
        {
            this.middleware = this.middleware.sort((item1, item2) => item1.Order - item2.Order);
        }
    }

    /** Creates HttpServer. */
    private CreateHttpServerAsync(): void
    {
        var http = require('http');
        var httpServer = http.createServer();

        httpServer.on('request', async (request: IncomingMessage, response: ServerResponse) => await this.ParseRequestAsync(request, response, httpServer));
        httpServer.on('error', async (exception: Exception) => await this.ParseExceptionAsync(exception));
        httpServer.listen(this.configuration.WebServer.Http.Port);
    }

    /** Creates HttpServer using given configuration. */
    private async CreateHttpsServerAsync(): Promise<void>
    {
        var fs = require("fs");
        var https = require('https');
        var httpsOptions = 
        {
            ca: fs.readFileSync(this.configuration.WebServer.Https.Options.ca),
            key: fs.readFileSync(this.configuration.WebServer.Https.Options.key),
            cert: fs.readFileSync(this.configuration.WebServer.Https.Options.cert),
        }

        var httpsServer = https.createServer(httpsOptions);
        httpsServer.on('request', async (request: IncomingMessage, response: ServerResponse) => await this.ParseRequestAsync(request, response, httpsServer));
        httpsServer.on('error', async (exception: Exception) => await this.ParseExceptionAsync(exception));
        httpsServer.listen(this.configuration.WebServer.Https.Port);
    }
    
    /** Parses request */
    private async ParseRequestAsync(request: IncomingMessage, response: ServerResponse, server: Server): Promise<void>
    {
        try
        {
            if(this.middleware)
            {
                var httpContext = new HttpContext
                (
                    new Request(request),
                    new Response(response)
                );
            
                for(let item of this.middleware)
                {
                    try
                    {
                        await item.OnRequestAsync(httpContext, item);
                    }
                    catch(exception)
                    {
                        await item.OnErrorAsync(exception);
                    }
                }

                httpContext.Response.End();
            }
        }
        catch (exception) 
        {
            await this.ParseExceptionAsync(exception);
        }
    }

    /** Parses general server exception  */
    private async ParseExceptionAsync(exception: Exception): Promise<void>
    {
        console.log(exception);
    }
}