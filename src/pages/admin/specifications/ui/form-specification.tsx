"use client";
import z from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { createSpecification, updateSpecification } from "../api/specification";
import { useRouter } from "next/navigation";
import { SpecificationGroup } from "../api/specification-group";

const SpecificationSchema = z.object({
  name: z.string().trim().min(1, "Введите название группы характеристик"),
  group_id: z.number("Выберите группу"),
});

type SpecificationFormData = z.output<typeof SpecificationSchema>;

type FormSpecificationProps = {
  onSuccess?: () => void;
  groups: SpecificationGroup[];
} & (
  | { role: "add"; defaultValues?: never; specification_id?: never }
  | {
      role: "edit";
      defaultValues: SpecificationFormData;
      specification_id: number;
    }
);

export const FormSpecification = ({
  onSuccess,
  defaultValues,
  role,
  groups,
  specification_id,
}: FormSpecificationProps) => {
  const router = useRouter();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
    resetField,
  } = useForm({
    resolver: zodResolver(SpecificationSchema),
    defaultValues: defaultValues ?? {
      name: "",
      group_id: undefined,
    },
  });

  const groupsOptions = [
    { id: null, name: "Choose department" },
    ...groups,
  ].map((group) => ({ label: group.name, value: group.id }));

  const handleFormSubmit: SubmitHandler<SpecificationFormData> = async (data) => {
    try {
      if (role === "add") {
        await createSpecification(data);
        resetField("name");
      } else {
        await updateSpecification({ id: specification_id, ...data });
        reset();
      }

      onSuccess?.();
      router.refresh();
    } catch (error) {
      setError("name", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : `Не удалось ${role === "add" ? "создать" : "обновить"} характеристику`,
      });
    }

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldGroup className="flex-row">
        {/* Выбор группы характеристик */}
        <Field className="w-100">
          <FieldLabel>Группа характеристик</FieldLabel>
          <Controller
            control={control}
            name="group_id"
            render={({ field }) => (
              <Select
                items={groupsOptions}
                value={field.value ?? null}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {groupsOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.group_id && (
            <FieldDescription className="text-destructive">
              * {errors.group_id.message}
            </FieldDescription>
          )}
          <FieldDescription>
            Группа характеристик к которой относится будет относится создаваемая
            характеристика
          </FieldDescription>
        </Field>

        {/* Добавление характеристики к выбранной группе */}
        <Field className="w-auto flex-1">
          <FieldLabel>Название характеристики</FieldLabel>
          <Controller
            control={control}
            name={"name"}
            render={({ field }) => (
              <Input
                type="text"
                {...field}
                placeholder={
                  role === "edit"
                    ? "Прошлое значение: " + defaultValues.name
                    : ""
                }
                aria-invalid={errors[field.name] ? "true" : "false"}
              />
            )}
          />
          {errors.name && (
            <FieldDescription className="text-destructive">
              * {errors.name.message}
            </FieldDescription>
          )}
          <FieldDescription>
            Название определяет группу, которая будет содержать в себе
            относящиеся к ней характеристики.
          </FieldDescription>
        </Field>

        <Button className="mt-6.75 w-60" type="submit">
          Добавить характеристику
        </Button>
      </FieldGroup>
    </form>
  );
};
