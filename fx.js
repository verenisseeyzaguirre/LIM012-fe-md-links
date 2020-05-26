const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch'); // previamente instalar npm install node-fetch --save
// la ruta es absoluta?
const pathAbsolute = (routePath) => path.isAbsolute(routePath); // es una expression xq es una linea
// retorna la ruta absoluta , es una expression
const getAbsolute = (routePath) => (pathAbsolute(routePath) ? routePath : path.resolve(routePath));
// es un archivo?
const isFile = (routePath) => fs.statSync(routePath).isFile();
// extension del archivo
const fileExtension = (routePath) => path.extname(routePath);
// contenido del directorio en array
const directoryContent = (routePath) => fs.readdirSync(routePath);
// retorna las rutas dentro de un array solo con archivos .md
const filesMD = (routePath) => {
  let arrayFilesMD = [];
  const absolutePath = getAbsolute(routePath);
  if (isFile(absolutePath)) {
    if (fileExtension(absolutePath) === '.md') arrayFilesMD.push(absolutePath);
  } else {
    directoryContent(routePath).forEach((element) => {
      const elementRoute = path.join(absolutePath, element);
      const directoryFilesMD = filesMD(elementRoute); // recursivo
      arrayFilesMD = arrayFilesMD.concat(directoryFilesMD);
    });
  }
  return arrayFilesMD; // statement if-else es una sentencia
};

// lee el path
const readDocumentMD = (document) => fs.readFileSync(document, 'utf-8');

//  extrae links de los archivos .md, luego se almacena en un array de objetos
// (con las 3 propiedades de los links)
const getLinks = (routePath) => {
  const arrayLinks = [];
  const renderer = new marked.Renderer();
  filesMD(routePath).forEach((file) => {
    renderer.link = (href, title, text) => {
      const objLink = {
        href,
        text,
        file,
      };
      arrayLinks.push(objLink);
    };
    marked(readDocumentMD(file), { renderer });// averiguar
  });
  return arrayLinks;
};


// consultar por los estados de los links, returna un objeto con 5 atributos
const isValidated = (route) => {
  const allLinks = getLinks(route);
  const linkValidated = [];
  let message;
  allLinks.forEach((element) => {
    linkValidated.push(
      fetch(element.href)
        .then((reply) => {
          if (reply.status >= 200 && reply.status < 400) message = 'ok';
          if (reply.status >= 400) message = 'fail';
          const object = {
            href: element.href,
            text: element.text,
            file: element.file,
            status: reply.status,
            ok: message,
          };
          return object;
        }),
    );
  });
  return Promise.all(linkValidated);
};

module.exports = {
  pathAbsolute,
  getAbsolute,
  isFile,
  fileExtension,
  directoryContent,
  filesMD,
  readDocumentMD,
  getLinks,
  isValidated,
};
