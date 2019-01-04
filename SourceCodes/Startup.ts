import { IStartup } from "./Packages/DotType.Hosting/Interfaces/IStartup";
import { ServiceCollection } from "./Packages/DotType.DependencyInjection/ServiceCollection";
import { WebApplication } from "./Packages/DotType.Hosting/WebApplication";

export class Startup implements IStartup
{
    ConfigureServices(services: ServiceCollection): void
    {
        //console.log(services);
    }    
    
    Configure(app: WebApplication): void
    {
        app.UseMvc();
        app.UseDefaultRoute();
    }
}