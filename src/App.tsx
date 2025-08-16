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
    // Check for version changes and clear cache if needed
    const checkVersionAndClearCache = async () => {
      const storedVersion = localStorage.getItem('app_version');
      
      if (storedVersion !== APP_VERSION) {
        console.log('Version changed, clearing cache...');
        console.log('Previous version:', storedVersion);
        console.log('Current version:', APP_VERSION);
        
        // Clear all caches
        await cacheManager.clearAllCaches();
        
        // Store new version
        localStorage.setItem('app_version', APP_VERSION);
        
        // Reload page to ensure fresh content
        window.location.reload();
      }
    };

    // Check for updates every 5 minutes
    const updateInterval = setInterval(() => {
      cacheManager.checkForUpdates();
    }, 5 * 60 * 1000);

    // Initial version check
    checkVersionAndClearCache();

    // Cleanup interval on unmount
    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div className="App min-h-screen relative bg-white text-black">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <AboutMe />
        <Skills />
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
