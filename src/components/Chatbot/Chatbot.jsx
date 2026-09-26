import { useState, useEffect, useRef } from 'react';
import { WELCOME_MESSAGE } from '../../data/botKnowledge';
import { generateBotResponse, playBotSound } from '../../utils/botEngine';
import './Chatbot.css';

export default function Chatbot({ initialOpen = false }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(initialOpen ? 0 : 1);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setIsMinimized(false);
      setUnreadCount(0);
    };
    window.addEventListener('open-chatbot', handleOpenEvent);
    return () => window.removeEventListener('open-chatbot', handleOpenEvent);
  }, []);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputValue(transcript);
          // Automatically send after voice capture
          setTimeout(() => {
            handleSendMessage(transcript);
          }, 300);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Auto-scroll messages to bottom
  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      // Focus input when opened
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMinimized, messages, isTyping]);

  // Toggle open
  const handleToggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setUnreadCount(0);
      playBotSound('pop', isMuted);
    } else {
      setIsOpen(false);
    }
  };

  // Toggle voice recognition
  const toggleSpeechRecognition = () => {
    if (!speechSupported || !recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setIsListening(true);
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  // Handle Action buttons (e.g. scroll to page section or open external link)
  const handleActionClick = (action) => {
    if (action.type === 'scroll') {
      const target = document.getElementById(action.target);
      if (target) {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });

        // On mobile, close or minimize chat so user can see section
        if (window.innerWidth <= 768) {
          setIsMinimized(true);
        }
      }
    } else if (action.type === 'link' && action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Send message flow
  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    // Play send chime
    playBotSound('send', isMuted);

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart thinking delay
    const delay = Math.min(1000, Math.max(400, query.length * 20));

    setTimeout(() => {
      const responseData = generateBotResponse(query, messages);

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseData.text,
        suggestions: responseData.suggestions || [],
        actions: responseData.actions || [],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playBotSound('receive', isMuted);

      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...WELCOME_MESSAGE,
        id: `welcome-${Date.now()}`,
        timestamp: new Date(),
      },
    ]);
    playBotSound('pop', isMuted);
  };

  // Helper to render bold markdown and links cleanly
  const renderFormattedText = (content) => {
    if (!content) return null;

    // Split paragraphs
    const paragraphs = content.split('\n\n');

    return paragraphs.map((para, pIdx) => {
      const lines = para.split('\n');
      return (
        <p key={pIdx} className="bot-p">
          {lines.map((line, lIdx) => {
            // Parse bold (**text**) and markdown links [text](url)
            const parts = [];
            const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
            let lastIndex = 0;
            let match;

            while ((match = regex.exec(line)) !== null) {
              if (match.index > lastIndex) {
                parts.push(line.substring(lastIndex, match.index));
              }
              const matchedStr = match[0];
              if (matchedStr.startsWith('**') && matchedStr.endsWith('**')) {
                parts.push(
                  <strong key={match.index} className="bot-strong">
                    {matchedStr.slice(2, -2)}
                  </strong>
                );
              } else if (matchedStr.startsWith('[') && matchedStr.includes('](')) {
                const labelMatch = matchedStr.match(/\[(.*?)\]/);
                const urlMatch = matchedStr.match(/\((.*?)\)/);
                if (labelMatch && urlMatch) {
                  parts.push(
                    <a
                      key={match.index}
                      href={urlMatch[1]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bot-inline-link"
                    >
                      {labelMatch[1]}
                    </a>
                  );
                }
              }
              lastIndex = regex.lastIndex;
            }

            if (lastIndex < line.length) {
              parts.push(line.substring(lastIndex));
            }

            return (
              <span key={lIdx} className="bot-line">
                {parts.length > 0 ? parts : line}
                {lIdx < lines.length - 1 && <br />}
              </span>
            );
          })}
        </p>
      );
    });
  };

  return (
    <aside className="chatbot-root" aria-label="Someshwar's Portfolio AI Assistant">
      {/* Floating Launcher Button */}
      <button
        type="button"
        id="chatbot-trigger"
        className={`chatbot-trigger ${isOpen ? 'active' : ''}`}
        onClick={handleToggleOpen}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title={isOpen ? 'Close chat' : 'Chat with Somesh AI'}
      >
        <div className="chatbot-trigger-icon-wrap">
          <span className="chatbot-avatar-emoji" aria-hidden="true">🤖</span>
          <span className="chatbot-status-dot" aria-hidden="true"></span>
        </div>

        <span className="chatbot-trigger-label">
          <span className="chatbot-trigger-label-title">Somesh AI</span>
          <span className="chatbot-trigger-label-sub">Ask me anything!</span>
        </span>

        {unreadCount > 0 && !isOpen && (
          <span className="chatbot-badge" aria-label={`${unreadCount} unread message`}>
            {unreadCount}
          </span>
        )}
      </button>

      {/* Main Chat Window */}
      {isOpen && (
        <div
          className={`chatbot-window ${isMinimized ? 'minimized' : ''}`}
          role="dialog"
          aria-labelledby="chatbot-heading"
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-identity">
              <div className="chatbot-header-avatar">
                <span>🤖</span>
                <span className="chatbot-online-pulse" title="Online & ready"></span>
              </div>
              <div className="chatbot-header-info">
                <h3 id="chatbot-heading" className="chatbot-header-title">
                  Somesh AI
                  <span className="chatbot-header-tag">assistant</span>
                </h3>
                <p className="chatbot-header-sub">Ask about Someshwar's work</p>
              </div>
            </div>

            <div className="chatbot-header-actions">
              {/* Sound Toggle */}
              <button
                type="button"
                className="chatbot-ctrl-btn"
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
                aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>

              {/* Reset Chat */}
              <button
                type="button"
                className="chatbot-ctrl-btn"
                onClick={handleResetChat}
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                🔄
              </button>

              {/* Minimize/Maximize */}
              <button
                type="button"
                className="chatbot-ctrl-btn"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand chat' : 'Minimize chat'}
                aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
              >
                {isMinimized ? '⤢' : '—'}
              </button>

              {/* Close */}
              <button
                type="button"
                className="chatbot-ctrl-btn chatbot-ctrl-btn--close"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Body */}
              <div className="chatbot-body" role="log" aria-live="polite">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chat-message chat-message--${msg.sender}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="chat-msg-avatar" aria-hidden="true">
                        🤖
                      </div>
                    )}

                    <div className="chat-msg-bubble">
                      <div className="chat-msg-content">
                        {renderFormattedText(msg.text)}
                      </div>

                      {/* Interactive Actions inside the message */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="chat-msg-actions">
                          {msg.actions.map((act, aIdx) => (
                            <button
                              key={aIdx}
                              type="button"
                              className="chat-action-btn"
                              onClick={() => handleActionClick(act)}
                            >
                              {act.icon && <span className="action-icon">{act.icon}</span>}
                              {act.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Quick Prompt Suggestions attached to this message */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="chat-suggestions-wrap">
                          <span className="suggestions-label">Suggested questions:</span>
                          <div className="chat-suggestions-chips">
                            {msg.suggestions.map((sug, sIdx) => (
                              <button
                                key={sIdx}
                                type="button"
                                className="chat-chip"
                                onClick={() => handleSendMessage(sug)}
                              >
                                {sug}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <span className="chat-msg-time">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="chat-message chat-message--bot">
                    <div className="chat-msg-avatar" aria-hidden="true">🤖</div>
                    <div className="chat-msg-bubble chat-msg-bubble--typing">
                      <div className="typing-indicator" aria-label="Somesh AI is thinking">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Quick-Prompt Drawer */}
              <div className="chatbot-quick-bar" aria-label="Quick questions">
                <button
                  type="button"
                  className="quick-bar-chip"
                  onClick={() => handleSendMessage('What projects have you built?')}
                >
                  🚀 Top Projects
                </button>
                <button
                  type="button"
                  className="quick-bar-chip"
                  onClick={() => handleSendMessage('What are your skills and tech stack?')}
                >
                  🛠️ Skills
                </button>
                <button
                  type="button"
                  className="quick-bar-chip"
                  onClick={() => handleSendMessage('Are you looking for an internship?')}
                >
                  💼 Internship Status
                </button>
                <button
                  type="button"
                  className="quick-bar-chip"
                  onClick={() => handleSendMessage('How can I contact Someshwar?')}
                >
                  📫 Contact
                </button>
              </div>

              {/* Input Area */}
              <form
                className="chatbot-footer"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <div className="chatbot-input-wrap">
                  <input
                    ref={inputRef}
                    type="text"
                    className="chatbot-input"
                    placeholder={
                      isListening
                        ? 'Listening to your voice...'
                        : 'Ask about projects, skills, internship...'
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                    aria-label="Message to Somesh AI"
                  />

                  {/* Speech to text button */}
                  {speechSupported && (
                    <button
                      type="button"
                      className={`chatbot-speech-btn ${isListening ? 'listening' : ''}`}
                      onClick={toggleSpeechRecognition}
                      title={isListening ? 'Stop listening' : 'Speak your question'}
                      aria-label={isListening ? 'Stop listening' : 'Voice input'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                      </svg>
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="chatbot-send-btn"
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Send message"
                  title="Send message"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </aside>
  );
}
