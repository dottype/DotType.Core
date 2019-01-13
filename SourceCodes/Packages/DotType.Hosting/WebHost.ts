import { Check } from "../DotType/Check";
import { IStartup } from "./Interfaces/IStartup";
import { IWebServer } from "./Interfaces/IWebServer";
import { WebApplication } from "./WebApplication";
import "../DotType.Routing/Extensions/DotType.Routing.WebApplicationExtensions"

/** Defines a hosted web application. */
export class WebHost
{

    /** The application startup type. */
    private startup: IStartup | null;

    /** Gets or sets the WebHost configuration. */
    private configuration: any;

    /** Gets or sets the web server that will host the application. */
    public WebServer: IWebServer | null;

    /** Initialize a new instance of WebHost class. */
    constructor()
    {
        this.startup = null;
        this.WebServer = null;
    }


    /** Runs the application. */
    public Run(): void 
    {
        Check.IsNullOrUndefined(this.startup);
        Check.IsNullOrUndefined(this.WebServer);

        var webApplication = new WebApplication(this);

        if(this.startup)
        {
            this.startup.ConfigureServices(webApplication.Services);
            this.startup.Configure(webApplication);
            //TODO webhost doesn't know anything about routing. Move it from here.
            if(webApplication.RouteEngine)
            {
                webApplication.RouteEngine.Routes.Sort((item1, item2) => item1.Order - item2.Order);
            }
        }
        
        if(this.WebServer)
        {
            this.WebServer.Run();
        }
    }

    /**
     * Inidicates that application should use the given type as startup class.
     * @param type The type that will be used as startup class.
     */
    public UseStartup(type: { new (): IStartup }): WebHost
    {
        this.startup = new type();
        return this;
    }

    /**
     * Indicates that the web host shoulk use the given configuration.
     * @param configuration The configuration to use.
     */
    public async UseConfigurationAsync(configuration: any): Promise<WebHost>
    {
        Check.IsNullOrUndefined(configuration);
        
        this.configuration = configuration;
        return this;
    }
}