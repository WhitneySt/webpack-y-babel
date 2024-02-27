const URL_BASE = "http://localhost:3000/";

const endpoints = {
  transactions: `${URL_BASE}movimientos`,
  transaction: (id) => `${URL_BASE}movimientos/${id}`,
};

export default endpoints;
