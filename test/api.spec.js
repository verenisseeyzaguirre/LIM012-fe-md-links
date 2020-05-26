const fetchMock = require('../__mocks__/node-fetch.js');

const {
  pathAbsolute,
  getAbsolute,
  isFile,
  fileExtension,
  directoryContent,
  filesMD,
  readDocumentMD,
  getLinks,
  isValidated,
} = require('../fx');

const pathAbs = 'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba';
const pathRel = './prueba';
describe('pathAbsolute()', () => {
  it('Debería retornar false si la ruta es relativa', () => {
    expect(pathAbsolute(pathRel)).toBe(false);
  });

  it('Debería retornar true si la ruta es absoluta', () => {
    expect(pathAbsolute(pathAbs)).toBe(true);
  });
});

describe('getAbsolute()', () => {
  it('Debería retornar una ruta absoluta al pasarle una ruta relativa', () => {
    expect(getAbsolute(pathRel)).toBe(pathAbs);
  });
  it('Debería retornar una ruta absoluta al pasarle una ruta absoluta', () => {
    expect(getAbsolute(pathAbs)).toBe(pathAbs);
  });
});

const dirPath = 'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba';
const filePath = 'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba\\README.md';
describe('isFile()', () => {
  it('Debería retornar true si es un archivo', () => {
    expect(isFile(filePath)).toBe(true);
  });

  it('Debería retornar false si es un directorio', () => {
    expect(isFile(dirPath)).toBe(false);
  });
});

describe('fileExtension()', () => {
  it('Debería retornar la extensión del archivo al encontrar el primer punto', () => {
    expect(fileExtension(filePath)).toBe('.md');
  });

  it('Debería retornar una cadena vacía al no encontrar una extension', () => {
    expect(fileExtension(dirPath)).toBe('');
  });
});

const arrayOutput = ['carpeta1', 'prueba.md', 'README.md'];
describe('directoryContent()', () => {
  it('Debería retornar un array con el contenido del directorio', () => {
    expect(directoryContent(pathRel)).toEqual(arrayOutput);
  });
});

const arrayOutputFilesMD = [
  'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba\\carpeta1\\carpeta1_prueba.md',
  'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba\\carpeta1\\carpeta2\\carpeta2_prueba.md',
  'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba\\prueba.md',
  'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba\\README.md',
];
const pathWithoutFilesMD = 'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba\\carpeta1\\carpeta3';
describe('filesMD()', () => {
  it('Debería retornar un array de rutas con archivos .md', () => {
    expect(filesMD(pathRel)).toEqual(arrayOutputFilesMD);
  });

  it('Debería retornar un array vacío al no encontrar archivos .md', () => {
    expect(filesMD(pathWithoutFilesMD)).toEqual([]);
  });
});

const readFile = 'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba\\carpeta1\\carpeta2\\carpeta2_prueba.md';
const contentFileMD = 'Imprimiendo el contenido del archivo';
describe('readDocumentMD()', () => {
  it('Debería retornar el contenido del archivo', () => {
    expect(readDocumentMD(readFile)).toEqual(contentFileMD);
  });
});

const objectLinkAtrib = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba\\carpeta1\\carpeta1_prueba.md',
  },
  {
    href: 'http://google.com.pe/str',
    text: 'Error de Google',
    file: 'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba\\carpeta1\\carpeta1_prueba.md',
  }];
describe('getLinks()', () => {
  it('Debería retornar un array de objetos con 3 atributos', () => {
    expect(getLinks('./prueba/carpeta1/carpeta1_prueba.md')).toEqual(objectLinkAtrib);
  });
});

const objectLinkAtribValidated = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba\\carpeta1\\carpeta1_prueba.md',
    status: 200,
    ok: 'ok',
  },
  {
    href: 'http://google.com.pe/str',
    text: 'Error de Google',
    file: 'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba\\carpeta1\\carpeta1_prueba.md',
    status: 404,
    ok: 'fail',
  }];
describe('isValidated()', () => {
  fetchMock
    .mock('https://es.wikipedia.org/wiki/Markdown', 200)
    .mock('http://google.com.pe/str', 404);
  it('Debería retornar un array de objetos con 5 propiedades:file, href, text, status y ok', (done) => {
    isValidated('./prueba/carpeta1/carpeta1_prueba.md').then((element) => {
      expect(element).toEqual(objectLinkAtribValidated);
      done();
    });
  });
});
