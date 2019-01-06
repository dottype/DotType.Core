import { SameSiteMode } from "./SameSiteMode";
import { Check } from "../DotType/Check";

export class Cookie
{
    /** Gets or sets the expiration date and time for the cookie. */
    public Expires: Date | null = null;

    /** Gets or sets the max-age for the cookie. */
    public MaxAge: string | null = null;

    /** Gets or sets the domain to associate the cookie with. */
    public Domain: string | null = null;

    /** Gets or sets the cookie path. */
    public Path: string | null = null;

    /** Gets or sets a value that indicates whether to transmit the cookie using Secure Sockets Layer (SSL)--that is, over HTTPS only. */
    public Secure: boolean = false;

    /** Gets or sets the value for the SameSite attribute of the cookie. The default value is SameSiteMode.Lax */
    public SameSite: SameSiteMode = SameSiteMode.Lax;

    /** Gets or sets a value that indicates whether a cookie is accessible by client-side script. */
    public HttpOnly: boolean = false;

    /** Gets or sets the cookie Name. */
    public Name: string;

    /** Gets or sets the cookie Value. */
    public Value: string;

    private expiresToken: string = "expires";
    private maxAgeToken: string = "max-age";
    private domainToken: string = "domain";
    private pathToken: string = "path";
    private secureToken: string = "secure";
    private sameSiteToken: string = "samesite";
    private httpOnlyToken: string = "httponly";
    private static readonly sameSiteLaxToken: string = SameSiteMode.Lax.toString().toLowerCase();
    private static readonly sameSiteStrictToken: string = SameSiteMode.Strict.toString().toLowerCase();

    constructor(name: string);
    constructor(name: string, value: string)

    /**
     * Initializes a new instance of Cookie class.
     * @param name The cookie name.
     * @param value The cookie value.
     */
    constructor(name: string, value?: string)
    {
        Check.IsNullOrUndefined(name);

        this.Name = name;
        this.Value = !value ? "" : value
    }
}