import { useState, useCallback } from "react";
import { ChatMessages } from "./components/ChatMessages";
import { ProviderSelector } from "./components/ProviderSelector";
import { ChatInput } from "./components/ChatInput";
import { useModels } from "./hooks/useModels";
import { useChat } from "./hooks/useChat";
import { Footer } from "./components/Footer";
import type { Provider } from "./types";
import "./index.css";

export function App() {
  const { models } = useModels();
  const { messages, isLoading, sendMessage } = useChat();
  const [selectedProviders, setSelectedProviders] = useState<
    Array<{ provider: Provider; model: string }>
  >([]);

  // TODO disable sending if no providers selected
  const handleSend = useCallback(
    (message: string) => {
      if (selectedProviders.length === 0) {
        alert("Please select at least one provider");
        return;
      }
      sendMessage({ message, providers: selectedProviders });
    },
    [selectedProviders, sendMessage]
  );

  return (
    <div
      id="main"
      className="w-screen h-screen max-h-screen flex flex-col lg:gap-4 justify-center items-center lg:p-4 bg-base-200 montserrat-font"
    >
      <div className="font-semibold text-lg lg:text-2xl text-base-content hidden lg:block">
        Triple Buzzer! A Netlify Game
      </div>
      <div className="max-w-[900px] w-full card grow bg-base-100 lg:border-2 border-base-300 rounded-none lg:rounded-2xl overflow-hidden">
        <div className="card-body grow overflow-hidden p-2 lg:p-4">
          <ChatMessages messages={messages} />
          { isLoading ? <LoadingIndicator /> : <ChatInput onSend={handleSend} disabled={isLoading} />}
          
        </div>
        <ProviderSelector
          models={models}
          onSelectionChange={setSelectedProviders}
        />
      </div>

      <Footer />
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-max text-nowrap">AI is typing</div>
      <progress className="progress grow h-6"></progress>
    </div>
  )
}