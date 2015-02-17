if( !THELONDONENCOUNTER ) { var THELONDONENCOUNTER = {}; }

/**
 * @Constructor for the widget controller singleton
 */
THELONDONENCOUNTER.WidgetController = function()
{
    that = this;

    this.widgets = [];

    // Singleton access
    if( THELONDONENCOUNTER.WidgetController.prototype._singletonInstance )
    {
        return THELONDONENCOUNTER.WidgetController.prototype._singletonInstance;
    }
    THELONDONENCOUNTER.WidgetController.prototype._singletonInstance = this;
};

/**
 * Initialises a given widget constructor with params based on data attributes of
 * the given container
 *
 * @param  {Object|String} widget  jQuery/Dom Object/Selector string for widget container
 * @param  {Function} constructor Constructor function for the given widget
 */
THELONDONENCOUNTER.WidgetController.prototype.initialise = function( widget, constructor )
{
    var that = this,
        $widget = $( widget );

    try
    {
        // var config = {};
        // $.each( $widget.get(0).attributes, function( i, attr )
        // {
        //     var name = attr.name;
        //     var value = attr.value;

        //     config[ name ] = value;
        // } );

        that.widgets.push( new constructor( $widget ) );
    }
    catch( err )
    {
        // if any widget fails
        console.log( err );
    }
};

/**
 * Inline function for initialising the widget controller
 */
$( function()
{
    if( !window.TLEWidgetController )
    {
        window.TLE.WidgetController = new THELONDONENCOUNTER.WidgetController();
    }
} );