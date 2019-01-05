import { WebHost } from "./Packages/DotType.Hosting/WebHost";
import { Startup } from "./Startup";
import { FaviconParser } from "./Packages/DotType.WebServer.Favicon/FaviconParser";
import "./Packages/DotType.WebServer/Extensions/DotType.WebServer.WebHostExtensions";
import "./Packages/DotType.Mvc/Extensions/DotType.Mvc.WebApplicationExtensions";

class Program
{
    public static Run()
    {
        new WebHost()
            .UseDotTypeWebServer()
            .UseStartup(Startup)
            .UseMiddleware(new FaviconParser)
            .Run();
    }
}

Program.Run();