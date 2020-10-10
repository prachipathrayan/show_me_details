export interface IDatabase{
    connect(): Promise<boolean | Error>;
}