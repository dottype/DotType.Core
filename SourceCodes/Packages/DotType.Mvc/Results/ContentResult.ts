import { ActionResult } from "./ActionResult";
import { IStatusCodeActionResult } from "../Interfaces/IStatusCodeActionResult";
import { ActionContext } from "../ActionContext";
import { Exception } from "../../DotType/Exception";
import { ContentResultExecutor } from "../Executors/ContentResultExecutor";
import { Check } from "../../DotType/Check";

export class ContentResult extends ActionResult implements IStatusCodeActionResult
{
    /** Gets or set the content representing the body of the response. */
    public Content: string | null = null;

    /** Gets or sets the Content-Type header for the response. */
    public ContentType: string | null = null;

    /** Gets or sets the HTTP status code. */
    public StatusCode: number  = 200;

    constructor(content: string);
    constructor(content: string, contentType:string);

    /**
     * Initializes a new instance of ContentResult class.
     * @param content The content representing the body of the response.
     * @param contentType The Content-Type header for the response.
     */
    constructor(content: string, contentType?:string)
    {
        super();
        this.Content = content;
        if(contentType)
        {
            this.ContentType = contentType;
        }
    }

    public async ExecuteResultAsync(context: ActionContext): Promise<void>
    {
        if (context == null)
        {
            throw new Exception(Exception.EXCEPTION_NULL_OR_UNDEFINED);
        }

        var executor = new ContentResultExecutor();
        return executor.ExecuteAsync(context, this);
    }
}