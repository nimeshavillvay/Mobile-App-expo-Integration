import { Suspense, type ComponentProps } from "react";
import SelectedFiltersList from "./selected-filters-list";

const SelectedFilters = ({
  sections,
}: ComponentProps<typeof SelectedFiltersList>) => {
  return (
    <Suspense>
      <SelectedFiltersList sections={sections} />
    </Suspense>
  );
};

export default SelectedFilters;
