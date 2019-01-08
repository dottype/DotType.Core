/** The base DotType Exception class. */
export class Exception extends Error
{
    /**
     * Initialize a new instance of Exception class
     * @param message The exception message
     */
    constructor(message: string) 
    {
        super(message);
        this.name = Exception.name;
    }

    public static readonly EXCEPTION_NULL: string = "Null object.";
    public static readonly EXCEPTION_NULL_OR_UNDEFINED: string = "Null or undefined object.";
    //TODO implement nameof
    public static readonly EXCEPTION_OBJECT_NOT_FOUND: string = "Object not found";
    public static readonly EXCEPTION_CANNOT_CREATE_OBJECT: string = "Cannot create object";
}