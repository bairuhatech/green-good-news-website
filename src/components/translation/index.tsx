import React, { useEffect,useState } from "react";
import "./styles.css"


const Translation = () => {
     


    const googleTranslateElementInit = () => {
        // new window.google.translate.TranslateElement({ pageLanguage: 'ml',layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element')
        new google.translate.TranslateElement({ includedLanguages : 'ar,en,ml',layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
       }
    
       useEffect(() => {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }, []);
    
    return (
      <>
        <div id="google_translate_element"></div>
      </>
    );
    
    } 
    export default Translation;