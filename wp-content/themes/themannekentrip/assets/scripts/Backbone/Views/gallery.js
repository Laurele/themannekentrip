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
            $image.append('<div class="my-slideshow-title">' + image.title + '</div>');
        },

        /**
         * @param $image
         * @param image
         * @private
         */
        _appendCaption: function ($image, image) {
            $image.append('<div class="my-slideshow-caption">' + image.caption + '</div>');
        },

        /**
         * @param $image
         * @param image
         * @private
         */
        _appendPicture: function ($image, image) {
            $image.append('<div class="my-slideshow-picture" style="background-image: url(' + image.url + ')"></div>');
        },

        /**
         * @param $image
         * @param image
         * @private
         */
        _appendMiniature: function ($image, image) {
            this.$miniatures.append('<div data-miniature="' + $image.attr('data-image') + '" class="my-slideshow-miniature" style="background-image: url(' + image.miniature + ')"></div>');
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
            this.$navigation.append('<div class="my-slideshow-navigation--miniatures" data-el="navigation-miniatures"></div>');
            this.$miniatures = $('[data-el="navigation-miniatures"]');
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

                    var image = this.images[index];

                    this.$slideshow.append('<div class="my-slideshow-image" data-image="' + index + '"></div>');
                    var $image = $('[data-image="' + index + '"]');

                    if (index === this.currentIndex) {
                        $image.addClass(CLASS_IS_ACTIVE);
                    }

                    this._appendTitle($image, image);
                    this._appendCaption($image, image);
                    this._appendPicture($image, image);
                    this._appendMiniature($image, image);
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
