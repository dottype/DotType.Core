/** Class that represents a collection of generic objects. */
export class Collection<T>
{
    /** Gets or sets the collection items. */
    public Items: Array<T> = new Array();

    /** Gets the array items count of the array. */
    public get Count(): number
    {
        return this.Items.length;
    }

    /**
     * Sorts the collection.
     * @param compareFn The name of the function used to determine the order of the elements. 
     * If omitted, the elements are sorted in ascending, ASCII character order.
     */
    public Sort(compareFn?: (a: T, b: T) => number): void
    {
        this.Items = this.Items.sort(compareFn);
    }

    /** Clears items in collection. */
    public Clear()
    {
        this.Items = new Array();
    }

    /**
     * Performs the specified action for each element in the collection.
     * @param callbackfn A function that accepts up to three arguments. 
     * Foreach calls the callbackfn function one time for each element in the collection.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. 
     * If thisArg is omitted, undefined is used as the this value.
     */
    public ForEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void
    {
        return this.Items.forEach(callbackfn);
    }

    /**
     * Returns the value of the first element in the collection where predicate is true, and null otherwise.
     * @param predicate Find calls predicate once for each element of the collection, in ascending order, 
     * until it finds one where predicate returns true. If such an element is found, find immediately 
     * returns that element value. Otherwise, find returns null.
     * @param args If provided, it will be used as the this value for each invocation of predicate.
     */
    public Find(predicate: (value: T, index: number, obj: T[]) => boolean, args?: any): T | null
    {
        var result = this.Items.find(predicate, args);
        if(!result)
        {
            return null;
        }
        return result;
    }

    /**
     * Returns the index of the first occurrence of a value in the collection.
     * @param item The value to locate.
     */
    public Contains(item: T): boolean
    {
        return this.Items.indexOf(item) >= 0;
    }

    /**
     * Removes the item from collection.
     * @param item The item to remove from collection.
     */
    public Remove(item: T): void
    {
        this.Items.slice(this.Items.indexOf(item), 1);
    }

    /**
     * Add an item to collection.
     * @param item The item to add to collection.
     */
    public Add(item: T): number
    {
        return this.Items.push(item);
    }
}