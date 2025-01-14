import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ContinuousLegend } from "../../component/Legend/ContinuousLegend";
export default {
  component: ContinuousLegend,
  title: "Legends  / ContinuousLegend",
} as ComponentMeta<typeof ContinuousLegend>;

const min = 0;
const max = 1;
const dataObjectName = "Physics color map";
const colorName = "Physics";

const Story: ComponentStory<typeof ContinuousLegend> = (args) => {
  return <ContinuousLegend {...args} />;
};

export const StandardColorTableLibrary = Story.bind({});
StandardColorTableLibrary.args = {
  min,
  max,
  dataObjectName,
  colorName: colorName,
  isRangeShown: true,
  legendFontSize: 13,
  tickFontSize: 13,
  numberOfTicks: 3,
  legendScaleSize: 300,
  cssLegendStyles: { top: "0%", left: "0%" },
};

export const DefaultColorTable = Story.bind({});
DefaultColorTable.args = {
  min,
  max,
  dataObjectName: "Default color table (Rainbow)",
  isRangeShown: true,
  legendFontSize: 13,
  tickFontSize: 13,
  numberOfTicks: 3,
  legendScaleSize: 300,
  cssLegendStyles: { top: "0%", left: "0%" },
};
