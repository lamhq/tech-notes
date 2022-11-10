### scalar
expect(2).to.equal(2);
expect(2).to.not.equal(1);

### string

### object
expect({a: 1}).to.have.property('b');
expect({a: 1}).to.not.have.property('b');


### array
expect([1, 2]).to.be.an('array').that.does.not.include(3);


### advanced
expect(function () {}).to.not.throw();