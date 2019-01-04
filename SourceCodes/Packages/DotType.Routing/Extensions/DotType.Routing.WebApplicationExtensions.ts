import { RouteEngine } from '../RouteEngine';

/** WebApplication extension methods. */
declare module '../../DotType.Hosting/WebApplication' 
{
    export interface WebApplication 
    {
        /** Gets or sets the Application Route Engine. */
        RouteEngine: RouteEngine;
    }
}