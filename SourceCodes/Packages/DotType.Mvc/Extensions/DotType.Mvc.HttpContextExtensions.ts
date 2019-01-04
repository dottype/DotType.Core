import { RouteData } from "../RouteData";

declare module "../../DotType.WebServer/HttpContext"
{
    export interface HttpContext 
    {
        RouteData: RouteData;
    }
}