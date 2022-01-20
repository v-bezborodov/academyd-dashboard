import React from "react";

import CoffeeTable from "./table";
import CoffeeShopStoreForm from "../coffeeShopStore/form";
import CoffeeShopStoreFormMonth from "../coffeeShopStore/formMonth";

const CoffeeShopMain = () => {
  return (
    <div>
      <div>
        <CoffeeShopStoreForm />
        <br/>
        <CoffeeShopStoreFormMonth />
      </div>
      <CoffeeTable />
    </div>
  );
};

export default CoffeeShopMain;
