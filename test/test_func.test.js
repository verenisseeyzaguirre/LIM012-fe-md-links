/*
import { validPath, routeType, getDirectoryItems, absoluteFile, mdFile, mdLinks } from '../dist/mdLinks.js';
*/

const pathNoValid = './som/example.md';
const filePath = './some/example.md';
const directoryPath = './some/';
const items = ['./some/example.md','./some/example.doc','./some/anotherSome','./some/otherSome' ];
const returnNoMd = 'No es un archivo markdown'; //ya no

const returnWithoutOptions = [
    {
      href: 'http://algo.com/2/3/',
      text: 'Link a algo',
      file: './some/example.md',
    },
    {
      href: 'https://otra-cosa.net/algun-doc.html',
      text: 'algún doc',
      file: './some/example.md',
    },
    {
      href: 'http://google.com/',
      text: 'Google',
      file: './some/example.md',
    },
  ];

  const returnValidate = [
    {
      href: 'http://algo.com/2/3/',
      text: 'Link a algo',
      file: './some/example.md',
      status: 200,
      ok: 'ok',
    },
    {
      href: 'https://otra-cosa.net/algun-doc.html',
      text: 'algún doc',
      file: './some/example.md',
      status: 404,
      ok: 'fail',
    },
    {
      href: 'http://google.com/',
      text: 'Google',
      file: './some/example.md',
      status: 301,
      ok: 'ok',
    },
  ];

describe('md-links', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });


  it('path valido?', () => {
    expect(validPath(filePath)).toBeTruthy();
  });
  it('path valido?', () => {
    expect(validPath(pathNoValid)).toBeFalsy();
  });


  it('path es archivo?', () => {
    expect(routeType(directoryPath)).toBeFalsy();
  });
  it('path es archivo?', () => {
    expect(routeType(filePath)).toBeTruthy();
  });


// funcion recursiva, cuando se obtiene un directorio por el path
it('obtener elementos de directorio', () => {
    expect(getDirectoryItems(directoryPath)).resolves.toEqual(items);
  });

  it('path es absoluta', () => {
    expect(absoluteFile('/some/example.md')).toBeTruthy();
  });
  it('path es absoluta', () => {
    expect(absoluteFile('../example.md')).toBe('/home/users/some/example.md');
  });


  it('resuelve si es un archivo markdown', () => {
    expect(mdFile('./some/example.doc')).toBeNull();
  });
  it('resuelve si es un archivo markdown', () => {
    expect(mdFile('./some/example.md')).toBeTruthy();
  });



  it('retorna el array de objetos con 3 atributos si el archivo markdown contiente links', () => {
    expect(mdLinks('./some/example1.md')).toBeNull();
  });
  it('retorna el array de objetos con 3 atributos si el archivo markdown contiente links', () => {
    expect(mdLinks('./some/example.md')).toEqual(returnWithoutOptions);
  });


  it('retorna el array de objetos con 5 atributos, si el archivo markdown contiente links', () => {
    expect(mdLinks('./some/example.md', { validate:true })).toEqual(returnValidate);
  });
  
});
