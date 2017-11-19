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
