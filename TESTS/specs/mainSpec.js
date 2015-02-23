this.context = this.describe;

describe('THELONDONENCOUNTER.Main', function() {
	var spyEvent;
  var TLE;

	beforeEach(function(){
		TLE = new THELONDONENCOUNTER.Main();
	});

	context('attachClick()', function() {

  		it("should attach the click", function() {
  			// TLE.attachClick( ".home_link" , "#home" );
  			// spyEvent = spyOnEvent($('.home_link'), 'click');
        expect($('.home_link')[0]).toBeInDOM()
    		// $('.home_link').trigger( "click" );
    		// expect('click').toHaveBeenTriggeredOn($('.home_link'));
    		// expect(spyEvent).toHaveBeenTriggered();
  		});

  		// it("should attach the click", function() {
  		// 	main.attachClick( ".home_link" , "#home" );
  		// 	spyEvent = spyOnEvent('.home_link', 'click');
    // 		$('.home_link').trigger( "click" );
    
    // 		expect('click').toHaveBeenTriggeredOn('.home_link');
    // 		expect(spyEvent).toHaveBeenTriggered();

    // 		// main.attachClick( ".home_link" , "#home" );
    // 		expect($('#container')).toHaveClass('wait');
  		// });
  	});
});