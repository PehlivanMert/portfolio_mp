import "./App.css";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import Contact from "./Sections/Contact";
import Footer from "./Sections/Footer";
import Hero from "./Sections/Hero";
import Navbar from "./Components/Navbar";
import Projects from "./Sections/Projects";
import AboutMe from "./Sections/AboutMe";
import Skills from "./Sections/Skills";
import Education from "./Sections/Education";

function App() {
  const [theme, setTheme] = useState("light");
  const { i18n } = useTranslation();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`App w-screen m-0 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <button
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        onClick={toggleTheme}
      >
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
      <div className="fixed top-4 left-4">
        <button onClick={() => changeLanguage("en")} className="p-2 rounded bg-blue-500 text-white mr-2">EN</button>
        <button onClick={() => changeLanguage("tr")} className="p-2 rounded bg-blue-500 text-white">TR</button>
      </div>
      <Navbar />
      <Hero />
      <AboutMe />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
