import { Application } from "./Application";
import { WebHost } from "./WebHost";

/** Class that defines a hosted web application. */
export class WebApplication extends Application
{
    public WebHost: WebHost;

    /**
     * Initializes a new instance of WebApplication class.
     * @param webHost The webhost that hosts the application.
     */
    constructor(webHost: WebHost)
    {
        super();
        this.WebHost = webHost;
    }
}