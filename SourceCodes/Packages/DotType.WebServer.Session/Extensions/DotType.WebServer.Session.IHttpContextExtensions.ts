import { ISession } from "../Interfaces/ISession";

declare module "../../DotType.Hosting/Interfaces/IHttpContext"
{
    export interface IHttpContext
    {
        /**
         * Gets or sets the Session.
         */
        Session: ISession;
    }
}