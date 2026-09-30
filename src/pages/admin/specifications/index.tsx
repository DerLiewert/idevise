import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import type { Metadata } from "next";
import { SpesificationsData, TabsForm } from "./ui";
import { SpecificationsTable } from "./ui/specifications-table";
import { getSpecificationsGroup } from "./api/specification-group";
import { getSpecifications } from "./api/specification";

export const metadata: Metadata = {
  title: "iDevise | Админ | Характеристики",
};

const items = [
  { value: "groups", label: "Группы характеристик" },
  { value: "specifications", label: "Характеристики" },
];

export const SpecificationsPage = async () => {
  const groups = await getSpecificationsGroup();
  const specifications = await getSpecifications();

  return (
    <div className="py-7">
      <div className="container mb-5!">
        <h2 className="mb-3 text-3xl">Xарактеристик товаров</h2>
        <p className="text-secondary text-sm">
          Здесь вы можете управлять группами характеристик и самими
          характеристиками товаров магазина. Для изменения порядка групп во
          фронтэнде просто перетаскивайте их.
        </p>
      </div>
      <div className="container mb-10!">
        <TabsForm />
      </div>

      <div className="container">
        <SpesificationsData groups={groups} specifications={specifications} />
      </div>
      {/* <div className="container mb-5!">
        <h2 className="mb-5 text-2xl">Все характеристики</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-x-3">
            <span className="text-nowrap">Поиск по</span>

            <Select items={items} defaultValue={"specifications"}>
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
          </div>
          <Input />
          <Button className="basis-50">Поиск</Button>
        </div>
      </div>
      <div className="container">
        <SpecificationsTable groups={groups} specifications={specifications} />
      </div> */}
    </div>
  );
};

export default SpecificationsPage;
