import { useState } from "react";
import { EXAMPLE_QUESTIONS } from "../data/exampleQuestions";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState(
    "This country borders Germany, Belgium, and the North Sea"
  );

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * EXAMPLE_QUESTIONS.length);
    setInput(EXAMPLE_QUESTIONS[randomIndex]);
  };

  return (
    <div className="flex gap-4">
      <div className="join w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          maxLength={500}
          disabled={disabled}
          className="input input-bordered join-item flex-1"
        />
        <button
          onClick={handleSend}
          disabled={disabled}
          className="btn btn-primary join-item"
        >
          {disabled ? "Sending..." : "Send"}
        </button>
      </div>
      <button
        onClick={handleRandom}
        disabled={disabled}
        title="Get random example"
        className="btn btn-primary join-item text-2xl"
      >
        🎲
      </button>
    </div>
  );
}
