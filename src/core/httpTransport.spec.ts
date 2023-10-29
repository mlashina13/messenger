import { expect } from 'chai'
import sinon from 'sinon'
import { HttpTransport } from './httpTransport';
import constain from './constain';

describe('Проверка HTTP Transport', () => {
  let http: HttpTransport;
  let requestStub: sinon.SinonStub;
  beforeEach(() => {
    http = new HttpTransport('/test');
    requestStub = sinon.stub(http, 'request').resolves();
  })

  afterEach(() => {
    sinon.restore()
  })

  it('Проверка строки параметров в GET запросе, где значения в объекте  строки', async () => {
    await http.get('', { a: '1', b: '2' })
    expect(requestStub.alwaysCalledWithMatch(`${constain.HOST}/test?a=1&b=2`, 'GET')).to.be.true;
  })

  it('Проверка строки параметров в GET запросе, где значения в объекте  числа', async () => {
    await http.get('', { a: 1, b: 2 })
    expect(requestStub.alwaysCalledWithMatch(`${constain.HOST}/test?a=1&b=2`, 'GET')).to.be.true;
  })

  it('Проверка строки параметров в GET запросе, где значения в объекте строки с пробелами', async () => {
    await http.get('', { a: '1+1', b: '2 2' })
    expect(requestStub.alwaysCalledWithMatch(`${constain.HOST}/test?a=1+1&b=2%202`, 'GET')).to.be.true;
  })
  it('Проверка строки параметров в GET запросе, где значения в объекте  массивы', async () => {
    await http.get('', { a: [1, 2, 3] })
    expect(requestStub.alwaysCalledWithMatch(`${constain.HOST}/test?a=1,2,3`, 'GET')).to.be.true;
  })
})
