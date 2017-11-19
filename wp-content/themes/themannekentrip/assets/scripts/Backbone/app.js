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
        Background: {}
    },
    /**
     * @namespace
     */
    Dispatcher : {}
};

app.Dispatcher = _.extend({}, Backbone.Events);
