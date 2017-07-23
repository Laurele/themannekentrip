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
