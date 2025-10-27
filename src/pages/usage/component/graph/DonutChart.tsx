import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
// import { useTheme } from "colbrush/client";
import GraphContainer from "./GraphContainer";

interface ChartData {
  category: string;
  value: number;
  color: string;
}

const DonutChart = () => {
  // const theme = useTheme().theme;

  const rootStyle = getComputedStyle(document.documentElement);

  const data = [
    {
      category: "잠재 고객",
      value: 54,
      color: rootStyle.getPropertyValue("--color-blue").trim(),
    },
    {
      category: "충성 고객",
      value: 20,
      color: rootStyle.getPropertyValue("--color-light-green").trim(),
    },
    {
      category: "신규 고객",
      value: 26,
      color: rootStyle.getPropertyValue("--color-red").trim(),
    },
  ];

  const chartRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<am5.Root | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(60),
      }),
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      }),
    );

    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    series.slices.template.setAll({
      strokeWidth: 0,
      cornerRadius: 8,
    });

    series.slices.template.states.create("hover", {
      scale: 1.05,
    });

    series.slices.template.adapters.add("fill", function (fill, target) {
      const dataItem = target.dataItem;
      if (dataItem) {
        const context = dataItem.dataContext as ChartData;
        return am5.color(context.color);
      }
      return fill;
    });

    series.slices.template.adapters.add("stroke", function (stroke, target) {
      const dataItem = target.dataItem;
      if (dataItem) {
        const context = dataItem.dataContext as ChartData;
        return am5.color(context.color);
      }
      return stroke;
    });

    series.data.setAll(data);

    series.appear(1000, 100);

    return () => {
      if (rootRef.current) {
        rootRef.current.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Colbrush 테스트용: theme 의존성 비활성화
  // }, [theme]); // Colbrush 활성화: 이 줄의 주석을 해제하고 위 줄을 주석 처리

  return (
    <GraphContainer>
      <div className={`mb-4 flex flex-row items-center justify-between`}>
        <p
          className={`text-center font-bold text-gray-100 max-lg:text-[14px] lg:text-[18px]`}
        >
          방문자 분석
        </p>
        <p
          className={`rounded-[4px] bg-gray-200 px-2 py-1 text-[12px] text-gray-100 max-lg:text-[10px]`}
        >
          Today
        </p>
      </div>

      <div className={`flex items-center justify-center`}>
        <div
          ref={chartRef}
          className="mb-2 aspect-[5/4] max-h-[300px] max-md:w-[50%] md:w-full"
        />
      </div>

      <div className="p-2 text-[16px] max-lg:text-[14px]">
        <div className="flex flex-col justify-center gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-3 w-3 shrink-0 rounded-full max-lg:h-2.5 max-lg:w-2.5"
                style={{ backgroundColor: item.color }}
              />
              <span className="flex w-full flex-row items-center justify-between font-light text-white">
                <p>{item.category}</p>
                <p>{item.value}%</p>
              </span>
            </div>
          ))}
        </div>
      </div>
    </GraphContainer>
  );
};

export default DonutChart;
