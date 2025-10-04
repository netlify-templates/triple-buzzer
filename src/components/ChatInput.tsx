import { useState } from "react";
import { EXAMPLE_QUESTIONS } from "../data/exampleQuestions";

export function ChatInput(props: {
  onSend: (message: string) => void;
  disabled: boolean;
}) {
  const { onSend, disabled } = props;
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
    <div className="flex w-full join">
      <button
        onClick={handleRandom}
        disabled={disabled}
        className="btn btn-netural uppercase join-item"
      >
        <span className="text-4xl">🎲</span>
      </button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={handleKeyPress}
        maxLength={500}
        disabled={disabled}
        className="input input-bordered grow join-item"
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="btn btn-primary uppercase join-item"
      >
        Send
      </button>
    </div>
  );
}
