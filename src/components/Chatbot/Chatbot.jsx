import { useState, useEffect, useRef, useCallback } from 'react';
import { WELCOME_MESSAGE } from '../../data/botKnowledge';
import { generateBotResponse, playBotSound } from '../../utils/botEngine';
import './Chatbot.css';

export default function Chatbot({ initialOpen = false }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(initialOpen ? 0 : 1);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [copiedMsgId, setCopiedMsgId] = useState(null);
  const [showGreetingToast, setShowGreetingToast] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // External trigger event (e.g. from Navbar "Ask AI" button)
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setIsMinimized(false);
      setUnreadCount(0);
      setShowGreetingToast(false);
    };
    window.addEventListener('open-chatbot', handleOpenEvent);
    return () => window.removeEventListener('open-chatbot', handleOpenEvent);
  }, []);

  // Show friendly greeting toast after 3 seconds if chat is closed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowGreetingToast(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Keyboard shortcut: ESC to minimize/close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        if (isExpanded) {
          setIsExpanded(false);
        } else if (!isMinimized) {
          setIsMinimized(true);
        } else {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMinimized, isExpanded]);

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
          setTimeout(() => {
            handleSendMessage(transcript);
          }, 300);
        }
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  // Cancel speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Auto-scroll messages to bottom
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMinimized, messages, isTyping, scrollToBottom]);

  // Toggle open
  const handleToggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setUnreadCount(0);
      setShowGreetingToast(false);
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

  // Text-To-Speech (TTS) Voice playback
  const handleToggleSpeak = (msgId, text) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown symbols for cleaner speech
    const cleanSpeech = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/[#*`_~]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onstart = () => setSpeakingMsgId(msgId);
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Copy message text to clipboard
  const handleCopyMessage = async (msgId, text) => {
    try {
      const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\[(.*?)\]\((.*?)\)/g, '$1 ($2)');
      await navigator.clipboard.writeText(cleanText);
      setCopiedMsgId(msgId);
      setTimeout(() => setCopiedMsgId(null), 2000);
    } catch {
      // Fallback
    }
  };

  // Export / Download conversation transcript
  const handleExportTranscript = () => {
    const header = `====================================================\nSOMESH AI PORTFOLIO CHAT TRANSCRIPT\nDate: ${new Date().toLocaleString()}\nPortfolio: https://someshwar-songara.github.io/portfolio\n====================================================\n\n`;
    const body = messages
      .map((m) => {
        const time = new Date(m.timestamp).toLocaleTimeString();
        const role = m.sender === 'user' ? 'YOU' : 'SOMESH AI';
        const clean = m.text.replace(/\*\*(.*?)\*\*/g, '$1');
        return `[${time}] ${role}:\n${clean}\n`;
      })
      .join('\n----------------------------------------------------\n\n');

    const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Somesh_AI_Chat_Transcript_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle Action buttons (e.g. scroll to section or open link)
  const handleActionClick = (action) => {
    if (action.type === 'scroll') {
      const target = document.getElementById(action.target);
      if (target) {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });

        // Highlight flash on target
        target.classList.add('section-highlight-pulse');
        setTimeout(() => {
          target.classList.remove('section-highlight-pulse');
        }, 2200);

        // On mobile, minimize chat so user can see section
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

    setTimeout(async () => {
      try {
        const responseData = await generateBotResponse(query, messages);

        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: responseData.text,
          suggestions: responseData.suggestions || [],
          actions: responseData.actions || [],
          projectCards: responseData.projectCards || [],
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        console.error('Error in bot response:', err);
      } finally {
        setIsTyping(false);
        playBotSound('receive', isMuted);
      }

      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    }
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
    const paragraphs = content.split('\n\n');

    return paragraphs.map((para, pIdx) => {
      const lines = para.split('\n');
      return (
        <p key={pIdx} className="bot-p">
          {lines.map((line, lIdx) => {
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
      {/* Floating Greeting Toast on Page Load */}
      {showGreetingToast && !isOpen && (
        <div className="chatbot-greeting-toast" role="status">
          <div className="toast-content" onClick={handleToggleOpen}>
            <span className="toast-emoji">👋</span>
            <div className="toast-text">
              <strong>Need quick info?</strong>
              <span>Ask Somesh AI about projects &amp; skills!</span>
            </div>
          </div>
          <button
            type="button"
            className="toast-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowGreetingToast(false);
            }}
            aria-label="Dismiss greeting"
          >
            ✕
          </button>
        </div>
      )}

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
          <span className="chatbot-trigger-label-sub">Ask anything</span>
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
          className={`chatbot-window ${isMinimized ? 'minimized' : ''} ${isExpanded ? 'expanded' : ''}`}
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
                </h3>
                <p className="chatbot-header-sub">Ask anything about Someshwar</p>
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

              {/* Export Transcript */}
              <button
                type="button"
                className="chatbot-ctrl-btn"
                onClick={handleExportTranscript}
                title="Download chat transcript"
                aria-label="Download chat transcript"
              >
                📥
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

              {/* Expand/Compact */}
              <button
                type="button"
                className="chatbot-ctrl-btn chatbot-ctrl-btn--expand"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Standard view' : 'Wide reading mode'}
                aria-label={isExpanded ? 'Standard view' : 'Wide reading mode'}
              >
                {isExpanded ? '🗗' : '🗖'}
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
                      {/* Top utilities per message (Speak & Copy) */}
                      {msg.sender === 'bot' && (
                        <div className="chat-msg-toolbar">
                          <button
                            type="button"
                            className={`msg-tool-btn ${speakingMsgId === msg.id ? 'is-speaking' : ''}`}
                            onClick={() => handleToggleSpeak(msg.id, msg.text)}
                            title={speakingMsgId === msg.id ? 'Stop reading' : 'Read message aloud'}
                            aria-label="Read message aloud"
                          >
                            {speakingMsgId === msg.id ? '⏹️ Speaking...' : '🔊 Read'}
                          </button>

                          <button
                            type="button"
                            className="msg-tool-btn"
                            onClick={() => handleCopyMessage(msg.id, msg.text)}
                            title="Copy response to clipboard"
                            aria-label="Copy response"
                          >
                            {copiedMsgId === msg.id ? '✓ Copied' : '📋 Copy'}
                          </button>
                        </div>
                      )}

                      <div className="chat-msg-content">
                        {renderFormattedText(msg.text)}
                      </div>

                      {/* Interactive Rich Project Cards */}
                      {msg.projectCards && msg.projectCards.length > 0 && (
                        <div className="chat-project-cards-grid">
                          {msg.projectCards.slice(0, 4).map((p) => (
                            <div key={p.id} className="chat-mini-project-card">
                              <div className="mini-card-header">
                                <span className="mini-card-emoji">{p.emoji}</span>
                                <div className="mini-card-title-wrap">
                                  <strong className="mini-card-name">{p.name}</strong>
                                  <span className="mini-card-tag">{p.tag}</span>
                                </div>
                              </div>

                              <p className="mini-card-summary">{p.summary}</p>

                              <div className="mini-card-tech">
                                {(p.tech || []).slice(0, 3).map((t, idx) => (
                                  <span key={idx} className="mini-card-pill">{t}</span>
                                ))}
                              </div>

                              <div className="mini-card-links">
                                {p.demoUrl && (
                                  <a
                                    href={p.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mini-card-btn mini-card-btn--demo"
                                  >
                                    Live Demo 🌐
                                  </a>
                                )}
                                {p.githubUrl && (
                                  <a
                                    href={p.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mini-card-btn mini-card-btn--github"
                                  >
                                    GitHub 🐙
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

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
                          <span className="suggestions-label">Suggested prompts:</span>
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
                      <span className="typing-text">Somesh AI is writing...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Drawer */}
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
                  onClick={() => handleSendMessage('Which projects have live demos?')}
                >
                  🌐 Live Demos
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
                  onClick={() => handleSendMessage('Why should we hire Someshwar?')}
                >
                  💼 Why Hire?
                </button>
                <button
                  type="button"
                  className="quick-bar-chip"
                  onClick={() => handleSendMessage('How can I contact Someshwar?')}
                >
                  📫 Contact
                </button>
                <button
                  type="button"
                  className="quick-bar-chip"
                  onClick={() => handleSendMessage('Tell me a fun fact about Someshwar')}
                >
                  🎲 Fun Fact
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
                        ? '🎙️ Listening... speak now'
                        : 'Ask about projects, stack, internship, contact...'
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
