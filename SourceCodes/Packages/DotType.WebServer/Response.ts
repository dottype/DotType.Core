import { IServerResponse } from "../DotType.Hosting/Interfaces/IServerResponse";
import { ServerResponse } from "http";
import { Check } from "../DotType/Check";
import { NameValueObject } from "../DotType/NameValueObject";
import { Collection } from "../DotType/Collection<T>";

/** Represents a http context response class */
export class Response implements IServerResponse
{
    /** Gets the Http Server response object. */
    private serverResponse: ServerResponse;

    /** Contains the write buffer. */
    private writeBuffer: string[] = [];
    
    /** Contains the server status code buffer.*/
    private statusCodeBuffer: number = 200;

    /** Contains the server response headers buffer. */
    private headersBuffer: Collection<NameValueObject> = new Collection<NameValueObject>();

    public get StatusCode(): number
    {
        return this.statusCodeBuffer;
    }

    public set StatusCode(statusCode: number)
    {
        this.statusCodeBuffer = statusCode;
    }

    /**
     * Initializes a new instance of Response class.
     * @param serverResponse The ServerResponse object (imported from Node http module).
     */
    constructor(serverResponse: ServerResponse)
    {
        Check.IsNullOrUndefined(serverResponse);
        
        this.serverResponse = serverResponse;
    }

    public End(): void;

    public End(chunk?: any): void
    {
        this.ReleaseStatusCode();
        this.ReleaseHeaders();
        this.ReleaseWriteBuffer();

        this.EndResponse(chunk);
    }

    public async WriteAsync(text: string): Promise<void>
    {
        this.writeBuffer.push(text);
    }

    public SetHeader(name: string, value: string)
    {
        Check.IsNullOrUndefined(name);
        Check.IsNullOrUndefined(value);

        this.headersBuffer.Add(new NameValueObject(name, value));
    }

    /** The overload base for Response.End function. */
    private EndResponse(chunk: any): void
    {
        this.serverResponse.end(chunk);
    }

    public async ReleaseWriteBuffer(): Promise<void>
    {
        this.writeBuffer.forEach(item => 
        {
            this.serverResponse.write(item, "utf-8");
        });
        this.writeBuffer = [];
    }

    public async ReleaseHeaders(): Promise<void>
    {
        this.headersBuffer.Foreach(item =>
        {
            this.serverResponse.setHeader(item.Name, item.Value);
        });

        this.headersBuffer.Clear();
    }

    public ReleaseStatusCode(): void
    {
        this.serverResponse.statusCode = this.StatusCode;
    }
}