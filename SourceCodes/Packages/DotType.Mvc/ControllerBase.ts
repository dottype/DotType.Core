import { IHttpContext } from "../DotType.Hosting/Interfaces/IHttpContext";
import { IController } from "./Interfaces/IController";
import { OkResult } from "./Results/OkResult";
import { JsonResult } from "./Results/JSonResult";
import { ContentResult } from "./Results/ContentResult";

/**
 * Base class for an MVC controller without view support.
 */
export abstract class ControllerBase implements IController
{
    /** Gets or sets the controller Http context. */
    public HttpContext!: IHttpContext;

    /** Creates a OkResult object that produces an empty StatusCodes.Status200OK response. */
    public Ok(): OkResult
    {
        return new OkResult();
    }

    /** Creates a OkResult object that produces an empty StatusCodes.Status200OK response. */
    public Json(value: object): JsonResult
    {
        return new JsonResult(value);
    }

    /**
     * Creates a ContentResult object with StatusCodes.Status200OK
     * by specifying a content string.
     */
    public Content(content: string): ContentResult;

    /**
     * Creates a ContentResult object with StatusCodes.Status200OK
     * by specifying a content string and a contentType.
     */
    public Content(content: string, contentType: string): ContentResult;

    public Content(content: string, contentType?: string): ContentResult
    {
        if(contentType)
        {
            return new ContentResult(content, contentType);
        }

        return new ContentResult(content)
    }
}