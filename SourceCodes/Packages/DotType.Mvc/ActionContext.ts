import { IHttpContext } from "../DotType.Hosting/Interfaces/IHttpContext";
import { RouteData } from "./RouteData";
import { Check } from "../DotType/Check";

/** Context object for execution of action which has been selected as part of a request. */
export class ActionContext
{
    /** Gets the HttpContext for the current request. */
    public readonly HttpContext: IHttpContext;

    /** Gets the RouteData for the current request. */
    public readonly RouteData: RouteData;

    /**
     * Initialize a new instance of ActionContext class.
     * @param httpContext 
     * @param routeData 
     */
    constructor(httpContext: IHttpContext, routeData: RouteData)
    {
        Check.IsNull(httpContext);
        Check.IsNullOrUndefined(routeData);

        this.HttpContext = httpContext;
        this.RouteData = routeData;
    }
}