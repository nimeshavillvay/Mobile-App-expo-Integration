"use client";

import useSuspenseLaminateFilters from "@/_hooks/laminate/use-suspense-laminate-filters.hook";
import { changeSearchParams } from "@/_lib/client-helpers";
import { INIT_PAGE_NUMBER, QUERY_KEYS } from "@/_lib/constants";
import { searchFormSchema, type SearchFormSchema } from "@/_lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "@repo/web-ui/components/icons/magnifying-glass";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@repo/web-ui/components/ui/form";
import { Input } from "@repo/web-ui/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const LaminateSearch = ({ token }: { readonly token: string }) => {
  const searchParams = useSearchParams();

  const form = useForm<SearchFormSchema>({
    resolver: zodResolver(searchFormSchema),
    values: {
      search: searchParams.get(QUERY_KEYS.SEARCH_TEXT) ?? "",
    },
  });

  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });

  const onSubmit = form.handleSubmit((values) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const isColorPickerAttribute = categoryFiltersQuery.data.filter(
      (filter) => filter.is_colorpicker,
    )[0];
    const filterId = isColorPickerAttribute?.id ?? "";
    newSearchParams.delete(filterId);
    newSearchParams.delete(QUERY_KEYS.PAGE);

    changeSearchParams(newSearchParams, [
      {
        key: QUERY_KEYS.SEARCH_TEXT,
        value: values.search,
      },
      {
        key: QUERY_KEYS.PAGE,
        value: INIT_PAGE_NUMBER,
      },
    ]);
  });

  return (
    <div className="mx-auto mb-6 w-full max-w-2xl">
      <Form {...form}>
        <form onSubmit={onSubmit} className="relative">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search for laminates"
                    type="text"
                    {...field}
                    className="border-wurth-gray-300 focus:border-wurth-blue-500 focus:ring-wurth-blue-200 border-1 h-12 rounded-full pr-12 text-lg focus:ring-1"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="hover:text-wurth-blue-500 absolute right-2 top-1/2 -translate-y-1/2 transform text-wurth-gray-500"
          >
            <MagnifyingGlass
              className="h-6 w-6"
              data-button-action="Laminate Finder Search"
            />
            <span className="sr-only">Laminate Search</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LaminateSearch;
