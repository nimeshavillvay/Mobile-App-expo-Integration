import type { StaticImageData } from "next/image";
import duraseinSurfacesCatalog from "./durasein_surfaces_catalog.jpeg";
import handToolsCatalog from "./hand_tools_catalog.jpeg";
import karranCatalog from "./karran_catalog.jpeg";
import kentDesignWireGrillsCatalog from "./kent_design_wire_grills_catalog.jpeg";
import knanpeAndVogtCatalog from "./knape_and_vogt_catalog.jpeg";
import olympusLockCatalog from "./olympus_lock_catalog.jpeg";
import revAShelfCatalog from "./rev_a_shelf_catalog.jpeg";
import revAShelfSidelinesCatalog from "./rev_a_shelf_sidelines_catalog.jpeg";
import solventAndChemicalsCatalog from "./solvent_and_chemicals_catalog.jpeg";
import strongholdBracketsCatalog from "./stronghold_brackets_catalog.jpeg";
import tigerflexGlovesCatalog from "./tigerflex_gloves_catalog.jpeg";
import trescoCatalog from "./tresco_catalog.jpeg";
import vauthSagelCatalog from "./vauth_sagel_catalog.jpeg";
import woodworkingAndSolidSurfacesCatalog from "./woodworking_and_solid_surfaces_catalog.jpeg";
import wurthLouisAndCompanyCatalog from "./wurth_louis_and_company_catalog.jpeg";
import wurthLouisAndCompanyPremiumKitchenCatalog from "./wurth_louis_and_company_premium_kitchen_catalog.jpeg";
import wurthProCatalog from "./wurth_pro_catalog.jpeg";

const apiUrl = process.env.NEXT_PUBLIC_WURTH_LAC_API;

export type CatalogDataType = {
  readonly id: string;
  readonly url: string;
  readonly imageSrc: StaticImageData;
  readonly alt: string;
};

export type NonInteractiveCatalogDataType = {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly text: string;
};

export const catalogData: CatalogDataType[] = [
  {
    id: "wurth_pro",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/pro-catalog/",
    imageSrc: wurthProCatalog,
    alt: "Wurth Pro Catalog",
  },
  {
    id: "knape_and_vogt",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/knape-and-vogt-kv-catalog/",
    imageSrc: knanpeAndVogtCatalog,
    alt: "Knape and Vogt Catalog",
  },
  {
    id: "olympus_lock",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/olympus-locks/",
    imageSrc: olympusLockCatalog,
    alt: "Olympus Lock Catalog",
  },
  {
    id: "kent_designer_wire_grills",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/kent-design-wire-grills/",
    imageSrc: kentDesignWireGrillsCatalog,
    alt: "Kent Designer Wire Grills Catalog",
  },
  {
    id: "vauth_sagel",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/vauth-sagel-carbon-steel-and-platinum/",
    imageSrc: vauthSagelCatalog,
    alt: "Vauth Sagel Catalog",
  },
  {
    id: "karran",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/karran-sinks-2021/",
    imageSrc: karranCatalog,
    alt: "Karran Catalog",
  },
  {
    id: "durasein",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/durasein-tri-fold/",
    imageSrc: duraseinSurfacesCatalog,
    alt: "Durasein Catalog",
  },
  {
    id: "tresco",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/tresco-lighting-kits/",
    imageSrc: trescoCatalog,
    alt: "Tresco Catalog",
  },
  {
    id: "rev_a_shelf",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/rev-a-shelf-2022-new-products/",
    imageSrc: revAShelfCatalog,
    alt: "Rev A Shelf Catalog",
  },
  {
    id: "rev_a_shelf_sidelines",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/rev-a-shelf-sidelines/",
    imageSrc: revAShelfSidelinesCatalog,
    alt: "Rev A Shelf Sidelines Catalog",
  },
  {
    id: "stronghold_brackets",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/stronghold-brackets/",
    imageSrc: strongholdBracketsCatalog,
    alt: "Stronghold Brackets Catalog",
  },
  {
    id: "tigerflex_gloves",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/tigerflex-gloves/",
    imageSrc: tigerflexGlovesCatalog,
    alt: "Tigerflex Gloves Catalog",
  },
  {
    id: "wurth_solvents",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/wurth-solvents-and-chemicals/",
    imageSrc: solventAndChemicalsCatalog,
    alt: "Wurth Solvents and Chemicals Catalog",
  },
  {
    id: "wurth_woodworking",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/wurth-woodworking-and-solid-surfaces/",
    imageSrc: woodworkingAndSolidSurfacesCatalog,
    alt: "Wurth Woodworking And Solid Surfaces Catalog",
  },
  {
    id: "wurth_hand_tools",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/wurth-hand-tools/",
    imageSrc: handToolsCatalog,
    alt: "Wurth Hand Tools Catalog",
  },
  {
    id: "blum_catalog",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/blum-catalog-2023/",
    imageSrc: wurthLouisAndCompanyCatalog,
    alt: "Blum Catalog",
  },
  {
    id: "kessebohmer_catalog",
    url: "https://ipaper.ipapercms.dk/WurthBaerSupply/wurth-louis-and-company/kessebohmer-catalog/",
    imageSrc: wurthLouisAndCompanyPremiumKitchenCatalog,
    alt: "Kessebohmer Catalog",
  },
];

export const nonInteractiveCatalogs: NonInteractiveCatalogDataType[] = [
  {
    id: "wurth_pro",
    url: `${apiUrl}/assets/pdf/PRO_Catalog.pdf`,
    title: "Wurth PRO Catalog PDF - Opens in new window",
    text: "PRO Catalog",
  },
  {
    id: "kv_catalog",
    url: `${apiUrl}/assets/pdf/Knape_and_Vogt_KV_Catalog.pdf`,
    title: "Knape and Vogt Catalog PDF",
    text: "Knape and Vogt (KV)",
  },
  {
    id: "olympus_locks",
    url: `${apiUrl}/assets/pdf/Olympus_Locks.pdf`,
    title: "Olympus Locks Catalog PDF",
    text: "Olympus Locks",
  },
  {
    id: "design_wire_grills",
    url: `${apiUrl}/assets/pdf/Kent_Design_Wire_Grills.pdf`,
    title: "Kent Design Wire Grills PDF",
    text: "Kent Design Wire Grills",
  },
  {
    id: "vauth_sagel_carbon_steel",
    url: `${apiUrl}/assets/pdf/Vauth-Sagel_-_Carbon_Steel_and_Platinum.pdf`,
    title: "Vauth-Sagel Catalog PDF",
    text: "Vauth-Sagel - Carbon Steel and Platinum",
  },
  {
    id: "karran_sinks",
    url: `${apiUrl}/assets/pdf/Karran_Sinks.pdf`,
    title: "Karran Sinks Catalog PDF",
    text: "Karran Sinks 2022",
  },
  {
    id: "durasein",
    url: `${apiUrl}/assets/pdf/Durasein_Tri-Fold.pdf`,
    title: "Durasein Trifold Brochure PDF",
    text: "Durasein Trifold Brochure",
  },
  {
    id: "tresco_kits",
    url: `${apiUrl}/assets/pdf/Tresco_Lighting_Kits.pdf`,
    title: "Tresco Kits Catalog PDF",
    text: "Tresco CSL Kits",
  },
  {
    id: "rev_a_shelf_2022",
    url: `${apiUrl}/assets/pdf/Rev-A-Shelf_2022_New_Products.pdf`,
    title: "Rev-A-Shelf New Products for 2022 PDF",
    text: "Rev-A-Shelf 2022 New Products",
  },
  {
    id: "rev_a_shelf_sidelines",
    url: `${apiUrl}/assets/pdf/Rev-A-Shelf_Sidelines.pdf`,
    title: "Rev-A-Shelf Sidelines Catalog PDF",
    text: "Rev-A-Shelf Sidelines",
  },
  {
    id: "stronghold_brackets",
    url: `${apiUrl}/assets/pdf/Stronghold_Brackets.pdf`,
    title: "Stronghold Brackets Catalog PDF",
    text: "Stronghold Brackets",
  },
  {
    id: "tigerflex",
    url: `${apiUrl}/assets/pdf/Tigerflex_Gloves.pdf`,
    title: "Tigerflex Catalog PDF",
    text: "Tigerflex",
  },
  {
    id: "solvents_and_chemicals",
    url: `${apiUrl}/assets/pdf/Wurth_Solvents_and_Chemicals.pdf`,
    title: "Wurth Solvents and Chemicals Catalog PDF",
    text: "Solvents and Chemicals",
  },
  {
    id: "woodworking",
    url: `${apiUrl}/assets/pdf/Wurth_Woodworking_and_Solid_Surfaces.pdf`,
    title: "Wurth Woodworking and Solid Surfaces Catalog PDF",
    text: "Woodworking and Solid Surfaces",
  },
  {
    id: "hand_tools",
    url: `${apiUrl}/assets/pdf/Wurth_Hand_Tools.pdf`,
    title: "Wurth Hand Tools Catalog PDF",
    text: "Hand Tools",
  },
  {
    id: "pg_catalog",
    url: `${apiUrl}/assets/pdf/LP2049_Studio917_12-Pg_Catalog.pdf`,
    title: "Studio 917 Hardware Catalog",
    text: "Studio 917 Hardware Catalog",
  },
  {
    id: "kessebohmer_catalog",
    url: `${apiUrl}/assets/pdf/Kessebohmer_Catalog.pdf`,
    title: "Kessebohmer Catalog",
    text: "Kessebohmer Catalog",
  },
  {
    id: "omega_national_catalog",
    url: `/catalog/omega_national_catalog.pdf`,
    title: "Omega National Catalog",
    text: "Omega National Catalog",
  },
];
