require('mochawait');
const userProxy = require('../../proxy/user');

describe('test/proxy/user.test.js', function () {
    describe('#getUserByLoginName()', function () {
        // this.slow(1);
        // this.timeout(100);'
        // it.skip(...)
        // it.only(...)

        it('should return an user and user.loginName==admin', async() => {
            const user = await userProxy.getUserByLoginName('admin');
            user.loginName.should.equal('admin');
        });
    });
});
