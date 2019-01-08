import { JsonResult } from "../Results/JSonResult";
import { ActionContext } from "../ActionContext";
import { Exception } from "../../DotType/Exception";

/** Executes a JsonResult to write to the response. */
export class JsonResultExecutor
{
    /**
     * Executes the JsonResult and writes the response.
     * @param context The ActionContext.
     * @param result The JsonResult.
     */
    public async ExecuteAsync(context: ActionContext, result: JsonResult): Promise<void>
    {
        if (context == null)
        {
            throw new Exception(Exception.EXCEPTION_OBJECT_NOT_FOUND);
        }
        if (result == null)
        {
            throw new Exception(Exception.EXCEPTION_OBJECT_NOT_FOUND);
        }

        context.HttpContext.Response.ContentType = result.ContentType;

        if (result.StatusCode != null)
        {
            context.HttpContext.Response.StatusCode = result.StatusCode;
        }

        if(result.Value)
        {
            await context.HttpContext.Response.WriteAsync(JSON.stringify(result.Value));
        }
    }
}