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
    }, [i18n.language]);

    const selectStyle = {
        backdropFilter: 'blur(8px)',
        backgroundColor: 'White',
        color: 'black',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '5px 30px 5px 10px',
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        backgroundSize: '20px 20px',
        cursor: 'pointer',
    };

    return (
        <div className="lang-selector" style={{ position: 'relative', display: 'inline-block' }}>
        <select
            className="language-dropdown"
            style={selectStyle}
            onChange={(e) => {
                const selectedLanguage = e.target.value;
                i18n.changeLanguage(selectedLanguage);
                changeLanguage(selectedLanguage);
            }}
            value={i18n.language}
            aria-label="Select language"
        >
            {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                   🌐 {lang.code.toUpperCase()}
                </option>
            ))}
        </select>
    </div>
    );
};

export default LangSelector;