import type { SonarClientFunc, SonarDocument } from "../sonar/sonar-client";
export declare class ElasticIndex {
    private name;
    private constructor();
    static create(name: string): Promise<ElasticIndex>;
    indexName(): string;
    insert(docs: SonarDocument<SonarClientFunc>[]): Promise<Response>;
    private encodeDocs;
    setAlias(aliasName: string): Promise<void>;
}
