/**
 * @type {{Models: {}, Collections: {}, Views: {Navigation: {}, Background: {}}, Dispatcher: {}}}
 */
var app = {
    /**
     * @namespace
     */
    Models: {},
    /**
     * @namespace
     */
    Collections: {},
    /**
     * @namespace
     */
    Views: {
        /**
         * @namespace
         */
        Navigation: {},
        /**
         * @namespace
         */
        Background: {},
        /**
         * @namespace
         */
        Gallery: {}
    },
    /**
     * @namespace
     */
    Dispatcher : {}
};

app.Dispatcher = _.extend({}, Backbone.Events);

(function () {

    /**
     * Launch perfect-scrollbar plugin
     * @param {Object} $selector
     * @constructor
     */
    this.ScrollBar = function ($selector) {
        this.$selector = $selector;
        this.axis = this.$selector.data('scrollbar') || "y";
    };

    /**
     * For more documentation @see https://github.com/noraesae/perfect-scrollbar
     */
    ScrollBar.prototype.render = function () {
        var options = {};

        if (this.axis === "y") {
            options.suppressScrollX = 1;
        }

        if (this.axis === "x") {
            options.suppressScrollY = 1;
        }

        this.$selector.perfectScrollbar(options);
    };

    ScrollBar.prototype.update = function () {
        this.$selector.perfectScrollbar('update');
    };

    $(document).ready(function () {
        "use strict";

        /**
         * Init model automatically
         */
        $('[data-scrollbar]').each(function (index, element) {
            var scrollBar = new ScrollBar($(element));
            scrollBar.render();
            console.log('ScrollBar rendered for [class="' + $(element).attr('class') + '"]');

            $(window).resize(function () {
                scrollBar.update();
            });
        });
    });
}());
/*global Backbone, $, _, app */
$(function () {
    "use strict";

    var $navigation = $('[data-view="gallery"]');

    var SELECTOR_THUMBNAIL = '[data-thumbnail]';
    var SELECTOR_SLIDESHOW = '[data-slideshow]';
    var SELECTOR_SLIDESHOW_CONTENT = '[data-slideshow-content]';
    var SELECTOR_SLIDESHOW_FOOTER = '[data-slideshow-footer]';
    var SELECTOR_SLIDESHOW_ASIDE = '[data-slideshow-aside]';
    var SELECTOR_SLIDESHOW_IMAGE = '[data-slideshow-image]';
    var SELECTOR_NAVIGATION = '[data-navigation]';

    var CLASS_IS_ACTIVE = 'is-active';

    app.Views.Gallery = Backbone.View.extend({
        el: $navigation,
        count: null,
        currentIndex: null,
        images: {},
        $slideshow: null,

        arrowLeftKeyCode: 37,
        arrowRightKeyCode: 39,
        escapeKeyCode: 27,

        initialize: function () {
        },

        events: {
            'click [data-thumbnail]': 'clickThumbnail'
        },

        clickThumbnail: function (event) {
            event.preventDefault();
            var $target = $(event.currentTarget);
            this.currentIndex = parseInt($target.attr('data-item'));

            if (this.$slideshow !== null) {
                this._slide();
                this.$slideshow.show();
            } else {
                this.render();
            }
        },

        clickNext: function () {
            var len = Object.keys(this.images).length;
            this.currentIndex = (this.currentIndex + 1) % len;
            this._slide();
        },

        clickPrevious: function () {
            var len = Object.keys(this.images).length;
            this.currentIndex = (this.currentIndex + len - 1) % len;
            this._slide();
        },

        clickMiniature: function (event) {
            event.preventDefault();

            this.currentIndex = parseInt($(event.currentTarget).attr('data-miniature'));
            this._slide();
        },

        close: function () {
            this.$slideshow.hide();
        },

        open: function () {
            this.$slideshow.show();
        },

        changeSlideWithKeyboard: function (event) {
            var keyCode = event.keyCode || event.which;

            if (keyCode === this.arrowLeftKeyCode) {
                this.clickPrevious();
            } else if (keyCode === this.arrowRightKeyCode) {
                this.clickNext();
            } else if (keyCode === this.escapeKeyCode) {
                this.close();
            }
        },

        _slide: function () {
            $(SELECTOR_SLIDESHOW_IMAGE).removeClass(CLASS_IS_ACTIVE);

            var $image = $('[data-slideshow-image="' + this.currentIndex + '"]');
            $image.addClass(CLASS_IS_ACTIVE);
        },

        /**
         * @param $container
         * @param image
         * @private
         */
        _appendTitle: function ($container, image) {
            if (image.title !== "") {
                $container.append('<div class="my-slideshow-title">' + image.title + '</div>');
            }
        },

        /**
         * @param $container
         * @param image
         * @private
         */
        _appendCaption: function ($container, image) {
            if (image.caption !== "") {
                $container.append('<div class="my-slideshow-caption">' + image.caption + '</div>');
            }
        },

        /**
         * @param $container
         * @param image
         * @private
         */
        _appendPicture: function ($container, image) {
            $container.find('.my-slideshow-image').append('<div class="my-slideshow-picture"><div class="my-slideshow-picture-asset" style="background-image: url(' + image.url + ')"></div></div>');
            $container.append('<div data-slideshow-aside></div>');
            var $aside = $(SELECTOR_SLIDESHOW_ASIDE, $container);
            this._appendTitle($aside, image);
            this._appendCaption($aside, image);
        },

        /**
         * @param $container
         * @param image
         * @private
         */
        _appendMiniature: function ($container, image) {
            this.$miniatures.append('<div data-miniature="' + $container.attr('data-slideshow-image') + '" class="my-slideshow-miniature" style="background-image: url(' + image.miniature + ')"></div>');
        },

        _appendSlideshow: function () {
            $('body').append('<div data-slideshow></div>');
            this.$slideshow = $(SELECTOR_SLIDESHOW);
            this.$slideshow.append('<div data-slideshow-content></div>');
            this.$slideshowContent = $(SELECTOR_SLIDESHOW_CONTENT);

            this.$slideshow.append('<div data-slideshow-footer></div>');
            this.$slideshowFooter = $(SELECTOR_SLIDESHOW_FOOTER);
            this.$slideshowFooter.append('<div class="my-slideshow-navigation--miniatures" data-el="navigation-miniatures"></div>');

            this.$miniatures = $('[data-el="navigation-miniatures"]');
        },

        _appendNavigation: function () {
            this.$slideshow.append('<div data-navigation>');
            this.$navigation = $(SELECTOR_NAVIGATION);
            this.$navigation.append('<button class="my-slideshow-navigation--button icon-times" data-el="navigation-button-close"></button>');
            this.$navigation.append('<button class="my-slideshow-navigation--button icon-chevron-left" data-el="navigation-button-previous"></button>');
            this.$navigation.append('<button class="my-slideshow-navigation--button icon-chevron-right" data-el="navigation-button-next"></button>');
        },

        /**
         * @returns {app.Views.Gallery}
         */
        render: function () {
            this.$thumbnails = $(SELECTOR_THUMBNAIL, this.$el);
            this.count = this.$thumbnails.length;

            if (this.count > 0) {
                this._appendSlideshow();
                this._appendNavigation();

                $.each(this.$thumbnails, _.bind(function (key, element) {
                    var $element = $(element);
                    var index = parseInt($element.attr('data-item'));
                    this.images[index] = {
                        title: $element.attr('data-title'),
                        caption: $element.attr('data-caption'),
                        url: $element.attr('data-url'),
                        miniature: $element.attr('data-miniature-url')
                    };

                    this.$slideshowContent.append('<div data-slideshow-image="' + index + '"><div class="my-slideshow-image"></div></div>');

                    var image = this.images[index];
                    var $container = $('[data-slideshow-image="' + index + '"]');

                    if (index === this.currentIndex) {
                        $container.addClass(CLASS_IS_ACTIVE);
                    }

                    this._appendPicture($container, image);
                    this._appendMiniature($container, image);
                }, this));

                $(document).on('click', '[data-el="navigation-button-next"]', _.bind(function (event) {
                    event.preventDefault();
                    this.clickNext();
                }, this));

                $(document).on('click', '[data-el="navigation-button-previous"]', _.bind(function (event) {
                    event.preventDefault();
                    this.clickPrevious();
                }, this));

                $(document).on('click', '[data-el="navigation-button-close"]', _.bind(function (event) {
                    event.preventDefault();
                    this.close();
                }, this));

                $(document).on('click', '[data-miniature]', _.bind(this.clickMiniature, this));
                $(document).bind('keyup', _.bind(this.changeSlideWithKeyboard, this));

                this.$slideshow.show();
            }

            return this;
        }
    });

    if ($navigation.length > 0) {
        var view = new app.Views.Gallery();
    }
}());

/*global Backbone, $, _, app */
$(function () {
    "use strict";

    var $background = $('[data-view="background.main"]');

    var BACKGROUND_IDS = [1, 2, 3, 4];
    var FIRST_BACKGROUND_KEY = 0;

    app.Views.Background.Main = Backbone.View.extend({
        el: $background,

        initialize: function () {
            var _ = this;
            this.backgroundId = FIRST_BACKGROUND_KEY;

            setInterval(function () {
                _._changeBackground();
            }, 9000);
        },

        events: {
            'click [data-el="topbar-menu-toggle"]': 'toggleBackground'
        },

        /**
         * @private
         */
        _changeBackground: function () {
            var len = BACKGROUND_IDS.length;

            var current = this.backgroundId;
            var next = (this.backgroundId + 1) % len;

            this.backgroundId = next;

            $('[data-el="item-' + BACKGROUND_IDS[next] + '"]', this.$el).addClass('is-visible');
            setTimeout(_.bind(function () {
                $('[data-el="item-' + BACKGROUND_IDS[current] + '"]', this.$el).removeClass('is-visible');
            }, this), 150);
        },

        /**
         * @returns {app.Views.Background.Main}
         */
        render: function () {

            return this;
        }
    });

    if ($background.length > 0) {
        var view = new app.Views.Background.Main();
        view.render();
    }
}());

/*global Backbone, $, _, app */
$(function () {
    "use strict";

    var $navigation = $('[data-view="navigation.main"]');

    var SELECTOR_SITE_NAVIGATION = '[data-el="site-aside-menu"]';
    var SELECTOR_BUTTON_NAVIGATION = '[data-el="topbar-menu-toggle"]';

    var CLASS_NAV_VISIBLE = 'is-visible';
    var CLASS_NAV_OPENED = 'is-opened';
    var CLASS_BODY_OVERFLOW_HIDDEN = 'is-overflow-hidden';

    app.Views.Navigation.Main = Backbone.View.extend({
        el: $navigation,

        initialize: function () {
            this.$navigation = $(SELECTOR_SITE_NAVIGATION, this.$el);
            this.$button = $(SELECTOR_BUTTON_NAVIGATION, this.$el);
            this.$html = $('html');
        },

        events: {
            'click [data-el="topbar-menu-toggle"]': 'toggleNavigation'
        },

        /**
         * @param event
         */
        toggleNavigation: function (event) {
            event.preventDefault();

            this.$navigation.toggleClass(CLASS_NAV_VISIBLE);
            this.$button.toggleClass(CLASS_NAV_OPENED);
            this.$html.toggleClass(CLASS_BODY_OVERFLOW_HIDDEN);
        },

        /**
         * @returns {app.Views.Navigation.Main}
         */
        render: function () {

            return this;
        }
    });

    if ($navigation.length > 0) {
        var view = new app.Views.Navigation.Main();
        view.render();
    }
}());
