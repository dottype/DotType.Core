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
    public Order: number = -1000;
    
    public async OnRequestAsync(httpContext: IHttpContext, caller: IMiddleware): Promise<void>
    {
        if(httpContext.Request.Url == "/favicon.ico")
        {
            return;
        }
        httpContext.Request.Cookies = httpContext.Response.Cookies = this.ParseCookies(httpContext.Request.Headers.Find(t=>t.Name == "cookie"));
        httpContext.Response.OnEnd.Add(this.End);
    }
    
    public async End(response: IServerResponse): Promise<void>
    {
        var cookiesArray: string[] = [];
        response.Cookies.ForEach((item: Cookie) =>
        {
            cookiesArray.push(item.toString());
        });

        if(cookiesArray.length > 0)
        {
            response.SetHeader(HeaderNames.SetCookie, cookiesArray);
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