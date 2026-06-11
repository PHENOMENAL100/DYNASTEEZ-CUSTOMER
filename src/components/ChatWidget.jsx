import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';

const contexts = {
  landing: {
    title: 'Dynasteez Assistant',
    subtitle: 'Ask about products, sizing, or orders',
    systemPrompt: `You are the Dynasteez fashion assistant. You help customers browse products, answer questions about sizing, pricing, shipping, returns, and styling advice. Be friendly, concise, and fashion-forward.`,
    welcomeMessage: "Hi! 👋 Welcome to Dynasteez. I'm here to help you find the perfect fit. Ask me about our new arrivals, sizing, or anything else!",
    theme: 'black'
  },
  user: {
    title: 'Your Support Assistant',
    subtitle: 'Track orders, returns, or get help',
    systemPrompt: `You are the Dynasteez customer support assistant. You help users with order tracking, returns, exchanges, account issues, and product questions.`,
    welcomeMessage: "Hey! Need help with an order, return, or just browsing? I'm here for you.",
    theme: 'black'
  },
  admin: {
    title: 'Admin AI Copilot',
    subtitle: 'Internal operations & analytics helper',
    systemPrompt: `You are the Dynasteez admin assistant. You help the admin team with operational questions, inventory insights, sales analytics, and platform troubleshooting.`,
    welcomeMessage: "Admin mode active. Ask me about sales trends, inventory alerts, or operational workflows.",
    theme: 'stone'
  }
};

const mockResponses = {
  landing: [
    "Our new arrivals drop every Friday at 9 AM WAT! 🚀 The Dynasteez Galaxy Tee is trending right now — limited stock.",
    "For sizing: Our tees run true to size. If you prefer an oversized fit, go one size up. The hoodies are already oversized by design.",
    "We ship nationwide within 3-5 business days. Lagos orders often arrive next-day! 🚚",
    "Returns are easy — 14-day window, unworn with tags. Just initiate from your orders page.",
    "That tee would look great with our joggers! Want me to suggest a full fit? 👀",
    "The Dynasteez Crown Cap is ₦15,000 and pairs perfectly with streetwear fits."
  ],
  user: [
    "I can see your recent orders. Your Order #DZ-8923 is currently out for delivery — expected today by 6 PM! 📦",
    "To initiate a return, go to Orders → Click the order → 'Return Item'. You'll get a prepaid label.",
    "Your loyalty points balance is 450 pts. You can redeem 500 pts for ₦5,000 off your next order! 🎉",
    "That item is eligible for exchange within 14 days. Same process as returns, just select 'Exchange' instead.",
    "Your payment method on file ends in 4421. Want to update it before your next purchase?"
  ],
  admin: [
    "This week's sales are up 23% vs last week. Top performer: Dynasteez Hoodie (47 units sold). 📈",
    "Inventory alert: Kids Tee (Size 8-10) is down to 12 units. Recommend restocking within 48 hours.",
    "Customer acquisition cost dropped to ₦1,200 this week. Your Instagram campaign is outperforming Twitter by 3x.",
    "Return rate this month: 4.2% (industry avg: 6%). Your sizing guide is working well.",
    "Peak traffic hours: 8-10 PM WAT. Consider scheduling your drops during this window for max conversion."
  ]
};

const getMockResponse = (context, userMessage) => {
  const responses = mockResponses[context] || mockResponses.landing;
  const msg = userMessage.toLowerCase();
  if (msg.includes('ship') || msg.includes('delivery')) return responses.find(r => r.includes('ship')) || responses[2];
  if (msg.includes('size') || msg.includes('fit')) return responses.find(r => r.includes('size')) || responses[1];
  if (msg.includes('return') || msg.includes('exchange')) return responses.find(r => r.includes('return') || r.includes('exchange')) || responses[3];
  if (msg.includes('price') || msg.includes('cost') || msg.includes('₦')) return responses.find(r => r.includes('₦')) || responses[0];
  if (msg.includes('order') || msg.includes('track')) return responses.find(r => r.includes('Order')) || responses[0];
  if (msg.includes('inventory') || msg.includes('stock')) return responses.find(r => r.includes('Inventory')) || responses[1];
  if (msg.includes('sale') || msg.includes('revenue') || msg.includes('analytics')) return responses.find(r => r.includes('sales') || r.includes('₦1')) || responses[0];
  return responses[Math.floor(Math.random() * responses.length)];
};

const ChatWidget = ({ 
  context = 'landing', 
  position = 'bottom-right',
  useMock = true,
  apiEndpoint = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const widgetRef = useRef(null);
  const chatConfig = contexts[context] || contexts.landing;

  useEffect(() => {
    const saved = localStorage.getItem(`dynasteez_chat_${context}`);
    if (saved) {
      try { setMessages(JSON.parse(saved)); setHasStarted(true); } catch (e) {}
    }
  }, [context]);

  useEffect(() => {
    if (messages.length > 0) localStorage.setItem(`dynasteez_chat_${context}`, JSON.stringify(messages));
  }, [messages, context]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 100); }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const streamText = async (fullText, messageId) => {
    let currentText = '';
    const words = fullText.split(' ');
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, text: currentText } : msg));
      await new Promise(r => setTimeout(r, 30 + Math.random() * 50));
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput('');
    setHasStarted(true);
    const userMessage = { id: Date.now(), role: 'user', text: userMsg, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      if (useMock || !apiEndpoint) {
        await new Promise(r => setTimeout(r, 800 + Math.random() * 1000));
        const responseText = getMockResponse(context, userMsg);
        const botMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: botMessageId, role: 'assistant', text: '', timestamp: new Date().toISOString() }]);
        await streamText(responseText, botMessageId);
      } else {
        const response = await fetch(apiEndpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMsg, context, systemPrompt: chatConfig.systemPrompt, history: messages.slice(-10) })
        });
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        const botMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: botMessageId, role: 'assistant', text: '', timestamp: new Date().toISOString() }]);
        await streamText(data.reply, botMessageId);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.", timestamp: new Date().toISOString(), isError: true }]);
    } finally { setIsTyping(false); }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const clearChat = () => { setMessages([]); setHasStarted(false); localStorage.removeItem(`dynasteez_chat_${context}`); };
  const toggleOpen = () => setIsOpen(prev => !prev);

  const positionClasses = {
    'bottom-right': 'bottom-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3'
  };

  const isBlackTheme = chatConfig.theme === 'black';

  return (
    <div ref={widgetRef} className={`fixed ${positionClasses[position] || 'bottom-3 right-3'} z-[9999]`}>
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-[90vw] max-w-[320px] md:max-w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col h-[380px] max-h-[calc(100vh-5rem)]">
            <div className={`px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0 ${isBlackTheme ? 'bg-black' : 'bg-stone-900'}`}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">{chatConfig.title}</h3>
                  <p className="text-[9px] text-white/60">{chatConfig.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {hasStarted && (
                  <button onClick={clearChat} className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                    <span className="text-[10px] font-medium">Clear</span>
                  </button>
                )}
                <button onClick={toggleOpen} className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50/50 min-h-0">
              {!hasStarted ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                  <div className={`w-10 h-10 rounded-full ${isBlackTheme ? 'bg-black' : 'bg-stone-800'} flex items-center justify-center`}>
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-gray-500 max-w-[240px] leading-relaxed">{chatConfig.welcomeMessage}</p>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-gray-200' : isBlackTheme ? 'bg-black' : 'bg-stone-800'}`}>
                        {msg.role === 'user' ? <User className="w-3 h-3 text-gray-600" /> : <Bot className="w-3 h-3 text-white" />}
                      </div>
                      <div className={`max-w-[78%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-black text-white rounded-br-md' : msg.isError ? 'bg-red-50 text-red-700 border border-red-100 rounded-bl-md' : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md'}`}>
                        {msg.text || (msg.role === 'assistant' && <span className="inline-block w-1 h-1 bg-gray-400 rounded-full animate-pulse" />)}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-2">
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${isBlackTheme ? 'bg-black' : 'bg-stone-800'}`}>
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-md px-3 py-2.5">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            <div className="px-3 py-2.5 bg-white border-t border-gray-100 shrink-0">
              <div className="flex items-end gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-gray-400 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  rows={1}
                  className="flex-1 bg-transparent text-xs text-gray-800 placeholder-gray-400 resize-none outline-none max-h-20 py-1"
                  style={{ minHeight: '18px' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className={`p-1.5 rounded-lg transition-all shrink-0 ${input.trim() && !isTyping ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[9px] text-gray-400 text-center mt-1.5">{useMock ? 'Mock mode — responses are simulated' : 'Powered by AI'}</p>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={toggleOpen}
        className={`relative w-11 h-11 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'bg-gray-200 text-gray-600' : isBlackTheme ? 'bg-black text-white hover:bg-gray-800' : 'bg-stone-800 text-white hover:bg-stone-700'}`}
      >
        {isOpen ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default ChatWidget;