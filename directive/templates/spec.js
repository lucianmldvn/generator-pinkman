describe('<%= _.camelize(name) %>', function () {

    var $compile, $templateCache, outerScope, scope, element;

    beforeEach(function () {
        module('<%= appname %>');
        inject(function ($rootScope, _$compile_, _$templateCache_) {
            outerScope = $rootScope.$new();
            $compile = _$compile_;
            $templateCache = _$templateCache_;
        });

        $templateCache.put('directive/<%= _.trim(_.dasherize(name), '-') %>/<%= _.trim(_.dasherize(name), '-') %>.html', '<div></div>');
        element = $compile('<<%= _.camelize(name) %>></<%= _.camelize(name) %>>')(outerScope);
        outerScope.$digest();
        scope = element.isolateScope();
    });

    it('should have tests');

});
