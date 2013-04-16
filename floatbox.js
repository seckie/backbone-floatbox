/**
 * $.Floatbox
 *
 * @author     Naoki Sekiguchi (RaNa gRam)
 * @url        https://github.com/seckie/backbone-modal
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @requires   jQuery.js, Underscore.js, Backbone.js
 */

(function($, _, Backbone, window, document) {

$.Floatbox = Backbone.View.extend({
	initialize: function (options) {
		this.opt = {
			delay: 500,
			animation: true,
			easing: 'swing',
			duration: 750
		};
		_.extend(this.opt, options);
		_.bindAll(this);
		this.defaultTop = parseInt(this.$el.css('top'), 10);
		this.parentOffsetTop = this.$el.offsetParent().offset().top;

		$(window).on('scroll', this.update);
	},
	update: function () {
		var self = this;
		this.clearTimer();
		this.timer = setTimeout(this.move, this.opt.delay);
	},
	move: function () {
		var scrollTop = $(window).scrollTop();
		scrollTop -= this.parentOffsetTop;
		scrollTop = (scrollTop < this.defaultTop) ? this.defaultTop : scrollTop;

		if (this.opt.animation === true) {
			this.$el.stop(true, true).animate({
				'top': scrollTop
			}, this.opt.duration, this.opt.easing);
		} else {
			this.$el.css({
				'top': scrollTop
			});
		}
	},
	clearTimer: function () {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}
	}
});

})(jQuery, _, Backbone, this, this.document);
