import { ControllerBase } from "./ControllerBase";

/**
 * Base class for an MVC controller with view support.
 */
export class Controller extends ControllerBase
{
    /**
     * ViewData dictionary.
     */
    public ViewData: {[key: string]: any} = {};
}