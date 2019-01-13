import { ISessionStorage } from "./Interfaces/ISessionStorage"
import { ISession } from "./Interfaces/ISession";

export class FileSessionStorage implements ISessionStorage
{
    public LoadAsync(session: ISession): Promise<ISession>
    {
        throw new Error("Method not implemented.");
    }
    
    public SaveAsync(session: ISession): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
}