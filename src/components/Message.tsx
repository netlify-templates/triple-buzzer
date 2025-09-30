import type { Message as MessageType } from "../types";

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const providerLabels = {
    openai: "OpenAI",
    anthropic: "Claude",
    gemini: "Gemini",
  };

  const providerColors = {
    openai: "gradient-openai",
    anthropic: "gradient-anthropic",
    gemini: "gradient-gemini",
  };

  const isModelAnswer = message.type === "assistant";

  return (
    <div className={`chat ${isModelAnswer ? "chat-start" : "chat-end"}`}>
      <div className="chat-image">
        {isModelAnswer ? (<span className={"py-2 px-3 mr-2 rounded-2xl font-bold text-lg text-base-content " + providerColors[message.provider!]}>
        {providerLabels[message.provider!]}
        
        </span>) : ("")}
      </div>

      <div
        className={
          "chat-bubble rounded-2xl  text-[16px] text-base-content " +
          (isModelAnswer ? "chat-bubble-warning" : "chat-bubble-info")
        }
      >
        {message.content}
      </div>

      {isModelAnswer && (
        <div
          className="chat-footer text-[14px]"
        >
          <time className="">{message.responseTime}ms</time>
        </div>
      )}

      {/*message.type === 'assistant' && message.provider && (
          <>
            <div className={`badge badge-sm absolute -top-2 -right-2 text-gold ${providerColors[message.provider]}`}>
              {providerLabels[message.provider]}
            </div>
            {message.responseTime !== undefined && (
              <div className="badge badge-xs absolute -bottom-2 -right-2">{message.responseTime}ms</div>
            )}
          </>
        )*/}
    </div>
  );
}
