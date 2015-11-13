;(function ( $, window, document, undefined ) {

    var pluginName = "sticky",
        defaults = {
            'elementHeight': 0,
            'tolerance': 0,
            'classes': {
                'default': 'sticky-copy',
                'active': 'sticky-active',
                'inactive': 'sticky-inactive',
            },
        };

    function Plugin( element, options ) {

        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    function debounce(func, wait, immediate) { // https://davidwalsh.name/javascript-debounce-function
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    Plugin.prototype = {

        init: function() {

            this.setOptions();
            this.initCloneElement();
            this.prependCloneElement();
            this.addListeners();
        },

        setOptions: function() {

            this.options.elementHeight = $(this.element).height();
            this.options.tolerance = $(this.element).height() * 2;
        },

        createCloneElement: function() {

            this.cloneElement = $(this.element).clone()[0];
        },

        initCloneElement: function() {

            this.createCloneElement();
            this.addCloneElementAttrs();
        },

        addCloneElementAttrs: function() {

            var classes = this.options.classes;

            $(this.cloneElement).addClass( classes.default + ' ' + classes.inactive );
        },

        prependCloneElement: function() {

            $('body').prepend(this.cloneElement);
        },

        addListeners: function() {

            var self = this;

            var update = debounce(function() {

                self.setOptions();
            }, 250);

            $(window).on( 'resize', update );

            $(document).on( 'scroll', function(ev) {

                if ( window.pageYOffset > self.options.elementHeight ) {

                    self.doSticky();
                }

                if ( window.pageYOffset < self.options.tolerance + self.options.elementHeight ) {

                    self.undoSticky();
                }
            });
        },

        doSticky: function() {

            $(this.cloneElement).css({
                'transform': 'translateY(0)'
            });
            $(this.cloneElement).removeClass( this.options.classes.inactive );
            $(this.cloneElement).addClass( this.options.classes.active );
        },

        undoSticky: function() {

            $(this.cloneElement).css({
                'transform': 'translateY(' + '-' + this.options.elementHeight + 'px)'
            });
            $(this.cloneElement).removeClass( this.options.classes.active );
            $(this.cloneElement).addClass( this.options.classes.inactive );
        },
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );