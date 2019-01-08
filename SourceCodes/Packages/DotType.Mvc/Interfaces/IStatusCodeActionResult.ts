import { IActionResult } from "./IActionResult";

/**
 * Represents an IActionResult that when executed will
 * produce an HTTP response with the specified StatusCode.
 */
export interface IStatusCodeActionResult extends IActionResult
{
    /** Gets or sets the HTTP status code. */
    StatusCode: number | null;
}