import { IActionResult } from "../Interfaces/IActionResult"
import { ActionContext } from "../ActionContext";

/** Class that represents a default implementation of IActionResult. */
export abstract class ActionResult implements IActionResult
{
    public abstract async ExecuteResultAsync(context: ActionContext): Promise<void>;
}