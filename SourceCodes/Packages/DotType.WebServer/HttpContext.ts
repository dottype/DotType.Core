import { IHttpContext } from "../DotType.Hosting/Interfaces/IHttpContext";
import { IServerResponse } from "../DotType.Hosting/Interfaces/IServerResponse";
import { IServerRequest } from "../DotType.Hosting/Interfaces/IServerRequest";
import { Check } from "../DotType/Check";

/** Represents a web server  http context. */
export class HttpContext implements IHttpContext
{
    /** Gets or sets the server request. */
    public Request: IServerRequest;    
    
    /** Gets or sets the server response. */
    public Response: IServerResponse;

    /**
     * Initializes a new instance of HttpContext class.
     * @param request The Server requset.
     * @param response The server response.
     */
    constructor(request: IServerRequest, response: IServerResponse)
    {
        Check.IsNullOrUndefined(request);
        Check.IsNullOrUndefined(response);
        
        this.Request = request;
        this.Response = response;
    }
}