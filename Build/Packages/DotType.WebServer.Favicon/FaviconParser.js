"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Console_1 = require("../DotType/Console");
class FaviconParser {
    constructor() {
        this.Name = "Favicon parser";
        this.Version = "0.0.1-beta";
        this.Order = -1000;
    }
    OnRequestAsync(httpContext, caller) {
        return __awaiter(this, void 0, void 0, function* () {
            if (httpContext.Request.Url == "/favicon.ico") {
                const favicon = Buffer.from("AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAADHjVUA////ALt0MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiIiIiIiIiIiIiIiIiIiIiIiIREiIBIiIiIhIhIgEiIiIiEiEiASIiIiISISIBIiIiIhESIRESIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "base64");
                httpContext.Response.StatusCode = 200;
                httpContext.Response.SetHeader('Content-Length', favicon.length);
                httpContext.Response.SetHeader('Content-Type', 'image/x-icon');
                httpContext.Response.SetHeader("Cache-Control", "public, max-age=2592000");
                httpContext.Response.SetHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
                yield httpContext.Response.End(favicon);
            }
        });
    }
    OnErrorAsync(exception) {
        return __awaiter(this, void 0, void 0, function* () {
            Console_1.Console.Write(exception);
        });
    }
}
exports.FaviconParser = FaviconParser;
//# sourceMappingURL=FaviconParser.js.map