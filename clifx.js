const mdLinks = require('./mdLinks');

const printObject = (arrayObject) => {
    arrayObject.forEach((object) => console.log(`${object.file} ${object.href} ${object.ok} ${object.status} ${object.text}`));
}

const printStatsOption = (arrayObject) => {
    const allHref = arrayObject.map((object) => object.href);
    const uniqueHref = new Set(allHref);
    return `Total: ${arrayObject.length}\nUnique: ${uniqueHref.size}`;
};

const printStatsValidateOption = (arrayObject) => {
    const resultStatsOption = printStatsOption(arrayObject);
    const arrayAllOk = arrayObject.filter((object) => object.ok!='ok');
    console.log(`${resultStatsOption}\nBroken: ${arrayAllOk.length}`)
};

const validate = (path, options) => {
    if (options === '--validate') {
        return mdLinks(path, { validate: true }).then((arrayObj) => printStatsOption(arrayObj));
    }
    if(options === '--stats') {
        return mdLinks(path, { validate: true }).then((arrayObj) => printStatsOption(arrayObj));
    }
    if(options === '--stats --validate' || options === '--validate --stats') {
        return mdLinks(path, { validate: true }).then((arrayObj) => printStatsValidateOption(arrayObj));
    }
    if(!options) {
        return mdLinks(path, { validate: true }).then((arrayObj) => printObject(arrayObj));
    }
};

//const pathName = 'C:/Users/REET-PC/Documents/Claudia/laboratoria/LIM012-fe-md-links/prueba/prueba.md'
//validate(pathName, '--validate');
const pathName = process.argv[2];
const options = process.argv[3];
validate(pathName, options);