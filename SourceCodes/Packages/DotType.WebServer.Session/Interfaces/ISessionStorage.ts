import { ISession } from "./ISession";

/** Represents a contract for Session storages. */
export interface ISessionStorage
{
    /** Loads Session from Storage */
    LoadAsync(session: ISession): Promise<ISession>;

    /** Saves the Session to  storage*/
    SaveAsync(session: ISession): Promise<void>;
}