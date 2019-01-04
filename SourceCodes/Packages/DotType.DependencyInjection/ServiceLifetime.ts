/** Represents a service object lifetime */
export enum ServiceLifetime
{
    /**
     * Created the first time service is requested and disposed when scope ends.
     */
    Singleton, 
    /**
     * Created once per request.
     */
    Scoped,
    /**
     * Created each time a service is requested.
     */
    Transient
}