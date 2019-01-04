import { IServerRequest } from "./IServerRequest";
import { IServerResponse } from "./IServerResponse";

/** Represents a webserver HttpContext generic interface. */
export interface IHttpContext
{
    /** The context request. */
    Request: IServerRequest;

    /** The context response. */
    Response: IServerResponse;
}