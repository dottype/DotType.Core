import { Controller } from "../Packages/DotType.Mvc/Controller";
import { IActionResult } from "../Packages/DotType.Mvc/Interfaces/IActionResult";

export class Home extends Controller
{
    public async Index(id: string): Promise<IActionResult>
    {
        await this.HttpContext.Response.WriteAsync("This is a text from index action in home controller with parameter Id=" + id);
        return this.Ok();
    }
}