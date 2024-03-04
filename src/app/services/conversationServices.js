import axios from "axios";
import endpoints, { conversations } from "./data";

export const startAConversation = async ({
  senderUser,
  receptorUser,
  message,
}) => {
  try {
    const url = endpoints.conversations;
    const newConversation = {
      senderId: senderUser,
      receptorId: receptorUser,
      messages: [
        {
          sender: senderUser,
          date: new Date(),
          seen: false,
          message: message,
        },
      ],
    };
    const response = await axios.post(url, newConversation);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendMessage = async ({
  idConversation,
  messagesArrays,
  sender,
  newMenssage,
}) => {
  try {
    const url = endpoints.aConversation(idConversation);
    const message = {
      sender: sender,
      date: new Date(),
      seen: false,
      message: newMenssage,
    };
    const response = await axios.patch(url, {
      messages: [...messagesArrays, message],
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteAMessage = async ({
  idConversation,
  messageIndex,
  messagesArrays,
}) => {
  try {
    const url = endpoints.aConversation(idConversation);
    const messages = messagesArrays.filter((_, index) => index != messageIndex);
    const response = await axios.patch(url, {
      messages: messages,
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getAllConversations = async () => {
    try {
        const { data } = await axios.get(conversations);
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}