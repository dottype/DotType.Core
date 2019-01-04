import { ActionContext } from "../ActionContext";

/** Defines a contract that represents the result of an action method. */
export interface IActionResult
{
    /**
     * Executes the result operation of the action method asynchronously.
     * @param context The context in which the result is executed. 
     * The context information includes information about the action that was executed and request information.
     */
    ExecuteResultAsync(context: ActionContext): Promise<void>;
}