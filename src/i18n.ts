import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "home": "Home",
            "about-me": "About Me",
            "skills": "Technical Skills",
            "projects": "Projects",
            "certificates": "Certificates",
            "contact": "Contact",
            "links": "Links",
            "java-developer": "Java Developer | Backend Specialist",
            "building-robust": "Building robust, scalable, and efficient backend solutions with Java and Spring Boot. Passionate about clean code and continuous learning.",
            "lets-connect": "Let's Connect!",
            "feel-free": "Feel free to reach out for collaborations or just a friendly hello.",
            "download-cv": "Download CV",
        },
    },
    tr: {
        translation: {
            "home": "Ana Sayfa",
            "about-me": "Hakkımda",
            "skills": "Teknik Yetenekler",
            "projects": "Projeler",
            "certificates": "Sertifikalar",
            "contact": "İletişim",
            "links": "Bağlantılar",
            "java-developer": "Java Geliştirici | Backend Uzmanı",
            "building-robust": "Java ve Spring Boot ile sağlam, ölçeklenebilir ve verimli backend çözümleri geliştiriyorum. Temiz kod ve sürekli öğrenme tutkusuna sahibim.",
            "lets-connect": "Hadi Bağlanalım!",
            "feel-free": "İşbirliği veya sadece dostça bir merhaba için bana ulaşmaktan çekinmeyin.",
            "download-cv": "CV İndir",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n; 