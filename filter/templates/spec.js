describe('<%= name %>', function() {

	beforeEach(module('<%= appname %>'));

	xit('should have tests', inject(function($filter) {

    var filter = $filter('<%= name %>');

		expect(filter('input')).to.equal('filter result');

	}));

});