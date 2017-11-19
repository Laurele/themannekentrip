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