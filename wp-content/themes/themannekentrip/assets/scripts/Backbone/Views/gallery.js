/*global Backbone, $, _, app */
$(function () {
    "use strict";

    var $navigation = $('[data-view="gallery"]');

    var SELECTOR_THUMBNAIL = '[data-thumbnail]';
    var SELECTOR_SLIDESHOW = '[data-slideshow]';
    var SELECTOR_NAVIGATION = '[data-navigation]';

    var CLASS_IS_ACTIVE = 'is-active';

    app.Views.Gallery = Backbone.View.extend({
        el: $navigation,
        count: null,
        currentIndex: null,
        images: {},
        $slideshow: null,

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

        clickNext: function (event) {
            event.preventDefault();

            var len = Object.keys(this.images).length;
            this.currentIndex = (this.currentIndex + 1) % len;
            this._slide();
        },

        clickPrevious: function (event) {
            event.preventDefault();

            var len = Object.keys(this.images).length;
            this.currentIndex = (this.currentIndex + len - 1) % len;
            this._slide();
        },

        close: function (event) {
            event.preventDefault();

            this.$slideshow.hide();
        },

        open: function () {
            this.$slideshow.show();
        },

        _slide: function () {
            $('[data-image]').removeClass(CLASS_IS_ACTIVE);
            var $image = $('[data-image="' + this.currentIndex + '"]');
            $image.addClass(CLASS_IS_ACTIVE);
        },

        /**
         * @param $image
         * @param image
         * @private
         */
        _appendTitle: function ($image, image) {
            $image.append('<div class="my-slideshow-title">' + image.title + '</div>')
        },

        /**
         * @param $image
         * @param image
         * @private
         */
        _appendCaption: function ($image, image) {
            $image.append('<div class="my-slideshow-caption">' + image.caption + '</div>')
        },

        /**
         * @param $image
         * @param image
         * @private
         */
        _appendPicture: function ($image, image) {
            $image.append('<div class="my-slideshow-picture" style="background-image: url(' + image.url + ')"></div>')
        },

        _appendSlideshow: function () {
            $('body').append('<div data-slideshow></div>');
            this.$slideshow = $(SELECTOR_SLIDESHOW);

        },

        _appendNavigation: function () {
            this.$slideshow.append('<div data-navigation class="my-slideshow-navigation">');
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
                        url: $element.attr('data-url')
                    };

                    var image = this.images[index];

                    this.$slideshow.append('<div class="my-slideshow-image" data-image="' + index + '"></div>');
                    var $image = $('[data-image="' + index + '"]');

                    if (index === this.currentIndex) {
                        $image.addClass(CLASS_IS_ACTIVE);
                    }

                    this._appendTitle($image, image);
                    this._appendCaption($image, image);
                    this._appendPicture($image, image);
                }, this));

                $(document).on('click', '[data-el="navigation-button-next"]', _.bind(this.clickNext, this));
                $(document).on('click', '[data-el="navigation-button-previous"]', _.bind(this.clickPrevious, this));
                $(document).on('click', '[data-el="navigation-button-close"]', _.bind(this.close, this));

                this.$slideshow.show();
            }

            return this;
        }
    });

    if ($navigation.length > 0) {
        var view = new app.Views.Gallery();
    }
}());
