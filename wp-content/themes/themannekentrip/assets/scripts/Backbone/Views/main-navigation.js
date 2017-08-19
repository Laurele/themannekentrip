/*global Backbone, $, _, app */
$(function () {
    "use strict";

    var $navigation = $('[data-view="navigation.main"]');

    var SELECTOR_SITE_NAVIGATION = '[data-el="site-aside-menu"]';
    var CLASS_NAV_VISIBLE = 'is-visible';
    var CLASS_BODY_OVERFLOW_HIDDEN = 'is-overflow-hidden';

    app.Views.Navigation.Main = Backbone.View.extend({
        el: $navigation,

        initialize: function () {
            this.$navigation = $(SELECTOR_SITE_NAVIGATION, this.$el);
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
