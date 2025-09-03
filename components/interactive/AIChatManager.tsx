'use client';

import { useState } from 'react';
import AIChatButton from './AIChatButton';
import AIChat from './AIChat';
import NexusSimulateModal from '../modals/NexusSimulateModal';

export default function AIChatManager() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isSimulateOpen, setIsSimulateOpen] = useState(false);

  const handleOpenChat = (type: 'ai' | 'simulate') => {
    if (type === 'ai') {
      setIsAIChatOpen(true);
    } else if (type === 'simulate') {
      setIsSimulateOpen(true);
    }
  };

  return (
    <>
      <AIChatButton onOpenChat={handleOpenChat} />
      <AIChat 
        isOpen={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)} 
      />
      <NexusSimulateModal 
        isOpen={isSimulateOpen} 
        onClose={() => setIsSimulateOpen(false)} 
      />
    </>
  );
}
