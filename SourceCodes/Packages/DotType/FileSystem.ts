import fs = require('fs');

/** Class that represents File IO functionality. */
export class FileSystem
{
    /**
     * Saves file to disk.
     * @param fileName The file name.
     * @param fileContent The file content.
     * @param overwriteExisting Determine whether to overwrite existing file.
     */
    public static async SaveFile(fileName: string, fileContent: string, overwriteExisting: boolean = true): Promise<void>
    {
        if(!overwriteExisting && fs.existsSync(fileName))
        {
            return;
        }
        
        await fs.writeFile(fileName, fileContent, function(exception) 
        {
            if (exception) 
            {
                return console.error(exception);
            }
        });
    }

    /**
     * Load file.
     * @param fileName The file name to load.
     */
    public static Load(fileName: string): string | null
    {
        try
        {
            return fs.readFileSync(fileName, 'utf8');
        }
        catch (exception)
        {
            console.log(exception);
            return null;
        }
    }
}