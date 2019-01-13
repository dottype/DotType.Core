import { IMiddleware } from "../DotType.WebServer/Interfaces/IMiddleware";
import { IHttpContext } from "../DotType.Hosting/Interfaces/IHttpContext";
import { Console } from "../DotType/Console";
import { Exception } from "../DotType/Exception";
import { SessionManager } from "./SessionManager";
import { Guid } from "../DotType/Guid";
import { Session } from "./Session";
import { FileSessionStorage } from "./FileSessionStorage";
import { Check } from "../DotType/Check";

export class SessionMiddleware implements IMiddleware
{
    public readonly Name: string = "Session parser";
    public readonly Version: string = "0.0.1-beta";
    public Order: number = -9999; //the parsing should occur "after" cookies middleware.

    /**
     * Initializes a new instance of SessionMiddleware class.
     * @param sessionManager 
     */
    constructor(sessionManager: SessionManager)
    {
        Check.IsNullOrUndefined(sessionManager);
        this.sessionManager = sessionManager;
    }

    /** Gets or sets the Session Manager. */
    private sessionManager: SessionManager = new SessionManager();
    
    public async OnRequestAsync(httpContext: IHttpContext, caller: IMiddleware): Promise<void>
    {
        if(httpContext.Request.Url != "/favicon.ico")
        {
            // check for SessionStorage, load default if null
            this.sessionManager.SessionStorage = this.sessionManager.SessionStorage ? this.sessionManager.SessionStorage : new FileSessionStorage();

            var session = new Session();
            var sessionCookie = httpContext.Request.Cookies.Find(t=>t.Name == this.sessionManager.Options.CookieName);
            if(sessionCookie != null && sessionCookie.Value)
            {
                session.Id = sessionCookie.Value;
                if (this.sessionManager.SessionStorage)
                {
                    await this.sessionManager.SessionStorage.LoadAsync(session);
                }
            }
            else
            {
                session.Id = Guid.NewGuid();
            }
            httpContext.Session = session;
            httpContext.Response.Cookies.Append(this.sessionManager.Options.CookieName, session.Id);
            httpContext.Response.OnEnd.Add(async () => await this.End(httpContext));
        }
    }

    private async End(httpContext: IHttpContext): Promise<void>
    {
        if(this.sessionManager.SessionStorage)
        {
            await this.sessionManager.SessionStorage.SaveAsync(httpContext.Session);
        }
    }

    public async OnErrorAsync(exception: Exception): Promise<void>
    {
        Console.Write(exception);
    }
}