function initialize () {
	$(document).foundation();
	$(".programme_link").bind("click", function() {
		$(window).scrollTop($("#programme").offset().top); 
		return false; //Prevent Default and event bubbling.
	});
	$(".talks_link").bind("click", function() {
		$(window).scrollTop($("#talks").offset().top); 
		return false; //Prevent Default and event bubbling.
	});
	$(".exibitions_link").bind("click", function() {
		$(window).scrollTop($("#exibitions").offset().top); 
		return false; //Prevent Default and event bubbling.
	});
	$(".location_link").bind("click", function() {
		$(window).scrollTop($("#location").offset().top); 
		return false; //Prevent Default and event bubbling.
	});
	$(".sponsors_link").bind("click", function() {
		$(window).scrollTop($("#sponsors").offset().top); 
		return false; //Prevent Default and event bubbling.
	});

	$(".sandwich").bind("click", function() {
		$(".header_dropdown").toggle();
	});
}