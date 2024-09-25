import { Alert } from "@repo/web-ui/components/icons/alert";

type WarningProps = {
  readonly title: string;
  readonly description: string;
};

const Warning = ({ title, description }: WarningProps) => {
  return (
    <div className="flex flex-row gap-2 rounded-lg bg-red-50 p-4">
      <Alert
        className="mt-1 shrink-0 stroke-wurth-red-650"
        width={16}
        height={16}
      />

      <div className="flex-1 space-y-1">
        <h4 className="text-base font-semibold text-wurth-red-650">{title}</h4>

        <p className="text-sm leading-6 text-wurth-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default Warning;
