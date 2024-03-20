export declare class ElasticClient {
    private static elasticClientInstance;
    private constructor();
    static instance(): ElasticClient;
    private buildHeaders;
    private url;
    listIndices(): Promise<any>;
    createIndex(name: string): Promise<Response>;
    createAlias(index: string, alias: string): Promise<Response>;
    changeAlias(index: string, alias: string): Promise<Response>;
    deleteIndex(index: string): Promise<Response>;
    deleteAllIndices(): Promise<void>;
    bulk(body: string): Promise<Response>;
    multiMatch(query: string, fields: string[]): Promise<Response>;
}
