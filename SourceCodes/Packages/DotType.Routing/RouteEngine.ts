import { Check } from "../DotType/Check";
import { IRouteParser } from "./Interfaces/IRouteParser";
import { DefaultRouteParser } from "./DefaultRouteParser";
import { Route } from "./Route";
import { Collection } from "../DotType/Collection<T>";
import { NameValueObject } from "../DotType/NameValueObject";
import { ParsedUrl } from "./ParsedUrl";

/** Represents the core engine class of routing. */
export class RouteEngine
{

    /** Gets or sets the Routes. */
    public Routes: Collection<Route> = new Collection<Route>();

    /** Gets or sets the route parser. */
    private routeParser: IRouteParser;

    constructor()
    constructor(routeParser: IRouteParser);

    /**
     * Initialize a new instance of RouteEngine class.
     * @param routeParser The route parser (optional).
     */
    constructor(routeParser?: IRouteParser)
    {
        this.routeParser = routeParser == null ? new DefaultRouteParser() : routeParser;
    }

    public RegisterRoute(name: string, template: string): void;

    public RegisterRoute(name: string, template: string, defaults?: Collection<NameValueObject>): void;

    /**
     * Registers a route.
     * @param name The route name.
     * @param template The route template.
     */
    public RegisterRoute(name: string, template: string, defaults?: Collection<NameValueObject>): void
    {
        Check.IsNullOrUndefined(name);
        Check.IsNullOrUndefined(template);

        if(defaults)
        {
            this.Routes.Add(new Route(name, template, defaults));
        }
        else
        {
            this.Routes.Add(new Route(name, template));
        }
    }
    
    /**
     * Parses the url.
     * @param url The url to parse.
     */
    public async ParseUrlAsync(url: string): Promise<ParsedUrl | null>
    {
        if(url == null || url == "undefined")
        {
            return null;
        }

        return await this.routeParser.ParseAsync(url, this);
    }
}