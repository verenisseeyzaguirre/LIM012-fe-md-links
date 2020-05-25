const funcioncli = require('../clifx');

const pathName = 'C:/Users/REET-PC/Documents/Claudia/laboratoria/LIM012-fe-md-links/prueba/prueba.md';
const validateResponse = 'algo';
describe('Function cliOptions', () => {
  it('Debería imprimir 5 propiedades al ingresar la opción --validate', (done) => {
    funcioncli.validate(pathName, '--validate').then((elem) => {
      expect(elem).toBe(validateResponse);
      done();
    });
  });
});
