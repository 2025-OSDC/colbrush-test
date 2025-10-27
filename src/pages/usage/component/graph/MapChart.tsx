import { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
// import { useTheme } from "colbrush/client";
import GraphContainer from "./GraphContainer";

const MapChart = () => {
  const rootStyle = getComputedStyle(document.documentElement);
  const colors = {
    red: rootStyle.getPropertyValue("--color-deep-red").trim(),
    yellow: rootStyle.getPropertyValue("--color-yellow").trim(),
    green: rootStyle.getPropertyValue("--color-green").trim(),
    blue: rootStyle.getPropertyValue("--color-deep-blue").trim(),
    purple: rootStyle.getPropertyValue("--color-purple").trim(),
  };

  // const theme = useTheme().theme;

  useEffect(() => {
    const root = am5.Root.new("mapdiv");

    root._rootContainer.set(
      "background",
      am5.Rectangle.new(root, {
        fill: am5.color(0xffffff),
        fillOpacity: 1,
      }),
    );

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        projection: am5map.geoMercator(),
        wheelX: "none",
        wheelY: "none",
      }),
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      }),
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0xececec),
      stroke: am5.color(0xececec),
      strokeOpacity: 0,
    });

    polygonSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
      const context = target.dataItem?.dataContext as { id?: string };
      const id = context.id;
      if (id === "US") return am5.color(colors.yellow);
      if (id === "BR") return am5.color(colors.red);
      if (id === "CD") return am5.color(colors.blue);
      if (id === "SA") return am5.color(colors.green);
      if (id === "CN") return am5.color(colors.purple);
      return fill;
    });

    return () => {
      root.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Colbrush 테스트용: theme 의존성 비활성화
  // }, [theme]); // Colbrush 활성화: 이 줄의 주석을 해제하고 위 줄을 주석 처리

  return (
    <GraphContainer>
      <p
        className={`mb-4 text-start text-gray-100 max-lg:text-[14px] lg:text-[18px]`}
      >
        국가별 통계
      </p>
      <div className={`flex shrink-0 grow items-center justify-center`}>
        <div id="mapdiv" className={`aspect-5/3 w-full`} />
      </div>
    </GraphContainer>
  );
};

export default MapChart;
