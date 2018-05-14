/*global Backbone, $, _, app */
$(function () {
    "use strict";

    var $navigation = $('[data-view="gallery"]');

    var SELECTOR_THUMBNAIL = '[data-thumbnail]';
    var SELECTOR_SLIDESHOW = '[data-slideshow]';
    var SELECTOR_NAVIGATION = '[data-navigation]';

    app.Views.Gallery = Backbone.View.extend({
        el: $navigation,
        count: null,
        images: {},

        initialize: function () {
            console.log('view init');

            $('body').append('<div data-slideshow></div>');
            this.$slideshow = $(SELECTOR_SLIDESHOW);

            this.$slideshow.append('<div data-navigation class="my-slideshow-navigation">');
            this.$navigation = $(SELECTOR_NAVIGATION);

            this.$navigation.append('<button class="my-slideshow-navigation--button icon-times" data-el="navigation-button-close"></button>');
            this.$navigation.append('<button class="my-slideshow-navigation--button icon-chevron-left" data-el="navigation-button-previous"></button>');
            this.$navigation.append('<button class="my-slideshow-navigation--button icon-chevron-right" data-el="navigation-button-next"></button>');

            this.$thumbnails = $(SELECTOR_THUMBNAIL, this.$el);
            this.count = this.$thumbnails.length;

            $.each(this.$thumbnails, _.bind(function (key, element) {
                var $element = $(element);
                var index = $element.attr('data-item');
                this.images[index] = {
                    title: $element.attr('data-title'),
                    caption: $element.attr('data-caption'),
                    url: $element.attr('data-url')
                };

                var image = this.images[index];

                this.$slideshow.append('<div class="my-slideshow-image" data-image="' + index + '"></div>');
                var $image = $('[data-image="' + index + '"]');

                if (index == 0) {
                    $image.addClass('is-active');
                }

                this._appendTitle($image, image);
                this._appendCaption($image, image);
                this._appendPicture($image, image);
            }, this));

        },

        events: {},

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

        /**
         * @returns {app.Views.Gallery}
         */
        render: function () {
            this.$slideshow.show();


            return this;
        }
    });

    if ($navigation.length > 0) {
        var view = new app.Views.Gallery();
        view.render();
    }
}());
