describe('<%= name %>', function () {

  var <%= name %>;

  beforeEach(function () {
    module('<%= appname %>');
    inject(function (_<%= name %>_) {
      <%= name %> = _<%= name %>_;
    });
  });

  it('can be instantiated', function () {
    expect(new <%= name %>()).to.be.instanceof(<%= name %>);
  });

});