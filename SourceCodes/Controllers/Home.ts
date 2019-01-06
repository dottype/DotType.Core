import { Controller } from "../Packages/DotType.Mvc/Controller";
import { IActionResult } from "../Packages/DotType.Mvc/Interfaces/IActionResult";

export class Home extends Controller
{
    public async Index(id: string): Promise<IActionResult>
    {
        await this.HttpContext.Response.WriteAsync("Welcome to DotType!");
        return this.Ok();
    }
}