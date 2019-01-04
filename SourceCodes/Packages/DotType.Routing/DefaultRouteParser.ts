import { IRouteParser } from "./Interfaces/IRouteParser";
import { RouteEngine } from "./RouteEngine";
import { ParsedUrl } from "./ParsedUrl";

/** Represents a default route parser. */
export class DefaultRouteParser implements IRouteParser
{
    public async ParseAsync (url: string, routeEngine: RouteEngine): Promise<ParsedUrl | null>
    {
        return null;
    }
}