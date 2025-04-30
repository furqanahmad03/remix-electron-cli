import { Box, List, Text } from "@chakra-ui/react";

const HelpComponent = ({ command }: {command: any}) => {
  return (
    <Box mb="3" ml="2">
      <Text fontFamily="Courier New" color="red" fontSize="sm">
        {command}
      </Text>
      <Text fontFamily="Courier New" fontSize="md">
        Available commands:
      </Text>
      <List.Root fontFamily="Consolas">
        <List.Item>
          • --help:
          <span style={{ color: "green", marginLeft: "5px" }}>
            Show available commands
          </span>
        </List.Item>
        <List.Item>
          • about:
          <span style={{ color: "green", marginLeft: "5px" }}>
            Display information about this CLI
          </span>
        </List.Item>
        <List.Item>
          • fetch-price [pair]:
          <span style={{ color: "green", marginLeft: "5px" }}>
            Fetch the current price of a specified cryptocurrency
          </span>
        </List.Item>
        <List.Item>
          • upload:
          <span style={{ color: "green", marginLeft: "5px" }}>
            Opens the file explorer to allow uploading CSV files only.
          </span>
        </List.Item>
        <List.Item>
          • draw [file] [columns]:
          <span style={{ color: "green", marginLeft: "5px" }}>
            Draws the chart of the specified columns of the file present in the
            draw-chart directory.
          </span>
        </List.Item>
        <List.Item>
          • delete [file]:
          <span style={{ color: "green", marginLeft: "5px" }}>
            {" "}
            To delete a file
          </span>
        </List.Item>
        <List.Item>
          • clear:
          <span style={{ color: "green", marginLeft: "5px" }}>
            {" "}
            To clear the terminal
          </span>
        </List.Item>
      </List.Root>
    </Box>
  );
};

export default HelpComponent;