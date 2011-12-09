var Class = require( '/scripts/libraries/ptclass' ),
  Tip = require( 'ui/Tip' ),
  BelowTip;

BelowTip = Class.create( Tip, ( function () {

   return {
     initialize: function ( $super, $element, settings ) {

       var defaults = {
         placement: 'below'
       };

       _.defaults( settings, defaults );

       $super( $element, settings );
     }
  };

}() ));

//Export to Common JS Loader
if( module ) {
  if( typeof module.setExports === 'function' ){
    module.setExports( RightTip );
  } else if( module.exports ) {
   module.exports = LeftTip; 
  }
}
