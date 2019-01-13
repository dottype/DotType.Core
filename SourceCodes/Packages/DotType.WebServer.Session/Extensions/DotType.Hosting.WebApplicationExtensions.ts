import { Check } from "../../DotType/Check";
import { SessionMiddleware } from "../SessionMiddleware";
import { WebServer } from "../../DotType.WebServer/WebServer";
import { WebApplication } from "../../DotType.Hosting/WebApplication";
import { SessionManager } from "../SessionManager";

declare module '../../DotType.Hosting/WebApplication' 
{
    export interface WebApplication 
    {
        /** Indicates that the web application should use the Session functionality. */
        UseSession(): SessionManager;
    }
}

WebApplication.prototype.UseSession = function()
{
    Check.IsNullOrUndefined(this.WebHost.WebServer);

    var sessionManager = new SessionManager();
    (this.WebHost.WebServer as WebServer).UseMiddleware(new SessionMiddleware(sessionManager));    
    return sessionManager;
}