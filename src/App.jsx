import { useState, useEffect, lazy, Suspense } from 'react';
import { useTheme } from './hooks/useTheme';
import { useGitHubData } from './hooks/useGitHubData';
import { useScrollReveal } from './hooks/useScrollReveal';
import PencilCursor from './components/PencilCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import WhatIBring from './components/WhatIBring';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import KonamiEgg from './components/KonamiEgg';

const Chatbot = lazy(() => import('./components/Chatbot/Chatbot'));

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const { profile, projects, syncStatus, lastSynced, syncNow, rateLimitReset } = useGitHubData();
  const [renderDeferred, setRenderDeferred] = useState(false);
  const [botLoaded, setBotLoaded] = useState(false);
  const [botInitialOpen, setBotInitialOpen] = useState(false);

  useEffect(() => {
    // Break up synchronous rendering so initial task finishes in <30ms (zero TBT)
    const id = requestAnimationFrame(() => {
      setRenderDeferred(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    // Idle preload chatbot after initial paint/interaction
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setBotLoaded(true));
      } else {
        setBotLoaded(true);
      }
    }, 1500);

    const onOpenChat = () => {
      setBotInitialOpen(true);
      setBotLoaded(true);
    };
    window.addEventListener('open-chatbot', onOpenChat);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-chatbot', onOpenChat);
    };
  }, []);

  // Re-run scroll observer when projects or deferred sections are rendered
  useScrollReveal([projects, renderDeferred]);

  const handleLaunchBot = () => {
    setBotInitialOpen(true);
    setBotLoaded(true);
  };

  return (
    <>
      <PencilCursor />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <main id="main-content">
        <Hero profile={profile} />
        <About />
        <Projects
          projects={projects}
          syncStatus={syncStatus}
          lastSynced={lastSynced}
          syncNow={syncNow}
          rateLimitReset={rateLimitReset}
        />
        {renderDeferred && (
          <>
            <WhatIBring />
            <Skills />
            <Journey />
            <Contact />
          </>
        )}
      </main>

      {renderDeferred && <Footer />}
      <KonamiEgg />
      
      {!botLoaded ? (
        <aside className="chatbot-root" aria-label="Someshwar's Portfolio AI Assistant">
          <button
            type="button"
            id="chatbot-trigger"
            className="chatbot-trigger"
            onClick={handleLaunchBot}
            aria-expanded={false}
            aria-haspopup="dialog"
            title="Chat with Somesh AI"
          >
            <div className="chatbot-trigger-icon-wrap">
              <span className="chatbot-avatar-emoji" aria-hidden="true">🤖</span>
              <span className="chatbot-status-dot" aria-hidden="true"></span>
            </div>
            <span className="chatbot-trigger-label">
              <span className="chatbot-trigger-label-title">Somesh AI</span>
              <span className="chatbot-trigger-label-sub">Ask me anything!</span>
            </span>
            <span className="chatbot-badge" aria-label="1 unread message">1</span>
          </button>
        </aside>
      ) : (
        <Suspense fallback={null}>
          <Chatbot initialOpen={botInitialOpen} />
        </Suspense>
      )}
    </>
  );
}
