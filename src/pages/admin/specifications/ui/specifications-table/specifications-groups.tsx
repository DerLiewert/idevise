"use client";
import { MoreHorizontalIcon } from "lucide-react";
import {
  TabsTrigger,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  TabsList,
  Button,
} from "@/shared/ui";
import {
  deleteSpecificationsGroup,
  SpecificationGroup,
} from "../../api/specification-group";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditGroupDialog } from "../edit-group-dialog";
import { SearchFormData } from "../spesifications-data";

export const SpecificationsGroups = ({
  groups,
  search,
}: {
  groups: SpecificationGroup[];
  search: SearchFormData;
}) => {
  const router = useRouter();
  const [focusedTab, setFocusedTab] = useState<number | null>(null);
  const [editableItem, setEdditableItem] = useState<SpecificationGroup | null>(
    null,
  );

  const filterableGroups =
    search.type === "groups" && search.value
      ? groups.filter((obj) =>
          obj.name.toLowerCase().includes(search.value.toLowerCase()),
        )
      : groups;

  return (
    <>
      <TabsList className="w-full gap-0 p-0">
        {[
          {
            id: -1,
            name: "All",
          },
          ...filterableGroups,
        ].map((obj, i) => {
          return (
            <div className="group relative w-full" key={i}>
              <TabsTrigger
                value={obj.id}
                className="min-h-9 rounded-none"
                onFocus={() => {
                  setFocusedTab(i);
                }}
              >
                {obj.name}
              </TabsTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                  onFocus={() => {
                    setFocusedTab(i);
                  }}
                  render={
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      tabIndex={focusedTab === i ? 0 : -1}
                    >
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEdditableItem(obj)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => {
                      deleteSpecificationsGroup(obj.id);
                      router.refresh();
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </TabsList>
      <EditGroupDialog
        item={editableItem}
        onClose={() => {
          setEdditableItem(null);
        }}
      />
    </>
  );
};
