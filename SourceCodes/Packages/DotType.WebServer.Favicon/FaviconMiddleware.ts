import { IMiddleware } from "../DotType.WebServer/Interfaces/IMiddleware";
import { Exception } from "../DotType/Exception";
import { Console } from "../DotType/Console";
import { IHttpContext } from "../DotType.Hosting/Interfaces/IHttpContext";

export class FaviconMiddleware implements IMiddleware
{
    public readonly Name: string = "Favicon parser";
    public readonly Version: string = "0.0.1-beta";
    public Order: number = -1000;
    
    public async OnRequestAsync(httpContext: IHttpContext, caller: IMiddleware): Promise<void>
    {
        if(httpContext.Request.Method == "GET" && httpContext.Request.Url == "/favicon.ico")
        {
            //const favicon = Buffer.from("AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAADHjVUA////ALt0MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIiIiIiIiIiIiIiIiIiIiIiIREiIBIiIiIhIhIgEiIiIiEiEiASIiIiISISIBIiIiIhESIRESIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "base64");            
            const favicon = Buffer.from("AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAC7dSX/u3Ul/7t2Jv+5cR7/tWoT/7VpEv+1aBH/uG8c/7x3J/+7dST/u3Ym/7hvHP+2axb/u3Ul/7t1Jf+7dSX/u3Ul/7x2J/+5cB3/yZJT/+TJqv/o0LX/4sSi/8eNS/+4bxv/vHcp/7hvG//Pnmf/3ryW/7p0I/+7dSX/u3Ul/7t1Jf+8dyj/tmsV/9eufv//////58+z//Lk1f//////0aFq/7lwHf+2bBb/37+a//n07f+6cyL/u3Uk/7t1Jf+7dSX/vHco/7ZrFf/Xr4D//Pj1/7huG/+zZQz/69a+//fv5v+7dib/tWoT/9+9l//48en/unMi/7t1Jf+7dSX/u3Ul/7x3KP+2axX/2K+B//38+v/AfzX/tmsW/9Sodv//////w4U+/7VpEv/gwJz/+fPt/7t1Jf+8dif/u3Um/7t1Jf+8dyj/tmsV/9ivgf/9+vf/u3Qk/7FgBP/dupH//////716LP+uXAD/3bqR//jx6f+1aBH/t2wX/7t1Jf+7dSX/vHco/7ZrFf/Yr4D//////8yXWv/UqXb//////+bMrv/HjEr/1qt7/+zYwf/7+PT/161+/9Kkb/+8dif/u3Ul/7x3KP+3bRj/06Zy//37+f/79/L//Pj1/+bNr/+5cR//2rOH//z59f/06Nr/8ubX//nz7P/u3cn/vHco/7t1Jf+7dSX/u3Ul/7x2J/++fDD/v34z/7x3KP+3bBf/unMj/7p0I/+5cR7/unIh/7pzIv+5cR//uXIg/7t1Jf+7dSX/u3Ul/7t1Jf+7dST/unMi/7pzIf+6dCP/vHco/7t2Jv+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t2Jv+7dib/u3Um/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/u3Ul/7t1Jf+7dSX/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==", "base64");
            httpContext.Response.SetHeader('Content-Length', favicon.length);
            httpContext.Response.SetHeader('Content-Type', 'image/x-icon');
            httpContext.Response.SetHeader("Cache-Control", "public, max-age=2592000000");
            httpContext.Response.SetHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
            await httpContext.Response.End(favicon);
        }
    }

    public async OnErrorAsync(exception: Exception): Promise<void>
    {
        Console.Write(exception);
    }
}
