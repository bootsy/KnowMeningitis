+function($){"use strict";function t(t){return this.each(function(){var i=$(this),o=i.data("bs.tooltip"),n="object"==typeof t&&t;!o&&/destroy|hide/.test(t)||(o||i.data("bs.tooltip",o=new e(this,n)),"string"==typeof t&&o[t]())})}var e=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};e.VERSION="3.3.7",e.TRANSITION_DURATION=150,e.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},e.prototype.init=function(t,e,i){if(this.enabled=!0,this.type=t,this.$element=$(e),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&$($.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var o=this.options.trigger.split(" "),n=o.length;n--;){var s=o[n];if("click"==s)this.$element.on("click."+this.type,this.options.selector,$.proxy(this.toggle,this));else if("manual"!=s){var r="hover"==s?"mouseenter":"focusin",l="hover"==s?"mouseleave":"focusout";this.$element.on(r+"."+this.type,this.options.selector,$.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,$.proxy(this.leave,this))}}this.options.selector?this._options=$.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},e.prototype.getDefaults=function(){return e.DEFAULTS},e.prototype.getOptions=function(t){return t=$.extend({},this.getDefaults(),this.$element.data(),t),t.delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t},e.prototype.getDelegateOptions=function(){var t={},e=this.getDefaults();return this._options&&$.each(this._options,function(i,o){e[i]!=o&&(t[i]=o)}),t},e.prototype.enter=function(t){var e=t instanceof this.constructor?t:$(t.currentTarget).data("bs."+this.type);return e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),$(t.currentTarget).data("bs."+this.type,e)),t instanceof $.Event&&(e.inState["focusin"==t.type?"focus":"hover"]=!0),e.tip().hasClass("in")||"in"==e.hoverState?void(e.hoverState="in"):(clearTimeout(e.timeout),e.hoverState="in",e.options.delay&&e.options.delay.show?void(e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show)):e.show())},e.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},e.prototype.leave=function(t){var e=t instanceof this.constructor?t:$(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),$(t.currentTarget).data("bs."+this.type,e)),t instanceof $.Event&&(e.inState["focusout"==t.type?"focus":"hover"]=!1),!e.isInStateTrue()){if(clearTimeout(e.timeout),e.hoverState="out",!e.options.delay||!e.options.delay.hide)return e.hide();e.timeout=setTimeout(function(){"out"==e.hoverState&&e.hide()},e.options.delay.hide)}},e.prototype.show=function(){var t=$.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);var i=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(t.isDefaultPrevented()||!i)return;var o=this,n=this.tip(),s=this.getUID(this.type);this.setContent(),n.attr("id",s),this.$element.attr("aria-describedby",s),this.options.animation&&n.addClass("fade");var r="function"==typeof this.options.placement?this.options.placement.call(this,n[0],this.$element[0]):this.options.placement,l=/\s?auto?\s?/i,a=l.test(r);a&&(r=r.replace(l,"")||"top"),n.detach().css({top:0,left:0,display:"block"}).addClass(r).data("bs."+this.type,this),this.options.container?n.appendTo(this.options.container):n.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var p=this.getPosition(),h=n[0].offsetWidth,f=n[0].offsetHeight;if(a){var c=r,u=this.getPosition(this.$viewport);r="bottom"==r&&p.bottom+f>u.bottom?"top":"top"==r&&p.top-f<u.top?"bottom":"right"==r&&p.right+h>u.width?"left":"left"==r&&p.left-h<u.left?"right":r,n.removeClass(c).addClass(r)}var d=this.getCalculatedOffset(r,p,h,f);this.applyPlacement(d,r);var g=function(){var t=o.hoverState;o.$element.trigger("shown.bs."+o.type),o.hoverState=null,"out"==t&&o.leave(o)};$.support.transition&&this.$tip.hasClass("fade")?n.one("bsTransitionEnd",g).emulateTransitionEnd(e.TRANSITION_DURATION):g()}},e.prototype.applyPlacement=function(t,e){var i=this.tip(),o=i[0].offsetWidth,n=i[0].offsetHeight,s=parseInt(i.css("margin-top"),10),r=parseInt(i.css("margin-left"),10);isNaN(s)&&(s=0),isNaN(r)&&(r=0),t.top+=s,t.left+=r,$.offset.setOffset(i[0],$.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},t),0),i.addClass("in");var l=i[0].offsetWidth,a=i[0].offsetHeight;"top"==e&&a!=n&&(t.top=t.top+n-a);var p=this.getViewportAdjustedDelta(e,t,l,a);p.left?t.left+=p.left:t.top+=p.top;var h=/top|bottom/.test(e),f=h?2*p.left-o+l:2*p.top-n+a,c=h?"offsetWidth":"offsetHeight";i.offset(t),this.replaceArrow(f,i[0][c],h)},e.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},e.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},e.prototype.hide=function(t){function i(){"in"!=o.hoverState&&n.detach(),o.$element&&o.$element.removeAttr("aria-describedby").trigger("hidden.bs."+o.type),t&&t()}var o=this,n=$(this.$tip),s=$.Event("hide.bs."+this.type);if(this.$element.trigger(s),!s.isDefaultPrevented())return n.removeClass("in"),$.support.transition&&n.hasClass("fade")?n.one("bsTransitionEnd",i).emulateTransitionEnd(e.TRANSITION_DURATION):i(),this.hoverState=null,this},e.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},e.prototype.hasContent=function(){return this.getTitle()},e.prototype.getPosition=function(t){t=t||this.$element;var e=t[0],i="BODY"==e.tagName,o=e.getBoundingClientRect();null==o.width&&(o=$.extend({},o,{width:o.right-o.left,height:o.bottom-o.top}));var n=window.SVGElement&&e instanceof window.SVGElement,s=i?{top:0,left:0}:n?null:t.offset(),r={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},l=i?{width:$(window).width(),height:$(window).height()}:null;return $.extend({},o,r,l,s)},e.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},e.prototype.getViewportAdjustedDelta=function(t,e,i,o){var n={top:0,left:0};if(!this.$viewport)return n;var s=this.options.viewport&&this.options.viewport.padding||0,r=this.getPosition(this.$viewport);if(/right|left/.test(t)){var l=e.top-s-r.scroll,a=e.top+s-r.scroll+o;l<r.top?n.top=r.top-l:a>r.top+r.height&&(n.top=r.top+r.height-a)}else{var p=e.left-s,h=e.left+s+i;p<r.left?n.left=r.left-p:h>r.right&&(n.left=r.left+r.width-h)}return n},e.prototype.getTitle=function(){var t,e=this.$element,i=this.options;return t=e.attr("data-original-title")||("function"==typeof i.title?i.title.call(e[0]):i.title)},e.prototype.getUID=function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},e.prototype.tip=function(){if(!this.$tip&&(this.$tip=$(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},e.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},e.prototype.enable=function(){this.enabled=!0},e.prototype.disable=function(){this.enabled=!1},e.prototype.toggleEnabled=function(){this.enabled=!this.enabled},e.prototype.toggle=function(t){var e=this;t&&((e=$(t.currentTarget).data("bs."+this.type))||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),$(t.currentTarget).data("bs."+this.type,e))),t?(e.inState.click=!e.inState.click,e.isInStateTrue()?e.enter(e):e.leave(e)):e.tip().hasClass("in")?e.leave(e):e.enter(e)},e.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})};var i=$.fn.tooltip;$.fn.tooltip=t,$.fn.tooltip.Constructor=e,$.fn.tooltip.noConflict=function(){return $.fn.tooltip=i,this}}(jQuery);