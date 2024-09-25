const apiUrl = process.env.NEXT_PUBLIC_WURTH_LAC_API;

export type CatalogSectionType = {
  letter: string;
  title: string;
  rev: string;
  online: string;
  pdf: string;
};

export const catalogSectionData: CatalogSectionType[] = [
  {
    letter: "a",
    title: "Section A - Decorative Hardware",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-a-decorative-hardware/",
    pdf: `${apiUrl}/assets/pdf/Section_A-WLAC_2022-23.pdf`,
  },
  {
    letter: "b",
    title: "Section B - Concealed Hinges",
    rev: "Rev. 06/2022",
    online: "https://catalog.wurthlac.com/catalog/section-b-concealed-hinges/",
    pdf: `${apiUrl}/assets/pdf/Section_B-WLAC_2022-23.pdf`,
  },
  {
    letter: "c",
    title: "Section C - Lift Systems & Semi-Concealed Hinges",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-c-lift-systems-semi-concealed-hinges/",
    pdf: `${apiUrl}/assets/pdf/Section_C-WLAC_2022-23.pdf`,
  },
  {
    letter: "d",
    title: "Section D - Locks, Latches & Catches",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-d-locks-latches-catches/",
    pdf: `${apiUrl}/assets/pdf/Section_D-WLAC_2022-23.pdf`,
  },
  {
    letter: "e",
    title: "Section E - Drawer Slides",
    rev: "Rev. 06/2022",
    online: "https://catalog.wurthlac.com/catalog/section-e-drawer-slides/",
    pdf: `${apiUrl}/assets/pdf/Section_E-WLAC_2022-23.pdf`,
  },
  {
    letter: "f",
    title: "Section F - Standards & Brackets",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-f-standards-brackets/",
    pdf: `${apiUrl}/assets/pdf/Section_F-WLAC_2022-23.pdf`,
  },
  {
    letter: "g",
    title: "Section G - Drawer Construction Systems",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-g-drawer-construction-systems/",
    pdf: `${apiUrl}/assets/pdf/Section_G-WLAC_2022-23.pdf`,
  },
  {
    letter: "h",
    title: "Section H - Workspace Accessories",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-h-workspace-accessories/",
    pdf: `${apiUrl}/assets/pdf/Section_H-WLAC_2022-23.pdf`,
  },
  {
    letter: "i",
    title: "Section I - Table, Work Surface & Casters",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-i-table-work-surface-casters/",
    pdf: `${apiUrl}/assets/pdf/Section_I-WLAC_2022-23.pdf`,
  },
  {
    letter: "j",
    title: "Section J - Lighting & Accessories",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-j-lighting-accessories/",
    pdf: `${apiUrl}/assets/pdf/Section_J-WLAC_2022-23.pdf`,
  },
  {
    letter: "k",
    title: "Section K - Kitchen & Bath",
    rev: "Rev. 06/2022",
    online: "https://catalog.wurthlac.com/catalog/section-k-kitchen-bath/",
    pdf: `${apiUrl}/assets/pdf/Section_K-WLAC_2022-23.pdf`,
  },
  {
    letter: "l",
    title: "Section L - Decorative Wood",
    rev: "Rev. 06/2022",
    online: "https://catalog.wurthlac.com/catalog/section-l-decorative-wood/",
    pdf: `${apiUrl}/assets/pdf/Section_L-WLAC_2022-23.pdf`,
  },
  {
    letter: "m",
    title: "Section M - Veneer & Edgebanding",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-m-veneer-edgebanding/",
    pdf: `${apiUrl}/assets/pdf/Section_M-WLAC_2022-23.pdf`,
  },
  {
    letter: "n",
    title: "Section N - Support Brackets & Closet Hardware",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-n-support-brackets-closet-hardware/",
    pdf: `${apiUrl}/assets/pdf/Section_N-WLAC_2022-23.pdf`,
  },
  {
    letter: "o",
    title: "Section O - Architectural Hardware",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-o-architectural-hardware/",
    pdf: `${apiUrl}/assets/pdf/Section_O-WLAC_2022-23.pdf`,
  },
  {
    letter: "p",
    title: "Section P - Fasteners",
    rev: "Rev. 06/2022",
    online: "https://catalog.wurthlac.com/catalog/section-p-fasteners/",
    pdf: `${apiUrl}/assets/pdf/Section_P-WLAC_2022-23.pdf`,
  },
  {
    letter: "q",
    title: "Section Q - Abrasives",
    rev: "Rev. 06/2022",
    online: "https://catalog.wurthlac.com/catalog/section-q-abrasives/",
    pdf: `${apiUrl}/assets/pdf/Section_Q-WLAC_2022-23.pdf`,
  },
  {
    letter: "r",
    title: "Section R - Solvents & Adhesives",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-r-solvents-adhesives/",
    pdf: `${apiUrl}/assets/pdf/Section_R-WLAC_2022-23.pdf`,
  },
  {
    letter: "s",
    title: "Section S - Shop & Safety Supplies",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-s-shop-safety-supplies/",
    pdf: `${apiUrl}/assets/pdf/Section_S-WLAC_2022-23.pdf`,
  },
  {
    letter: "t",
    title: "Section T - Spray Equipment",
    rev: "Rev. 06/2022",
    online: "https://catalog.wurthlac.com/catalog/section-t-spray-equipment/",
    pdf: `${apiUrl}/assets/pdf/Section_T-WLAC_2022-23.pdf`,
  },
  {
    letter: "u",
    title: "Section U - Hand Tools & Jigs",
    rev: "Rev. 06/2022",
    online: "https://catalog.wurthlac.com/catalog/section-u-hand-tools-jigs/",
    pdf: `${apiUrl}/assets/pdf/Section_U-WLAC_2022-23.pdf`,
  },
  {
    letter: "v",
    title: "Section V - Air & Power Tools",
    rev: "Rev. 06/2022",
    online: "https://catalog.wurthlac.com/catalog/section-v-air-power-tools/",
    pdf: `${apiUrl}/assets/pdf/Section_V-WLAC_2022-23.pdf`,
  },
  {
    letter: "w",
    title: "Section W - Machinery",
    rev: "Rev. 06/2022",
    online: "https://catalog.wurthlac.com/catalog/section-w-machinery/",
    pdf: `${apiUrl}/assets/pdf/Section_W-WLAC_2022-23.pdf`,
  },
  {
    letter: "x",
    title: "Section X - Sinks & Surfacing",
    rev: "Rev. 06/2022",
    online: "https://catalog.wurthlac.com/catalog/section-x-sinks-surfacing/",
    pdf: `${apiUrl}/assets/pdf/Section_X-WLAC_2022-23.pdf`,
  },
  {
    letter: "y",
    title: "Section Y - Bits, Blades & Cutters",
    rev: "Rev. 06/2022",
    online:
      "https://catalog.wurthlac.com/catalog/section-y-bits-blades-cutters/",
    pdf: `${apiUrl}/assets/pdf/Section_Y-WLAC_2022-23.pdf`,
  },
];
