import fs = require('fs');

export class FileSystem
{
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