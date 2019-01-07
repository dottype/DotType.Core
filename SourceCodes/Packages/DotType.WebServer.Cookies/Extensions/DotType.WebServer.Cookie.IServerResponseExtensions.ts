import { CookiesCollection } from "../CookiesCollection";

declare module "../../DotType.Hosting/Interfaces/IServerResponse"
{
    export interface IServerResponse
    {
        /**
         * Gets the Request Cookies
         */
        Cookies: CookiesCollection;
    }
}