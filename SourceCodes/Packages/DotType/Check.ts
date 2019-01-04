import { Exception } from "./Exception";

/**
 * Class that represents functionality for various checks.
 */
export class Check
{
    /**
     * Check if given value is null.
     * @param value The value to check.
     * @throws Exception When the "value" parameter is null
     */
    public static IsNull(value: any): void
    {
        if(value == null)
        {
            throw new Exception(Exception.EXCEPTION_NULL);
        }
    }
    /**
     * Check if given value is null or undefined.
     * @param value The value to check.
     * @throws Exception When the "value" parameter is null or undefined
     */
    public static IsNullOrUndefined(value: any): void
    {
        if(value == null || value == "undefined" || value == undefined)
        {
            throw new Exception(Exception.EXCEPTION_NULL_OR_UNDEFINED);
        }
    }
}