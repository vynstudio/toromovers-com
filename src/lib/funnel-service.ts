export type ServiceType =
  | "full_service_move"
  | "labor_only"
  | "same_building_move"
  | "special_item_move"
  | "pod_storage_container"
  | "rental_truck_labor"
  | "single_item_move";

export const SERVICE_ALIASES: Record<string, ServiceType> = {
  "full-service": "full_service_move",
  full_service: "full_service_move",
  full_service_move: "full_service_move",
  "labor-only": "labor_only",
  labor_only: "labor_only",
  "same-building": "same_building_move",
  same_building: "same_building_move",
  same_building_move: "same_building_move",
  "special-item": "special_item_move",
  special_item: "special_item_move",
  special_item_move: "special_item_move",
  pod: "pod_storage_container",
  container: "pod_storage_container",
  "pod-storage-container": "pod_storage_container",
  pod_storage_container: "pod_storage_container",
  uhaul: "rental_truck_labor",
  "u-haul": "rental_truck_labor",
  "rental-truck": "rental_truck_labor",
  rental_truck: "rental_truck_labor",
  rental_truck_labor: "rental_truck_labor",
  "single-item": "single_item_move",
  single_item: "single_item_move",
  single_item_move: "single_item_move",
};

export function resolveServiceParam(
  value: string | string[] | undefined,
): ServiceType | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  return SERVICE_ALIASES[raw.trim().toLowerCase()];
}
