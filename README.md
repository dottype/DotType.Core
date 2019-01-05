# DotType MVC

DotType MVC is a semi-port of .Net Core MVC to TypeScript. Useful for people that come 
from strongly-type languages like c# and java, and have difficulties with existing javascript frameworks.

DotType MVC is a very fast, lighweight and simple server-side framework based on Node.js, written in TypeScript. 

## Installing
The DotType credo is simplicity. Everything that you need for install and run the framework is here.

1. Install [Node.Js](https://nodejs.org/en/).
   Nodejs will install [npm](https://www.npmjs.com) - a package manager for javascript
2. Install TypeScript

   ```bash
   npm install -g typescript
   ```
3. We are yousing [Visual Studio Code](https://code.visualstudio.com) for development. Download and install it.
4. [Download](https://github.com/dottype/DotType.Mvc/archive/master.zip) or clone or  the repository.
5. Open Visual Studio Code, select "Open folder" and navigate to the saved repository folder:

![Visual Studio Code](https://github.com/dottype/DotType.Mvc/blob/master/Images/vscode.png)

6. Press "ctrl+shift+B" (or cmd+shift+B on mac) and select build.
7. Open terminal at Build folder an enter the following command:

   ```bash
   node --inspect Program
   ```
8. Open localhost in your browser:

![localhost](https://github.com/dottype/DotType.Mvc/blob/master/Images/dottype_localhost.png)

9. Done!