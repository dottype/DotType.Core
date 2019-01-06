import { WebHost } from "./Packages/DotType.Hosting/WebHost";
import { Startup } from "./Startup";
import { FaviconMiddleware } from "./Packages/DotType.WebServer.Favicon/FaviconMiddleware";
import { CookieMiddleware } from "./Packages/DotType.WebServer.Cookies/CookieMiddleware";
import "./Packages/DotType.WebServer/Extensions/DotType.WebServer.WebHostExtensions";
import "./Packages/DotType.Mvc/Extensions/DotType.Mvc.WebApplicationExtensions";

class Program
{
    public static Run()
    {
        new WebHost()
            .UseDotTypeWebServer()
            .UseStartup(Startup)
            .UseMiddleware(new FaviconMiddleware)
            .UseMiddleware(new CookieMiddleware)
            .Run();
    }
}

Program.Run();