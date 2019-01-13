import { ISessionStorage } from "./Interfaces/ISessionStorage"
import { ISession } from "./Interfaces/ISession";
import { FileSystem } from "../DotType/FileSystem";
import { NameValueObject } from "../DotType/NameValueObject";

export class FileSessionStorage implements ISessionStorage
{
    public async LoadAsync(session: ISession): Promise<ISession>
    {
        var fileData = FileSystem.Load("./Sessions/" + session.Id);
        if(fileData)
        {
            JSON.parse(fileData).Items.forEach((element: any) => 
            {
                session.Items.Add(new NameValueObject(element.name, element.value));    
            });
        }
        
        return session;
    }
    
    public async SaveAsync(session: ISession): Promise<void>
    {
        if(session && session.Items.Count > 0)
        {
            await FileSystem.SaveFile("./Sessions/"+ session.Id, JSON.stringify(session.Items));
        }
    }
}