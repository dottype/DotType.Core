import { Cookie } from "./Cookie";
import { Collection } from "../DotType/Collection<T>";
import { CookieOptions } from "./CookieOptions";

/** Class that represents a collection of cookies. */
export class CookiesCollection
{
    /** Gets ir sets the items collection. */
    private items: Collection<Cookie> = new Collection<Cookie>();

    public Append(name: string, value: string) : void;
    public Append(name: string, value: string, cookieOptions: CookieOptions): void

    /**
     * Appends a cookie to collection.
     * @param name The cookie name.
     * @param value The cookie value.
     * @param cookieOptions Object representing the cookie options.
     */
    public Append(name: string, value: string, cookieOptions?: CookieOptions)
    {
        var cookie = new Cookie(name, encodeURIComponent(value));
        cookie.Path = "/";

        if(cookieOptions)
        {
            cookie.Domain = cookieOptions.Domain;
            cookie.Expires = cookieOptions.Expires;
            cookie.HttpOnly = cookieOptions.HttpOnly;
            cookie.MaxAge = cookieOptions.MaxAge;
            cookie.Path = cookieOptions.Path;
            cookie.SameSite = cookieOptions.SameSite;
            cookie.Secure = cookieOptions.Secure;
        }

        this.items.Add(cookie);
    }

    /**
     * Deletes a cookie.
     * @param name The cookie name.
     */
    public Delete(name: string)
    {
        var cookie = this.items.Find(t=>t.Name == name)
        {
            if(cookie)
            {
                cookie.Expires = new Date(0);
            }
        }
    }



    /**
     * Performs the specified action for each cookie in the collection.
     * @param callbackfn Calls the callbackfn function one time for each element in the collection.
     */
    public ForEach(callbackfn: (value: Cookie, index: number, array: Cookie[]) => void): void
    {
        return this.items.ForEach(callbackfn);
    }

    /**
     * Returns the value of the first Cookie in the collection where predicate is true, and null otherwise.
     * @param predicate Find calls predicate once for each element of the collection, in ascending order, 
     * until it finds one where predicate returns true. If such an element is found, find immediately 
     * returns that element value. Otherwise, find returns null.
     * @param args If provided, it will be used as the this value for each invocation of predicate.
     */
    public Find(predicate: (value: Cookie, index: number, obj: Cookie[]) => boolean, args?: any): Cookie | null
    {
        return this.items.Find(predicate, args);
    }
}