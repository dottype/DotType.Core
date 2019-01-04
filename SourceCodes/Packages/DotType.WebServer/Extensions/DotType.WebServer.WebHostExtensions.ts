import { WebHost } from '../../DotType.Hosting/WebHost';
import { WebServer } from "../WebServer";
import { IMiddleware } from '../Interfaces/IMiddleware';
import { Check } from '../../DotType/Check';

declare module '../../DotType.Hosting/WebHost' 
{
    export interface WebHost 
    {
        /**
         * Inidicates that the web application should use the DotType Webserver
         */
        UseDotTypeWebServer(): WebHost;

        /**
         * Indicates the application to use given web server middleware.
         * @param middleware The web server middleware to use.
         */
        UseMiddleware(middleware: IMiddleware): WebHost;

    }
}

WebHost.prototype.UseDotTypeWebServer = function()
{
    if(this.WebServer == null || this.WebServer == undefined)
    {
        this.WebServer = new WebServer();
    }
    
    return this;
}

WebHost.prototype.UseMiddleware = function(middleware: IMiddleware)
{
    Check.IsNullOrUndefined(middleware);

    if(!this.WebServer)
    {
        this.WebServer = new WebServer();
    }

    (this.WebServer as WebServer).UseMiddleware(middleware);
    return this;
}