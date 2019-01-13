import { Collection } from "../../DotType/Collection<T>";

/** interface for a server response */
export interface IServerResponse
{
    /** Gets or sets the status code. */
    StatusCode: number;

    /** Gets or sets the reposne Content-Type */
    ContentType: string | null;

    /** Ends the server response. */
    EndAsync(): Promise<void>

    /** Ends the server response. */
    EndAsync(cunk?: any): Promise<void>

    /** Write a message to the output buffer. */
    WriteAsync(text: string): Promise<void>;

    /** Sets a response header. */
    SetHeader(name: string, value: number | string | string[]): void;

    /** Event that fires when IServerResponse.End() is called */
    OnEnd: Collection<(...args: any[]) => void>;

}