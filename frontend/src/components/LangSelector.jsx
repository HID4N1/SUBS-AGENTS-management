import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../i18n.js";

const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "ar", name: "العربية" },
];

const LangSelector = () => {
    const { i18n } = useTranslation();
    
    const changeLanguage = (code) => {
        console.log(`Language changed to: ${code}`);
    };

    useEffect(() => {
        console.log(i18n.dir());
        document.body.dir = i18n.dir();
    }, [i18n.language]); // Changed dependency to i18n.language

    return (
        <div className="lang-selector">
            <select
                onChange={(e) => {
                    const selectedLanguage = e.target.value;
                    i18n.changeLanguage(selectedLanguage);
                    changeLanguage(selectedLanguage);
                }}
                value={i18n.language} // Changed from defaultValue to value
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LangSelector;