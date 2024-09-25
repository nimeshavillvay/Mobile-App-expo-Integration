"use client";

import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import { sendGTMEvent } from "@next/third-parties/google";
import {
  SearchBox,
  SearchBoxButton,
  SearchBoxInput,
  SearchClearButton,
} from "@repo/web-ui/components/search-box";
import { Separator } from "@repo/web-ui/components/ui/separator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BarcodeScannerDialog from "./barcode-scan-dialog";
import useMultiSearch, { placeholderData } from "./use-multi-search.hook";

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const debouncedValue = useDebouncedState(value);
  const multiSearchQuery = useMultiSearch(debouncedValue);

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  const handleSearch = () => {
    if (value !== "") {
      const queryParams = new URLSearchParams({
        query: value,
      });

      sendGTMEvent({
        event: "search",
        search_term: value,
        userid: gtmUser?.userid,
        account_type: gtmUser?.account_type,
        account_industry: gtmUser?.account_industry,
        account_sales_category: gtmUser?.account_sales_category,
      });

      router.push(`/search?${queryParams.toString()}`);
    }
  };

  const clearInput = () => {
    setValue("");
  };

  const onHandleDropDownClick = (
    selectedName: string,
    linkType: string,
    linkUrl: string,
  ) => {
    sendGTMEvent({
      event: "auto_suggest",
      autoSuggestData: {
        aq: value,
        q: selectedName,
        link_type: linkType,
        link_url: linkUrl,
      },
      data: {
        userid: gtmUser?.userid,
        account_type: gtmUser?.account_type,
        account_industry: gtmUser?.account_industry,
        account_sales_category: gtmUser?.account_sales_category,
      },
    });
  };

  return (
    <SearchBox>
      <SearchBoxInput
        data={multiSearchQuery.data ?? placeholderData}
        value={value}
        setValue={setValue}
        onEnterPressed={handleSearch}
        placeholder="What are you looking for?"
        onHandleDropDownClick={onHandleDropDownClick}
        className="search-bar"
      >
        {value && <SearchClearButton onClick={clearInput} />}
        <SearchBoxButton onClick={handleSearch} />
        <Separator orientation="vertical" className="h-5" />
        <BarcodeScannerDialog />
      </SearchBoxInput>
    </SearchBox>
  );
};

export default SearchBar;
