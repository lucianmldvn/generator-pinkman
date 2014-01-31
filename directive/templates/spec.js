describe('<%= _.classify(name) %>', function () {

  var scope,compile;

  beforeEach(function () {
    module('<%= appname %>');
    inject(function ($rootScope,$compile) {
      scope = $rootScope.$new();
      compile = $compile;
    });
  });

  xit('should have tests', function () {
    /* 
      To test your directive, you need to create some html that would use your directive,
      send that through compile() then compare the results.

      var element = compile('<div mydirective name="name">hi</div>')(scope);
      expect(element.text()).to.equal('hello, world');
    */
  });
  
});