!function(e,t){"use strict";e.rails!==t&&e.error("jquery-ujs has already been loaded!");var n,i=e(document);e.rails=n={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",buttonClickSelector:"button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",disableSelector:"input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",requiredInputSelector:"input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",fileInputSelector:"input[name][type=file]:not([disabled])",linkDisableSelector:"a[data-disable-with], a[data-disable]",buttonDisableSelector:"button[data-remote][data-disable-with], button[data-remote][data-disable]",csrfToken:function(){return e("meta[name=csrf-token]").attr("content")},csrfParam:function(){return e("meta[name=csrf-param]").attr("content")},CSRFProtection:function(e){var t=n.csrfToken();t&&e.setRequestHeader("X-CSRF-Token",t)},refreshCSRFTokens:function(){e('form input[name="'+n.csrfParam()+'"]').val(n.csrfToken())},fire:function(t,n,i){var r=e.Event(n);return t.trigger(r,i),!1!==r.result},confirm:function(e){return confirm(e)},ajax:function(t){return e.ajax(t)},href:function(e){return e[0].href},isRemote:function(e){return e.data("remote")!==t&&!1!==e.data("remote")},handleRemote:function(i){var r,o,a,s,l,u;if(n.fire(i,"ajax:before")){if(s=i.data("with-credentials")||null,l=i.data("type")||e.ajaxSettings&&e.ajaxSettings.dataType,i.is("form")){r=i.data("ujs:submit-button-formmethod")||i.attr("method"),o=i.data("ujs:submit-button-formaction")||i.attr("action"),a=e(i[0]).serializeArray();var d=i.data("ujs:submit-button");d&&(a.push(d),i.data("ujs:submit-button",null)),i.data("ujs:submit-button-formmethod",null),i.data("ujs:submit-button-formaction",null)}else i.is(n.inputChangeSelector)?(r=i.data("method"),o=i.data("url"),a=i.serialize(),i.data("params")&&(a=a+"&"+i.data("params"))):i.is(n.buttonClickSelector)?(r=i.data("method")||"get",o=i.data("url"),a=i.serialize(),i.data("params")&&(a=a+"&"+i.data("params"))):(r=i.data("method"),o=n.href(i),a=i.data("params")||null);return u={type:r||"GET",data:a,dataType:l,beforeSend:function(e,r){if(r.dataType===t&&e.setRequestHeader("accept","*/*;q=0.5, "+r.accepts.script),!n.fire(i,"ajax:beforeSend",[e,r]))return!1;i.trigger("ajax:send",e)},success:function(e,t,n){i.trigger("ajax:success",[e,t,n])},complete:function(e,t){i.trigger("ajax:complete",[e,t])},error:function(e,t,n){i.trigger("ajax:error",[e,t,n])},crossDomain:n.isCrossDomain(o)},s&&(u.xhrFields={withCredentials:s}),o&&(u.url=o),n.ajax(u)}return!1},isCrossDomain:function(e){var t=document.createElement("a");t.href=location.href;var n=document.createElement("a");try{return n.href=e,n.href=n.href,!((!n.protocol||":"===n.protocol)&&!n.host||t.protocol+"//"+t.host==n.protocol+"//"+n.host)}catch(i){return!0}},handleMethod:function(i){var r=n.href(i),o=i.data("method"),a=i.attr("target"),s=n.csrfToken(),l=n.csrfParam(),u=e('<form method="post" action="'+r+'"></form>'),d='<input name="_method" value="'+o+'" type="hidden" />';l===t||s===t||n.isCrossDomain(r)||(d+='<input name="'+l+'" value="'+s+'" type="hidden" />'),a&&u.attr("target",a),u.hide().append(d).appendTo("body"),u.submit()},formElements:function(t,n){return t.is("form")?e(t[0].elements).filter(n):t.find(n)},disableFormElements:function(t){n.formElements(t,n.disableSelector).each(function(){n.disableFormElement(e(this))})},disableFormElement:function(e){var n,i;n=e.is("button")?"html":"val",(i=e.data("disable-with"))!==t&&(e.data("ujs:enable-with",e[n]()),e[n](i)),e.prop("disabled",!0),e.data("ujs:disabled",!0)},enableFormElements:function(t){n.formElements(t,n.enableSelector).each(function(){n.enableFormElement(e(this))})},enableFormElement:function(e){var n=e.is("button")?"html":"val";e.data("ujs:enable-with")!==t&&(e[n](e.data("ujs:enable-with")),e.removeData("ujs:enable-with")),e.prop("disabled",!1),e.removeData("ujs:disabled")},allowAction:function(e){var t,i=e.data("confirm"),r=!1;if(!i)return!0;if(n.fire(e,"confirm")){try{r=n.confirm(i)}catch(o){(console.error||console.log).call(console,o.stack||o)}t=n.fire(e,"confirm:complete",[r])}return r&&t},blankInputs:function(t,n,i){var r,o,a,s=e(),l=n||"input,textarea",u={};return t.find(l).each(function(){(r=e(this)).is("input[type=radio]")?(a=r.attr("name"),u[a]||(0===t.find('input[type=radio]:checked[name="'+a+'"]').length&&(o=t.find('input[type=radio][name="'+a+'"]'),s=s.add(o)),u[a]=a)):(r.is("input[type=checkbox],input[type=radio]")?r.is(":checked"):!!r.val())===i&&(s=s.add(r))}),!!s.length&&s},nonBlankInputs:function(e,t){return n.blankInputs(e,t,!0)},stopEverything:function(t){return e(t.target).trigger("ujs:everythingStopped"),t.stopImmediatePropagation(),!1},disableElement:function(e){var i=e.data("disable-with");i!==t&&(e.data("ujs:enable-with",e.html()),e.html(i)),e.bind("click.railsDisable",function(e){return n.stopEverything(e)}),e.data("ujs:disabled",!0)},enableElement:function(e){e.data("ujs:enable-with")!==t&&(e.html(e.data("ujs:enable-with")),e.removeData("ujs:enable-with")),e.unbind("click.railsDisable"),e.removeData("ujs:disabled")}},n.fire(i,"rails:attachBindings")&&(e.ajaxPrefilter(function(e,t,i){e.crossDomain||n.CSRFProtection(i)}),e(window).on("pageshow.rails",function(){e(e.rails.enableSelector).each(function(){var t=e(this);t.data("ujs:disabled")&&e.rails.enableFormElement(t)}),e(e.rails.linkDisableSelector).each(function(){var t=e(this);t.data("ujs:disabled")&&e.rails.enableElement(t)})}),i.on("ajax:complete",n.linkDisableSelector,function(){n.enableElement(e(this))}),i.on("ajax:complete",n.buttonDisableSelector,function(){n.enableFormElement(e(this))}),i.on("click.rails",n.linkClickSelector,function(t){var i=e(this),r=i.data("method"),o=i.data("params"),a=t.metaKey||t.ctrlKey;if(!n.allowAction(i))return n.stopEverything(t);if(!a&&i.is(n.linkDisableSelector)&&n.disableElement(i),n.isRemote(i)){if(a&&(!r||"GET"===r)&&!o)return!0;var s=n.handleRemote(i);return!1===s?n.enableElement(i):s.fail(function(){n.enableElement(i)}),!1}return r?(n.handleMethod(i),!1):void 0}),i.on("click.rails",n.buttonClickSelector,function(t){var i=e(this);if(!n.allowAction(i)||!n.isRemote(i))return n.stopEverything(t);i.is(n.buttonDisableSelector)&&n.disableFormElement(i);var r=n.handleRemote(i);return!1===r?n.enableFormElement(i):r.fail(function(){n.enableFormElement(i)}),!1}),i.on("change.rails",n.inputChangeSelector,function(t){var i=e(this);return n.allowAction(i)&&n.isRemote(i)?(n.handleRemote(i),!1):n.stopEverything(t)}),i.on("submit.rails",n.formSubmitSelector,function(i){var r,o,a=e(this),s=n.isRemote(a);if(!n.allowAction(a))return n.stopEverything(i);if(a.attr("novalidate")===t)if(a.data("ujs:formnovalidate-button")===t){if((r=n.blankInputs(a,n.requiredInputSelector,!1))&&n.fire(a,"ajax:aborted:required",[r]))return n.stopEverything(i)}else a.data("ujs:formnovalidate-button",t);if(s){if(o=n.nonBlankInputs(a,n.fileInputSelector)){setTimeout(function(){n.disableFormElements(a)},13);var l=n.fire(a,"ajax:aborted:file",[o]);return l||setTimeout(function(){n.enableFormElements(a)},13),l}return n.handleRemote(a),!1}setTimeout(function(){n.disableFormElements(a)},13)}),i.on("click.rails",n.formInputClickSelector,function(t){var i=e(this);if(!n.allowAction(i))return n.stopEverything(t);var r=i.attr("name"),o=r?{name:r,value:i.val()}:null,a=i.closest("form");0===a.length&&(a=e("#"+i.attr("form"))),a.data("ujs:submit-button",o),a.data("ujs:formnovalidate-button",i.attr("formnovalidate")),a.data("ujs:submit-button-formaction",i.attr("formaction")),a.data("ujs:submit-button-formmethod",i.attr("formmethod"))}),i.on("ajax:send.rails",n.formSubmitSelector,function(t){this===t.target&&n.disableFormElements(e(this))}),i.on("ajax:complete.rails",n.formSubmitSelector,function(t){this===t.target&&n.enableFormElements(e(this))}),e(function(){n.refreshCSRFTokens()}))}(jQuery),function(e){"use strict";function t(t){var n=t.attr("data-target");n||(n=(n=t.attr("href"))&&/#[A-Za-z]/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,""));var i=n&&e(n);return i&&i.length?i:t.parent()}function n(n){n&&3===n.which||(e(r).remove(),e(o).each(function(){var i=e(this),r=t(i),o={relatedTarget:this};r.hasClass("open")&&(n&&"click"==n.type&&/input|textarea/i.test(n.target.tagName)&&e.contains(r[0],n.target)||(r.trigger(n=e.Event("hide.bs.dropdown",o)),n.isDefaultPrevented()||(i.attr("aria-expanded","false"),r.removeClass("open").trigger(e.Event("hidden.bs.dropdown",o)))))}))}function i(t){return this.each(function(){var n=e(this),i=n.data("bs.dropdown");i||n.data("bs.dropdown",i=new a(this)),"string"==typeof t&&i[t].call(n)})}var r=".dropdown-backdrop",o='[data-toggle="dropdown"]',a=function(t){e(t).on("click.bs.dropdown",this.toggle)};a.VERSION="3.3.7",a.prototype.toggle=function(i){var r=e(this);if(!r.is(".disabled, :disabled")){var o=t(r),a=o.hasClass("open");if(n(),!a){"ontouchstart"in document.documentElement&&!o.closest(".navbar-nav").length&&e(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(e(this)).on("click",n);var s={relatedTarget:this};if(o.trigger(i=e.Event("show.bs.dropdown",s)),i.isDefaultPrevented())return;r.trigger("focus").attr("aria-expanded","true"),o.toggleClass("open").trigger(e.Event("shown.bs.dropdown",s))}return!1}},a.prototype.keydown=function(n){if(/(38|40|27|32)/.test(n.which)&&!/input|textarea/i.test(n.target.tagName)){var i=e(this);if(n.preventDefault(),n.stopPropagation(),!i.is(".disabled, :disabled")){var r=t(i),a=r.hasClass("open");if(!a&&27!=n.which||a&&27==n.which)return 27==n.which&&r.find(o).trigger("focus"),i.trigger("click");var s=" li:not(.disabled):visible a",l=r.find(".dropdown-menu"+s);if(l.length){var u=l.index(n.target);38==n.which&&u>0&&u--,40==n.which&&u<l.length-1&&u++,~u||(u=0),l.eq(u).trigger("focus")}}}};var s=e.fn.dropdown;e.fn.dropdown=i,e.fn.dropdown.Constructor=a,e.fn.dropdown.noConflict=function(){return e.fn.dropdown=s,this},e(document).on("click.bs.dropdown.data-api",n).on("click.bs.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.bs.dropdown.data-api",o,a.prototype.toggle).on("keydown.bs.dropdown.data-api",o,a.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",a.prototype.keydown)}(jQuery),function(e){"use strict";function t(t){var n,i=t.attr("data-target")||(n=t.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,"");return e(i)}function n(t){return this.each(function(){var n=e(this),r=n.data("bs.collapse"),o=e.extend({},i.DEFAULTS,n.data(),"object"==typeof t&&t);!r&&o.toggle&&/show|hide/.test(t)&&(o.toggle=!1),r||n.data("bs.collapse",r=new i(this,o)),"string"==typeof t&&r[t]()})}var i=function(t,n){this.$element=e(t),this.options=e.extend({},i.DEFAULTS,n),this.$trigger=e('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};i.VERSION="3.3.7",i.TRANSITION_DURATION=350,i.DEFAULTS={toggle:!0},i.prototype.dimension=function(){return this.$element.hasClass("width")?"width":"height"},i.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var t,r=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(r&&r.length&&(t=r.data("bs.collapse"))&&t.transitioning)){var o=e.Event("show.bs.collapse");if(this.$element.trigger(o),!o.isDefaultPrevented()){r&&r.length&&(n.call(r,"hide"),t||r.data("bs.collapse",null));var a=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var s=function(){this.$element.removeClass("collapsing").addClass("collapse in")[a](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!e.support.transition)return s.call(this);var l=e.camelCase(["scroll",a].join("-"));this.$element.one("bsTransitionEnd",e.proxy(s,this)).emulateTransitionEnd(i.TRANSITION_DURATION)[a](this.$element[0][l])}}}},i.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var t=e.Event("hide.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var n=this.dimension();this.$element[n](this.$element[n]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var r=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};if(!e.support.transition)return r.call(this);this.$element[n](0).one("bsTransitionEnd",e.proxy(r,this)).emulateTransitionEnd(i.TRANSITION_DURATION)}}},i.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},i.prototype.getParent=function(){return e(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(e.proxy(function(n,i){var r=e(i);this.addAriaAndCollapsedClass(t(r),r)},this)).end()},i.prototype.addAriaAndCollapsedClass=function(e,t){var n=e.hasClass("in");e.attr("aria-expanded",n),t.toggleClass("collapsed",!n).attr("aria-expanded",n)};var r=e.fn.collapse;e.fn.collapse=n,e.fn.collapse.Constructor=i,e.fn.collapse.noConflict=function(){return e.fn.collapse=r,this},e(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(i){var r=e(this);r.attr("data-target")||i.preventDefault();var o=t(r),a=o.data("bs.collapse")?"toggle":r.data();n.call(o,a)})}(jQuery),function(e){"use strict";function t(t){return this.each(function(){var n=e(this),r=n.data("bs.alert");r||n.data("bs.alert",r=new i(this)),"string"==typeof t&&r[t].call(n)})}var n='[data-dismiss="alert"]',i=function(t){e(t).on("click",n,this.close)};i.VERSION="3.3.7",i.TRANSITION_DURATION=150,i.prototype.close=function(t){function n(){a.detach().trigger("closed.bs.alert").remove()}var r=e(this),o=r.attr("data-target");o||(o=(o=r.attr("href"))&&o.replace(/.*(?=#[^\s]*$)/,""));var a=e("#"===o?[]:o);t&&t.preventDefault(),a.length||(a=r.closest(".alert")),a.trigger(t=e.Event("close.bs.alert")),t.isDefaultPrevented()||(a.removeClass("in"),e.support.transition&&a.hasClass("fade")?a.one("bsTransitionEnd",n).emulateTransitionEnd(i.TRANSITION_DURATION):n())};var r=e.fn.alert;e.fn.alert=t,e.fn.alert.Constructor=i,e.fn.alert.noConflict=function(){return e.fn.alert=r,this},e(document).on("click.bs.alert.data-api",n,i.prototype.close)}(jQuery),function(e){"use strict";function t(t,i){return this.each(function(){var r=e(this),o=r.data("bs.modal"),a=e.extend({},n.DEFAULTS,r.data(),"object"==typeof t&&t);o||r.data("bs.modal",o=new n(this,a)),"string"==typeof t?o[t](i):a.show&&o.show(i)})}var n=function(t,n){this.options=n,this.$body=e(document.body),this.$element=e(t),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,e.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};n.VERSION="3.3.7",n.TRANSITION_DURATION=300,n.BACKDROP_TRANSITION_DURATION=150,n.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},n.prototype.toggle=function(e){return this.isShown?this.hide():this.show(e)},n.prototype.show=function(t){var i=this,r=e.Event("show.bs.modal",{relatedTarget:t});this.$element.trigger(r),this.isShown||r.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',e.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){i.$element.one("mouseup.dismiss.bs.modal",function(t){e(t.target).is(i.$element)&&(i.ignoreBackdropClick=!0)})}),this.backdrop(function(){var r=e.support.transition&&i.$element.hasClass("fade");i.$element.parent().length||i.$element.appendTo(i.$body),i.$element.show().scrollTop(0),i.adjustDialog(),r&&i.$element[0].offsetWidth,i.$element.addClass("in"),i.enforceFocus();var o=e.Event("shown.bs.modal",{relatedTarget:t});r?i.$dialog.one("bsTransitionEnd",function(){i.$element.trigger("focus").trigger(o)}).emulateTransitionEnd(n.TRANSITION_DURATION):i.$element.trigger("focus").trigger(o)}))},n.prototype.hide=function(t){t&&t.preventDefault(),t=e.Event("hide.bs.modal"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),e(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),e.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",e.proxy(this.hideModal,this)).emulateTransitionEnd(n.TRANSITION_DURATION):this.hideModal())},n.prototype.enforceFocus=function(){e(document).off("focusin.bs.modal").on("focusin.bs.modal",e.proxy(function(e){document===e.target||this.$element[0]===e.target||this.$element.has(e.target).length||this.$element.trigger("focus")},this))},n.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",e.proxy(function(e){27==e.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},n.prototype.resize=function(){this.isShown?e(window).on("resize.bs.modal",e.proxy(this.handleUpdate,this)):e(window).off("resize.bs.modal")},n.prototype.hideModal=function(){var e=this;this.$element.hide(),this.backdrop(function(){e.$body.removeClass("modal-open"),e.resetAdjustments(),e.resetScrollbar(),e.$element.trigger("hidden.bs.modal")})},n.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},n.prototype.backdrop=function(t){var i=this,r=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var o=e.support.transition&&r;if(this.$backdrop=e(document.createElement("div")).addClass("modal-backdrop "+r).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",e.proxy(function(e){this.ignoreBackdropClick?this.ignoreBackdropClick=!1:e.target===e.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide())},this)),o&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!t)return;o?this.$backdrop.one("bsTransitionEnd",t).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION):t()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var a=function(){i.removeBackdrop(),t&&t()};e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",a).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION):a()}else t&&t()},n.prototype.handleUpdate=function(){this.adjustDialog()},n.prototype.adjustDialog=function(){var e=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&e?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!e?this.scrollbarWidth:""})},n.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},n.prototype.checkScrollbar=function(){var e=window.innerWidth;if(!e){var t=document.documentElement.getBoundingClientRect();e=t.right-Math.abs(t.left)}this.bodyIsOverflowing=document.body.clientWidth<e,this.scrollbarWidth=this.measureScrollbar()},n.prototype.setScrollbar=function(){var e=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",e+this.scrollbarWidth)},n.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},n.prototype.measureScrollbar=function(){var e=document.createElement("div");e.className="modal-scrollbar-measure",this.$body.append(e);var t=e.offsetWidth-e.clientWidth;return this.$body[0].removeChild(e),t};var i=e.fn.modal;e.fn.modal=t,e.fn.modal.Constructor=n,e.fn.modal.noConflict=function(){return e.fn.modal=i,this},e(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(n){var i=e(this),r=i.attr("href"),o=e(i.attr("data-target")||r&&r.replace(/.*(?=#[^\s]+$)/,"")),a=o.data("bs.modal")?"toggle":e.extend({remote:!/#/.test(r)&&r},o.data(),i.data());i.is("a")&&n.preventDefault(),o.one("show.bs.modal",function(e){e.isDefaultPrevented()||o.one("hidden.bs.modal",function(){i.is(":visible")&&i.trigger("focus")})}),t.call(o,a,this)})}(jQuery),function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var n=this._events=this._events||{},i=n[e]=n[e]||[];return-1==i.indexOf(t)&&i.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var n=this._onceEvents=this._onceEvents||{};return(n[e]=n[e]||{})[t]=!0,this}},t.off=function(e,t){var n=this._events&&this._events[e];if(n&&n.length){var i=n.indexOf(t);return-1!=i&&n.splice(i,1),this}},t.emitEvent=function(e,t){var n=this._events&&this._events[e];if(n&&n.length){var i=0,r=n[i];t=t||[];for(var o=this._onceEvents&&this._onceEvents[e];r;){var a=o&&o[r];a&&(this.off(e,r),delete o[r]),r.apply(this,t),r=n[i+=a?0:1]}return this}},t.allOff=t.removeAllListeners=function(){delete this._events,delete this._onceEvents},e})