import log from "loglevel";
import { ElasticClient } from "./client";
import type {
  AccountsQuery,
  AddressesQuery,
  ContactsQuery,
  CustomfielddataQuery,
  DidsQuery,
  InventorymodelfielddataQuery,
  IpassignmentsQuery,
  NetworksitesQuery,
  PhonenumbersQuery,
  RadiusaccountsQuery,
  TicketsQuery,
  UninventoriedmacaddressesQuery,
} from "../__generated__/graphql";

export type SearchHitSource =
  | Exclude<AccountsQuery["result"]["entities"][number], null>
  | Exclude<AddressesQuery["result"]["entities"][number], null>
  | Exclude<ContactsQuery["result"]["entities"][number], null>
  | Exclude<CustomfielddataQuery["result"]["entities"][number], null>
  | Exclude<DidsQuery["result"]["entities"][number], null>
  | Exclude<InventorymodelfielddataQuery["result"]["entities"][number], null>
  | Exclude<IpassignmentsQuery["result"]["entities"][number], null>
  | Exclude<NetworksitesQuery["result"]["entities"][number], null>
  | Exclude<PhonenumbersQuery["result"]["entities"][number], null>
  | Exclude<RadiusaccountsQuery["result"]["entities"][number], null>
  | Exclude<TicketsQuery["result"]["entities"][number], null>
  | Exclude<UninventoriedmacaddressesQuery["result"]["entities"][number], null>;

export type SearchHit = {
  _index: string;
  _id: string;
  _score: number;
  _source: SearchHitSource;
};

type SearchHits = {
  max_score: number;
  hits: SearchHit[];
};

type SearchResponse = {
  hits: SearchHits;
};

type SearchHitDto<Typename extends SearchHit["_source"]["__typename"]> =
  Extract<SearchHitSource, { __typename: Typename }> & { _score: number };

export type GroupedSearchHits = {
  [typename in SearchHit["_source"]["__typename"]]?: SearchHitDto<typename>[];
};

type ValueOfSonarType<
  T extends SearchHitDto<SearchHit["_source"]["__typename"]>,
> = T["__typename"];

export function isSonarType<
  Result extends SearchHitDto<SearchHit["_source"]["__typename"]>,
  Typename extends ValueOfSonarType<Result>,
>(
  result: Result,
  typename: Typename
): result is Extract<Result, { __typename: Typename }> {
  return result.__typename === typename;
}

const fieldMap = {
  commonFields: ["id", "name"],
  addressFields: ["line1"],
  ticketFields: ["subject", "description"],
  didFields: ["number"],
  uninventoriedMacAddressFields: ["mac_address"],
  accountFields: ["name", "geopoint"],
  ipAssignmnetFields: ["subnet"],
  customFieldDataFields: ["value"],
  inventoryModelFieldDataFields: ["value"],
  contactFields: ["name", "email", "phone_numbers.entities.number"],
  networkSiteFields: ["name"],
  phoneNumberFields: ["number"],
};

export async function search(query: string) {
  const mergedFields = Object.values(fieldMap).reduce(
    (prev, curr) => [...curr, ...prev],
    []
  );
  // remove duplicates
  const fields = [...new Set(mergedFields)];
  const response = await ElasticClient.instance().multiMatch(query, fields);
  if (response.status !== 200) {
    log.error(`Search of term ${query} failed. Elastic response:`);
    log.error(await response.json());
    return null;
  }

  const searchResults = (await response.json()) as SearchResponse;

  const groupedHits: GroupedSearchHits = {};

  // If a property of "typename" is already in the groupedHits object, append the dto
  // otherwise, create an empty array first and push it
  function upsert<Typename extends SearchHit["_source"]["__typename"]>(
    typename: Typename,
    dto: SearchHitDto<Typename>
  ) {
    if (!(typename in groupedHits)) {
      groupedHits[typename] = [];
    }
    groupedHits[typename].push(dto);
  }

  searchResults.hits.hits.forEach((hit) => {
    const { __typename } = hit._source;
    const dto: SearchHitDto<typeof __typename> = {
      _score: hit._score,
      ...hit._source,
    };

    upsert(__typename, dto);
  });

  return groupedHits;
}
