/** Class that abstracts console functionality. */
export class Console
{
    /**
     * Writes a message to console.
     * @param message The message that will be written to console.
     */
    public static Write(message?: any, ...optionalParams: any[]): void
    {
        console.log(message);
    }

    /**
     * Writes a error message to console.
     * @param message The message that will be written to console.
     */
    public static Error(message?: any, ...optionalParams: any[]): void
    {
        console.error(message);
    }
}