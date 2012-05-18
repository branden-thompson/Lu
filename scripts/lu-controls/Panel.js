/**
 * A representation of a stateful list
 * @class Panel
 * @constructor
 * @require class
 * @param {HTMLElement} element The HTML element containing this component
 * @param {Object} settings Configuration properties for this instance
 * @version 0.0.1
 */

var Class = require( 'class' ),
  Abstract = require( '/scripts/lu-controls/Abstract' ),
  Panel;

Panel = Class.extend( function (Abstract) {

  //CONSTANTS
  var ACTIVATE_EVENT = 'activate',
    DEACTIVATE_EVENT = 'deactivate',
    ACTIVE_FLAG = 'active';

  //RETURN METHODS OBJECT 
  return {
    /**
     * PTClass constructor 
     * @method initialize
     * @public
     * @param {Object} $element JQuery object for the element wrapped by the component
     * @param {Object} settings Configuration settings
     */    
    init: function ( $element, settings ) {

      // PRIVATE INSTANCE PROPERTIES
      /**
       * Instance of Panel
       * @property Panel
       * @type Object
       * @private
       */  
      var Panel = this,

        /**
         * Default configuration values
         * @property defaults
         * @type Object
         * @private
         * @final
         */
        defaults = {},
        content,
        height,
        $iframe;

      // MIX THE DEFAULTS INTO THE SETTINGS VALUES
      _.defaults( settings, defaults );

      // CALL THE PARENT'S CONSTRUCTOR
      $Abstract.init.call( this, $element, settings );

      content = _.explodeURL( settings.content );

      console.log( content, settings.content, settings, ( content.authority !== undefined ) );

      if( content.authority !== undefined ) {
        $iframe = $( '<iframe>' ).attr( {
          src: settings.content,
          height: settings.height || '100%',
          width: '100%'
        } );
      } else {
        content = settings.content;
      }

      Panel.activate = function() {
        $element.addClass( ACTIVE_FLAG );
        console.log( 'IFRAME', $iframe );
        if( $iframe ) {
          $element.append( $iframe );
        } else {
          $element.append( $content );
        }
        Panel.trigger( 'activated', $element );
      };

      Panel.deactivate = function() {
        $element.removeClass( ACTIVE_FLAG );
        Panel.trigger( 'deactivated', $element );
      };

      Panel.on( ACTIVATE_EVENT, function( event ) {
        event.stopPropagation();
        Panel.activate();
      } );
      Panel.on( DEACTIVATE_EVENT, function( event ) {
        event.stopPropagation();
        Panel.deactivate();
      } );

    }
  };

});


//Export to Common JS Loader
if( typeof module !== 'undefined' ) {
  if( typeof module.setExports === 'function' ){
    module.setExports( Panel );
  } else if( module.exports ) {
   module.exports = Panel; 
  }
}
