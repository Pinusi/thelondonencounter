if( !THELONDONENCOUNTER ) { var THELONDONENCOUNTER = {}; }

THELONDONENCOUNTER.Main = function()
{
	this.setListeners();
};

THELONDONENCOUNTER.Main.prototype.setListeners = function()
{
	$(document).foundation();

	//Mobile fixes
	var md = new MobileDetect(window.navigator.userAgent);
    if (!md.mobile()) {
		$(".section").addClass("noMobile");
	}

	//Menu Clicks
	// attachClick( ".logo" , "#home" );
	this.attachClick( ".home_link" , "#home" );
	this.attachClick( ".programme_link" , "#programme" );
	this.attachClick( ".talks_link" , "#talks" );
	this.attachClick( ".exibitions_link" , "#exibitions" );
	this.attachClick( ".location_link" , "#location" );
	this.attachClick( ".sponsors_link" , "#sponsors" );

	//Mobile Menu
	$(".sandwich").bind("click", function() {
		$(".header_dropdown").toggleClass('showmenu');
		return false; //Prevent Default and event bubbling.
	});

	$(".close").bind("click", function() {
		$(".header_dropdown").toggleClass('showmenu');
		return false; //Prevent Default and event bubbling.
	});

	this.attachMore();
	this.attachLess();

	this.attachSubmenu( ".editions_link",".editions_submenu" );
};

THELONDONENCOUNTER.Main.prototype.attachClick = function( source_class, target_id )
{
	$( source_class ).bind("click", function() 
	{
		// document.location.href = "/";
		if( document.location.href === "/" ){
			document.location.href = "/";
			setTimeout(function(){
				$(window).scrollTop($( target_id ).offset().top);
			}, 0);
		}
		else{
			$(window).scrollTop($( target_id ).offset().top);
		}

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
};

THELONDONENCOUNTER.Main.prototype.attachMore = function()
{
	$( '.relator_desc_more_butt' ).bind("click", function() 
	{
		$(this).next().show();
		$(this).prev().hide();
		$(this).hide();
		$(this).parent().find('.relator_desc_more_less').show();
	});
};

THELONDONENCOUNTER.Main.prototype.attachLess = function()
{
	$( '.relator_desc_more_less' ).bind("click", function() 
	{
		$(this).prev().hide();
		$(this).hide();
		$(this).parent().find('.relator_desc_more_butt').show();
		$(this).parent().find('.relator_desc_more_butt').prev().show();
	});
};

THELONDONENCOUNTER.Main.prototype.attachSubmenu = function( source_class, target_sub )
{
	$( source_class ).bind("click", function() 
	{
		if($( target_sub ).is(":visible") ){
			$( target_sub ).toggleClass('showmenu');
		}

		return false; //Prevent Default and event bubbling.
	});

	var clickinside = $( target_sub );

	$(document).on('click', function(e) {
		if (!clickinside.is(e.target) && clickinside.has(e.target).length === 0) 
		{
			$( target_sub ).removeClass('showmenu');
		}
	});
};

/*
Initialise the main object
*/
$(document).ready(function($) {
	window.THELONDONENCOUNTER = new THELONDONENCOUNTER.Main();
});