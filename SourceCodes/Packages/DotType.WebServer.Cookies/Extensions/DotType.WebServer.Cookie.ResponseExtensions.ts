import { CookiesCollection } from "../CookiesCollection";


declare module "../../DotType.WebServer/Response"
{
    export interface Response 
    {
        /**
         * Gets the Request Cookies
         */
        Cookies: CookiesCollection;
    }
}