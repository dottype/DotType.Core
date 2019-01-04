import { IHttpContext } from "../DotType.Hosting/Interfaces/IHttpContext";
import { IController } from "./Interfaces/IController";
import { OkResult } from "./Results/OkResult";

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
}