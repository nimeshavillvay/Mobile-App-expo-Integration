import { Alert } from "@repo/web-ui/components/icons/alert";

const RegionalExclusion = () => {
  return (
    <div className="mt-1 flex flex-row gap-2 rounded-lg bg-red-50 p-2">
      <Alert
        className="mt-1 shrink-0 stroke-wurth-red-650"
        width={16}
        height={16}
      />

      <div className="flex-1 space-y-1">
        <h4 className="text-base font-semibold text-wurth-red-650">
          This items cannot be shipped to your current address
        </h4>

        <div className="m-0 text-sm leading-6 text-wurth-gray-800">
          Please update your shipping address at checkout or consider removing
          this item.
        </div>
      </div>
    </div>
  );
};

export default RegionalExclusion;
