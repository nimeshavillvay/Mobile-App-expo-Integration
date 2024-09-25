"use client";

import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import { sendGTMEvent } from "@next/third-parties/google";
// eslint-disable-next-line no-restricted-imports
import { useEffect } from "react";

const CategoryPageGtm = ({
  id,
  name,
}: {
  readonly id: number;
  readonly name: string;
}) => {
  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  useEffect(() => {
    sendGTMEvent({
      event: "view_category",
      viewCategoryData: {
        category_id: id.toString(),
        category_name: name,
      },
      data: {
        userid: gtmUser?.userid,
        account_type: gtmUser?.account_type,
        account_industry: gtmUser?.account_industry,
        account_sales_category: gtmUser?.account_sales_category,
      },
    });
  }, [id, name, gtmUser]);

  return null;
};

export default CategoryPageGtm;
