export type ServiceType =
  | "house_2plus_move"
  | "apartment_2plus_move"
  | "full_service_move"
  | "labor_only"
  | "same_building_move"
  | "special_item_move"
  | "pod_storage_container"
  | "rental_truck_labor"
  | "single_item_move"
  | "long_distance_move";

export const SERVICE_ALIASES: Record<string, ServiceType> = {
  house: "house_2plus_move",
  "house-2": "house_2plus_move",
  "house-2plus": "house_2plus_move",
  house_2plus: "house_2plus_move",
  house_2plus_move: "house_2plus_move",
  residential: "house_2plus_move",
  apt: "apartment_2plus_move",
  "apt-2": "apartment_2plus_move",
  apartment: "apartment_2plus_move",
  "apartment-2": "apartment_2plus_move",
  "apartment-2plus": "apartment_2plus_move",
  apartment_2plus: "apartment_2plus_move",
  apartment_2plus_move: "apartment_2plus_move",
  apartment_move: "apartment_2plus_move",
  "apartment-move": "apartment_2plus_move",
  "full-service": "full_service_move",
  full_service: "full_service_move",
  full_service_move: "full_service_move",
  "labor-only": "labor_only",
  labor_only: "labor_only",
  labor_only_move: "labor_only",
  loading: "labor_only",
  unloading: "labor_only",
  "same-building": "same_building_move",
  same_building: "same_building_move",
  same_building_move: "same_building_move",
  "special-item": "special_item_move",
  special_item: "special_item_move",
  special_item_move: "special_item_move",
  pod: "pod_storage_container",
  pod_move: "pod_storage_container",
  container: "pod_storage_container",
  "pod-storage-container": "pod_storage_container",
  pod_storage_container: "pod_storage_container",
  uhaul: "rental_truck_labor",
  "u-haul": "rental_truck_labor",
  "rental-truck": "rental_truck_labor",
  rental_truck: "rental_truck_labor",
  rental_truck_move: "rental_truck_labor",
  rental_truck_labor: "rental_truck_labor",
  "single-item": "single_item_move",
  single_item: "single_item_move",
  single_item_move: "single_item_move",
  "long-distance": "long_distance_move",
  long_distance: "long_distance_move",
  long_distance_move: "long_distance_move",
  interstate: "long_distance_move",
  "out-of-state": "long_distance_move",
  out_of_state: "long_distance_move",
};

export const SERVICE_LABELS: Record<ServiceType, string> = {
  house_2plus_move: "House — 2+ rooms",
  apartment_2plus_move: "Apartment — 2+ rooms",
  full_service_move: "Full-service move",
  labor_only: "Labor only",
  same_building_move: "Same-building move",
  special_item_move: "Special item",
  pod_storage_container: "POD / container",
  rental_truck_labor: "U-Haul / rental truck",
  single_item_move: "Single item",
  long_distance_move: "Long-distance / interstate",
};

/**
 * Step-2 choices on the quote form (`UniversalLeadForm`).
 * One list per service. The quote form picks one; it has no quantities.
 */
export const SERVICE_DETAIL_OPTIONS: Record<ServiceType, readonly string[]> = {
  house_2plus_move: ["2 bedrooms", "3 bedrooms", "4+ bedrooms"],
  apartment_2plus_move: ["2 bedrooms", "3 bedrooms", "3+ bedrooms"],
  long_distance_move: ["Within Florida", "Out of state", "Not sure yet"],
  full_service_move: [
    "Studio",
    "1 bedroom",
    "2 bedrooms",
    "3 bedrooms",
    "4+ bedrooms",
    "Office / commercial",
  ],
  labor_only: [
    "Loading only",
    "Unloading only",
    "Loading + unloading",
    "In-home moving",
  ],
  same_building_move: [
    "Studio",
    "1 bedroom",
    "2 bedrooms",
    "3+ bedrooms",
    "Office / commercial",
  ],
  special_item_move: [
    "Piano",
    "Safe",
    "Large furniture",
    "Appliance",
    "Exercise equipment",
    "Other",
  ],
  pod_storage_container: ["Load container", "Unload container", "Load + unload"],
  rental_truck_labor: [
    "Load rental truck",
    "Unload rental truck",
    "Load + unload",
  ],
  single_item_move: [
    "Couch / sectional",
    "Bed / mattress",
    "Dining set",
    "Appliance",
    "Desk / office furniture",
    "Other",
  ],
};

const FURNITURE_ITEMS = [
  "Boxes",
  "Bed or mattress",
  "Dresser",
  "Sofa or sectional",
  "Dining table",
  "Appliances",
  "Washer and dryer",
  "Desk",
  "TV",
] as const;

const LABOR_ITEMS = [
  "Boxes",
  "Furniture",
  "Appliances",
  "Loading",
  "Unloading",
] as const;

const STORAGE_ITEMS = [
  "Boxes",
  "Furniture",
  "Appliances",
  "Mattress",
  "Garage or storage items",
] as const;

const SINGLE_ITEM_LIST = [
  "Couch / sectional",
  "Bed / mattress",
  "Dining set",
  "Appliance",
  "Desk / office furniture",
  "Other",
] as const;

const SPECIAL_ITEM_LIST = [
  "Piano",
  "Safe",
  "Large furniture",
  "Appliance",
  "Exercise equipment",
  "Other",
] as const;

/** Inventory checkboxes for the lead form. Keyed by the live /quotes service. */
export const SERVICE_INVENTORY: Record<ServiceType, readonly string[]> = {
  house_2plus_move: FURNITURE_ITEMS,
  apartment_2plus_move: FURNITURE_ITEMS,
  long_distance_move: FURNITURE_ITEMS,
  full_service_move: FURNITURE_ITEMS,
  labor_only: LABOR_ITEMS,
  same_building_move: FURNITURE_ITEMS,
  special_item_move: SPECIAL_ITEM_LIST,
  pod_storage_container: STORAGE_ITEMS,
  rental_truck_labor: LABOR_ITEMS,
  single_item_move: SINGLE_ITEM_LIST,
};

export const SERVICE_OPTIONS: Array<{ value: ServiceType; label: string }> = [
  { value: "house_2plus_move", label: SERVICE_LABELS.house_2plus_move },
  { value: "apartment_2plus_move", label: SERVICE_LABELS.apartment_2plus_move },
  { value: "long_distance_move", label: SERVICE_LABELS.long_distance_move },
  { value: "full_service_move", label: SERVICE_LABELS.full_service_move },
  { value: "labor_only", label: SERVICE_LABELS.labor_only },
  { value: "same_building_move", label: SERVICE_LABELS.same_building_move },
  { value: "special_item_move", label: SERVICE_LABELS.special_item_move },
  { value: "pod_storage_container", label: SERVICE_LABELS.pod_storage_container },
  { value: "rental_truck_labor", label: SERVICE_LABELS.rental_truck_labor },
  { value: "single_item_move", label: SERVICE_LABELS.single_item_move },
];

export function resolveServiceParam(
  value: string | string[] | undefined,
): ServiceType | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  return SERVICE_ALIASES[raw.trim().toLowerCase()];
}

export function serviceFromSearch(search: string): ServiceType {
  const params = new URLSearchParams(search);
  return (
    resolveServiceParam(params.get("service") || undefined) ||
    resolveServiceParam(params.get("servicetype") || undefined) ||
    "house_2plus_move"
  );
}
