import React from "react";
import client from "../Config/Graphql/apolloclient";
import { gql } from "@apollo/client";
import { API } from "../Config/API";

const AllNews = (category: any) => {
  return new Promise(async (resolve, reject) => {
    client
      .query({
        query: gql`
        query {
          allNews(
            filters: {
              categories: {
                category: {${category}}
              }
            }
            sort: "id:desc"
            pagination: { start: 0, limit: 30 }
          ) {
            data {
              id
              attributes {
                head
                title
                body
                image
                permalink
                image2
                image1_description
                social_image
                image2_description
                createdAt
                likes
                audio
                isHighPriority
                categories {
                  data {
                    attributes {
                      category
                    }
                  }
                }
              }
            }
          }
        }
      `,
      })
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
const EditorialGET = () => {
  return new Promise(async (resolve, reject) => {
    client
      .query({
        query: gql`
          query {
            editorials(sort: "id:desc", pagination: { start: 0, limit: 30 }) {
              data {
                attributes {
                  title
                  head
                  author
                  seriesName
                  image1
                  image2
                  body
                  image1_description
                  image2_description
                  profile
                  audio
                }
              }
            }
          }
        `,
      })
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
const GetVidyaPrabhaadham = () => {
  return new Promise(async (resolve, reject) => {
    client
      .query({
        query: gql`
          query {
            vidyaprabhaadhams(
              sort: "id:desc"
              pagination: { start: 0, limit: 30 }
            ) {
              data {
                attributes {
                  Author
                  title
                  Body
                  image1
                  image2
                  profile
                  image1_description
                  image2_description
                  image3_description
                }
              }
            }
          }
        `,
      })
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
const GetNjayarPrabhaadham = () => {
  return new Promise(async (resolve, reject) => {
    client
      .query({
        query: gql`
          query {
            njayarprabhaadhams(
              sort: "id:desc"
              pagination: { start: 0, limit: 30 }
            ) {
              data {
                attributes {
                  Author
                  title
                  Body
                  image1
                  image2
                  profile
                  image1_description
                }
              }
            }
          }
        `,
      })
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const BannerImage = () => {
  return new Promise(async (resolve, reject) => {
    client
      .query({
        query: gql`
          query {
            banners(sort: "id:desc", pagination: { start: 0, limit: 1 }) {
              data {
                attributes {
                  banner_image
                }
              }
            }
          }
        `,
      })
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const GetNewsDetails = (id: any) => {
  return new Promise(async (resolve, reject) => {
    client
      .query({
        query: gql`
        query {
          allNews(filters:{ id: { eq: "${id}" }}) {
            data {
              id
              attributes {
                head
                audio
                title
                body
                image
                image2
                permalink
                author_name
                image1_description
                social_image
                image2_description
                createdAt
                categories {
                  data {
                    id
                    attributes {
                      category
                    }
                  }
                }
                tags{
                  data{
                    id
                    attributes{
                      name
                    }
                  }
                }
              }
            }
          }
        }             
        `,
      })
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const GetHighPriority = () => {
  return new Promise(async (resolve, reject) => {
    client
      .query({
        query: gql`
          query {
            allNews(
              filters: { isHighPriority: { eq: true } }
              sort: "id:desc"
            ) {
              data {
                id
                attributes {
                  isHighPriority
                  head
                  audio
                  title
                  image
                  image2
                  permalink
                  image1_description
                  social_image
                  image2_description
                  createdAt
                  categories {
                    data {
                      id
                      attributes {
                        category
                      }
                    }
                  }
                  tags {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const GetSecondLeads = () => {
  return new Promise(async (resolve, reject) => {
    client
      .query({
        query: gql`
          query {
            allNews(filters: { isSecondLeads: { eq: true } }, sort: "id:desc") {
              data {
                id
                attributes {
                  isSecondLeads
                  head
                  audio
                  title
                  image
                  image2
                  permalink
                  image1_description
                  social_image
                  image2_description
                  createdAt
                  categories {
                    data {
                      id
                      attributes {
                        category
                      }
                    }
                  }
                  tags {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
const GET = async (url: any) => {
  return new Promise(async (resolve, reject) => {
    fetch(API.BASE_URL + url, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const POST = async (url: any, body: any) => {
  return new Promise(async (resolve, reject) => {
    fetch(API.BASE_URL + url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const PUT = async (url: any, body: any) => {
  return new Promise(async (resolve, reject) => {
    fetch(API.BASE_URL + url, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {
  AllNews,
  EditorialGET,
  GetNewsDetails,
  POST,
  PUT,
  GET,
  BannerImage,
  GetVidyaPrabhaadham,
  GetNjayarPrabhaadham,
  GetHighPriority,
  GetSecondLeads,
};
