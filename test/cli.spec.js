const funcioncli = require('../clifx');

const pathName = 'C:\\Users\\REET-PC\\Documents\\Claudia\\laboratoria\\LIM012-fe-md-links\\prueba\\carpeta1\\carpeta1_prueba.md';
// 'C:/Users/REET-PC/Documents/Claudia/laboratoria/LIM012-fe-md-links/prueba/prueba.md';
const validateResponse = 'algo';
describe('validate()', () => {
  it('Debe imprimir 5 atributos al ingresar la opción --validate', (done) => {
    funcioncli.validate(pathName, '--validate').then((elem) => {
      expect(elem).toBe(validateResponse);
      done();
    });
  });
});
