import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    image: `https://epaper.suprabhaatham.com/maha/includes/images/suprabata_logo.png`
  },
  flags: {
    DEV_SSR: true,
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-antd",
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    // `gatsby-plugin-sitemap`,
    "gatsby-plugin-apollo",
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "suprabhaatham-cms",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: "https://suprabhaatham-dev.herokuapp.com/graphql",
      },
    },

    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`limelight`, `source sans pro\:300,400,400i,700`],
        display: "swap",
      },
    },
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: "https://suprabhaatham-dev.herokuapp.com/graphql",
      },
    },
    {
      resolve: "gatsby-plugin-buildtime-timezone",
      options: {
        tz: "Pacific/Auckland",
        format: "ddd, DD MMM YYYY hh:mm A",
      },
    },
    // {
    //   resolve: `gatsby-plugin-social9-socialshare`,
    //   options: {
    //     content:  966242223397117,
    //   }
    // }
    // {
    //   resolve: 'gatsby-plugin-sass',
    //   options: {
    //     data: `@import "${__dirname}/src/styles/global.scss";`,
    //   }
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/data/`,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-purgecss`,
    //   options: {
    //     whitelist: [
    //       "slick-slider",
    //       "slick-initialized",
    //       "slick-list",
    //       "slick-track",
    //       "slick-slide",
    //       "slick-active",
    //       "slick-current",
    //     ],
    //   },
    // },
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "suprabhaatham",
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/assets/Images/suprabhathamlogo.svg"
      }
    },

    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     // The unique name for each instance
    //     name: `src`,
    //     // Path to the directory
    //     path: `${__dirname}/src/pages/`,
    //   },
    // },
  ],
};

export default config;
