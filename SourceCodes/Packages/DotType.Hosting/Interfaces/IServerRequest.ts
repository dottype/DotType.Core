/** Interface for a server request */
export interface IServerRequest
{
    /** Gets the http version. */
    readonly HttpVersion :string;

    /** Gets the request header. */
    readonly Headers: string[];

    /** Gets request method. */
    readonly Method: string;

    /** Gets the Url. */
    readonly Url: string;

    /** Gets the status code. */
    readonly StatusCode: number;

    /** Gets the status message. */
    readonly StatusMessage: string;
}