import { RouteEngine } from "../RouteEngine";
import { ParsedUrl } from "../ParsedUrl";

/** Defines the Route parser contract interface. */
export interface IRouteParser
{
    /**
     * Parses the  url.
     * @param url The url to parse.
     * @param routeEngine The parent RouteEngine
     */
    ParseAsync(url: string, routeEngine: RouteEngine): Promise<ParsedUrl | null>;
}