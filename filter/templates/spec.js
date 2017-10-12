describe('<%= _.camelize(name) %>', function () {

    var filter;

    beforeEach(function () {
        module('<%= appname %>');
        inject(function ($filter) {
            filter = $filter('<%= _.camelize(name) %>');
        });
    });

    xit('should have tests', function () {
        expect(filter('input')).to.equal('filter result');
    });

});
