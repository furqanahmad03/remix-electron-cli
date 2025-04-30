import type { MetaFunction } from "@remix-run/node";
import Navbar from "@/components/Navbar";
import { Grid, GridItem, Input, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import HelpComponent from "@/components/HelpComponent";
import AboutComponent from "@/components/AboutComponent";
import CryptoPriceComponent from "@/components/CryptoPriceComponent";
import axios from "axios";
import { errorMsg } from "@/components/CryptoPriceComponent";
import DrawComponent from "@/components/DrawComponent";

const url = "http://localhost:3030/api/";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix - CLI" },
    { name: "description", content: "Welcome to CLI!" },
  ];
};

export default function Index() {
  const [inputValue, setInputValue] = useState("");
  const [appendedComponents, setAppendedComponents] = useState<JSX.Element[]>([]);
  const bottomGridRef = useRef<null | HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleKeyPress = (e: any) => {
    if (inputValue) {
      if (e.key === "Enter") {
        let command = inputValue.toLowerCase();
        let currency = "";
        if (command.includes("fetch-price")) {
          const [pre, post] = command.split(" ");
          command = pre;
          currency = post;
          console.log(currency);
        }
        let file = "";
        if (command.includes("delete")) {
          const [pre, post] = command.split(" ");
          command = pre;
          file = post;
        }
        let drawCommand="";
        if(command.includes("draw")){
          drawCommand = command;
          command = "draw";
        }
        switch (command) {
          case "--help":
            setAppendedComponents([
              ...appendedComponents,
              <HelpComponent command={command} key={appendedComponents?.length} />
            ])
            break;
          case "about":
            setAppendedComponents([
              ...appendedComponents,
              <AboutComponent command={command} key={appendedComponents?.length} />
            ])
            break;
          case "fetch-price":
            setAppendedComponents([
              ...appendedComponents,
              <CryptoPriceComponent command={command} currency={currency} key={appendedComponents?.length} />
            ]);
            break;
          case "upload":
            clickFileSelectionField();
            break;
          case "delete":
            deleteFile(command, file);
            break;
          case "draw":
            drawChart(drawCommand);
            break;
          case "clear":
            setAppendedComponents([]);
            break;
          default:
            setAppendedComponents([
              ...appendedComponents,
              <Text
                key={appendedComponents.length}
                ml="2"
                mb="3"
                color="red"
                fontSize="sm"
                fontFamily="Consolas"
                fontStyle="italic"
              >
                <span style={{ color: "white" }}>{command}</span> is Invalid
                Command
              </Text>
            ]);
            break;
        }
        setTimeout(() => {
          bottomGridRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 200);
        setInputValue("");
      }
    }
  }

  const clickFileSelectionField = () => {
    fileInputRef.current && fileInputRef.current.click();
  }

  const handleFileUpload = (selectedFile: File | null) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      axios
        .post(`${url}upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        .then((response) => {
          const { fileName, columns } = response.data;
          setAppendedComponents([
            ...appendedComponents,
            <div key={appendedComponents.length}>
              <Text
                ml="2"
                mb="3"
                color="green"
                fontFamily="Consolas"
              >
                <span style={{ color: "white" }}>{fileName}</span> uploaded successfully
              </Text>
              <Text
                ml="2"
                mb="3"
                color="green"
                fontFamily="Consolas"
              >
                <span style={{ color: "white" }}>Columns: {columns.join(', ')}</span>
              </Text>
            </div>
          ])

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        })
        .catch((error) => {
          <Text
            key={appendedComponents.length}
            ml="2"
            mb="3"
            color="red"
            fontFamily="Consolas"
          >
            <span style={{ color: "red" }}>File upload failed...</span>
          </Text>
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        })
    }
  }

  const drawChart = (command: string) => {
    var [cmd, fileName, rest] = command.split(" ");
    let postObj = { "file": fileName };
    axios
      .post(`${url}drawChart`, postObj)
      .then((response) => {
        if (response.data) {
          setAppendedComponents([
            ...appendedComponents,
            <DrawComponent
              data={response.data.data}
              command={command}
              file={response.data.file}
              key={appendedComponents.length}
            />,
          ]);
        }
      })
      .catch((error) => {
        setAppendedComponents([
          ...appendedComponents,
          <Text
            key={appendedComponents.length}
            ml="2"
            color="red"
            fontFamily="Courier New"
          >
            <span style={{ color: "white" }}>{fileName} </span>
            {errorMsg(error)}
          </Text>,
        ]);
      })
  }

  const deleteFile = (command: string, file: string) => {
    // const formData = new FormData();
    // formData.append("file", file);
    axios
    axios.delete(`${url}delete`, { params: { filename: file } })
      .then((response) => {
        setAppendedComponents([
          ...appendedComponents,
          <div key={appendedComponents.length}>
            <Text
              ml="2"
              mb="3"
              color="red"
              fontFamily="Consolas"
            >
              {command + " " + file}
            </Text>
            <Text
              ml="2"
              mb="3"
              color="green"
              fontFamily="Consolas"
            >
              <span style={{ color: "white" }}>{file + ".csv"}</span> deleted successfully
            </Text>
          </div>
        ])
      })
      .catch((error) => {
        setAppendedComponents([
          ...appendedComponents,
          <Text
            key={appendedComponents.length}
            ml="2"
            mb="3"
            color="red"
            fontFamily="Consolas"
          >
            {errorMsg(error)}
          </Text>
        ])
      })
  }

  return (
    <Grid className="p-5 ">
      <GridItem>
        <Navbar />
      </GridItem>
      {appendedComponents?.map((component, index) => (
        <GridItem key={index}>
          {component}
        </GridItem>
      ))}
      <GridItem>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
          className="px-2 bg-transparent outline-none border-none w-full h-12"
          fontFamily="Consolas"
          placeholder="Enter command here . . ." />
        <GridItem ref={bottomGridRef}></GridItem>
      </GridItem>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(e) => {
          const selectedFile = e.target.files && e.target.files[0];
          handleFileUpload(selectedFile);
        }}
      />

    </Grid>
  );
}