import { Collection } from "../../DotType/Collection<T>";
import { NameValueObject } from "../../DotType/NameValueObject";


declare module "../../DotType.WebServer/Response"
{
    export interface Response 
    {
        /**
         * Gets the Request Cookies
         */
        Cookies: Collection<NameValueObject>;
    }
}