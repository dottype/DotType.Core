import { Check } from "../DotType/Check";
import { Collection } from "../DotType/Collection<T>";
import { NameValueObject } from "../DotType/NameValueObject";

/** Defines a Route class */
export class Route 
{
    /** Gets or sets the route name */
    public Name: string;

    /** Gets or sets the route template */
    public Template: string;

    /** Gets or sets the route order. */
    public Order: number = 0;

    /** Gets or sets the Route defaults. */
    public Defaults: Collection<NameValueObject> = new Collection<NameValueObject>();

    constructor(name: string, template: string);

    constructor(name: string, template: string, defaults: Collection<NameValueObject>);
    
    /**
     * Initializes a new instance of Route class.
     * @param name The route name.
     * @param template The route template.
     * @defaults A collection of NameValue objects
     */
    constructor(name: string, template: string, defaults?: Collection<NameValueObject>)
    {
        Check.IsNullOrUndefined(name);
        Check.IsNullOrUndefined(template);

        this.Name = name;
        this.Template = template;
        
        if(defaults != null && defaults.Count > 0)
        {
            this.Defaults = defaults;
        }
    }
}