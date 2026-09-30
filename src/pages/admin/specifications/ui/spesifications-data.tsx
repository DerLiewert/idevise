"use client";
import {
  SelectContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
  Input,
  Button,
  FieldDescription,
} from "@/shared/ui";
import { SpecificationsTable } from "./specifications-table";
import { SpecificationResponse } from "../api/specification";
import { SpecificationGroup } from "../api/specification-group";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormStateReturn,
} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSearchStore } from "../model/search-store";

const items = [
  { value: "groups", label: "Группы характеристик" },
  { value: "specifications", label: "Характеристики" },
];

const Schema = z.object({
  type: z.string(),
  value: z.string().trim(),
});
export type SearchFormData = z.output<typeof Schema>;

export const SpesificationsData = ({
  groups,
  specifications,
}: {
  groups: SpecificationGroup[];
  specifications: SpecificationResponse[];
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: { type: "specifications", value: "" },
  });

  const [search, setSearch] = useState<SearchFormData>({
    type: "specifications",
    value: "",
  });

  const onSubmit: SubmitHandler<SearchFormData> = (data) => {
    setSearch(data);
  };

  return (
    <>
      <div className="mb-5">
        <h2 className="mb-5 text-2xl">Все характеристики</h2>
        <form
          className="flex items-center gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-x-3">
            <span className="text-nowrap">Поиск по</span>

            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  items={items}
                  defaultValue={items[1]}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <Controller
            name={"value"}
            control={control}
            render={({ field }) => <Input {...field} />}
          />

          <Button className="basis-50" type="submit">
            Поиск
          </Button>
        </form>
        {errors.value && (
          <FieldDescription className="text-destructive">
            * {errors.value.message}
          </FieldDescription>
        )}
      </div>
      <SpecificationsTable
        search={search}
        groups={groups}
        specifications={specifications}
      />
    </>
  );
};
