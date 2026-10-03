import type { Metadata } from "next";
import { SpecificationsSection, FormTabs } from "./ui";
import { getSpecificationsGroups, getSpecifications } from "./api";

export const metadata: Metadata = {
  title: "iDevise | Админ | Характеристики",
};

export const SpecificationsPage = async () => {
  const groups = await getSpecificationsGroups();
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
        <FormTabs groups={groups} />
      </div>
      <div className="container">
        <SpecificationsSection
          groups={groups}
          specifications={specifications}
        />
      </div>
    </div>
  );
};

export default SpecificationsPage;
