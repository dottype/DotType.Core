import { IHttpContext } from "../../DotType.Hosting/Interfaces/IHttpContext";
import { Exception } from "../../DotType/Exception";

/**
 * Represents the interface used by all server middleware.
 */
export interface IMiddleware
{
    /** Gets or sets the middleware name. */
    Name: string;

    /** Gets or sets the middleware version. */
    Version: string;

    /** Gets or sets the middleware execution order. */
    Order: number;

    /** Event that will be executed on server request. */
    OnRequestAsync(httpContext: IHttpContext, caller: IMiddleware): Promise<void>;

    /** Event that will be execute on server error */
    OnErrorAsync(exception: Exception): Promise<void>;
}