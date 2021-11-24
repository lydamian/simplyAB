/* describe */

const chai = require('chai');
const { expect } = chai;
const TEST_USER_NAMESPACE = 'e2e-test-spec';

describe('smoke test', () => {
  it('checks equality', async () => {
    expect(true).to.be.true;
  });
});
