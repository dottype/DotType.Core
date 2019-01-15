import { Controller } from "../Packages/DotType.Mvc/Controller";
import { IActionResult } from "../Packages/DotType.Mvc/Interfaces/IActionResult";
import { MvcAttribute } from "../Packages/DotType.Mvc/MvcAttributes";

@MvcAttribute.HttpPost
export class Home extends Controller
{
    @MvcAttribute.HttpGet
    public async Index(): Promise<IActionResult>
    {
        return this.Content('{"name":"John", "age":30}', "application/json");

        // OR
        // var jsonObject = { "Name": "Foo", "Id": 1234, "Rank": 7 };
        // return this.Json(jsonObject);

        // OR
        // return Ok();
    }
}