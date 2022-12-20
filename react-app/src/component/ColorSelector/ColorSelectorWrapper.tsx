import * as React from "react";
import { d3ColorScales } from "../Utils/d3ColorScale";
import { ColorSelectorComponent } from "./ColorSelectorComponent";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { RGBToHex } from "../Utils/legendCommonFunction";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    parentDiv: {
      display: "flex",
    },

    contentCopyIcon: {
      "&:hover": {
        background: "#f1f1f1",
        cursor: "pointer",
      },
    },
  })
);

export declare type colorScaleObj = {
  name: string;
  color:
    | [number, number, number, number][]
    | ((t: number) => string | string[]);
};
export type colorScaleArray = Array<colorScaleObj>;

declare type legendProps = {
  useColorTableColors?: boolean;
  newColorScaleData?: any;
  colorTables?: any;
  useRange?: boolean;
  getRange?: any;
  isCont?: boolean;
  useBreakpoint?: boolean;
  getBreakpoint?: any;
  useInterpolation?: boolean;
  getInterpolation?: any;
  currentLegendName?: string;
  isCustomScale?: any;
  getDuplicatedLegendData?: any;
};

export const ColorSelectorWrapper: React.FC<legendProps> = ({
  useColorTableColors,
  newColorScaleData,
  colorTables,
  useRange,
  getRange,
  isCont,
  useBreakpoint,
  getBreakpoint,
  useInterpolation,
  getInterpolation,
  currentLegendName,
  isCustomScale,
  getDuplicatedLegendData,
}: legendProps) => {
  let continuousLegend;
  let discreteLegend;
  let continuousLegend1;
  let discreteLegend1;

  const continuosColorData: colorScaleArray = [];
  const continuosD3ColorData: colorScaleArray = [];
  const discreteColorData: colorScaleArray = [];
  const discreteD3ColorData: colorScaleArray = [];
  const classes = useStyles();

  const [isAuto, setAuto] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // For altering data range
  const onChangeRange = React.useCallback(
    (e) => {
      if (e.value === "Auto") {
        getRange("Auto");
        setAuto(true);
      } else {
        setAuto(false);
        let inputValue1 = (document.getElementById("minV") as HTMLInputElement)
          .value;
        let inputValue2 = (document.getElementById("maxV") as HTMLInputElement)
          .value;
        getRange([parseFloat(inputValue1), parseFloat(inputValue2)]);
      }
    },
    [getRange]
  );

  // For interpolation
  const onChangeInterpolation = React.useCallback(
    (e) => {
      if (e.value === "Logarithmic") {
        getInterpolation("Logarithmic");
      } else if (e.value === "Linear") {
        getInterpolation("Linear");
      } else {
        getInterpolation("Nearest");
      }
    },
    [getInterpolation]
  );

  const onChangeBreakpoint = React.useCallback(
    (e) => {
      if (e.value === "None") {
        setAuto(true);
        getBreakpoint("None");
      } else {
        setAuto(false);
        let breakpoint = (
          document.getElementById("breakpoint") as HTMLInputElement
        ).value;
        let breakpointArray: any;
        if (breakpoint.length > 0) {
          breakpointArray = breakpoint?.split(",");
        }

        getBreakpoint(breakpointArray);
      }
    },
    [getBreakpoint]
  );

  const [duplicatedLegendData, setDuplicatedLegendData] = React.useState([]);

  const copyLegend = (value: any) => {
    let test = value.color.map((item: any) => {
      return {
        position: item[0],
        color: RGBToHex(item).color,
        name: value.name,
      };
    });
    setDuplicatedLegendData([...duplicatedLegendData, test]);
    isCustomScale(value.name);

    //setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    if (getDuplicatedLegendData) {
      getDuplicatedLegendData(duplicatedLegendData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duplicatedLegendData?.length]);

  if (!useRange || !useInterpolation) {
    // Continuous legend using color table  data
    const colorTableContinuousData = colorTables?.filter((element: any) => {
      return element.discrete === false;
    });

    colorTableContinuousData?.forEach((element: any) => {
      continuosColorData.push({ color: element.colors, name: element.name });
    });

    // Continuous legend using d3 data
    const d3continuousData = d3ColorScales?.filter((element: any) => {
      return element.discrete === false;
    });

    d3continuousData?.forEach((element: any) => {
      continuosD3ColorData.push({ color: element.colors, name: element.name });
    });

    // Discrete legend using color table data
    const discreteData = colorTables?.filter((element: any) => {
      return element.discrete === true;
    });

    discreteData?.forEach((element: any) => {
      discreteColorData.push({ color: element.colors, name: element.name });
    });

    // Discrete legend using d3 data
    const d3discreteData = d3ColorScales?.filter((element: any) => {
      return element.discrete === true;
    });

    d3discreteData?.forEach((element: any) => {
      discreteD3ColorData.push({ color: element.colors, name: element.name });
    });

    // return continuous and discrete legend which uses d3 data
    //if (!useColorTableColors) {
    continuousLegend = continuosD3ColorData.map((val: any, index: any) => {
      return (
        <ColorSelectorComponent
          legendColor={val.color}
          legendColorName={val.name}
          useContColorTable={false}
          uniqueId={index}
          colorScaleData={newColorScaleData}
          key={index}
          currentLegendName={currentLegendName}
        />
      );
    });

    discreteLegend = d3discreteData.map((val: any, index: any) => {
      return (
        <ColorSelectorComponent
          colorsObject={val.colors}
          legendColorName={val.name}
          useDiscColorTable={false}
          colorScaleData={newColorScaleData}
          key={index}
          currentLegendName={currentLegendName}
        />
      );
    });
    //}

    // return continuous and discrete legend which uses colortable data
    //else if (useColorTableColors) {
    continuousLegend1 = continuosColorData.map((value: any, index: any) => {
      return (
        <div className={classes.parentDiv} key={index}>
          <div>
            <ColorSelectorComponent
              colorsObject={value}
              legendColorName={value.name}
              useContColorTable={true}
              uniqueId={index}
              colorScaleData={newColorScaleData}
              key={index}
              currentLegendName={currentLegendName}
            />
          </div>
          <div
            className={classes.contentCopyIcon}
            title="Duplicate"
            style={{ cursor: "pointer" }}
          >
            <ContentCopyIcon
              fontSize="small"
              color="action"
              onClick={() => copyLegend(value)}
            />
          </div>
        </div>
      );
    });

    discreteLegend1 = discreteColorData.map((val: any, index: any) => {
      return (
        <ColorSelectorComponent
          colorsObject={discreteColorData[index]}
          legendColorName={val.name}
          useDiscColorTable={true}
          colorScaleData={newColorScaleData}
          key={index}
          currentLegendName={currentLegendName}
        />
      );
    });
    //}
  }

  // Sampling through range
  if (useRange) {
    return (
      <div
        onChange={(ev) => {
          onChangeRange(ev.target);
        }}
        style={{
          height: 58,
          borderRadius: "0.5em",
          border: "1px solid #dadada",
        }}
      >
        <div style={{ marginTop: 8, marginLeft: 13 }}>
          <input
            type="radio"
            value="Auto"
            name="range"
            disabled={!isCont}
            defaultChecked
          />{" "}
          Auto <br />
          <input type="radio" value="Domain" name="range" disabled={!isCont} />
          <label style={{ marginLeft: 3, marginRight: 10 }}>Min</label>
          <input type="text" id="minV" size={3} disabled={isAuto || !isCont} />
          <label style={{ marginLeft: 10, marginRight: 10 }}>Max</label>
          <input type="text" id="maxV" size={3} disabled={isAuto || !isCont} />
        </div>
      </div>
    );
  }
  // else if (useBreakpoint) {
  //   return (
  //     <div
  //       onChange={(ev) => {
  //         onChangeBreakpoint(ev.target);
  //       }}
  //     >
  //       <input type="radio" value="None" name="legend" defaultChecked />
  //       None <br />
  //       <input type="radio" value="domain" name="legend" />
  //       <input type="text" id="breakpoint" size={16} disabled={isAuto} />
  //     </div>
  //   );
  // }
  // Interpolation methods
  else if (useInterpolation) {
    return (
      <div
        onChange={(ev) => {
          onChangeInterpolation(ev.target);
        }}
        style={{
          height: 72,
          borderRadius: "0.5em",
          border: "1px solid #dadada",
        }}
      >
        <div style={{ marginTop: 8, marginLeft: 13 }}>
          <input
            type="radio"
            value="Linear"
            name="interpolation"
            disabled={!isCont}
            defaultChecked
          />
          Linear <br />
          <input
            type="radio"
            value="Logarithmic"
            name="interpolation"
            disabled={!isCont}
          />
          Logarithmic <br />
          <input
            type="radio"
            value="Nearest"
            name="interpolation"
            disabled={!isCont}
          />
          Nearest <br />
        </div>
      </div>
    );
  }

  return (
    <div
      className="legendWrapper"
      style={{
        height: 120,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        marginLeft: -12,
      }}
    >
      {continuousLegend1}
      {continuousLegend}
      {discreteLegend1}
      {discreteLegend}
    </div>
  );
};
