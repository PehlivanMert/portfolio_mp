import Contact from "./Sections/Contact";
import Footer from "./Sections/Footer";
import Hero from "./Sections/Hero";
import Navbar from "./Components/Navbar";
import Projects from "./Sections/Projects";
import Statistics from "./Sections/Statistics";
import AboutMe from "./Sections/AboutMe";
import Skills from "./Sections/Skills";
import Education from "./Sections/Education";

function App() {
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
