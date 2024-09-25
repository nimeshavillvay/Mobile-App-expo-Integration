import type { Plant } from "@/_lib/types";

type PlantNameProps = {
  readonly plants: Plant[];
  readonly plantCode?: string;
};

const PlantName = ({ plants, plantCode }: PlantNameProps) => {
  if (plantCode !== "") {
    const foundPlant = plants.find((plant) => plant.code === plantCode);

    return foundPlant?.name ?? "Plant N/A";
  }

  return "Plant N/A";
};

export default PlantName;
