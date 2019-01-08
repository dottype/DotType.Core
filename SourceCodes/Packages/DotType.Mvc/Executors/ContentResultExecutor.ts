import { ActionContext } from "../ActionContext";
import { ContentResult } from "../Results/ContentResult";
import { Exception } from "../../DotType/Exception";

export class ContentResultExecutor
{
    private readonly defaultContentType: string = "text/plain; charset=utf-8";

    /**
     * Executes the ContentResult and writes the response.
     * @param context The ActionContext.
     * @param result The ContentResult.
     */
    public async ExecuteAsync(context: ActionContext, result: ContentResult)
    {
        if (context == null)
        {
            throw new Exception(Exception.EXCEPTION_NULL_OR_UNDEFINED);
        }
        if (result == null)
        {
            throw new Exception(Exception.EXCEPTION_NULL_OR_UNDEFINED);
        }

        context.HttpContext.Response.ContentType = result.ContentType ? result.ContentType : this.defaultContentType;
        if (result.StatusCode != null)
        {
            context.HttpContext.Response.StatusCode = result.StatusCode;
        }

        if (result.Content != null)
        {
            await context.HttpContext.Response.WriteAsync(result.Content);
        }
    }
}