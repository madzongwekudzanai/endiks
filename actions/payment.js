import {
  GET_CURRENT_RATE,
  GET_TEMPORARY_QUOTE,
  GET_GBP_TO_USD,
  GET_CNY_TO_GBP,
} from "./types";
import fetch from "isomorphic-unfetch";

// Get current rate
export const getCurrentRate = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TRANSFER_WISE_TOKEN}`,
    },
  };
  const exchange = await fetch(
    `https://api.transferwise.com/v1/rates?source=CNY&target=USD`,
    config
  );
  const json = await exchange.json();
  dispatch({
    type: GET_CURRENT_RATE,
    payload: json[0].rate,
  });
};

// Get GBP to USD current rate
export const getGBPtoUSDRate = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TRANSFER_WISE_TOKEN}`,
    },
  };
  const exchange = await fetch(
    `https://api.transferwise.com/v1/rates?source=GBP&target=USD`,
    config
  );
  const json = await exchange.json();
  dispatch({
    type: GET_GBP_TO_USD,
    payload: json[0].rate,
  });
};

// Get CNY to GBP current rate
export const getCNYtoGBPRate = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TRANSFER_WISE_TOKEN}`,
    },
  };
  const exchange = await fetch(
    `https://api.transferwise.com/v1/rates?source=CNY&target=GBP`,
    config
  );
  const json = await exchange.json();
  dispatch({
    type: GET_CNY_TO_GBP,
    payload: json[0].rate,
  });
};

// Get quote
export const getTemporaryQuote = (amount) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TRANSFER_WISE_TOKEN}`,
    },
  };
  const exchange = await fetch(
    `https://api.transferwise.com/v1/quotes?source=USD&target=CNY&rateType=FIXED&targetAmount=${amount}`,
    config
  );
  const json = await exchange.json();
  dispatch({
    type: GET_TEMPORARY_QUOTE,
    payload: json.sourceAmount,
  });
};
