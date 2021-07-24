/* globals describe,it,beforeEach */
/* eslint-disable import/no-webpack-loader-syntax,import/no-extraneous-dependencies,import/no-unresolved,no-unused-expressions,max-len,no-unused-vars */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import proxyquire from 'proxyquire';

chai.use(sinonChai);

let InputLabelSpy;
let getLabelComponent;

chai.use(sinonChai);

describe('getLabelComponent', () => {
  beforeEach(() => {
    InputLabelSpy = sinon.spy();
    getLabelComponent = proxyquire('./get-label-component', {
      '@material-ui/core/InputLabel': { default: InputLabelSpy }
    }).default;
  });
  it('returns InputLabel by default', () => {
    const LabelComponent = getLabelComponent({ schema: {} });
    expect(LabelComponent.id).to.equal(InputLabelSpy.id);
  });
});
