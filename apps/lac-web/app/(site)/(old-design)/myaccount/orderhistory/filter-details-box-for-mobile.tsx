const FilterDetailsBoxForMobile = ({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) => {
  return (
    <div className="mx-2 w-fit rounded-md bg-gray-100 p-2">
      <div className="text-[10px] uppercase">{label}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
};

export default FilterDetailsBoxForMobile;
