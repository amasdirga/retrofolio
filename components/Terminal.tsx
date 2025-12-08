import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<Array<{ type: 'user' | 'system', content: string }>>([
    { type: 'system', content: 'WELCOME TO PORTFOLIO_OS [VERSION 1.0.0]' },
    { type: 'system', content: '(C) 2024 DEV_CONSULTANT. ALL RIGHTS RESERVED.' },
    { type: 'system', content: 'TYPE YOUR QUESTION BELOW TO INTERACT WITH THE CANDIDATE AI.' },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userCmd = input;
    setHistory(prev => [...prev, { type: 'user', content: userCmd }]);
    setInput('');
    setIsProcessing(true);

    // Simulate network delay for realism
    // setHistory(prev => [...prev, { type: 'system', content: 'PROCESSING...' }]);
    
    try {
      let response = await sendMessageToGemini(userCmd);
      
      // Clean up response: Remove markdown code blocks if present
      response = response.replace(/^```[\w-]*\n/gm, '').replace(/```$/gm, '').trim();

      setHistory(prev => {
        const newHistory = [...prev];
        return [...newHistory, { type: 'system', content: response }];
      });
    } catch (err) {
      setHistory(prev => [...prev, { type: 'system', content: 'ERROR: CONNECTION FAILED' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-black text-green-500 font-mono h-full w-full p-2 text-sm md:text-base overflow-y-auto" onClick={() => document.getElementById('terminal-input')?.focus()}>
      <div className="flex flex-col gap-1 min-h-full">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap break-words">
            {line.type === 'user' ? (
              <div>
                <span className="text-green-400 font-bold mr-2">consultant@portfolio:~$</span>
                <span className="text-white">{line.content}</span>
              </div>
            ) : (
              <div className="text-green-300 opacity-90 pl-0">
                {line.content}
              </div>
            )}
          </div>
        ))}
        
        {isProcessing && (
           <div className="animate-pulse text-green-400">Processing...</div>
        )}

        <form onSubmit={handleCommand} className="flex gap-2 mt-1">
          <span className="text-green-400 font-bold shrink-0">consultant@portfolio:~$</span>
          <input
            id="terminal-input"
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none text-white w-full font-mono focus:ring-0 p-0"
            disabled={isProcessing}
            autoComplete="off"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;