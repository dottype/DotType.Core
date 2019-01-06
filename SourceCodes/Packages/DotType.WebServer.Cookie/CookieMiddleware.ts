import { IMiddleware } from "../DotType.WebServer/Interfaces/IMiddleware";
import { IHttpContext } from "../DotType.Hosting/Interfaces/IHttpContext";
import { Exception } from "../DotType/Exception";
import { NameValueObject } from "../DotType/NameValueObject";
import { Collection } from "../DotType/Collection<T>";
import { IServerResponse } from "../DotType.Hosting/Interfaces/IServerResponse";
import "../DotType.WebServer.Cookie/Extensions/DotType.WebServer.Cookie.IServerRequestExtensions";
import "../DotType.WebServer.Cookie/Extensions/DotType.WebServer.Cookie.IServerResponseExtensions";

export class CookieMiddleware implements IMiddleware
{
    public readonly Name: string = "Cookie Middleware";
    public readonly Version: string = "0.0.1-alpha";
    public Order: number = -1000;
    
    public async OnRequestAsync(httpContext: IHttpContext, caller: IMiddleware): Promise<void>
    {
        if(httpContext.Request.Url === "/favicon.ico")
        {
            return;
        }
        
        httpContext.Request.Cookies = httpContext.Response.Cookies = this.ParseCookies(httpContext.Request.Headers.Find(t=>t.Name == "cookie"));
        httpContext.Response.OnEnd.Add(this.End);
    }
    
    public async End(response: IServerResponse): Promise<void>
    {
        response.Cookies.ForEach(item => 
        {
            response.WriteAsync(item.Name); 
        });
    }

    public async OnErrorAsync(exception: Exception): Promise<void>
    {
        console.error(exception);
    }    

    /**
     * Parses cookies.
     * @param cookieHeader The cookie header.
     */
    private ParseCookies(cookieHeader: NameValueObject | null): Collection<NameValueObject>
    {
        var result = new Collection<NameValueObject>();

        if(cookieHeader == null)
        {
            return result;
        }

        var n = cookieHeader.Value.split(";").forEach((item: string) => 
        {
            var m = / *([^=]+)=(.*)/.exec(item);
            if(m)
            {
                result.Add(new NameValueObject(m[1], decodeURIComponent(m[2])));
            }
        });

        return result;
    }
}