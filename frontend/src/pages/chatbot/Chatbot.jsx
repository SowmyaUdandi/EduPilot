import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { chatbotService } from "../../services/dashboardService";

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "You",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await chatbotService(question);
      const botMessage = {
        sender: "EduPilot AI",
        text: response.answer,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "EduPilot AI",
          text: "Sorry, something went wrong.",
        },
      ]);
    }

    setQuestion("");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        EduPilot AI Chatbot
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="h-[450px] overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">

          {messages.length === 0 ? (
            <p className="text-gray-500">
              Ask me anything about attendance, marks, study, stress or recommendations.
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.sender === "You"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                <strong>{msg.sender}</strong>

                <div
                  className={`inline-block px-4 py-2 rounded-lg mt-1 ${
                    msg.sender === "You"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}

        </div>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Ask EduPilot AI..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 border rounded-lg p-3"
          />

          <button
            onClick={sendMessage}
            className="bg-emerald-600 text-white px-6 rounded-lg hover:bg-emerald-700"
          >
            Send
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Chatbot;
