import { IMiddleware } from "../DotType.WebServer/Interfaces/IMiddleware";
import { IHttpContext } from "../DotType.Hosting/Interfaces/IHttpContext";
import { Exception } from "../DotType/Exception";
import { NameValueObject } from "../DotType/NameValueObject";
import { IServerResponse } from "../DotType.Hosting/Interfaces/IServerResponse";
import "../DotType.WebServer.Cookies/Extensions/DotType.WebServer.Cookie.IServerRequestExtensions";
import "../DotType.WebServer.Cookies/Extensions/DotType.WebServer.Cookie.IServerResponseExtensions";
import { CookiesCollection } from "./CookiesCollection";
import { Cookie } from "./Cookie";
import { HeaderNames } from "../DotType.Http/HeaderNames";

export class CookieMiddleware implements IMiddleware
{
    public readonly Name: string = "Cookie Middleware";
    public readonly Version: string = "0.0.1-alpha";
    public Order: number = -10000; //Should be first
    
    public async OnRequestAsync(httpContext: IHttpContext, caller: IMiddleware): Promise<void>
    {
        if(httpContext.Request.Url == "/favicon.ico")
        {
            return;
        }
        httpContext.Request.Cookies = this.ParseCookies(httpContext.Request.Headers.Find(t=>t.Name == "cookie"));
        httpContext.Response.Cookies = new CookiesCollection();
        httpContext.Response.OnEnd.Add(async () => await this.End(httpContext));
    }
    
    public async End(httpContext: IHttpContext): Promise<void>
    {
        var cookiesArray: string[] = [];
        httpContext.Response.Cookies.ForEach((item: Cookie) =>
        {
            cookiesArray.push(item.toString());
        });

        if(cookiesArray.length > 0)
        {
            httpContext.Response.SetHeader(HeaderNames.SetCookie, cookiesArray);
        }
    }

    public async OnErrorAsync(exception: Exception): Promise<void>
    {
        console.error(exception);
    }    

    /**
     * Parses cookies.
     * @param cookieHeader The cookie header.
     */
    private ParseCookies(cookieHeader: NameValueObject | null): CookiesCollection
    {
        var result = new CookiesCollection();

        if(cookieHeader == null)
        {
            return result;
        }

        var cookiesArray = cookieHeader.Value.split(";");
        cookiesArray.forEach((element: string) => 
        {
            var m = / *([^=]+)=(.*)/.exec(element);
            if(m)
            {
                result.Append(m[1], decodeURIComponent(m[2]));
            }
        });

        return result;
    }
}