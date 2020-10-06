export interface IDatabase{
    connect(): Promise<boolean | Error>;
    //executeRawQuery(query: string): Promise<any | Error>;

}