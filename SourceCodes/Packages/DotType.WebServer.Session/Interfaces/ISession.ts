import { Collection } from "../../DotType/Collection<T>";
import { NameValueObject } from "../../DotType/NameValueObject";

export interface ISession
{
    /** Gets or sets the Session Id. */
    Id: string | null;

    /** Gets or sets the Session Items. */
    Items: Collection<NameValueObject>;
}