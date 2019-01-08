import { Controller } from "../Packages/DotType.Mvc/Controller";
import { IActionResult } from "../Packages/DotType.Mvc/Interfaces/IActionResult";

export class Home extends Controller
{
    public async Index(id: string): Promise<IActionResult>
    {
        var jsonObject = { "Name": "Foo", "Id": 1234, "Rank": 7 };
        return this.Json(jsonObject);
    }
}