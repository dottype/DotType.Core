import { CookiesCollection } from "../CookiesCollection";


declare module "../../DotType.Hosting/Interfaces/IServerRequest"
{
    export interface IServerRequest 
    {
        /**
         * Gets the Request Cookies
         */
        Cookies: CookiesCollection;
    }
}