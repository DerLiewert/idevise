import { Tabs } from "@/shared/ui";
import { SpecificationGroup } from "../../api/specification-group";
import { SpecificationsGroups } from "./specifications-groups";
import { Specifications } from "./specifications";
import { SpecificationResponse } from "../../api/specification";
import { SearchFormData } from "../spesifications-data";

export const SpecificationsTable = ({
  groups,
  specifications,
  search,
}: {
  groups: SpecificationGroup[];
  specifications: SpecificationResponse[];
  search: SearchFormData;
}) => {
  return (
    <>
      <Tabs
        defaultValue="Display"
        orientation="vertical"
        className="border-neutral-350 gap-0 border"
      >
        <div className="border-r-neutral-350 flex-1 basis-100 border-r-2">
          <div className="bg-green-600 p-2.5 text-white">
            Группы характеристик
          </div>
          <div className="max-h-60 overflow-y-auto">
            <SpecificationsGroups groups={groups} search={search} />
          </div>
        </div>
        <div className="basis-250">
          <div className="bg-green-600 p-2.5 text-white">
            Характеристики <span className="opacity-70">(Display)</span>
          </div>
          <Specifications
            groups={groups}
            specifications={specifications}
            search={search}
          />
        </div>
      </Tabs>
    </>
  );
};
