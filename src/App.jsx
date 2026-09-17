import { useState, useEffect } from 'react';
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

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const { profile, projects } = useGitHubData();
  const [renderDeferred, setRenderDeferred] = useState(false);

  useEffect(() => {
    // Break up synchronous rendering so initial task finishes in <30ms (zero TBT)
    const id = requestAnimationFrame(() => {
      setRenderDeferred(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Re-run scroll observer when projects or deferred sections are rendered
  useScrollReveal([projects, renderDeferred]);

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
        <Projects projects={projects} />
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
    </>
  );
}
