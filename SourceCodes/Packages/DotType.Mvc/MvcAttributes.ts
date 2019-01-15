import { Attribute } from "../DotType/Attribute";

export class MvcAttribute extends Attribute
{
    public static HttpGet(target: any): void;
    public static HttpGet(target: any, key: string, descriptor?: any): void;
    public static HttpGet(target: any, key?: string, descriptor?: any): void
    {
        target.HttpMethod = "GET";
        return descriptor;
    }

    public static HttpPost(target: any): void;
    public static HttpPost(target: any, key: string, descriptor?: any): void;
    public static HttpPost(target: any, key?: string, descriptor?: any)
    {
        target.HttpMethod = "POST";
        return descriptor;
    }
}