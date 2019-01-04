import { ServiceLifetime } from "./ServiceLifetime";
import { Service } from "./Service";
import { Collection } from "../DotType/Collection<T>";

export class ServiceCollection extends Collection<Service>
{
    //#region Add methods

    public AddSingleton(serviceType: object): boolean;

    public AddSingleton(serviceType: object, interfaceType: object): boolean;

    public AddSingleton(serviceType: object, interfaceType?: object)
    {
        return this.AddPrivate(serviceType, ServiceLifetime.Singleton, interfaceType);
    }

    public AddScoped(serviceType: object): boolean;

    public AddScoped(serviceType: object, interfaceType: object): boolean

    public AddScoped(serviceType: object, interfaceType?: object): boolean
    {
        return this.AddPrivate(serviceType, ServiceLifetime.Scoped, interfaceType);
    }

    public AddTransient(serviceType: object): boolean;

    public AddTransient(serviceType: object, interfaceType: object): boolean

    public AddTransient(serviceType: object, interfaceType?: object): boolean
    {
        return this.AddPrivate(serviceType, ServiceLifetime.Transient, interfaceType);
    }

    private AddPrivate(serviceType: object, lifetime: ServiceLifetime, interfaceType?: object): boolean
    {
        var serviceDescriptor = new Service(serviceType, lifetime, interfaceType);
        return this.Add(serviceDescriptor) >= 0;
    }

    //#endregion
}