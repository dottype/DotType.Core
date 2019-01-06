import { ServerResponse } from "http";
import { Collection } from "../../DotType/Collection<T>";

/** interface for a server response */
export interface IServerResponse
{
    /** Gets or sets the status code. */
    StatusCode: number;

    /** Ends the server response. */
    End(): void; 

    /** Ends the server response. */
    End(cunk?: any): void; 

    /** Write a message to the output buffer. */
    WriteAsync(text: string): Promise<void>;

    /** Sets a response header. */
    SetHeader(name: string, value: number | string | string[]): void;

    /** Event that fires when IserverResponse.End() is called */
    OnEnd: Collection<() => void>;
}