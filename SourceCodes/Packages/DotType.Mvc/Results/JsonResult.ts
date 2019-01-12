import { ActionResult } from "./ActionResult";
import { IStatusCodeActionResult } from "../Interfaces/IStatusCodeActionResult";
import { Exception } from "../../DotType/Exception";
import { ActionContext } from "../ActionContext";
import { JsonResultExecutor } from "../Executors/JsonResultExecutor";

/** An action result which formats the given object as JSON. */
export class JsonResult extends ActionResult implements IStatusCodeActionResult
{
    /** Gets or sets the HTTP status code. */
    public StatusCode: number | null = null;

    /** Gets or sets the Content-Type header of the response. */
    public ContentType: string = "application/json";

    /** Gets or sets the value to be formatted. */
    public Value: any | null = null;

    /**
     * Initializes a new instance of JsonResult.
     * @param value The object to be serialized.
     */
    constructor(value: any)
    {
        super();
        if(value)
        {
            this.Value = value;
        }
    }

    public ExecuteResultAsync(context: ActionContext): Promise<void>
    {
        if (context == null)
        {
            throw new Exception(Exception.EXCEPTION_OBJECT_NOT_FOUND);
        }

        var executor = new JsonResultExecutor();
        return executor.ExecuteAsync(context, this);
    }
}