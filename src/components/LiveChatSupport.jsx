import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
} from "@/components/ui";

export default function LiveChatSupport() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "agent", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { id: Date.now(), sender: "user", text: input.trim() },
    ]);
    setInput("");
    // Simulate agent response after delay
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now() + 1,
          sender: "agent",
          text: "Thanks for your message! We will get back to you shortly.",
        },
      ]);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Live Chat Support</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 overflow-auto space-y-3">
        <div className="flex flex-col space-y-2">
          {messages.map(({ id, sender, text }) => (
            <div
              key={id}
              className={`max-w-[75%] p-2 rounded-md ${
                sender === "agent" ? "bg-gray-200 self-start" : "bg-blue-500 text-white self-end"
              }`}
            >
              {text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <div className="p-4 border-t flex space-x-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
          rows={1}
          as="textarea"
        />
        <Button onClick={sendMessage} disabled={!input.trim()}>
          Send
        </Button>
      </div>
    </Card>
  );
}
