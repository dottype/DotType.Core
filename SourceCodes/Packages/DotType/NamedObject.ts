import { Check } from "./Check";

/** Class containg Name property. */
export class NamedObject
{
    /** Gets or sets the name. */
    private name: string;

    /** Gets the Name. */
    public get Name()
    {
        return this.name;
    }

    /** Sets the Name. */
    public set Name(value)
    {
        this.name = value;
    }

    /**
     * Initializes a new instance of NameValue class.
     * @param name The Name of NameValue class.
     */
    constructor(name: string)
    {
        Check.IsNullOrUndefined(name);
        this.name = name;
    }
}