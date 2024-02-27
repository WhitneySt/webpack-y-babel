import axios from "axios";
import endpoints from "./data";

export const getTransactions = async () => {
  try {
    const { data } = await axios.get(endpoints.transactions);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createTransaction = async (transaction) => {
  try {
    const response = await axios.post(endpoints.transactions, transaction);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteATransaction = async (id) => {
  try {
    const response = await axios.delete(endpoints.transaction(id));
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
