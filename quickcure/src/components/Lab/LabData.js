// src/data/labsData.js

import chughtai from "../../images/chughtai.png";
import citilab from "../../images/citilab.png";
import excel from "../../images/excel.png";
import EssaLab from "../../images/EssaLab.png";
import oneHealth from "../../images/oneHealth.png";

export const labs = [
  {
    id: 1,
    name: "Chughtai Lab",
    branches: "284 Branches Available in 135 Cities",
    discount: "20%",
    logo: chughtai,
    // description: "Chughtai Lab is one of the top and foremost pathology labs in Pakistan...",
  },
  {
    id: 2,
    name: "Excel Labs",
    branches: "129 Branches Available in 65 Cities",
    discount: "20%",
    logo: excel,
    // description: "Excel Labs provides reliable diagnostic services nationwide...",
  },
  {
    id: 3,
    name: "Citilab and Research Centre",
    branches: "72 Branches Available in 55 Cities",
    discount: "25%",
    logo: citilab,
    // description: "Citilab offers advanced laboratory and research facilities...",
  },
  {
    id: 4,
    name: "Dr Essa Laboratory",
    branches: "60 Branches Available in 40 Cities",
    discount: "15%",
    logo: EssaLab,
    // description: "Essa Laboratory has been serving patients for 25 years...",
  },
  {
    id: 5,
    name: "One Health Labs",
    branches: "210 Branches Available in 100 Cities",
    discount: "18%",
    logo: oneHealth,
    description: "One Health Labs focuses on health diagnostics and research...",
  },
];

export default labs;

