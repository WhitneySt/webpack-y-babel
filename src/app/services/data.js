const URL_BASE = "http://localhost:3000/";

const endpoints = {
  transactions: `${URL_BASE}movimientos`,
  transaction: (id) => `${URL_BASE}movimientos/${id}`,
  conversations: `${URL_BASE}conversations`,
  users: `${URL_BASE}users`,
  conversation: (sender, receptor) =>
    `${URL_BASE}conversations?senderId=${sender}&receptorId=${receptor}`,
  aConversation: (id) => `${URL_BASE}conversations/${id}`,
};

export default endpoints;

//Destructuring de objetos
export const { transactions, transaction, conversations, conversation } = endpoints;
