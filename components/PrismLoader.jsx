'use client'

import { useEffect } from "react"
import Prism from 'prismjs'
import "prismjs/themes/prism-okaidia.css";
import PrismJsx from 'prismjs/components/prism-jsx.min';

const languageObj = {
    'html': 'language-markup',
    'javascript': 'language-javascript',
    'jsx': 'language-jsx'
}

export default function PrismLoader({ content, language }) {
    const lang = languageObj[language]
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div className="">
            <pre className={`${lang} w-[85%] overflow-x-scroll`}><code className={lang}>{content}</code></pre>
            {/* <pre className={`language-${language === 'html' ? 'markup' : language}`}><code className={`language-${language === 'html' ? 'markup' : language}`}>{content}</code></pre> */}
        </div>
    )
}