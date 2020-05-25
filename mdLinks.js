const mainFunctions = require('./fx');

const mdLinks = (path, options) => {
  if (options.validate === true) {
    return mainFunctions.isValidated(path);
  }
  const arrayObjects = new Promise((resolve) => {
    resolve(mainFunctions.getLinks(path));
  });
  return arrayObjects;
};
/*
const pathName =
// 'C:/Users/REET-PC/Documents/Claudia/laboratoria/LIM012-fe-md-links/prueba/prueba.md'
mdLinks(pathName, { validate: false }).then((res) => console.log(res));
*/

module.exports = mdLinks;
