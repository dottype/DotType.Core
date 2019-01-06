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

    public OnEnd: Collection<(response: IServerResponse)=>void> = new Collection<(response: IServerResponse)=>void>();

    public async EndAsync(): Promise<void>;

    public async EndAsync(chunk?: any): Promise<void>
    {
        try
        {
            this.OnEnd.ForEach(item =>
            {
                item.call(item, this);
            });
            this.OnEnd.Clear();
        }
        catch(exception)
        {
            console.log(exception);
        }

        await this.ReleaseStatusCode();
        await this.ReleaseHeadersAsync();
        await this.ReleaseWriteBufferAsync();
        
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

    private async ReleaseWriteBufferAsync(): Promise<void>
    {
        this.writeBuffer.forEach(item => 
        {
            this.serverResponse.write(item, "utf-8");
        });
        this.writeBuffer = [];
    }

    private async ReleaseHeadersAsync(): Promise<void>
    {
        this.headersBuffer.ForEach(item =>
        {
            this.serverResponse.setHeader(item.Name, item.Value);
        });

        this.headersBuffer.Clear();
    }

    private ReleaseStatusCode(): void
    {
        this.serverResponse.statusCode = this.StatusCode;
    }
}