import { Controller } from "../Packages/DotType.Mvc/Controller";
import { IActionResult } from "../Packages/DotType.Mvc/Interfaces/IActionResult";

export class Home extends Controller
{
    public async Index(): Promise<IActionResult>
    {
        return this.Content("some content", "application/json");

        // OR
        // var jsonObject = { "Name": "Foo", "Id": 1234, "Rank": 7 };
        // return this.Json(jsonObject);

        // OR
        // return Ok();
    }
}