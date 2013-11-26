describe('<%= ctrlname %>', function() {

	beforeEach(module('<%= appname %>'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('<%= ctrlname %>', {$scope: scope});
    }));	

	xit('should have tests', inject(function() {
		
	}));

});