describe('<%= _.camelCase(name) %>', function () {

    var filter;

    beforeEach(function () {
        module('<%= appname %>');
        inject(function ($filter) {
            filter = $filter('<%= _.camelCase(name) %>');
        });
    });

    xit('should have tests', function () {
        expect(filter('input')).to.equal('filter result');
    });

});
