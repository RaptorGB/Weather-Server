import sinon from 'sinon';
import chai from 'chai';
const expect = chai.expect;
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
chai.use(dirtyChai).use(sinonChai);
global.sinon = sinon;
global.expect = expect;
