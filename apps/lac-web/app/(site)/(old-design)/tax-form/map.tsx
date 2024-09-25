"use client";

import { cn } from "@/_lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import { geoCentroid } from "d3-geo";
import { useState } from "react";
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { AllStates } from "./all-states";
import { AvailableStatesList } from "./available-states-list";
import { downloadFile } from "./helpers";
import type { TaxFormItems } from "./types";

type Offsets = {
  [key: string]: number[];
};

const offsets: Offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const Map = ({ taxFormDetails }: { readonly taxFormDetails: TaxFormItems }) => {
  const [open, setOpen] = useState(false);
  const [hoverText, setHoverText] = useState("");

  const isFileExist = (name: string) => {
    return AvailableStatesList.some((state) => state.name === name);
  };

  const arizonaOptions: {
    stateCode: keyof TaxFormItems;
    text: string;
    taxFormType: string;
  }[] = [
    {
      stateCode: "AZ",
      text: "Arizona - Resale Certificate",
      taxFormType: "RESALE",
    },
    {
      stateCode: "AZ",
      text: "Arizona - Tax Exempt Form",
      taxFormType: "EXEMPT",
    },
  ];

  const handleSelect = (stateCode: keyof TaxFormItems | undefined) => {
    if (stateCode == "AZ") {
      setOpen(true);

      return;
    }

    if (
      !stateCode ||
      !AvailableStatesList.some((state) => state.code === stateCode)
    ) {
      return;
    }

    downloadFile(taxFormDetails, stateCode);
  };

  const handleModalSelect = (
    stateCode: keyof TaxFormItems | undefined,
    taxFormType: string,
  ) => {
    downloadFile(taxFormDetails, stateCode, taxFormType);
  };

  return (
    <div>
      <ComposableMap
        projection="geoAlbersUsa"
        viewBox="0 0 1000 540"
        height={540}
      >
        <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const state = AllStates.find((s) => s.val === geo.id) as {
                  id: keyof TaxFormItems;
                  val: string;
                };

                return (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    fill="#DDD"
                    className={cn("outline-none", [
                      isFileExist(geo.properties.name) ? "fill-[#C9E5F6]" : "",
                      isFileExist(geo.properties.name) &&
                      hoverText === geo.properties.name
                        ? "cursor-pointer fill-[#8BD2FF]"
                        : "",
                    ])}
                    onClick={() => {
                      handleSelect(state?.id);
                    }}
                    onMouseOver={() => setHoverText(geo.properties.name)}
                  />
                );
              })}

              {geographies.map((geo) => {
                const state = AllStates.find((s) => s.val === geo.id) as {
                  id: keyof TaxFormItems;
                  val: string;
                };
                const centroid = geoCentroid(geo);

                return (
                  <g key={geo.rsmKey + "-name"}>
                    {state &&
                      centroid[0] > -160 &&
                      centroid[0] < -67 &&
                      (Object.keys(offsets).indexOf(state.id) === -1 ? (
                        <Marker coordinates={centroid}>
                          <text
                            y="4"
                            fontSize={8}
                            textAnchor="middle"
                            onClick={() => {
                              handleSelect(state.id);
                            }}
                            className={
                              isFileExist(geo.properties.name) &&
                              hoverText === geo.properties.name
                                ? "hover:cursor-pointer"
                                : ""
                            }
                            onMouseOver={() =>
                              setHoverText(geo.properties.name)
                            }
                          >
                            {geo.properties.name}
                          </text>
                        </Marker>
                      ) : (
                        <Annotation
                          connectorProps={{
                            stroke: "#000",
                            strokeWidth: 1,
                            strokeLinecap: "round",
                          }}
                          subject={centroid}
                          dx={offsets[state.id]?.[0] ?? 0}
                          dy={offsets[state.id]?.[1] ?? 0}
                        >
                          <text
                            x={4}
                            fontSize={8}
                            alignmentBaseline="middle"
                            onClick={() => {
                              handleSelect(state.id);
                            }}
                            className={
                              isFileExist(geo.properties.name) &&
                              isFileExist(geo.properties.name)
                                ? "cursor-pointer"
                                : ""
                            }
                            onMouseOver={() =>
                              setHoverText(geo.properties.name)
                            }
                          >
                            {geo.properties.name}
                          </text>
                        </Annotation>
                      ))}
                  </g>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="old-design-text-base overflow max-h-[80vh] max-w-[300px] gap-0">
          <DialogHeader>
            <DialogTitle className="text-left text-xl font-bold">
              Download PDFs
            </DialogTitle>
          </DialogHeader>

          <ul className="list-none p-5">
            {arizonaOptions.map((option) => (
              <li key={option.text}>
                <button
                  onClick={() => {
                    handleModalSelect(option.stateCode, option.taxFormType);
                  }}
                  className="btnAction p-2.5 hover:bg-brand-gray-200"
                  data-button-action="Tax Form Map"
                >
                  {option.text}
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Map;
