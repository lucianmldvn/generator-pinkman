describe('<%= name %>', function() {

  beforeEach(module('<%= appname %>'));

  it('can be instansiated', inject(function(<%= name %>) {

	  expect(new <%= name %>()).to.be.instanceof(<%= name %>);

  }));

});