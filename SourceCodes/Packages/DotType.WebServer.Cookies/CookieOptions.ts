import { SameSiteMode } from "./SameSiteMode";

export class CookieOptions
{
    /** Gets or sets the domain to associate the cookie with. */
    public Domain: string | null = null;

    /** Gets or sets the cookie path. */
    public Path: string = "/";

    /** Gets or sets the expiration date and time for the cookie. */
    public Expires: Date | null = null;

    /** Gets or sets a value that indicates whether to transmit the cookie using Secure Sockets Layer (SSL)--that is, over HTTPS only. */
    public Secure: boolean = false;

    /** Gets or sets the value for the SameSite attribute of the cookie. The default value is SameSiteMode.Lax */
    public SameSite: SameSiteMode = SameSiteMode.Lax;

    /** Gets or sets a value that indicates whether a cookie is accessible by client-side script. */
    public HttpOnly: boolean = true; 

    /** Gets or sets the max-age for the cookie. */
    public MaxAge: number | null = null;

    constructor(domain: string | null, path: string, expires: Date | null, secure: boolean, sameSite: SameSiteMode, httpOnly: boolean, maxAge: number | null)
    {
        this.Domain = domain;
        this.Path = path;
        this.Expires = expires;
        this.Secure = secure;
        this.SameSite = sameSite;
        this.HttpOnly = httpOnly;
        this.MaxAge = maxAge;
    }
}