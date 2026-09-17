export type ServiceType =
  | "house_2plus_move"
  | "apartment_2plus_move"
  | "full_service_move"
  | "labor_only"
  | "same_building_move"
  | "special_item_move"
  | "pod_storage_container"
  | "rental_truck_labor"
  | "single_item_move";

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
};

export const SERVICE_OPTIONS: Array<{ value: ServiceType; label: string }> = [
  { value: "house_2plus_move", label: SERVICE_LABELS.house_2plus_move },
  { value: "apartment_2plus_move", label: SERVICE_LABELS.apartment_2plus_move },
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
