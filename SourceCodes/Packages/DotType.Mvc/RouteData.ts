import { Route } from "../DotType.Routing/Route";

/** Class that represents a MVC parsed url. */
export class RouteData
{
    /** Gets or sets the controller name. */
    public ControllerName: string;

    /** Gets or sets the action name. */
    public ActionName: string;

    /** Gets or sets the parameters. */
    public Parameters: [] = [];

    /** Gets or sets the Route associated with parsed url. */
    public Route: Route;

    /**
     * Initializes a new instance of ParsedUrl class.
     * @param route The Route associated with parsed url.
     * @param controllerName The name of controller
     * @param actionName The name of action.
     * @param parameters The collection of parameters if any.
     */
    constructor(route: Route, controllerName: string, actionName: string, parameters: [] = [])
    {
        this.Route = route;
        this.ControllerName = controllerName;
        this.ActionName = actionName;
        this.Parameters = parameters;
    }
}