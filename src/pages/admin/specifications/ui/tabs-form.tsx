import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui";
import { getSpecificationsGroup } from "../api/specification-group";
import { FormGroup } from "./form-group";
import { FormSpecification } from "./form-specification";

export const TabsForm = async () => {
  const groups = await getSpecificationsGroup();

  return (
    <Tabs defaultValue="groups" className="gap-4">
      <div className="overflow-x-auto overflow-y-hidden pb-0.5">
        <TabsList className="w-full justify-start" variant="line">
          <TabsTrigger value="groups">Добавить группу</TabsTrigger>
          <TabsTrigger value="specifications">
            Добавить характеристику
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="groups">
        {/* <FormAddGroup /> */}
        <FormGroup role="add" />
      </TabsContent>
      <TabsContent value="specifications">
        {/* <FormAddSpecification groups={groups} /> */}
        <FormSpecification role='add' groups={groups} />
      </TabsContent>
    </Tabs>
  );
};
