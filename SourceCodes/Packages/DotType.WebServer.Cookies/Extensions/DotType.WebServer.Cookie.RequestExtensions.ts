import { CookiesCollection } from "../CookiesCollection";


declare module "../../DotType.WebServer/Request"
{
    export interface Request 
    {
        /**
         * Gets the Request Cookies
         */
        Cookies: CookiesCollection;
    }
}