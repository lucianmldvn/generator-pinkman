describe('<%= name %>', function () {

  var <%= name %>;

  beforeEach(function () {
    module('<%= appname %>');
    inject(function (_<%= name %>_) {
      <%= name %> = _<%= name %>_;
    });
  });

  xit('should have tests', function () {
    //expect(<%= name %>.doSomething()).to.equal('something');
  });

});