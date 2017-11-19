/**
 * @type {{Models: {}, Collections: {}, Views: {Navigation: {}}, Dispatcher: {}}}
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
        Navigation: {}
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
