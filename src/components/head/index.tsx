import React from "react";
import SEO from "../../components/SEO/index";

interface HeadProps {
        pageTitle: string;
        pageDescription: string;
        pageImage: string;
      }
      
      const Head: React.FC<HeadProps> = ({ pageTitle, pageDescription, pageImage }) => (
        <SEO title={pageTitle} description={pageDescription} image={pageImage} />
      );
      
      export default Head;