import { Session } from "../Session";

declare module "../../DotType.Hosting/Interfaces/IHttpContext"
{
    export interface IHttpContext
    {
        /**
         * Gets or sets the Session.
         */
        Session: Session;
    }
}