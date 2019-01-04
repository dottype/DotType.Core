/** Class that represents various function extensions. */
export class Functions
{
    /**
     * Gets function arguments.
     * @param func The function to get the arguments.
     */
    public static async GetArgumentsAsync(func: any): Promise<string[] | null>
    {
        var reg = /\(([\s\S]*?)\)/;
        var params = reg.exec(func);
        if (params)
        { 
            return params[1].replace(/\s/g,"").split(',');
        }

        return null;
    }

    /**
     * Gets function arguments length
     * @param func The function to analyse.
     */
    public static async GetArgumentsLengthAsync(func: any): Promise<number>
    {
        return func.length;
    }
}