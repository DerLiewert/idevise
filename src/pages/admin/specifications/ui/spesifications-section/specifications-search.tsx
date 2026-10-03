"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SearchFormData,
  SearchSchema,
  SearchType,
  useSearchStore,
} from "../../model";
import {
  SelectContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
  Input,
  Button,
  Field,
  FieldError,
} from "@/shared/ui";
import { cn } from "cn";

const searchTypeOptions: { value: SearchType; label: string }[] = [
  { value: "groups", label: "Группы характеристик" },
  { value: "specifications", label: "Характеристики" },
];

export const SpecificationsSearch = ({ className }: { className?: string }) => {
  const { type, value, setSearch } = useSearchStore();

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(SearchSchema),
    defaultValues: { type, value },
  });

  const onSubmit: SubmitHandler<SearchFormData> = (data) => {
    setSearch(data);
  };

  return (
    <form
      className={cn("flex gap-3", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-3">
        <p className="inline-flex h-8 items-center text-nowrap">Поиск по</p>
        <Controller
          control={control}
          name="type"
          render={({ field, fieldState, formState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Select
                name={field.name}
                items={searchTypeOptions}
                defaultValue={
                  formState.defaultValues
                    ? formState.defaultValues.type
                    : searchTypeOptions[0].value
                }
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className="min-w-60"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {searchTypeOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <Controller
        name={"value"}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Input {...field} type="search" aria-invalid={fieldState.invalid} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button className="basis-50" type="submit">
        Поиск
      </Button>
    </form>
  );
};
