import { Collection } from "../../DotType/Collection<T>";
import { NameValueObject } from "../../DotType/NameValueObject";

/** Interface for a server request */
export interface IServerRequest
{
    /** Gets the http version. */
    readonly HttpVersion :string;

    /** Gets the request headers. */
    readonly Headers: Collection<NameValueObject>;

    /** Gets request method. */
    readonly Method: string;

    /** Gets the Url. */
    readonly Url: string;

    /** Gets the status code. */
    readonly StatusCode: number;

    /** Gets the status message. */
    readonly StatusMessage: string;
}