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

/*global Backbone, $, _, app */
$(function () {
    "use strict";

    var $navigation = $('[data-view="navigation.main"]');

    var SELECTOR_SITE_NAVIGATION = '[data-el="site-aside-menu"]';
    var SELECTOR_SITE_NAVIGATION_TOGGLE = '[data-el="topbar-menu-toggle"]';

    app.Views.Navigation.Main = Backbone.View.extend({
        el: $navigation,

        initialize: function () {
            this.$navigation = $(SELECTOR_SITE_NAVIGATION, this.$el);
            this.$navigationToggle = $(SELECTOR_SITE_NAVIGATION_TOGGLE, this.$el);
        },

        events: {
            'click [data-el="topbar-menu-toggle"]': 'toggleNavigation'
        },

        /**
         * @param event
         */
        toggleNavigation: function (event) {
            event.preventDefault();

            this.$navigation.toggleClass('is-visible');
        },

        /**
         * @returns {app.Views.Navigation.Main}
         */
        render: function () {

            return this;
        }
    });

    if ($navigation.length > 0) {
        var view = new app.Views.Navigation.Main;
        view.render();
    }
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJhY2tib25lL2FwcC5qcyIsIkJhY2tib25lL1ZpZXdzL21haW4tbmF2aWdhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZSB7e01vZGVsczoge30sIENvbGxlY3Rpb25zOiB7fSwgVmlld3M6IHtOYXZpZ2F0aW9uOiB7fX0sIERpc3BhdGNoZXI6IHt9fX1cbiAqL1xudmFyIGFwcCA9IHtcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICovXG4gICAgTW9kZWxzOiB7fSxcbiAgICAvKipcbiAgICAgKiBAbmFtZXNwYWNlXG4gICAgICovXG4gICAgQ29sbGVjdGlvbnM6IHt9LFxuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKi9cbiAgICBWaWV3czoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG5hbWVzcGFjZVxuICAgICAgICAgKi9cbiAgICAgICAgTmF2aWdhdGlvbjoge31cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBuYW1lc3BhY2VcbiAgICAgKi9cbiAgICBEaXNwYXRjaGVyIDoge31cbn07XG5cbmFwcC5EaXNwYXRjaGVyID0gXy5leHRlbmQoe30sIEJhY2tib25lLkV2ZW50cyk7XG4iLCIvKmdsb2JhbCBCYWNrYm9uZSwgJCwgXywgYXBwICovXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciAkbmF2aWdhdGlvbiA9ICQoJ1tkYXRhLXZpZXc9XCJuYXZpZ2F0aW9uLm1haW5cIl0nKTtcblxuICAgIHZhciBTRUxFQ1RPUl9TSVRFX05BVklHQVRJT04gPSAnW2RhdGEtZWw9XCJzaXRlLWFzaWRlLW1lbnVcIl0nO1xuICAgIHZhciBTRUxFQ1RPUl9TSVRFX05BVklHQVRJT05fVE9HR0xFID0gJ1tkYXRhLWVsPVwidG9wYmFyLW1lbnUtdG9nZ2xlXCJdJztcblxuICAgIGFwcC5WaWV3cy5OYXZpZ2F0aW9uLk1haW4gPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgICAgIGVsOiAkbmF2aWdhdGlvbixcblxuICAgICAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRuYXZpZ2F0aW9uID0gJChTRUxFQ1RPUl9TSVRFX05BVklHQVRJT04sIHRoaXMuJGVsKTtcbiAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRpb25Ub2dnbGUgPSAkKFNFTEVDVE9SX1NJVEVfTkFWSUdBVElPTl9UT0dHTEUsIHRoaXMuJGVsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICdjbGljayBbZGF0YS1lbD1cInRvcGJhci1tZW51LXRvZ2dsZVwiXSc6ICd0b2dnbGVOYXZpZ2F0aW9uJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIHRvZ2dsZU5hdmlnYXRpb246IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGlvbi50b2dnbGVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmV0dXJucyB7YXBwLlZpZXdzLk5hdmlnYXRpb24uTWFpbn1cbiAgICAgICAgICovXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCRuYXZpZ2F0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHZpZXcgPSBuZXcgYXBwLlZpZXdzLk5hdmlnYXRpb24uTWFpbjtcbiAgICAgICAgdmlldy5yZW5kZXIoKTtcbiAgICB9XG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
