import { Cookie } from "./Cookie";
import { Collection } from "../DotType/Collection<T>";
import { CookieOptions } from "./CookieOptions";

export class CookiesCollection
{
    private items: Collection<Cookie> = new Collection<Cookie>();

    public Append(name: string, value: string) : void;
    public Append(name: string, value: string, cookieOptions: CookieOptions): void

    public Append(name: string, value: string, cookieOptions?: CookieOptions)
    {
        var cookie = new Cookie(name, value);
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

        //var cookieValue = setCookieHeaderValue.ToString();
        //Headers[HeaderNames.SetCookie] = StringValues.Concat(Headers[HeaderNames.SetCookie], cookieValue);
    }

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
}