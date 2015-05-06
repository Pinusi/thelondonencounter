this.context = this.describe;

//Set HTML for tests
jasmine.getFixtures().fixturesPath = '/base/TESTS/fixtures';

//PhantomJS doesn't support all functions
//CLICK
function mouseclick( element ) {
    // create a mouse click event
    var event = document.createEvent( 'MouseEvents' );
    event.initMouseEvent( 'click', true, true, window, 1, 0, 0 );
 
    // send click to element
    element.dispatchEvent( event );
}

describe('THELONDONENCOUNTER.Main', function() {
  var TLE;
  loadFixtures('fixtures.html');

	beforeEach(function(){
		TLE = new THELONDONENCOUNTER.Main();
	});

	context('attachClick()', function() {
    beforeEach(function(){
      TLE.attachClick( ".exibitions_link" , "#exibitions" );
      spiedEvent = spyOnEvent('.exibitions_link', 'click');
      mouseclick( $('.exibitions_link')[0] );
    });

		it("should attach the click", function() {
      spyOnEvent('.exibitions_link', 'click');
      mouseclick( $('.exibitions_link')[0] );
      expect(spiedEvent).toHaveBeenTriggeredOn('.exibitions_link');
		});

    it("should attach the click", function() {
      if($(".header_dropdown").is(":visible") ){
        $(".header_dropdown").toggleClass('showmenu');
      }
    });
	});
});