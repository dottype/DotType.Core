import { ActionResult } from "../Results/ActionResult";
import { ActionContext } from "../ActionContext";

export class StatusCodeResult extends ActionResult
{
    /** Gets the HTTP status code. */
    public readonly StatusCode: number;

    /**
     * Initializes a new instance of the StatusCodeResult class
     * @param statusCode The HTTP status code of the response.
     */
    constructor(statusCode: number)
    {
        super();
        this.StatusCode = statusCode;
    }

    public async ExecuteResultAsync(context: ActionContext): Promise<void>
    {
        context.HttpContext.Response.StatusCode = this.StatusCode;
    }
}