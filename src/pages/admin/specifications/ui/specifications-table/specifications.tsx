"use client";
import { cn } from "cn";
import { useRouter } from "next/navigation";
import {
  TabsContent,
  Checkbox,
  Dialog,
  DialogContent,
  Button,
} from "@/shared/ui";
import {
  deleteSpecification,
  deleteSpecifications,
  SpecificationResponse,
} from "../../api/specification";
import { ActionDropdownMenu } from "../action-dropdown-menu";
import { SpecificationGroup } from "../../api/specification-group";
import { EditSpecificationDialog } from "../edit-specification-dialog";
import { useState } from "react";
import { SearchFormData } from "../spesifications-data";

export const Specifications = ({
  groups,
  specifications,
  search,
}: {
  groups: SpecificationGroup[];
  specifications: SpecificationResponse[];
  search: SearchFormData;
}) => {
  const router = useRouter();
  const [editableItem, setEdditableItem] =
    useState<SpecificationResponse | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const filterableSpecifications =
    search.type === "groups"
      ? specifications
      : search.value
        ? specifications.filter((obj) =>
            obj.name.toLowerCase().includes(search.value.toLowerCase()),
          )
        : specifications;

  return (
    <>
      {[
        {
          id: -1,
          name: "All",
        },
        ...groups,
      ].map((obj) => {
        return (
          <TabsContent
            className="max-h-60 overflow-y-auto"
            key={obj.id}
            value={obj.id}
          >
            {obj.id === -1 ? (
              filterableSpecifications.length ? (
                filterableSpecifications.map((obj, i) => {
                  return (
                    <div
                      key={i}
                      className={cn(
                        "group flex items-center gap-2.5 px-2.5 py-1.75 even:bg-green-200",
                      )}
                    >
                      <Checkbox
                        value={obj.id.toString()}
                        onCheckedChange={(checked) =>
                          setSelectedItems((prev) => {
                            const next = new Set(prev);

                            if (checked) {
                              next.add(obj.id);
                            } else {
                              next.delete(obj.id);
                            }

                            return next;
                          })
                        }
                      />
                      {obj.name} <span className="opacity-40">({obj.group.name})</span>
                      <ActionDropdownMenu
                        onEdit={() => {}}
                        onDelete={() => {
                          deleteSpecification(obj.id);
                          router.refresh();
                        }}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="flex h-full items-center justify-center text-center">
                  {specifications.length > 0
                    ? `Не найдено характеристик содержащих "${search.value}"`
                    : "Пока не добавлено никаких характеристик для этой группы"}
                </div>
              )
            ) : filterableSpecifications.filter((s) => s.group.id === obj.id)
                .length ? (
              filterableSpecifications
                .filter((s) => s.group.id === obj.id)
                .map((obj, i) => {
                  return (
                    <div
                      key={i}
                      className={cn(
                        "group flex items-center gap-2.5 px-2.5 py-1.75 even:bg-green-200",
                      )}
                    >
                      <Checkbox
                        value={obj.id.toString()}
                        onCheckedChange={(checked) =>
                          setSelectedItems((prev) => {
                            const next = new Set(prev);

                            if (checked) {
                              next.add(obj.id);
                            } else {
                              next.delete(obj.id);
                            }

                            return next;
                          })
                        }
                      />
                      {obj.name}
                      <ActionDropdownMenu
                        onEdit={() => setEdditableItem(obj)}
                        onDelete={() => {
                          deleteSpecification(obj.id);
                          router.refresh();
                        }}
                      />
                    </div>
                  );
                })
            ) : (
              <div className="flex h-full items-center justify-center text-center">
                {specifications.length > 0
                  ? `Не найдено характеристик содержащих "${search.value}"`
                  : "Пока не добавлено никаких характеристик для этой группы"}
              </div>
            )}
          </TabsContent>
        );
      })}
      <EditSpecificationDialog
        item={editableItem}
        onClose={() => {
          setEdditableItem(null);
        }}
        groups={groups}
      />

      {/* <Dialog open={selectedItems.size === 2}>
        <DialogContent>
          <Button
            onClick={() => {
              deleteSpecifications(Array.from(selectedItems));
            }}
          >
            Clear
          </Button>
        </DialogContent>
      </Dialog> */}
    </>
  );
};
