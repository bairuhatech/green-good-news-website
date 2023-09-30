import * as React from "react";
import { useState, useEffect } from "react";
import { graphql, PageProps } from "gatsby";
import { AllNews } from "../utils/api";
import Header from "../components/header/index";
import Home from "./Home";
import BottomNav from "../components/BottomNav";
import "../styles/global.scss";
import CardScroll from "../components/CardScroll";
import LoadingBox from "../components/LoadingBox";
import SEO from "../components/SEO/index"
//import Head from "../components/head";
import "./styles.css";

interface IndexPageProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        image: string;
      };
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
      const handleContextmenu = (e: Event) => {
        e.preventDefault();
      };
    
      document.addEventListener("contextmenu", handleContextmenu);
    
      return () => {
        document.removeEventListener("contextmenu", handleContextmenu);
      };
  }, []);

  const { title, description, image } = data.site.siteMetadata;

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          <SEO title={title} description={description} image={image} />
          <Header />
          <CardScroll />
          <Home />
          <BottomNav />
        </>
      )}
    </>
  );
};

export default IndexPage;
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        image
      }
    }
  }
`;
