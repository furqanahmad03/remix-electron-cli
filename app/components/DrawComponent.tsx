import { useState, useEffect } from "react";
import { Box, Grid, HStack, Text, } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Portal, Select, createListCollection } from "@chakra-ui/react"

interface Props {
  data: any;
  command: string;
  file: string;
}

const colorsArr = [
  "#FF5733",
  "#33FF57",
  "#5733FF",
  "#FF3399",
  "#3399FF",
  "#99FF33",
  "#9933FF",
  "#33FF99",
  "#FF3333",
  "#33FF33",
  "#3333FF",
  "#FF33FF",
  "#FFFF99",
  "#99FFFF",
  "#FF9933",
  "#33FFCC",
  "#CC33FF",
  "#33CCFF",
];

type CurveType =
  | 'basis'
  | 'basisClosed'
  | 'basisOpen'
  | 'linear'
  | 'linearClosed'
  | 'natural'
  | 'monotoneX'
  | 'monotoneY'
  | 'monotone'
  | 'step'
  | 'stepBefore'
  | 'stepAfter';

const curveTypes: CurveType[] = [
  'basis',
  'basisClosed',
  'basisOpen',
  'linear',
  'linearClosed',
  'natural',
  'monotoneX',
  'monotoneY',
  'monotone',
  'step',
  'stepBefore',
  'stepAfter'
];

const CurveTypes = createListCollection({
  items: curveTypes
})

const DrawComponent = ({ data, command, file }: Props) => {
  const parts = command.split(" ");
  const one = parts[0];
  const fileName = parts[1];
  const three = parts.slice(2).join(" ");

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(data.length - 1);
  const [currentCurveType, setCurrentCurveType] = useState<CurveType>("monotone");

  const visibleData = data.slice(start, end + 50);
  const limit = 100;
  const limitedData = visibleData.slice(0, limit);

  const columnsArr = three.split(",");
  function toPascalCase(str: string) {
    return str
      .replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      })
      .replace(/\s+/g, "");
  }

  return (
    <Box width="100%">
      {data && (
        <ResponsiveContainer width="98%" height={500}>
          <LineChart width={750} height={400} data={limitedData}>
            <XAxis dataKey={toPascalCase(columnsArr[0])} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {columnsArr.slice(1).map((one, i) => (
              <Line
                key={i}
                type={currentCurveType}
                dataKey={toPascalCase(one)}
                stroke={colorsArr[i]}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
      {data && (
        <>
          <Grid ml="2" fontSize="sm" mb="3">
            <Select.Root
              collection={CurveTypes}
              size="sm"
              value={[currentCurveType]}
              onValueChange={(details) => {
                const newValue = Array.isArray(details)
                  ? details[0]
                  : details.value?.[0];
                if (newValue) {
                  setCurrentCurveType(newValue as CurveType);
                }
              }}
              paddingX="1.5"
              width="200px"
              className="dark:bg-gray-900 bg-gray-300"
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder={currentCurveType} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {CurveTypes.items.map((curve) => (
                      <Select.Item item={curve} key={curve}>
                        {curve}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Grid>
          <Text ml="2" fontFamily="Courier New" fontSize="sm" className="dark:text-[#1aff66] text-[#0d7630] font-semibold dark:font-normal">
            Chart drawn successfully
          </Text>
        </>
      )}
    </Box>
  );
};

export default DrawComponent;