describe('<%= name %>', function () {
  var $compile;
  var $templateCache;
  var outerScope;
  var scope;
  var element;

  beforeEach(function () {
    module('<%= appname %>');
    inject(function ($rootScope, _$compile_, _$templateCache_) {
      outerScope = $rootScope.$new();
      $compile = _$compile_;
      $templateCache = _$templateCache_;
    });

    $templateCache.put('directive/<%= name %>/<%= name %>.html', '<div></div>');
    element = $compile('<<%= name %>></<%= name %>>')(outerScope);
    outerScope.$digest();
    scope = element.isolateScope();
  });

  it('should have tests');

});
