import { SameSiteMode } from "./SameSiteMode";
import { Check } from "../DotType/Check";

export class Cookie
{
    /** Gets or sets the expiration date and time for the cookie. */
    public Expires: Date | null = null;

    /** Gets or sets the max-age for the cookie. */
    public MaxAge: number | null = null;

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
    private separatorToken: string = "; ";
    private equalsToken: string = "=";

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

    public toString()
    {
        var result: string = "";

        result += this.Name + this.equalsToken + this.Value;
        result += this.Expires != null ? this.BuildSegment(this.expiresToken, this.Expires!.toString()) : "";
        result += this.MaxAge != null ? this.BuildSegment(this.maxAgeToken, this.MaxAge.toString()) : "";
        result += this.Domain != null ? this.BuildSegment(this.domainToken, this.Domain) : "";
        result += this.Path != null ? this.BuildSegment(this.pathToken, this.Path) : "";
        result += this.Secure == true ? this.BuildSegment(this.secureToken, null) : "";
        result += this.SameSite != SameSiteMode.None ? this.BuildSegment(this.sameSiteToken, SameSiteMode[this.SameSite].toLowerCase()): ""; 
        result += this.HttpOnly == true ? this.BuildSegment(this.httpOnlyToken, null) : "";

        return result;

    }

    private BuildSegment(name: string, value: string | null): string
    {
        var result: string = "";
        result += this.separatorToken;
        result += name;
        if (value)
        {
            result += this.equalsToken;
            result += value;
        }

        return result;
    }
}