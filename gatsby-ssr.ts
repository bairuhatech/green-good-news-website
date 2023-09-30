const React = require("react")
const { Helmet } = require("react-helmet")

export const onRenderBody = ({
    setHeadComponents,
    setHtmlAttributes,
    setBodyAttributes,
  }) => {
    const helmet = Helmet.renderStatic()
    setHtmlAttributes(helmet.htmlAttributes.toComponent())
    setBodyAttributes(helmet.bodyAttributes.toComponent())
    setHeadComponents([
      helmet.title.toComponent(),
      helmet.base.toComponent(),
      helmet.meta.toComponent(),
      helmet.link.toComponent(),
      helmet.noscript.toComponent(),
      helmet.script.toComponent(),
      helmet.style.toComponent(),
    ])
  }
  
  export const onPreRenderHTML = ({
    getHeadComponents,
    replaceHeadComponents,
  }) => {
    const headComponents = getHeadComponents()
    const order = ["title", "base", "meta", "link", "noscript", "script", "style"]
  
    const sortedHeadComponents = headComponents
      .slice(0)
      .flat()
      .sort((x:any, y:any) => {
        return order.indexOf(x.type) - order.indexOf(y.type)
      })
  
    replaceHeadComponents(sortedHeadComponents)
  }
// var React = require("react");

// // Hack, to reorder the helmet components as first in <head> tag
// exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
//     /**
//      * @type {any[]} headComponents
//      */
//     const headComponents:any = getHeadComponents();

//     headComponents.sort((a:any, b:any) => {
//         if (a.props && a.props["data-react-helmet"]) {
//             return 0;
//         }
//         return 1;
//     });
//     replaceHeadComponents(headComponents);
// };