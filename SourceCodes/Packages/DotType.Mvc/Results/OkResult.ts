import { StatusCodeResult } from "./StatusCodeResult";
import { StatusCodes } from "../../DotType.Http/StatusCodes";

/** When executed will produce an empty StatusCodes.Status200OK response. */
export class OkResult extends StatusCodeResult
{
    /** Initialize a new instanvce of OkResult class */
    constructor()
    {
        super(StatusCodes.Status200OK);
    }
}