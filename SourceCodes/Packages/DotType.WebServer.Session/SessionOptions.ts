import { CookieOptions } from "../DotType.WebServer.Cookies/CookieOptions"
import { SameSiteMode } from "../DotType.WebServer.Cookies/SameSiteMode";

/** Represents a set of Session options. */
export class SessionOptions
{
    /** Gets the Session cookie default name. */
    private cookieName: string = ".DotType.Session";

    /** Gets or sets the Session cookie default path. */
    private cookiePath: string = "/";

    /** Gets the Session cookie default name. */
    public get CookieName(): string
    {
        return this.cookieName;
    }

    /** Gets the Session cookie default path. */
    public get CookiePath(): string
    {
        return this.cookiePath;
    }

    /**
     * Sets the Session Cookie name.
     * @param value The cookie name.
     */
    public SetCookieName(value: string): SessionOptions
    {
        this.cookieName = value;
        return this; 
    }

    /**
     * Sets the Session Cookie path.
     * @param value The cookie path.
     */
    public SetCookiePath(value: string): SessionOptions
    {
        this.cookieName = value;
        return this; 
    }

    /** Gets the Session cookie default options. */
    public readonly CookieOptions: CookieOptions;

    /** Initializes a new instance of SessionOptions class */
    constructor()
    {
        this.CookieOptions = new CookieOptions
        (
            null, 
            this.CookiePath, 
            null, 
            false, 
            SameSiteMode.Lax, 
            true, 
            null
        )
    }
}