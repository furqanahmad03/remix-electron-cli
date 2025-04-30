import { Grid, GridItem, Heading, Highlight, Text } from '@chakra-ui/react'
import React from 'react'

const Navbar = () => {
  return (
    <>
      <Heading className='text-center mt-3 mb-1 font-semibold text-3xl' fontFamily="mono">
        <Highlight
          query="Remix-CLI"
          styles={{ px: "0.5", bg: "orange.subtle", color: "orange.fg" }}
        >
          Welcome to Remix-CLI
        </Highlight>
      </Heading>
      <Text className='text-center mt-2 mb-6' fontFamily="Consolas">
        <Highlight
          query="--help"
          styles={{ px: "0.5", bg: "red.subtle", color: "red.fg" }}
        >
          Type any command or --help to show the all the available commands
        </Highlight>
      </Text>
    </>
  )
}

export default Navbar