import { IServerRequest } from "../DotType.Hosting/Interfaces/IServerRequest"
import { Check } from "../DotType/Check";
import { IncomingMessage } from "http";

export class Request implements IServerRequest
{
    public readonly HttpVersion: string;    
    public readonly Headers: string[];
    public readonly Method: string = "";
    public readonly Url: string = "";
    public readonly StatusCode: number = 0;
    public readonly StatusMessage: string = "";

    /** 
     * Initializes a new instance of Request 
     * @param incomingMessage The incoming message object (imported from Node http module)
     */
    constructor(incomingMessage: IncomingMessage)
    {
        Check.IsNullOrUndefined(incomingMessage);
        
        this.HttpVersion = incomingMessage.httpVersion;
        this.Headers = incomingMessage.rawHeaders;
        if(incomingMessage.method)
            this.Method = incomingMessage.method;
        if(incomingMessage.url)
            this.Url = incomingMessage.url;
        if(incomingMessage.statusCode)
            this.StatusCode = incomingMessage.statusCode;
        if(incomingMessage.statusMessage)
            this.StatusMessage = incomingMessage.statusMessage;
    }
}