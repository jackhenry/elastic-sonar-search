import type { GroupedSearchHits } from "@elastic-sonar-search/api";

export function groupNameFromKey(key: keyof GroupedSearchHits): string {
  switch (key) {
    case "Account":
      return "Accounts";
    case "Address":
      return "Addresses";
    case "Contact":
      return "Contacts";
    case "CustomFieldData":
      return "Custom Fields";
    case "Did":
      return "Dids";
    case "InventoryModelFieldData":
      return "Inventory Fields";
    case "IpAssignment":
      return "IP Assignments";
    case "NetworkSite":
      return "Network Sites";
    case "PhoneNumber":
      return "Phone Numbers";
    case "RadiusAccount":
      return "Radius Accounts";
    case "Ticket":
      return "Tickets";
    case "UninventoriedMacAddress":
      "Uninventoried Mac Addresses";
  }

  // Return blank group name if key is not present in switch
  return "";
}
