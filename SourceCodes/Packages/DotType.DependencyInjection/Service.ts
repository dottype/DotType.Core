import { ServiceLifetime } from "./ServiceLifetime";
import { Check } from "../DotType/Check";

/**
 * Represents a service class.
 */
export class Service
{
    /** Gets or sets the service lifetime. */
    public readonly Lifetime: ServiceLifetime;

    /** Gets or sets the service object */
    public readonly ServiceType: object;

    /** Gets or sets the service interface type */
    public readonly InterfaceType?: object;

    /**
     * Initializes a new instance of Service class.
     * @param serviceType The service type.
     * @param lifetime The service lifetime.
     * @param interfaceType The interface type.
     */
    constructor(serviceType: object, lifetime: ServiceLifetime, interfaceType?: object)
    {
        Check.IsNullOrUndefined(serviceType);
        Check.IsNullOrUndefined(lifetime);
        
        this.ServiceType = serviceType;
        this.Lifetime = lifetime;
        this.InterfaceType = interfaceType;
    }
}