import { Box, List, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Props {
  command: string,
  currency: string
}

const url = "https://api.binance.com/api/v3/avgPrice?symbol=";

export const errorMsg = (error: any) => {
  if (error.response) {
    const statusCode = error.response.status;
    const responseData = error.response.data;

    switch (statusCode) {
      case 400:
        return "Bad Request: The server could not understand the request.";
      case 401:
        return "Unauthorized: Authentication is required, or the provided credentials are invalid.";
      case 403:
        return "Forbidden: Access to the requested resource is denied.";
      case 404:
        return "Not Found: The requested resource could not be found on the server.";
      case 500:
        return "Internal Server Error: An unexpected error occurred on the server.";
      default:
        return "Status Code:" + statusCode + " Response Data:" + responseData;
    }
  } else if (error.request) {
    return "No Response Received";
  } else {
    return "Request Error:" + error.message;
  }
};

const CryptoPriceComponent = ({ command, currency }: Props) => {
  const [cryptoPrice, setCryptoPrice] = useState<any | null>(null);
  const [cryptoError, setCryptoError] = useState<any | null>(null);

  const fetchCryptoPrice = (currency: string) => {
    currency = currency.toUpperCase();
    axios
      .get(url + currency)
      .then((response) => {
        setCryptoPrice(Number(response.data.price).toFixed(2).toString());
      })
      .catch((error) => {
        setCryptoError(errorMsg(error));
      })
  }

  useEffect(() => {
    if (currency) {
      fetchCryptoPrice(currency);
    }
  }, [currency])

  return (
    <Box mb="3" ml="2">
      <Text fontFamily="Courier New" color="red" fontSize="sm">
        {"fetch-price " + currency}
      </Text>

      <List.Root
        fontFamily="Consolas"
        color="green"
      >
        {cryptoError && (
          <Text fontFamily="Courier New" color="green" fontSize="sm">
            {cryptoError}
          </Text>
        )}
        {cryptoPrice && (
          <List.Item>
            The current price of &nbsp;
            <span style={{ color: "white" }}>{currency.toUpperCase()}{" "}</span> is
            <span style={{ color: "white", marginLeft: "5px" }}>
              ${cryptoPrice}
            </span>
          </List.Item>
        )}
      </List.Root>
    </Box>
  )
}

export default CryptoPriceComponent