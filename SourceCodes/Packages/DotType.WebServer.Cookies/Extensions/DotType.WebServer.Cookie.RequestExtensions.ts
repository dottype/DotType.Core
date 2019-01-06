import { Collection } from "../../DotType/Collection<T>";
import { NameValueObject } from "../../DotType/NameValueObject";


declare module "../../DotType.WebServer/Request"
{
    export interface Request 
    {
        /**
         * Gets the Request Cookies
         */
        Cookies: Collection<NameValueObject>;
    }
}