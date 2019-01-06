import { Collection } from "../../DotType/Collection<T>";
import { NameValueObject } from "../../DotType/NameValueObject";


declare module "../../DotType.Hosting/Interfaces/IServerRequest"
{
    export interface IServerRequest 
    {
        /**
         * Gets the Request Cookies
         */
        Cookies: Collection<NameValueObject>;
    }
}