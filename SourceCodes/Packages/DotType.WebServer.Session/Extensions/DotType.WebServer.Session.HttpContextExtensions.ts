import { Session } from "../Session";

declare module "../../DotType.WebServer/HttpContext"
{
    export interface HttpContext
    {
        /**
         * Gets or sets the Session.
         */
        Session: Session;
    }
}