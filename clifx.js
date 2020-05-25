#!/usr/bin/env node
const mdLinks = require('./mdLinks');

const printObject = (arrayObject) => {
  let print = '';
  arrayObject.forEach((object) => {
    print += `
      ${object.file} ${object.href} ${object.text}`;
  });
  return print;
};

const printObjectValidated = (arrayObject) => {
  let print = '';
  arrayObject.forEach((object) => {
    print += `
    ${object.file} ${object.href} ${object.ok} ${object.status} ${object.text}`;
  });
  return print;
};

const printStatsOption = (arrayObject) => {
  const allHref = arrayObject.map((object) => object.href);
  const uniqueHref = new Set(allHref);
  return `Total: ${arrayObject.length}\nUnique: ${uniqueHref.size}`;
};

const printStatsValidatedOption = (arrayObject) => {
  const resultStatsOption = printStatsOption(arrayObject);
  const arrayAllOk = arrayObject.filter((object) => object.ok !== 'ok');
  return `${resultStatsOption}\nBroken: ${arrayAllOk.length}`;
};

const validate = (path, options, extra) => {
  if (options === '--validate') {
    if (extra === '--stats') {
      return mdLinks(path, { validate: true })
        .then((arrayObj) => printStatsValidatedOption(arrayObj));
    }
    return mdLinks(path, { validate: true }).then((arrayObj) => printObjectValidated(arrayObj));
  }
  if (options === '--stats') {
    if (extra === '--validate') {
      return mdLinks(path, { validate: true })
        .then((arrayObj) => printStatsValidatedOption(arrayObj));
    }
    return mdLinks(path, { validate: true }).then((arrayObj) => printStatsOption(arrayObj));
  }
  return mdLinks(path, { validate: true }).then((arrayObj) => printObject(arrayObj));
};

// const pathName =
// 'C:/Users/REET-PC/Documents/Claudia/laboratoria/LIM012-fe-md-links/prueba/prueba.md';
const pathName = process.argv[2];
const options = process.argv[3];
const extra = process.argv[4];
// validate(pathName, options);

const { log } = console;
validate(pathName, options, extra).then((response) => log(response));

module.exports = {
  printObject,
  validate,
};
