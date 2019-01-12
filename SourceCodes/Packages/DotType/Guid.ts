/** Class that represents a globally unique identifier (GUID) functionality. */
export class Guid
{
    /** A read-only instance of the Guid structure whose value is all zeros. */
    public static get Empty()
    {
        return "00000000-0000-0000-0000-000000000000";
    }

    /** Generates a new GUID object. */
    public static NewGuid(): string
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) 
        {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}