import { IMiddleware } from "../DotType.WebServer/Interfaces/IMiddleware";
import { Exception } from "../DotType/Exception";
import { Console } from "../DotType/Console";
import { IHttpContext } from "../DotType.Hosting/Interfaces/IHttpContext";

export class FaviconParser implements IMiddleware
{
    public readonly Name: string = "Favicon parser";
    public readonly Version: string = "0.0.1-beta";
    public Order: number = -1000;
    
    public async OnRequestAsync(httpContext: IHttpContext, caller: IMiddleware): Promise<void>
    {
        if(httpContext.Request.Url == "/favicon.ico")
        {
            const favicon = Buffer.from("AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAADHjVUA////ALt0MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIiIiIiIiIiIiIiIiIiIiIiIREiIBIiIiIhIhIgEiIiIiEiEiASIiIiISISIBIiIiIhESIRESIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "base64");
            httpContext.Response.StatusCode = 200;
            httpContext.Response.SetHeader('Content-Length', favicon.length);
            httpContext.Response.SetHeader('Content-Type', 'image/x-icon');
            httpContext.Response.SetHeader("Cache-Control", "public, max-age=2592000");
            httpContext.Response.SetHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
            await httpContext.Response.End(favicon);
        }
    }

    public async OnErrorAsync(exception: Exception): Promise<void>
    {
        Console.Write(exception);
    }
}
