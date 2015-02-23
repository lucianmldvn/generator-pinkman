describe('<%= name %>', function () {
  var <%= name %>;

  beforeEach(function () {
    module('<%= appname %>');
    inject(function (_<%= name %>_) {
      <%= name %> = _<%= name %>_;
    });
  });

  xit('can be instantiated', function () {
    expect(new <%= name %>()).to.be.instanceof(<%= name %>);
  });

});
