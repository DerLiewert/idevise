import { Database } from "@/shared/api/database.types";
import { SpecificationGroup } from "./specifications-groups-types";

export type SpecificationsTable =
  Database["public"]["Tables"]["specifications"];

export type Specification = SpecificationsTable["Row"];
export type SpecificationResponse = Pick<Specification, "id" | "name"> & {
  group: SpecificationGroup;
};

export type SpecificationsInsert = SpecificationsTable["Insert"];
export type SpecificationsUpdate = SpecificationsTable["Update"];
