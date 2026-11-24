import ParticleBackground from "./Components/ParticleBackground";
import EcosystemShowcase from "./Components/EcosystemShowcase";
import Contact from "./Sections/Contact";
import Footer from "./Sections/Footer";
import Hero from "./Sections/Hero";
import Navbar from "./Components/Navbar";
import Projects from "./Sections/Projects";
import Statistics from "./Sections/Statistics";
import AboutMe from "./Sections/AboutMe";
import Skills from "./Sections/Skills";
import Education from "./Sections/Education";
import { Blog } from "./Sections/Blog";
import { useEffect } from "react";
import { cacheManager } from "./utils/cacheManager";

// App version - increment this when deploying updates
const APP_VERSION = '2.0.2';

function App() {
  useEffect(() => {
    // Check for version changes and clear cache safely if needed
    const checkVersionAndClearCache = async () => {
      const storedVersion = localStorage.getItem('app_version');
      
      if (storedVersion !== APP_VERSION) {
        console.log('Version updated:', storedVersion, '->', APP_VERSION);
        await cacheManager.clearAllCaches();
        localStorage.setItem('app_version', APP_VERSION);
      }
    };

    checkVersionAndClearCache();
  }, []);

  return (
    <div className="App min-h-screen relative bg-[#18181b] text-white selection:bg-purple-500 selection:text-white">
      {/* Fixed Cosmic Dark Gradient Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#23234a] via-[#18181b] to-[#23234a]" 
        aria-hidden="true" 
      />
      {/* Gentle Snowfall Layer — in the background behind all content */}
      <ParticleBackground />
      <Navbar />
      <main className="pt-20 relative z-10">
        <Hero />
        <AboutMe />
        <Skills />
        <EcosystemShowcase />
        <Projects />
        <Statistics />
        <Education />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
