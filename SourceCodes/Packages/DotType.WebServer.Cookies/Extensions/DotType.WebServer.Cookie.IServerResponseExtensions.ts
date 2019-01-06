import { Collection } from "../../DotType/Collection<T>";
import { NameValueObject } from "../../DotType/NameValueObject";

declare module "../../DotType.Hosting/Interfaces/IServerResponse"
{
    export interface IServerResponse
    {
        /**
         * Gets the Request Cookies
         */
        Cookies: Collection<NameValueObject>;
    }
}