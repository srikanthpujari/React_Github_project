import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Repos from "../Repos";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Chart = ({ data }) => {
  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: "bar3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most Forked",
        xaxisname: "Repos",
        yaxisname: "Forks",
        xaxisnamefontsize: "16px",
        yaxisnamefontsize: "16px",
      },
      // Chart Data
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Chart;
