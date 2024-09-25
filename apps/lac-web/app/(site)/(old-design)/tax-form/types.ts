export type TaxFormItems = {
  AR: TaxFormItem;
  AZ: {
    tax_exempt: TaxFormData[];
    resalse_certificate: TaxFormData[];
  };
  CA: {
    resalse_certificate: TaxFormData[];
  };
  CO: TaxFormItem;
  CT: TaxFormItem;
  GA: TaxFormItem;
  HI: TaxFormItem;
  IA: TaxFormItem;
  ID: TaxFormItem;
  IL: TaxFormItem;
  IN: TaxFormItem;
  KS: TaxFormItem;
  KY: TaxFormItem;
  LA: TaxFormItem;
  MA: TaxFormItem;
  MD: TaxFormItem;
  ME: TaxFormItem;
  MI: TaxFormItem;
  MN: TaxFormItem;
  MO: TaxFormItem;
  MS: TaxFormItem;
  NC: TaxFormItem;
  ND: TaxFormItem;
  NE: TaxFormItem;
  NJ: TaxFormItem;
  NV: TaxFormItem;
  NY: TaxFormItem;
  OH: TaxFormItem;
  OK: TaxFormItem;
  PA: TaxFormItem;
  RI: TaxFormItem;
  SC: TaxFormItem;
  SD: TaxFormItem;
  TN: TaxFormItem;
  TX: TaxFormItem;
  UT: TaxFormItem;
  VA: TaxFormItem;
  VT: TaxFormItem;
  WA: TaxFormItem;
  WI: TaxFormItem;
  WV: TaxFormItem;
  WY: TaxFormItem;
};

export type TaxFormItem = {
  tax_exempt: TaxFormData[];
};

export type TaxFormData = {
  label: string;
  filename: string;
  url: string;
};
