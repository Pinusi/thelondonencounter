function initialize () {
	$(document).foundation();

	var md = new MobileDetect(window.navigator.userAgent);
    if (!md.mobile()) {
		$(".section").addClass("noMobile");
	}

	attachClick( ".logo" , "#home" );
	attachClick( ".home_link" , "#home" );
	attachClick( ".programme_link" , "#programme" );
	attachClick( ".talks_link" , "#talks" );
	attachClick( ".exibitions_link" , "#exibitions" );
	attachClick( ".location_link" , "#location" );
	attachClick( ".sponsors_link" , "#sponsors" );

	$(".sandwich").bind("click", function() {
		$(".header_dropdown").toggleClass('showmenu');
		return false; //Prevent Default and event bubbling.
	});

	$(".close").bind("click", function() {
		$(".header_dropdown").toggleClass('showmenu');
		return false; //Prevent Default and event bubbling.
	});

	attachMore();
	attachLess();
}

function attachClick( source_class, target_id ){
	$( source_class ).bind("click", function() 
	{
		$(window).scrollTop($( target_id ).offset().top);

		if($(".header_dropdown").is(":visible") ){
			$(".header_dropdown").toggleClass('showmenu');
		}

		return false; //Prevent Default and event bubbling.
	});

	$( source_class ).mousedown(function()
	{
		$( this ).find('a').addClass('click');
	});
		
	$( source_class ).mouseup(function()
	{
		$( this ).find('a').removeClass('click');
	});
}

function attachMore(){
	$( '.relator_desc_more_butt' ).bind("click", function() 
	{
		$(this).next().show();
		$(this).prev().hide();
		$(this).hide();
		$(this).parent().find('.relator_desc_more_less').show();
	});
}

function attachLess(){
	$( '.relator_desc_more_less' ).bind("click", function() 
	{
		$(this).prev().hide();
		$(this).hide();
		$(this).parent().find('.relator_desc_more_butt').show();
		$(this).parent().find('.relator_desc_more_butt').prev().show();
	});
}