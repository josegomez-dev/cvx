'use client';

import { useState } from 'react';
import AIChatButton from './AIChatButton';
import AIChat from './AIChat';
import DeveloperConsole from './DeveloperConsole';

export default function AIChatManager() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  const handleOpenChat = (type: 'ai' | 'console') => {
    if (type === 'ai') {
      setIsAIChatOpen(true);
    } else {
      setIsConsoleOpen(true);
    }
  };

  return (
    <>
      <AIChatButton onOpenChat={handleOpenChat} />
      <AIChat 
        isOpen={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)} 
      />
      <DeveloperConsole 
        isOpen={isConsoleOpen} 
        onClose={() => setIsConsoleOpen(false)} 
      />
    </>
  );
}
