(function(global) {
  'use strict';

  /**
   * True if `element` has class `className`.
   *
   * @param {object} element - the element to check the class name of
   * @param {string} className - the class name to check
   *
   * @returns True if `element` has class `className`.
   */
  function _hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  }

  /**
   * Extend obj1 with each key in obj2, overriding default values in obj1 with
   * values in obj2
   *
   * @param {object} obj1 - The object to extend.
   * @param {object} obj2 - The overrides to apply onto obj1.
   */
  function _extend(obj1, obj2) {
    for (var i in obj2) {
      if (obj2.hasOwnProperty(i)) {
        obj1[i] = obj2[i];
      }
    }
  }

  /**
   * This class
   */
  function Nav(options) {
    this.settings = {

      /**
       * Type: string
       * Default: 'nav'
       * Description: The CSS ID of navbar.
       */
      navId: 'nav',

      /**
       * Type: string
       * Default: 'nav'
       * Description: The prefix associated with this library that should be
       *   prepended to class names within the navbar, and open states on the
       *   navbar and body.
       */
      classPrefix: 'nav',

      /**
       * Type: function
       * Default: function(resolve, reject) { resolve(); }
       * Description: Called before the navbar is opened.
       *
       * @param {function} resolve - call this to open the navbar.
       * @param {function} reject - call this with any arbitrary `errorData`
       *   attribute, to call `onOpenError`.
       */
      beforeOpen: function(resolve, reject) { resolve(); },

      /**
       * Type: function
       * Default: function() { }
       * Description: Called after the navbar is opened.
       */
      afterOpen: function() {},

      /**
       * Type: function
       * Default: function(errorData) { }
       * Description: Called if there was an error opening the navbar.
       *
       * @param {object} errorData - arbitrary error data passed from calling
       *   the `reject` function in `beforeOpen`.
       */
      onOpenError: function(errorData) {},

      /**
       * Type: function
       * Default: function(resolve, reject) { resolve(); }
       * Description: Called before the navbar is closed.
       *
       * @param {function} resolve - call this to close the navbar.
       * @param {function} reject - call this with any arbitrary `errorData`
       *   attribute, to call `onCloseError`.
       */
      beforeClose: function(resolve, reject) { resolve(); },

      /**
       * Type: function
       * Default: function() { }
       * Description: Called after the navbar is closed.
       */
      afterClose: function() {},

      /**
       * Type: function
       * Default: function(errorData) { }
       * Description: Called if there was an error closing the navbar.
       */
      onCloseError: function(errorData) {},
    };

    // We extend the default settings with the provided overrides.
    _extend(this.settings, options || {});

    this.nav = document.getElementById(this.settings.navId);
    this.navToggle = this.nav.getElementByClassName(this.settings.classPrefix + '-toggle');
    this.body = document.getElementsByTagName('body')[0];
  }

  /**
   *
   */
  Nav.prototype._close = function() {
    this.settings.beforeClose(
      function resolve() {
        this.nav.className = this.nav.className.replace(' ' + this.settings.classPrefix + '-open', '');
        this.body.className = this.body.className.replace(' ' + this.settings.classPrefix + '-open', '');
        this.settings.afterClose();
      }.bind(this),
      function reject(errorData) {
        this.settings.onCloseError(errorData);
      }.bind(this)
    );
  };

  /**
   * Opens the nav toggle
   */
  Nav.prototype._open = function() {
    this.settings.beforeOpen(
      function resolve() {
        this.nav.className += ' ' + this.settings.classPrefix + '-open';
        this.body.className += ' ' + this.settings.classPrefix + '-open';
        this.settings.afterOpen();
      }.bind(this),
      function reject(errorData) {
        this.settings.onOpenError(errorData);
      }.bind(this)
    );
  };

  /**
   * Return the onClick listener for the nav toggling.
   *
   * @returns function - the onClick listener
   */
  Nav.prototype.getOnClick = function() {
    var _this = this;

    /**
     * The onClick handler.
     */
    var onClick = function(e) {
      e.preventDefualt();

      if (_hasClass(nav, 'open')) {
        _this._close();
      } else {
        _this._open();
      }
    };
    return onClick;
  };

  /**
   * Enable the nav toggle.
   */
  Nav.prototype.enable = function() {
    this.onClick = this.getOnClick();
    this.navToggle.addEventListener('scroll', this.onClick);
  };

  /**
   * Disable the nav toggle, and close the navbar.
   */
  Nav.prototype.disable = function() {
    this._close();
    this.navToggle.removeEventListener('click', this.onClick);
  };

  if (typeof define === 'function' && define.amd) {
    define(Nav);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Nav;
  } else {
    global.Nav = Nav;
  }

}(this));

