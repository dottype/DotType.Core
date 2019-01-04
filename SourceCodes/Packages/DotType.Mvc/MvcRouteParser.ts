import { IRouteParser } from "../DotType.Routing/Interfaces/IRouteParser";
import { RouteEngine } from "../DotType.Routing/RouteEngine";
import { Check } from "../DotType/Check";
import { Route } from "../DotType.Routing/Route";
import { NameValueObject } from "../DotType/NameValueObject";
import { Collection } from "../DotType/Collection<T>";
import { ParsedUrl } from "../DotType.Routing/ParsedUrl";

/** Represents the MVC route parser. */
export class MvcRouteParser implements IRouteParser
{
    private globalDefaults: Collection<NameValueObject> = new Collection<NameValueObject>();

    constructor()
    {
        this.globalDefaults.Add(new NameValueObject("controller", "Home"));
        this.globalDefaults.Add(new NameValueObject("action", "Index"));
        this.globalDefaults.Add(new NameValueObject("parameters", "*"));
    }

    public async ParseAsync(url: string, routeEngine: RouteEngine): Promise<ParsedUrl | null>
    {
        Check.IsNullOrUndefined(routeEngine);
        if(routeEngine.Routes.Count == 0)
        {
            return null;
        }

        var urlModule = require("url");
        var pathName = urlModule.parse(url, true).pathname;
        var splittedUrl = pathName.replace(new RegExp("//", 'g'), "/")
            .split("/")
            .filter(Boolean);
        
        for(let route of routeEngine.Routes.Items)
        {
            var foundRoute = this.MatchRoute(route, splittedUrl);
            if(foundRoute)
            {
                return foundRoute;
            }
        }

        return null;
    }

    private MatchRoute(route: Route, splittedUrl: []): ParsedUrl | null
    {
        var splittedTemplates = route.Template
            .split("/")
            .filter(Boolean);

        var parsedUrl = new ParsedUrl();


        for(let i = 0; i < splittedTemplates.length; i++)
        {
            //if literals are equal
            if((splittedUrl[i] in splittedUrl) && (splittedTemplates[i] === splittedUrl[i]))
            {
                //if defaults exist
                var routeDefault = route.Defaults != null ? route.Defaults.Items[i]: null;
                if(routeDefault != null)
                {
                    parsedUrl.Add(new NameValueObject(routeDefault.Name, splittedUrl[i]));
                }
                else //no defaults, looking into global defaults
                {
                    var globalDefault = this.globalDefaults != null ? this.globalDefaults.Items[i] : null;
                    if(globalDefault != null)
                    {
                        parsedUrl.Add(new NameValueObject(globalDefault.Name, splittedUrl[i]));
                    }
                }
            }
            else // not equal
            {
                if(splittedTemplates[i] == "{*}" && i == splittedTemplates.length -1) // if parameters
                {

                    var itemName = "";

                    //check for route defaults
                    var routeDefault = route.Defaults != null ? route.Defaults.Items[i]: null;
                    if(routeDefault != null)
                    {
                        itemName = routeDefault.Name;
                    }
                    //check in global defaults
                    else
                    {
                        var globalDefault = this.globalDefaults != null ? this.globalDefaults.Items[i] : null;
                        if(globalDefault != null)
                        {
                            itemName = globalDefault.Name;
                        }
                    }

                    parsedUrl.Add(new NameValueObject(itemName, this.ParseParameters(i, splittedUrl)));

                }
                else if(splittedTemplates[i].startsWith("{") && splittedTemplates[i].endsWith("}")) //if it is a template
                {
                    if(splittedUrl[i] != null || splittedUrl[i] != undefined) //if we have the url
                    {
                        parsedUrl.Add(new NameValueObject(splittedTemplates[i].replace("{", "").replace("}", ""), splittedUrl[i]));
                    }
                    else //we do not have url 
                    {
                        //check for route defaults
                        var routeDefault = route.Defaults != null ? route.Defaults.Items[i]: null;
                        if(routeDefault != null)
                        {
                            parsedUrl.Add(new NameValueObject(routeDefault.Name, routeDefault.Value));
                        }
                        //check in global defaults
                        else
                        {
                            var globalDefault = this.globalDefaults != null ? this.globalDefaults.Items[i] : null;
                            if(globalDefault != null)
                            {
                                parsedUrl.Add(new NameValueObject(globalDefault.Name, globalDefault.Value));
                            }
                        }
                    }
                }
            }
        }

        if(parsedUrl != null && parsedUrl.Count > 0)
        {
            parsedUrl.Add(new NameValueObject("Route", route));
            return parsedUrl;
        }

        return null;
    }

    private ParseParameters(startIndex: number, splittedUrl: [])
    {
        var parametersArray:[] = [];
        for(let i = startIndex; i < splittedUrl.length; i++)
        {
            parametersArray.push(splittedUrl[i])
        }
            
        return parametersArray;
    }
}