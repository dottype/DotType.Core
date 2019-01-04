"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebHost_1 = require("./Packages/DotType.Hosting/WebHost");
const Startup_1 = require("./Startup");
const FaviconParser_1 = require("./Packages/DotType.WebServer.FaviconMiddleware/FaviconParser");
require("./Packages/DotType.WebServer/Extensions/DotType.WebServer.WebHostExtensions");
require("./Packages/DotType.Mvc/Extensions/DotType.Mvc.WebApplicationExtensions");
class Program {
    static Run() {
        new WebHost_1.WebHost()
            .UseDotTypeWebServer()
            .UseStartup(Startup_1.Startup)
            .UseMiddleware(new FaviconParser_1.FaviconParser)
            .Run();
    }
}
Program.Run();
//# sourceMappingURL=Program.js.map