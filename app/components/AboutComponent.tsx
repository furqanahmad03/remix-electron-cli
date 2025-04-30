import { Box, List, ListItem, Text, Highlight } from "@chakra-ui/react";


const AboutComponent = ({ command }: {command: any;}) => {
  return (
    <Box mb="3" ml="2">
      <Text fontFamily="Courier New" color="red" fontSize="sm">
        {command}
      </Text>
      <List.Root fontFamily="Consolas">
        <List.Item>
          <Highlight
            query="CLI Version 1.0:"
            styles={{ px: "0.5", bg: "orange.subtle", color: "orange.fg" }}
          >
            CLI Version 1.0: This is a front-end CLI created as a part of the Full Stack showcase. It simulates various command-line functionalities.
          </Highlight>

        </List.Item>
      </List.Root>
    </Box>
  );
};

export default AboutComponent;