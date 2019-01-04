import { ServiceCollection } from "../../DotType.DependencyInjection/ServiceCollection";
import { WebApplication } from "../WebApplication";

/** The class that serves as a startup interface for a hosted application. */
export interface IStartup
{
    ConfigureServices(services: ServiceCollection): void;

    Configure(app: WebApplication): void;
}