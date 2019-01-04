interface String 
{
    /** Formats the string into PascalCase. */
    ToPascalCase(): string;

    /** Formats the string into camelCase. */
    ToCamelCase(): string;
}

String.prototype.ToPascalCase = function () 
{
    return this.replace(/(?:^\w|[A-Z]|-|\b\w)/g, 
    (
        ltr, index: number) => index === 0
              ? ltr.toUpperCase()
              : ltr.toUpperCase()
    ).replace(/\s+|-/g, '');
}

String.prototype.ToCamelCase = function () 
{
    return this.replace(/(?:^\w|[A-Z]|-|\b\w)/g, 
    (
        ltr, idx) => idx === 0
              ? ltr.toLowerCase()
              : ltr.toUpperCase()
    ).replace(/\s+|-/g, '');
}