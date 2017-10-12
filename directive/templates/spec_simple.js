describe('<%= _.camelize(name) %>', function () {

    var $compile, outerScope, scope;

    beforeEach(function () {
        module('<%= appname %>');
        inject(function ($rootScope, _$compile_) {
            outerScope = $rootScope.$new();
            $compile = _$compile_;
        });
    });

    xit('should have tests', function () {
        /*
          To test your directive, you need to create some html that would use your directive,
          send that through compile() then compare the results.

          var element = $compile('<div <%= name %>>hi</div>')(outerScope);
          outerScope.$digest();
          scope = element.isolateScope();
          expect(element.text()).to.equal('hello, world');
        */
    });

});
