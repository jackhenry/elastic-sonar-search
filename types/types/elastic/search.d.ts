import type { AccountsQuery, AddressesQuery, ContactsQuery, CustomfielddataQuery, DidsQuery, InventorymodelfielddataQuery, IpassignmentsQuery, NetworksitesQuery, PhonenumbersQuery, RadiusaccountsQuery, TicketsQuery, UninventoriedmacaddressesQuery } from "../__generated__/graphql";
export type SearchHitSource = Exclude<AccountsQuery["result"]["entities"][number], null> | Exclude<AddressesQuery["result"]["entities"][number], null> | Exclude<ContactsQuery["result"]["entities"][number], null> | Exclude<CustomfielddataQuery["result"]["entities"][number], null> | Exclude<DidsQuery["result"]["entities"][number], null> | Exclude<InventorymodelfielddataQuery["result"]["entities"][number], null> | Exclude<IpassignmentsQuery["result"]["entities"][number], null> | Exclude<NetworksitesQuery["result"]["entities"][number], null> | Exclude<PhonenumbersQuery["result"]["entities"][number], null> | Exclude<RadiusaccountsQuery["result"]["entities"][number], null> | Exclude<TicketsQuery["result"]["entities"][number], null> | Exclude<UninventoriedmacaddressesQuery["result"]["entities"][number], null>;
export type SearchHit = {
    _index: string;
    _id: string;
    _score: number;
    _source: SearchHitSource;
};
type SearchHitDto<Typename extends SearchHit["_source"]["__typename"]> = Extract<SearchHitSource, {
    __typename: Typename;
}> & {
    _score: number;
};
export type GroupedSearchHits = {
    [typename in SearchHit["_source"]["__typename"]]?: SearchHitDto<typename>[];
};
type ValueOfSonarType<T extends SearchHitDto<SearchHit["_source"]["__typename"]>> = T["__typename"];
export declare function isSonarType<Result extends SearchHitDto<SearchHit["_source"]["__typename"]>, Typename extends ValueOfSonarType<Result>>(result: Result, typename: Typename): result is Extract<Result, {
    __typename: Typename;
}>;
export declare function search(query: string): Promise<GroupedSearchHits>;
export {};
