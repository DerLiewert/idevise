"use server";
import { getSupabase } from "@/lib/supabase/server";
import { Database } from "@/shared/api/database.types";
import { revalidatePath } from "next/cache";

export type SpecificationGroupTable =
  Database["public"]["Tables"]["specifications_group"];

export type SpecificationGroup = SpecificationGroupTable["Row"];
export type SpecificationGroupInsert = Omit<
  SpecificationGroupTable["Insert"],
  "id"
>;
export type SpecificationGroupUpdate = Omit<
  SpecificationGroupTable["Update"],
  "id"
> & { id?: never };

//========== CREATE ============================================================
export const createSpecificationsGroup = async (
  payload: SpecificationGroupInsert,
) => {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("specifications_group")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("Группа с таким именем уже существует");
    }

    throw new Error("Не удалось создать группу");
  }

  // revalidatePath("/admin/specifications");

  return data;
};

//========== GET ============================================================
export const getSpecificationsGroup = async () => {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("specifications_group")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;

  return data;
};

//========== UPDATE ============================================================
export const updateSpecificationsGroup = async (
  id: number,
  payload: SpecificationGroupUpdate,
) => {
  const supabase = await getSupabase();

  const { id: _, ...params } = payload;
  const { data, error } = await supabase
    .from("specifications_group")
    .update(params)
    .eq("id", id)
    .select("id, name")
    .single();

  if (error) throw error;

  return data;
};

//========== DELETE ============================================================
export const deleteSpecificationsGroup = async (id: number) => {
  const supabase = await getSupabase();

  const { error } = await supabase
    .from("specifications_group")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

