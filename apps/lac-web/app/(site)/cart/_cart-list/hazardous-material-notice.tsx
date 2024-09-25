import { GiRadioactive } from "react-icons/gi";

const HazardousMaterialNotice = () => {
  return (
    <section>
      <div className="flex flex-row gap-2 rounded-lg bg-yellow-50 p-4">
        <GiRadioactive className="mt-1 shrink-0 text-base leading-none text-yellow-700" />

        <span className="flex-1 text-sm leading-6 text-yellow-700">
          <span className="font-bold">
            This item has been flagged as a hazardous material.
          </span>
          <p>Special shipping costs may be added to your order.</p>
        </span>
      </div>
    </section>
  );
};

export default HazardousMaterialNotice;
