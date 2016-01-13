;(function ( $, window, document, undefined ) {
    var pluginName = "sticky",
        defaults = {
            'elementHeight': 0,
            'tolerance': 0,
            'disableWidth': null,
            'classes': {
                'default': 'sticky-element',
                'active': 'sticky-active',
                'inactive': 'sticky-inactive',
            },
        };

    function Sticky( element, options ) {

        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        if ( window.innerWidth <= this.options.disableWidth ) { return; }

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

    Sticky.prototype = {

        init: function() {

            this.setOptions();
            this.setElementAttributes();
            this.initCompensationElement();
            this.addListeners();
        },

        setOptions: function() {

            this.options.elementHeight = $(this.element).height();
            this.options.tolerance = this.options.tolerance ? this.options.tolerance : $(this.element).height() * 2;
        },

        setElementAttributes: function() {

            $(this.element).addClass( this.options.classes.default );
            $(this.element).addClass( this.options.classes.inactive ); // Element is inactive onload
        },

        createCompensationElement: function() {

            this.compensationElement = '.sticky-compensation-element';
            $('body').prepend( '<div class="sticky-compensation-element"></div>' );
        },

        initCompensationElement: function() {

            this.createCompensationElement();
            this.addCompensationElementAttrs();
        },

        addCompensationElementAttrs: function() {

            var classes = this.options.classes;

            $(this.compensationElement).addClass( classes.inactive );
        },

        addListeners: function() {

            var self = this;

            var update = debounce(function() {

                self.setOptions();
            }, 250);

            $(window).on( 'resize', update );
            $(document).on( 'ready', this.determineStickyState.bind(this) );
            $(document).on( 'scroll', this.determineStickyState.bind(this) );
        },

        updateTolerance: function(num) {

            this.options.tolerance = num;
        },

        determineStickyState: function() {

            if ( window.pageYOffset > this.options.tolerance + this.options.elementHeight ) {

                if ( $(this.element).hasClass('sticky-active') ) { return; }
                this.doSticky();
            }

            if ( window.pageYOffset < this.options.tolerance + this.options.elementHeight ) {

                if ( $(this.element).hasClass('sticky-inactive') ) { return; }
                this.undoSticky();
            }
        },

        doSticky: function() {
            $(this.element).css({
                'top': '-' + this.options.elementHeight + 'px'
            });

            $(this.compensationElement).removeClass( this.options.classes.inactive );
            $(this.compensationElement).addClass( this.options.classes.active );
            $(this.element).removeClass( this.options.classes.inactive );
            $(this.element).addClass( this.options.classes.active );

            $(this.compensationElement).css({
                'height': this.options.elementHeight + 'px',
            });

            $(this.element).css({
                'top': '0'
            });
        },

        undoSticky: function() {
            $(this.compensationElement).removeClass( this.options.classes.active );
            $(this.compensationElement).addClass( this.options.classes.inactive );
            $(this.element).addClass( this.options.classes.inactive );
            $(this.element).removeClass( this.options.classes.active );

            console.log(this.element);

            $(this.compensationElement).css({
                'top': '-' + this.options.elementHeight + 'px'
            });

            $(this.compensationElement).css({
                'height': '0',
            });
        },
    };

    $.fn.sticky = function(options) {

        return new Sticky( this, options );
    }

})( jQuery, window, document );