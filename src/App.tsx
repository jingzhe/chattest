import { useState } from "react";
import { askConfluence } from "./api/axios";
import Typewriter from "react-typewriter-effect";

interface Message {
  text: string | undefined;
  isUser: boolean;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "This is a user message", isUser: true },
    {
      text: "This is a bot message",
      isUser: false,
    },
  ]);

  const handleMessageSubmit = async () => {
    if (input.trim() === "") return;
    setIsLoading(true);
    const response = await askConfluence(input);
    setMessages([
      ...messages,
      { text: input, isUser: true },
      { text: response?.answer, isUser: false },
    ]);
    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[100vh] w-[100vw] bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-2xl break-words max-w-[48%] ${
                message.isUser
                  ? "bg-white text-black shadow self-end"
                  : "bg-green-500 text-white self-start"
              }`}
            >
              {message.isUser && message.text}
              {!message.isUser && (
                <Typewriter text={message.text} typeSpeed={5} startDelay={0} />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleMessageSubmit}
          className={`px-4 py-2 rounded-full ${
            isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mx-auto"></div>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
