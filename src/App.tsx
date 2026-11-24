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
    <div className="App min-h-screen relative bg-white text-black">
      <ParticleBackground />
      <Navbar />
      <main className="pt-20">
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
