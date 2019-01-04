import { RouteData } from "../RouteData";

declare module "../../DotType.Hosting/Interfaces/IHttpContext"
{
    export interface IHttpContext 
    {
        RouteData: RouteData;
    }
}