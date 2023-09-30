import React, { useState, Suspense } from "react";
import SEO from "../../components/SEO";
// import Img from "../../assets/Images/home.jpg"
import FirstSection from "./FirstSection";
const SecondSection = React.lazy(() => import("./SecondSection"));
const ThirdSection = React.lazy(() => import("./ThirdSection"));
const FourthSection = React.lazy(() => import("./FourthSection"));
const FifthSection = React.lazy(() => import("./FifthSection"));
const SixthSection = React.lazy(() => import("./SixthSection"));
const StoriesSection = React.lazy(() => import("./StoriesSection"));
import LoadingBox from "../../components/LoadingBox/LoadingBox2";
import WebStories from "../webStories";

const Home = (props: any) => {
  const [isLoading, setIsLoading] = useState();
  let logo = "https://suprabhaatham-cms.s3.eu-west-2.amazonaws.com/assets/supLogo.png"
  return (
    <>
    <SEO
    title="HOME Page"
    description="This is The description of Home Page"
    image={logo}
    />

    <main className="Container">
      <div className="ContentSection">
        {isLoading ? (
          <LoadingBox />
        ) : (
          <>
            <FirstSection />
            <Suspense fallback={<LoadingBox />}>
              <StoriesSection />
              <SecondSection />
              <WebStories />
              <ThirdSection />
              <FourthSection />
              <FifthSection />
              <SixthSection />
            </Suspense>
          </>
        )}
      </div>
    </main>
    </>
    
  );
};

export default Home;
