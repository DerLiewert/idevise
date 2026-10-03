import { SpecificationGroup, SpecificationResponse } from "../../model";
import { SpecificationsGroupsList } from "./specifications-groups-list";
import { SpecificationsList } from "./specifications-list";
import { Tabs } from "@/shared/ui";

export const SpecificationsViewer = ({
  groups,
  specifications,
}: {
  groups: SpecificationGroup[];
  specifications: SpecificationResponse[];
}) => {
  return (
    <Tabs orientation="vertical" className="border-neutral-350 gap-0 border">
      <div className="border-r-neutral-350 grow-0 basis-100 border-r-2">
        <div className="bg-green-600 p-2.5 text-white">
          Группы характеристик
        </div>
        <div className="max-h-60 overflow-y-auto">
          <SpecificationsGroupsList groups={groups} />
        </div>
      </div>

      <div className="basis-250">
        <div className="bg-green-600 p-2.5 text-white">
          Характеристики {/*  <span className="opacity-70">(Display)</span> */}
        </div>
        <SpecificationsList groups={groups} specifications={specifications} />
      </div>
    </Tabs>
  );
};
