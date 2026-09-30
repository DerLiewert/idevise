"use server";
import { getSupabase } from "@/lib/supabase/server";
import { Database } from "@/shared/api/database.types";
import { revalidatePath } from "next/cache";
import { SpecificationGroup } from "./specification-group";

export type SpecificationsTable =
  Database["public"]["Tables"]["specifications"];

export type Specification = SpecificationsTable["Row"];
export type SpecificationResponse = Pick<Specification, "id" | "name"> & {
  group: SpecificationGroup;
};

export type SpecificationsInsert = SpecificationsTable["Insert"];
export type SpecificationsUpdate = SpecificationsTable["Update"];

//========== CREATE ============================================================
export const createSpecification = async (payload: SpecificationsInsert) => {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("specifications")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error(
        "Характеирика с таким именем уже существует для этой группы",
      );
    }

    throw new Error("Не удалось создать характеирику. Code: " + error.code);
  }

  return data;
};

//========== GET ============================================================
export const getSpecifications = async () => {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("specifications")
    .select(
      `
    id,
    name,
    group:specifications_group (
      id,
      name
    )`,
    )
    .order("id", { ascending: true });

  if (error) throw error;

  return data;
};

//========== UPDATE ============================================================
export const updateSpecification = async (payload: Specification) => {
  const supabase = await getSupabase();

  const { id, ...changes } = payload;
  const { data, error } = await supabase
    .from("specifications")
    .update(changes)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error(
        "Характеирика с таким именем уже существует для этой группы",
      );
    }

    throw new Error("Не удалось создать характеирику. Code: " + error.code);
  }

  return data;
};

//========== DELETE ============================================================
export const deleteSpecification = async (id: number) => {
  const supabase = await getSupabase();

  const { error } = await supabase.from("specifications").delete().eq("id", id);

  if (error) throw error;
};

export const deleteSpecifications = async (ids: number[]) => {
  const supabase = await getSupabase();

  const { error } = await supabase
    .from("specifications")
    .delete()
    .in("id", ids);

  if (error) throw error;

  // revalidatePath("/admin/specifications");
};
