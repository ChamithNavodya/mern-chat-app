import { AiOutlineSend } from "react-icons/ai";
import MessageCard from "./MessageCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState("");
  const [token, setToken] = useState("");
  const [sendingMessage, setsendingMessage] = useState(false);

  const getMessages = async (token) => {
    const res = await axios.get("api/messages", {
      headers: { Authorization: token },
    });
    setMessages(res.data);
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`api/messages/${id}`, {
        headers: { Authorization: token },
      });
      getMessages(token);
    } catch (error) {
      window.location.href = "/";
    }
  };

  const createMessage = async (e) => {
    try {
      setsendingMessage(true);
      const token = localStorage.getItem("tokenStore");
      if (token) {
        await axios.post(
          "api/messages",
          { title: title },
          {
            headers: { Authorization: token },
          }
        );
        setTitle("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsendingMessage(false);
      getMessages(token);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getMessages(token);
    }
  }, []);

  return (
    <div className="border-2 border-gray-300 rounded-lg min-h-[500px] p-3 bg-slate-100/50 mx-2 my-3">
      <div id="chat" className="flex flex-col h-full">
        <div className="flex justify-between items-center gap-5">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-grey-500 focus:border-2 focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Text Message"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={sendingMessage}
          />
          <button onClick={createMessage}>
            <AiOutlineSend className="text-4xl text-black/75 bg-slate-200 rounded-2xl p-1" />
          </button>
        </div>
        <div className="flex-col flex my-5">
          {messages.map((message) => (
            <MessageCard
              title={message.title}
              date={message.date}
              deleteNote={() => deleteNote(message._id)}
              key={message._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
