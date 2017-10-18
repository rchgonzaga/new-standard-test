if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.4", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.4", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        a && this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.4", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = c(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f)))
        }))
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.4", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function(b) {
        if (/(38|40|27|32)/.test(b.which) && !/input|textarea/i.test(b.target.tagName)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d),
                    g = e.hasClass("open");
                if (!g && 27 != b.which || g && 27 == b.which) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(b.target);
                    38 == b.which && j > 0 && j--, 40 == b.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in").attr("aria-hidden", !1), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c && c.$tip && c.$tip.is(":visible") ? void(c.hoverState = "in") : (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.options.container ? a(this.options.container) : this.$element.parent(),
                    p = this.getPosition(o);
                h = "bottom" == h && k.bottom + m > p.bottom ? "top" : "top" == h && k.top - m < p.top ? "bottom" : "right" == h && k.right + l > p.width ? "left" : "left" == h && k.left - l < p.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var q = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(q, h);
            var r = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", r).emulateTransitionEnd(c.TRANSITION_DURATION) : r()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
                top: 0,
                left: 0
            } : b.offset(),
            g = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            h = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, g, h, f)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type)
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.4", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.4", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.4", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
        if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = a(document.body).height();
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);
! function($) {
    'use strict';
    var cellHeight = 37;
    var cachedWidth = null;
    var sprintf = function(str) {
        var args = arguments,
            flag = true,
            i = 1;
        str = str.replace(/%s/g, function() {
            var arg = args[i++];
            if (typeof arg === 'undefined') {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    };
    var getPropertyFromOther = function(list, from, to, value) {
        var result = '';
        $.each(list, function(i, item) {
            if (item[from] === value) {
                result = item[to];
                return false;
            }
            return true;
        });
        return result;
    };
    var getFieldIndex = function(columns, field) {
        var index = -1;
        $.each(columns, function(i, column) {
            if (column.field === field) {
                index = i;
                return false;
            }
            return true;
        });
        return index;
    };
    var getScrollBarWidth = function() {
        if (cachedWidth === null) {
            var inner = $('<p/>').addClass('fixed-table-scroll-inner'),
                outer = $('<div/>').addClass('fixed-table-scroll-outer'),
                w1, w2;
            outer.append(inner);
            $('body').append(outer);
            w1 = inner[0].offsetWidth;
            outer.css('overflow', 'scroll');
            w2 = inner[0].offsetWidth;
            if (w1 === w2) {
                w2 = outer[0].clientWidth;
            }
            outer.remove();
            cachedWidth = w1 - w2;
        }
        return cachedWidth;
    };
    var calculateObjectValue = function(self, name, args, defaultValue) {
        if (typeof name === 'string') {
            var names = name.split('.');
            if (names.length > 1) {
                name = window;
                $.each(names, function(i, f) {
                    name = name[f];
                });
            } else {
                name = window[name];
            }
        }
        if (typeof name === 'object') {
            return name;
        }
        if (typeof name === 'function') {
            return name.apply(self, args);
        }
        return defaultValue;
    };
    var escapeHTML = function(text) {
        if (typeof text === 'string') {
            return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        }
        return text;
    };
    var BootstrapTable = function(el, options) {
        this.options = options;
        this.$el = $(el);
        this.$el_ = this.$el.clone();
        this.timeoutId_ = 0;
        this.timeoutFooter_ = 0;
        this.init();
    };
    BootstrapTable.DEFAULTS = {
        classes: 'table table-hover',
        height: undefined,
        undefinedText: '-',
        sortName: undefined,
        sortOrder: 'asc',
        striped: false,
        columns: [],
        data: [],
        method: 'get',
        url: undefined,
        cache: true,
        contentType: 'application/json',
        dataType: 'json',
        ajaxOptions: {},
        queryParams: function(params) {
            return params;
        },
        queryParamsType: 'limit',
        responseHandler: function(res) {
            return res;
        },
        pagination: false,
        sidePagination: 'client',
        totalRows: 0,
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 25, 50, 100],
        paginationHAlign: 'right',
        paginationVAlign: 'bottom',
        paginationDetailHAlign: 'left',
        search: false,
        searchAlign: 'right',
        selectItemName: 'btSelectItem',
        showHeader: true,
        showFooter: false,
        showColumns: false,
        showPaginationSwitch: false,
        showRefresh: false,
        showToggle: false,
        buttonsAlign: 'right',
        smartDisplay: true,
        minimumCountColumns: 1,
        idField: undefined,
        uniqueId: undefined,
        cardView: false,
        trimOnSearch: true,
        clickToSelect: false,
        singleSelect: false,
        toolbar: undefined,
        toolbarAlign: 'left',
        checkboxHeader: true,
        sortable: true,
        maintainSelected: false,
        searchTimeOut: 500,
        keyEvents: false,
        searchText: '',
        iconSize: undefined,
        iconsPrefix: 'glyphicon',
        icons: {
            paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
            paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
            refresh: 'glyphicon-refresh icon-refresh',
            toggle: 'glyphicon-list-alt icon-list-alt',
            columns: 'glyphicon-th icon-th'
        },
        rowStyle: function(row, index) {
            return {};
        },
        rowAttributes: function(row, index) {
            return {};
        },
        onAll: function(name, args) {
            return false;
        },
        onClickRow: function(item, $element) {
            return false;
        },
        onDblClickRow: function(item, $element) {
            return false;
        },
        onSort: function(name, order) {
            return false;
        },
        onCheck: function(row) {
            return false;
        },
        onUncheck: function(row) {
            return false;
        },
        onCheckAll: function() {
            return false;
        },
        onUncheckAll: function() {
            return false;
        },
        onLoadSuccess: function(data) {
            return false;
        },
        onLoadError: function(status) {
            return false;
        },
        onColumnSwitch: function(field, checked) {
            return false;
        },
        onColumnSearch: function(field, text) {
            return false;
        },
        onPageChange: function(number, size) {
            return false;
        },
        onSearch: function(text) {
            return false;
        },
        onPreBody: function(data) {
            return false;
        },
        onPostBody: function() {
            return false;
        },
        onPostHeader: function() {
            return false;
        }
    };
    BootstrapTable.LOCALES = [];
    BootstrapTable.LOCALES['en-US'] = {
        formatLoadingMessage: function() {
            return 'Loading, please wait...';
        },
        formatRecordsPerPage: function(pageNumber) {
            return sprintf('%s records per page', pageNumber);
        },
        formatShowingRows: function(pageFrom, pageTo, totalRows) {
            return sprintf('Showing %s to %s of %s rows', pageFrom, pageTo, totalRows);
        },
        formatSearch: function() {
            return 'Search';
        },
        formatNoMatches: function() {
            return 'No matching records found';
        },
        formatPaginationSwitch: function() {
            return 'Hide/Show pagination';
        },
        formatRefresh: function() {
            return 'Refresh';
        },
        formatToggle: function() {
            return 'Toggle';
        },
        formatColumns: function() {
            return 'Columns';
        },
        formatAllRows: function() {
            return 'All';
        }
    };
    $.extend(BootstrapTable.DEFAULTS, BootstrapTable.LOCALES['en-US']);
    BootstrapTable.COLUMN_DEFAULTS = {
        radio: false,
        checkbox: false,
        checkboxEnabled: true,
        field: undefined,
        title: undefined,
        'class': undefined,
        align: undefined,
        halign: undefined,
        falign: undefined,
        valign: undefined,
        width: undefined,
        sortable: false,
        order: 'asc',
        visible: true,
        switchable: true,
        clickToSelect: true,
        formatter: undefined,
        footerFormatter: undefined,
        events: undefined,
        sorter: undefined,
        cellStyle: undefined,
        searchable: true,
        cardVisible: true,
        filterControl: undefined
    };
    BootstrapTable.EVENTS = {
        'all.bs.table': 'onAll',
        'click-row.bs.table': 'onClickRow',
        'dbl-click-row.bs.table': 'onDblClickRow',
        'sort.bs.table': 'onSort',
        'check.bs.table': 'onCheck',
        'uncheck.bs.table': 'onUncheck',
        'check-all.bs.table': 'onCheckAll',
        'uncheck-all.bs.table': 'onUncheckAll',
        'load-success.bs.table': 'onLoadSuccess',
        'load-error.bs.table': 'onLoadError',
        'column-switch.bs.table': 'onColumnSwitch',
        'column-search.bs.table': 'onColumnSearch',
        'page-change.bs.table': 'onPageChange',
        'search.bs.table': 'onSearch',
        'pre-body.bs.table': 'onPreBody',
        'post-body.bs.table': 'onPostBody',
        'post-header.bs.table': 'onPostHeader'
    };
    BootstrapTable.prototype.init = function() {
        this.initContainer();
        this.initTable();
        this.initHeader();
        this.initData();
        this.initFooter();
        this.initToolbar();
        this.initPagination();
        this.initBody();
        this.initServer();
        this.initKeyEvents();
    };
    BootstrapTable.prototype.initContainer = function() {
        this.$container = $(['<div class="bootstrap-table">', '<div class="fixed-table-toolbar"></div>', this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ? '<div class="fixed-table-pagination" style="clear: both;"></div>' : '', '<div class="fixed-table-container">', '<div class="fixed-table-header"><table></table></div>', '<div class="fixed-table-body">', '<div class="fixed-table-loading">', this.options.formatLoadingMessage(), '</div>', '</div>', '<div class="fixed-table-footer"><table><tr></tr></table></div>', this.options.paginationVAlign === 'bottom' || this.options.paginationVAlign === 'both' ? '<div class="fixed-table-pagination"></div>' : '', '</div>', '</div>'].join(''));
        this.$container.insertAfter(this.$el);
        this.$container.find('.fixed-table-body').append(this.$el);
        this.$container.after('<div class="clearfix"></div>');
        this.$loading = this.$container.find('.fixed-table-loading');
        this.$el.addClass(this.options.classes);
        if (this.options.striped) {
            this.$el.addClass('table-striped');
        }
    };
    BootstrapTable.prototype.initTable = function() {
        var that = this,
            columns = [],
            data = [];
        this.$header = this.$el.find('thead');
        if (!this.$header.length) {
            this.$header = $('<thead></thead>').appendTo(this.$el);
        }
        if (!this.$header.find('tr').length) {
            this.$header.append('<tr></tr>');
        }
        this.$header.find('th').each(function() {
            var column = $.extend({}, {
                title: $(this).html(),
                'class': $(this).attr('class')
            }, $(this).data());
            columns.push(column);
        });
        this.options.columns = $.extend(true, [], columns, this.options.columns);
        $.each(this.options.columns, function(i, column) {
            that.options.columns[i] = $.extend({}, BootstrapTable.COLUMN_DEFAULTS, {
                field: i
            }, column);
        });
        if (this.options.data.length) {
            return;
        }
        this.$el.find('tbody tr').each(function() {
            var row = {};
            row._id = $(this).attr('id');
            row._class = $(this).attr('class');
            $(this).find('td').each(function(i) {
                var field = that.options.columns[i].field;
                row[field] = $(this).html();
                row['_' + field + '_id'] = $(this).attr('id');
                row['_' + field + '_class'] = $(this).attr('class');
                row['_' + field + '_data'] = $(this).data();
            });
            data.push(row);
        });
        this.options.data = data;
    };
    BootstrapTable.prototype.initHeader = function() {
        var that = this,
            visibleColumns = [],
            html = [],
            addedFilterControl = false,
            timeoutId = 0;
        this.header = {
            fields: [],
            styles: [],
            classes: [],
            formatters: [],
            events: [],
            sorters: [],
            cellStyles: [],
            clickToSelects: [],
            searchables: []
        };
        $.each(this.options.columns, function(i, column) {
            var text = '',
                halign = '',
                align = '',
                style = '',
                class_ = sprintf(' class="%s"', column['class']),
                order = that.options.sortOrder || column.order,
                searchable = true,
                unitWidth = 'px',
                isVisible = 'hidden';
            if (!column.visible) {
                return;
            }
            if (that.options.cardView && (!column.cardVisible)) {
                return;
            }
            if (column.width !== undefined) {
                if (typeof column.width === 'string') {
                    if (column.width.indexOf('%') > -1) {
                        unitWidth = '%'
                    }
                    column.width = column.width.replace('%', '').replace('px', '');
                }
            }
            halign = sprintf('text-align: %s; ', column.halign ? column.halign : column.align);
            align = sprintf('text-align: %s; ', column.align);
            style = sprintf('vertical-align: %s; ', column.valign);
            style += sprintf('width: %s' + unitWidth + '; ', column.checkbox || column.radio ? 36 : column.width);
            visibleColumns.push(column);
            that.header.fields.push(column.field);
            that.header.styles.push(align + style);
            that.header.classes.push(class_);
            that.header.formatters.push(column.formatter);
            that.header.events.push(column.events);
            that.header.sorters.push(column.sorter);
            that.header.cellStyles.push(column.cellStyle);
            that.header.clickToSelects.push(column.clickToSelect);
            that.header.searchables.push(column.searchable);
            html.push('<th', column.checkbox || column.radio ? sprintf(' class="bs-checkbox %s"', column['class'] || '') : class_, sprintf(' style="%s"', halign + style), '>');
            html.push(sprintf('<div class="th-inner %s">', that.options.sortable && column.sortable ? 'sortable' : ''));
            text = column.title;
            if (that.options.sortName === column.field && that.options.sortable && column.sortable) {
                text += that.getCaretHtml();
            }
            if (column.checkbox) {
                if (!that.options.singleSelect && that.options.checkboxHeader) {
                    text = '<input name="btSelectAll" type="checkbox" />';
                }
                that.header.stateField = column.field;
            }
            if (column.radio) {
                text = '';
                that.header.stateField = column.field;
                that.options.singleSelect = true;
            }
            html.push(text);
            html.push('</div>');
            html.push('<div class="fht-cell"></div>');
            html.push('<div style="margin: 0px 2px 2px 2px;" class="filterControl">');
            if (column.filterControl && column.searchable) {
                addedFilterControl = true;
                isVisible = 'visible'
            }
            if (column.filterControl !== undefined) {
                switch (column.filterControl.toLowerCase()) {
                    case 'input':
                        html.push(sprintf('<input type="text" class="form-control" style="width: 100%; visibility: %s">', isVisible));
                        break;
                    case 'select':
                        html.push(sprintf('<select class="%s form-control" style="width: 100%; visibility: %s"></select>', column.field, isVisible))
                        break;
                }
            } else {
                html.push('<div style="height: 34px;"></div>');
            }
            html.push('</div>');
            html.push('</th>');
        });
        this.$header.find('tr').html(html.join(''));
        this.$header.find('th').each(function(i) {
            $(this).data(visibleColumns[i]);
        });
        this.$container.off('click', '.th-inner').on('click', '.th-inner', function(event) {
            if (that.options.sortable && $(this).parent().data().sortable) {
                that.onSort(event);
            }
        });
        if (!this.options.showHeader || this.options.cardView) {
            this.$header.hide();
            this.$container.find('.fixed-table-header').hide();
            this.$loading.css('top', 0);
        } else {
            this.$header.show();
            this.$container.find('.fixed-table-header').show();
            this.$loading.css('top', cellHeight + 'px');
        }
        this.$selectAll = this.$header.find('[name="btSelectAll"]');
        this.$container.off('click', '[name="btSelectAll"]').on('click', '[name="btSelectAll"]', function() {
            var checked = $(this).prop('checked');
            that[checked ? 'checkAll' : 'uncheckAll']();
        });
        if (addedFilterControl) {
            this.$header.off('keyup', 'input').on('keyup', 'input', function(event) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function() {
                    that.onColumnSearch(event);
                }, that.options.searchTimeOut);
            });
            this.$header.off('change', 'select').on('change', 'select', function(event) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function() {
                    that.onColumnSearch(event);
                }, that.options.searchTimeOut);
            });
        } else {
            this.$header.find('.filterControl').hide();
        }
    };
    BootstrapTable.prototype.initFooter = function() {
        this.$footer = this.$container.find('.fixed-table-footer');
        if (!this.options.showFooter || this.options.cardView) {
            this.$footer.hide();
        } else {
            this.$footer.show();
        }
    };
    BootstrapTable.prototype.initData = function(data, type) {
        if (type === 'append') {
            this.data = this.data.concat(data);
        } else if (type === 'prepend') {
            this.data = [].concat(data).concat(this.data);
        } else {
            this.data = data || this.options.data;
        }
        this.options.data = this.data;
        if (this.options.sidePagination === 'server') {
            return;
        }
        this.initSort();
    };
    BootstrapTable.prototype.initSort = function() {
        var that = this,
            name = this.options.sortName,
            order = this.options.sortOrder === 'desc' ? -1 : 1,
            index = $.inArray(this.options.sortName, this.header.fields);
        if (index !== -1) {
            this.data.sort(function(a, b) {
                var aa = a[name],
                    bb = b[name],
                    value = calculateObjectValue(that.header, that.header.sorters[index], [aa, bb]);
                if (value !== undefined) {
                    return order * value;
                }
                if (value !== undefined) {
                    return order * value;
                }
                if (aa === undefined || aa === null) {
                    aa = '';
                }
                if (bb === undefined || bb === null) {
                    bb = '';
                }
                if ($.isNumeric(aa) && $.isNumeric(bb)) {
                    aa = parseFloat(aa);
                    bb = parseFloat(bb);
                    if (aa < bb) {
                        return order * -1;
                    }
                    return order;
                }
                if (aa === bb) {
                    return 0;
                }
                if (typeof aa !== 'string') {
                    aa = aa.toString();
                }
                if (aa.localeCompare(bb) === -1) {
                    return order * -1;
                }
                return order;
            });
        }
    };
    BootstrapTable.prototype.onSort = function(event) {
        var $this = $(event.currentTarget).parent(),
            $this_ = this.$header.find('th').eq($this.index());
        this.$header.add(this.$header_).find('span.order').remove();
        if (this.options.sortName === $this.data('field')) {
            this.options.sortOrder = this.options.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.options.sortName = $this.data('field');
            this.options.sortOrder = $this.data('order') === 'asc' ? 'desc' : 'asc';
        }
        this.trigger('sort', this.options.sortName, this.options.sortOrder);
        $this.add($this_).data('order', this.options.sortOrder).find('.th-inner').append(this.getCaretHtml());
        if (this.options.sidePagination === 'server') {
            this.initServer();
            return;
        }
        this.initSort();
        this.initBody();
    };
    BootstrapTable.prototype.initToolbar = function() {
        var that = this,
            html = [],
            timeoutId = 0,
            $keepOpen, $search, switchableCount = 0;
        this.$toolbar = this.$container.find('.fixed-table-toolbar').html('');
        if (typeof this.options.toolbar === 'string') {
            $(sprintf('<div class="bars pull-%s"></div>', this.options.toolbarAlign)).appendTo(this.$toolbar).append($(this.options.toolbar));
        }
        html = [sprintf('<div class="columns columns-%s btn-group pull-%s">', this.options.buttonsAlign, this.options.buttonsAlign)];
        if (typeof this.options.icons === 'string') {
            this.options.icons = calculateObjectValue(null, this.options.icons);
        }
        if (this.options.showPaginationSwitch) {
            html.push(sprintf('<button class="btn btn-default" type="button" name="paginationSwitch" title="%s">', this.options.formatPaginationSwitch()), sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.paginationSwitchDown), '</button>');
        }
        if (this.options.showRefresh) {
            html.push(sprintf('<button class="btn btn-default' + (this.options.iconSize === undefined ? '' : ' btn-' + this.options.iconSize) + '" type="button" name="refresh" title="%s">', this.options.formatRefresh()), sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.refresh), '</button>');
        }
        if (this.options.showToggle) {
            html.push(sprintf('<button class="btn btn-default' + (this.options.iconSize === undefined ? '' : ' btn-' + this.options.iconSize) + '" type="button" name="toggle" title="%s">', this.options.formatToggle()), sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.toggle), '</button>');
        }
        if (this.options.showColumns) {
            html.push(sprintf('<div class="keep-open btn-group" title="%s">', this.options.formatColumns()), '<button type="button" class="btn btn-default' + (this.options.iconSize == undefined ? '' : ' btn-' + this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.columns), ' <span class="caret"></span>', '</button>', '<ul class="dropdown-menu" role="menu">');
            $.each(this.options.columns, function(i, column) {
                if (column.radio || column.checkbox) {
                    return;
                }
                if (that.options.cardView && (!column.cardVisible)) {
                    return;
                }
                var checked = column.visible ? ' checked="checked"' : '';
                if (column.switchable) {
                    html.push(sprintf('<li>' + '<label><input type="checkbox" data-field="%s" value="%s"%s> %s</label>' + '</li>', column.field, i, checked, column.title));
                    switchableCount++;
                }
            });
            html.push('</ul>', '</div>');
        }
        html.push('</div>');
        if (this.showToolbar || html.length > 2) {
            this.$toolbar.append(html.join(''));
        }
        if (this.options.showPaginationSwitch) {
            this.$toolbar.find('button[name="paginationSwitch"]').off('click').on('click', $.proxy(this.togglePagination, this));
        }
        if (this.options.showRefresh) {
            this.$toolbar.find('button[name="refresh"]').off('click').on('click', $.proxy(this.refresh, this));
        }
        if (this.options.showToggle) {
            this.$toolbar.find('button[name="toggle"]').off('click').on('click', function() {
                that.toggleView();
            });
        }
        if (this.options.showColumns) {
            $keepOpen = this.$toolbar.find('.keep-open');
            if (switchableCount <= this.options.minimumCountColumns) {
                $keepOpen.find('input').prop('disabled', true);
            }
            $keepOpen.find('li').off('click').on('click', function(event) {
                event.stopImmediatePropagation();
            });
            $keepOpen.find('input').off('click').on('click', function() {
                var $this = $(this);
                that.toggleColumn($this.val(), $this.prop('checked'), false);
                that.trigger('column-switch', $(this).data('field'), $this.prop('checked'));
            });
        }
        if (this.options.search) {
            html = [];
            html.push('<div class="pull-' + this.options.searchAlign + ' search">', sprintf('<input class="form-control' + (this.options.iconSize === undefined ? '' : ' input-' + this.options.iconSize) + '" type="text" placeholder="%s">', this.options.formatSearch()), '</div>');
            this.$toolbar.append(html.join(''));
            $search = this.$toolbar.find('.search input');
            $search.off('keyup').on('keyup', function(event) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function() {
                    that.onSearch(event);
                }, that.options.searchTimeOut);
            });
            if (this.options.searchText !== '') {
                $search.val(this.options.searchText);
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function() {
                    $search.trigger('keyup');
                }, that.options.searchTimeOut);
            }
        }
    };
    BootstrapTable.prototype.onSearch = function(event) {
        var text = $.trim($(event.currentTarget).val());
        if (this.options.trimOnSearch && $(event.currentTarget).val() !== text) {
            $(event.currentTarget).val(text);
        }
        if (text === this.searchText) {
            return;
        }
        this.searchText = text;
        this.options.pageNumber = 1;
        this.initSearch();
        this.updatePagination();
        this.trigger('search', text);
    };
    BootstrapTable.prototype.onColumnSearch = function(event, isSelectControl) {
        var text = $.trim($(event.currentTarget).val());
        var $field = $(event.currentTarget).parent().parent().data('field')
        if ($.isEmptyObject(this.filterColumnsPartial)) {
            this.filterColumnsPartial = {};
        }
        if (text) {
            this.filterColumnsPartial[$field] = text;
        } else {
            delete this.filterColumnsPartial[$field];
        }
        this.options.pageNumber = 1;
        this.initSearch();
        this.updatePagination();
    };
    BootstrapTable.prototype.initSearch = function() {
        var that = this;
        if (this.options.sidePagination !== 'server') {
            var s = this.searchText && this.searchText.toLowerCase();
            var f = $.isEmptyObject(this.filterColumns) ? null : this.filterColumns;
            var fp = $.isEmptyObject(this.filterColumnsPartial) ? null : this.filterColumnsPartial;
            this.data = f ? $.grep(this.options.data, function(item, i) {
                for (var key in f) {
                    if (item[key] !== f[key]) {
                        return false;
                    }
                }
                return true;
            }) : this.options.data;
            this.data = fp ? $.grep(this.data, function(item, i) {
                for (var key in fp) {
                    var fval = fp[key].toLowerCase();
                    var value = item[key];
                    value = calculateObjectValue(that.header, that.header.formatters[$.inArray(key, that.header.fields)], [value, item, i], value);
                    if (!($.inArray(key, that.header.fields) !== -1 && (typeof value === 'string' || typeof value === 'number') && (value + '').toLowerCase().indexOf(fval) !== -1)) {
                        return false;
                    }
                }
                return true;
            }) : this.data;
            this.data = s ? $.grep(this.data, function(item, i) {
                for (var key in item) {
                    key = $.isNumeric(key) ? parseInt(key, 10) : key;
                    var value = item[key];
                    value = calculateObjectValue(that.header, that.header.formatters[$.inArray(key, that.header.fields)], [value, item, i], value);
                    var index = $.inArray(key, that.header.fields);
                    if (index !== -1 && that.header.searchables[index] && (typeof value === 'string' || typeof value === 'number') && (value + '').toLowerCase().indexOf(s) !== -1) {
                        return true;
                    }
                }
                return false;
            }) : this.data;
        }
    };
    BootstrapTable.prototype.initPagination = function() {
        this.$pagination = this.$container.find('.fixed-table-pagination');
        if (!this.options.pagination) {
            this.$pagination.hide();
            return;
        } else {
            this.$pagination.show();
        }
        var that = this,
            html = [],
            $allSelected = false,
            i, from, to, $pageList, $first, $pre, $next, $last, $number, data = this.getData();
        if (this.options.sidePagination !== 'server') {
            this.options.totalRows = data.length;
        }
        this.totalPages = 0;
        if (this.options.totalRows) {
            if (this.options.pageSize === this.options.formatAllRows()) {
                this.options.pageSize = this.options.totalRows;
                $allSelected = true;
            } else if (this.options.pageSize === this.options.totalRows) {
                var pageLst = typeof this.options.pageList === 'string' ? this.options.pageList.replace('[', '').replace(']', '').replace(/ /g, '').toLowerCase().split(',') : this.options.pageList;
                if (pageLst.indexOf(this.options.formatAllRows().toLowerCase()) > -1) {
                    $allSelected = true;
                }
            }
            this.totalPages = ~~((this.options.totalRows - 1) / this.options.pageSize) + 1;
            this.options.totalPages = this.totalPages;
        }
        if (this.totalPages > 0 && this.options.pageNumber > this.totalPages) {
            this.options.pageNumber = this.totalPages;
        }
        this.pageFrom = (this.options.pageNumber - 1) * this.options.pageSize + 1;
        this.pageTo = this.options.pageNumber * this.options.pageSize;
        if (this.pageTo > this.options.totalRows) {
            this.pageTo = this.options.totalRows;
        }
        html.push('<div class="pull-' + this.options.paginationDetailHAlign + ' pagination-detail">', '<span class="pagination-info">', this.options.formatShowingRows(this.pageFrom, this.pageTo, this.options.totalRows), '</span>');
        html.push('<span class="page-list">');
        var pageNumber = [sprintf('<span class="btn-group %s">', this.options.paginationVAlign === 'top' || this.options.paginationVAlign === 'both' ? 'dropdown' : 'dropup'), '<button type="button" class="btn btn-default ' + (this.options.iconSize === undefined ? '' : ' btn-' + this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', '<span class="page-size">', $allSelected ? this.options.formatAllRows() : this.options.pageSize, '</span>', ' <span class="caret"></span>', '</button>', '<ul class="dropdown-menu" role="menu">'],
            pageList = this.options.pageList;
        if (typeof this.options.pageList === 'string') {
            var list = this.options.pageList.replace('[', '').replace(']', '').replace(/ /g, '').split(',');
            pageList = [];
            $.each(list, function(i, value) {
                pageList.push(value.toUpperCase() === that.options.formatAllRows().toUpperCase() ? that.options.formatAllRows() : +value);
            });
        }
        $.each(pageList, function(i, page) {
            if (!that.options.smartDisplay || i === 0 || pageList[i - 1] <= that.options.totalRows) {
                var active;
                if ($allSelected) {
                    active = page === that.options.formatAllRows() ? ' class="active"' : '';
                } else {
                    active = page === that.options.pageSize ? ' class="active"' : '';
                }
                pageNumber.push(sprintf('<li%s><a href="javascript:void(0)">%s</a></li>', active, page));
            }
        });
        pageNumber.push('</ul></span>');
        html.push(this.options.formatRecordsPerPage(pageNumber.join('')));
        html.push('</span>');
        html.push('</div>', '<div class="pull-' + this.options.paginationHAlign + '">', '<ul class="pagination' + (this.options.iconSize === undefined ? '' : ' pagination-' + this.options.iconSize) + '">', '<li class="page-first"><a href="javascript:void(0)">&lt;&lt;</a></li>', '<li class="page-pre"><a href="javascript:void(0)">&lt;</a></li>');
        if (this.totalPages < 5) {
            from = 1;
            to = this.totalPages;
        } else {
            from = this.options.pageNumber - 2;
            to = from + 4;
            if (from < 1) {
                from = 1;
                to = 5;
            }
            if (to > this.totalPages) {
                to = this.totalPages;
                from = to - 4;
            }
        }
        for (i = from; i <= to; i++) {
            html.push('<li class="page-number' + (i === this.options.pageNumber ? ' active' : '') + '">', '<a href="javascript:void(0)">', i, '</a>', '</li>');
        }
        html.push('<li class="page-next"><a href="javascript:void(0)">&gt;</a></li>', '<li class="page-last"><a href="javascript:void(0)">&gt;&gt;</a></li>', '</ul>', '</div>');
        this.$pagination.html(html.join(''));
        $pageList = this.$pagination.find('.page-list a');
        $first = this.$pagination.find('.page-first');
        $pre = this.$pagination.find('.page-pre');
        $next = this.$pagination.find('.page-next');
        $last = this.$pagination.find('.page-last');
        $number = this.$pagination.find('.page-number');
        if (this.options.pageNumber <= 1) {
            $first.addClass('disabled');
            $pre.addClass('disabled');
        }
        if (this.options.pageNumber >= this.totalPages) {
            $next.addClass('disabled');
            $last.addClass('disabled');
        }
        if (this.options.smartDisplay) {
            if (this.totalPages <= 1) {
                this.$pagination.find('div.pagination').hide();
            }
            if (pageList.length < 2 || this.options.totalRows <= pageList[0]) {
                this.$pagination.find('span.page-list').hide();
            }
            this.$pagination[this.getData().length ? 'show' : 'hide']();
        }
        if ($allSelected) {
            this.options.pageSize = this.options.formatAllRows();
        }
        $pageList.off('click').on('click', $.proxy(this.onPageListChange, this));
        $first.off('click').on('click', $.proxy(this.onPageFirst, this));
        $pre.off('click').on('click', $.proxy(this.onPagePre, this));
        $next.off('click').on('click', $.proxy(this.onPageNext, this));
        $last.off('click').on('click', $.proxy(this.onPageLast, this));
        $number.off('click').on('click', $.proxy(this.onPageNumber, this));
    };
    BootstrapTable.prototype.updatePagination = function(event) {
        if (event && $(event.currentTarget).hasClass('disabled')) {
            return;
        }
        if (!this.options.maintainSelected) {
            this.resetRows();
        }
        this.initPagination();
        if (this.options.sidePagination === 'server') {
            this.initServer();
        } else {
            this.initBody();
        }
        this.trigger('page-change', this.options.pageNumber, this.options.pageSize);
    };
    BootstrapTable.prototype.onPageListChange = function(event) {
        var $this = $(event.currentTarget);
        $this.parent().addClass('active').siblings().removeClass('active');
        this.options.pageSize = $this.text().toUpperCase() === this.options.formatAllRows().toUpperCase() ? this.options.formatAllRows() : +$this.text();
        this.$toolbar.find('.page-size').text(this.options.pageSize);
        this.updatePagination(event);
    };
    BootstrapTable.prototype.onPageFirst = function(event) {
        this.options.pageNumber = 1;
        this.updatePagination(event);
    };
    BootstrapTable.prototype.onPagePre = function(event) {
        this.options.pageNumber--;
        this.updatePagination(event);
    };
    BootstrapTable.prototype.onPageNext = function(event) {
        this.options.pageNumber++;
        this.updatePagination(event);
    };
    BootstrapTable.prototype.onPageLast = function(event) {
        this.options.pageNumber = this.totalPages;
        this.updatePagination(event);
    };
    BootstrapTable.prototype.onPageNumber = function(event) {
        if (this.options.pageNumber === +$(event.currentTarget).text()) {
            return;
        }
        this.options.pageNumber = +$(event.currentTarget).text();
        this.updatePagination(event);
    };
    BootstrapTable.prototype.initBody = function(fixedScroll) {
        var that = this,
            html = [],
            data = this.getData();
        this.trigger('pre-body', data);
        this.$body = this.$el.find('tbody');
        if (!this.$body.length) {
            this.$body = $('<tbody></tbody>').appendTo(this.$el);
        }
        if (!this.options.pagination || this.options.sidePagination === 'server') {
            this.pageFrom = 1;
            this.pageTo = data.length;
        }
        for (var i = this.pageFrom - 1; i < this.pageTo; i++) {
            var key, item = data[i],
                style = {},
                csses = [],
                attributes = {},
                htmlAttributes = [];
            style = calculateObjectValue(this.options, this.options.rowStyle, [item, i], style);
            if (style && style.css) {
                for (key in style.css) {
                    csses.push(key + ': ' + style.css[key]);
                }
            }
            attributes = calculateObjectValue(this.options, this.options.rowAttributes, [item, i], attributes);
            if (attributes) {
                for (key in attributes) {
                    htmlAttributes.push(sprintf('%s="%s"', key, escapeHTML(attributes[key])));
                }
            }
            html.push('<tr', sprintf(' %s', htmlAttributes.join(' ')), sprintf(' id="%s"', $.isArray(item) ? undefined : item._id), sprintf(' class="%s"', style.classes || ($.isArray(item) ? undefined : item._class)), sprintf(' data-index="%s"', i), sprintf(' data-unique-id="%s"', item[this.options.uniqueId]), '>');
            if (this.options.cardView) {
                html.push(sprintf('<td colspan="%s">', this.header.fields.length));
            }
            $.each(this.header.fields, function(j, field) {
                var text = '',
                    value = item[field],
                    type = '',
                    cellStyle = {},
                    id_ = '',
                    class_ = that.header.classes[j],
                    data_ = '',
                    column = that.options.columns[getFieldIndex(that.options.columns, field)];
                style = sprintf('style="%s"', csses.concat(that.header.styles[j]).join('; '));
                value = calculateObjectValue(that.header, that.header.formatters[j], [value, item, i], value);
                if (item['_' + field + '_id']) {
                    id_ = sprintf(' id="%s"', item['_' + field + '_id']);
                }
                if (item['_' + field + '_class']) {
                    class_ = sprintf(' class="%s"', item['_' + field + '_class']);
                }
                cellStyle = calculateObjectValue(that.header, that.header.cellStyles[j], [value, item, i], cellStyle);
                if (cellStyle.classes) {
                    class_ = sprintf(' class="%s"', cellStyle.classes);
                }
                if (cellStyle.css) {
                    var csses_ = [];
                    for (var key in cellStyle.css) {
                        csses_.push(key + ': ' + cellStyle.css[key]);
                    }
                    style = sprintf('style="%s"', csses_.concat(that.header.styles[j]).join('; '));
                }
                if (item['_' + field + '_data'] && !$.isEmptyObject(item['_' + field + '_data'])) {
                    $.each(item['_' + field + '_data'], function(k, v) {
                        if (k === 'index') {
                            return;
                        }
                        data_ += sprintf(' data-%s="%s"', k, v);
                    });
                }
                if (column.checkbox || column.radio) {
                    type = column.checkbox ? 'checkbox' : type;
                    type = column.radio ? 'radio' : type;
                    text = [that.options.cardView ? '<div class="card-view">' : '<td class="bs-checkbox">', '<input' +
                        sprintf(' data-index="%s"', i) +
                        sprintf(' name="%s"', that.options.selectItemName) +
                        sprintf(' type="%s"', type) +
                        sprintf(' value="%s"', item[that.options.idField]) +
                        sprintf(' checked="%s"', value === true || (value && value.checked) ? 'checked' : undefined) +
                        sprintf(' disabled="%s"', !column.checkboxEnabled || (value && value.disabled) ? 'disabled' : undefined) + ' />', that.options.cardView ? '</div>' : '</td>'
                    ].join('');
                } else {
                    value = typeof value === 'undefined' || value === null ? that.options.undefinedText : value;
                    text = that.options.cardView ? ['<div class="card-view">', that.options.showHeader ? sprintf('<span class="title" %s>%s</span>', style, getPropertyFromOther(that.options.columns, 'field', 'title', field)) : '', sprintf('<span class="value">%s</span>', value), '</div>'].join('') : [sprintf('<td%s %s %s %s>', id_, class_, style, data_), value, '</td>'].join('');
                    if (column.filterControl !== undefined && column.filterControl.toLowerCase() === 'select' && column.searchable) {
                        var selectControl = $('.' + column.field),
                            iOpt = 0,
                            exitsOpt = false,
                            options;
                        if (selectControl !== undefined) {
                            options = selectControl.get(0).options;
                            if (options.length === 0) {
                                selectControl.append($("<option></option>").attr("value", '').text(''));
                                selectControl.append($("<option></option>").attr("value", value).text(value));
                            } else {
                                for (; iOpt < options.length; iOpt++) {
                                    if (options[iOpt].value === value) {
                                        exitsOpt = true;
                                        break;
                                    }
                                }
                                if (!exitsOpt) {
                                    selectControl.append($("<option></option>").attr("value", value).text(value));
                                }
                            }
                        }
                    }
                    if (that.options.cardView && that.options.smartDisplay && value === '') {
                        text = '';
                    }
                }
                html.push(text);
            });
            if (this.options.cardView) {
                html.push('</td>');
            }
            html.push('</tr>');
        }
        if (!html.length) {
            html.push('<tr class="no-records-found">', sprintf('<td colspan="%s">%s</td>', this.header.fields.length, this.options.formatNoMatches()), '</tr>');
        }
        this.$body.html(html.join(''));
        if (!fixedScroll) {
            this.scrollTo(0);
        }
        this.$body.find('> tr > td').off('click').on('click', function() {
            var $tr = $(this).parent();
            that.trigger('click-row', that.data[$tr.data('index')], $tr);
            if (that.options.clickToSelect) {
                if (that.header.clickToSelects[$tr.children().index($(this))]) {
                    $tr.find(sprintf('[name="%s"]', that.options.selectItemName))[0].click();
                }
            }
        });
        this.$body.find('tr').off('dblclick').on('dblclick', function() {
            that.trigger('dbl-click-row', that.data[$(this).data('index')], $(this));
        });
        this.$selectItem = this.$body.find(sprintf('[name="%s"]', this.options.selectItemName));
        this.$selectItem.off('click').on('click', function(event) {
            event.stopImmediatePropagation();
            var checked = $(this).prop('checked'),
                row = that.data[$(this).data('index')];
            row[that.header.stateField] = checked;
            that.trigger(checked ? 'check' : 'uncheck', row);
            if (that.options.singleSelect) {
                that.$selectItem.not(this).each(function() {
                    that.data[$(this).data('index')][that.header.stateField] = false;
                });
                that.$selectItem.filter(':checked').not(this).prop('checked', false);
            }
            that.updateSelected();
        });
        $.each(this.header.events, function(i, events) {
            if (!events) {
                return;
            }
            if (typeof events === 'string') {
                events = calculateObjectValue(null, events);
            }
            for (var key in events) {
                that.$body.find('tr').each(function() {
                    var $tr = $(this),
                        $td = $tr.find(that.options.cardView ? '.card-view' : 'td').eq(i),
                        index = key.indexOf(' '),
                        name = key.substring(0, index),
                        el = key.substring(index + 1),
                        func = events[key];
                    $td.find(el).off(name).on(name, function(e) {
                        var index = $tr.data('index'),
                            row = that.data[index],
                            value = row[that.header.fields[i]];
                        func.apply(this, [e, value, row, index]);
                    });
                });
            }
        });
        this.updateSelected();
        this.resetView();
        this.trigger('post-body');
    };
    BootstrapTable.prototype.initServer = function(silent, query) {
        var that = this,
            data = {},
            params = {
                pageSize: this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize,
                pageNumber: this.options.pageNumber,
                searchText: this.searchText,
                sortName: this.options.sortName,
                sortOrder: this.options.sortOrder
            };
        if (!this.options.url) {
            return;
        }
        if (this.options.queryParamsType === 'limit') {
            params = {
                search: params.searchText,
                sort: params.sortName,
                order: params.sortOrder
            };
            if (this.options.pagination) {
                params.limit = this.options.pageSize === this.options.formatAllRows() ? this.options.totalRows : this.options.pageSize;
                params.offset = this.options.pageSize === this.options.formatAllRows() ? 0 : this.options.pageSize * (this.options.pageNumber - 1);
            }
        }
        if (!($.isEmptyObject(this.filterColumnsPartial))) {
            params['filter'] = JSON.stringify(this.filterColumnsPartial, null);
        }
        data = calculateObjectValue(this.options, this.options.queryParams, [params], data);
        $.extend(data, query || {});
        if (data === false) {
            return;
        }
        if (!silent) {
            this.$loading.show();
        }
        $.ajax($.extend({}, calculateObjectValue(null, this.options.ajaxOptions), {
            type: this.options.method,
            url: this.options.url,
            data: this.options.contentType === 'application/json' && this.options.method === 'post' ? JSON.stringify(data) : data,
            cache: this.options.cache,
            contentType: this.options.contentType,
            dataType: this.options.dataType,
            success: function(res) {
                res = calculateObjectValue(that.options, that.options.responseHandler, [res], res);
                that.load(res);
                that.trigger('load-success', res);
            },
            error: function(res) {
                that.trigger('load-error', res.status);
            },
            complete: function() {
                if (!silent) {
                    that.$loading.hide();
                }
            }
        }));
    };
    BootstrapTable.prototype.initKeyEvents = function() {
        if (this.options.keyEvents) {
            var that = this;
            $(document).off('keypress').on('keypress', function(e) {
                var $search = that.$toolbar.find('.search input'),
                    $refresh = that.$toolbar.find('button[name="refresh"]'),
                    $toggle = that.$toolbar.find('button[name="toggle"]'),
                    $paginationSwitch = that.$toolbar.find('button[name="paginationSwitch"]');
                switch (e.keyCode) {
                    case 115:
                    case 83:
                        if (!that.options.search) {
                            return;
                        }
                        if (document.activeElement === $search.get(0)) {
                            return true;
                        }
                        $search.focus();
                        return false;
                    case 114:
                    case 82:
                        if (!that.options.showRefresh) {
                            return;
                        }
                        if (document.activeElement === $search.get(0)) {
                            return true;
                        }
                        $refresh.click();
                        return false;
                    case 116:
                    case 84:
                        if (!that.options.showToggle) {
                            return;
                        }
                        if (document.activeElement === $search.get(0)) {
                            return true;
                        }
                        $toggle.click();
                        return false;
                    case 112:
                    case 80:
                        if (!that.options.showPaginationSwitch) {
                            return;
                        }
                        if (document.activeElement === $search.get(0)) {
                            return true;
                        }
                        $paginationSwitch.click();
                        return false;
                }
            });
        }
    };
    BootstrapTable.prototype.getCaretHtml = function() {
        return ['<span class="order' + (this.options.sortOrder === 'desc' ? '' : ' dropup') + '">', '<span class="caret" style="margin: 10px 5px;"></span>', '</span>'].join('');
    };
    BootstrapTable.prototype.updateSelected = function() {
        var checkAll = this.$selectItem.filter(':enabled').length === this.$selectItem.filter(':enabled').filter(':checked').length;
        this.$selectAll.add(this.$selectAll_).prop('checked', checkAll);
        this.$selectItem.each(function() {
            $(this).parents('tr')[$(this).prop('checked') ? 'addClass' : 'removeClass']('selected');
        });
    };
    BootstrapTable.prototype.updateRows = function(checked) {
        var that = this;
        this.$selectItem.each(function() {
            that.data[$(this).data('index')][that.header.stateField] = checked;
        });
    };
    BootstrapTable.prototype.resetRows = function() {
        var that = this;
        $.each(this.data, function(i, row) {
            that.$selectAll.prop('checked', false);
            that.$selectItem.prop('checked', false);
            row[that.header.stateField] = false;
        });
    };
    BootstrapTable.prototype.trigger = function(name) {
        var args = Array.prototype.slice.call(arguments, 1);
        name += '.bs.table';
        this.options[BootstrapTable.EVENTS[name]].apply(this.options, args);
        this.$el.trigger($.Event(name), args);
        this.options.onAll(name, args);
        this.$el.trigger($.Event('all.bs.table'), [name, args]);
    };
    BootstrapTable.prototype.resetHeader = function() {
        this.$el.css('margin-top', -this.$header.height());
        clearTimeout(this.timeoutId_);
        this.timeoutId_ = setTimeout($.proxy(this.fitHeader, this), this.$el.is(':hidden') ? 100 : 0);
        return;
    };
    BootstrapTable.prototype.fitHeader = function() {
        var that = this,
            $fixedHeader, $fixedBody, scrollWidth;
        if (that.$el.is(':hidden')) {
            that.timeoutFooter_ = setTimeout($.proxy(that.fitHeader, that), 100);
            return;
        }
        $fixedHeader = that.$container.find('.fixed-table-header'), $fixedBody = that.$container.find('.fixed-table-body'), scrollWidth = that.$el.width() > $fixedBody.width() ? getScrollBarWidth() : 0;
        that.$header_ = that.$header.clone(true, true);
        that.$selectAll_ = that.$header_.find('[name="btSelectAll"]');
        $fixedHeader.css({
            'margin-right': scrollWidth
        }).find('table').css('width', that.$el.css('width')).html('').attr('class', that.$el.attr('class')).append(that.$header_);
        that.$header.find('th').each(function(i) {
            that.$header_.find('th').eq(i).data($(this).data());
        });
        that.$body.find('tr:first-child:not(.no-records-found) > *').each(function(i) {
            that.$header_.find('div.fht-cell').eq(i).width($(this).innerWidth());
        });
        $fixedBody.off('scroll').on('scroll', function() {
            $fixedHeader.scrollLeft($(this).scrollLeft());
        });
        that.trigger('post-header');
    };
    BootstrapTable.prototype.resetFooter = function() {
        var that = this,
            data = that.getData(),
            html = [];
        if (!this.options.showFooter || this.options.cardView) {
            return;
        }
        $.each(this.options.columns, function(i, column) {
            var falign = '',
                style = '',
                class_ = sprintf(' class="%s"', column['class']);
            if (!column.visible) {
                return;
            }
            if (that.options.cardView && (!column.cardVisible)) {
                return;
            }
            falign = sprintf('text-align: %s; ', column.falign ? column.falign : column.align);
            style = sprintf('vertical-align: %s; ', column.valign);
            html.push('<td', class_, sprintf(' style="%s"', falign + style), '>');
            html.push(calculateObjectValue(column, column.footerFormatter, [data], '&nbsp;') || '&nbsp;');
            html.push('</td>');
        });
        this.$footer.find('tr').html(html.join(''));
        clearTimeout(this.timeoutFooter_);
        this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this), this.$el.is(':hidden') ? 100 : 0);
    };
    BootstrapTable.prototype.fitFooter = function() {
        var that = this,
            $fixedBody, $footerTd, elWidth, scrollWidth;
        clearTimeout(this.timeoutFooter_);
        if (this.$el.is(':hidden')) {
            this.timeoutFooter_ = setTimeout($.proxy(this.fitFooter, this), 100);
            return;
        }
        $fixedBody = this.$container.find('.fixed-table-body');
        elWidth = this.$el.css('width');
        scrollWidth = elWidth > $fixedBody.width() ? getScrollBarWidth() : 0;
        this.$footer.css({
            'margin-right': scrollWidth
        }).find('table').css('width', elWidth).attr('class', this.$el.attr('class'));
        $footerTd = this.$footer.find('td');
        $fixedBody.find('tbody tr:first-child:not(.no-records-found) > td').each(function(i) {
            $footerTd.eq(i).outerWidth($(this).outerWidth());
        });
    };
    BootstrapTable.prototype.toggleColumn = function(index, checked, needUpdate) {
        if (index === -1) {
            return;
        }
        this.options.columns[index].visible = checked;
        this.initHeader();
        this.initSearch();
        this.initPagination();
        this.initBody();
        if (this.options.showColumns) {
            var $items = this.$toolbar.find('.keep-open input').prop('disabled', false);
            if (needUpdate) {
                $items.filter(sprintf('[value="%s"]', index)).prop('checked', checked);
            }
            if ($items.filter(':checked').length <= this.options.minimumCountColumns) {
                $items.filter(':checked').prop('disabled', true);
            }
        }
    };
    BootstrapTable.prototype.toggleRow = function(index, isIdField, visible) {
        if (index === -1) {
            return;
        }
        $(this.$body[0]).children().filter(sprintf(isIdField ? '[value="%s"]' : '[data-index="%s"]', index))[visible ? 'show' : 'hide']();
    };
    BootstrapTable.prototype.resetView = function(params) {
        var that = this,
            padding = 0,
            $tableContainer = that.$container.find('.fixed-table-container');
        if (params && params.height) {
            this.options.height = params.height;
        }
        this.$selectAll.prop('checked', this.$selectItem.length > 0 && this.$selectItem.length === this.$selectItem.filter(':checked').length);
        if (this.options.height) {
            var toolbarHeight = +this.$toolbar.children().outerHeight(true),
                paginationHeight = +this.$pagination.children().outerHeight(true),
                height = this.options.height - toolbarHeight - paginationHeight;
            $tableContainer.css('height', height + 'px');
        }
        if (this.options.cardView) {
            that.$el.css('margin-top', '0');
            $tableContainer.css('padding-bottom', '0');
            return;
        }
        if (this.options.showHeader && this.options.height) {
            this.$container.find('.fixed-table-header').show();
            this.resetHeader();
            padding += cellHeight;
        } else {
            this.$container.find('.fixed-table-header').hide();
            this.trigger('post-header');
        }
        if (this.options.showFooter) {
            this.resetFooter();
            if (this.options.height) {
                padding += cellHeight;
            }
        }
        $tableContainer.css('padding-bottom', padding + 'px');
    };
    BootstrapTable.prototype.getData = function() {
        return (this.searchText || !$.isEmptyObject(this.filterColumns) || !$.isEmptyObject(this.filterColumnsPartial)) ? this.data : this.options.data;
    };
    BootstrapTable.prototype.load = function(data) {
        var fixedScroll = false;
        if (this.options.sidePagination === 'server') {
            this.options.totalRows = data.total;
            fixedScroll = data.fixedScroll;
            data = data.rows;
        } else if (!$.isArray(data)) {
            fixedScroll = data.fixedScroll;
            data = data.data;
        }
        this.initData(data);
        this.initSearch();
        this.initPagination();
        this.initBody(fixedScroll);
    };
    BootstrapTable.prototype.append = function(data) {
        this.initData(data, 'append');
        this.initSearch();
        this.initPagination();
        this.initBody(true);
    };
    BootstrapTable.prototype.prepend = function(data) {
        this.initData(data, 'prepend');
        this.initSearch();
        this.initPagination();
        this.initBody(true);
    };
    BootstrapTable.prototype.remove = function(params) {
        var len = this.options.data.length,
            i, row;
        if (!params.hasOwnProperty('field') || !params.hasOwnProperty('values')) {
            return;
        }
        for (i = len - 1; i >= 0; i--) {
            row = this.options.data[i];
            if (!row.hasOwnProperty(params.field)) {
                continue;
            }
            if ($.inArray(row[params.field], params.values) !== -1) {
                this.options.data.splice(i, 1);
            }
        }
        if (len === this.options.data.length) {
            return;
        }
        this.initSearch();
        this.initPagination();
        this.initBody(true);
    };
    BootstrapTable.prototype.insertRow = function(params) {
        if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
            return;
        }
        this.data.splice(params.index, 0, params.row);
        this.initSearch();
        this.initPagination();
        this.initBody(true);
    };
    BootstrapTable.prototype.updateRow = function(params) {
        if (!params.hasOwnProperty('index') || !params.hasOwnProperty('row')) {
            return;
        }
        $.extend(this.data[params.index], params.row);
        this.initBody(true);
    };
    BootstrapTable.prototype.showRow = function(params) {
        if (!params.hasOwnProperty('index')) {
            return;
        }
        this.toggleRow(params.index, params.isIdField === undefined ? false : true, true);
    };
    BootstrapTable.prototype.hideRow = function(params) {
        if (!params.hasOwnProperty('index')) {
            return;
        }
        this.toggleRow(params.index, params.isIdField === undefined ? false : true, false);
    };
    BootstrapTable.prototype.getRowsHidden = function(show) {
        var rows = $(this.$body[0]).children().filter(':hidden'),
            i = 0;
        if (show) {
            for (; i < rows.length; i++) {
                $(rows[i]).show();
            }
        }
        return rows;
    }
    BootstrapTable.prototype.mergeCells = function(options) {
        var row = options.index,
            col = $.inArray(options.field, this.header.fields),
            rowspan = options.rowspan || 1,
            colspan = options.colspan || 1,
            i, j, $tr = this.$body.find('tr'),
            $td = $tr.eq(row).find('td').eq(col);
        if (row < 0 || col < 0 || row >= this.data.length) {
            return;
        }
        for (i = row; i < row + rowspan; i++) {
            for (j = col; j < col + colspan; j++) {
                $tr.eq(i).find('td').eq(j).hide();
            }
        }
        $td.attr('rowspan', rowspan).attr('colspan', colspan).show();
    };
    BootstrapTable.prototype.getOptions = function() {
        return this.options;
    };
    BootstrapTable.prototype.getSelections = function() {
        var that = this;
        return $.grep(this.data, function(row) {
            return row[that.header.stateField];
        });
    };
    BootstrapTable.prototype.checkAll = function() {
        this.checkAll_(true);
    };
    BootstrapTable.prototype.uncheckAll = function() {
        this.checkAll_(false);
    };
    BootstrapTable.prototype.checkAll_ = function(checked) {
        var rows;
        if (!checked) {
            rows = this.getSelections();
        }
        this.$selectItem.filter(':enabled').prop('checked', checked);
        this.updateRows(checked);
        this.updateSelected();
        if (checked) {
            rows = this.getSelections();
        }
        this.trigger(checked ? 'check-all' : 'uncheck-all', rows);
    };
    BootstrapTable.prototype.check = function(index) {
        this.check_(true, index);
    };
    BootstrapTable.prototype.uncheck = function(index) {
        this.check_(false, index);
    };
    BootstrapTable.prototype.check_ = function(checked, index) {
        this.$selectItem.filter(sprintf('[data-index="%s"]', index)).prop('checked', checked);
        this.data[index][this.header.stateField] = checked;
        this.updateSelected();
        this.trigger(checked ? 'check' : 'uncheck', this.data[index]);
    };
    BootstrapTable.prototype.checkBy = function(obj) {
        this.checkBy_(true, obj);
    };
    BootstrapTable.prototype.uncheckBy = function(obj) {
        this.checkBy_(false, obj);
    };
    BootstrapTable.prototype.checkBy_ = function(checked, obj) {
        if (!obj.hasOwnProperty('field') || !obj.hasOwnProperty('values')) {
            return;
        }
        var that = this;
        $.each(this.options.data, function(index, row) {
            if (!row.hasOwnProperty(obj.field)) {
                return false;
            }
            if ($.inArray(row[obj.field], obj.values) !== -1) {
                that.$selectItem.filter(sprintf('[data-index="%s"]', index)).prop('checked', checked);
                row[that.header.stateField] = checked;
                that.trigger(checked ? 'check' : 'uncheck', row);
            }
        });
        this.updateSelected();
    };
    BootstrapTable.prototype.destroy = function() {
        this.$el.insertBefore(this.$container);
        $(this.options.toolbar).insertBefore(this.$el);
        this.$container.next().remove();
        this.$container.remove();
        this.$el.html(this.$el_.html()).css('margin-top', '0').attr('class', this.$el_.attr('class') || '');
    };
    BootstrapTable.prototype.showLoading = function() {
        this.$loading.show();
    };
    BootstrapTable.prototype.hideLoading = function() {
        this.$loading.hide();
    };
    BootstrapTable.prototype.togglePagination = function() {
        this.options.pagination = !this.options.pagination;
        var button = this.$toolbar.find('button[name="paginationSwitch"] i');
        if (this.options.pagination) {
            button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchDown);
        } else {
            button.attr("class", this.options.iconsPrefix + " " + this.options.icons.paginationSwitchUp);
        }
        this.updatePagination();
    };
    BootstrapTable.prototype.refresh = function(params) {
        if (params && params.url) {
            this.options.url = params.url;
            this.options.pageNumber = 1;
        }
        this.initServer(params && params.silent, params && params.query);
    };
    BootstrapTable.prototype.showColumn = function(field) {
        this.toggleColumn(getFieldIndex(this.options.columns, field), true, true);
    };
    BootstrapTable.prototype.hideColumn = function(field) {
        this.toggleColumn(getFieldIndex(this.options.columns, field), false, true);
    };
    BootstrapTable.prototype.filterBy = function(columns) {
        this.filterColumns = $.isEmptyObject(columns) ? {} : columns;
        this.options.pageNumber = 1;
        this.initSearch();
        this.updatePagination();
    };
    BootstrapTable.prototype.scrollTo = function(value) {
        var $tbody = this.$container.find('.fixed-table-body');
        if (typeof value === 'string') {
            value = value === 'bottom' ? $tbody[0].scrollHeight : 0;
        }
        if (typeof value === 'number') {
            $tbody.scrollTop(value);
        }
    };
    BootstrapTable.prototype.selectPage = function(page) {
        if (page > 0 && page <= this.options.totalPages) {
            this.options.pageNumber = page;
            this.updatePagination();
        }
    };
    BootstrapTable.prototype.prevPage = function() {
        if (this.options.pageNumber > 1) {
            this.options.pageNumber--;
            this.updatePagination();
        }
    };
    BootstrapTable.prototype.nextPage = function() {
        if (this.options.pageNumber < this.options.totalPages) {
            this.options.pageNumber++;
            this.updatePagination();
        }
    };
    BootstrapTable.prototype.toggleView = function() {
        this.options.cardView = !this.options.cardView;
        this.initHeader();
        this.initBody();
    };
    var allowedMethods = ['getOptions', 'getSelections', 'getData', 'load', 'append', 'prepend', 'remove', 'insertRow', 'updateRow', 'showRow', 'hideRow', 'getRowsHidden', 'mergeCells', 'checkAll', 'uncheckAll', 'check', 'uncheck', 'checkBy', 'uncheckBy', 'refresh', 'resetView', 'destroy', 'showLoading', 'hideLoading', 'showColumn', 'hideColumn', 'filterBy', 'scrollTo', 'selectPage', 'prevPage', 'nextPage', 'togglePagination', 'toggleView'];
    $.fn.bootstrapTable = function(option, _relatedTarget) {
        var value;
        this.each(function() {
            var $this = $(this),
                data = $this.data('bootstrap.table'),
                options = $.extend({}, BootstrapTable.DEFAULTS, $this.data(), typeof option === 'object' && option);
            if (typeof option === 'string') {
                if ($.inArray(option, allowedMethods) < 0) {
                    throw "Unknown method: " + option;
                }
                if (!data) {
                    return;
                }
                value = data[option](_relatedTarget);
                if (option === 'destroy') {
                    $this.removeData('bootstrap.table');
                }
            }
            if (!data) {
                $this.data('bootstrap.table', (data = new BootstrapTable(this, options)));
            }
        });
        return typeof value === 'undefined' ? this : value;
    };
    $.fn.bootstrapTable.Constructor = BootstrapTable;
    $.fn.bootstrapTable.defaults = BootstrapTable.DEFAULTS;
    $.fn.bootstrapTable.columnDefaults = BootstrapTable.COLUMN_DEFAULTS;
    $.fn.bootstrapTable.locales = BootstrapTable.LOCALES;
    $.fn.bootstrapTable.methods = allowedMethods;
    $(function() {
        $('[data-toggle="table"]').bootstrapTable();
    });
}(jQuery);
(function($) {
    'use strict';
    $.fn.bootstrapTable.locales['pt-BR'] = {
        formatLoadingMessage: function() {
            return 'Carregando, aguarde...';
        },
        formatRecordsPerPage: function(pageNumber) {
            return pageNumber + ' registros por pÃ¡gina';
        },
        formatShowingRows: function(pageFrom, pageTo, totalRows) {
            return 'Exibindo ' + pageFrom + ' até ' + pageTo + ' de ' + totalRows + ' linhas';
        },
        formatSearch: function() {
            return 'Pesquisar';
        },
        formatRefresh: function() {
            return 'Recarregar';
        },
        formatToggle: function() {
            return 'Alternar';
        },
        formatColumns: function() {
            return 'Colunas';
        },
        formatPaginationSwitch: function() {
            return 'Ocultar/Exibir paginaÃ§Ã£o';
        },
        formatNoMatches: function() {
            return 'Nenhum registro encontrado';
        }
    };
    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['pt-BR']);
})(jQuery);

// ########################################### daterangepicker


/**
* @version: 2.1.17
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2015 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: https://www.improvely.com/
*/

(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['moment', 'jquery', 'exports'], function(momentjs, $, exports) {
      root.daterangepicker = factory(root, exports, momentjs, $);
    });

  } else if (typeof exports !== 'undefined') {
      var momentjs = require('moment');
      var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;  //isomorphic issue
      if (!jQuery) {
          try {
              jQuery = require('jquery');
              if (!jQuery.fn) jQuery.fn = {}; //isomorphic issue
          } catch (err) {
              if (!jQuery) throw new Error('jQuery dependency not found');
          }
      }

    factory(root, exports, momentjs, jQuery);

  // Finally, as a browser global.
  } else {
    root.daterangepicker = factory(root, {}, root.moment || moment, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this || {}, function(root, daterangepicker, moment, $) { // 'this' doesn't exist on a server

    var DateRangePicker = function(element, options, cb) {

        //default settings for options
        this.parentEl = 'body';
        this.element = $(element);
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.minDate = false;
        this.maxDate = false;
        this.dateLimit = false;
        this.autoApply = false;
        this.singleDatePicker = false;
        this.showDropdowns = false;
        this.showWeekNumbers = false;
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        this.linkedCalendars = true;
        this.autoUpdateInput = true;
        this.ranges = {};

        this.opens = 'right';
        if (this.element.hasClass('pull-right'))
            this.opens = 'left';

        this.drops = 'down';
        if (this.element.hasClass('dropup'))
            this.drops = 'up';

        this.buttonClasses = 'btn btn-sm';
        this.applyClass = 'btn-success';
        this.cancelClass = 'btn-default';

        this.locale = {
            format: 'MM/DD/YYYY',
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        };

        this.callback = function() { };

        //some state information
        this.isShowing = false;
        this.leftCalendar = {};
        this.rightCalendar = {};

        //custom options from user
        if (typeof options !== 'object' || options === null)
            options = {};

        //allow setting options with data attributes
        //data-api options will be overwritten with custom javascript options
        options = $.extend(this.element.data(), options);

        //html template for the picker UI
        if (typeof options.template !== 'string')
            options.template = '<div class="daterangepicker dropdown-menu">' +
                '<div class="calendar left">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini" type="text" name="daterangepicker_start" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' +
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="calendar right">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini" type="text" name="daterangepicker_end" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' +
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="ranges">' +
                    '<div class="range_inputs">' +
                        '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
                        '<button class="cancelBtn" type="button"></button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(options.template).appendTo(this.parentEl);

        //
        // handle all the possible options overriding defaults
        //

        if (typeof options.locale === 'object') {

            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;

            if (typeof options.locale.separator === 'string')
                this.locale.separator = options.locale.separator;

            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

            if (typeof options.locale.monthNames === 'object')
              this.locale.monthNames = options.locale.monthNames.slice();

            if (typeof options.locale.firstDay === 'number')
              this.locale.firstDay = options.locale.firstDay;

            if (typeof options.locale.applyLabel === 'string')
              this.locale.applyLabel = options.locale.applyLabel;

            if (typeof options.locale.cancelLabel === 'string')
              this.locale.cancelLabel = options.locale.cancelLabel;

            if (typeof options.locale.weekLabel === 'string')
              this.locale.weekLabel = options.locale.weekLabel;

            if (typeof options.locale.customRangeLabel === 'string')
              this.locale.customRangeLabel = options.locale.customRangeLabel;

        }

        if (typeof options.startDate === 'string')
            this.startDate = moment(options.startDate, this.locale.format);

        if (typeof options.endDate === 'string')
            this.endDate = moment(options.endDate, this.locale.format);

        if (typeof options.minDate === 'string')
            this.minDate = moment(options.minDate, this.locale.format);

        if (typeof options.maxDate === 'string')
            this.maxDate = moment(options.maxDate, this.locale.format);

        if (typeof options.startDate === 'object')
            this.startDate = moment(options.startDate);

        if (typeof options.endDate === 'object')
            this.endDate = moment(options.endDate);

        if (typeof options.minDate === 'object')
            this.minDate = moment(options.minDate);

        if (typeof options.maxDate === 'object')
            this.maxDate = moment(options.maxDate);

        // sanity check for bad options
        if (this.minDate && this.startDate.isBefore(this.minDate))
            this.startDate = this.minDate.clone();

        // sanity check for bad options
        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();

        if (typeof options.applyClass === 'string')
            this.applyClass = options.applyClass;

        if (typeof options.cancelClass === 'string')
            this.cancelClass = options.cancelClass;

        if (typeof options.dateLimit === 'object')
            this.dateLimit = options.dateLimit;

        if (typeof options.opens === 'string')
            this.opens = options.opens;

        if (typeof options.drops === 'string')
            this.drops = options.drops;

        if (typeof options.showWeekNumbers === 'boolean')
            this.showWeekNumbers = options.showWeekNumbers;

        if (typeof options.buttonClasses === 'string')
            this.buttonClasses = options.buttonClasses;

        if (typeof options.buttonClasses === 'object')
            this.buttonClasses = options.buttonClasses.join(' ');

        if (typeof options.showDropdowns === 'boolean')
            this.showDropdowns = options.showDropdowns;

        if (typeof options.singleDatePicker === 'boolean') {
            this.singleDatePicker = options.singleDatePicker;
            if (this.singleDatePicker)
                this.endDate = this.startDate.clone();
        }

        if (typeof options.timePicker === 'boolean')
            this.timePicker = options.timePicker;

        if (typeof options.timePickerSeconds === 'boolean')
            this.timePickerSeconds = options.timePickerSeconds;

        if (typeof options.timePickerIncrement === 'number')
            this.timePickerIncrement = options.timePickerIncrement;

        if (typeof options.timePicker24Hour === 'boolean')
            this.timePicker24Hour = options.timePicker24Hour;

        if (typeof options.autoApply === 'boolean')
            this.autoApply = options.autoApply;

        if (typeof options.autoUpdateInput === 'boolean')
            this.autoUpdateInput = options.autoUpdateInput;

        if (typeof options.linkedCalendars === 'boolean')
            this.linkedCalendars = options.linkedCalendars;

        if (typeof options.isInvalidDate === 'function')
            this.isInvalidDate = options.isInvalidDate;

        // update day names order to firstDay
        if (this.locale.firstDay != 0) {
            var iterator = this.locale.firstDay;
            while (iterator > 0) {
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                iterator--;
            }
        }

        var start, end, range;

        //if no start/end dates set, check if an input element contains initial values
        if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
            if ($(this.element).is('input[type=text]')) {
                var val = $(this.element).val(),
                    split = val.split(this.locale.separator);

                start = end = null;

                if (split.length == 2) {
                    start = moment(split[0], this.locale.format);
                    end = moment(split[1], this.locale.format);
                } else if (this.singleDatePicker && val !== "") {
                    start = moment(val, this.locale.format);
                    end = moment(val, this.locale.format);
                }
                if (start !== null && end !== null) {
                    this.setStartDate(start);
                    this.setEndDate(end);
                }
            }
        }

        if (typeof options.ranges === 'object') {
            for (range in options.ranges) {

                if (typeof options.ranges[range][0] === 'string')
                    start = moment(options.ranges[range][0], this.locale.format);
                else
                    start = moment(options.ranges[range][0]);

                if (typeof options.ranges[range][1] === 'string')
                    end = moment(options.ranges[range][1], this.locale.format);
                else
                    end = moment(options.ranges[range][1]);

                // If the start or end date exceed those allowed by the minDate or dateLimit
                // options, shorten the range to the allowable period.
                if (this.minDate && start.isBefore(this.minDate))
                    start = this.minDate.clone();

                var maxDate = this.maxDate;
                if (this.dateLimit && start.clone().add(this.dateLimit).isAfter(maxDate))
                    maxDate = start.clone().add(this.dateLimit);
                if (maxDate && end.isAfter(maxDate))
                    end = maxDate.clone();

                // If the end of the range is before the minimum or the start of the range is
                // after the maximum, don't display this range option at all.
                if ((this.minDate && end.isBefore(this.minDate)) || (maxDate && start.isAfter(maxDate)))
                    continue;
                
                //Support unicode chars in the range names.
                var elem = document.createElement('textarea');
                elem.innerHTML = range;
                var rangeHtml = elem.value;

                this.ranges[rangeHtml] = [start, end];
            }

            var list = '<ul>';
            for (range in this.ranges) {
                list += '<li>' + range + '</li>';
            }
            list += '<li>' + this.locale.customRangeLabel + '</li>';
            list += '</ul>';
            this.container.find('.ranges').prepend(list);
        }

        if (typeof cb === 'function') {
            this.callback = cb;
        }

        if (!this.timePicker) {
            this.startDate = this.startDate.startOf('day');
            this.endDate = this.endDate.endOf('day');
            this.container.find('.calendar-time').hide();
        }

        //can't be used together for now
        if (this.timePicker && this.autoApply)
            this.autoApply = false;

        if (this.autoApply && typeof options.ranges !== 'object') {
            this.container.find('.ranges').hide();
        } else if (this.autoApply) {
            this.container.find('.applyBtn, .cancelBtn').addClass('hide');
        }

        if (this.singleDatePicker) {
            this.container.addClass('single');
            this.container.find('.calendar.left').addClass('single');
            this.container.find('.calendar.left').show();
            this.container.find('.calendar.right').hide();
            this.container.find('.daterangepicker_input input, .daterangepicker_input i').hide();
            if (!this.timePicker) {
                this.container.find('.ranges').hide();
            }
        }

        if (typeof options.ranges === 'undefined' && !this.singleDatePicker) {
            this.container.addClass('show-calendar');
        }

        this.container.addClass('opens' + this.opens);

        //swap the position of the predefined ranges if opens right
        if (typeof options.ranges !== 'undefined' && this.opens == 'right') {
            var ranges = this.container.find('.ranges');
            var html = ranges.clone();
            ranges.remove();
            this.container.find('.calendar.left').parent().prepend(html);
        }

        //apply CSS classes and labels to buttons
        this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        //
        // event listeners
        //

        this.container.find('.calendar')
            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
            .on('click.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
            .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
            .on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))
            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this))
            .on('click.daterangepicker', '.daterangepicker_input input', $.proxy(this.showCalendars, this))
            //.on('keyup.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this))
            .on('change.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this));

        this.container.find('.ranges')
            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
            .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
            .on('mouseenter.daterangepicker', 'li', $.proxy(this.hoverRange, this))
            .on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));

        if (this.element.is('input')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.elementChanged, this),
                'keydown.daterangepicker': $.proxy(this.keydown, this)
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
        }

        //
        // if attached to a text input, set the initial value
        //

        if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.element.trigger('change');
        } else if (this.element.is('input') && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format));
            this.element.trigger('change');
        }

    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.locale.format);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);

            if (!this.timePicker)
                this.startDate = this.startDate.startOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.minDate && this.startDate.isBefore(this.minDate))
                this.startDate = this.minDate;

            if (this.maxDate && this.startDate.isAfter(this.maxDate))
                this.startDate = this.maxDate;

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.locale.format);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (!this.timePicker)
                this.endDate = this.endDate.endOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.endDate.isBefore(this.startDate))
                this.endDate = this.startDate.clone();

            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate;

            if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
                this.endDate = this.startDate.clone().add(this.dateLimit);

            this.previousRightTime = this.endDate.clone();

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        isInvalidDate: function() {
            return false;
        },

        updateView: function() {
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
                if (!this.endDate) {
                    this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');
                } else {
                    this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');
                }
            }
            if (this.endDate) {
                this.container.find('input[name="daterangepicker_end"]').removeClass('active');
                this.container.find('input[name="daterangepicker_start"]').addClass('active');
            } else {
                this.container.find('input[name="daterangepicker_end"]').addClass('active');
                this.container.find('input[name="daterangepicker_start"]').removeClass('active');
            }
            this.updateMonthsInView();
            this.updateCalendars();
            this.updateFormInputs();
        },

        updateMonthsInView: function() {
            if (this.endDate) {

                //if both dates are visible already, do nothing
                if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                    (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    &&
                    (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    ) {
                    return;
                }

                this.leftCalendar.month = this.startDate.clone().date(2);
                if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                    this.rightCalendar.month = this.endDate.clone().date(2);
                } else {
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
                
            } else {
                if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                    this.leftCalendar.month = this.startDate.clone().date(2);
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
            }
        },

        updateCalendars: function() {

            if (this.timePicker) {
                var hour, minute, second;
                if (this.endDate) {
                    hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                } else {
                    hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                }
                this.leftCalendar.month.hour(hour).minute(minute).second(second);
                this.rightCalendar.month.hour(hour).minute(minute).second(second);
            }

            this.renderCalendar('left');
            this.renderCalendar('right');

            //highlight any predefined range matching the current start and end dates
            this.container.find('.ranges li').removeClass('active');
            if (this.endDate == null) return;

            var customRange = true;
            var i = 0;
            for (var range in this.ranges) {
                if (this.timePicker) {
                    if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                        break;
                    }
                } else {
                    //ignore times when comparing dates if time picker is not enabled
                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                        break;
                    }
                }
                i++;
            }
            if (customRange) {
                this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
                this.showCalendars();
            }

        },

        renderCalendar: function(side) {

            //
            // Build the matrix of dates that will populate the calendar
            //

            var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
            var month = calendar.month.month();
            var year = calendar.month.year();
            var hour = calendar.month.hour();
            var minute = calendar.month.minute();
            var second = calendar.month.second();
            var daysInMonth = moment([year, month]).daysInMonth();
            var firstDay = moment([year, month, 1]);
            var lastDay = moment([year, month, daysInMonth]);
            var lastMonth = moment(firstDay).subtract(1, 'month').month();
            var lastYear = moment(firstDay).subtract(1, 'month').year();
            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
            var dayOfWeek = firstDay.day();

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            calendar.firstDay = firstDay;
            calendar.lastDay = lastDay;

            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

            var col, row;
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);

                if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                    calendar[row][col] = this.minDate.clone();
                }

                if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                    calendar[row][col] = this.maxDate.clone();
                }

            }

            //make the calendar object available to hoverDate/clickDate
            if (side == 'left') {
                this.leftCalendar.calendar = calendar;
            } else {
                this.rightCalendar.calendar = calendar;
            }

            //
            // Display the calendar
            //

            var minDate = side == 'left' ? this.minDate : this.startDate;
            var maxDate = this.maxDate;
            var selected = side == 'left' ? this.startDate : this.endDate;

            var html = '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers)
                html += '<th></th>';

            if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
                html += '<th class="prev available"><i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

            if (this.showDropdowns) {
                var currentMonth = calendar[1][1].month();
                var currentYear = calendar[1][1].year();
                var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
                var minYear = (minDate && minDate.year()) || (currentYear - 50);
                var inMinYear = currentYear == minYear;
                var inMaxYear = currentYear == maxYear;

                var monthHtml = '<select class="monthselect">';
                for (var m = 0; m < 12; m++) {
                    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            ">" + this.locale.monthNames[m] + "</option>";
                    } else {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                    }
                }
                monthHtml += "</select>";

                var yearHtml = '<select class="yearselect">';
                for (var y = minYear; y <= maxYear; y++) {
                    yearHtml += '<option value="' + y + '"' +
                        (y === currentYear ? ' selected="selected"' : '') +
                        '>' + y + '</option>';
                }
                yearHtml += '</select>';

                dateHtml = monthHtml + yearHtml;
            }

            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
                html += '<th class="next available"><i class="fa fa-chevron-right glyphicon glyphicon-chevron-right"></i></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //adjust maxDate to reflect the dateLimit setting in order to
            //grey out end dates beyond the dateLimit
            if (this.endDate == null && this.dateLimit) {
                var maxLimit = this.startDate.clone().add(this.dateLimit).endOf('day');
                if (!maxDate || maxLimit.isBefore(maxDate)) {
                    maxDate = maxLimit;
                }
            }

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';

                for (var col = 0; col < 7; col++) {

                    var classes = [];

                    //highlight today's date
                    if (calendar[row][col].isSame(new Date(), "day"))
                        classes.push('today');

                    //highlight weekends
                    if (calendar[row][col].isoWeekday() > 5)
                        classes.push('weekend');

                    //grey out the dates in other months displayed at beginning and end of this calendar
                    if (calendar[row][col].month() != calendar[1][1].month())
                        classes.push('off');

                    //don't allow selection of dates before the minimum date
                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of dates after the maximum date
                    if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of date if a custom function decides it's invalid
                    if (this.isInvalidDate(calendar[row][col]))
                        classes.push('off', 'disabled');

                    //highlight the currently selected start date
                    if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                        classes.push('active', 'start-date');

                    //highlight the currently selected end date
                    if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                        classes.push('active', 'end-date');

                    //highlight dates in-between the selected dates
                    if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                        classes.push('in-range');

                    var cname = '', disabled = false;
                    for (var i = 0; i < classes.length; i++) {
                        cname += classes[i] + ' ';
                        if (classes[i] == 'disabled')
                            disabled = true;
                    }
                    if (!disabled)
                        cname += 'available';

                    html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';

            this.container.find('.calendar.' + side + ' .calendar-table').html(html);

        },

        renderTimePicker: function(side) {

            var html, selected, minDate, maxDate = this.maxDate;

            if (this.dateLimit && (!this.maxDate || this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)))
                maxDate = this.startDate.clone().add(this.dateLimit);

            if (side == 'left') {
                selected = this.startDate.clone();
                minDate = this.minDate;
            } else if (side == 'right') {
                selected = this.endDate ? this.endDate.clone() : this.previousRightTime.clone();
                minDate = this.startDate;

                //Preserve the time already selected
                var timeSelector = this.container.find('.calendar.right .calendar-time div');
                if (timeSelector.html() != '') {

                    selected.hour(timeSelector.find('.hourselect option:selected').val() || selected.hour());
                    selected.minute(timeSelector.find('.minuteselect option:selected').val() || selected.minute());
                    selected.second(timeSelector.find('.secondselect option:selected').val() || selected.second());

                    if (!this.timePicker24Hour) {
                        var ampm = timeSelector.find('.ampmselect option:selected').val();
                        if (ampm === 'PM' && selected.hour() < 12)
                            selected.hour(selected.hour() + 12);
                        if (ampm === 'AM' && selected.hour() === 12)
                            selected.hour(0);
                    }

                    if (selected.isBefore(this.startDate))
                        selected = this.startDate.clone();

                    if (selected.isAfter(maxDate))
                        selected = maxDate.clone();

                }
            }

            //
            // hours
            //

            html = '<select class="hourselect">';

            var start = this.timePicker24Hour ? 0 : 1;
            var end = this.timePicker24Hour ? 23 : 12;

            for (var i = start; i <= end; i++) {
                var i_in_24 = i;
                if (!this.timePicker24Hour)
                    i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

                var time = selected.clone().hour(i_in_24);
                var disabled = false;
                if (minDate && time.minute(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.minute(0).isAfter(maxDate))
                    disabled = true;

                if (i_in_24 == selected.hour() && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
                } else {
                    html += '<option value="' + i + '">' + i + '</option>';
                }
            }

            html += '</select> ';

            //
            // minutes
            //

            html += ': <select class="minuteselect">';

            for (var i = 0; i < 60; i += this.timePickerIncrement) {
                var padded = i < 10 ? '0' + i : i;
                var time = selected.clone().minute(i);

                var disabled = false;
                if (minDate && time.second(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.second(0).isAfter(maxDate))
                    disabled = true;

                if (selected.minute() == i && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                } else {
                    html += '<option value="' + i + '">' + padded + '</option>';
                }
            }

            html += '</select> ';

            //
            // seconds
            //

            if (this.timePickerSeconds) {
                html += ': <select class="secondselect">';

                for (var i = 0; i < 60; i++) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().second(i);

                    var disabled = false;
                    if (minDate && time.isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.isAfter(maxDate))
                        disabled = true;

                    if (selected.second() == i && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + padded + '</option>';
                    }
                }

                html += '</select> ';
            }

            //
            // AM/PM
            //

            if (!this.timePicker24Hour) {
                html += '<select class="ampmselect">';

                var am_html = '';
                var pm_html = '';

                if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                    am_html = ' disabled="disabled" class="disabled"';

                if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                    pm_html = ' disabled="disabled" class="disabled"';

                if (selected.hour() >= 12) {
                    html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
                } else {
                    html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
                }

                html += '</select>';
            }

            this.container.find('.calendar.' + side + ' .calendar-time div').html(html);

        },

        updateFormInputs: function() {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.locale.format));
            if (this.endDate)
                this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.locale.format));

            if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }

        },

        move: function() {
            var parentOffset = { top: 0, left: 0 },
                containerTop;
            var parentRightEdge = $(window).width();
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
                parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
            }

            if (this.drops == 'up')
                containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
            else
                containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
            this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');

            if (this.opens == 'left') {
                this.container.css({
                    top: containerTop,
                    right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else if (this.opens == 'center') {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                            - this.container.outerWidth() / 2,
                    right: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else if (this.opens == 'nele') {
                var lft = ( (this.element.offset().left) * 0.7 );
                var tp = ( (this.element.offset().top + (this.element.outerHeight() - 80) ));

                if(tp > 500){
                    var tp = ( ( (this.element.offset().top + (this.element.outerHeight() / 2) - 150) ));
                }

                console.log(tp);

                this.container.css({
                    top: tp,
                    left: lft,
                    right: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        show: function(e) {
            if (this.isShowing) return;

            // Create a click proxy that is private to this instance of datepicker, for unbinding
            this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);

            // Bind global datepicker mousedown for hiding and
            $(document)
              .on('mousedown.daterangepicker', this._outsideClickProxy)
              // also support mobile devices
              .on('touchend.daterangepicker', this._outsideClickProxy)
              // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
              .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
              // and also close when focus changes to outside the picker (eg. tabbing between controls)
              .on('focusin.daterangepicker', this._outsideClickProxy);

            // Reposition the picker if the window is resized while it's open
            $(window).on('resize.daterangepicker', $.proxy(function(e) { this.move(e); }, this));

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();
            this.previousRightTime = this.endDate.clone();

            this.updateView();
            this.container.show();
            this.move();
            this.element.trigger('show.daterangepicker', this);
            this.isShowing = true;
        },

        hide: function(e) {
            if (!this.isShowing) return;

            //incomplete date selection, revert to last values
            if (!this.endDate) {
                this.startDate = this.oldStartDate.clone();
                this.endDate = this.oldEndDate.clone();
            }

            //if a new date range was selected, invoke the user callback function
            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.callback(this.startDate, this.endDate, this.chosenLabel);

            //if picker is attached to a text input, update it
            this.updateElement();

            $(document).off('.daterangepicker');
            $(window).off('.daterangepicker');
            this.container.hide();
            this.element.trigger('hide.daterangepicker', this);
            this.isShowing = false;
        },

        toggle: function(e) {
            if (this.isShowing) {
                this.hide();
            } else {
                this.show();
            }
        },

        outsideClick: function(e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (
                // ie modal dialog fix
                e.type == "focusin" ||
                target.closest(this.element).length ||
                target.closest(this.container).length ||
                target.closest('.calendar-table').length
                ) return;
            this.hide();
        },

        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
            this.element.trigger('showCalendar.daterangepicker', this);
        },

        hideCalendars: function() {
            this.container.removeClass('show-calendar');
            this.element.trigger('hideCalendar.daterangepicker', this);
        },

        hoverRange: function(e) {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            var label = e.target.innerHTML;
            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
                this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.locale.format));
                this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.locale.format));
            }
            
        },

        clickRange: function(e) {
            var label = e.target.innerHTML;
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];
                this.startDate = dates[0];
                this.endDate = dates[1];

                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }

                this.hideCalendars();
                this.clickApply();
            }
        },

        clickPrev: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract(1, 'month');
                if (this.linkedCalendars)
                    this.rightCalendar.month.subtract(1, 'month');
            } else {
                this.rightCalendar.month.subtract(1, 'month');
            }
            this.updateCalendars();
        },

        clickNext: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add(1, 'month');
            } else {
                this.rightCalendar.month.add(1, 'month');
                if (this.linkedCalendars)
                    this.leftCalendar.month.add(1, 'month');
            }
            this.updateCalendars();
        },

        hoverDate: function(e) {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            //ignore dates that can't be selected
            if (!$(e.target).hasClass('available')) return;

            //have the text inputs above calendars reflect the date being hovered over
            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            if (this.endDate) {
                this.container.find('input[name=daterangepicker_start]').val(date.format(this.locale.format));
            } else {
                this.container.find('input[name=daterangepicker_end]').val(date.format(this.locale.format));
            }

            //highlight the dates between the start date and the date being hovered as a potential end date
            var leftCalendar = this.leftCalendar;
            var rightCalendar = this.rightCalendar;
            var startDate = this.startDate;
            if (!this.endDate) {
                this.container.find('.calendar td').each(function(index, el) {

                    //skip week numbers, only look at dates
                    if ($(el).hasClass('week')) return;

                    var title = $(el).attr('data-title');
                    var row = title.substr(1, 1);
                    var col = title.substr(3, 1);
                    var cal = $(el).parents('.calendar');
                    var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

                    if (dt.isAfter(startDate) && dt.isBefore(date)) {
                        $(el).addClass('in-range');
                    } else {
                        $(el).removeClass('in-range');
                    }

                });
            }

        },

        clickDate: function(e) {

            if (!$(e.target).hasClass('available')) return;

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            //
            // this function needs to do a few things:
            // * alternate between selecting a start and end date for the range,
            // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
            // * if autoapply is enabled, and an end date was chosen, apply the selection
            // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
            //

            if (this.endDate || date.isBefore(this.startDate, 'day')) {
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.endDate = null;
                this.setStartDate(date.clone());
            } else if (!this.endDate && date.isBefore(this.startDate)) {
                //special case: clicking the same date for start/end, 
                //but the time of the end date is before the start date
                this.setEndDate(this.startDate.clone());
            } else {
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.setEndDate(date.clone());
                if (this.autoApply)
                    this.clickApply();
            }

            if (this.singleDatePicker) {
                this.setEndDate(this.startDate);
                if (!this.timePicker)
                    this.clickApply();
            }

            this.updateView();

        },

        clickApply: function(e) {
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function(e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },

        monthOrYearChanged: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.'+leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            if (!isLeft) {
                if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                    month = this.startDate.month();
                    year = this.startDate.year();
                }
            }

            if (this.minDate) {
                if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                    month = this.minDate.month();
                    year = this.minDate.year();
                }
            }

            if (this.maxDate) {
                if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                    month = this.maxDate.month();
                    year = this.maxDate.year();
                }
            }

            if (isLeft) {
                this.leftCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
            } else {
                this.rightCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
            }
            this.updateCalendars();
        },

        timeChanged: function(e) {

            var cal = $(e.target).closest('.calendar'),
                isLeft = cal.hasClass('left');

            var hour = parseInt(cal.find('.hourselect').val(), 10);
            var minute = parseInt(cal.find('.minuteselect').val(), 10);
            var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

            if (!this.timePicker24Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm === 'PM' && hour < 12)
                    hour += 12;
                if (ampm === 'AM' && hour === 12)
                    hour = 0;
            }

            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                start.second(second);
                this.setStartDate(start);
                if (this.singleDatePicker) {
                    this.endDate = this.startDate.clone();
                } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                    this.setEndDate(start.clone());
                }
            } else if (this.endDate) {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                end.second(second);
                this.setEndDate(end);
            }

            //update the calendars so all clickable dates reflect the new time component
            this.updateCalendars();

            //update the form inputs above the calendars with the new time
            this.updateFormInputs();

            //re-render the time pickers because changing one selection can affect what's enabled in another
            this.renderTimePicker('left');
            this.renderTimePicker('right');

        },

        formInputsChanged: function(e) {
            var isRight = $(e.target).closest('.calendar').hasClass('right');
            var start = moment(this.container.find('input[name="daterangepicker_start"]').val(), this.locale.format);
            var end = moment(this.container.find('input[name="daterangepicker_end"]').val(), this.locale.format);

            if (start.isValid() && end.isValid()) {

                if (isRight && end.isBefore(start))
                    start = end.clone();

                this.setStartDate(start);
                this.setEndDate(end);

                if (isRight) {
                    this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format));
                } else {
                    this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format));
                }

            }

            this.updateCalendars();
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
            }
        },

        elementChanged: function() {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;
            if (this.element.val().length < this.locale.format.length) return;

            var dateString = this.element.val().split(this.locale.separator),
                start = null,
                end = null;

            if (dateString.length === 2) {
                start = moment(dateString[0], this.locale.format);
                end = moment(dateString[1], this.locale.format);
            }

            if (this.singleDatePicker || start === null || end === null) {
                start = moment(this.element.val(), this.locale.format);
                end = start;
            }

            if (!start.isValid() || !end.isValid()) return;

            this.setStartDate(start);
            this.setEndDate(end);
            this.updateView();
        },

        keydown: function(e) {
            //hide on tab or enter
            if ((e.keyCode === 9) || (e.keyCode === 13)) {
                this.hide();
            }
        },

        updateElement: function() {
            if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.element.trigger('change');
            } else if (this.element.is('input') && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format));
                this.element.trigger('change');
            }
        },

        remove: function() {
            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData();
        }

    };

    $.fn.daterangepicker = function(options, callback) {
        this.each(function() {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, options, callback));
        });
        return this;
    };
    
    return DateRangePicker;

}));

// #########################################

(function($) {
    var model, view, controller, additionalId;
    var methods = {
        lim: function(val, min, max) {
            if (val < min) {
                val = min;
            } else if (val > max) {
                val = max;
            }
            return val;
        }
    };

    function Model(options) {
        this.rawData = new Array();
        this.src = options.src;
        additionalId = options.additionalId;
        this.eventTagName = options.eventTagName;
        this.dateTagName = options.dateTagName;
        this.titleTagName = options.titleTagName;
        this.thumbTagName = options.thumbTagName;
        this.thumbTagName = options.htmlStatusClassName;
        this.contentTagName = options.contentTagName;
        this.linkTagName = options.linkTagName;
        this.htmlEventClassName = options.htmlEventClassName;
        this.htmlDateClassName = options.htmlDateClassName;
        this.htmlTitleClassName = options.htmlTitleClassName;
        this.htmlStatusClassName = options.htmlStatusClassName;
        this.htmlLateClassName = options.htmlLateClassName;
        this.htmlContentClassName = options.htmlContentClassName;
        this.htmlLinkClassName = options.htmlLinkClassName;
        this.htmlThumbClassName = options.htmlThumbClassName;
        this.events = new Array();
        this.xmlDoc = 1;
        this.allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        this.nYears = 0;
        this.nMonths = 0;
        this.nDays = 0;
        this.startYear = 30000;
        this.endYear = 0;
    }

    function View(options) {
        this.eventPositions = new Array();
        this.eventNodeWidth = 0;
        this.width = 0;
        this.yearWidth = 0;
        this.monthWidth = 0;
        this.dayWidth = 0;
        this.hourWidth = 0;
        this.minuteWidth = 0;
        this.secondWidth = 0;
        this.showYears = false;
        this.showMonths = false;
        this.showEveryNthMonth = 1;
        this.showEveryNthYear = 1;
        this.showDays = false;
        this.showHours = false;
        this.showMinutes = false;
        this.showSeconds = false;
        this.nLargeScale = 0;
        this.nSmallScale = 0;
        this.step = 0;
        this.monthId = 0;
        this.monthPosition = 0;
        this.yearPosition = 0;
        this.yearId = 0;
        this.selectedEvent = 0;
        this.selectedEventContentsWidth = 0;
        this.eventMargin = 0;
    }

    function Controller() {
        this.selectedEventContentsWidth = 0;
    }
    Model.prototype.loadXML = function(options) {
        var root = this;
        $.get(root.src, function(data) {
            root.xmlDoc = data;
            options.callback();
        });
    };
    Model.prototype.getXMLContent = function() {
        var events = this.xmlDoc.getElementsByTagName(this.eventTagName);
        for (var i = 0; i < events.length; i++) {
            var link = '<a href="' + $(events[i]).find(this.linkTagName).find('a').attr('href') + '">' + $(events[i]).find(this.linkTagName).find('a').text() + '</a>';
            this.rawData[i] = {
                date: $(events[i]).find(this.dateTagName).text(),
                title: $(events[i]).find(this.titleTagName).text(),
                status: $(events[i]).find(this.statusName).text(),
                late: $(events[i]).find(this.lateName).text(),
                thumb: $(events[i]).find(this.thumbTagName).text(),
                content: $(events[i]).find(this.contentTagName).text(),
                link: link
            };
        }
    }
    Model.prototype.getHTMLContent = function() {
        var events = $('.' + this.htmlEventClassName);
        for (var i = 0; i < events.length; i++) {
            this.rawData[i] = {
                date: $(events[i]).find('.' + this.htmlDateClassName).html(),
                title: $(events[i]).find('.' + this.htmlTitleClassName).html(),
                status: $(events[i]).find('.' + this.htmlStatusClassName).html(),
                late: $(events[i]).find('.' + this.htmlLateClassName).html(),
                thumb: '',
                content: $(events[i]).find('.' + this.htmlContentClassName).html(),
                link: $(events[i]).find('.' + this.htmlLinkClassName).html()
            };
            if ($(events[i]).find('.' + this.htmlThumbClassName).length != 0) {
                this.rawData[i].thumb = $(events[i]).find('.' + this.htmlThumbClassName).html();
            }
        }
    };
    Model.prototype.parseRawData = function() {
        var root = this;
        var date, year, month;
        for (var i = 0; i < root.rawData.length; i++) {
            if (root.rawData[i].date.search('BC') == -1) {
                var newDate = root.rawData[i].date;
                var dateParts = newDate.split('.');
                date = dateParts[0];
                month = dateParts[1];
                year = parseInt(dateParts[2]);
                var intdate = 0;
                if (parseInt(date[0]) == 0) {
                    intdate = parseInt(date[1]);
                } else {
                    intdate = parseInt(date);
                }
                var intmonth = 0;
                if (parseInt(month[0]) == 0) {
                    intmonth = parseInt(month[1]);
                } else {
                    intmonth = parseInt(month);
                }
                var datestring = date + '.' + month + '.' + year;
            } else {
                var datestring = root.rawData[i].date;
                year = parseInt('-' + root.rawData[i].date.replace(' ', '').replace('BC', ''));
            }
            var titleLength = 30;
            var title = root.rawData[i].title;
            if (title.length > titleLength) {
                title = title.slice(0, titleLength);
                title = title + "...";
            }
            var hasThumb = false;
            if (root.rawData[i].thumb != '') {
                hasThumb = true;
                var thumb = '<img src="' + root.rawData[i].thumb + '">';
            }
            var contentLength = 400;
            var content = root.rawData[i].content;
            if (content.length > contentLength) {
                content = content.slice(0, contentLength);
                content = content + "...";
            }
            if (root.rawData[i].late == 'True') {
                late = 'late';
            } else {
                late = '';
            }
            root.events[i] = {
                id: i + '-' + additionalId,
                datestring: datestring,
                date: intdate,
                year: year,
                month: intmonth,
                title: title,
                status: root.rawData[i].status,
                late: late,
                content: content,
                link: root.rawData[i].link,
                hasThumb: hasThumb,
                thumb: thumb
            };
        }
        for (var i = 0; i < root.events.length; i++) {
            if (parseInt(root.events[i].year) > root.endYear) {
                root.endYear = parseInt(root.events[i].year);
            }
        }
        for (var i = 0; i < root.events.length; i++) {
            if (parseInt(root.events[i].year) < root.startYear) {
                root.startYear = parseInt(root.events[i].year);
            }
        }
        root.nYears = root.endYear - root.startYear + 1;
        root.nMonths = Math.ceil((root.endDate - root.startDate) / root.months);
        root.nDays = Math.ceil((root.endDate - root.startDate) / root.days);
    }
    Model.prototype.parseXML = function() {
        var root = this;
        var events = root.xmlDoc.getElementsByTagName(root.eventTagName);
        var date, year, month;
        for (var i = 0; i < events.length; i++) {
            var newDate = $(events[i]).find(root.dateTagName).text();
            var dateParts = newDate.split('.');
            date = dateParts[0];
            month = dateParts[1];
            year = parseInt(dateParts[2]);
            var intdate = 0;
            if (parseInt(date[0]) == 0) {
                intdate = parseInt(date[1]);
            } else {
                intdate = parseInt(date);
            }
            var intmonth = 0;
            if (parseInt(month[0]) == 0) {
                intmonth = parseInt(month[1]);
            } else {
                intmonth = parseInt(month);
            }
            var titleLength = 30;
            var title = $(events[i]).find(root.titleTagName).text();
            if (title.length > titleLength) {
                title = title.slice(0, titleLength);
                title = title + "...";
            }
            var hasThumb = false;
            if ($(events[i]).find(root.thumbTagName).length != 0) {
                hasThumb = true;
                var thumb = '<img src="' + $(events[i]).find(root.thumbTagName).text() + '">';
            }
            var contentLength = 400;
            var content = $(events[i]).find(root.contentTagName).text();
            if (content.length > contentLength) {
                content = content.slice(0, contentLength);
                content = content + "...";
            }
            root.events[i] = {
                id: i,
                date: intdate,
                year: year,
                month: intmonth,
                title: title,
                content: content,
                link: $(events[i]).find(root.linkTagName).find('a'),
                hasThumb: hasThumb,
                thumb: thumb
            };
        }
        for (var i = 0; i < root.events.length; i++) {
            if (parseInt(root.events[i].year) > root.endYear) {
                root.endYear = parseInt(root.events[i].year);
            }
        }
        for (var i = 0; i < root.events.length; i++) {
            if (parseInt(root.events[i].year) < root.startYear) {
                root.startYear = parseInt(root.events[i].year);
            }
        }
        root.nYears = root.endYear - root.startYear + 1;
        root.nMonths = Math.ceil((root.endDate - root.startDate) / root.months);
        root.nDays = Math.ceil((root.endDate - root.startDate) / root.days);
    }
    Model.prototype.parseHTML = function() {
        var root = this;
        var events = $('.timeline-event');
        var date, year, month;
        for (var i = 0; i < events.length; i++) {
            var newDate = $(events[i]).find('.' + root.htmlDateClassName).html();
            var dateParts = newDate.split('.');
            date = dateParts[0];
            month = dateParts[1];
            year = parseInt(dateParts[2]);
            var intdate = 0;
            if (parseInt(date[0]) == 0) {
                intdate = parseInt(date[1]);
            } else {
                intdate = parseInt(date);
            }
            var intmonth = 0;
            if (parseInt(month[0]) == 0) {
                intmonth = parseInt(month[1]);
            } else {
                intmonth = parseInt(month);
            }
            var titleLength = 30;
            var title = $(events[i]).find('.' + root.htmlTitleClassName).html();
            if (title.length > titleLength) {
                title = title.slice(0, titleLength);
                title = title + "...";
            }
            var hasThumb = false;
            if ($(events[i]).find('.' + root.htmlThumbClassName).length != 0) {
                hasThumb = true;
                var thumb = '<img src="' + $(events[i]).find('.' + root.htmlThumbClassName).html() + '">';
            }
            var contentLength = 400;
            var content = $(events[i]).find('.' + root.htmlContentClassName).html();
            if (content.length > contentLength) {
                content = content.slice(0, contentLength);
                content = content + "...";
            }
            var status = $(events[i]).find('.' + root.htmlStatusClassName).html();
            var late = $(events[i]).find('.' + root.htmlLateClassName).html();
            root.events[i] = {
                id: i,
                date: intdate,
                year: year,
                month: intmonth,
                title: title,
                status: status,
                late: late,
                content: content,
                link: $(events[i]).find('.' + root.htmlLinkClassName).find('a'),
                hasThumb: hasThumb,
                thumb: thumb
            };
        }
        for (var i = 0; i < root.events.length; i++) {
            if (parseInt(root.events[i].year) > root.endYear) {
                root.endYear = parseInt(root.events[i].year);
            }
        }
        for (var i = 0; i < root.events.length; i++) {
            if (parseInt(root.events[i].year) < root.startYear) {
                root.startYear = parseInt(root.events[i].year);
            }
        }
        root.nYears = root.endYear - root.startYear + 1;
        root.nMonths = Math.ceil((root.endDate - root.startDate) / root.months);
        root.nDays = Math.ceil((root.endDate - root.startDate) / root.days);
    };
    View.prototype.init = function(options) {
        var root = this;
        root.target = options.target;
        root.width = root.target.outerWidth();
        root.yearWidth = root.width / (model.nYears);
        root.monthWidth = root.yearWidth / 12;
        root.dayWidth = root.monthWidth / 30;
        if (options.mode === 'html') {
            $('.timeline-html-wrap').hide();
        }
        root.target.after().append('<div class="timeline-event-node timeline-event-node' + additionalId + '"></div>');
        root.eventNodeWidth = $('.timeline-event-node' + additionalId).first().outerWidth();
        $('.timeline-event-node' + additionalId).remove();
        if (root.monthWidth <= 8) {
            root.showMonths = false;
        } else {
            root.showMonths = true;
        }
        root.showEveryNthMonth = Math.round((root.width / root.monthWidth) / 12);
        root.showEveryNthMonth = root.showEveryNthMonth - root.showEveryNthMonth % 2;
        if (model.nYears == 1) {
            root.showEveryNthMonth = 1;
        }
        if (root.yearWidth > root.width) {
            root.showYears = false;
        } else root.showYears = true;
        root.showEveryNthYear = Math.round((root.width / root.yearWidth) / 12);
        var str = root.showEveryNthYear + '';
        var rounding = 1;
        for (var k = 0; k < str.length - 1; k++) {
            rounding = rounding + '0';
        }
        root.showEveryNthYear = Math.round(root.showEveryNthYear / parseInt(rounding)) * parseInt(rounding);
        root.showEveryNthYear = (root.showEveryNthYear < 1) ? 1 : root.showEveryNthYear;
        root.nLargeScale = model.nYears;
        root.nSmallScale = model.nMonths;
        root.step = root.monthWidth / 30;
    }, View.prototype.drawEvents = function() {
        var root = this;
        var html = '<div class="timeline-wrap timeline-wrap' + additionalId + '">';
        html += '   <div class="timeline-events timeline-events' + additionalId + '">';
        html += '   <div class="timeline-years timeline-years' + additionalId + ' timeline-large-scale"></div>';
        html += '   <div class="timeline-months timeline-months' + additionalId + ' timeline-small-scale"></div>';
        for (var i = 0; i < model.events.length; i++) {
            html += '       <div class="timeline-event ' + model.events[i].late + ' ' + model.events[i].status + ' timeline-bottom" id="timeline-event-' + model.events[i].id + '">';
            html += '           <div class="timeline-event-node status-detail timeline-event-node' + additionalId + '" id="timeline-event-node-' + model.events[i].id + '"></div>'
            html += '           <div class="timeline-event-arrow"></div>';
            html += '           <div class="timeline-event-contents">';
            if (model.events[i].title != 0) {
                html += '           <div class="timeline-event-title"><span>' + model.events[i].datestring + '</span>' + model.events[i].title + '</div>';
            }
            if (model.events[i].content != 0) {
                html += '           <div class="timeline-event-content">';
                if (model.events[i].hasThumb) {
                    html += model.events[i].thumb;
                }
                html += model.events[i].content + '</div>';
            }
            if (model.events[i].link != 0) {
                html += '           <div class="timeline-event-link">' + model.events[i].link + '</div>';
            }
            html += '           </div>';
            html += '       </div>';
        }
        html += '   </div>';
        html += '</div>';
        root.target.html(html);
    }, View.prototype.setData = function() {
        var root = this;
        var target = 0;
        var targetContents = 0;
        for (var i = 0; i < model.events.length; i++) {
            target = $('#timeline-event-' + model.events[i].id);
            targetContents = target.find('.timeline-event-contents');
            targetContents.show();
            target.data({
                "offset": targetContents.offset().left,
                "smallWidth": targetContents.width(),
                "margin": parseInt(target.find('.timeline-event-contents').css('margin-left').replace('px', ''))
            });
            targetContents.hide();
        }
    }, View.prototype.addDates = function() {
        var root = this;
        if (root.showYears) {
            for (var i = 0; i < model.nYears + 1; i++) {
                if (i < model.nYears) {
                    for (var j = 0; j < 12; j++) {
                        root.addMonth();
                    }
                }
                root.addYear();
            }
        }
    }, View.prototype.addMonth = function() {
        var root = this;
        if (root.monthId % 12 != 0 && root.showMonths) {
            if (root.monthId % root.showEveryNthMonth == 0) {
                $('.timeline-months' + additionalId).append('<div class="timeline-month timeline-dateblock" id="timeline-month-' + additionalId + root.monthId + '">' + model.allMonths[root.monthId % 12] + '</div>');
            } else {
                $('.timeline-months' + additionalId).append('<div class="timeline-month timeline-dateblock" id="timeline-month-' + additionalId + root.monthId + '"></div>');
            }
            $('#timeline-month-' + additionalId + root.monthId).css({
                "left": methods.lim(root.monthPosition, 0, root.width)
            });
        }
        root.monthPosition += root.monthWidth;
        root.monthId++;
    }, View.prototype.addYear = function() {
        var root = this;
        if (root.showYears && root.yearId % root.showEveryNthYear == 0) {
            var year = new Array();
            year = model.startYear + root.yearId + '';
            if (year < 0) {
                year = year.replace('-', '') + " BC";
            }
            $('.timeline-years' + additionalId).append('<div class="timeline-year timeline-dateblock" id="timeline-year-' + additionalId + root.yearId + '">' + year + '</div>')
            $('#timeline-year-' + additionalId + root.yearId).css({
                "left": methods.lim(root.yearPosition, 0, root.width - 1)
            });
        }
        root.yearPosition += root.yearWidth;
        root.yearId++;
    }, View.prototype.positionEvents = function() {
        for (var i = 0; i < model.events.length; i++) {
            model.events[i].position = view.getPosition(i);
        }
        var temp = new Array();
        for (i = 0; i < model.events.length; i++) {
            temp[i] = model.events[i];
        }
        model.events.sort(sortFunc);

        function sortFunc(a, b) {
            return a.position - b.position;
        }
        var lastresult = 0,
            delta = 0,
            newresult;
        for (i = 1; i < model.events.length; i++) {
            if (model.events[i].position <= model.events[i - 1].position) {
                model.events[i].position = model.events[i - 1].position;
            }
            if (Math.abs(model.events[i].position - model.events[i - 1].position) < view.eventNodeWidth) {
                delta = Math.abs(model.events[i].position - model.events[i - 1].position);
                model.events[i].position = model.events[i - 1].position + view.eventNodeWidth / 1.5;
            }
        }
        if (model.events[model.events.length - 1].position > root.width) {
            model.events[model.events.length - 1].position = root.width;
            for (var i = model.events.length - 1; i > 0; i--) {
                if (model.events[i - 1].position >= model.events[i].position) {
                    model.events[i - 1].position = model.events[i].position;
                }
                if (Math.abs(model.events[i].position - model.events[i - 1].position) < view.eventNodeWidth) {
                    delta = Math.abs(model.events[i].position - model.events[i - 1].position)
                    model.events[i - 1].position = model.events[i - 1].position - view.eventNodeWidth / 1.5;
                }
                model.events[i].position = model.events[i].position - view.eventNodeWidth / 2;
            }
        }
        root.drawEvents();
        root.setData();
        for (i = 0; i < model.events.length; i++) {
            $('#timeline-event-' + model.events[i].id).css({
                "left": model.events[i].position,
                "z-index": i
            });
        }
    }, View.prototype.getPosition = function(i) {
        root = this;
        var left = 0;
        left = (root.monthWidth * (model.events[i].month - 1)) +
            (root.yearWidth * (model.events[i].year - model.startYear)) +
            root.dayWidth * (model.events[i].date - 1) - view.eventNodeWidth / 2 - 1;
        root.eventPositions[i] = left;
        return left;
    }
    View.prototype.showEvent = function(id) {
        var root = this;
        var timeline = false;
        var target = $('#' + id);
        var targetContents = target.find('.timeline-event-contents');
        if (root.aboveTimeline(target)) {
            target.addClass('timeline-above');
        }
        target.addClass('timeline-hover').find('.timeline-event-contents').fadeIn(200);
        target.find('.timeline-event-arrow').fadeIn(200);
        target.data({
            "offset": targetContents.offset().left,
            "showed": true
        });
        if (this.needMargin(target)) {
            this.correctMargin(target);
        }
    }, View.prototype.hideEvent = function(id) {
        var root = this;
        var target = $('#' + id);
        target.removeClass('timeline-hover').find('.timeline-event-contents').fadeOut(200, function() {
            $(this).closest('.timeline-above').removeClass('timeline-above');
            target.find('.timeline-event-contents').css({
                "margin-left": target.data('margin')
            });
        });
        target.removeClass('timeline-hover').find('.timeline-event-arrow').fadeOut(200);
        target.data({
            "showed": false
        });
    }, View.prototype.selectEvent = function(target) {
        var root = this;
        var targetContents = target.find('.timeline-event-contents');
        additionalId = target.closest('.my-timeline').attr('rel');
        additionalId = targetContents.closest('.my-timeline').attr('rel');
        target.removeClass('timeline-above').addClass('timeline-selected').removeClass('timeline-hover');
        root.selectedEvent = target;
        if (!target.data('showed')) {
            root.showEvent(target.attr('id'));
        }
        if (this.needMargin(target, 400)) {
            var delta = target.data('offset') + 400 - ($('.timeline-wrap' + additionalId).offset().left + $('.timeline-wrap' + additionalId).outerWidth());
            var margin = -delta + target.data('margin');
        } else {
            var margin = target.data('margin');
        }
        target.find('.timeline-event-contents').fadeIn(200).animate({
            "width": 376,
            "margin-left": margin
        }, 100, function() {
            target.find('.timeline-event-content').slideDown(200);
            target.find('.timeline-event-link').fadeIn(200);
        });
    }, View.prototype.deselectEvent = function() {
        var root = this;
        var target = $('.timeline-wrap');
        target.each(function() {
            target = $(this).find('.timeline-selected');
            additionalId = target.closest('.my-timeline').attr('rel');
            root.hideEvent(target.attr('id'));
            target.removeClass('timeline-selected');
            target.find('.timeline-event-content').slideUp(200, function() {
                target.find('.timeline-event-contents').css({
                    "width": target.data('smallWidth'),
                    "margin-left": target.data('margin')
                });
            });
            target.find('.timeline-event-link').fadeOut(200);
        })
        root.selectedEvent = 0;
    }, View.prototype.aboveTimeline = function(target) {
        var root = this;
        if (root.selectedEvent != 0 && !target.hasClass('timeline-selected')) {
            return true;
        }
        return false;
    }, View.prototype.needMargin = function(target, width) {
        additionalId = target.closest('.my-timeline').attr('rel');
        if (width === undefined) {
            width = target.find('.timeline-event-contents').outerWidth();
        } else {
            width = 400;
        }
        if (target.data('offset') + width > $('.timeline-wrap' + additionalId).offset().left + $('.timeline-wrap' + additionalId).outerWidth()) {
            return true;
        }
        return false;
    }
    View.prototype.correctMargin = function(target, width, animated) {
        additionalId = target.closest('.my-timeline').attr('rel');
        if (width === undefined) {
            width = target.find('.timeline-event-contents').outerWidth();
        } else {
            width = 400;
        }
        var delta = target.data('offset') + width - ($('.timeline-wrap' + additionalId).offset().left + $('.timeline-wrap' + additionalId).outerWidth());
        if (animated) {
            target.find('.timeline-event-contents').animate({
                "margin-left": -delta + target.data('margin')
            }, 100);
        } else {
            target.find('.timeline-event-contents').css({
                "margin-left": -delta + target.data('margin')
            });
        }
    }
    Controller.prototype.setDOMEvents = function() {
        var root = this;
        $('.timeline-event-node' + additionalId).on('click', function() {
            if (view.selectedEvent == 0) {
                view.selectEvent($(this).parent());
            } else {
                if ($(this).parent().hasClass('timeline-selected')) {
                    view.deselectEvent($(this).parent());
                } else {
                    view.deselectEvent($('.timeline-selected'));
                    view.selectEvent($(this).parent());
                }
            }
        });
        $('.timeline-event-node' + additionalId).on('mouseover', function() {
            if ($('.timeline-selected').length == 0) {
                view.hideEvent($('.timeline-hover').attr('id'));
            }
            if (!$(this).closest('.timeline-event').hasClass('timeline-hover')) {
                view.showEvent($(this).closest('.timeline-event').attr('id'));
            }
        });
        $('.timeline-event-node' + additionalId).on('mouseout', function() {
            if (!$(this).closest('.timeline-event').hasClass('timeline-selected')) {
                view.hideEvent($(this).closest('.timeline-event').attr('id'));
            }
        });
        $(document).on('click', function(e) {
            if (root.selectedEvent != 0 && $(e.target).closest('.timeline-wrap' + additionalId).length == 0) {
                view.deselectEvent();
            }
        });
    }
    $.fn.extend({
        timelinexml: function(options) {
            var settings = $.extend({
                src: '',
                showLatest: false,
                selectLatest: false,
                eventTagName: "event",
                dateTagName: "date",
                titleTagName: "title",
                thumbTagName: "thumb",
                contentTagName: "content",
                linkTagName: "link",
                mode: 'xml',
                htmlEventClassName: "timeline-event",
                htmlDateClassName: "timeline-date",
                htmlTitleClassName: "timeline-title",
                htmlContentClassName: "timeline-content",
                htmlLinkClassName: "timeline-link",
                htmlThumbClassName: "timeline-thumb"
            }, options);
            model = new Model(settings);
            view = new View();
            controller = new Controller();
            return this.each(function() {
                var target = $(this);
                if (settings.src.length != 0) {
                    settings.mode = 'html';
                    model.getHTMLContent();
                    model.parseRawData();
                    view.init({
                        target: target,
                        mode: 'html'
                    });
                    view.positionEvents();
                    view.addDates();
                    controller.setDOMEvents();
                    if (settings.showLatest || settings.selectLatest) {
                        view.showEvent("timeline-event-" + additionalId);
                        if (settings.selectLatest) {
                            setTimeout(function() {
                                view.selectEvent($('#timeline-event-' + additionalId));
                            }, 500);
                        }
                    }
                } else {
                    model.loadXML({
                        callback: function() {
                            model.getXMLContent();
                            model.parseRawData();
                            view.init({
                                target: target
                            });
                            view.positionEvents();
                            view.addDates();
                            controller.setDOMEvents();
                            if (settings.showLatest || settings.selectLatest) {
                                view.showEvent("timeline-event-" + additionalId);
                                if (settings.selectLatest) {
                                    setTimeout(function() {
                                        view.selectEvent($('#timeline-event-' + additionalId));
                                    }, 500);
                                }
                            }
                        }
                    });
                }
            });
        }
    });
})(jQuery);
! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function(t) {
    function e(e, i, n) {
        var i = {
            content: {
                message: "object" == typeof i ? i.message : i,
                title: i.title ? i.title : "",
                icon: i.icon ? i.icon : "",
                url: i.url ? i.url : "#",
                target: i.target ? i.target : "-"
            }
        };
        n = t.extend(!0, {}, i, n), this.settings = t.extend(!0, {}, s, n), this._defaults = s, "-" == this.settings.content.target && (this.settings.content.target = this.settings.url_target), this.animations = {
            start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart",
            end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend"
        }, "number" == typeof this.settings.offset && (this.settings.offset = {
            x: this.settings.offset,
            y: this.settings.offset
        }), this.init()
    }
    var s = {
        element: "body",
        position: null,
        type: "info",
        allow_dismiss: !0,
        newest_on_top: !1,
        showProgressbar: !1,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5e3,
        timer: 1e3,
        url_target: "_blank",
        mouse_over: null,
        animate: {
            enter: "animated fadeInDown",
            exit: "animated fadeOutUp"
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: "class",
        template: '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    };
    String.format = function() {
        for (var t = arguments[0], e = 1; e < arguments.length; e++) t = t.replace(RegExp("\\{" + (e - 1) + "\\}", "gm"), arguments[e]);
        return t
    }, t.extend(e.prototype, {
        init: function() {
            var t = this;
            this.buildNotify(), this.settings.content.icon && this.setIcon(), "#" != this.settings.content.url && this.styleURL(), this.placement(), this.bind(), this.notify = {
                $ele: this.$ele,
                update: function(e, s) {
                    var i = {};
                    "string" == typeof e ? i[e] = s : i = e;
                    for (var e in i) switch (e) {
                        case "type":
                            this.$ele.removeClass("alert-" + t.settings.type), this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-" + t.settings.type), t.settings.type = i[e], this.$ele.addClass("alert-" + i[e]).find('[data-notify="progressbar"] > .progress-bar').addClass("progress-bar-" + i[e]);
                            break;
                        case "icon":
                            var n = this.$ele.find('[data-notify="icon"]');
                            "class" == t.settings.icon_type.toLowerCase() ? n.removeClass(t.settings.content.icon).addClass(i[e]) : (n.is("img") || n.find("img"), n.attr("src", i[e]));
                            break;
                        case "progress":
                            var a = t.settings.delay - t.settings.delay * (i[e] / 100);
                            this.$ele.data("notify-delay", a), this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", i[e]).css("width", i[e] + "%");
                            break;
                        case "url":
                            this.$ele.find('[data-notify="url"]').attr("href", i[e]);
                            break;
                        case "target":
                            this.$ele.find('[data-notify="url"]').attr("target", i[e]);
                            break;
                        default:
                            this.$ele.find('[data-notify="' + e + '"]').html(i[e])
                    }
                    var o = this.$ele.outerHeight() + parseInt(t.settings.spacing) + parseInt(t.settings.offset.y);
                    t.reposition(o)
                },
                close: function() {
                    t.close()
                }
            }
        },
        buildNotify: function() {
            var e = this.settings.content;
            this.$ele = t(String.format(this.settings.template, this.settings.type, e.title, e.message, e.url, e.target)), this.$ele.attr("data-notify-position", this.settings.placement.from + "-" + this.settings.placement.align), this.settings.allow_dismiss || this.$ele.find('[data-notify="dismiss"]').css("display", "none"), (this.settings.delay <= 0 && !this.settings.showProgressbar || !this.settings.showProgressbar) && this.$ele.find('[data-notify="progressbar"]').remove()
        },
        setIcon: function() {
            "class" == this.settings.icon_type.toLowerCase() ? this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').is("img") ? this.$ele.find('[data-notify="icon"]').attr("src", this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />')
        },
        styleURL: function() {
            this.$ele.find('[data-notify="url"]').css({
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",
                height: "100%",
                left: "0px",
                position: "absolute",
                top: "0px",
                width: "100%",
                zIndex: this.settings.z_index + 1
            }), this.$ele.find('[data-notify="dismiss"]').css({
                position: "absolute",
                right: "10px",
                top: "5px",
                zIndex: this.settings.z_index + 2
            })
        },
        placement: function() {
            var e = this,
                s = this.settings.offset.y,
                i = {
                    display: "inline-block",
                    margin: "0px auto",
                    position: this.settings.position ? this.settings.position : "body" === this.settings.element ? "fixed" : "absolute",
                    transition: "all .5s ease-in-out",
                    zIndex: this.settings.z_index
                },
                n = !1,
                a = this.settings;
            switch (t('[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function() {
                return s = Math.max(s, parseInt(t(this).css(a.placement.from)) + parseInt(t(this).outerHeight()) + parseInt(a.spacing))
            }), 1 == this.settings.newest_on_top && (s = this.settings.offset.y), i[this.settings.placement.from] = s + "px", this.settings.placement.align) {
                case "left":
                case "right":
                    i[this.settings.placement.align] = this.settings.offset.x + "px";
                    break;
                case "center":
                    i.left = 0, i.right = 0
            }
            this.$ele.css(i).addClass(this.settings.animate.enter), t.each(Array("webkit", "moz", "o", "ms", ""), function(t, s) {
                e.$ele[0].style[s + "AnimationIterationCount"] = 1
            }), t(this.settings.element).append(this.$ele), 1 == this.settings.newest_on_top && (s = parseInt(s) + parseInt(this.settings.spacing) + this.$ele.outerHeight(), this.reposition(s)), t.isFunction(e.settings.onShow) && e.settings.onShow.call(this.$ele), this.$ele.one(this.animations.start, function() {
                n = !0
            }).one(this.animations.end, function() {
                t.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
            }), setTimeout(function() {
                n || t.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
            }, 600)
        },
        bind: function() {
            var e = this;
            if (this.$ele.find('[data-notify="dismiss"]').on("click", function() {
                    e.close()
                }), this.$ele.mouseover(function() {
                    t(this).data("data-hover", "true")
                }).mouseout(function() {
                    t(this).data("data-hover", "false")
                }), this.$ele.data("data-hover", "false"), this.settings.delay > 0) {
                e.$ele.data("notify-delay", e.settings.delay);
                var s = setInterval(function() {
                    var t = parseInt(e.$ele.data("notify-delay")) - e.settings.timer;
                    if ("false" === e.$ele.data("data-hover") && "pause" == e.settings.mouse_over || "pause" != e.settings.mouse_over) {
                        var i = (e.settings.delay - t) / e.settings.delay * 100;
                        e.$ele.data("notify-delay", t), e.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", i).css("width", i + "%")
                    }
                    t <= -e.settings.timer && (clearInterval(s), e.close())
                }, e.settings.timer)
            }
        },
        close: function() {
            var e = this,
                s = parseInt(this.$ele.css(this.settings.placement.from)),
                i = !1;
            this.$ele.data("closing", "true").addClass(this.settings.animate.exit), e.reposition(s), t.isFunction(e.settings.onClose) && e.settings.onClose.call(this.$ele), this.$ele.one(this.animations.start, function() {
                i = !0
            }).one(this.animations.end, function() {
                t(this).remove(), t.isFunction(e.settings.onClosed) && e.settings.onClosed.call(this)
            }), setTimeout(function() {
                i || (e.$ele.remove(), e.settings.onClosed && e.settings.onClosed(e.$ele))
            }, 600)
        },
        reposition: function(e) {
            var s = this,
                i = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])',
                n = this.$ele.nextAll(i);
            1 == this.settings.newest_on_top && (n = this.$ele.prevAll(i)), n.each(function() {
                t(this).css(s.settings.placement.from, e), e = parseInt(e) + parseInt(s.settings.spacing) + t(this).outerHeight()
            })
        }
    }), t.notify = function(t, s) {
        var i = new e(this, t, s);
        return i.notify
    }, t.notifyDefaults = function(e) {
        return s = t.extend(!0, {}, s, e)
    }, t.notifyClose = function(e) {
        "undefined" == typeof e || "all" == e ? t("[data-notify]").find('[data-notify="dismiss"]').trigger("click") : t('[data-notify-position="' + e + '"]').find('[data-notify="dismiss"]').trigger("click")
    }
});
(function(f) {
    "function" === typeof define && define.amd ? define(["jquery"], f) : f(window.jQuery || window.Zepto)
})(function(f) {
    var A = function(a, d, b) {
            var h = this,
                m, p;
            a = f(a);
            d = "function" === typeof d ? d(a.val(), void 0, a, b) : d;
            var c = {
                getCaret: function() {
                    try {
                        var e, l = 0,
                            c = a.get(0),
                            g = document.selection,
                            d = c.selectionStart;
                        if (g && !~navigator.appVersion.indexOf("MSIE 10")) e = g.createRange(), e.moveStart("character", a.is("input") ? -a.val().length : -a.text().length), l = e.text.length;
                        else if (d || "0" === d) l = d;
                        return l
                    } catch (b) {}
                },
                setCaret: function(e) {
                    try {
                        if (a.is(":focus")) {
                            var l, c = a.get(0);
                            c.setSelectionRange ? c.setSelectionRange(e, e) : c.createTextRange && (l = c.createTextRange(), l.collapse(!0), l.moveEnd("character", e), l.moveStart("character", e), l.select())
                        }
                    } catch (g) {}
                },
                events: function() {
                    a.on("keydown.mask", function() {
                        m = c.val()
                    }).on("keyup.mask", c.behaviour).on("paste.mask drop.mask", function() {
                        setTimeout(function() {
                            a.keydown().keyup()
                        }, 100)
                    }).on("change.mask", function() {
                        a.data("changed", !0)
                    }).on("blur.mask", function() {
                        m === a.val() || a.data("changed") || a.trigger("change");
                        a.data("changed", !1)
                    }).on("focusout.mask", function() {
                        b.clearIfNotMatch && !p.test(c.val()) && c.val("")
                    })
                },
                getRegexMask: function() {
                    for (var e = [], a, c, g, b, k = 0; k < d.length; k++)(a = h.translation[d[k]]) ? (c = a.pattern.toString().replace(/.{1}$|^.{1}/g, ""), g = a.optional, (a = a.recursive) ? (e.push(d[k]), b = {
                        digit: d[k],
                        pattern: c
                    }) : e.push(g || a ? c + "?" : c)) : e.push(d[k].replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                    e = e.join("");
                    b && (e = e.replace(new RegExp("(" + b.digit + "(.*" + b.digit + ")?)"), "($1)?").replace(new RegExp(b.digit, "g"), b.pattern));
                    return new RegExp(e)
                },
                destroyEvents: function() {
                    a.off("keydown keyup paste drop change blur focusout DOMNodeInserted ".split(" ").join(".mask ")).removeData("changeCalled")
                },
                val: function(e) {
                    var c = a.is("input");
                    return 0 < arguments.length ? c ? a.val(e) : a.text(e) : c ? a.val() : a.text()
                },
                getMCharsBeforeCount: function(e, a) {
                    for (var c = 0, b = 0, f = d.length; b < f && b < e; b++) h.translation[d.charAt(b)] || (e = a ? e + 1 : e, c++);
                    return c
                },
                caretPos: function(e, a, b, g) {
                    return h.translation[d.charAt(Math.min(e - 1, d.length - 1))] ? Math.min(e + b - a - g, b) : c.caretPos(e + 1, a, b, g)
                },
                behaviour: function(a) {
                    a = a || window.event;
                    var b = a.keyCode || a.which;
                    if (-1 === f.inArray(b, h.byPassKeys)) {
                        var d = c.getCaret(),
                            g = c.val(),
                            t = g.length,
                            k = d < t,
                            m = c.getMasked(),
                            n = m.length,
                            p = c.getMCharsBeforeCount(n - 1) - c.getMCharsBeforeCount(t - 1);
                        m !== g && c.val(m);
                        !k || 65 === b && a.ctrlKey || (8 !== b && 46 !== b && (d = c.caretPos(d, t, n, p)), c.setCaret(d));
                        return c.callbacks(a)
                    }
                },
                getMasked: function(a) {
                    var l = [],
                        f = c.val(),
                        g = 0,
                        m = d.length,
                        k = 0,
                        p = f.length,
                        n = 1,
                        u = "push",
                        r = -1,
                        q, v;
                    b.reverse ? (u = "unshift", n = -1, q = 0, g = m - 1, k = p - 1, v = function() {
                        return -1 < g && -1 < k
                    }) : (q = m - 1, v = function() {
                        return g < m && k < p
                    });
                    for (; v();) {
                        var w = d.charAt(g),
                            x = f.charAt(k),
                            s = h.translation[w];
                        if (s) x.match(s.pattern) ? (l[u](x), s.recursive && (-1 === r ? r = g : g === q && (g = r - n), q === r && (g -= n)), g += n) : s.optional && (g += n, k -= n), k += n;
                        else {
                            if (!a) l[u](w);
                            x === w && (k += n);
                            g += n
                        }
                    }
                    a = d.charAt(q);
                    m !== p + 1 || h.translation[a] || l.push(a);
                    return l.join("")
                },
                callbacks: function(e) {
                    var f = c.val(),
                        h = f !== m;
                    if (!0 === h && "function" === typeof b.onChange) b.onChange(f, e, a, b);
                    if (!0 === h && "function" === typeof b.onKeyPress) b.onKeyPress(f, e, a, b);
                    if ("function" === typeof b.onComplete && f.length === d.length) b.onComplete(f, e, a, b)
                }
            };
            h.mask = d;
            h.options = b;
            h.remove = function() {
                var b;
                c.destroyEvents();
                c.val(h.getCleanVal()).removeAttr("maxlength");
                b = c.getCaret();
                c.setCaret(b - c.getMCharsBeforeCount(b));
                return a
            };
            h.getCleanVal = function() {
                return c.getMasked(!0)
            };
            h.init = function() {
                b = b || {};
                h.byPassKeys = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91];
                h.translation = {
                    0: {
                        pattern: /\d/
                    },
                    9: {
                        pattern: /\d/,
                        optional: !0
                    },
                    "#": {
                        pattern: /\d/,
                        recursive: !0
                    },
                    A: {
                        pattern: /[a-zA-Z0-9]/
                    },
                    S: {
                        pattern: /[a-zA-Z]/
                    }
                };
                h.translation = f.extend({}, h.translation, b.translation);
                h = f.extend(!0, {}, h, b);
                p = c.getRegexMask();
                !1 !== b.maxlength && a.attr("maxlength", d.length);
                b.placeholder && a.attr("placeholder", b.placeholder);
                a.attr("autocomplete", "off");
                c.destroyEvents();
                c.events();
                var e = c.getCaret();
                c.val(c.getMasked());
                c.setCaret(e + c.getMCharsBeforeCount(e, !0))
            }()
        },
        y = {},
        z = function() {
            var a = f(this),
                d = {};
            a.attr("data-mask-reverse") && (d.reverse = !0);
            "false" === a.attr("data-mask-maxlength") && (d.maxlength = !1);
            a.attr("data-mask-clearifnotmatch") && (d.clearIfNotMatch = !0);
            a.mask(a.attr("data-mask"), d)
        };
    f.fn.mask = function(a, d) {
        var b = this.selector,
            h = function() {
                var b = f(this).data("mask"),
                    h = JSON.stringify;
                if ("object" !== typeof b || h(b.options) !== h(d) || b.mask !== a) return f(this).data("mask", new A(this, a, d))
            };
        this.each(h);
        b && !y[b] && (y[b] = !0, setTimeout(function() {
            f(document).on("DOMNodeInserted.mask", b, h)
        }, 500))
    };
    f.fn.unmask = function() {
        try {
            return this.each(function() {
                f(this).data("mask").remove().removeData("mask")
            })
        } catch (a) {}
    };
    f.fn.cleanVal = function() {
        return this.data("mask").getCleanVal()
    };
    f("*[data-mask]").each(z);
    f(document).on("DOMNodeInserted.mask", "*[data-mask]", z)
});
! function(e) {
    if ("function" == typeof define && define.amd) define(["jquery"], e);
    else if ("object" == typeof module && module.exports) {
        var t = require("jquery");
        module.exports = e(t)
    } else e(jQuery)
}(function(e) {
    return e.fn.numberMask = function(t) {
        var n, r = {
                type: "int",
                beforePoint: 10,
                afterPoint: 2,
                defaultValueInput: 0,
                allowNegative: !1,
                decimalMark: ["."],
                pattern: ""
            },
            a = function(e) {
                var t = e.which;
                if (e.ctrlKey || e.altKey || e.metaKey || 32 > t) return !0;
                if (t) {
                    var a = String.fromCharCode(t),
                        i = e.target.value,
                        l = o(e.target);
                    return i = i.substring(0, l.start) + a + i.substring(l.end), r.allowNegative && "-" === i || n.test(i)
                }
            },
            i = function(t) {
                var n = e(t.target);
                (13 == t.which || 86 == t.which) && n.val(c(n))
            },
            o = function(e) {
                var t, n, r, a, i, o = 0,
                    l = 0,
                    c = !1;
                return "number" == typeof e.selectionStart && "number" == typeof e.selectionEnd ? (o = e.selectionStart, l = e.selectionEnd) : (n = document.selection.createRange(), n && n.parentElement() == e && (a = e.value.length, t = e.value.replace(/\r\n/g, "\n"), r = e.createTextRange(), r.moveToBookmark(n.getBookmark()), i = e.createTextRange(), i.collapse(!1), r.compareEndPoints("StartToEnd", i) > -1 ? o = l = a : (o = -r.moveStart("character", -a), o += t.slice(0, o).split("\n").length - 1, r.compareEndPoints("EndToEnd", i) > -1 ? l = a : (l = -r.moveEnd("character", -a), l += t.slice(0, l).split("\n").length - 1)))), o - l != 0 && (c = !0), {
                    start: o,
                    end: l,
                    statusSelection: c
                }
            },
            l = function(t) {
                var n = e(t.target);
                "" != n.val() && n.val(c(n))
            },
            c = function(e) {
                var t = e.val();
                return n.test(t) ? t : r.defaultValueInput
            },
            u = function() {
                for (var e = "(\\" + r.decimalMark[0], t = 1; t < r.decimalMark.length; t++) e += "|\\" + r.decimalMark[t];
                return e += ")"
            };
        if (this.bind("keypress", a).bind("keyup", i).bind("blur", l), t && (t.decimalMark && "string" === e.type(t.decimalMark) && (t.decimalMark = [t.decimalMark]), e.extend(r, t)), "object" == typeof r.pattern && r.pattern instanceof RegExp) n = r.pattern;
        else {
            var d = r.allowNegative ? "[-]?" : "",
                f = "^" + d + "\\d{1," + r.beforePoint + "}$",
                s = "^" + d + "\\d{1," + r.beforePoint + "}" + u() + "\\d{0," + r.afterPoint + "}$";
            n = new RegExp("int" == r.type ? f : f + "|" + s)
        }
        return this
    }, e
});

function setMasks() {
    $('.numbers').numberMask({
        type: 'float',
        afterPoint: 4,
        decimalMark: ','
    });
    $('.money').numberMask({
        type: 'float',
        afterPoint: 4,
        decimalMark: ','
    });
    $('.money2').numberMask({
        type: 'float',
        afterPoint: 4,
        decimalMark: ','
    });
    $('.float').numberMask({
        type: 'float',
        afterPoint: 4,
        decimalMark: ','
    });
    $('.cost').numberMask({
        type: 'float',
        afterPoint: 2,
        decimalMark: ','
    });
    $('.hours').numberMask({
        type: 'float',
        afterPoint: 4,
        decimalMark: ','
    });
    $('.date').mask('00/00/0000');
    $('.time').mask('00:00:00');
    $('.date_time').mask('00/00/0000 00:00:00');
    $('.cep').mask('00000-000');
    $('.year').mask('ABBB', {
        translation: {
            'A': {
                pattern: /[1-2]/
            },
            'B': {
                pattern: /[0-9]/
            }
        }
    });
    $('.phone').mask('0000-0000');
    $('.phone_with_ddd').mask('(00) 0000-0000');
    $('.phone_us').mask('(000) 000-0000');
    $('.mixed').mask('AAA 000-S0S');
    $('.cpf').mask('000.000.000-00', {
        reverse: true
    });
    $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
        translation: {
            'Z': {
                pattern: /[0-9]/,
                optional: true
            }
        }
    });
    $('.ip_address').mask('099.099.099.099');
    $('.percent').mask('##0,00%', {
        reverse: true
    });
    $('.clear-if-not-match').mask("00/00/0000", {
        clearIfNotMatch: true
    });
    $('.placeholder').mask("00/00/0000", {
        placeholder: "__/__/____"
    });
    $('.fallback').mask("00r00r0000", {
        translation: {
            'r': {
                pattern: /[\/]/,
                fallback: '/'
            },
            placeholder: "__/__/____"
        }
    });
    $('.selectonfocus').mask("00/00/0000", {
        selectOnFocus: true
    });
    var SPMaskBehavior = function(val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        spOptions = {
            onKeyPress: function(val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };
    $('.sp_celphones').mask(SPMaskBehavior, spOptions);
}! function(a) {
    "use strict";

    function b(a, b) {
        return a.toUpperCase().indexOf(b.toUpperCase()) > -1
    }

    function c(b) {
        var c = [{
            re: /[\xC0-\xC6]/g,
            ch: "A"
        }, {
            re: /[\xE0-\xE6]/g,
            ch: "a"
        }, {
            re: /[\xC8-\xCB]/g,
            ch: "E"
        }, {
            re: /[\xE8-\xEB]/g,
            ch: "e"
        }, {
            re: /[\xCC-\xCF]/g,
            ch: "I"
        }, {
            re: /[\xEC-\xEF]/g,
            ch: "i"
        }, {
            re: /[\xD2-\xD6]/g,
            ch: "O"
        }, {
            re: /[\xF2-\xF6]/g,
            ch: "o"
        }, {
            re: /[\xD9-\xDC]/g,
            ch: "U"
        }, {
            re: /[\xF9-\xFC]/g,
            ch: "u"
        }, {
            re: /[\xC7-\xE7]/g,
            ch: "c"
        }, {
            re: /[\xD1]/g,
            ch: "N"
        }, {
            re: /[\xF1]/g,
            ch: "n"
        }];
        return a.each(c, function() {
            b = b.replace(this.re, this.ch)
        }), b
    }

    function d(a) {
        var b = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            c = "(?:" + Object.keys(b).join("|") + ")",
            d = new RegExp(c),
            e = new RegExp(c, "g"),
            f = null == a ? "" : "" + a;
        return d.test(f) ? f.replace(e, function(a) {
            return b[a]
        }) : f
    }

    function e(b, c) {
        var d = arguments,
            e = b,
            b = d[0],
            c = d[1];
        [].shift.apply(d), "undefined" == typeof b && (b = e);
        var g, h = this.each(function() {
            var e = a(this);
            if (e.is("select")) {
                var h = e.data("selectpicker"),
                    i = "object" == typeof b && b;
                if (h) {
                    if (i)
                        for (var j in i) i.hasOwnProperty(j) && (h.options[j] = i[j])
                } else {
                    var k = a.extend({}, f.DEFAULTS, a.fn.selectpicker.defaults || {}, e.data(), i);
                    e.data("selectpicker", h = new f(this, k, c))
                }
                "string" == typeof b && (g = h[b] instanceof Function ? h[b].apply(h, d) : h.options[b])
            }
        });
        return "undefined" != typeof g ? g : h
    }
    a.expr[":"].icontains = function(c, d, e) {
        return b(a(c).text(), e[3])
    }, a.expr[":"].aicontains = function(c, d, e) {
        return b(a(c).data("normalizedText") || a(c).text(), e[3])
    };
    var f = function(b, c, d) {
        d && (d.stopPropagation(), d.preventDefault()), this.$element = a(b), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = c, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = f.prototype.val, this.render = f.prototype.render, this.refresh = f.prototype.refresh, this.setStyle = f.prototype.setStyle, this.selectAll = f.prototype.selectAll, this.deselectAll = f.prototype.deselectAll, this.destroy = f.prototype.remove, this.remove = f.prototype.remove, this.show = f.prototype.show, this.hide = f.prototype.hide, this.init()
    };
    f.VERSION = "1.6.3", f.DEFAULTS = {
        noneSelectedText: "Nothing selected",
        noneResultsText: "No results match",
        countSelectedText: function(a) {
            return 1 == a ? "{0} item selected" : "{0} items selected"
        },
        maxOptionsText: function(a, b) {
            var c = [];
            return c[0] = 1 == a ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", c[1] = 1 == b ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)", c
        },
        selectAllText: "Select All",
        deselectAllText: "Deselect All",
        multipleSeparator: ", ",
        style: "btn-default",
        size: "auto",
        title: null,
        selectedTextFormat: "values",
        width: !1,
        container: !1,
        hideDisabled: !1,
        showSubtext: !1,
        showIcon: !0,
        showContent: !0,
        dropupAuto: !0,
        header: !1,
        liveSearch: !1,
        actionsBox: !1,
        iconBase: "glyphicon",
        tickIcon: "glyphicon-ok",
        maxOptions: !1,
        mobile: !1,
        selectOnTab: !1,
        dropdownAlignRight: !1,
        searchAccentInsensitive: !1
    }, f.prototype = {
        constructor: f,
        init: function() {
            var b = this,
                c = this.$element.attr("id");
            this.$element.hide(), this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement), this.$menu = this.$newElement.find("> .dropdown-menu"), this.$button = this.$newElement.find("> button"), this.$searchbox = this.$newElement.find("input"), this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof c && (this.$button.attr("data-id", c), a('label[for="' + c + '"]').click(function(a) {
                a.preventDefault(), b.$button.focus()
            })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.liHeight(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile()
        },
        createDropdown: function() {
            var b = this.multiple ? " show-tick" : "",
                c = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
                d = this.autofocus ? " autofocus" : "",
                e = this.$element.parents().hasClass("form-group-lg") ? " btn-lg" : this.$element.parents().hasClass("form-group-sm") ? " btn-sm" : "",
                f = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
                g = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="input-block-level form-control" autocomplete="off" /></div>' : "",
                h = this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-block"><button class="actions-btn bs-select-all btn btn-sm btn-default">' + this.options.selectAllText + '</button><button class="actions-btn bs-deselect-all btn btn-sm btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
                i = '<div class="btn-group bootstrap-select' + b + c + '"><button type="button" class="btn dropdown-toggle selectpicker' + e + '" data-toggle="dropdown"' + d + '><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">' + f + g + h + '<ul class="dropdown-menu inner selectpicker" role="menu"></ul></div></div>';
            return a(i)
        },
        createView: function() {
            var a = this.createDropdown(),
                b = this.createLi();
            return a.find("ul").append(b), a
        },
        reloadLi: function() {
            this.destroyLi();
            var a = this.createLi();
            this.$menu.find("ul").append(a)
        },
        destroyLi: function() {
            this.$menu.find("li").remove()
        },
        createLi: function() {
            var b = this,
                e = [],
                f = 0,
                g = function(a, b, c) {
                    return "<li" + ("undefined" != typeof c ? ' class="' + c + '"' : "") + ("undefined" != typeof b | null === b ? ' data-original-index="' + b + '"' : "") + ">" + a + "</li>"
                },
                h = function(a, e, f, g) {
                    var h = c(d(a));
                    return '<a tabindex="0"' + ("undefined" != typeof e ? ' class="' + e + '"' : "") + ("undefined" != typeof f ? ' style="' + f + '"' : "") + ("undefined" != typeof g ? 'data-optgroup="' + g + '"' : "") + ' data-normalized-text="' + h + '">' + a + '<span class="' + b.options.iconBase + " " + b.options.tickIcon + ' check-mark"></span></a>'
                };
            return this.$element.find("option").each(function() {
                var c = a(this),
                    d = c.attr("class") || "",
                    i = c.attr("style"),
                    j = c.data("content") ? c.data("content") : c.html(),
                    k = "undefined" != typeof c.data("subtext") ? '<small class="muted text-muted">' + c.data("subtext") + "</small>" : "",
                    l = "undefined" != typeof c.data("icon") ? '<span class="' + b.options.iconBase + " " + c.data("icon") + '"></span> ' : "",
                    m = c.is(":disabled") || c.parent().is(":disabled"),
                    n = c[0].index;
                if ("" !== l && m && (l = "<span>" + l + "</span>"), c.data("content") || (j = l + '<span class="text">' + j + k + "</span>"), !b.options.hideDisabled || !m)
                    if (c.parent().is("optgroup") && c.data("divider") !== !0) {
                        if (0 === c.index()) {
                            f += 1;
                            var o = c.parent().attr("label"),
                                p = "undefined" != typeof c.parent().data("subtext") ? '<small class="muted text-muted">' + c.parent().data("subtext") + "</small>" : "",
                                q = c.parent().data("icon") ? '<span class="' + b.options.iconBase + " " + c.parent().data("icon") + '"></span> ' : "";
                            o = q + '<span class="text">' + o + p + "</span>", 0 !== n && e.length > 0 && e.push(g("", null, "divider")), e.push(g(o, null, "dropdown-header"))
                        }
                        e.push(g(h(j, "opt " + d, i, f), n))
                    } else e.push(c.data("divider") === !0 ? g("", n, "divider") : c.data("hidden") === !0 ? g(h(j, d, i), n, "hide is-hidden") : g(h(j, d, i), n))
            }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), a(e.join(""))
        },
        findLis: function() {
            return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
        },
        render: function(b) {
            var c = this;
            b !== !1 && this.$element.find("option").each(function(b) {
                c.setDisabled(b, a(this).is(":disabled") || a(this).parent().is(":disabled")), c.setSelected(b, a(this).is(":selected"))
            }), this.tabIndex();
            var e = this.options.hideDisabled ? ":not([disabled])" : "",
                f = this.$element.find("option:selected" + e).map(function() {
                    var b, d = a(this),
                        e = d.data("icon") && c.options.showIcon ? '<i class="' + c.options.iconBase + " " + d.data("icon") + '"></i> ' : "";
                    return b = c.options.showSubtext && d.attr("data-subtext") && !c.multiple ? ' <small class="muted text-muted">' + d.data("subtext") + "</small>" : "", d.data("content") && c.options.showContent ? d.data("content") : "undefined" != typeof d.attr("title") ? d.attr("title") : e + d.html() + b
                }).toArray(),
                g = this.multiple ? f.join(this.options.multipleSeparator) : f[0];
            if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                var h = this.options.selectedTextFormat.split(">");
                if (h.length > 1 && f.length > h[1] || 1 == h.length && f.length >= 2) {
                    e = this.options.hideDisabled ? ", [disabled]" : "";
                    var i = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + e).length,
                        j = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(f.length, i) : this.options.countSelectedText;
                    g = j.replace("{0}", f.length.toString()).replace("{1}", i.toString())
                }
            }
            this.options.title = this.$element.attr("title"), "static" == this.options.selectedTextFormat && (g = this.options.title), g || (g = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", d(g)), this.$newElement.find(".filter-option").html(g)
        },
        setStyle: function(a, b) {
            this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|validate\[.*\]/gi, ""));
            var c = a ? a : this.options.style;
            "add" == b ? this.$button.addClass(c) : "remove" == b ? this.$button.removeClass(c) : (this.$button.removeClass(this.options.style), this.$button.addClass(c))
        },
        liHeight: function() {
            if (this.options.size !== !1) {
                var a = this.$menu.parent().clone().find("> .dropdown-toggle").prop("autofocus", !1).end().appendTo("body"),
                    b = a.addClass("open").find("> .dropdown-menu"),
                    c = b.find("li").not(".divider").not(".dropdown-header").filter(":visible").children("a").outerHeight(),
                    d = this.options.header ? b.find(".popover-title").outerHeight() : 0,
                    e = this.options.liveSearch ? b.find(".bs-searchbox").outerHeight() : 0,
                    f = this.options.actionsBox ? b.find(".bs-actionsbox").outerHeight() : 0;
                a.remove(), this.$newElement.data("liHeight", c).data("headerHeight", d).data("searchHeight", e).data("actionsHeight", f)
            }
        },
        setSize: function() {
            this.findLis();
            var b, c, d, e = this,
                f = this.$menu,
                g = f.find(".inner"),
                h = this.$newElement.outerHeight(),
                i = this.$newElement.data("liHeight"),
                j = this.$newElement.data("headerHeight"),
                k = this.$newElement.data("searchHeight"),
                l = this.$newElement.data("actionsHeight"),
                m = this.$lis.filter(".divider").outerHeight(!0),
                n = parseInt(f.css("padding-top")) + parseInt(f.css("padding-bottom")) + parseInt(f.css("border-top-width")) + parseInt(f.css("border-bottom-width")),
                o = this.options.hideDisabled ? ", .disabled" : "",
                p = a(window),
                q = n + parseInt(f.css("margin-top")) + parseInt(f.css("margin-bottom")) + 2,
                r = function() {
                    c = e.$newElement.offset().top - p.scrollTop(), d = p.height() - c - h
                };
            if (r(), this.options.header && f.css("padding-top", 0), "auto" == this.options.size) {
                var s = function() {
                    var a, h = e.$lis.not(".hide");
                    r(), b = d - q, e.options.dropupAuto && e.$newElement.toggleClass("dropup", c > d && b - q < f.height()), e.$newElement.hasClass("dropup") && (b = c - q), a = h.length + h.filter(".dropdown-header").length > 3 ? 3 * i + q - 2 : 0, f.css({
                        "max-height": b + "px",
                        overflow: "hidden",
                        "min-height": a + j + k + l + "px"
                    }), g.css({
                        "max-height": b - j - k - l - n + "px",
                        "overflow-y": "auto",
                        "min-height": Math.max(a - n, 0) + "px"
                    })
                };
                s(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", s), a(window).off("resize.getSize").on("resize.getSize", s), a(window).off("scroll.getSize").on("scroll.getSize", s)
            } else if (this.options.size && "auto" != this.options.size && f.find("li" + o).length > this.options.size) {
                var t = this.$lis.not(".divider" + o).find(" > *").slice(0, this.options.size).last().parent().index(),
                    u = this.$lis.slice(0, t + 1).filter(".divider").length;
                b = i * this.options.size + u * m + n, e.options.dropupAuto && this.$newElement.toggleClass("dropup", c > d && b < f.height()), f.css({
                    "max-height": b + j + k + l + "px",
                    overflow: "hidden"
                }), g.css({
                    "max-height": b - n + "px",
                    "overflow-y": "auto"
                })
            }
        },
        setWidth: function() {
            if ("auto" == this.options.width) {
                this.$menu.css("min-width", "0");
                var a = this.$newElement.clone().appendTo("body"),
                    b = a.find("> .dropdown-menu").css("width"),
                    c = a.css("width", "auto").find("> button").css("width");
                a.remove(), this.$newElement.css("width", Math.max(parseInt(b), parseInt(c)) + "px")
            } else "fit" == this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
            this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
        },
        selectPosition: function() {
            var b, c, d = this,
                e = "<div />",
                f = a(e),
                g = function(a) {
                    f.addClass(a.attr("class").replace(/form-control/gi, "")).toggleClass("dropup", a.hasClass("dropup")), b = a.offset(), c = a.hasClass("dropup") ? 0 : a[0].offsetHeight, f.css({
                        top: b.top + c,
                        left: b.left,
                        width: a[0].offsetWidth,
                        position: "absolute"
                    })
                };
            this.$newElement.on("click", function() {
                d.isDisabled() || (g(a(this)), f.appendTo(d.options.container), f.toggleClass("open", !a(this).hasClass("open")), f.append(d.$menu))
            }), a(window).resize(function() {
                g(d.$newElement)
            }), a(window).on("scroll", function() {
                g(d.$newElement)
            }), a("html").on("click", function(b) {
                a(b.target).closest(d.$newElement).length < 1 && f.removeClass("open")
            })
        },
        setSelected: function(a, b) {
            this.findLis(), this.$lis.filter('[data-original-index="' + a + '"]').toggleClass("selected", b)
        },
        setDisabled: function(a, b) {
            this.findLis(), b ? this.$lis.filter('[data-original-index="' + a + '"]').addClass("disabled").find("a").attr("href", "#").attr("tabindex", -1) : this.$lis.filter('[data-original-index="' + a + '"]').removeClass("disabled").find("a").removeAttr("href").attr("tabindex", 0)
        },
        isDisabled: function() {
            return this.$element.is(":disabled")
        },
        checkDisabled: function() {
            var a = this;
            this.isDisabled() ? this.$button.addClass("disabled").attr("tabindex", -1) : (this.$button.hasClass("disabled") && this.$button.removeClass("disabled"), -1 == this.$button.attr("tabindex") && (this.$element.data("tabindex") || this.$button.removeAttr("tabindex"))), this.$button.click(function() {
                return !a.isDisabled()
            })
        },
        tabIndex: function() {
            this.$element.is("[tabindex]") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex")))
        },
        clickListener: function() {
            var b = this;
            this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function(a) {
                a.stopPropagation()
            }), this.$newElement.on("click", function() {
                b.setSize(), b.options.liveSearch || b.multiple || setTimeout(function() {
                    b.$menu.find(".selected a").focus()
                }, 10)
            }), this.$menu.on("click", "li a", function(c) {
                var d = a(this),
                    e = d.parent().data("originalIndex"),
                    f = b.$element.val(),
                    g = b.$element.prop("selectedIndex");
                if (b.multiple && c.stopPropagation(), c.preventDefault(), !b.isDisabled() && !d.parent().hasClass("disabled")) {
                    var h = b.$element.find("option"),
                        i = h.eq(e),
                        j = i.prop("selected"),
                        k = i.parent("optgroup"),
                        l = b.options.maxOptions,
                        m = k.data("maxOptions") || !1;
                    if (b.multiple) {
                        if (i.prop("selected", !j), b.setSelected(e, !j), d.blur(), l !== !1 || m !== !1) {
                            var n = l < h.filter(":selected").length,
                                o = m < k.find("option:selected").length;
                            if (l && n || m && o)
                                if (l && 1 == l) h.prop("selected", !1), i.prop("selected", !0), b.$menu.find(".selected").removeClass("selected"), b.setSelected(e, !0);
                                else if (m && 1 == m) {
                                k.find("option:selected").prop("selected", !1), i.prop("selected", !0);
                                var p = d.data("optgroup");
                                b.$menu.find(".selected").has('a[data-optgroup="' + p + '"]').removeClass("selected"), b.setSelected(e, !0)
                            } else {
                                var q = "function" == typeof b.options.maxOptionsText ? b.options.maxOptionsText(l, m) : b.options.maxOptionsText,
                                    r = q[0].replace("{n}", l),
                                    s = q[1].replace("{n}", m),
                                    t = a('<div class="notify"></div>');
                                q[2] && (r = r.replace("{var}", q[2][l > 1 ? 0 : 1]), s = s.replace("{var}", q[2][m > 1 ? 0 : 1])), i.prop("selected", !1), b.$menu.append(t), l && n && (t.append(a("<div>" + r + "</div>")), b.$element.trigger("maxReached.bs.select")), m && o && (t.append(a("<div>" + s + "</div>")), b.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
                                    b.setSelected(e, !1)
                                }, 10), t.delay(750).fadeOut(300, function() {
                                    a(this).remove()
                                })
                            }
                        }
                    } else h.prop("selected", !1), i.prop("selected", !0), b.$menu.find(".selected").removeClass("selected"), b.setSelected(e, !0);
                    b.multiple ? b.options.liveSearch && b.$searchbox.focus() : b.$button.focus(), (f != b.$element.val() && b.multiple || g != b.$element.prop("selectedIndex") && !b.multiple) && b.$element.change()
                }
            }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(a) {
                a.target == this && (a.preventDefault(), a.stopPropagation(), b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus())
            }), this.$menu.on("click", "li.divider, li.dropdown-header", function(a) {
                a.preventDefault(), a.stopPropagation(), b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus()
            }), this.$menu.on("click", ".popover-title .close", function() {
                b.$button.focus()
            }), this.$searchbox.on("click", function(a) {
                a.stopPropagation()
            }), this.$menu.on("click", ".actions-btn", function(c) {
                b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus(), c.preventDefault(), c.stopPropagation(), a(this).is(".bs-select-all") ? b.selectAll() : b.deselectAll(), b.$element.change()
            }), this.$element.change(function() {
                b.render(!1)
            })
        },
        liveSearchListener: function() {
            var b = this,
                e = a('<li class="no-results"></li>');
            this.$newElement.on("click.dropdown.data-api touchstart.dropdown.data-api", function() {
                b.$menu.find(".active").removeClass("active"), b.$searchbox.val() && (b.$searchbox.val(""), b.$lis.not(".is-hidden").removeClass("hide"), e.parent().length && e.remove()), b.multiple || b.$menu.find(".selected").addClass("active"), setTimeout(function() {
                    b.$searchbox.focus()
                }, 10)
            }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(a) {
                a.stopPropagation()
            }), this.$searchbox.on("input propertychange", function() {
                b.$searchbox.val() ? (b.options.searchAccentInsensitive ? b.$lis.not(".is-hidden").removeClass("hide").find("a").not(":aicontains(" + c(b.$searchbox.val()) + ")").parent().addClass("hide") : b.$lis.not(".is-hidden").removeClass("hide").find("a").not(":icontains(" + b.$searchbox.val() + ")").parent().addClass("hide"), b.$menu.find("li").filter(":visible:not(.no-results)").length ? e.parent().length && e.remove() : (e.parent().length && e.remove(), e.html(b.options.noneResultsText + ' "' + d(b.$searchbox.val()) + '"').show(), b.$menu.find("li").last().after(e))) : (b.$lis.not(".is-hidden").removeClass("hide"), e.parent().length && e.remove()), b.$menu.find("li.active").removeClass("active"), b.$menu.find("li").filter(":visible:not(.divider)").eq(0).addClass("active").find("a").focus(), a(this).focus()
            })
        },
        val: function(a) {
            return "undefined" != typeof a ? (this.$element.val(a), this.render(), this.$element) : this.$element.val()
        },
        selectAll: function() {
            this.findLis(), this.$lis.not(".divider").not(".disabled").not(".selected").filter(":visible").find("a").click()
        },
        deselectAll: function() {
            this.findLis(), this.$lis.not(".divider").not(".disabled").filter(".selected").filter(":visible").find("a").click()
        },
        keydown: function(b) {
            var d, e, f, g, h, i, j, k, l, m = a(this),
                n = m.is("input") ? m.parent().parent() : m.parent(),
                o = n.data("this"),
                p = {
                    32: " ",
                    48: "0",
                    49: "1",
                    50: "2",
                    51: "3",
                    52: "4",
                    53: "5",
                    54: "6",
                    55: "7",
                    56: "8",
                    57: "9",
                    59: ";",
                    65: "a",
                    66: "b",
                    67: "c",
                    68: "d",
                    69: "e",
                    70: "f",
                    71: "g",
                    72: "h",
                    73: "i",
                    74: "j",
                    75: "k",
                    76: "l",
                    77: "m",
                    78: "n",
                    79: "o",
                    80: "p",
                    81: "q",
                    82: "r",
                    83: "s",
                    84: "t",
                    85: "u",
                    86: "v",
                    87: "w",
                    88: "x",
                    89: "y",
                    90: "z",
                    96: "0",
                    97: "1",
                    98: "2",
                    99: "3",
                    100: "4",
                    101: "5",
                    102: "6",
                    103: "7",
                    104: "8",
                    105: "9"
                };
            if (o.options.liveSearch && (n = m.parent().parent()), o.options.container && (n = o.$menu), d = a("[role=menu] li a", n), l = o.$menu.parent().hasClass("open"), !l && /([0-9]|[A-z])/.test(String.fromCharCode(b.keyCode)) && (o.options.container ? o.$newElement.trigger("click") : (o.setSize(), o.$menu.parent().addClass("open"), l = !0), o.$searchbox.focus()), o.options.liveSearch && (/(^9$|27)/.test(b.keyCode.toString(10)) && l && 0 === o.$menu.find(".active").length && (b.preventDefault(), o.$menu.parent().removeClass("open"), o.$button.focus()), d = a("[role=menu] li:not(.divider):not(.dropdown-header):visible", n), m.val() || /(38|40)/.test(b.keyCode.toString(10)) || 0 === d.filter(".active").length && (d = o.$newElement.find("li").filter(o.options.searchAccentInsensitive ? ":aicontains(" + c(p[b.keyCode]) + ")" : ":icontains(" + p[b.keyCode] + ")"))), d.length) {
                if (/(38|40)/.test(b.keyCode.toString(10))) e = d.index(d.filter(":focus")), g = d.parent(":not(.disabled):visible").first().index(), h = d.parent(":not(.disabled):visible").last().index(), f = d.eq(e).parent().nextAll(":not(.disabled):visible").eq(0).index(), i = d.eq(e).parent().prevAll(":not(.disabled):visible").eq(0).index(), j = d.eq(f).parent().prevAll(":not(.disabled):visible").eq(0).index(), o.options.liveSearch && (d.each(function(b) {
                    a(this).is(":not(.disabled)") && a(this).data("index", b)
                }), e = d.index(d.filter(".active")), g = d.filter(":not(.disabled):visible").first().data("index"), h = d.filter(":not(.disabled):visible").last().data("index"), f = d.eq(e).nextAll(":not(.disabled):visible").eq(0).data("index"), i = d.eq(e).prevAll(":not(.disabled):visible").eq(0).data("index"), j = d.eq(f).prevAll(":not(.disabled):visible").eq(0).data("index")), k = m.data("prevIndex"), 38 == b.keyCode && (o.options.liveSearch && (e -= 1), e != j && e > i && (e = i), g > e && (e = g), e == k && (e = h)), 40 == b.keyCode && (o.options.liveSearch && (e += 1), -1 == e && (e = 0), e != j && f > e && (e = f), e > h && (e = h), e == k && (e = g)), m.data("prevIndex", e), o.options.liveSearch ? (b.preventDefault(), m.is(".dropdown-toggle") || (d.removeClass("active"), d.eq(e).addClass("active").find("a").focus(), m.focus())) : d.eq(e).focus();
                else if (!m.is("input")) {
                    var q, r, s = [];
                    d.each(function() {
                        a(this).parent().is(":not(.disabled)") && a.trim(a(this).text().toLowerCase()).substring(0, 1) == p[b.keyCode] && s.push(a(this).parent().index())
                    }), q = a(document).data("keycount"), q++, a(document).data("keycount", q), r = a.trim(a(":focus").text().toLowerCase()).substring(0, 1), r != p[b.keyCode] ? (q = 1, a(document).data("keycount", q)) : q >= s.length && (a(document).data("keycount", 0), q > s.length && (q = 1)), d.eq(s[q - 1]).focus()
                }(/(13|32)/.test(b.keyCode.toString(10)) || /(^9$)/.test(b.keyCode.toString(10)) && o.options.selectOnTab) && l && (/(32)/.test(b.keyCode.toString(10)) || b.preventDefault(), o.options.liveSearch ? /(32)/.test(b.keyCode.toString(10)) || (o.$menu.find(".active a").click(), m.focus()) : a(":focus").click(), a(document).data("keycount", 0)), (/(^9$|27)/.test(b.keyCode.toString(10)) && l && (o.multiple || o.options.liveSearch) || /(27)/.test(b.keyCode.toString(10)) && !l) && (o.$menu.parent().removeClass("open"), o.$button.focus())
            }
        },
        mobile: function() {
            this.$element.addClass("mobile-device").appendTo(this.$newElement), this.options.container && this.$menu.hide()
        },
        refresh: function() {
            this.$lis = null, this.reloadLi(), this.render(), this.setWidth(), this.setStyle(), this.checkDisabled(), this.liHeight()
        },
        update: function() {
            this.reloadLi(), this.setWidth(), this.setStyle(), this.checkDisabled(), this.liHeight()
        },
        hide: function() {
            this.$newElement.hide()
        },
        show: function() {
            this.$newElement.show()
        },
        remove: function() {
            this.$newElement.remove(), this.$element.remove()
        }
    };
    var g = a.fn.selectpicker;
    a.fn.selectpicker = e, a.fn.selectpicker.Constructor = f, a.fn.selectpicker.noConflict = function() {
        return a.fn.selectpicker = g, this
    }, a(document).data("keycount", 0).on("keydown", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input", f.prototype.keydown).on("focusin.modal", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input", function(a) {
        a.stopPropagation()
    }), a(window).on("load.bs.select.data-api", function() {
        a(".selectpicker").each(function() {
            var b = a(this);
            e.call(b, b.data())
        })
    })
}(jQuery);
! function(a) {
    a.fn.selectpicker.defaults = {
        noneSelectedText: "Nada selecionado",
        noneResultsText: "Nada encontrado contendo",
        countSelectedText: "Selecionado {0} de {1}",
        maxOptionsText: ["Limite excedido (mÃ¡x. {n} {var})", "Limite do grupo excedido (mÃ¡x. {n} {var})", ["itens", "item"]],
        multipleSeparator: ", "
    }
}(jQuery);
(function($) {
    var flip = function($dom) {
        $dom.data("fliped", true);
        var rotateAxis = "rotate" + $dom.data("axis");
        $dom.find(".front").css({
            transform: rotateAxis + ($dom.data("reverse") ? "(-180deg)" : "(180deg)")
        });
        $dom.find(".back").css({
            transform: rotateAxis + "(0deg)"
        });
    };
    var unflip = function($dom) {
        $dom.data("fliped", false);
        var rotateAxis = "rotate" + $dom.data("axis");
        $dom.find(".front").css({
            transform: rotateAxis + "(0deg)"
        });
        $dom.find(".back").css({
            transform: rotateAxis + ($dom.data("reverse") ? "(180deg)" : "(-180deg)")
        });
    };
    $.fn.flip = function(options) {
        this.each(function() {
            var $dom = $(this);
            if (options !== undefined && typeof(options) == "boolean") {
                if (options) {
                    flip($dom);
                } else {
                    unflip($dom);
                }
            } else {
                var settings = $.extend({
                    axis: "y",
                    reverse: false,
                    trigger: "click",
                    speed: 500
                }, options);
                $dom.data("reverse", settings.reverse);
                $dom.data("axis", settings.axis);
                if (settings.axis.toLowerCase() == "x") {
                    var prespective = $dom.outerHeight() * 2;
                    var rotateAxis = "rotatex";
                } else {
                    var prespective = $dom.outerWidth() * 2;
                    var rotateAxis = "rotatey";
                }
                $dom.find(".back").css({
                    transform: rotateAxis + "(" + (settings.reverse ? "180deg" : "-180deg") + ")"
                });
                $dom.css({
                    perspective: prespective,
                    position: "relative"
                });
                var speedInSec = settings.speed / 1000 || 0.5;
                $dom.find(".front, .back").outerHeight($dom.height()).outerWidth($dom.width()).css({
                    "transform-style": "preserve-3d",
                    position: "absolute",
                    transition: "all " + speedInSec + "s ease-out",
                    "backface-visibility": "hidden"
                });
                if (settings.trigger.toLowerCase() == "click") {
                    $dom.find('button, a, input[type="submit"]').click(function(event) {
                        event.stopPropagation();
                    });
                    $dom.click(function() {
                        if ($dom.data("fliped")) {
                            unflip($dom);
                        } else {
                            flip($dom);
                        }
                    });
                } else if (settings.trigger.toLowerCase() == "hover") {
                    var performFlip = function() {
                        $dom.unbind('mouseleave', performUnflip);
                        flip($dom);
                        setTimeout(function() {
                            $dom.bind('mouseleave', performUnflip);
                            if (!$dom.is(":hover")) {
                                unflip($dom);
                            }
                        }, (settings.speed + 150));
                    };
                    var performUnflip = function() {
                        unflip($dom);
                    };
                    $dom.mouseenter(performFlip);
                    $dom.mouseleave(performUnflip);
                }
            }
        });
        return this;
    };
}(jQuery));
! function(a, b) {
    var c = function(c, d) {
        var e, f, g = this;
        d = d || {}, this.$element = a(c), this.options = a.extend(!0, {}, a.fn.ajaxSelectPicker.defaults, d), this.LOG_ERROR = 1, this.LOG_WARNING = 2, this.LOG_INFO = 3, this.LOG_DEBUG = 4, this.lastRequest = !1, this.previousQuery = "", this.query = "", this.request = !1;
        var h = [{
            from: "ajaxResultsPreHook",
            to: "preprocessData"
        }, {
            from: "ajaxSearchUrl",
            to: {
                ajax: {
                    url: "{{{value}}}"
                }
            }
        }, {
            from: "ajaxOptions",
            to: "ajax"
        }, {
            from: "debug",
            to: function(b) {
                var c = {};
                c.log = Boolean(g.options[b.from]) ? g.LOG_DEBUG : 0, g.options = a.extend(!0, {}, g.options, c), delete g.options[b.from], g.log(g.LOG_WARNING, 'Deprecated option "' + b.from + '". Update code to use:', c)
            }
        }, {
            from: "mixWithCurrents",
            to: "preserveSelected"
        }, {
            from: "placeHolderOption",
            to: {
                locale: {
                    emptyTitle: "{{{value}}}"
                }
            }
        }];
        h.length && a.map(h, function(b) {
            if (g.options[b.from])
                if (a.isPlainObject(b.to)) g.replaceValue(b.to, "{{{value}}}", g.options[b.from]), g.options = a.extend(!0, {}, g.options, b.to), g.log(g.LOG_WARNING, 'Deprecated option "' + b.from + '". Update code to use:', b.to), delete g.options[b.from];
                else if (a.isFunction(b.to)) b.to.apply(g, [b]);
            else {
                var c = {};
                c[b.to] = g.options[b.from], g.options = a.extend(!0, {}, g.options, c), g.log(g.LOG_WARNING, 'Deprecated option "' + b.from + '". Update code to use:', c), delete g.options[b.from]
            }
        });
        var i = this.$element.data();
        i.searchUrl && (g.log(g.LOG_WARNING, 'Deprecated attribute name: "data-search-url". Update markup to use: \' data-abs-ajax-url="' + i.searchUrl + "\" '"), this.options.ajax.url = i.searchUrl);
        var j = function(a, b) {
                return b.toLowerCase()
            },
            k = function(a, b, c) {
                var d = [].concat(a),
                    e = d.length,
                    f = c || {};
                if (e) {
                    var g = d.shift();
                    f[g] = k(d, b, f[g])
                }
                return e ? f : b
            },
            l = Object.keys(i).filter(/./.test.bind(new RegExp("^abs[A-Z]")));
        if (l.length) {
            var m = {},
                n = ["locale"];
            for (e = 0, f = l.length; f > e; e++) {
                var o = l[e].replace(/^abs([A-Z])/, j).replace(/([A-Z])/g, "-$1").toLowerCase(),
                    p = o.split("-");
                if (p[0] && p.length > 1 && -1 !== n.indexOf(p[0])) {
                    for (var q = [p.shift()], r = "", s = 0; s < p.length; s++) r += 0 === s ? p[s] : p[s].charAt(0).toUpperCase() + p[s].slice(1);
                    q.push(r), p = q
                }
                this.log(this.LOG_DEBUG, 'Processing data attribute "data-abs-' + o + '":', i[l[e]]), k(p, i[l[e]], m)
            }
            this.options = a.extend(!0, {}, this.options, m), this.log(this.LOG_DEBUG, "Merged in the data attribute options: ", m, this.options)
        }
        if (this.selectpicker = i.selectpicker, !this.selectpicker) return this.log(this.LOG_ERROR, "Cannot instantiate an AjaxBootstrapSelect instance without selectpicker first being initialized!"), null;
        if (!this.options.ajax.url) return this.log(this.LOG_ERROR, 'Option "ajax.url" must be set! Options:', this.options), null;
        if (this.locale = a.extend(!0, {}, a.fn.ajaxSelectPicker.locale), this.options.langCode = this.options.langCode || b.navigator.userLanguage || b.navigator.language || "en", !this.locale[this.options.langCode]) {
            var t = this.options.langCode;
            this.options.langCode = "en";
            var u = t.split("-");
            for (e = 0, f = u.length; f > e; e++) {
                var v = u.join("-");
                if (v.length && this.locale[v]) {
                    this.options.langCode = v;
                    break
                }
                u.pop()
            }
            this.log(this.LOG_WARNING, 'Unknown langCode option: "' + t + '". Using the following langCode instead: "' + this.options.langCode + '".')
        }
        this.locale[this.options.langCode] = a.extend(!0, {}, this.locale[this.options.langCode], this.options.locale), this.list = new b.AjaxBootstrapSelectList(this), this.list.refresh(), setTimeout(function() {
            g.init()
        }, 500)
    };
    c.prototype.init = function() {
        var c, d = this;
        this.options.preserveSelected && this.selectpicker.$menu.off("click", ".actions-btn").on("click", ".actions-btn", function(b) {
            d.selectpicker.options.liveSearch ? d.selectpicker.$searchbox.focus() : d.selectpicker.$button.focus(), b.preventDefault(), b.stopPropagation(), a(this).is(".bs-select-all") ? (null === d.selectpicker.$lis && (d.selectpicker.$lis = d.selectpicker.$menu.find("li")), d.$element.find("option:enabled").prop("selected", !0), a(d.selectpicker.$lis).not(".disabled").addClass("selected"), d.selectpicker.render()) : (null === d.selectpicker.$lis && (d.selectpicker.$lis = d.selectpicker.$menu.find("li")), d.$element.find("option:enabled").prop("selected", !1), a(d.selectpicker.$lis).not(".disabled").removeClass("selected"), d.selectpicker.render()), d.selectpicker.$element.change()
        }), this.selectpicker.$searchbox.attr("placeholder", this.t("searchPlaceholder")).off("input propertychange"), this.selectpicker.$searchbox.on(this.options.bindEvent, function(e) {
            var f = d.selectpicker.$searchbox.val();
            if (d.log(d.LOG_DEBUG, 'Bind event fired: "' + d.options.bindEvent + '", keyCode:', e.keyCode, e), d.options.cache || (d.options.ignoredKeys[13] = "enter"), d.options.ignoredKeys[e.keyCode]) return void d.log(d.LOG_DEBUG, "Key ignored.");
            if (clearTimeout(c), f.length || (d.options.clearOnEmpty && d.list.destroy(), d.options.emptyRequest)) {
                if (d.previousQuery = d.query, d.query = f, d.options.cache && 13 !== e.keyCode) {
                    var g = d.list.cacheGet(d.query);
                    if (g) return d.list.setStatus(g.length ? "" : d.t("statusNoResults")), d.list.replaceOptions(g), void d.log(d.LOG_INFO, "Rebuilt options from cached data.")
                }
                c = setTimeout(function() {
                    d.lastRequest && d.lastRequest.jqXHR && a.isFunction(d.lastRequest.jqXHR.abort) && d.lastRequest.jqXHR.abort(), d.request = new b.AjaxBootstrapSelectRequest(d), d.request.jqXHR.always(function() {
                        d.lastRequest = d.request, d.request = !1
                    })
                }, d.options.requestDelay || 300)
            }
        })
    }, c.prototype.log = function(a, c) {
        if (b.console && this.options.log) {
            if ("number" != typeof this.options.log) switch ("string" == typeof this.options.log && (this.options.log = this.options.log.toLowerCase()), this.options.log) {
                case !0:
                case "debug":
                    this.options.log = this.LOG_DEBUG;
                    break;
                case "info":
                    this.options.log = this.LOG_INFO;
                    break;
                case "warn":
                case "warning":
                    this.options.log = this.LOG_WARNING;
                    break;
                default:
                case !1:
                case "error":
                    this.options.log = this.LOG_ERROR
            }
            if (a <= this.options.log) {
                var d = [].slice.apply(arguments, [2]);
                switch (a) {
                    case this.LOG_DEBUG:
                        a = "debug";
                        break;
                    case this.LOG_INFO:
                        a = "info";
                        break;
                    case this.LOG_WARNING:
                        a = "warn";
                        break;
                    default:
                    case this.LOG_ERROR:
                        a = "error"
                }
                var e = "[" + a.toUpperCase() + "] AjaxBootstrapSelect:";
                "string" == typeof c ? d.unshift(e + " " + c) : (d.unshift(c), d.unshift(e)), b.console[a].apply(b.console, d)
            }
        }
    }, c.prototype.replaceValue = function(b, c, d, e) {
        var f = this;
        e = a.extend({
            recursive: !0,
            depth: !1,
            limit: !1
        }, e), a.each(b, function(g, h) {
            return e.limit !== !1 && "number" == typeof e.limit && e.limit <= 0 ? !1 : void(a.isArray(b[g]) || a.isPlainObject(b[g]) ? (e.recursive && e.depth === !1 || e.recursive && "number" == typeof e.depth && e.depth > 0) && f.replaceValue(b[g], c, d, e) : h === c && (e.limit !== !1 && "number" == typeof e.limit && e.limit--, b[g] = d))
        })
    }, c.prototype.t = function(a, b) {
        return b = b || this.options.langCode, this.locale[b] && this.locale[b].hasOwnProperty(a) ? this.locale[b][a] : (this.log(this.LOG_WARNING, "Unknown translation key:", a), a)
    }, b.AjaxBootstrapSelect = b.AjaxBootstrapSelect || c;
    var d = function(b) {
        var c = this;
        this.$status = a(b.options.templates.status).hide().appendTo(b.selectpicker.$menu);
        var d = b.t("statusInitialized");
        d && d.length && this.setStatus(d), this.cache = {}, this.plugin = b, this.selected = [], this.title = null, this.selectedTextFormat = b.selectpicker.options.selectedTextFormat, b.options.preserveSelected && b.$element.on("change.abs.preserveSelected", function() {
            var d = b.$element.find(":selected");
            c.selected = [], b.selectpicker.multiple || (d = d.last()), d.each(function() {
                var b = a(this),
                    d = b.attr("value");
                c.selected.push({
                    value: d,
                    text: b.text(),
                    "class": b.attr("class") || "",
                    data: b.data() || {},
                    preserved: !0,
                    selected: !0
                })
            }), c.replaceOptions(c.cacheGet(c.plugin.query))
        })
    };
    d.prototype.build = function(b) {
        var c, d, e = b.length,
            f = a("<select/>"),
            g = a("<optgroup/>").attr("label", this.plugin.t("currentlySelected"));
        for (this.plugin.log(this.plugin.LOG_DEBUG, "Building the select list options from data:", b), d = 0; e > d; d++) {
            var h = b[d],
                i = a("<option/>").appendTo(h.preserved ? g : f);
            if (h.hasOwnProperty("divider")) i.attr("data-divider", "true");
            else {
                i.val(h.value).text(h.text), h["class"].length && i.attr("class", h["class"]), h.disabled && i.attr("disabled", !0), h.selected && !this.plugin.selectpicker.multiple && f.find(":selected").prop("selected", !1), h.selected && i.attr("selected", !0);
                for (c in h.data) h.data.hasOwnProperty(c) && i.attr("data-" + c, h.data[c])
            }
        }
        g.find("option").length && g["before" === this.plugin.options.preserveSelectedPosition ? "prependTo" : "appendTo"](f);
        var j = f.html();
        return this.plugin.log(this.plugin.LOG_DEBUG, j), j
    }, d.prototype.cacheGet = function(a, b) {
        var c = this.cache[a] || b;
        return this.plugin.log(this.LOG_DEBUG, "Retrieving cache:", a, c), c
    }, d.prototype.cacheSet = function(a, b) {
        this.cache[a] = b, this.plugin.log(this.LOG_DEBUG, "Saving to cache:", a, b)
    }, d.prototype.destroy = function() {
        this.replaceOptions(), this.plugin.list.setStatus(), this.plugin.log(this.plugin.LOG_DEBUG, "Destroyed select list.")
    }, d.prototype.refresh = function(a) {
        this.plugin.selectpicker.$menu.css("minHeight", 0), this.plugin.selectpicker.$menu.find("> .inner").css("minHeight", 0);
        var b = this.plugin.t("emptyTitle");
        !this.plugin.$element.find("option").length && b && b.length ? this.setTitle(b) : this.title && this.restoreTitle(), this.plugin.selectpicker.refresh(), this.plugin.selectpicker.findLis(), a && (this.plugin.log(this.plugin.LOG_DEBUG, "Triggering Change"), this.plugin.$element.trigger("change.$")), this.plugin.log(this.plugin.LOG_DEBUG, "Refreshed select list.")
    }, d.prototype.replaceOptions = function(a) {
        var b, c, d, e = "",
            f = [],
            g = [],
            h = [];
        if (a = a || [], this.selected && this.selected.length) {
            for (this.plugin.log(this.plugin.LOG_INFO, "Processing preserved selections:", this.selected), g = [].concat(this.selected, a), c = g.length, b = 0; c > b; b++) d = g[b], d.hasOwnProperty("value") && -1 === h.indexOf(d.value + "") ? (h.push(d.value + ""), f.push(d)) : this.plugin.log(this.plugin.LOG_DEBUG, "Duplicate item found, ignoring.");
            a = f
        }
        a.length && (e = this.plugin.list.build(a)), this.plugin.$element.html(e), this.refresh(), this.plugin.log(this.plugin.LOG_DEBUG, "Replaced options with data:", a)
    }, d.prototype.restore = function() {
        var a = this.plugin.list.cacheGet(this.plugin.previousQuery);
        return a && this.plugin.list.replaceOptions(a) && this.plugin.log(this.plugin.LOG_DEBUG, "Restored select list to the previous query: ", this.plugin.previousQuery), this.plugin.log(this.plugin.LOG_DEBUG, "Unable to restore select list to the previous query:", this.plugin.previousQuery), !1
    }, d.prototype.restoreTitle = function() {
        this.plugin.request || (this.plugin.selectpicker.options.selectedTextFormat = this.selectedTextFormat, this.title ? this.plugin.$element.attr("title", this.title) : this.plugin.$element.removeAttr("title"), this.title = null)
    }, d.prototype.setTitle = function(a) {
        this.plugin.request || (this.title = this.plugin.$element.attr("title"), this.plugin.selectpicker.options.selectedTextFormat = "static", this.plugin.$element.attr("title", a))
    }, d.prototype.setStatus = function(a) {
        a = a || "", a.length ? this.$status.html(a).show() : this.$status.html("").hide()
    }, b.AjaxBootstrapSelectList = b.AjaxBootstrapSelectList || d;
    var e = function(b) {
        var c, d = this,
            e = function(a) {
                return function() {
                    d.plugin.log(d.plugin.LOG_INFO, "Invoking AjaxBootstrapSelectRequest." + a + " callback:", arguments), d[a].apply(d, arguments), d.callbacks[a] && (d.plugin.log(d.plugin.LOG_INFO, "Invoking ajax." + a + " callback:", arguments), d.callbacks[a].apply(d, arguments))
                }
            },
            f = ["beforeSend", "success", "error", "complete"],
            g = f.length;
        for (this.plugin = b, this.options = a.extend(!0, {}, b.options.ajax), this.callbacks = {}, c = 0; g > c; c++) {
            var h = f[c];
            this.options[h] && a.isFunction(this.options[h]) && (this.callbacks[h] = this.options[h]), this.options[h] = e(h)
        }
        this.options.data && a.isFunction(this.options.data) && (this.options.data = this.options.data.apply(this) || {
            q: "term"
        }), this.plugin.replaceValue(this.options.data, "term", this.plugin.query), this.jqXHR = a.ajax(this.options)
    };
    e.prototype.beforeSend = function() {
        this.plugin.list.destroy(), this.plugin.list.setStatus(this.plugin.t("statusSearching"))
    }, e.prototype.complete = function(a, b) {
        if ("abort" !== b) {
            var c = this.plugin.list.cacheGet(this.plugin.query);
            if (c) {
                if (!c.length) return this.plugin.list.destroy(), this.plugin.list.setStatus(this.plugin.t("statusNoResults")), void this.plugin.log(this.plugin.LOG_INFO, "No results were returned.");
                this.plugin.list.setStatus()
            }
            this.plugin.list.refresh(!0)
        }
    }, e.prototype.error = function(a, b) {
        "abort" !== b && (this.plugin.list.cacheSet(this.plugin.query), this.plugin.options.clearOnError && this.plugin.list.destroy(), this.plugin.list.setStatus(this.plugin.t("errorText")), this.plugin.options.restoreOnError && (this.plugin.list.restore(), this.plugin.list.setStatus()))
    }, e.prototype.process = function(b) {
        var c, d, e, f, g, h, i = [],
            j = [];
        if (this.plugin.log(this.plugin.LOG_INFO, "Processing raw data for:", this.plugin.query, b), g = b, a.isFunction(this.plugin.options.preprocessData) && (this.plugin.log(this.plugin.LOG_DEBUG, "Invoking preprocessData callback:", this.plugin.options.processData), e = this.plugin.options.preprocessData.apply(this, [g]), "undefined" != typeof e && null !== e && e !== !1 && (g = e)), !a.isArray(g)) return this.plugin.log(this.plugin.LOG_ERROR, 'The data returned is not an Array. Use the "preprocessData" callback option to parse the results and construct a proper array for this plugin.', g), !1;
        for (d = g.length, c = 0; d > c; c++) f = g[c], this.plugin.log(this.plugin.LOG_DEBUG, "Processing item:", f), a.isPlainObject(f) && (f.hasOwnProperty("divider") || f.hasOwnProperty("data") && a.isPlainObject(f.data) && f.data.divider ? (this.plugin.log(this.plugin.LOG_DEBUG, "Item is a divider, ignoring provided data."), i.push({
            divider: !0
        })) : f.hasOwnProperty("value") ? -1 === j.indexOf(f.value + "") ? (j.push(f.value + ""), f = a.extend({
            text: f.value,
            "class": "",
            data: {},
            disabled: !1,
            selected: !1
        }, f), i.push(f)) : this.plugin.log(this.plugin.LOG_DEBUG, "Duplicate item found, ignoring.") : this.plugin.log(this.plugin.LOG_DEBUG, 'Data item must have a "value" property, skipping.'));
        if (h = [].concat(i), a.isFunction(this.plugin.options.processData) && (this.plugin.log(this.plugin.LOG_DEBUG, "Invoking processData callback:", this.plugin.options.processData), e = this.plugin.options.processData.apply(this, [h]), "undefined" != typeof e && null !== e && e !== !1)) {
            if (!a.isArray(e)) return this.plugin.log(this.plugin.LOG_ERROR, "The processData callback did not return an array.", e), !1;
            h = e
        }
        return this.plugin.list.cacheSet(this.plugin.query, h), this.plugin.log(this.plugin.LOG_INFO, "Processed data:", h), h
    }, e.prototype.success = function(b) {
        if (!a.isArray(b) && !a.isPlainObject(b)) return this.plugin.log(this.plugin.LOG_ERROR, "Request did not return a JSON Array or Object.", b), void this.plugin.list.destroy();
        var c = this.process(b);
        this.plugin.list.replaceOptions(c)
    }, b.AjaxBootstrapSelectRequest = b.AjaxBootstrapSelectRequest || e, a.fn.ajaxSelectPicker = function(c) {
        return this.each(function() {
            a(this).data("AjaxBootstrapSelect") || a(this).data("AjaxBootstrapSelect", new b.AjaxBootstrapSelect(this, c))
        })
    }, a.fn.ajaxSelectPicker.locale = {}, a.fn.ajaxSelectPicker.defaults = {
        ajax: {
            url: null,
            type: "POST",
            dataType: "json",
            data: {
                q: "term"
            }
        },
        bindEvent: "keyup",
        cache: !0,
        clearOnEmpty: !0,
        clearOnError: !0,
        emptyRequest: !1,
        ignoredKeys: {
            9: "tab",
            16: "shift",
            17: "ctrl",
            18: "alt",
            27: "esc",
            37: "left",
            39: "right",
            38: "up",
            40: "down",
            91: "meta",
            229: "unknown"
        },
        langCode: null,
        locale: null,
        log: "error",
        preprocessData: function() {},
        preserveSelected: !0,
        preserveSelectedPosition: "after",
        processData: function() {},
        requestDelay: 300,
        restoreOnError: !1,
        templates: {
            status: '<div class="status"></div>'
        }
    }, a.fn.ajaxSelectPicker.locale["en-US"] = {
        currentlySelected: "SeleÃ§Ã£o atual",
        emptyTitle: "Digite algo e selecione",
        errorText: "Nenhum resultado encontrado",
        searchPlaceholder: "Pesquisa...",
        statusInitialized: "Comece digitando algo acima",
        statusNoResults: "Nenhum resultado encontrado",
        statusSearching: "Pesquisando..."
    }, a.fn.ajaxSelectPicker.locale.en = a.fn.ajaxSelectPicker.locale["en-US"]
}(jQuery, window);

var MIXPANEL = 20;
var SUCCESS = 25;
var WARNING = 30;
var ERROR = 40;
var MODAL_NAME = '.modal-element';
var start_date = '';
var end_date = '';
var old_start_date = '';
var old_end_date = '';
var range_date = '';
var old_range_date = '';
var attr_id = null;
$(function() {
    $('.sidebar-toggle').click(function() {
        $('.sidebar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
    });
    reload_scripts();
    if ($(MODAL_NAME).length != 0) {
        $(MODAL_NAME).each(function() {
            $('#' + $(this).attr('id')).on('show.bs.modal', function(e) {
                modal_onload(e);
                $("#modal-apply-button").unbind('click').click(function() {
                    modal_apply();
                });
                $("#modal-cancel-button").unbind('click').click(function() {
                    modal_cancel();
                });
            });
        });
    }
});

function reload_scripts() {
    $('.select-picker').selectpicker();
    $('#id_range').daterangepicker({
        format: 'DD/MM/YYYY',
        locale: {
            applyLabel: 'Aplicar',
            cancelLabel: 'Cancelar',
            fromLabel: 'Inicio',
            toLabel: 'Termino',
            weekLabel: 'S',
            daysOfWeek: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            monthNames: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            firstDay: 0
        }
    }).on('apply.daterangepicker', function(e, picker) {
        reload_scripts();
        date_callback($(this), null);
        return false;
    });
    $('#id_clone_range').daterangepicker({
        format: 'DD/MM/YYYY',
        locale: {
            applyLabel: 'Aplicar',
            cancelLabel: 'Cancelar',
            fromLabel: 'InÃ­cio',
            toLabel: 'TÃ©rmino',
            weekLabel: 'S',
            daysOfWeek: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            monthNames: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            firstDay: 0
        }
    }).on('apply.daterangepicker', function(e, picker) {
        reload_scripts();
        date_callback($(this), null);
        return false;
    });
    set_range();
    setMasks();
    $("#backLink").click(function(event) {
        event.preventDefault();
        window.history.back();
    });
}

function set_range() {
    if ($("#id_range").length != 0) {
        old_start_date = start_date;
        old_end_date = end_date;
        old_range_date = range_date;
        start_date = $('#id_range').data('daterangepicker').startDate.format('YYYY-MM-DD');
        end_date = $('#id_range').data('daterangepicker').endDate.format('YYYY-MM-DD');
        range_date = {
            'start': start_date,
            'end': end_date
        };
    }
}

function notify(message, message_level) {
    var class_name = 'info';
    var title = 'Info';
    if (message_level == SUCCESS) {
        class_name = 'success';
        title = 'Sucesso';
    } else if (message_level == WARNING) {
        class_name = 'warning';
        title = 'Aviso';
    } else if (message_level == ERROR) {
        class_name = 'danger';
        title = 'Erro';
    }
    $.notify({
        message: message,
    }, {
        type: class_name,
        offset: {
            y: 65,
            x: 20
        },
        spacing: 10,
        timer: 500,
        z_index: 5000,
        animate: {
            enter: 'animated bounceInDown',
            exit: 'animated bounceOutUp'
        }
    });
}

function parseFloatDjango(str_num) {
        return parseFloat(str_num.replace('.', '').replace(',', '.'));
    }

    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


    (function() {
        "use strict";
        var t = this,
            i = t.Chart,
            e = function(t) {
                this.canvas = t.canvas, this.ctx = t;
                var i = function(t, i) {
                        return t["offset" + i] ? t["offset" + i] : document.defaultView.getComputedStyle(t).getPropertyValue(i)
                    },
                    e = this.width = i(t.canvas, "Width"),
                    n = this.height = i(t.canvas, "Height");
                t.canvas.width = e, t.canvas.height = n;
                var e = this.width = t.canvas.width,
                    n = this.height = t.canvas.height;
                return this.aspectRatio = this.width / this.height, s.retinaScale(this), this
            };
        e.defaults = {
            global: {
                animation: !0,
                animationSteps: 60,
                animationEasing: "easeOutQuart",
                showScale: !0,
                scaleOverride: !1,
                scaleSteps: null,
                scaleStepWidth: null,
                scaleStartValue: null,
                scaleLineColor: "rgba(0,0,0,.1)",
                scaleLineWidth: 1,
                scaleShowLabels: !0,
                scaleLabel: "<%=value%>",
                scaleIntegersOnly: !0,
                scaleBeginAtZero: !1,
                scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                scaleFontSize: 12,
                scaleFontStyle: "normal",
                scaleFontColor: "#666",
                responsive: !1,
                maintainAspectRatio: !0,
                showTooltips: !0,
                customTooltips: !1,
                tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],
                tooltipFillColor: "rgba(0,0,0,0.8)",
                tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                tooltipFontSize: 14,
                tooltipFontStyle: "normal",
                tooltipFontColor: "#fff",
                tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                tooltipTitleFontSize: 14,
                tooltipTitleFontStyle: "bold",
                tooltipTitleFontColor: "#fff",
                tooltipYPadding: 6,
                tooltipXPadding: 6,
                tooltipCaretSize: 8,
                tooltipCornerRadius: 6,
                tooltipXOffset: 10,
                tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
                multiTooltipTemplate: "<%= value %>",
                multiTooltipKeyBackground: "#fff",
                onAnimationProgress: function() {},
                onAnimationComplete: function() {}
            }
        }, e.types = {};
        var s = e.helpers = {},
            n = s.each = function(t, i, e) {
                var s = Array.prototype.slice.call(arguments, 3);
                if (t)
                    if (t.length === +t.length) {
                        var n;
                        for (n = 0; n < t.length; n++) i.apply(e, [t[n], n].concat(s))
                    } else
                        for (var o in t) i.apply(e, [t[o], o].concat(s))
            },
            o = s.clone = function(t) {
                var i = {};
                return n(t, function(e, s) {
                    t.hasOwnProperty(s) && (i[s] = e)
                }), i
            },
            a = s.extend = function(t) {
                return n(Array.prototype.slice.call(arguments, 1), function(i) {
                    n(i, function(e, s) {
                        i.hasOwnProperty(s) && (t[s] = e)
                    })
                }), t
            },
            h = s.merge = function() {
                var t = Array.prototype.slice.call(arguments, 0);
                return t.unshift({}), a.apply(null, t)
            },
            l = s.indexOf = function(t, i) {
                if (Array.prototype.indexOf) return t.indexOf(i);
                for (var e = 0; e < t.length; e++)
                    if (t[e] === i) return e;
                return -1
            },
            r = (s.where = function(t, i) {
                var e = [];
                return s.each(t, function(t) {
                    i(t) && e.push(t)
                }), e
            }, s.findNextWhere = function(t, i, e) {
                e || (e = -1);
                for (var s = e + 1; s < t.length; s++) {
                    var n = t[s];
                    if (i(n)) return n
                }
            }, s.findPreviousWhere = function(t, i, e) {
                e || (e = t.length);
                for (var s = e - 1; s >= 0; s--) {
                    var n = t[s];
                    if (i(n)) return n
                }
            }, s.inherits = function(t) {
                var i = this,
                    e = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
                        return i.apply(this, arguments)
                    },
                    s = function() {
                        this.constructor = e
                    };
                return s.prototype = i.prototype, e.prototype = new s, e.extend = r, t && a(e.prototype, t), e.__super__ = i.prototype, e
            }),
            c = s.noop = function() {},
            u = s.uid = function() {
                var t = 0;
                return function() {
                    return "chart-" + t++
                }
            }(),
            d = s.warn = function(t) {
                window.console && "function" == typeof window.console.warn && console.warn(t)
            },
            p = s.amd = "function" == typeof define && define.amd,
            f = s.isNumber = function(t) {
                return !isNaN(parseFloat(t)) && isFinite(t)
            },
            g = s.max = function(t) {
                return Math.max.apply(Math, t)
            },
            m = s.min = function(t) {
                return Math.min.apply(Math, t)
            },
            v = (s.cap = function(t, i, e) {
                if (f(i)) {
                    if (t > i) return i
                } else if (f(e) && e > t) return e;
                return t
            }, s.getDecimalPlaces = function(t) {
                return t % 1 !== 0 && f(t) ? t.toString().split(".")[1].length : 0
            }),
            S = s.radians = function(t) {
                return t * (Math.PI / 180)
            },
            x = (s.getAngleFromPoint = function(t, i) {
                var e = i.x - t.x,
                    s = i.y - t.y,
                    n = Math.sqrt(e * e + s * s),
                    o = 2 * Math.PI + Math.atan2(s, e);
                return 0 > e && 0 > s && (o += 2 * Math.PI), {
                    angle: o,
                    distance: n
                }
            }, s.aliasPixel = function(t) {
                return t % 2 === 0 ? 0 : .5
            }),
            y = (s.splineCurve = function(t, i, e, s) {
                var n = Math.sqrt(Math.pow(i.x - t.x, 2) + Math.pow(i.y - t.y, 2)),
                    o = Math.sqrt(Math.pow(e.x - i.x, 2) + Math.pow(e.y - i.y, 2)),
                    a = s * n / (n + o),
                    h = s * o / (n + o);
                return {
                    inner: {
                        x: i.x - a * (e.x - t.x),
                        y: i.y - a * (e.y - t.y)
                    },
                    outer: {
                        x: i.x + h * (e.x - t.x),
                        y: i.y + h * (e.y - t.y)
                    }
                }
            }, s.calculateOrderOfMagnitude = function(t) {
                return Math.floor(Math.log(t) / Math.LN10)
            }),
            C = (s.calculateScaleRange = function(t, i, e, s, n) {
                var o = 2,
                    a = Math.floor(i / (1.5 * e)),
                    h = o >= a,
                    l = g(t),
                    r = m(t);
                l === r && (l += .5, r >= .5 && !s ? r -= .5 : l += .5);
                for (var c = Math.abs(l - r), u = y(c), d = Math.ceil(l / (1 * Math.pow(10, u))) * Math.pow(10, u), p = s ? 0 : Math.floor(r / (1 * Math.pow(10, u))) * Math.pow(10, u), f = d - p, v = Math.pow(10, u), S = Math.round(f / v);
                    (S > a || a > 2 * S) && !h;)
                    if (S > a) v *= 2, S = Math.round(f / v), S % 1 !== 0 && (h = !0);
                    else if (n && u >= 0) {
                    if (v / 2 % 1 !== 0) break;
                    v /= 2, S = Math.round(f / v)
                } else v /= 2, S = Math.round(f / v);
                return h && (S = o, v = f / S), {
                    steps: S,
                    stepValue: v,
                    min: p,
                    max: p + S * v
                }
            }, s.template = function(t, i) {
                function e(t, i) {
                    var e = /\W/.test(t) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + t.replace(/[\r\t\n]/g, " ").split("<%").join("  ").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split(" ").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : s[t] = s[t];
                    return i ? e(i) : e
                }
                if (t instanceof Function) return t(i);
                var s = {};
                return e(t, i)
            }),
            w = (s.generateLabels = function(t, i, e, s) {
                var o = new Array(i);
                return labelTemplateString && n(o, function(i, n) {
                    o[n] = C(t, {
                        value: e + s * (n + 1)
                    })
                }), o
            }, s.easingEffects = {
                linear: function(t) {
                    return t
                },
                easeInQuad: function(t) {
                    return t * t
                },
                easeOutQuad: function(t) {
                    return -1 * t * (t - 2)
                },
                easeInOutQuad: function(t) {
                    return (t /= .5) < 1 ? .5 * t * t : -0.5 * (--t * (t - 2) - 1)
                },
                easeInCubic: function(t) {
                    return t * t * t
                },
                easeOutCubic: function(t) {
                    return 1 * ((t = t / 1 - 1) * t * t + 1)
                },
                easeInOutCubic: function(t) {
                    return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
                },
                easeInQuart: function(t) {
                    return t * t * t * t
                },
                easeOutQuart: function(t) {
                    return -1 * ((t = t / 1 - 1) * t * t * t - 1)
                },
                easeInOutQuart: function(t) {
                    return (t /= .5) < 1 ? .5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2)
                },
                easeInQuint: function(t) {
                    return 1 * (t /= 1) * t * t * t * t
                },
                easeOutQuint: function(t) {
                    return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
                },
                easeInOutQuint: function(t) {
                    return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
                },
                easeInSine: function(t) {
                    return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
                },
                easeOutSine: function(t) {
                    return 1 * Math.sin(t / 1 * (Math.PI / 2))
                },
                easeInOutSine: function(t) {
                    return -0.5 * (Math.cos(Math.PI * t / 1) - 1)
                },
                easeInExpo: function(t) {
                    return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
                },
                easeOutExpo: function(t) {
                    return 1 === t ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1)
                },
                easeInOutExpo: function(t) {
                    return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (-Math.pow(2, -10 * --t) + 2)
                },
                easeInCirc: function(t) {
                    return t >= 1 ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
                },
                easeOutCirc: function(t) {
                    return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
                },
                easeInOutCirc: function(t) {
                    return (t /= .5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                },
                easeInElastic: function(t) {
                    var i = 1.70158,
                        e = 0,
                        s = 1;
                    return 0 === t ? 0 : 1 == (t /= 1) ? 1 : (e || (e = .3), s < Math.abs(1) ? (s = 1, i = e / 4) : i = e / (2 * Math.PI) * Math.asin(1 / s), -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (1 * t - i) * Math.PI / e)))
                },
                easeOutElastic: function(t) {
                    var i = 1.70158,
                        e = 0,
                        s = 1;
                    return 0 === t ? 0 : 1 == (t /= 1) ? 1 : (e || (e = .3), s < Math.abs(1) ? (s = 1, i = e / 4) : i = e / (2 * Math.PI) * Math.asin(1 / s), s * Math.pow(2, -10 * t) * Math.sin(2 * (1 * t - i) * Math.PI / e) + 1)
                },
                easeInOutElastic: function(t) {
                    var i = 1.70158,
                        e = 0,
                        s = 1;
                    return 0 === t ? 0 : 2 == (t /= .5) ? 1 : (e || (e = .3 * 1.5), s < Math.abs(1) ? (s = 1, i = e / 4) : i = e / (2 * Math.PI) * Math.asin(1 / s), 1 > t ? -.5 * s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (1 * t - i) * Math.PI / e) : s * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (1 * t - i) * Math.PI / e) * .5 + 1)
                },
                easeInBack: function(t) {
                    var i = 1.70158;
                    return 1 * (t /= 1) * t * ((i + 1) * t - i)
                },
                easeOutBack: function(t) {
                    var i = 1.70158;
                    return 1 * ((t = t / 1 - 1) * t * ((i + 1) * t + i) + 1)
                },
                easeInOutBack: function(t) {
                    var i = 1.70158;
                    return (t /= .5) < 1 ? .5 * t * t * (((i *= 1.525) + 1) * t - i) : .5 * ((t -= 2) * t * (((i *= 1.525) + 1) * t + i) + 2)
                },
                easeInBounce: function(t) {
                    return 1 - w.easeOutBounce(1 - t)
                },
                easeOutBounce: function(t) {
                    return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : 2 / 2.75 > t ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                },
                easeInOutBounce: function(t) {
                    return .5 > t ? .5 * w.easeInBounce(2 * t) : .5 * w.easeOutBounce(2 * t - 1) + .5
                }
            }),
            b = s.requestAnimFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                    return window.setTimeout(t, 1e3 / 60)
                }
            }(),
            P = s.cancelAnimFrame = function() {
                return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(t) {
                    return window.clearTimeout(t, 1e3 / 60)
                }
            }(),
            L = (s.animationLoop = function(t, i, e, s, n, o) {
                var a = 0,
                    h = w[e] || w.linear,
                    l = function() {
                        a++;
                        var e = a / i,
                            r = h(e);
                        t.call(o, r, e, a), s.call(o, r, e), i > a ? o.animationFrame = b(l) : n.apply(o)
                    };
                b(l)
            }, s.getRelativePosition = function(t) {
                var i, e, s = t.originalEvent || t,
                    n = t.currentTarget || t.srcElement,
                    o = n.getBoundingClientRect();
                return s.touches ? (i = s.touches[0].clientX - o.left, e = s.touches[0].clientY - o.top) : (i = s.clientX - o.left, e = s.clientY - o.top), {
                    x: i,
                    y: e
                }
            }, s.addEvent = function(t, i, e) {
                t.addEventListener ? t.addEventListener(i, e) : t.attachEvent ? t.attachEvent("on" + i, e) : t["on" + i] = e
            }),
            k = s.removeEvent = function(t, i, e) {
                t.removeEventListener ? t.removeEventListener(i, e, !1) : t.detachEvent ? t.detachEvent("on" + i, e) : t["on" + i] = c
            },
            F = (s.bindEvents = function(t, i, e) {
                t.events || (t.events = {}), n(i, function(i) {
                    t.events[i] = function() {
                        e.apply(t, arguments)
                    }, L(t.chart.canvas, i, t.events[i])
                })
            }, s.unbindEvents = function(t, i) {
                n(i, function(i, e) {
                    k(t.chart.canvas, e, i)
                })
            }),
            R = s.getMaximumWidth = function(t) {
                var i = t.parentNode;
                return i.clientWidth
            },
            T = s.getMaximumHeight = function(t) {
                var i = t.parentNode;
                return i.clientHeight
            },
            A = (s.getMaximumSize = s.getMaximumWidth, s.retinaScale = function(t) {
                var i = t.ctx,
                    e = t.canvas.width,
                    s = t.canvas.height;
                window.devicePixelRatio && (i.canvas.style.width = e + "px", i.canvas.style.height = s + "px", i.canvas.height = s * window.devicePixelRatio, i.canvas.width = e * window.devicePixelRatio, i.scale(window.devicePixelRatio, window.devicePixelRatio))
            }),
            M = s.clear = function(t) {
                t.ctx.clearRect(0, 0, t.width, t.height)
            },
            W = s.fontString = function(t, i, e) {
                return i + " " + t + "px " + e
            },
            z = s.longestText = function(t, i, e) {
                t.font = i;
                var s = 0;
                return n(e, function(i) {
                    var e = t.measureText(i).width;
                    s = e > s ? e : s
                }), s
            },
            B = s.drawRoundedRectangle = function(t, i, e, s, n, o) {
                t.beginPath(), t.moveTo(i + o, e), t.lineTo(i + s - o, e), t.quadraticCurveTo(i + s, e, i + s, e + o), t.lineTo(i + s, e + n - o), t.quadraticCurveTo(i + s, e + n, i + s - o, e + n), t.lineTo(i + o, e + n), t.quadraticCurveTo(i, e + n, i, e + n - o), t.lineTo(i, e + o), t.quadraticCurveTo(i, e, i + o, e), t.closePath()
            };
        e.instances = {}, e.Type = function(t, i, s) {
            this.options = i, this.chart = s, this.id = u(), e.instances[this.id] = this, i.responsive && this.resize(), this.initialize.call(this, t)
        }, a(e.Type.prototype, {
            initialize: function() {
                return this
            },
            clear: function() {
                return M(this.chart), this
            },
            stop: function() {
                return P(this.animationFrame), this
            },
            resize: function(t) {
                this.stop();
                var i = this.chart.canvas,
                    e = R(this.chart.canvas),
                    s = this.options.maintainAspectRatio ? e / this.chart.aspectRatio : T(this.chart.canvas);
                return i.width = this.chart.width = e, i.height = this.chart.height = s, A(this.chart), "function" == typeof t && t.apply(this, Array.prototype.slice.call(arguments, 1)), this
            },
            reflow: c,
            render: function(t) {
                return t && this.reflow(), this.options.animation && !t ? s.animationLoop(this.draw, this.options.animationSteps, this.options.animationEasing, this.options.onAnimationProgress, this.options.onAnimationComplete, this) : (this.draw(), this.options.onAnimationComplete.call(this)), this
            },
            generateLegend: function() {
                return C(this.options.legendTemplate, this)
            },
            destroy: function() {
                this.clear(), F(this, this.events);
                var t = this.chart.canvas;
                t.width = this.chart.width, t.height = this.chart.height, t.style.removeProperty ? (t.style.removeProperty("width"), t.style.removeProperty("height")) : (t.style.removeAttribute("width"), t.style.removeAttribute("height")), delete e.instances[this.id]
            },
            showTooltip: function(t, i) {
                "undefined" == typeof this.activeElements && (this.activeElements = []);
                var o = function(t) {
                    var i = !1;
                    return t.length !== this.activeElements.length ? i = !0 : (n(t, function(t, e) {
                        t !== this.activeElements[e] && (i = !0)
                    }, this), i)
                }.call(this, t);
                if (o || i) {
                    if (this.activeElements = t, this.draw(), this.options.customTooltips && this.options.customTooltips(!1), t.length > 0)
                        if (this.datasets && this.datasets.length > 1) {
                            for (var a, h, r = this.datasets.length - 1; r >= 0 && (a = this.datasets[r].points || this.datasets[r].bars || this.datasets[r].segments, h = l(a, t[0]), -1 === h); r--);
                            var c = [],
                                u = [],
                                d = function() {
                                    var t, i, e, n, o, a = [],
                                        l = [],
                                        r = [];
                                    return s.each(this.datasets, function(i) {
                                        t = i.points || i.bars || i.segments, t[h] && t[h].hasValue() && a.push(t[h])
                                    }), s.each(a, function(t) {
                                        l.push(t.x), r.push(t.y), c.push(s.template(this.options.multiTooltipTemplate, t)), u.push({
                                            fill: t._saved.fillColor || t.fillColor,
                                            stroke: t._saved.strokeColor || t.strokeColor
                                        })
                                    }, this), o = m(r), e = g(r), n = m(l), i = g(l), {
                                        x: n > this.chart.width / 2 ? n : i,
                                        y: (o + e) / 2
                                    }
                                }.call(this, h);
                            new e.MultiTooltip({
                                x: d.x,
                                y: d.y,
                                xPadding: this.options.tooltipXPadding,
                                yPadding: this.options.tooltipYPadding,
                                xOffset: this.options.tooltipXOffset,
                                fillColor: this.options.tooltipFillColor,
                                textColor: this.options.tooltipFontColor,
                                fontFamily: this.options.tooltipFontFamily,
                                fontStyle: this.options.tooltipFontStyle,
                                fontSize: this.options.tooltipFontSize,
                                titleTextColor: this.options.tooltipTitleFontColor,
                                titleFontFamily: this.options.tooltipTitleFontFamily,
                                titleFontStyle: this.options.tooltipTitleFontStyle,
                                titleFontSize: this.options.tooltipTitleFontSize,
                                cornerRadius: this.options.tooltipCornerRadius,
                                labels: c,
                                legendColors: u,
                                legendColorBackground: this.options.multiTooltipKeyBackground,
                                title: t[0].label,
                                chart: this.chart,
                                ctx: this.chart.ctx,
                                custom: this.options.customTooltips
                            }).draw()
                        } else n(t, function(t) {
                            var i = t.tooltipPosition();
                            new e.Tooltip({
                                x: Math.round(i.x),
                                y: Math.round(i.y),
                                xPadding: this.options.tooltipXPadding,
                                yPadding: this.options.tooltipYPadding,
                                fillColor: this.options.tooltipFillColor,
                                textColor: this.options.tooltipFontColor,
                                fontFamily: this.options.tooltipFontFamily,
                                fontStyle: this.options.tooltipFontStyle,
                                fontSize: this.options.tooltipFontSize,
                                caretHeight: this.options.tooltipCaretSize,
                                cornerRadius: this.options.tooltipCornerRadius,
                                text: C(this.options.tooltipTemplate, t),
                                chart: this.chart,
                                custom: this.options.customTooltips
                            }).draw()
                        }, this);
                    return this
                }
            },
            toBase64Image: function() {
                return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments)
            }
        }), e.Type.extend = function(t) {
            var i = this,
                s = function() {
                    return i.apply(this, arguments)
                };
            if (s.prototype = o(i.prototype), a(s.prototype, t), s.extend = e.Type.extend, t.name || i.prototype.name) {
                var n = t.name || i.prototype.name,
                    l = e.defaults[i.prototype.name] ? o(e.defaults[i.prototype.name]) : {};
                e.defaults[n] = a(l, t.defaults), e.types[n] = s, e.prototype[n] = function(t, i) {
                    var o = h(e.defaults.global, e.defaults[n], i || {});
                    return new s(t, o, this)
                }
            } else d("Name not provided for this chart, so it hasn't been registered");
            return i
        }, e.Element = function(t) {
            a(this, t), this.initialize.apply(this, arguments), this.save()
        }, a(e.Element.prototype, {
            initialize: function() {},
            restore: function(t) {
                return t ? n(t, function(t) {
                    this[t] = this._saved[t]
                }, this) : a(this, this._saved), this
            },
            save: function() {
                return this._saved = o(this), delete this._saved._saved, this
            },
            update: function(t) {
                return n(t, function(t, i) {
                    this._saved[i] = this[i], this[i] = t
                }, this), this
            },
            transition: function(t, i) {
                return n(t, function(t, e) {
                    this[e] = (t - this._saved[e]) * i + this._saved[e]
                }, this), this
            },
            tooltipPosition: function() {
                return {
                    x: this.x,
                    y: this.y
                }
            },
            hasValue: function() {
                return f(this.value)
            }
        }), e.Element.extend = r, e.Point = e.Element.extend({
            display: !0,
            inRange: function(t, i) {
                var e = this.hitDetectionRadius + this.radius;
                return Math.pow(t - this.x, 2) + Math.pow(i - this.y, 2) < Math.pow(e, 2)
            },
            draw: function() {
                if (this.display) {
                    var t = this.ctx;
                    t.beginPath(), t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI), t.closePath(), t.strokeStyle = this.strokeColor, t.lineWidth = this.strokeWidth, t.fillStyle = this.fillColor, t.fill(), t.stroke()
                }
            }
        }), e.Arc = e.Element.extend({
            inRange: function(t, i) {
                var e = s.getAngleFromPoint(this, {
                        x: t,
                        y: i
                    }),
                    n = e.angle >= this.startAngle && e.angle <= this.endAngle,
                    o = e.distance >= this.innerRadius && e.distance <= this.outerRadius;
                return n && o
            },
            tooltipPosition: function() {
                var t = this.startAngle + (this.endAngle - this.startAngle) / 2,
                    i = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
                return {
                    x: this.x + Math.cos(t) * i,
                    y: this.y + Math.sin(t) * i
                }
            },
            draw: function(t) {
                var i = this.ctx;
                i.beginPath(), i.arc(this.x, this.y, this.outerRadius, this.startAngle, this.endAngle), i.arc(this.x, this.y, this.innerRadius, this.endAngle, this.startAngle, !0), i.closePath(), i.strokeStyle = this.strokeColor, i.lineWidth = this.strokeWidth, i.fillStyle = this.fillColor, i.fill(), i.lineJoin = "bevel", this.showStroke && i.stroke()
            }
        }), e.Rectangle = e.Element.extend({
            draw: function() {
                var t = this.ctx,
                    i = this.width / 2,
                    e = this.x - i,
                    s = this.x + i,
                    n = this.base - (this.base - this.y),
                    o = this.strokeWidth / 2;
                this.showStroke && (e += o, s -= o, n += o), t.beginPath(), t.fillStyle = this.fillColor, t.strokeStyle = this.strokeColor, t.lineWidth = this.strokeWidth, t.moveTo(e, this.base), t.lineTo(e, n), t.lineTo(s, n), t.lineTo(s, this.base), t.fill(), this.showStroke && t.stroke()
            },
            height: function() {
                return this.base - this.y
            },
            inRange: function(t, i) {
                return t >= this.x - this.width / 2 && t <= this.x + this.width / 2 && i >= this.y && i <= this.base
            }
        }), e.Tooltip = e.Element.extend({
            draw: function() {
                var t = this.chart.ctx;
                t.font = W(this.fontSize, this.fontStyle, this.fontFamily), this.xAlign = "center", this.yAlign = "above";
                var i = this.caretPadding = 2,
                    e = t.measureText(this.text).width + 2 * this.xPadding,
                    s = this.fontSize + 2 * this.yPadding,
                    n = s + this.caretHeight + i;
                this.x + e / 2 > this.chart.width ? this.xAlign = "left" : this.x - e / 2 < 0 && (this.xAlign = "right"), this.y - n < 0 && (this.yAlign = "below");
                var o = this.x - e / 2,
                    a = this.y - n;
                if (t.fillStyle = this.fillColor, this.custom) this.custom(this);
                else {
                    switch (this.yAlign) {
                        case "above":
                            t.beginPath(), t.moveTo(this.x, this.y - i), t.lineTo(this.x + this.caretHeight, this.y - (i + this.caretHeight)), t.lineTo(this.x - this.caretHeight, this.y - (i + this.caretHeight)), t.closePath(), t.fill();
                            break;
                        case "below":
                            a = this.y + i + this.caretHeight, t.beginPath(), t.moveTo(this.x, this.y + i), t.lineTo(this.x + this.caretHeight, this.y + i + this.caretHeight), t.lineTo(this.x - this.caretHeight, this.y + i + this.caretHeight), t.closePath(), t.fill()
                    }
                    switch (this.xAlign) {
                        case "left":
                            o = this.x - e + (this.cornerRadius + this.caretHeight);
                            break;
                        case "right":
                            o = this.x - (this.cornerRadius + this.caretHeight)
                    }
                    B(t, o, a, e, s, this.cornerRadius), t.fill(), t.fillStyle = this.textColor, t.textAlign = "center", t.textBaseline = "middle", t.fillText(this.text, o + e / 2, a + s / 2)
                }
            }
        }), e.MultiTooltip = e.Element.extend({
            initialize: function() {
                this.font = W(this.fontSize, this.fontStyle, this.fontFamily), this.titleFont = W(this.titleFontSize, this.titleFontStyle, this.titleFontFamily), this.height = this.labels.length * this.fontSize + (this.labels.length - 1) * (this.fontSize / 2) + 2 * this.yPadding + 1.5 * this.titleFontSize, this.ctx.font = this.titleFont;
                var t = this.ctx.measureText(this.title).width,
                    i = z(this.ctx, this.font, this.labels) + this.fontSize + 3,
                    e = g([i, t]);
                this.width = e + 2 * this.xPadding;
                var s = this.height / 2;
                this.y - s < 0 ? this.y = s : this.y + s > this.chart.height && (this.y = this.chart.height - s), this.x > this.chart.width / 2 ? this.x -= this.xOffset + this.width : this.x += this.xOffset
            },
            getLineHeight: function(t) {
                var i = this.y - this.height / 2 + this.yPadding,
                    e = t - 1;
                return 0 === t ? i + this.titleFontSize / 2 : i + (1.5 * this.fontSize * e + this.fontSize / 2) + 1.5 * this.titleFontSize
            },
            draw: function() {
                if (this.custom) this.custom(this);
                else {
                    B(this.ctx, this.x, this.y - this.height / 2, this.width, this.height, this.cornerRadius);
                    var t = this.ctx;
                    t.fillStyle = this.fillColor, t.fill(), t.closePath(), t.textAlign = "left", t.textBaseline = "middle", t.fillStyle = this.titleTextColor, t.font = this.titleFont, t.fillText(this.title, this.x + this.xPadding, this.getLineHeight(0)), t.font = this.font, s.each(this.labels, function(i, e) {
                        t.fillStyle = this.textColor, t.fillText(i, this.x + this.xPadding + this.fontSize + 3, this.getLineHeight(e + 1)), t.fillStyle = this.legendColorBackground, t.fillRect(this.x + this.xPadding, this.getLineHeight(e + 1) - this.fontSize / 2, this.fontSize, this.fontSize), t.fillStyle = this.legendColors[e].fill, t.fillRect(this.x + this.xPadding, this.getLineHeight(e + 1) - this.fontSize / 2, this.fontSize, this.fontSize)
                    }, this)
                }
            }
        }), e.Scale = e.Element.extend({
            initialize: function() {
                this.fit()
            },
            buildYLabels: function() {
                this.yLabels = [];
                for (var t = v(this.stepValue), i = 0; i <= this.steps; i++) this.yLabels.push(C(this.templateString, {
                    value: (this.min + i * this.stepValue).toFixed(t)
                }));
                this.yLabelWidth = this.display && this.showLabels ? z(this.ctx, this.font, this.yLabels) : 0
            },
            addXLabel: function(t) {
                this.xLabels.push(t), this.valuesCount++, this.fit()
            },
            removeXLabel: function() {
                this.xLabels.shift(), this.valuesCount--, this.fit()
            },
            fit: function() {
                this.startPoint = this.display ? this.fontSize : 0, this.endPoint = this.display ? this.height - 1.5 * this.fontSize - 5 : this.height, this.startPoint += this.padding, this.endPoint -= this.padding;
                var t, i = this.endPoint - this.startPoint;
                for (this.calculateYRange(i), this.buildYLabels(), this.calculateXLabelRotation(); i > this.endPoint - this.startPoint;) i = this.endPoint - this.startPoint, t = this.yLabelWidth, this.calculateYRange(i), this.buildYLabels(), t < this.yLabelWidth && this.calculateXLabelRotation()
            },
            calculateXLabelRotation: function() {
                this.ctx.font = this.font;
                var t, i, e = this.ctx.measureText(this.xLabels[0]).width,
                    s = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width;
                if (this.xScalePaddingRight = s / 2 + 3, this.xScalePaddingLeft = e / 2 > this.yLabelWidth + 10 ? e / 2 : this.yLabelWidth + 10, this.xLabelRotation = 0, this.display) {
                    var n, o = z(this.ctx, this.font, this.xLabels);
                    this.xLabelWidth = o;
                    for (var a = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6; this.xLabelWidth > a && 0 === this.xLabelRotation || this.xLabelWidth > a && this.xLabelRotation <= 90 && this.xLabelRotation > 0;) n = Math.cos(S(this.xLabelRotation)), t = n * e, i = n * s, t + this.fontSize / 2 > this.yLabelWidth + 8 && (this.xScalePaddingLeft = t + this.fontSize / 2), this.xScalePaddingRight = this.fontSize / 2, this.xLabelRotation++, this.xLabelWidth = n * o;
                    this.xLabelRotation > 0 && (this.endPoint -= Math.sin(S(this.xLabelRotation)) * o + 3)
                } else this.xLabelWidth = 0, this.xScalePaddingRight = this.padding, this.xScalePaddingLeft = this.padding
            },
            calculateYRange: c,
            drawingArea: function() {
                return this.startPoint - this.endPoint
            },
            calculateY: function(t) {
                var i = this.drawingArea() / (this.min - this.max);
                return this.endPoint - i * (t - this.min)
            },
            calculateX: function(t) {
                var i = (this.xLabelRotation > 0, this.width - (this.xScalePaddingLeft + this.xScalePaddingRight)),
                    e = i / Math.max(this.valuesCount - (this.offsetGridLines ? 0 : 1), 1),
                    s = e * t + this.xScalePaddingLeft;
                return this.offsetGridLines && (s += e / 2), Math.round(s)
            },
            update: function(t) {
                s.extend(this, t), this.fit()
            },
            draw: function() {
                var t = this.ctx,
                    i = (this.endPoint - this.startPoint) / this.steps,
                    e = Math.round(this.xScalePaddingLeft);
                this.display && (t.fillStyle = this.textColor, t.font = this.font, n(this.yLabels, function(n, o) {
                    var a = this.endPoint - i * o,
                        h = Math.round(a),
                        l = this.showHorizontalLines;
                    t.textAlign = "right", t.textBaseline = "middle", this.showLabels && t.fillText(n, e - 10, a), 0 !== o || l || (l = !0), l && t.beginPath(), o > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), h += s.aliasPixel(t.lineWidth), l && (t.moveTo(e, h), t.lineTo(this.width, h), t.stroke(), t.closePath()), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(e - 5, h), t.lineTo(e, h), t.stroke(), t.closePath()
                }, this), n(this.xLabels, function(i, e) {
                    var s = this.calculateX(e) + x(this.lineWidth),
                        n = this.calculateX(e - (this.offsetGridLines ? .5 : 0)) + x(this.lineWidth),
                        o = this.xLabelRotation > 0,
                        a = this.showVerticalLines;
                    0 !== e || a || (a = !0), a && t.beginPath(), e > 0 ? (t.lineWidth = this.gridLineWidth, t.strokeStyle = this.gridLineColor) : (t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor), a && (t.moveTo(n, this.endPoint), t.lineTo(n, this.startPoint - 3), t.stroke(), t.closePath()), t.lineWidth = this.lineWidth, t.strokeStyle = this.lineColor, t.beginPath(), t.moveTo(n, this.endPoint), t.lineTo(n, this.endPoint + 5), t.stroke(), t.closePath(), t.save(), t.translate(s, o ? this.endPoint + 12 : this.endPoint + 8), t.rotate(-1 * S(this.xLabelRotation)), t.font = this.font, t.textAlign = o ? "right" : "center", t.textBaseline = o ? "middle" : "top", t.fillText(i, 0, 0), t.restore()
                }, this))
            }
        }), e.RadialScale = e.Element.extend({
            initialize: function() {
                this.size = m([this.height, this.width]), this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2
            },
            calculateCenterOffset: function(t) {
                var i = this.drawingArea / (this.max - this.min);
                return (t - this.min) * i
            },
            update: function() {
                this.lineArc ? this.drawingArea = this.display ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY) : this.size / 2 : this.setScaleSize(), this.buildYLabels()
            },
            buildYLabels: function() {
                this.yLabels = [];
                for (var t = v(this.stepValue), i = 0; i <= this.steps; i++) this.yLabels.push(C(this.templateString, {
                    value: (this.min + i * this.stepValue).toFixed(t)
                }))
            },
            getCircumference: function() {
                return 2 * Math.PI / this.valuesCount
            },
            setScaleSize: function() {
                var t, i, e, s, n, o, a, h, l, r, c, u, d = m([this.height / 2 - this.pointLabelFontSize - 5, this.width / 2]),
                    p = this.width,
                    g = 0;
                for (this.ctx.font = W(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily), i = 0; i < this.valuesCount; i++) t = this.getPointPosition(i, d), e = this.ctx.measureText(C(this.templateString, {
                    value: this.labels[i]
                })).width + 5, 0 === i || i === this.valuesCount / 2 ? (s = e / 2, t.x + s > p && (p = t.x + s, n = i), t.x - s < g && (g = t.x - s, a = i)) : i < this.valuesCount / 2 ? t.x + e > p && (p = t.x + e, n = i) : i > this.valuesCount / 2 && t.x - e < g && (g = t.x - e, a = i);
                l = g, r = Math.ceil(p - this.width), o = this.getIndexAngle(n), h = this.getIndexAngle(a), c = r / Math.sin(o + Math.PI / 2), u = l / Math.sin(h + Math.PI / 2), c = f(c) ? c : 0, u = f(u) ? u : 0, this.drawingArea = d - (u + c) / 2, this.setCenterPoint(u, c)
            },
            setCenterPoint: function(t, i) {
                var e = this.width - i - this.drawingArea,
                    s = t + this.drawingArea;
                this.xCenter = (s + e) / 2, this.yCenter = this.height / 2
            },
            getIndexAngle: function(t) {
                var i = 2 * Math.PI / this.valuesCount;
                return t * i - Math.PI / 2
            },
            getPointPosition: function(t, i) {
                var e = this.getIndexAngle(t);
                return {
                    x: Math.cos(e) * i + this.xCenter,
                    y: Math.sin(e) * i + this.yCenter
                }
            },
            draw: function() {
                if (this.display) {
                    var t = this.ctx;
                    if (n(this.yLabels, function(i, e) {
                            if (e > 0) {
                                var s, n = e * (this.drawingArea / this.steps),
                                    o = this.yCenter - n;
                                if (this.lineWidth > 0)
                                    if (t.strokeStyle = this.lineColor, t.lineWidth = this.lineWidth, this.lineArc) t.beginPath(), t.arc(this.xCenter, this.yCenter, n, 0, 2 * Math.PI), t.closePath(), t.stroke();
                                    else {
                                        t.beginPath();
                                        for (var a = 0; a < this.valuesCount; a++) s = this.getPointPosition(a, this.calculateCenterOffset(this.min + e * this.stepValue)), 0 === a ? t.moveTo(s.x, s.y) : t.lineTo(s.x, s.y);
                                        t.closePath(), t.stroke()
                                    }
                                if (this.showLabels) {
                                    if (t.font = W(this.fontSize, this.fontStyle, this.fontFamily), this.showLabelBackdrop) {
                                        var h = t.measureText(i).width;
                                        t.fillStyle = this.backdropColor, t.fillRect(this.xCenter - h / 2 - this.backdropPaddingX, o - this.fontSize / 2 - this.backdropPaddingY, h + 2 * this.backdropPaddingX, this.fontSize + 2 * this.backdropPaddingY)
                                    }
                                    t.textAlign = "center", t.textBaseline = "middle", t.fillStyle = this.fontColor, t.fillText(i, this.xCenter, o)
                                }
                            }
                        }, this), !this.lineArc) {
                        t.lineWidth = this.angleLineWidth, t.strokeStyle = this.angleLineColor;
                        for (var i = this.valuesCount - 1; i >= 0; i--) {
                            if (this.angleLineWidth > 0) {
                                var e = this.getPointPosition(i, this.calculateCenterOffset(this.max));
                                t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(e.x, e.y), t.stroke(), t.closePath()
                            }
                            var s = this.getPointPosition(i, this.calculateCenterOffset(this.max) + 5);
                            t.font = W(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily), t.fillStyle = this.pointLabelFontColor;
                            var o = this.labels.length,
                                a = this.labels.length / 2,
                                h = a / 2,
                                l = h > i || i > o - h,
                                r = i === h || i === o - h;
                            t.textAlign = 0 === i ? "center" : i === a ? "center" : a > i ? "left" : "right", t.textBaseline = r ? "middle" : l ? "bottom" : "top", t.fillText(this.labels[i], s.x, s.y)
                        }
                    }
                }
            }
        }), s.addEvent(window, "resize", function() {
            var t;
            return function() {
                clearTimeout(t), t = setTimeout(function() {
                    n(e.instances, function(t) {
                        t.options.responsive && t.resize(t.render, !0)
                    })
                }, 50)
            }
        }()), p ? define(function() {
            return e
        }) : "object" == typeof module && module.exports && (module.exports = e), t.Chart = e, e.noConflict = function() {
            return t.Chart = i, e
        }
    }).call(this),
    function() {
        "use strict";
        var t = this,
            i = t.Chart,
            e = i.helpers,
            s = {
                scaleBeginAtZero: !0,
                scaleShowGridLines: !0,
                scaleGridLineColor: "rgba(0,0,0,.05)",
                scaleGridLineWidth: 1,
                scaleShowHorizontalLines: !0,
                scaleShowVerticalLines: !0,
                barShowStroke: !0,
                barStrokeWidth: 2,
                barValueSpacing: 5,
                barDatasetSpacing: 1,
                legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
            };
        i.Type.extend({
            name: "Bar",
            defaults: s,
            initialize: function(t) {
                var s = this.options;
                this.ScaleClass = i.Scale.extend({
                    offsetGridLines: !0,
                    calculateBarX: function(t, i, e) {
                        var n = this.calculateBaseWidth(),
                            o = this.calculateX(e) - n / 2,
                            a = this.calculateBarWidth(t);
                        return o + a * i + i * s.barDatasetSpacing + a / 2
                    },
                    calculateBaseWidth: function() {
                        return this.calculateX(1) - this.calculateX(0) - 2 * s.barValueSpacing
                    },
                    calculateBarWidth: function(t) {
                        var i = this.calculateBaseWidth() - (t - 1) * s.barDatasetSpacing;
                        return i / t
                    }
                }), this.datasets = [], this.options.showTooltips && e.bindEvents(this, this.options.tooltipEvents, function(t) {
                    var i = "mouseout" !== t.type ? this.getBarsAtEvent(t) : [];
                    this.eachBars(function(t) {
                        t.restore(["fillColor", "strokeColor"])
                    }), e.each(i, function(t) {
                        t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                    }), this.showTooltip(i)
                }), this.BarClass = i.Rectangle.extend({
                    strokeWidth: this.options.barStrokeWidth,
                    showStroke: this.options.barShowStroke,
                    ctx: this.chart.ctx
                }), e.each(t.datasets, function(i) {
                    var s = {
                        label: i.label || null,
                        fillColor: i.fillColor,
                        strokeColor: i.strokeColor,
                        bars: []
                    };
                    this.datasets.push(s), e.each(i.data, function(e, n) {
                        s.bars.push(new this.BarClass({
                            value: e,
                            label: t.labels[n],
                            datasetLabel: i.label,
                            strokeColor: i.strokeColor,
                            fillColor: i.fillColor,
                            highlightFill: i.highlightFill || i.fillColor,
                            highlightStroke: i.highlightStroke || i.strokeColor
                        }))
                    }, this)
                }, this), this.buildScale(t.labels), this.BarClass.prototype.base = this.scale.endPoint, this.eachBars(function(t, i, s) {
                    e.extend(t, {
                        width: this.scale.calculateBarWidth(this.datasets.length),
                        x: this.scale.calculateBarX(this.datasets.length, s, i),
                        y: this.scale.endPoint
                    }), t.save()
                }, this), this.render()
            },
            update: function() {
                this.scale.update(), e.each(this.activeElements, function(t) {
                    t.restore(["fillColor", "strokeColor"])
                }), this.eachBars(function(t) {
                    t.save()
                }), this.render()
            },
            eachBars: function(t) {
                e.each(this.datasets, function(i, s) {
                    e.each(i.bars, t, this, s)
                }, this)
            },
            getBarsAtEvent: function(t) {
                for (var i, s = [], n = e.getRelativePosition(t), o = function(t) {
                        s.push(t.bars[i])
                    }, a = 0; a < this.datasets.length; a++)
                    for (i = 0; i < this.datasets[a].bars.length; i++)
                        if (this.datasets[a].bars[i].inRange(n.x, n.y)) return e.each(this.datasets, o), s;
                return s
            },
            buildScale: function(t) {
                var i = this,
                    s = function() {
                        var t = [];
                        return i.eachBars(function(i) {
                            t.push(i.value)
                        }), t
                    },
                    n = {
                        templateString: this.options.scaleLabel,
                        height: this.chart.height,
                        width: this.chart.width,
                        ctx: this.chart.ctx,
                        textColor: this.options.scaleFontColor,
                        fontSize: this.options.scaleFontSize,
                        fontStyle: this.options.scaleFontStyle,
                        fontFamily: this.options.scaleFontFamily,
                        valuesCount: t.length,
                        beginAtZero: this.options.scaleBeginAtZero,
                        integersOnly: this.options.scaleIntegersOnly,
                        calculateYRange: function(t) {
                            var i = e.calculateScaleRange(s(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                            e.extend(this, i)
                        },
                        xLabels: t,
                        font: e.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                        lineWidth: this.options.scaleLineWidth,
                        lineColor: this.options.scaleLineColor,
                        showHorizontalLines: this.options.scaleShowHorizontalLines,
                        showVerticalLines: this.options.scaleShowVerticalLines,
                        gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth : 0,
                        gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                        padding: this.options.showScale ? 0 : this.options.barShowStroke ? this.options.barStrokeWidth : 0,
                        showLabels: this.options.scaleShowLabels,
                        display: this.options.showScale
                    };
                this.options.scaleOverride && e.extend(n, {
                    calculateYRange: e.noop,
                    steps: this.options.scaleSteps,
                    stepValue: this.options.scaleStepWidth,
                    min: this.options.scaleStartValue,
                    max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
                }), this.scale = new this.ScaleClass(n)
            },
            addData: function(t, i) {
                e.each(t, function(t, e) {
                    this.datasets[e].bars.push(new this.BarClass({
                        value: t,
                        label: i,
                        x: this.scale.calculateBarX(this.datasets.length, e, this.scale.valuesCount + 1),
                        y: this.scale.endPoint,
                        width: this.scale.calculateBarWidth(this.datasets.length),
                        base: this.scale.endPoint,
                        strokeColor: this.datasets[e].strokeColor,
                        fillColor: this.datasets[e].fillColor
                    }))
                }, this), this.scale.addXLabel(i), this.update()
            },
            removeData: function() {
                this.scale.removeXLabel(), e.each(this.datasets, function(t) {
                    t.bars.shift()
                }, this), this.update()
            },
            reflow: function() {
                e.extend(this.BarClass.prototype, {
                    y: this.scale.endPoint,
                    base: this.scale.endPoint
                });
                var t = e.extend({
                    height: this.chart.height,
                    width: this.chart.width
                });
                this.scale.update(t)
            },
            draw: function(t) {
                var i = t || 1;
                this.clear();
                this.chart.ctx;
                this.scale.draw(i), e.each(this.datasets, function(t, s) {
                    e.each(t.bars, function(t, e) {
                        t.hasValue() && (t.base = this.scale.endPoint, t.transition({
                            x: this.scale.calculateBarX(this.datasets.length, s, e),
                            y: this.scale.calculateY(t.value),
                            width: this.scale.calculateBarWidth(this.datasets.length)
                        }, i).draw())
                    }, this)
                }, this)
            }
        })
    }.call(this),
    function() {
        "use strict";
        var t = this,
            i = t.Chart,
            e = i.helpers,
            s = {
                segmentShowStroke: !0,
                segmentStrokeColor: "#fff",
                segmentStrokeWidth: 2,
                percentageInnerCutout: 50,
                animationSteps: 100,
                animationEasing: "easeOutBounce",
                animateRotate: !0,
                animateScale: !1,
                legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
            };
        i.Type.extend({
            name: "Doughnut",
            defaults: s,
            initialize: function(t) {
                this.segments = [], this.outerRadius = (e.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2, this.SegmentArc = i.Arc.extend({
                    ctx: this.chart.ctx,
                    x: this.chart.width / 2,
                    y: this.chart.height / 2
                }), this.options.showTooltips && e.bindEvents(this, this.options.tooltipEvents, function(t) {
                    var i = "mouseout" !== t.type ? this.getSegmentsAtEvent(t) : [];
                    e.each(this.segments, function(t) {
                        t.restore(["fillColor"])
                    }), e.each(i, function(t) {
                        t.fillColor = t.highlightColor
                    }), this.showTooltip(i)
                }), this.calculateTotal(t), e.each(t, function(t, i) {
                    this.addData(t, i, !0)
                }, this), this.render()
            },
            getSegmentsAtEvent: function(t) {
                var i = [],
                    s = e.getRelativePosition(t);
                return e.each(this.segments, function(t) {
                    t.inRange(s.x, s.y) && i.push(t)
                }, this), i
            },
            addData: function(t, i, e) {
                var s = i || this.segments.length;
                this.segments.splice(s, 0, new this.SegmentArc({
                    value: t.value,
                    outerRadius: this.options.animateScale ? 0 : this.outerRadius,
                    innerRadius: this.options.animateScale ? 0 : this.outerRadius / 100 * this.options.percentageInnerCutout,
                    fillColor: t.color,
                    highlightColor: t.highlight || t.color,
                    showStroke: this.options.segmentShowStroke,
                    strokeWidth: this.options.segmentStrokeWidth,
                    strokeColor: this.options.segmentStrokeColor,
                    startAngle: 1.5 * Math.PI,
                    circumference: this.options.animateRotate ? 0 : this.calculateCircumference(t.value),
                    label: t.label
                })), e || (this.reflow(), this.update())
            },
            calculateCircumference: function(t) {
                return 2 * Math.PI * (Math.abs(t) / this.total)
            },
            calculateTotal: function(t) {
                this.total = 0, e.each(t, function(t) {
                    this.total += Math.abs(t.value)
                }, this)
            },
            update: function() {
                this.calculateTotal(this.segments), e.each(this.activeElements, function(t) {
                    t.restore(["fillColor"])
                }), e.each(this.segments, function(t) {
                    t.save()
                }), this.render()
            },
            removeData: function(t) {
                var i = e.isNumber(t) ? t : this.segments.length - 1;
                this.segments.splice(i, 1), this.reflow(), this.update()
            },
            reflow: function() {
                e.extend(this.SegmentArc.prototype, {
                    x: this.chart.width / 2,
                    y: this.chart.height / 2
                }), this.outerRadius = (e.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2, e.each(this.segments, function(t) {
                    t.update({
                        outerRadius: this.outerRadius,
                        innerRadius: this.outerRadius / 100 * this.options.percentageInnerCutout
                    })
                }, this)
            },
            draw: function(t) {
                var i = t ? t : 1;
                this.clear(), e.each(this.segments, function(t, e) {
                    t.transition({
                        circumference: this.calculateCircumference(t.value),
                        outerRadius: this.outerRadius,
                        innerRadius: this.outerRadius / 100 * this.options.percentageInnerCutout
                    }, i), t.endAngle = t.startAngle + t.circumference, t.draw(), 0 === e && (t.startAngle = 1.5 * Math.PI), e < this.segments.length - 1 && (this.segments[e + 1].startAngle = t.endAngle)
                }, this)
            }
        }), i.types.Doughnut.extend({
            name: "Pie",
            defaults: e.merge(s, {
                percentageInnerCutout: 0
            })
        })
    }.call(this),
    function() {
        "use strict";
        var t = this,
            i = t.Chart,
            e = i.helpers,
            s = {
                scaleShowGridLines: !0,
                scaleGridLineColor: "rgba(0,0,0,.05)",
                scaleGridLineWidth: 1,
                scaleShowHorizontalLines: !0,
                scaleShowVerticalLines: !0,
                bezierCurve: !0,
                bezierCurveTension: .4,
                pointDot: !0,
                pointDotRadius: 4,
                pointDotStrokeWidth: 1,
                pointHitDetectionRadius: 20,
                datasetStroke: !0,
                datasetStrokeWidth: 2,
                datasetFill: !0,
                legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
            };
        i.Type.extend({
            name: "Line",
            defaults: s,
            initialize: function(t) {
                this.PointClass = i.Point.extend({
                    strokeWidth: this.options.pointDotStrokeWidth,
                    radius: this.options.pointDotRadius,
                    display: this.options.pointDot,
                    hitDetectionRadius: this.options.pointHitDetectionRadius,
                    ctx: this.chart.ctx,
                    inRange: function(t) {
                        return Math.pow(t - this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius, 2)
                    }
                }), this.datasets = [], this.options.showTooltips && e.bindEvents(this, this.options.tooltipEvents, function(t) {
                    var i = "mouseout" !== t.type ? this.getPointsAtEvent(t) : [];
                    this.eachPoints(function(t) {
                        t.restore(["fillColor", "strokeColor"])
                    }), e.each(i, function(t) {
                        t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                    }), this.showTooltip(i)
                }), e.each(t.datasets, function(i) {
                    var s = {
                        label: i.label || null,
                        fillColor: i.fillColor,
                        strokeColor: i.strokeColor,
                        pointColor: i.pointColor,
                        pointStrokeColor: i.pointStrokeColor,
                        points: []
                    };
                    this.datasets.push(s), e.each(i.data, function(e, n) {
                        s.points.push(new this.PointClass({
                            value: e,
                            label: t.labels[n],
                            datasetLabel: i.label,
                            strokeColor: i.pointStrokeColor,
                            fillColor: i.pointColor,
                            highlightFill: i.pointHighlightFill || i.pointColor,
                            highlightStroke: i.pointHighlightStroke || i.pointStrokeColor
                        }))
                    }, this), this.buildScale(t.labels), this.eachPoints(function(t, i) {
                        e.extend(t, {
                            x: this.scale.calculateX(i),
                            y: this.scale.endPoint
                        }), t.save()
                    }, this)
                }, this), this.render()
            },
            update: function() {
                this.scale.update(), e.each(this.activeElements, function(t) {
                    t.restore(["fillColor", "strokeColor"])
                }), this.eachPoints(function(t) {
                    t.save()
                }), this.render()
            },
            eachPoints: function(t) {
                e.each(this.datasets, function(i) {
                    e.each(i.points, t, this)
                }, this)
            },
            getPointsAtEvent: function(t) {
                var i = [],
                    s = e.getRelativePosition(t);
                return e.each(this.datasets, function(t) {
                    e.each(t.points, function(t) {
                        t.inRange(s.x, s.y) && i.push(t)
                    })
                }, this), i
            },
            buildScale: function(t) {
                var s = this,
                    n = function() {
                        var t = [];
                        return s.eachPoints(function(i) {
                            t.push(i.value)
                        }), t
                    },
                    o = {
                        templateString: this.options.scaleLabel,
                        height: this.chart.height,
                        width: this.chart.width,
                        ctx: this.chart.ctx,
                        textColor: this.options.scaleFontColor,
                        fontSize: this.options.scaleFontSize,
                        fontStyle: this.options.scaleFontStyle,
                        fontFamily: this.options.scaleFontFamily,
                        valuesCount: t.length,
                        beginAtZero: this.options.scaleBeginAtZero,
                        integersOnly: this.options.scaleIntegersOnly,
                        calculateYRange: function(t) {
                            var i = e.calculateScaleRange(n(), t, this.fontSize, this.beginAtZero, this.integersOnly);
                            e.extend(this, i)
                        },
                        xLabels: t,
                        font: e.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                        lineWidth: this.options.scaleLineWidth,
                        lineColor: this.options.scaleLineColor,
                        showHorizontalLines: this.options.scaleShowHorizontalLines,
                        showVerticalLines: this.options.scaleShowVerticalLines,
                        gridLineWidth: this.options.scaleShowGridLines ? this.options.scaleGridLineWidth : 0,
                        gridLineColor: this.options.scaleShowGridLines ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                        padding: this.options.showScale ? 0 : this.options.pointDotRadius + this.options.pointDotStrokeWidth,
                        showLabels: this.options.scaleShowLabels,
                        display: this.options.showScale
                    };
                this.options.scaleOverride && e.extend(o, {
                    calculateYRange: e.noop,
                    steps: this.options.scaleSteps,
                    stepValue: this.options.scaleStepWidth,
                    min: this.options.scaleStartValue,
                    max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
                }), this.scale = new i.Scale(o)
            },
            addData: function(t, i) {
                e.each(t, function(t, e) {
                    this.datasets[e].points.push(new this.PointClass({
                        value: t,
                        label: i,
                        x: this.scale.calculateX(this.scale.valuesCount + 1),
                        y: this.scale.endPoint,
                        strokeColor: this.datasets[e].pointStrokeColor,
                        fillColor: this.datasets[e].pointColor
                    }))
                }, this), this.scale.addXLabel(i), this.update()
            },
            removeData: function() {
                this.scale.removeXLabel(), e.each(this.datasets, function(t) {
                    t.points.shift()
                }, this), this.update()
            },
            reflow: function() {
                var t = e.extend({
                    height: this.chart.height,
                    width: this.chart.width
                });
                this.scale.update(t)
            },
            draw: function(t) {
                var i = t || 1;
                this.clear();
                var s = this.chart.ctx,
                    n = function(t) {
                        return null !== t.value
                    },
                    o = function(t, i, s) {
                        return e.findNextWhere(i, n, s) || t
                    },
                    a = function(t, i, s) {
                        return e.findPreviousWhere(i, n, s) || t
                    };
                this.scale.draw(i), e.each(this.datasets, function(t) {
                    var h = e.where(t.points, n);
                    e.each(t.points, function(t, e) {
                        t.hasValue() && t.transition({
                            y: this.scale.calculateY(t.value),
                            x: this.scale.calculateX(e)
                        }, i)
                    }, this), this.options.bezierCurve && e.each(h, function(t, i) {
                        var s = i > 0 && i < h.length - 1 ? this.options.bezierCurveTension : 0;
                        t.controlPoints = e.splineCurve(a(t, h, i), t, o(t, h, i), s), t.controlPoints.outer.y > this.scale.endPoint ? t.controlPoints.outer.y = this.scale.endPoint : t.controlPoints.outer.y < this.scale.startPoint && (t.controlPoints.outer.y = this.scale.startPoint), t.controlPoints.inner.y > this.scale.endPoint ? t.controlPoints.inner.y = this.scale.endPoint : t.controlPoints.inner.y < this.scale.startPoint && (t.controlPoints.inner.y = this.scale.startPoint)
                    }, this), s.lineWidth = this.options.datasetStrokeWidth, s.strokeStyle = t.strokeColor, s.beginPath(), e.each(h, function(t, i) {
                        if (0 === i) s.moveTo(t.x, t.y);
                        else if (this.options.bezierCurve) {
                            var e = a(t, h, i);
                            s.bezierCurveTo(e.controlPoints.outer.x, e.controlPoints.outer.y, t.controlPoints.inner.x, t.controlPoints.inner.y, t.x, t.y)
                        } else s.lineTo(t.x, t.y)
                    }, this), s.stroke(), this.options.datasetFill && h.length > 0 && (s.lineTo(h[h.length - 1].x, this.scale.endPoint), s.lineTo(h[0].x, this.scale.endPoint), s.fillStyle = t.fillColor, s.closePath(), s.fill()), e.each(h, function(t) {
                        t.draw()
                    })
                }, this)
            }
        })
    }.call(this),
    function() {
        "use strict";
        var t = this,
            i = t.Chart,
            e = i.helpers,
            s = {
                scaleShowLabelBackdrop: !0,
                scaleBackdropColor: "rgba(255,255,255,0.75)",
                scaleBeginAtZero: !0,
                scaleBackdropPaddingY: 2,
                scaleBackdropPaddingX: 2,
                scaleShowLine: !0,
                segmentShowStroke: !0,
                segmentStrokeColor: "#fff",
                segmentStrokeWidth: 2,
                animationSteps: 100,
                animationEasing: "easeOutBounce",
                animateRotate: !0,
                animateScale: !1,
                legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
            };
        i.Type.extend({
            name: "PolarArea",
            defaults: s,
            initialize: function(t) {
                this.segments = [], this.SegmentArc = i.Arc.extend({
                    showStroke: this.options.segmentShowStroke,
                    strokeWidth: this.options.segmentStrokeWidth,
                    strokeColor: this.options.segmentStrokeColor,
                    ctx: this.chart.ctx,
                    innerRadius: 0,
                    x: this.chart.width / 2,
                    y: this.chart.height / 2
                }), this.scale = new i.RadialScale({
                    display: this.options.showScale,
                    fontStyle: this.options.scaleFontStyle,
                    fontSize: this.options.scaleFontSize,
                    fontFamily: this.options.scaleFontFamily,
                    fontColor: this.options.scaleFontColor,
                    showLabels: this.options.scaleShowLabels,
                    showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                    backdropColor: this.options.scaleBackdropColor,
                    backdropPaddingY: this.options.scaleBackdropPaddingY,
                    backdropPaddingX: this.options.scaleBackdropPaddingX,
                    lineWidth: this.options.scaleShowLine ? this.options.scaleLineWidth : 0,
                    lineColor: this.options.scaleLineColor,
                    lineArc: !0,
                    width: this.chart.width,
                    height: this.chart.height,
                    xCenter: this.chart.width / 2,
                    yCenter: this.chart.height / 2,
                    ctx: this.chart.ctx,
                    templateString: this.options.scaleLabel,
                    valuesCount: t.length
                }), this.updateScaleRange(t), this.scale.update(), e.each(t, function(t, i) {
                    this.addData(t, i, !0)
                }, this), this.options.showTooltips && e.bindEvents(this, this.options.tooltipEvents, function(t) {
                    var i = "mouseout" !== t.type ? this.getSegmentsAtEvent(t) : [];
                    e.each(this.segments, function(t) {
                        t.restore(["fillColor"])
                    }), e.each(i, function(t) {
                        t.fillColor = t.highlightColor
                    }), this.showTooltip(i)
                }), this.render()
            },
            getSegmentsAtEvent: function(t) {
                var i = [],
                    s = e.getRelativePosition(t);
                return e.each(this.segments, function(t) {
                    t.inRange(s.x, s.y) && i.push(t)
                }, this), i
            },
            addData: function(t, i, e) {
                var s = i || this.segments.length;
                this.segments.splice(s, 0, new this.SegmentArc({
                    fillColor: t.color,
                    highlightColor: t.highlight || t.color,
                    label: t.label,
                    value: t.value,
                    outerRadius: this.options.animateScale ? 0 : this.scale.calculateCenterOffset(t.value),
                    circumference: this.options.animateRotate ? 0 : this.scale.getCircumference(),
                    startAngle: 1.5 * Math.PI
                })), e || (this.reflow(), this.update())
            },
            removeData: function(t) {
                var i = e.isNumber(t) ? t : this.segments.length - 1;
                this.segments.splice(i, 1), this.reflow(), this.update()
            },
            calculateTotal: function(t) {
                this.total = 0, e.each(t, function(t) {
                    this.total += t.value
                }, this), this.scale.valuesCount = this.segments.length
            },
            updateScaleRange: function(t) {
                var i = [];
                e.each(t, function(t) {
                    i.push(t.value)
                });
                var s = this.options.scaleOverride ? {
                    steps: this.options.scaleSteps,
                    stepValue: this.options.scaleStepWidth,
                    min: this.options.scaleStartValue,
                    max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
                } : e.calculateScaleRange(i, e.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
                e.extend(this.scale, s, {
                    size: e.min([this.chart.width, this.chart.height]),
                    xCenter: this.chart.width / 2,
                    yCenter: this.chart.height / 2
                })
            },
            update: function() {
                this.calculateTotal(this.segments), e.each(this.segments, function(t) {
                    t.save()
                }), this.reflow(), this.render()
            },
            reflow: function() {
                e.extend(this.SegmentArc.prototype, {
                    x: this.chart.width / 2,
                    y: this.chart.height / 2
                }), this.updateScaleRange(this.segments), this.scale.update(), e.extend(this.scale, {
                    xCenter: this.chart.width / 2,
                    yCenter: this.chart.height / 2
                }), e.each(this.segments, function(t) {
                    t.update({
                        outerRadius: this.scale.calculateCenterOffset(t.value)
                    })
                }, this)
            },
            draw: function(t) {
                var i = t || 1;
                this.clear(), e.each(this.segments, function(t, e) {
                    t.transition({
                        circumference: this.scale.getCircumference(),
                        outerRadius: this.scale.calculateCenterOffset(t.value)
                    }, i), t.endAngle = t.startAngle + t.circumference, 0 === e && (t.startAngle = 1.5 * Math.PI), e < this.segments.length - 1 && (this.segments[e + 1].startAngle = t.endAngle), t.draw()
                }, this), this.scale.draw()
            }
        })
    }.call(this),
    function() {
        "use strict";
        var t = this,
            i = t.Chart,
            e = i.helpers;
        i.Type.extend({
            name: "Radar",
            defaults: {
                scaleShowLine: !0,
                angleShowLineOut: !0,
                scaleShowLabels: !1,
                scaleBeginAtZero: !0,
                angleLineColor: "rgba(0,0,0,.1)",
                angleLineWidth: 1,
                pointLabelFontFamily: "'Arial'",
                pointLabelFontStyle: "normal",
                pointLabelFontSize: 10,
                pointLabelFontColor: "#666",
                pointDot: !0,
                pointDotRadius: 3,
                pointDotStrokeWidth: 1,
                pointHitDetectionRadius: 20,
                datasetStroke: !0,
                datasetStrokeWidth: 2,
                datasetFill: !0,
                legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
            },
            initialize: function(t) {
                this.PointClass = i.Point.extend({
                    strokeWidth: this.options.pointDotStrokeWidth,
                    radius: this.options.pointDotRadius,
                    display: this.options.pointDot,
                    hitDetectionRadius: this.options.pointHitDetectionRadius,
                    ctx: this.chart.ctx
                }), this.datasets = [], this.buildScale(t), this.options.showTooltips && e.bindEvents(this, this.options.tooltipEvents, function(t) {
                    var i = "mouseout" !== t.type ? this.getPointsAtEvent(t) : [];
                    this.eachPoints(function(t) {
                        t.restore(["fillColor", "strokeColor"])
                    }), e.each(i, function(t) {
                        t.fillColor = t.highlightFill, t.strokeColor = t.highlightStroke
                    }), this.showTooltip(i)
                }), e.each(t.datasets, function(i) {
                    var s = {
                        label: i.label || null,
                        fillColor: i.fillColor,
                        strokeColor: i.strokeColor,
                        pointColor: i.pointColor,
                        pointStrokeColor: i.pointStrokeColor,
                        points: []
                    };
                    this.datasets.push(s), e.each(i.data, function(e, n) {
                        var o;
                        this.scale.animation || (o = this.scale.getPointPosition(n, this.scale.calculateCenterOffset(e))), s.points.push(new this.PointClass({
                            value: e,
                            label: t.labels[n],
                            datasetLabel: i.label,
                            x: this.options.animation ? this.scale.xCenter : o.x,
                            y: this.options.animation ? this.scale.yCenter : o.y,
                            strokeColor: i.pointStrokeColor,
                            fillColor: i.pointColor,
                            highlightFill: i.pointHighlightFill || i.pointColor,
                            highlightStroke: i.pointHighlightStroke || i.pointStrokeColor
                        }))
                    }, this)
                }, this), this.render()
            },
            eachPoints: function(t) {
                e.each(this.datasets, function(i) {
                    e.each(i.points, t, this)
                }, this)
            },
            getPointsAtEvent: function(t) {
                var i = e.getRelativePosition(t),
                    s = e.getAngleFromPoint({
                        x: this.scale.xCenter,
                        y: this.scale.yCenter
                    }, i),
                    n = 2 * Math.PI / this.scale.valuesCount,
                    o = Math.round((s.angle - 1.5 * Math.PI) / n),
                    a = [];
                return (o >= this.scale.valuesCount || 0 > o) && (o = 0), s.distance <= this.scale.drawingArea && e.each(this.datasets, function(t) {
                    a.push(t.points[o])
                }), a
            },
            buildScale: function(t) {
                this.scale = new i.RadialScale({
                    display: this.options.showScale,
                    fontStyle: this.options.scaleFontStyle,
                    fontSize: this.options.scaleFontSize,
                    fontFamily: this.options.scaleFontFamily,
                    fontColor: this.options.scaleFontColor,
                    showLabels: this.options.scaleShowLabels,
                    showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                    backdropColor: this.options.scaleBackdropColor,
                    backdropPaddingY: this.options.scaleBackdropPaddingY,
                    backdropPaddingX: this.options.scaleBackdropPaddingX,
                    lineWidth: this.options.scaleShowLine ? this.options.scaleLineWidth : 0,
                    lineColor: this.options.scaleLineColor,
                    angleLineColor: this.options.angleLineColor,
                    angleLineWidth: this.options.angleShowLineOut ? this.options.angleLineWidth : 0,
                    pointLabelFontColor: this.options.pointLabelFontColor,
                    pointLabelFontSize: this.options.pointLabelFontSize,
                    pointLabelFontFamily: this.options.pointLabelFontFamily,
                    pointLabelFontStyle: this.options.pointLabelFontStyle,
                    height: this.chart.height,
                    width: this.chart.width,
                    xCenter: this.chart.width / 2,
                    yCenter: this.chart.height / 2,
                    ctx: this.chart.ctx,
                    templateString: this.options.scaleLabel,
                    labels: t.labels,
                    valuesCount: t.datasets[0].data.length
                }), this.scale.setScaleSize(), this.updateScaleRange(t.datasets), this.scale.buildYLabels()
            },
            updateScaleRange: function(t) {
                var i = function() {
                        var i = [];
                        return e.each(t, function(t) {
                            t.data ? i = i.concat(t.data) : e.each(t.points, function(t) {
                                i.push(t.value)
                            })
                        }), i
                    }(),
                    s = this.options.scaleOverride ? {
                        steps: this.options.scaleSteps,
                        stepValue: this.options.scaleStepWidth,
                        min: this.options.scaleStartValue,
                        max: this.options.scaleStartValue + this.options.scaleSteps * this.options.scaleStepWidth
                    } : e.calculateScaleRange(i, e.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
                e.extend(this.scale, s)
            },
            addData: function(t, i) {
                this.scale.valuesCount++, e.each(t, function(t, e) {
                    var s = this.scale.getPointPosition(this.scale.valuesCount, this.scale.calculateCenterOffset(t));
                    this.datasets[e].points.push(new this.PointClass({
                        value: t,
                        label: i,
                        x: s.x,
                        y: s.y,
                        strokeColor: this.datasets[e].pointStrokeColor,
                        fillColor: this.datasets[e].pointColor
                    }))
                }, this), this.scale.labels.push(i), this.reflow(), this.update()
            },
            removeData: function() {
                this.scale.valuesCount--, this.scale.labels.shift(), e.each(this.datasets, function(t) {
                    t.points.shift()
                }, this), this.reflow(), this.update()
            },
            update: function() {
                this.eachPoints(function(t) {
                    t.save()
                }), this.reflow(), this.render()
            },
            reflow: function() {
                e.extend(this.scale, {
                    width: this.chart.width,
                    height: this.chart.height,
                    size: e.min([this.chart.width, this.chart.height]),
                    xCenter: this.chart.width / 2,
                    yCenter: this.chart.height / 2
                }), this.updateScaleRange(this.datasets), this.scale.setScaleSize(), this.scale.buildYLabels()
            },
            draw: function(t) {
                var i = t || 1,
                    s = this.chart.ctx;
                this.clear(), this.scale.draw(), e.each(this.datasets, function(t) {
                    e.each(t.points, function(t, e) {
                        t.hasValue() && t.transition(this.scale.getPointPosition(e, this.scale.calculateCenterOffset(t.value)), i)
                    }, this), s.lineWidth = this.options.datasetStrokeWidth, s.strokeStyle = t.strokeColor, s.beginPath(), e.each(t.points, function(t, i) {
                        0 === i ? s.moveTo(t.x, t.y) : s.lineTo(t.x, t.y)
                    }, this), s.closePath(), s.stroke(), s.fillStyle = t.fillColor, s.fill(), e.each(t.points, function(t) {
                        t.hasValue() && t.draw()
                    })
                }, this)
            }
        })
    }.call(this);


// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.2
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */


(function(){

    "use strict";

    //Declare root variable - window in the browser, global on the server
    var root = this,
        previous = root.Chart;

    //Occupy the global variable of Chart, and create a simple base class
    var Chart = function(context){
        var chart = this;
        this.canvas = context.canvas;

        this.ctx = context;

        //Variables global to the chart
        var computeDimension = function(element,dimension)
        {
            if (element['offset'+dimension])
            {
                return element['offset'+dimension];
            }
            else
            {
                return document.defaultView.getComputedStyle(element).getPropertyValue(dimension);
            }
        };

        var width = this.width = computeDimension(context.canvas,'Width') || context.canvas.width;
        var height = this.height = computeDimension(context.canvas,'Height') || context.canvas.height;

        width = this.width = context.canvas.width;
        height = this.height = context.canvas.height;
        this.aspectRatio = this.width / this.height;
        //High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
        helpers.retinaScale(this);

        return this;
    };
    //Globally expose the defaults to allow for user updating/changing
    Chart.defaults = {
        global: {
            // Boolean - Whether to animate the chart
            animation: true,

            // Number - Number of animation steps
            animationSteps: 60,

            // String - Animation easing effect
            animationEasing: "easeOutQuart",

            // Boolean - If we should show the scale at all
            showScale: true,

            // Boolean - If we want to override with a hard coded scale
            scaleOverride: false,

            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: null,
            // Number - The value jump in the hard coded scale
            scaleStepWidth: null,
            // Number - The scale starting value
            scaleStartValue: null,

            // String - Colour of the scale line
            scaleLineColor: "rgba(0,0,0,.1)",

            // Number - Pixel width of the scale line
            scaleLineWidth: 1,

            // Boolean - Whether to show labels on the scale
            scaleShowLabels: true,

            // Interpolated JS string - can access value
            scaleLabel: "<%=value%>",

            // Boolean - Whether the scale should stick to integers, and not show any floats even if drawing space is there
            scaleIntegersOnly: true,

            // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero: false,

            // String - Scale label font declaration for the scale label
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Scale label font size in pixels
            scaleFontSize: 12,

            // String - Scale label font weight style
            scaleFontStyle: "normal",

            // String - Scale label font colour
            scaleFontColor: "#666",

            // Boolean - whether or not the chart should be responsive and resize when the browser does.
            responsive: false,

            // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
            maintainAspectRatio: true,

            // Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
            showTooltips: true,

            // Boolean - Determines whether to draw built-in tooltip or call custom tooltip function
            customTooltips: false,

            // Array - Array of string names to attach tooltip events
            tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],

            // String - Tooltip background colour
            tooltipFillColor: "rgba(0,0,0,0.8)",

            // String - Tooltip label font declaration for the scale label
            tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip label font size in pixels
            tooltipFontSize: 14,

            // String - Tooltip font weight style
            tooltipFontStyle: "normal",

            // String - Tooltip label font colour
            tooltipFontColor: "#fff",

            // String - Tooltip title font declaration for the scale label
            tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip title font size in pixels
            tooltipTitleFontSize: 14,

            // String - Tooltip title font weight style
            tooltipTitleFontStyle: "bold",

            // String - Tooltip title font colour
            tooltipTitleFontColor: "#fff",

            // String - Tooltip title template
            tooltipTitleTemplate: "<%= label%>",

            // Number - pixel width of padding around tooltip text
            tooltipYPadding: 6,

            // Number - pixel width of padding around tooltip text
            tooltipXPadding: 6,

            // Number - Size of the caret on the tooltip
            tooltipCaretSize: 8,

            // Number - Pixel radius of the tooltip border
            tooltipCornerRadius: 6,

            // Number - Pixel offset from point x to tooltip edge
            tooltipXOffset: 10,

            // String - Template string for single tooltips
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

            // String - Template string for single tooltips
            multiTooltipTemplate: "<%= value %>",

            // String - Colour behind the legend colour block
            multiTooltipKeyBackground: '#fff',

            // Array - A list of colors to use as the defaults
            segmentColorDefault: ["#A6CEE3", "#1F78B4", "#B2DF8A", "#33A02C", "#FB9A99", "#E31A1C", "#FDBF6F", "#FF7F00", "#CAB2D6", "#6A3D9A", "#B4B482", "#B15928" ],

            // Array - A list of highlight colors to use as the defaults
            segmentHighlightColorDefaults: [ "#CEF6FF", "#47A0DC", "#DAFFB2", "#5BC854", "#FFC2C1", "#FF4244", "#FFE797", "#FFA728", "#F2DAFE", "#9265C2", "#DCDCAA", "#D98150" ],

            // Function - Will fire on animation progression.
            onAnimationProgress: function(){},

            // Function - Will fire on animation completion.
            onAnimationComplete: function(){}

        }
    };

    //Create a dictionary of chart types, to allow for extension of existing types
    Chart.types = {};

    //Global Chart helpers object for utility methods and classes
    var helpers = Chart.helpers = {};

        //-- Basic js utility methods
    var each = helpers.each = function(loopable,callback,self){
            var additionalArgs = Array.prototype.slice.call(arguments, 3);
            // Check to see if null or undefined firstly.
            if (loopable){
                if (loopable.length === +loopable.length){
                    var i;
                    for (i=0; i<loopable.length; i++){
                        callback.apply(self,[loopable[i], i].concat(additionalArgs));
                    }
                }
                else{
                    for (var item in loopable){
                        callback.apply(self,[loopable[item],item].concat(additionalArgs));
                    }
                }
            }
        },
        clone = helpers.clone = function(obj){
            var objClone = {};
            each(obj,function(value,key){
                if (obj.hasOwnProperty(key)){
                    objClone[key] = value;
                }
            });
            return objClone;
        },
        extend = helpers.extend = function(base){
            each(Array.prototype.slice.call(arguments,1), function(extensionObject) {
                each(extensionObject,function(value,key){
                    if (extensionObject.hasOwnProperty(key)){
                        base[key] = value;
                    }
                });
            });
            return base;
        },
        merge = helpers.merge = function(base,master){
            //Merge properties in left object over to a shallow clone of object right.
            var args = Array.prototype.slice.call(arguments,0);
            args.unshift({});
            return extend.apply(null, args);
        },
        indexOf = helpers.indexOf = function(arrayToSearch, item){
            if (Array.prototype.indexOf) {
                return arrayToSearch.indexOf(item);
            }
            else{
                for (var i = 0; i < arrayToSearch.length; i++) {
                    if (arrayToSearch[i] === item) return i;
                }
                return -1;
            }
        },
        where = helpers.where = function(collection, filterCallback){
            var filtered = [];

            helpers.each(collection, function(item){
                if (filterCallback(item)){
                    filtered.push(item);
                }
            });

            return filtered;
        },
        findNextWhere = helpers.findNextWhere = function(arrayToSearch, filterCallback, startIndex){
            // Default to start of the array
            if (!startIndex){
                startIndex = -1;
            }
            for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
                var currentItem = arrayToSearch[i];
                if (filterCallback(currentItem)){
                    return currentItem;
                }
            }
        },
        findPreviousWhere = helpers.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex){
            // Default to end of the array
            if (!startIndex){
                startIndex = arrayToSearch.length;
            }
            for (var i = startIndex - 1; i >= 0; i--) {
                var currentItem = arrayToSearch[i];
                if (filterCallback(currentItem)){
                    return currentItem;
                }
            }
        },
        inherits = helpers.inherits = function(extensions){
            //Basic javascript inheritance based on the model created in Backbone.js
            var parent = this;
            var ChartElement = (extensions && extensions.hasOwnProperty("constructor")) ? extensions.constructor : function(){ return parent.apply(this, arguments); };

            var Surrogate = function(){ this.constructor = ChartElement;};
            Surrogate.prototype = parent.prototype;
            ChartElement.prototype = new Surrogate();

            ChartElement.extend = inherits;

            if (extensions) extend(ChartElement.prototype, extensions);

            ChartElement.__super__ = parent.prototype;

            return ChartElement;
        },
        noop = helpers.noop = function(){},
        uid = helpers.uid = (function(){
            var id=0;
            return function(){
                return "chart-" + id++;
            };
        })(),
        warn = helpers.warn = function(str){
            //Method for warning of errors
            if (window.console && typeof window.console.warn === "function") console.warn(str);
        },
        amd = helpers.amd = (typeof define === 'function' && define.amd),
        //-- Math methods
        isNumber = helpers.isNumber = function(n){
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        max = helpers.max = function(array){
            return Math.max.apply( Math, array );
        },
        min = helpers.min = function(array){
            return Math.min.apply( Math, array );
        },
        cap = helpers.cap = function(valueToCap,maxValue,minValue){
            if(isNumber(maxValue)) {
                if( valueToCap > maxValue ) {
                    return maxValue;
                }
            }
            else if(isNumber(minValue)){
                if ( valueToCap < minValue ){
                    return minValue;
                }
            }
            return valueToCap;
        },
        getDecimalPlaces = helpers.getDecimalPlaces = function(num){
            if (num%1!==0 && isNumber(num)){
                var s = num.toString();
                if(s.indexOf("e-") < 0){
                    // no exponent, e.g. 0.01
                    return s.split(".")[1].length;
                }
                else if(s.indexOf(".") < 0) {
                    // no decimal point, e.g. 1e-9
                    return parseInt(s.split("e-")[1]);
                }
                else {
                    // exponent and decimal point, e.g. 1.23e-9
                    var parts = s.split(".")[1].split("e-");
                    return parts[0].length + parseInt(parts[1]);
                }
            }
            else {
                return 0;
            }
        },
        toRadians = helpers.radians = function(degrees){
            return degrees * (Math.PI/180);
        },
        // Gets the angle from vertical upright to the point about a centre.
        getAngleFromPoint = helpers.getAngleFromPoint = function(centrePoint, anglePoint){
            var distanceFromXCenter = anglePoint.x - centrePoint.x,
                distanceFromYCenter = anglePoint.y - centrePoint.y,
                radialDistanceFromCenter = Math.sqrt( distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);


            var angle = Math.PI * 2 + Math.atan2(distanceFromYCenter, distanceFromXCenter);

            //If the segment is in the top left quadrant, we need to add another rotation to the angle
            if (distanceFromXCenter < 0 && distanceFromYCenter < 0){
                angle += Math.PI*2;
            }

            return {
                angle: angle,
                distance: radialDistanceFromCenter
            };
        },
        aliasPixel = helpers.aliasPixel = function(pixelWidth){
            return (pixelWidth % 2 === 0) ? 0 : 0.5;
        },
        splineCurve = helpers.splineCurve = function(FirstPoint,MiddlePoint,AfterPoint,t){
            //Props to Rob Spencer at scaled innovation for his post on splining between points
            //http://scaledinnovation.com/analytics/splines/aboutSplines.html
            var d01=Math.sqrt(Math.pow(MiddlePoint.x-FirstPoint.x,2)+Math.pow(MiddlePoint.y-FirstPoint.y,2)),
                d12=Math.sqrt(Math.pow(AfterPoint.x-MiddlePoint.x,2)+Math.pow(AfterPoint.y-MiddlePoint.y,2)),
                fa=t*d01/(d01+d12),// scaling factor for triangle Ta
                fb=t*d12/(d01+d12);
            return {
                inner : {
                    x : MiddlePoint.x-fa*(AfterPoint.x-FirstPoint.x),
                    y : MiddlePoint.y-fa*(AfterPoint.y-FirstPoint.y)
                },
                outer : {
                    x: MiddlePoint.x+fb*(AfterPoint.x-FirstPoint.x),
                    y : MiddlePoint.y+fb*(AfterPoint.y-FirstPoint.y)
                }
            };
        },
        calculateOrderOfMagnitude = helpers.calculateOrderOfMagnitude = function(val){
            return Math.floor(Math.log(val) / Math.LN10);
        },
        calculateScaleRange = helpers.calculateScaleRange = function(valuesArray, drawingSize, textSize, startFromZero, integersOnly){

            //Set a minimum step of two - a point at the top of the graph, and a point at the base
            var minSteps = 2,
                maxSteps = Math.floor(drawingSize/(textSize * 1.5)),
                skipFitting = (minSteps >= maxSteps);

            // Filter out null values since these would min() to zero
            var values = [];
            each(valuesArray, function( v ){
                v == null || values.push( v );
            });
            var minValue = min(values),
                maxValue = max(values);

            // We need some degree of separation here to calculate the scales if all the values are the same
            // Adding/minusing 0.5 will give us a range of 1.
            if (maxValue === minValue){
                maxValue += 0.5;
                // So we don't end up with a graph with a negative start value if we've said always start from zero
                if (minValue >= 0.5 && !startFromZero){
                    minValue -= 0.5;
                }
                else{
                    // Make up a whole number above the values
                    maxValue += 0.5;
                }
            }

            var valueRange = Math.abs(maxValue - minValue),
                rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange),
                graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude),
                graphMin = (startFromZero) ? 0 : Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude),
                graphRange = graphMax - graphMin,
                stepValue = Math.pow(10, rangeOrderOfMagnitude),
                numberOfSteps = Math.round(graphRange / stepValue);

            //If we have more space on the graph we'll use it to give more definition to the data
            while((numberOfSteps > maxSteps || (numberOfSteps * 2) < maxSteps) && !skipFitting) {
                if(numberOfSteps > maxSteps){
                    stepValue *=2;
                    numberOfSteps = Math.round(graphRange/stepValue);
                    // Don't ever deal with a decimal number of steps - cancel fitting and just use the minimum number of steps.
                    if (numberOfSteps % 1 !== 0){
                        skipFitting = true;
                    }
                }
                //We can fit in double the amount of scale points on the scale
                else{
                    //If user has declared ints only, and the step value isn't a decimal
                    if (integersOnly && rangeOrderOfMagnitude >= 0){
                        //If the user has said integers only, we need to check that making the scale more granular wouldn't make it a float
                        if(stepValue/2 % 1 === 0){
                            stepValue /=2;
                            numberOfSteps = Math.round(graphRange/stepValue);
                        }
                        //If it would make it a float break out of the loop
                        else{
                            break;
                        }
                    }
                    //If the scale doesn't have to be an int, make the scale more granular anyway.
                    else{
                        stepValue /=2;
                        numberOfSteps = Math.round(graphRange/stepValue);
                    }

                }
            }

            if (skipFitting){
                numberOfSteps = minSteps;
                stepValue = graphRange / numberOfSteps;
            }

            return {
                steps : numberOfSteps,
                stepValue : stepValue,
                min : graphMin,
                max : graphMin + (numberOfSteps * stepValue)
            };

        },
        /* jshint ignore:start */
        // Blows up jshint errors based on the new Function constructor
        //Templating methods
        //Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
        template = helpers.template = function(templateString, valuesObject){

            // If templateString is function rather than string-template - call the function for valuesObject

            if(templateString instanceof Function){
                return templateString(valuesObject);
            }

            var cache = {};
            function tmpl(str, data){
                // Figure out if we're getting a template, or if we need to
                // load the template - and be sure to cache the result.
                var fn = !/\W/.test(str) ?
                cache[str] = cache[str] :

                // Generate a reusable function that will serve as a template
                // generator (and which will be cached).
                new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                    "with(obj){p.push('" +

                    // Convert the template into pure JavaScript
                    str
                        .replace(/[\r\t\n]/g, " ")
                        .split("<%").join("\t")
                        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                        .replace(/\t=(.*?)%>/g, "',$1,'")
                        .split("\t").join("');")
                        .split("%>").join("p.push('")
                        .split("\r").join("\\'") +
                    "');}return p.join('');"
                );

                // Provide some basic currying to the user
                return data ? fn( data ) : fn;
            }
            return tmpl(templateString,valuesObject);
        },
        /* jshint ignore:end */
        generateLabels = helpers.generateLabels = function(templateString,numberOfSteps,graphMin,stepValue){
            var labelsArray = new Array(numberOfSteps);
            if (templateString){
                each(labelsArray,function(val,index){
                    labelsArray[index] = template(templateString,{value: (graphMin + (stepValue*(index+1)))});
                });
            }
            return labelsArray;
        },
        //--Animation methods
        //Easing functions adapted from Robert Penner's easing equations
        //http://www.robertpenner.com/easing/
        easingEffects = helpers.easingEffects = {
            linear: function (t) {
                return t;
            },
            easeInQuad: function (t) {
                return t * t;
            },
            easeOutQuad: function (t) {
                return -1 * t * (t - 2);
            },
            easeInOutQuad: function (t) {
                if ((t /= 1 / 2) < 1){
                    return 1 / 2 * t * t;
                }
                return -1 / 2 * ((--t) * (t - 2) - 1);
            },
            easeInCubic: function (t) {
                return t * t * t;
            },
            easeOutCubic: function (t) {
                return 1 * ((t = t / 1 - 1) * t * t + 1);
            },
            easeInOutCubic: function (t) {
                if ((t /= 1 / 2) < 1){
                    return 1 / 2 * t * t * t;
                }
                return 1 / 2 * ((t -= 2) * t * t + 2);
            },
            easeInQuart: function (t) {
                return t * t * t * t;
            },
            easeOutQuart: function (t) {
                return -1 * ((t = t / 1 - 1) * t * t * t - 1);
            },
            easeInOutQuart: function (t) {
                if ((t /= 1 / 2) < 1){
                    return 1 / 2 * t * t * t * t;
                }
                return -1 / 2 * ((t -= 2) * t * t * t - 2);
            },
            easeInQuint: function (t) {
                return 1 * (t /= 1) * t * t * t * t;
            },
            easeOutQuint: function (t) {
                return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
            },
            easeInOutQuint: function (t) {
                if ((t /= 1 / 2) < 1){
                    return 1 / 2 * t * t * t * t * t;
                }
                return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
            },
            easeInSine: function (t) {
                return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
            },
            easeOutSine: function (t) {
                return 1 * Math.sin(t / 1 * (Math.PI / 2));
            },
            easeInOutSine: function (t) {
                return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
            },
            easeInExpo: function (t) {
                return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
            },
            easeOutExpo: function (t) {
                return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
            },
            easeInOutExpo: function (t) {
                if (t === 0){
                    return 0;
                }
                if (t === 1){
                    return 1;
                }
                if ((t /= 1 / 2) < 1){
                    return 1 / 2 * Math.pow(2, 10 * (t - 1));
                }
                return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
            },
            easeInCirc: function (t) {
                if (t >= 1){
                    return t;
                }
                return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
            },
            easeOutCirc: function (t) {
                return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
            },
            easeInOutCirc: function (t) {
                if ((t /= 1 / 2) < 1){
                    return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
                }
                return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
            },
            easeInElastic: function (t) {
                var s = 1.70158;
                var p = 0;
                var a = 1;
                if (t === 0){
                    return 0;
                }
                if ((t /= 1) == 1){
                    return 1;
                }
                if (!p){
                    p = 1 * 0.3;
                }
                if (a < Math.abs(1)) {
                    a = 1;
                    s = p / 4;
                } else{
                    s = p / (2 * Math.PI) * Math.asin(1 / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
            },
            easeOutElastic: function (t) {
                var s = 1.70158;
                var p = 0;
                var a = 1;
                if (t === 0){
                    return 0;
                }
                if ((t /= 1) == 1){
                    return 1;
                }
                if (!p){
                    p = 1 * 0.3;
                }
                if (a < Math.abs(1)) {
                    a = 1;
                    s = p / 4;
                } else{
                    s = p / (2 * Math.PI) * Math.asin(1 / a);
                }
                return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
            },
            easeInOutElastic: function (t) {
                var s = 1.70158;
                var p = 0;
                var a = 1;
                if (t === 0){
                    return 0;
                }
                if ((t /= 1 / 2) == 2){
                    return 1;
                }
                if (!p){
                    p = 1 * (0.3 * 1.5);
                }
                if (a < Math.abs(1)) {
                    a = 1;
                    s = p / 4;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(1 / a);
                }
                if (t < 1){
                    return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));}
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
            },
            easeInBack: function (t) {
                var s = 1.70158;
                return 1 * (t /= 1) * t * ((s + 1) * t - s);
            },
            easeOutBack: function (t) {
                var s = 1.70158;
                return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
            },
            easeInOutBack: function (t) {
                var s = 1.70158;
                if ((t /= 1 / 2) < 1){
                    return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
                }
                return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
            },
            easeInBounce: function (t) {
                return 1 - easingEffects.easeOutBounce(1 - t);
            },
            easeOutBounce: function (t) {
                if ((t /= 1) < (1 / 2.75)) {
                    return 1 * (7.5625 * t * t);
                } else if (t < (2 / 2.75)) {
                    return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
                } else if (t < (2.5 / 2.75)) {
                    return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
                } else {
                    return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
                }
            },
            easeInOutBounce: function (t) {
                if (t < 1 / 2){
                    return easingEffects.easeInBounce(t * 2) * 0.5;
                }
                return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
            }
        },
        //Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        requestAnimFrame = helpers.requestAnimFrame = (function(){
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
        })(),
        cancelAnimFrame = helpers.cancelAnimFrame = (function(){
            return window.cancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                window.oCancelAnimationFrame ||
                window.msCancelAnimationFrame ||
                function(callback) {
                    return window.clearTimeout(callback, 1000 / 60);
                };
        })(),
        animationLoop = helpers.animationLoop = function(callback,totalSteps,easingString,onProgress,onComplete,chartInstance){

            var currentStep = 0,
                easingFunction = easingEffects[easingString] || easingEffects.linear;

            var animationFrame = function(){
                currentStep++;
                var stepDecimal = currentStep/totalSteps;
                var easeDecimal = easingFunction(stepDecimal);

                callback.call(chartInstance,easeDecimal,stepDecimal, currentStep);
                onProgress.call(chartInstance,easeDecimal,stepDecimal);
                if (currentStep < totalSteps){
                    chartInstance.animationFrame = requestAnimFrame(animationFrame);
                } else{
                    onComplete.apply(chartInstance);
                }
            };
            requestAnimFrame(animationFrame);
        },
        //-- DOM methods
        getRelativePosition = helpers.getRelativePosition = function(evt){
            var mouseX, mouseY;
            var e = evt.originalEvent || evt,
                canvas = evt.currentTarget || evt.srcElement,
                boundingRect = canvas.getBoundingClientRect();

            if (e.touches){
                mouseX = e.touches[0].clientX - boundingRect.left;
                mouseY = e.touches[0].clientY - boundingRect.top;

            }
            else{
                mouseX = e.clientX - boundingRect.left;
                mouseY = e.clientY - boundingRect.top;
            }

            return {
                x : mouseX,
                y : mouseY
            };

        },
        addEvent = helpers.addEvent = function(node,eventType,method){
            if (node.addEventListener){
                node.addEventListener(eventType,method);
            } else if (node.attachEvent){
                node.attachEvent("on"+eventType, method);
            } else {
                node["on"+eventType] = method;
            }
        },
        removeEvent = helpers.removeEvent = function(node, eventType, handler){
            if (node.removeEventListener){
                node.removeEventListener(eventType, handler, false);
            } else if (node.detachEvent){
                node.detachEvent("on"+eventType,handler);
            } else{
                node["on" + eventType] = noop;
            }
        },
        bindEvents = helpers.bindEvents = function(chartInstance, arrayOfEvents, handler){
            // Create the events object if it's not already present
            if (!chartInstance.events) chartInstance.events = {};

            each(arrayOfEvents,function(eventName){
                chartInstance.events[eventName] = function(){
                    handler.apply(chartInstance, arguments);
                };
                addEvent(chartInstance.chart.canvas,eventName,chartInstance.events[eventName]);
            });
        },
        unbindEvents = helpers.unbindEvents = function (chartInstance, arrayOfEvents) {
            each(arrayOfEvents, function(handler,eventName){
                removeEvent(chartInstance.chart.canvas, eventName, handler);
            });
        },
        getMaximumWidth = helpers.getMaximumWidth = function(domNode){
            var container = domNode.parentNode,
                padding = parseInt(getStyle(container, 'padding-left')) + parseInt(getStyle(container, 'padding-right'));
            // TODO = check cross browser stuff with this.
            return container.clientWidth - padding;
        },
        getMaximumHeight = helpers.getMaximumHeight = function(domNode){
            var container = domNode.parentNode,
                padding = parseInt(getStyle(container, 'padding-bottom')) + parseInt(getStyle(container, 'padding-top'));
            // TODO = check cross browser stuff with this.
            return container.clientHeight - padding;
        },
        getStyle = helpers.getStyle = function (el, property) {
            return el.currentStyle ?
                el.currentStyle[property] :
                document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
        },
        getMaximumSize = helpers.getMaximumSize = helpers.getMaximumWidth, // legacy support
        retinaScale = helpers.retinaScale = function(chart){
            var ctx = chart.ctx,
                width = chart.canvas.width,
                height = chart.canvas.height;

            if (window.devicePixelRatio) {
                ctx.canvas.style.width = width + "px";
                ctx.canvas.style.height = height + "px";
                ctx.canvas.height = height * window.devicePixelRatio;
                ctx.canvas.width = width * window.devicePixelRatio;
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            }
        },
        //-- Canvas methods
        clear = helpers.clear = function(chart){
            chart.ctx.clearRect(0,0,chart.width,chart.height);
        },
        fontString = helpers.fontString = function(pixelSize,fontStyle,fontFamily){
            return fontStyle + " " + pixelSize+"px " + fontFamily;
        },
        longestText = helpers.longestText = function(ctx,font,arrayOfStrings){
            ctx.font = font;
            var longest = 0;
            each(arrayOfStrings,function(string){
                var textWidth = ctx.measureText(string).width;
                longest = (textWidth > longest) ? textWidth : longest;
            });
            return longest;
        },
        drawRoundedRectangle = helpers.drawRoundedRectangle = function(ctx,x,y,width,height,radius){
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        };


    //Store a reference to each instance - allowing us to globally resize chart instances on window resize.
    //Destroy method on the chart will remove the instance of the chart from this reference.
    Chart.instances = {};

    Chart.Type = function(data,options,chart){
        this.options = options;
        this.chart = chart;
        this.id = uid();
        //Add the chart instance to the global namespace
        Chart.instances[this.id] = this;

        // Initialize is always called when a chart type is created
        // By default it is a no op, but it should be extended
        if (options.responsive){
            this.resize();
        }
        this.initialize.call(this,data);
    };

    //Core methods that'll be a part of every chart type
    extend(Chart.Type.prototype,{
        initialize : function(){return this;},
        clear : function(){
            clear(this.chart);
            return this;
        },
        stop : function(){
            // Stops any current animation loop occuring
            Chart.animationService.cancelAnimation(this);
            return this;
        },
        resize : function(callback){
            this.stop();
            var canvas = this.chart.canvas,
                newWidth = getMaximumWidth(this.chart.canvas),
                newHeight = this.options.maintainAspectRatio ? newWidth / this.chart.aspectRatio : getMaximumHeight(this.chart.canvas);

            canvas.width = this.chart.width = newWidth;
            canvas.height = this.chart.height = newHeight;

            retinaScale(this.chart);

            if (typeof callback === "function"){
                callback.apply(this, Array.prototype.slice.call(arguments, 1));
            }
            return this;
        },
        reflow : noop,
        render : function(reflow){
            if (reflow){
                this.reflow();
            }

            if (this.options.animation && !reflow){
                var animation = new Chart.Animation();
                animation.numSteps = this.options.animationSteps;
                animation.easing = this.options.animationEasing;

                // render function
                animation.render = function(chartInstance, animationObject) {
                    var easingFunction = helpers.easingEffects[animationObject.easing];
                    var stepDecimal = animationObject.currentStep / animationObject.numSteps;
                    var easeDecimal = easingFunction(stepDecimal);

                    chartInstance.draw(easeDecimal, stepDecimal, animationObject.currentStep);
                };

                // user events
                animation.onAnimationProgress = this.options.onAnimationProgress;
                animation.onAnimationComplete = this.options.onAnimationComplete;

                Chart.animationService.addAnimation(this, animation);
            }
            else{
                this.draw();
                this.options.onAnimationComplete.call(this);
            }
            return this;
        },
        generateLegend : function(){
            return template(this.options.legendTemplate,this);
        },
        destroy : function(){
            this.clear();
            unbindEvents(this, this.events);
            var canvas = this.chart.canvas;

            // Reset canvas height/width attributes starts a fresh with the canvas context
            canvas.width = this.chart.width;
            canvas.height = this.chart.height;

            // < IE9 doesn't support removeProperty
            if (canvas.style.removeProperty) {
                canvas.style.removeProperty('width');
                canvas.style.removeProperty('height');
            } else {
                canvas.style.removeAttribute('width');
                canvas.style.removeAttribute('height');
            }

            delete Chart.instances[this.id];
        },
        showTooltip : function(ChartElements, forceRedraw){
            // Only redraw the chart if we've actually changed what we're hovering on.
            if (typeof this.activeElements === 'undefined') this.activeElements = [];

            var isChanged = (function(Elements){
                var changed = false;

                if (Elements.length !== this.activeElements.length){
                    changed = true;
                    return changed;
                }

                each(Elements, function(element, index){
                    if (element !== this.activeElements[index]){
                        changed = true;
                    }
                }, this);
                return changed;
            }).call(this, ChartElements);

            if (!isChanged && !forceRedraw){
                return;
            }
            else{
                this.activeElements = ChartElements;
            }
            this.draw();
            if(this.options.customTooltips){
                this.options.customTooltips(false);
            }
            if (ChartElements.length > 0){
                // If we have multiple datasets, show a MultiTooltip for all of the data points at that index
                if (this.datasets && this.datasets.length > 1) {
                    var dataArray,
                        dataIndex;

                    for (var i = this.datasets.length - 1; i >= 0; i--) {
                        dataArray = this.datasets[i].points || this.datasets[i].bars || this.datasets[i].segments;
                        dataIndex = indexOf(dataArray, ChartElements[0]);
                        if (dataIndex !== -1){
                            break;
                        }
                    }
                    var tooltipLabels = [],
                        tooltipColors = [],
                        medianPosition = (function(index) {

                            // Get all the points at that particular index
                            var Elements = [],
                                dataCollection,
                                xPositions = [],
                                yPositions = [],
                                xMax,
                                yMax,
                                xMin,
                                yMin;
                            helpers.each(this.datasets, function(dataset){
                                dataCollection = dataset.points || dataset.bars || dataset.segments;
                                if (dataCollection[dataIndex] && dataCollection[dataIndex].hasValue()){
                                    Elements.push(dataCollection[dataIndex]);
                                }
                            });

                            helpers.each(Elements, function(element) {
                                xPositions.push(element.x);
                                yPositions.push(element.y);


                                //Include any colour information about the element
                                tooltipLabels.push(helpers.template(this.options.multiTooltipTemplate, element));
                                tooltipColors.push({
                                    fill: element._saved.fillColor || element.fillColor,
                                    stroke: element._saved.strokeColor || element.strokeColor
                                });

                            }, this);

                            yMin = min(yPositions);
                            yMax = max(yPositions);

                            xMin = min(xPositions);
                            xMax = max(xPositions);

                            return {
                                x: (xMin > this.chart.width/2) ? xMin : xMax,
                                y: (yMin + yMax)/2
                            };
                        }).call(this, dataIndex);

                    new Chart.MultiTooltip({
                        x: medianPosition.x,
                        y: medianPosition.y,
                        xPadding: this.options.tooltipXPadding,
                        yPadding: this.options.tooltipYPadding,
                        xOffset: this.options.tooltipXOffset,
                        fillColor: this.options.tooltipFillColor,
                        textColor: this.options.tooltipFontColor,
                        fontFamily: this.options.tooltipFontFamily,
                        fontStyle: this.options.tooltipFontStyle,
                        fontSize: this.options.tooltipFontSize,
                        titleTextColor: this.options.tooltipTitleFontColor,
                        titleFontFamily: this.options.tooltipTitleFontFamily,
                        titleFontStyle: this.options.tooltipTitleFontStyle,
                        titleFontSize: this.options.tooltipTitleFontSize,
                        cornerRadius: this.options.tooltipCornerRadius,
                        labels: tooltipLabels,
                        legendColors: tooltipColors,
                        legendColorBackground : this.options.multiTooltipKeyBackground,
                        title: template(this.options.tooltipTitleTemplate,ChartElements[0]),
                        chart: this.chart,
                        ctx: this.chart.ctx,
                        custom: this.options.customTooltips
                    }).draw();

                } else {
                    each(ChartElements, function(Element) {
                        var tooltipPosition = Element.tooltipPosition();
                        new Chart.Tooltip({
                            x: Math.round(tooltipPosition.x),
                            y: Math.round(tooltipPosition.y),
                            xPadding: this.options.tooltipXPadding,
                            yPadding: this.options.tooltipYPadding,
                            fillColor: this.options.tooltipFillColor,
                            textColor: this.options.tooltipFontColor,
                            fontFamily: this.options.tooltipFontFamily,
                            fontStyle: this.options.tooltipFontStyle,
                            fontSize: this.options.tooltipFontSize,
                            caretHeight: this.options.tooltipCaretSize,
                            cornerRadius: this.options.tooltipCornerRadius,
                            text: template(this.options.tooltipTemplate, Element),
                            chart: this.chart,
                            custom: this.options.customTooltips
                        }).draw();
                    }, this);
                }
            }
            return this;
        },
        toBase64Image : function(){
            return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
        }
    });

    Chart.Type.extend = function(extensions){

        var parent = this;

        var ChartType = function(){
            return parent.apply(this,arguments);
        };

        //Copy the prototype object of the this class
        ChartType.prototype = clone(parent.prototype);
        //Now overwrite some of the properties in the base class with the new extensions
        extend(ChartType.prototype, extensions);

        ChartType.extend = Chart.Type.extend;

        if (extensions.name || parent.prototype.name){

            var chartName = extensions.name || parent.prototype.name;
            //Assign any potential default values of the new chart type

            //If none are defined, we'll use a clone of the chart type this is being extended from.
            //I.e. if we extend a line chart, we'll use the defaults from the line chart if our new chart
            //doesn't define some defaults of their own.

            var baseDefaults = (Chart.defaults[parent.prototype.name]) ? clone(Chart.defaults[parent.prototype.name]) : {};

            Chart.defaults[chartName] = extend(baseDefaults,extensions.defaults);

            Chart.types[chartName] = ChartType;

            //Register this new chart type in the Chart prototype
            Chart.prototype[chartName] = function(data,options){
                var config = merge(Chart.defaults.global, Chart.defaults[chartName], options || {});
                return new ChartType(data,config,this);
            };
        } else{
            warn("Name not provided for this chart, so it hasn't been registered");
        }
        return parent;
    };

    Chart.Element = function(configuration){
        extend(this,configuration);
        this.initialize.apply(this,arguments);
        this.save();
    };
    extend(Chart.Element.prototype,{
        initialize : function(){},
        restore : function(props){
            if (!props){
                extend(this,this._saved);
            } else {
                each(props,function(key){
                    this[key] = this._saved[key];
                },this);
            }
            return this;
        },
        save : function(){
            this._saved = clone(this);
            delete this._saved._saved;
            return this;
        },
        update : function(newProps){
            each(newProps,function(value,key){
                this._saved[key] = this[key];
                this[key] = value;
            },this);
            return this;
        },
        transition : function(props,ease){
            each(props,function(value,key){
                this[key] = ((value - this._saved[key]) * ease) + this._saved[key];
            },this);
            return this;
        },
        tooltipPosition : function(){
            return {
                x : this.x,
                y : this.y
            };
        },
        hasValue: function(){
            return isNumber(this.value);
        }
    });

    Chart.Element.extend = inherits;


    Chart.Point = Chart.Element.extend({
        display: true,
        inRange: function(chartX,chartY){
            var hitDetectionRange = this.hitDetectionRadius + this.radius;
            return ((Math.pow(chartX-this.x, 2)+Math.pow(chartY-this.y, 2)) < Math.pow(hitDetectionRange,2));
        },
        draw : function(){
            if (this.display){
                var ctx = this.ctx;
                ctx.beginPath();

                ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
                ctx.closePath();

                ctx.strokeStyle = this.strokeColor;
                ctx.lineWidth = this.strokeWidth;

                ctx.fillStyle = this.fillColor;

                ctx.fill();
                ctx.stroke();
            }


            //Quick debug for bezier curve splining
            //Highlights control points and the line between them.
            //Handy for dev - stripped in the min version.

            // ctx.save();
            // ctx.fillStyle = "black";
            // ctx.strokeStyle = "black"
            // ctx.beginPath();
            // ctx.arc(this.controlPoints.inner.x,this.controlPoints.inner.y, 2, 0, Math.PI*2);
            // ctx.fill();

            // ctx.beginPath();
            // ctx.arc(this.controlPoints.outer.x,this.controlPoints.outer.y, 2, 0, Math.PI*2);
            // ctx.fill();

            // ctx.moveTo(this.controlPoints.inner.x,this.controlPoints.inner.y);
            // ctx.lineTo(this.x, this.y);
            // ctx.lineTo(this.controlPoints.outer.x,this.controlPoints.outer.y);
            // ctx.stroke();

            // ctx.restore();



        }
    });

    Chart.Arc = Chart.Element.extend({
        inRange : function(chartX,chartY){

            var pointRelativePosition = helpers.getAngleFromPoint(this, {
                x: chartX,
                y: chartY
            });

            // Normalize all angles to 0 - 2*PI (0 - 360°)
            var pointRelativeAngle = pointRelativePosition.angle % (Math.PI * 2),
                startAngle = (Math.PI * 2 + this.startAngle) % (Math.PI * 2),
                endAngle = (Math.PI * 2 + this.endAngle) % (Math.PI * 2) || 360;

            // Calculate wether the pointRelativeAngle is between the start and the end angle
            var betweenAngles = (endAngle < startAngle) ?
                pointRelativeAngle <= endAngle || pointRelativeAngle >= startAngle:
                pointRelativeAngle >= startAngle && pointRelativeAngle <= endAngle;

            //Check if within the range of the open/close angle
            var withinRadius = (pointRelativePosition.distance >= this.innerRadius && pointRelativePosition.distance <= this.outerRadius);

            return (betweenAngles && withinRadius);
            //Ensure within the outside of the arc centre, but inside arc outer
        },
        tooltipPosition : function(){
            var centreAngle = this.startAngle + ((this.endAngle - this.startAngle) / 2),
                rangeFromCentre = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
            return {
                x : this.x + (Math.cos(centreAngle) * rangeFromCentre),
                y : this.y + (Math.sin(centreAngle) * rangeFromCentre)
            };
        },
        draw : function(animationPercent){

            var easingDecimal = animationPercent || 1;

            var ctx = this.ctx;

            ctx.beginPath();

            ctx.arc(this.x, this.y, this.outerRadius < 0 ? 0 : this.outerRadius, this.startAngle, this.endAngle);

            ctx.arc(this.x, this.y, this.innerRadius < 0 ? 0 : this.innerRadius, this.endAngle, this.startAngle, true);

            ctx.closePath();
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeWidth;

            ctx.fillStyle = this.fillColor;

            ctx.fill();
            ctx.lineJoin = 'bevel';

            if (this.showStroke){
                ctx.stroke();
            }
        }
    });

    Chart.Rectangle = Chart.Element.extend({
        draw : function(){
            var ctx = this.ctx,
                halfWidth = this.width/2,
                leftX = this.x - halfWidth,
                rightX = this.x + halfWidth,
                top = this.base - (this.base - this.y),
                halfStroke = this.strokeWidth / 2;

            // Canvas doesn't allow us to stroke inside the width so we can
            // adjust the sizes to fit if we're setting a stroke on the line
            if (this.showStroke){
                leftX += halfStroke;
                rightX -= halfStroke;
                top += halfStroke;
            }

            ctx.beginPath();

            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeWidth;

            // It'd be nice to keep this class totally generic to any rectangle
            // and simply specify which border to miss out.
            ctx.moveTo(leftX, this.base);
            ctx.lineTo(leftX, top);
            ctx.lineTo(rightX, top);
            ctx.lineTo(rightX, this.base);
            ctx.fill();
            if (this.showStroke){
                ctx.stroke();
            }
        },
        height : function(){
            return this.base - this.y;
        },
        inRange : function(chartX,chartY){
            return (chartX >= this.x - this.width/2 && chartX <= this.x + this.width/2) && (chartY >= this.y && chartY <= this.base);
        }
    });

    Chart.Animation = Chart.Element.extend({
        currentStep: null, // the current animation step
        numSteps: 60, // default number of steps
        easing: "", // the easing to use for this animation
        render: null, // render function used by the animation service

        onAnimationProgress: null, // user specified callback to fire on each step of the animation
        onAnimationComplete: null, // user specified callback to fire when the animation finishes
    });

    Chart.Tooltip = Chart.Element.extend({
        draw : function(){

            var ctx = this.chart.ctx;

            ctx.font = fontString(this.fontSize,this.fontStyle,this.fontFamily);

            this.xAlign = "center";
            this.yAlign = "above";

            //Distance between the actual element.y position and the start of the tooltip caret
            var caretPadding = this.caretPadding = 2;

            var tooltipWidth = ctx.measureText(this.text).width + 2*this.xPadding,
                tooltipRectHeight = this.fontSize + 2*this.yPadding,
                tooltipHeight = tooltipRectHeight + this.caretHeight + caretPadding;

            if (this.x + tooltipWidth/2 >this.chart.width){
                this.xAlign = "left";
            } else if (this.x - tooltipWidth/2 < 0){
                this.xAlign = "right";
            }

            if (this.y - tooltipHeight < 0){
                this.yAlign = "below";
            }


            var tooltipX = this.x - tooltipWidth/2,
                tooltipY = this.y - tooltipHeight;

            ctx.fillStyle = this.fillColor;

            // Custom Tooltips
            if(this.custom){
                this.custom(this);
            }
            else{
                switch(this.yAlign)
                {
                case "above":
                    //Draw a caret above the x/y
                    ctx.beginPath();
                    ctx.moveTo(this.x,this.y - caretPadding);
                    ctx.lineTo(this.x + this.caretHeight, this.y - (caretPadding + this.caretHeight));
                    ctx.lineTo(this.x - this.caretHeight, this.y - (caretPadding + this.caretHeight));
                    ctx.closePath();
                    ctx.fill();
                    break;
                case "below":
                    tooltipY = this.y + caretPadding + this.caretHeight;
                    //Draw a caret below the x/y
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y + caretPadding);
                    ctx.lineTo(this.x + this.caretHeight, this.y + caretPadding + this.caretHeight);
                    ctx.lineTo(this.x - this.caretHeight, this.y + caretPadding + this.caretHeight);
                    ctx.closePath();
                    ctx.fill();
                    break;
                }

                switch(this.xAlign)
                {
                case "left":
                    tooltipX = this.x - tooltipWidth + (this.cornerRadius + this.caretHeight);
                    break;
                case "right":
                    tooltipX = this.x - (this.cornerRadius + this.caretHeight);
                    break;
                }

                drawRoundedRectangle(ctx,tooltipX,tooltipY,tooltipWidth,tooltipRectHeight,this.cornerRadius);

                ctx.fill();

                ctx.fillStyle = this.textColor;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(this.text, tooltipX + tooltipWidth/2, tooltipY + tooltipRectHeight/2);
            }
        }
    });

    Chart.MultiTooltip = Chart.Element.extend({
        initialize : function(){
            this.font = fontString(this.fontSize,this.fontStyle,this.fontFamily);

            this.titleFont = fontString(this.titleFontSize,this.titleFontStyle,this.titleFontFamily);

            this.titleHeight = this.title ? this.titleFontSize * 1.5 : 0;
            this.height = (this.labels.length * this.fontSize) + ((this.labels.length-1) * (this.fontSize/2)) + (this.yPadding*2) + this.titleHeight;

            this.ctx.font = this.titleFont;

            var titleWidth = this.ctx.measureText(this.title).width,
                //Label has a legend square as well so account for this.
                labelWidth = longestText(this.ctx,this.font,this.labels) + this.fontSize + 3,
                longestTextWidth = max([labelWidth,titleWidth]);

            this.width = longestTextWidth + (this.xPadding*2);


            var halfHeight = this.height/2;

            //Check to ensure the height will fit on the canvas
            if (this.y - halfHeight < 0 ){
                this.y = halfHeight;
            } else if (this.y + halfHeight > this.chart.height){
                this.y = this.chart.height - halfHeight;
            }

            //Decide whether to align left or right based on position on canvas
            if (this.x > this.chart.width/2){
                this.x -= this.xOffset + this.width;
            } else {
                this.x += this.xOffset;
            }


        },
        getLineHeight : function(index){
            var baseLineHeight = this.y - (this.height/2) + this.yPadding,
                afterTitleIndex = index-1;

            //If the index is zero, we're getting the title
            if (index === 0){
                return baseLineHeight + this.titleHeight / 3;
            } else{
                return baseLineHeight + ((this.fontSize * 1.5 * afterTitleIndex) + this.fontSize / 2) + this.titleHeight;
            }

        },
        draw : function(){
            // Custom Tooltips
            if(this.custom){
                this.custom(this);
            }
            else{
                drawRoundedRectangle(this.ctx,this.x,this.y - this.height/2,this.width,this.height,this.cornerRadius);
                var ctx = this.ctx;
                ctx.fillStyle = this.fillColor;
                ctx.fill();
                ctx.closePath();

                ctx.textAlign = "left";
                ctx.textBaseline = "middle";
                ctx.fillStyle = this.titleTextColor;
                ctx.font = this.titleFont;

                ctx.fillText(this.title,this.x + this.xPadding, this.getLineHeight(0));

                ctx.font = this.font;
                helpers.each(this.labels,function(label,index){
                    ctx.fillStyle = this.textColor;
                    ctx.fillText(label,this.x + this.xPadding + this.fontSize + 3, this.getLineHeight(index + 1));

                    //A bit gnarly, but clearing this rectangle breaks when using explorercanvas (clears whole canvas)
                    //ctx.clearRect(this.x + this.xPadding, this.getLineHeight(index + 1) - this.fontSize/2, this.fontSize, this.fontSize);
                    //Instead we'll make a white filled block to put the legendColour palette over.

                    ctx.fillStyle = this.legendColorBackground;
                    ctx.fillRect(this.x + this.xPadding, this.getLineHeight(index + 1) - this.fontSize/2, this.fontSize, this.fontSize);

                    ctx.fillStyle = this.legendColors[index].fill;
                    ctx.fillRect(this.x + this.xPadding, this.getLineHeight(index + 1) - this.fontSize/2, this.fontSize, this.fontSize);


                },this);
            }
        }
    });

    Chart.Scale = Chart.Element.extend({
        initialize : function(){
            this.fit();
        },
        buildYLabels : function(){
            this.yLabels = [];

            var stepDecimalPlaces = getDecimalPlaces(this.stepValue);

            for (var i=0; i<=this.steps; i++){
                this.yLabels.push(template(this.templateString,{value:(this.min + (i * this.stepValue)).toFixed(stepDecimalPlaces)}));
            }
            this.yLabelWidth = (this.display && this.showLabels) ? longestText(this.ctx,this.font,this.yLabels) + 10 : 0;
        },
        addXLabel : function(label){
            this.xLabels.push(label);
            this.valuesCount++;
            this.fit();
        },
        removeXLabel : function(){
            this.xLabels.shift();
            this.valuesCount--;
            this.fit();
        },
        // Fitting loop to rotate x Labels and figure out what fits there, and also calculate how many Y steps to use
        fit: function(){
            // First we need the width of the yLabels, assuming the xLabels aren't rotated

            // To do that we need the base line at the top and base of the chart, assuming there is no x label rotation
            this.startPoint = (this.display) ? this.fontSize : 0;
            this.endPoint = (this.display) ? this.height - (this.fontSize * 1.5) - 5 : this.height; // -5 to pad labels

            // Apply padding settings to the start and end point.
            this.startPoint += this.padding;
            this.endPoint -= this.padding;

            // Cache the starting endpoint, excluding the space for x labels
            var cachedEndPoint = this.endPoint;

            // Cache the starting height, so can determine if we need to recalculate the scale yAxis
            var cachedHeight = this.endPoint - this.startPoint,
                cachedYLabelWidth;

            // Build the current yLabels so we have an idea of what size they'll be to start
            /*
             *  This sets what is returned from calculateScaleRange as static properties of this class:
             *
                this.steps;
                this.stepValue;
                this.min;
                this.max;
             *
             */
            this.calculateYRange(cachedHeight);

            // With these properties set we can now build the array of yLabels
            // and also the width of the largest yLabel
            this.buildYLabels();

            this.calculateXLabelRotation();

            while((cachedHeight > this.endPoint - this.startPoint)){
                cachedHeight = this.endPoint - this.startPoint;
                cachedYLabelWidth = this.yLabelWidth;

                this.calculateYRange(cachedHeight);
                this.buildYLabels();

                // Only go through the xLabel loop again if the yLabel width has changed
                if (cachedYLabelWidth < this.yLabelWidth){
                    this.endPoint = cachedEndPoint;
                    this.calculateXLabelRotation();
                }
            }

        },
        calculateXLabelRotation : function(){
            //Get the width of each grid by calculating the difference
            //between x offsets between 0 and 1.

            this.ctx.font = this.font;

            var firstWidth = this.ctx.measureText(this.xLabels[0]).width,
                lastWidth = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width,
                firstRotated,
                lastRotated;


            this.xScalePaddingRight = lastWidth/2 + 3;
            this.xScalePaddingLeft = (firstWidth/2 > this.yLabelWidth) ? firstWidth/2 : this.yLabelWidth;

            this.xLabelRotation = 0;
            if (this.display){
                var originalLabelWidth = longestText(this.ctx,this.font,this.xLabels),
                    cosRotation,
                    firstRotatedWidth;
                this.xLabelWidth = originalLabelWidth;
                //Allow 3 pixels x2 padding either side for label readability
                var xGridWidth = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6;

                //Max label rotate should be 90 - also act as a loop counter
                while ((this.xLabelWidth > xGridWidth && this.xLabelRotation === 0) || (this.xLabelWidth > xGridWidth && this.xLabelRotation <= 90 && this.xLabelRotation > 0)){
                    cosRotation = Math.cos(toRadians(this.xLabelRotation));

                    firstRotated = cosRotation * firstWidth;
                    lastRotated = cosRotation * lastWidth;

                    // We're right aligning the text now.
                    if (firstRotated + this.fontSize / 2 > this.yLabelWidth){
                        this.xScalePaddingLeft = firstRotated + this.fontSize / 2;
                    }
                    this.xScalePaddingRight = this.fontSize/2;


                    this.xLabelRotation++;
                    this.xLabelWidth = cosRotation * originalLabelWidth;

                }
                if (this.xLabelRotation > 0){
                    this.endPoint -= Math.sin(toRadians(this.xLabelRotation))*originalLabelWidth + 3;
                }
            }
            else{
                this.xLabelWidth = 0;
                this.xScalePaddingRight = this.padding;
                this.xScalePaddingLeft = this.padding;
            }

        },
        // Needs to be overidden in each Chart type
        // Otherwise we need to pass all the data into the scale class
        calculateYRange: noop,
        drawingArea: function(){
            return this.startPoint - this.endPoint;
        },
        calculateY : function(value){
            var scalingFactor = this.drawingArea() / (this.min - this.max);
            return this.endPoint - (scalingFactor * (value - this.min));
        },
        calculateX : function(index){
            var isRotated = (this.xLabelRotation > 0),
                // innerWidth = (this.offsetGridLines) ? this.width - offsetLeft - this.padding : this.width - (offsetLeft + halfLabelWidth * 2) - this.padding,
                innerWidth = this.width - (this.xScalePaddingLeft + this.xScalePaddingRight),
                valueWidth = innerWidth/Math.max((this.valuesCount - ((this.offsetGridLines) ? 0 : 1)), 1),
                valueOffset = (valueWidth * index) + this.xScalePaddingLeft;

            if (this.offsetGridLines){
                valueOffset += (valueWidth/2);
            }

            return Math.round(valueOffset);
        },
        update : function(newProps){
            helpers.extend(this, newProps);
            this.fit();
        },
        draw : function(){
            var ctx = this.ctx,
                yLabelGap = (this.endPoint - this.startPoint) / this.steps,
                xStart = Math.round(this.xScalePaddingLeft);
            if (this.display){
                ctx.fillStyle = this.textColor;
                ctx.font = this.font;
                each(this.yLabels,function(labelString,index){
                    var yLabelCenter = this.endPoint - (yLabelGap * index),
                        linePositionY = Math.round(yLabelCenter),
                        drawHorizontalLine = this.showHorizontalLines;

                    ctx.textAlign = "right";
                    ctx.textBaseline = "middle";
                    if (this.showLabels){
                        ctx.fillText(labelString,xStart - 10,yLabelCenter);
                    }

                    // This is X axis, so draw it
                    if (index === 0 && !drawHorizontalLine){
                        drawHorizontalLine = true;
                    }

                    if (drawHorizontalLine){
                        ctx.beginPath();
                    }

                    if (index > 0){
                        // This is a grid line in the centre, so drop that
                        ctx.lineWidth = this.gridLineWidth;
                        ctx.strokeStyle = this.gridLineColor;
                    } else {
                        // This is the first line on the scale
                        ctx.lineWidth = this.lineWidth;
                        ctx.strokeStyle = this.lineColor;
                    }

                    linePositionY += helpers.aliasPixel(ctx.lineWidth);

                    if(drawHorizontalLine){
                        ctx.moveTo(xStart, linePositionY);
                        ctx.lineTo(this.width, linePositionY);
                        ctx.stroke();
                        ctx.closePath();
                    }

                    ctx.lineWidth = this.lineWidth;
                    ctx.strokeStyle = this.lineColor;
                    ctx.beginPath();
                    ctx.moveTo(xStart - 5, linePositionY);
                    ctx.lineTo(xStart, linePositionY);
                    ctx.stroke();
                    ctx.closePath();

                },this);

                each(this.xLabels,function(label,index){
                    var xPos = this.calculateX(index) + aliasPixel(this.lineWidth),
                        // Check to see if line/bar here and decide where to place the line
                        linePos = this.calculateX(index - (this.offsetGridLines ? 0.5 : 0)) + aliasPixel(this.lineWidth),
                        isRotated = (this.xLabelRotation > 0),
                        drawVerticalLine = this.showVerticalLines;

                    // This is Y axis, so draw it
                    if (index === 0 && !drawVerticalLine){
                        drawVerticalLine = true;
                    }

                    if (drawVerticalLine){
                        ctx.beginPath();
                    }

                    if (index > 0){
                        // This is a grid line in the centre, so drop that
                        ctx.lineWidth = this.gridLineWidth;
                        ctx.strokeStyle = this.gridLineColor;
                    } else {
                        // This is the first line on the scale
                        ctx.lineWidth = this.lineWidth;
                        ctx.strokeStyle = this.lineColor;
                    }

                    if (drawVerticalLine){
                        ctx.moveTo(linePos,this.endPoint);
                        ctx.lineTo(linePos,this.startPoint - 3);
                        ctx.stroke();
                        ctx.closePath();
                    }


                    ctx.lineWidth = this.lineWidth;
                    ctx.strokeStyle = this.lineColor;


                    // Small lines at the bottom of the base grid line
                    ctx.beginPath();
                    ctx.moveTo(linePos,this.endPoint);
                    ctx.lineTo(linePos,this.endPoint + 5);
                    ctx.stroke();
                    ctx.closePath();

                    ctx.save();
                    ctx.translate(xPos,(isRotated) ? this.endPoint + 12 : this.endPoint + 8);
                    ctx.rotate(toRadians(this.xLabelRotation)*-1);
                    ctx.font = this.font;
                    ctx.textAlign = (isRotated) ? "right" : "center";
                    ctx.textBaseline = (isRotated) ? "middle" : "top";
                    ctx.fillText(label, 0, 0);
                    ctx.restore();
                },this);

            }
        }

    });

    Chart.RadialScale = Chart.Element.extend({
        initialize: function(){
            this.size = min([this.height, this.width]);
            this.drawingArea = (this.display) ? (this.size/2) - (this.fontSize/2 + this.backdropPaddingY) : (this.size/2);
        },
        calculateCenterOffset: function(value){
            // Take into account half font size + the yPadding of the top value
            var scalingFactor = this.drawingArea / (this.max - this.min);

            return (value - this.min) * scalingFactor;
        },
        update : function(){
            if (!this.lineArc){
                this.setScaleSize();
            } else {
                this.drawingArea = (this.display) ? (this.size/2) - (this.fontSize/2 + this.backdropPaddingY) : (this.size/2);
            }
            this.buildYLabels();
        },
        buildYLabels: function(){
            this.yLabels = [];

            var stepDecimalPlaces = getDecimalPlaces(this.stepValue);

            for (var i=0; i<=this.steps; i++){
                this.yLabels.push(template(this.templateString,{value:(this.min + (i * this.stepValue)).toFixed(stepDecimalPlaces)}));
            }
        },
        getCircumference : function(){
            return ((Math.PI*2) / this.valuesCount);
        },
        setScaleSize: function(){
            /*
             * Right, this is really confusing and there is a lot of maths going on here
             * The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
             *
             * Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
             *
             * Solution:
             *
             * We assume the radius of the polygon is half the size of the canvas at first
             * at each index we check if the text overlaps.
             *
             * Where it does, we store that angle and that index.
             *
             * After finding the largest index and angle we calculate how much we need to remove
             * from the shape radius to move the point inwards by that x.
             *
             * We average the left and right distances to get the maximum shape radius that can fit in the box
             * along with labels.
             *
             * Once we have that, we can find the centre point for the chart, by taking the x text protrusion
             * on each side, removing that from the size, halving it and adding the left x protrusion width.
             *
             * This will mean we have a shape fitted to the canvas, as large as it can be with the labels
             * and position it in the most space efficient manner
             *
             * https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif
             */


            // Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
            // Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
            var largestPossibleRadius = min([(this.height/2 - this.pointLabelFontSize - 5), this.width/2]),
                pointPosition,
                i,
                textWidth,
                halfTextWidth,
                furthestRight = this.width,
                furthestRightIndex,
                furthestRightAngle,
                furthestLeft = 0,
                furthestLeftIndex,
                furthestLeftAngle,
                xProtrusionLeft,
                xProtrusionRight,
                radiusReductionRight,
                radiusReductionLeft,
                maxWidthRadius;
            this.ctx.font = fontString(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily);
            for (i=0;i<this.valuesCount;i++){
                // 5px to space the text slightly out - similar to what we do in the draw function.
                pointPosition = this.getPointPosition(i, largestPossibleRadius);
                textWidth = this.ctx.measureText(template(this.templateString, { value: this.labels[i] })).width + 5;
                if (i === 0 || i === this.valuesCount/2){
                    // If we're at index zero, or exactly the middle, we're at exactly the top/bottom
                    // of the radar chart, so text will be aligned centrally, so we'll half it and compare
                    // w/left and right text sizes
                    halfTextWidth = textWidth/2;
                    if (pointPosition.x + halfTextWidth > furthestRight) {
                        furthestRight = pointPosition.x + halfTextWidth;
                        furthestRightIndex = i;
                    }
                    if (pointPosition.x - halfTextWidth < furthestLeft) {
                        furthestLeft = pointPosition.x - halfTextWidth;
                        furthestLeftIndex = i;
                    }
                }
                else if (i < this.valuesCount/2) {
                    // Less than half the values means we'll left align the text
                    if (pointPosition.x + textWidth > furthestRight) {
                        furthestRight = pointPosition.x + textWidth;
                        furthestRightIndex = i;
                    }
                }
                else if (i > this.valuesCount/2){
                    // More than half the values means we'll right align the text
                    if (pointPosition.x - textWidth < furthestLeft) {
                        furthestLeft = pointPosition.x - textWidth;
                        furthestLeftIndex = i;
                    }
                }
            }

            xProtrusionLeft = furthestLeft;

            xProtrusionRight = Math.ceil(furthestRight - this.width);

            furthestRightAngle = this.getIndexAngle(furthestRightIndex);

            furthestLeftAngle = this.getIndexAngle(furthestLeftIndex);

            radiusReductionRight = xProtrusionRight / Math.sin(furthestRightAngle + Math.PI/2);

            radiusReductionLeft = xProtrusionLeft / Math.sin(furthestLeftAngle + Math.PI/2);

            // Ensure we actually need to reduce the size of the chart
            radiusReductionRight = (isNumber(radiusReductionRight)) ? radiusReductionRight : 0;
            radiusReductionLeft = (isNumber(radiusReductionLeft)) ? radiusReductionLeft : 0;

            this.drawingArea = largestPossibleRadius - (radiusReductionLeft + radiusReductionRight)/2;

            //this.drawingArea = min([maxWidthRadius, (this.height - (2 * (this.pointLabelFontSize + 5)))/2])
            this.setCenterPoint(radiusReductionLeft, radiusReductionRight);

        },
        setCenterPoint: function(leftMovement, rightMovement){

            var maxRight = this.width - rightMovement - this.drawingArea,
                maxLeft = leftMovement + this.drawingArea;

            this.xCenter = (maxLeft + maxRight)/2;
            // Always vertically in the centre as the text height doesn't change
            this.yCenter = (this.height/2);
        },

        getIndexAngle : function(index){
            var angleMultiplier = (Math.PI * 2) / this.valuesCount;
            // Start from the top instead of right, so remove a quarter of the circle

            return index * angleMultiplier - (Math.PI/2);
        },
        getPointPosition : function(index, distanceFromCenter){
            var thisAngle = this.getIndexAngle(index);
            return {
                x : (Math.cos(thisAngle) * distanceFromCenter) + this.xCenter,
                y : (Math.sin(thisAngle) * distanceFromCenter) + this.yCenter
            };
        },
        draw: function(){
            if (this.display){
                var ctx = this.ctx;
                each(this.yLabels, function(label, index){
                    // Don't draw a centre value
                    if (index > 0){
                        var yCenterOffset = index * (this.drawingArea/this.steps),
                            yHeight = this.yCenter - yCenterOffset,
                            pointPosition;

                        // Draw circular lines around the scale
                        if (this.lineWidth > 0){
                            ctx.strokeStyle = this.lineColor;
                            ctx.lineWidth = this.lineWidth;

                            if(this.lineArc){
                                ctx.beginPath();
                                ctx.arc(this.xCenter, this.yCenter, yCenterOffset, 0, Math.PI*2);
                                ctx.closePath();
                                ctx.stroke();
                            } else{
                                ctx.beginPath();
                                for (var i=0;i<this.valuesCount;i++)
                                {
                                    pointPosition = this.getPointPosition(i, this.calculateCenterOffset(this.min + (index * this.stepValue)));
                                    if (i === 0){
                                        ctx.moveTo(pointPosition.x, pointPosition.y);
                                    } else {
                                        ctx.lineTo(pointPosition.x, pointPosition.y);
                                    }
                                }
                                ctx.closePath();
                                ctx.stroke();
                            }
                        }
                        if(this.showLabels){
                            ctx.font = fontString(this.fontSize,this.fontStyle,this.fontFamily);
                            if (this.showLabelBackdrop){
                                var labelWidth = ctx.measureText(label).width;
                                ctx.fillStyle = this.backdropColor;
                                ctx.fillRect(
                                    this.xCenter - labelWidth/2 - this.backdropPaddingX,
                                    yHeight - this.fontSize/2 - this.backdropPaddingY,
                                    labelWidth + this.backdropPaddingX*2,
                                    this.fontSize + this.backdropPaddingY*2
                                );
                            }
                            ctx.textAlign = 'center';
                            ctx.textBaseline = "middle";
                            ctx.fillStyle = this.fontColor;
                            ctx.fillText(label, this.xCenter, yHeight);
                        }
                    }
                }, this);

                if (!this.lineArc){
                    ctx.lineWidth = this.angleLineWidth;
                    ctx.strokeStyle = this.angleLineColor;
                    for (var i = this.valuesCount - 1; i >= 0; i--) {
                        var centerOffset = null, outerPosition = null;

                        if (this.angleLineWidth > 0){
                            centerOffset = this.calculateCenterOffset(this.max);
                            outerPosition = this.getPointPosition(i, centerOffset);
                            ctx.beginPath();
                            ctx.moveTo(this.xCenter, this.yCenter);
                            ctx.lineTo(outerPosition.x, outerPosition.y);
                            ctx.stroke();
                            ctx.closePath();
                        }

                        if (this.backgroundColors && this.backgroundColors.length == this.valuesCount) {
                            if (centerOffset == null)
                                centerOffset = this.calculateCenterOffset(this.max);

                            if (outerPosition == null)
                                outerPosition = this.getPointPosition(i, centerOffset);

                            var previousOuterPosition = this.getPointPosition(i === 0 ? this.valuesCount - 1 : i - 1, centerOffset);
                            var nextOuterPosition = this.getPointPosition(i === this.valuesCount - 1 ? 0 : i + 1, centerOffset);

                            var previousOuterHalfway = { x: (previousOuterPosition.x + outerPosition.x) / 2, y: (previousOuterPosition.y + outerPosition.y) / 2 };
                            var nextOuterHalfway = { x: (outerPosition.x + nextOuterPosition.x) / 2, y: (outerPosition.y + nextOuterPosition.y) / 2 };

                            ctx.beginPath();
                            ctx.moveTo(this.xCenter, this.yCenter);
                            ctx.lineTo(previousOuterHalfway.x, previousOuterHalfway.y);
                            ctx.lineTo(outerPosition.x, outerPosition.y);
                            ctx.lineTo(nextOuterHalfway.x, nextOuterHalfway.y);
                            ctx.fillStyle = this.backgroundColors[i];
                            ctx.fill();
                            ctx.closePath();
                        }
                        // Extra 3px out for some label spacing
                        var pointLabelPosition = this.getPointPosition(i, this.calculateCenterOffset(this.max) + 5);
                        ctx.font = fontString(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily);
                        ctx.fillStyle = this.pointLabelFontColor;

                        var labelsCount = this.labels.length,
                            halfLabelsCount = this.labels.length/2,
                            quarterLabelsCount = halfLabelsCount/2,
                            upperHalf = (i < quarterLabelsCount || i > labelsCount - quarterLabelsCount),
                            exactQuarter = (i === quarterLabelsCount || i === labelsCount - quarterLabelsCount);
                        if (i === 0){
                            ctx.textAlign = 'center';
                        } else if(i === halfLabelsCount){
                            ctx.textAlign = 'center';
                        } else if (i < halfLabelsCount){
                            ctx.textAlign = 'left';
                        } else {
                            ctx.textAlign = 'right';
                        }

                        // Set the correct text baseline based on outer positioning
                        if (exactQuarter){
                            ctx.textBaseline = 'middle';
                        } else if (upperHalf){
                            ctx.textBaseline = 'bottom';
                        } else {
                            ctx.textBaseline = 'top';
                        }

                        ctx.fillText(this.labels[i], pointLabelPosition.x, pointLabelPosition.y);
                    }
                }
            }
        }
    });

    Chart.animationService = {
        frameDuration: 17,
        animations: [],
        dropFrames: 0,
        addAnimation: function(chartInstance, animationObject) {
            for (var index = 0; index < this.animations.length; ++ index){
                if (this.animations[index].chartInstance === chartInstance){
                    // replacing an in progress animation
                    this.animations[index].animationObject = animationObject;
                    return;
                }
            }

            this.animations.push({
                chartInstance: chartInstance,
                animationObject: animationObject
            });

            // If there are no animations queued, manually kickstart a digest, for lack of a better word
            if (this.animations.length == 1) {
                helpers.requestAnimFrame.call(window, this.digestWrapper);
            }
        },
        // Cancel the animation for a given chart instance
        cancelAnimation: function(chartInstance) {
            var index = helpers.findNextWhere(this.animations, function(animationWrapper) {
                return animationWrapper.chartInstance === chartInstance;
            });

            if (index)
            {
                this.animations.splice(index, 1);
            }
        },
        // calls startDigest with the proper context
        digestWrapper: function() {
            Chart.animationService.startDigest.call(Chart.animationService);
        },
        startDigest: function() {

            var startTime = Date.now();
            var framesToDrop = 0;

            if(this.dropFrames > 1){
                framesToDrop = Math.floor(this.dropFrames);
                this.dropFrames -= framesToDrop;
            }

            for (var i = 0; i < this.animations.length; i++) {

                if (this.animations[i].animationObject.currentStep === null){
                    this.animations[i].animationObject.currentStep = 0;
                }

                this.animations[i].animationObject.currentStep += 1 + framesToDrop;
                if(this.animations[i].animationObject.currentStep > this.animations[i].animationObject.numSteps){
                    this.animations[i].animationObject.currentStep = this.animations[i].animationObject.numSteps;
                }

                this.animations[i].animationObject.render(this.animations[i].chartInstance, this.animations[i].animationObject);

                // Check if executed the last frame.
                if (this.animations[i].animationObject.currentStep == this.animations[i].animationObject.numSteps){
                    // Call onAnimationComplete
                    this.animations[i].animationObject.onAnimationComplete.call(this.animations[i].chartInstance);
                    // Remove the animation.
                    this.animations.splice(i, 1);
                    // Keep the index in place to offset the splice
                    i--;
                }
            }

            var endTime = Date.now();
            var delay = endTime - startTime - this.frameDuration;
            var frameDelay = delay / this.frameDuration;

            if(frameDelay > 1){
                this.dropFrames += frameDelay;
            }

            // Do we have more stuff to animate?
            if (this.animations.length > 0){
                helpers.requestAnimFrame.call(window, this.digestWrapper);
            }
        }
    };

    // Attach global event to resize each chart instance when the browser resizes
    helpers.addEvent(window, "resize", (function(){
        // Basic debounce of resize function so it doesn't hurt performance when resizing browser.
        var timeout;
        return function(){
            clearTimeout(timeout);
            timeout = setTimeout(function(){
                each(Chart.instances,function(instance){
                    // If the responsive flag is set in the chart instance config
                    // Cascade the resize event down to the chart.
                    if (instance.options.responsive){
                        instance.resize(instance.render, true);
                    }
                });
            }, 50);
        };
    })());


    if (amd) {
        define(function(){
            return Chart;
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = Chart;
    }

    root.Chart = Chart;

    Chart.noConflict = function(){
        root.Chart = previous;
        return Chart;
    };

}).call(this);

(function(){
    "use strict";

    var root = this,
        Chart = root.Chart,
        helpers = Chart.helpers;


    var defaultConfig = {
        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero : true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - If there is a stroke on each bar
        barShowStroke : true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth : 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing : 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing : 1,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>"

    };


    Chart.Type.extend({
        name: "Bar",
        defaults : defaultConfig,
        initialize:  function(data){

            //Expose options as a scope variable here so we can access it in the ScaleClass
            var options = this.options;

            this.ScaleClass = Chart.Scale.extend({
                offsetGridLines : true,
                calculateBarX : function(datasetCount, datasetIndex, barIndex){
                    //Reusable method for calculating the xPosition of a given bar based on datasetIndex & width of the bar
                    var xWidth = this.calculateBaseWidth(),
                        xAbsolute = this.calculateX(barIndex) - (xWidth/2),
                        barWidth = this.calculateBarWidth(datasetCount);

                    return xAbsolute + (barWidth * datasetIndex) + (datasetIndex * options.barDatasetSpacing) + barWidth/2;
                },
                calculateBaseWidth : function(){
                    return (this.calculateX(1) - this.calculateX(0)) - (2*options.barValueSpacing);
                },
                calculateBarWidth : function(datasetCount){
                    //The padding between datasets is to the right of each bar, providing that there are more than 1 dataset
                    var baseWidth = this.calculateBaseWidth() - ((datasetCount - 1) * options.barDatasetSpacing);

                    return (baseWidth / datasetCount);
                }
            });

            this.datasets = [];

            //Set up tooltip events on the chart
            if (this.options.showTooltips){
                helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
                    var activeBars = (evt.type !== 'mouseout') ? this.getBarsAtEvent(evt) : [];

                    this.eachBars(function(bar){
                        bar.restore(['fillColor', 'strokeColor']);
                    });
                    helpers.each(activeBars, function(activeBar){
                        activeBar.fillColor = activeBar.highlightFill;
                        activeBar.strokeColor = activeBar.highlightStroke;
                    });
                    this.showTooltip(activeBars);
                });
            }

            //Declare the extension of the default point, to cater for the options passed in to the constructor
            this.BarClass = Chart.Rectangle.extend({
                strokeWidth : this.options.barStrokeWidth,
                showStroke : this.options.barShowStroke,
                ctx : this.chart.ctx
            });

            //Iterate through each of the datasets, and build this into a property of the chart
            helpers.each(data.datasets,function(dataset,datasetIndex){

                var datasetObject = {
                    label : dataset.label || null,
                    fillColor : dataset.fillColor,
                    strokeColor : dataset.strokeColor,
                    bars : []
                };

                this.datasets.push(datasetObject);

                helpers.each(dataset.data,function(dataPoint,index){
                    //Add a new point for each piece of data, passing any required data to draw.
                    datasetObject.bars.push(new this.BarClass({
                        value : dataPoint,
                        label : data.labels[index],
                        datasetLabel: dataset.label,
                        strokeColor : dataset.strokeColor,
                        fillColor : dataset.fillColor,
                        highlightFill : dataset.highlightFill || dataset.fillColor,
                        highlightStroke : dataset.highlightStroke || dataset.strokeColor
                    }));
                },this);

            },this);

            this.buildScale(data.labels);

            this.BarClass.prototype.base = this.scale.endPoint;

            this.eachBars(function(bar, index, datasetIndex){
                helpers.extend(bar, {
                    width : this.scale.calculateBarWidth(this.datasets.length),
                    x: this.scale.calculateBarX(this.datasets.length, datasetIndex, index),
                    y: this.scale.endPoint
                });
                bar.save();
            }, this);

            this.render();
        },
        update : function(){
            this.scale.update();
            // Reset any highlight colours before updating.
            helpers.each(this.activeElements, function(activeElement){
                activeElement.restore(['fillColor', 'strokeColor']);
            });

            this.eachBars(function(bar){
                bar.save();
            });
            this.render();
        },
        eachBars : function(callback){
            helpers.each(this.datasets,function(dataset, datasetIndex){
                helpers.each(dataset.bars, callback, this, datasetIndex);
            },this);
        },
        getBarsAtEvent : function(e){
            var barsArray = [],
                eventPosition = helpers.getRelativePosition(e),
                datasetIterator = function(dataset){
                    barsArray.push(dataset.bars[barIndex]);
                },
                barIndex;

            for (var datasetIndex = 0; datasetIndex < this.datasets.length; datasetIndex++) {
                for (barIndex = 0; barIndex < this.datasets[datasetIndex].bars.length; barIndex++) {
                    if (this.datasets[datasetIndex].bars[barIndex].inRange(eventPosition.x,eventPosition.y)){
                        helpers.each(this.datasets, datasetIterator);
                        return barsArray;
                    }
                }
            }

            return barsArray;
        },
        buildScale : function(labels){
            var self = this;

            var dataTotal = function(){
                var values = [];
                self.eachBars(function(bar){
                    values.push(bar.value);
                });
                return values;
            };

            var scaleOptions = {
                templateString : this.options.scaleLabel,
                height : this.chart.height,
                width : this.chart.width,
                ctx : this.chart.ctx,
                textColor : this.options.scaleFontColor,
                fontSize : this.options.scaleFontSize,
                fontStyle : this.options.scaleFontStyle,
                fontFamily : this.options.scaleFontFamily,
                valuesCount : labels.length,
                beginAtZero : this.options.scaleBeginAtZero,
                integersOnly : this.options.scaleIntegersOnly,
                calculateYRange: function(currentHeight){
                    var updatedRanges = helpers.calculateScaleRange(
                        dataTotal(),
                        currentHeight,
                        this.fontSize,
                        this.beginAtZero,
                        this.integersOnly
                    );
                    helpers.extend(this, updatedRanges);
                },
                xLabels : labels,
                font : helpers.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                lineWidth : this.options.scaleLineWidth,
                lineColor : this.options.scaleLineColor,
                showHorizontalLines : this.options.scaleShowHorizontalLines,
                showVerticalLines : this.options.scaleShowVerticalLines,
                gridLineWidth : (this.options.scaleShowGridLines) ? this.options.scaleGridLineWidth : 0,
                gridLineColor : (this.options.scaleShowGridLines) ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                padding : (this.options.showScale) ? 0 : (this.options.barShowStroke) ? this.options.barStrokeWidth : 0,
                showLabels : this.options.scaleShowLabels,
                display : this.options.showScale
            };

            if (this.options.scaleOverride){
                helpers.extend(scaleOptions, {
                    calculateYRange: helpers.noop,
                    steps: this.options.scaleSteps,
                    stepValue: this.options.scaleStepWidth,
                    min: this.options.scaleStartValue,
                    max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
                });
            }

            this.scale = new this.ScaleClass(scaleOptions);
        },
        addData : function(valuesArray,label){
            //Map the values array for each of the datasets
            helpers.each(valuesArray,function(value,datasetIndex){
                //Add a new point for each piece of data, passing any required data to draw.
                this.datasets[datasetIndex].bars.push(new this.BarClass({
                    value : value,
                    label : label,
                    datasetLabel: this.datasets[datasetIndex].label,
                    x: this.scale.calculateBarX(this.datasets.length, datasetIndex, this.scale.valuesCount+1),
                    y: this.scale.endPoint,
                    width : this.scale.calculateBarWidth(this.datasets.length),
                    base : this.scale.endPoint,
                    strokeColor : this.datasets[datasetIndex].strokeColor,
                    fillColor : this.datasets[datasetIndex].fillColor
                }));
            },this);

            this.scale.addXLabel(label);
            //Then re-render the chart.
            this.update();
        },
        removeData : function(){
            this.scale.removeXLabel();
            //Then re-render the chart.
            helpers.each(this.datasets,function(dataset){
                dataset.bars.shift();
            },this);
            this.update();
        },
        reflow : function(){
            helpers.extend(this.BarClass.prototype,{
                y: this.scale.endPoint,
                base : this.scale.endPoint
            });
            var newScaleProps = helpers.extend({
                height : this.chart.height,
                width : this.chart.width
            });
            this.scale.update(newScaleProps);
        },
        draw : function(ease){
            var easingDecimal = ease || 1;
            this.clear();

            var ctx = this.chart.ctx;

            this.scale.draw(easingDecimal);

            //Draw all the bars for each dataset
            helpers.each(this.datasets,function(dataset,datasetIndex){
                helpers.each(dataset.bars,function(bar,index){
                    if (bar.hasValue()){
                        bar.base = this.scale.endPoint;
                        //Transition then draw
                        bar.transition({
                            x : this.scale.calculateBarX(this.datasets.length, datasetIndex, index),
                            y : this.scale.calculateY(bar.value),
                            width : this.scale.calculateBarWidth(this.datasets.length)
                        }, easingDecimal).draw();
                    }
                },this);

            },this);
        }
    });


}).call(this);

(function(){
    "use strict";

    var root = this,
        Chart = root.Chart,
        //Cache a local reference to Chart.helpers
        helpers = Chart.helpers;

    var defaultConfig = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,

        //String - The colour of each segment stroke
        segmentStrokeColor : "#fff",

        //Number - The width of each segment stroke
        segmentStrokeWidth : 2,

        //The percentage of the chart that we cut out of the middle.
        percentageInnerCutout : 50,

        //Number - Amount of animation steps
        animationSteps : 100,

        //String - Animation easing effect
        animationEasing : "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : false,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>"

    };

    Chart.Type.extend({
        //Passing in a name registers this chart in the Chart namespace
        name: "Doughnut",
        //Providing a defaults will also register the deafults in the chart namespace
        defaults : defaultConfig,
        //Initialize is fired when the chart is initialized - Data is passed in as a parameter
        //Config is automatically merged by the core of Chart.js, and is available at this.options
        initialize:  function(data){

            //Declare segments as a static property to prevent inheriting across the Chart type prototype
            this.segments = [];
            this.outerRadius = (helpers.min([this.chart.width,this.chart.height]) - this.options.segmentStrokeWidth/2)/2;

            this.SegmentArc = Chart.Arc.extend({
                ctx : this.chart.ctx,
                x : this.chart.width/2,
                y : this.chart.height/2
            });

            //Set up tooltip events on the chart
            if (this.options.showTooltips){
                helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
                    var activeSegments = (evt.type !== 'mouseout') ? this.getSegmentsAtEvent(evt) : [];

                    helpers.each(this.segments,function(segment){
                        segment.restore(["fillColor"]);
                    });
                    helpers.each(activeSegments,function(activeSegment){
                        activeSegment.fillColor = activeSegment.highlightColor;
                    });
                    this.showTooltip(activeSegments);
                });
            }
            this.calculateTotal(data);

            helpers.each(data,function(datapoint, index){
                if (!datapoint.color) {
                    datapoint.color = 'hsl(' + (360 * index / data.length) + ', 100%, 50%)';
                }
                this.addData(datapoint, index, true);
            },this);

            this.render();
        },
        getSegmentsAtEvent : function(e){
            var segmentsArray = [];

            var location = helpers.getRelativePosition(e);

            helpers.each(this.segments,function(segment){
                if (segment.inRange(location.x,location.y)) segmentsArray.push(segment);
            },this);
            return segmentsArray;
        },
        addData : function(segment, atIndex, silent){
            var index = atIndex !== undefined ? atIndex : this.segments.length;
            if ( typeof(segment.color) === "undefined" ) {
                segment.color = Chart.defaults.global.segmentColorDefault[index % Chart.defaults.global.segmentColorDefault.length];
                segment.highlight = Chart.defaults.global.segmentHighlightColorDefaults[index % Chart.defaults.global.segmentHighlightColorDefaults.length];
            }
            this.segments.splice(index, 0, new this.SegmentArc({
                value : segment.value,
                outerRadius : (this.options.animateScale) ? 0 : this.outerRadius,
                innerRadius : (this.options.animateScale) ? 0 : (this.outerRadius/100) * this.options.percentageInnerCutout,
                fillColor : segment.color,
                highlightColor : segment.highlight || segment.color,
                showStroke : this.options.segmentShowStroke,
                strokeWidth : this.options.segmentStrokeWidth,
                strokeColor : this.options.segmentStrokeColor,
                startAngle : Math.PI * 1.5,
                circumference : (this.options.animateRotate) ? 0 : this.calculateCircumference(segment.value),
                label : segment.label
            }));
            if (!silent){
                this.reflow();
                this.update();
            }
        },
        calculateCircumference : function(value) {
            if ( this.total > 0 ) {
                return (Math.PI*2)*(value / this.total);
            } else {
                return 0;
            }
        },
        calculateTotal : function(data){
            this.total = 0;
            helpers.each(data,function(segment){
                this.total += Math.abs(segment.value);
            },this);
        },
        update : function(){
            this.calculateTotal(this.segments);

            // Reset any highlight colours before updating.
            helpers.each(this.activeElements, function(activeElement){
                activeElement.restore(['fillColor']);
            });

            helpers.each(this.segments,function(segment){
                segment.save();
            });
            this.render();
        },

        removeData: function(atIndex){
            var indexToDelete = (helpers.isNumber(atIndex)) ? atIndex : this.segments.length-1;
            this.segments.splice(indexToDelete, 1);
            this.reflow();
            this.update();
        },

        reflow : function(){
            helpers.extend(this.SegmentArc.prototype,{
                x : this.chart.width/2,
                y : this.chart.height/2
            });
            this.outerRadius = (helpers.min([this.chart.width,this.chart.height]) - this.options.segmentStrokeWidth/2)/2;
            helpers.each(this.segments, function(segment){
                segment.update({
                    outerRadius : this.outerRadius,
                    innerRadius : (this.outerRadius/100) * this.options.percentageInnerCutout
                });
            }, this);
        },
        draw : function(easeDecimal){
            var animDecimal = (easeDecimal) ? easeDecimal : 1;
            this.clear();
            helpers.each(this.segments,function(segment,index){
                segment.transition({
                    circumference : this.calculateCircumference(segment.value),
                    outerRadius : this.outerRadius,
                    innerRadius : (this.outerRadius/100) * this.options.percentageInnerCutout
                },animDecimal);

                segment.endAngle = segment.startAngle + segment.circumference;

                segment.draw();
                if (index === 0){
                    segment.startAngle = Math.PI * 1.5;
                }
                //Check to see if it's the last segment, if not get the next and update the start angle
                if (index < this.segments.length-1){
                    this.segments[index+1].startAngle = segment.endAngle;
                }
            },this);

        }
    });

    Chart.types.Doughnut.extend({
        name : "Pie",
        defaults : helpers.merge(defaultConfig,{percentageInnerCutout : 0})
    });

}).call(this);

(function(){
    "use strict";

    var root = this,
        Chart = root.Chart,
        helpers = Chart.helpers;

    var defaultConfig = {

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve : true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>",

        //Boolean - Whether to horizontally center the label and point dot inside the grid
        offsetGridLines : false

    };


    Chart.Type.extend({
        name: "Line",
        defaults : defaultConfig,
        initialize:  function(data){
            //Declare the extension of the default point, to cater for the options passed in to the constructor
            this.PointClass = Chart.Point.extend({
                offsetGridLines : this.options.offsetGridLines,
                strokeWidth : this.options.pointDotStrokeWidth,
                radius : this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius : this.options.pointHitDetectionRadius,
                ctx : this.chart.ctx,
                inRange : function(mouseX){
                    return (Math.pow(mouseX-this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius,2));
                }
            });

            this.datasets = [];

            //Set up tooltip events on the chart
            if (this.options.showTooltips){
                helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
                    var activePoints = (evt.type !== 'mouseout') ? this.getPointsAtEvent(evt) : [];
                    this.eachPoints(function(point){
                        point.restore(['fillColor', 'strokeColor']);
                    });
                    helpers.each(activePoints, function(activePoint){
                        activePoint.fillColor = activePoint.highlightFill;
                        activePoint.strokeColor = activePoint.highlightStroke;
                    });
                    this.showTooltip(activePoints);
                });
            }

            //Iterate through each of the datasets, and build this into a property of the chart
            helpers.each(data.datasets,function(dataset){

                var datasetObject = {
                    label : dataset.label || null,
                    fillColor : dataset.fillColor,
                    strokeColor : dataset.strokeColor,
                    pointColor : dataset.pointColor,
                    pointStrokeColor : dataset.pointStrokeColor,
                    points : []
                };

                this.datasets.push(datasetObject);


                helpers.each(dataset.data,function(dataPoint,index){
                    //Add a new point for each piece of data, passing any required data to draw.
                    datasetObject.points.push(new this.PointClass({
                        value : dataPoint,
                        label : data.labels[index],
                        datasetLabel: dataset.label,
                        strokeColor : dataset.pointStrokeColor,
                        fillColor : dataset.pointColor,
                        highlightFill : dataset.pointHighlightFill || dataset.pointColor,
                        highlightStroke : dataset.pointHighlightStroke || dataset.pointStrokeColor
                    }));
                },this);

                this.buildScale(data.labels);


                this.eachPoints(function(point, index){
                    helpers.extend(point, {
                        x: this.scale.calculateX(index),
                        y: this.scale.endPoint
                    });
                    point.save();
                }, this);

            },this);


            this.render();
        },
        update : function(){
            this.scale.update();
            // Reset any highlight colours before updating.
            helpers.each(this.activeElements, function(activeElement){
                activeElement.restore(['fillColor', 'strokeColor']);
            });
            this.eachPoints(function(point){
                point.save();
            });
            this.render();
        },
        eachPoints : function(callback){
            helpers.each(this.datasets,function(dataset){
                helpers.each(dataset.points,callback,this);
            },this);
        },
        getPointsAtEvent : function(e){
            var pointsArray = [],
                eventPosition = helpers.getRelativePosition(e);
            helpers.each(this.datasets,function(dataset){
                helpers.each(dataset.points,function(point){
                    if (point.inRange(eventPosition.x,eventPosition.y)) pointsArray.push(point);
                });
            },this);
            return pointsArray;
        },
        buildScale : function(labels){
            var self = this;

            var dataTotal = function(){
                var values = [];
                self.eachPoints(function(point){
                    values.push(point.value);
                });

                return values;
            };

            var scaleOptions = {
                templateString : this.options.scaleLabel,
                height : this.chart.height,
                width : this.chart.width,
                ctx : this.chart.ctx,
                textColor : this.options.scaleFontColor,
                offsetGridLines : this.options.offsetGridLines,
                fontSize : this.options.scaleFontSize,
                fontStyle : this.options.scaleFontStyle,
                fontFamily : this.options.scaleFontFamily,
                valuesCount : labels.length,
                beginAtZero : this.options.scaleBeginAtZero,
                integersOnly : this.options.scaleIntegersOnly,
                calculateYRange : function(currentHeight){
                    var updatedRanges = helpers.calculateScaleRange(
                        dataTotal(),
                        currentHeight,
                        this.fontSize,
                        this.beginAtZero,
                        this.integersOnly
                    );
                    helpers.extend(this, updatedRanges);
                },
                xLabels : labels,
                font : helpers.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                lineWidth : this.options.scaleLineWidth,
                lineColor : this.options.scaleLineColor,
                showHorizontalLines : this.options.scaleShowHorizontalLines,
                showVerticalLines : this.options.scaleShowVerticalLines,
                gridLineWidth : (this.options.scaleShowGridLines) ? this.options.scaleGridLineWidth : 0,
                gridLineColor : (this.options.scaleShowGridLines) ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                padding: (this.options.showScale) ? 0 : this.options.pointDotRadius + this.options.pointDotStrokeWidth,
                showLabels : this.options.scaleShowLabels,
                display : this.options.showScale
            };

            if (this.options.scaleOverride){
                helpers.extend(scaleOptions, {
                    calculateYRange: helpers.noop,
                    steps: this.options.scaleSteps,
                    stepValue: this.options.scaleStepWidth,
                    min: this.options.scaleStartValue,
                    max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
                });
            }


            this.scale = new Chart.Scale(scaleOptions);
        },
        addData : function(valuesArray,label){
            //Map the values array for each of the datasets

            helpers.each(valuesArray,function(value,datasetIndex){
                //Add a new point for each piece of data, passing any required data to draw.
                this.datasets[datasetIndex].points.push(new this.PointClass({
                    value : value,
                    label : label,
                    datasetLabel: this.datasets[datasetIndex].label,
                    x: this.scale.calculateX(this.scale.valuesCount+1),
                    y: this.scale.endPoint,
                    strokeColor : this.datasets[datasetIndex].pointStrokeColor,
                    fillColor : this.datasets[datasetIndex].pointColor
                }));
            },this);

            this.scale.addXLabel(label);
            //Then re-render the chart.
            this.update();
        },
        removeData : function(){
            this.scale.removeXLabel();
            //Then re-render the chart.
            helpers.each(this.datasets,function(dataset){
                dataset.points.shift();
            },this);
            this.update();
        },
        reflow : function(){
            var newScaleProps = helpers.extend({
                height : this.chart.height,
                width : this.chart.width
            });
            this.scale.update(newScaleProps);
        },
        draw : function(ease){
            var easingDecimal = ease || 1;
            this.clear();

            var ctx = this.chart.ctx;

            // Some helper methods for getting the next/prev points
            var hasValue = function(item){
                return item.value !== null;
            },
            nextPoint = function(point, collection, index){
                return helpers.findNextWhere(collection, hasValue, index) || point;
            },
            previousPoint = function(point, collection, index){
                return helpers.findPreviousWhere(collection, hasValue, index) || point;
            };

            if (!this.scale) return;
            this.scale.draw(easingDecimal);


            helpers.each(this.datasets,function(dataset){
                var pointsWithValues = helpers.where(dataset.points, hasValue);

                //Transition each point first so that the line and point drawing isn't out of sync
                //We can use this extra loop to calculate the control points of this dataset also in this loop

                helpers.each(dataset.points, function(point, index){
                    if (point.hasValue()){
                        point.transition({
                            y : this.scale.calculateY(point.value),
                            x : this.scale.calculateX(index)
                        }, easingDecimal);
                    }
                },this);


                // Control points need to be calculated in a separate loop, because we need to know the current x/y of the point
                // This would cause issues when there is no animation, because the y of the next point would be 0, so beziers would be skewed
                if (this.options.bezierCurve){
                    helpers.each(pointsWithValues, function(point, index){
                        var tension = (index > 0 && index < pointsWithValues.length - 1) ? this.options.bezierCurveTension : 0;
                        point.controlPoints = helpers.splineCurve(
                            previousPoint(point, pointsWithValues, index),
                            point,
                            nextPoint(point, pointsWithValues, index),
                            tension
                        );

                        // Prevent the bezier going outside of the bounds of the graph

                        // Cap puter bezier handles to the upper/lower scale bounds
                        if (point.controlPoints.outer.y > this.scale.endPoint){
                            point.controlPoints.outer.y = this.scale.endPoint;
                        }
                        else if (point.controlPoints.outer.y < this.scale.startPoint){
                            point.controlPoints.outer.y = this.scale.startPoint;
                        }

                        // Cap inner bezier handles to the upper/lower scale bounds
                        if (point.controlPoints.inner.y > this.scale.endPoint){
                            point.controlPoints.inner.y = this.scale.endPoint;
                        }
                        else if (point.controlPoints.inner.y < this.scale.startPoint){
                            point.controlPoints.inner.y = this.scale.startPoint;
                        }
                    },this);
                }


                //Draw the line between all the points
                ctx.lineWidth = this.options.datasetStrokeWidth;
                ctx.strokeStyle = dataset.strokeColor;
                ctx.beginPath();

                helpers.each(pointsWithValues, function(point, index){
                    if (index === 0){
                        ctx.moveTo(point.x, point.y);
                    }
                    else{
                        if(this.options.bezierCurve){
                            var previous = previousPoint(point, pointsWithValues, index);

                            ctx.bezierCurveTo(
                                previous.controlPoints.outer.x,
                                previous.controlPoints.outer.y,
                                point.controlPoints.inner.x,
                                point.controlPoints.inner.y,
                                point.x,
                                point.y
                            );
                        }
                        else{
                            ctx.lineTo(point.x,point.y);
                        }
                    }
                }, this);

                if (this.options.datasetStroke) {
                    ctx.stroke();
                }

                if (this.options.datasetFill && pointsWithValues.length > 0){
                    //Round off the line by going to the base of the chart, back to the start, then fill.
                    ctx.lineTo(pointsWithValues[pointsWithValues.length - 1].x, this.scale.endPoint);
                    ctx.lineTo(pointsWithValues[0].x, this.scale.endPoint);
                    ctx.fillStyle = dataset.fillColor;
                    ctx.closePath();
                    ctx.fill();
                }

                //Now draw the points over the line
                //A little inefficient double looping, but better than the line
                //lagging behind the point positions
                helpers.each(pointsWithValues,function(point){
                    point.draw();
                });
            },this);
        }
    });


}).call(this);

(function(){
    "use strict";

    var root = this,
        Chart = root.Chart,
        //Cache a local reference to Chart.helpers
        helpers = Chart.helpers;

    var defaultConfig = {
        //Boolean - Show a backdrop to the scale label
        scaleShowLabelBackdrop : true,

        //String - The colour of the label backdrop
        scaleBackdropColor : "rgba(255,255,255,0.75)",

        // Boolean - Whether the scale should begin at zero
        scaleBeginAtZero : true,

        //Number - The backdrop padding above & below the label in pixels
        scaleBackdropPaddingY : 2,

        //Number - The backdrop padding to the side of the label in pixels
        scaleBackdropPaddingX : 2,

        //Boolean - Show line for each value in the scale
        scaleShowLine : true,

        //Boolean - Stroke a line around each segment in the chart
        segmentShowStroke : true,

        //String - The colour of the stroke on each segment.
        segmentStrokeColor : "#fff",

        //Number - The width of the stroke value in pixels
        segmentStrokeWidth : 2,

        //Number - Amount of animation steps
        animationSteps : 100,

        //String - Animation easing effect.
        animationEasing : "easeOutBounce",

        //Boolean - Whether to animate the rotation of the chart
        animateRotate : true,

        //Boolean - Whether to animate scaling the chart from the centre
        animateScale : false,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>"
    };


    Chart.Type.extend({
        //Passing in a name registers this chart in the Chart namespace
        name: "PolarArea",
        //Providing a defaults will also register the deafults in the chart namespace
        defaults : defaultConfig,
        //Initialize is fired when the chart is initialized - Data is passed in as a parameter
        //Config is automatically merged by the core of Chart.js, and is available at this.options
        initialize:  function(data){
            this.segments = [];
            //Declare segment class as a chart instance specific class, so it can share props for this instance
            this.SegmentArc = Chart.Arc.extend({
                showStroke : this.options.segmentShowStroke,
                strokeWidth : this.options.segmentStrokeWidth,
                strokeColor : this.options.segmentStrokeColor,
                ctx : this.chart.ctx,
                innerRadius : 0,
                x : this.chart.width/2,
                y : this.chart.height/2
            });
            this.scale = new Chart.RadialScale({
                display: this.options.showScale,
                fontStyle: this.options.scaleFontStyle,
                fontSize: this.options.scaleFontSize,
                fontFamily: this.options.scaleFontFamily,
                fontColor: this.options.scaleFontColor,
                showLabels: this.options.scaleShowLabels,
                showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                backdropColor: this.options.scaleBackdropColor,
                backdropPaddingY : this.options.scaleBackdropPaddingY,
                backdropPaddingX: this.options.scaleBackdropPaddingX,
                lineWidth: (this.options.scaleShowLine) ? this.options.scaleLineWidth : 0,
                lineColor: this.options.scaleLineColor,
                lineArc: true,
                width: this.chart.width,
                height: this.chart.height,
                xCenter: this.chart.width/2,
                yCenter: this.chart.height/2,
                ctx : this.chart.ctx,
                templateString: this.options.scaleLabel,
                valuesCount: data.length
            });

            this.updateScaleRange(data);

            this.scale.update();

            helpers.each(data,function(segment,index){
                this.addData(segment,index,true);
            },this);

            //Set up tooltip events on the chart
            if (this.options.showTooltips){
                helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
                    var activeSegments = (evt.type !== 'mouseout') ? this.getSegmentsAtEvent(evt) : [];
                    helpers.each(this.segments,function(segment){
                        segment.restore(["fillColor"]);
                    });
                    helpers.each(activeSegments,function(activeSegment){
                        activeSegment.fillColor = activeSegment.highlightColor;
                    });
                    this.showTooltip(activeSegments);
                });
            }

            this.render();
        },
        getSegmentsAtEvent : function(e){
            var segmentsArray = [];

            var location = helpers.getRelativePosition(e);

            helpers.each(this.segments,function(segment){
                if (segment.inRange(location.x,location.y)) segmentsArray.push(segment);
            },this);
            return segmentsArray;
        },
        addData : function(segment, atIndex, silent){
            var index = atIndex || this.segments.length;

            this.segments.splice(index, 0, new this.SegmentArc({
                fillColor: segment.color,
                highlightColor: segment.highlight || segment.color,
                label: segment.label,
                value: segment.value,
                outerRadius: (this.options.animateScale) ? 0 : this.scale.calculateCenterOffset(segment.value),
                circumference: (this.options.animateRotate) ? 0 : this.scale.getCircumference(),
                startAngle: Math.PI * 1.5
            }));
            if (!silent){
                this.reflow();
                this.update();
            }
        },
        removeData: function(atIndex){
            var indexToDelete = (helpers.isNumber(atIndex)) ? atIndex : this.segments.length-1;
            this.segments.splice(indexToDelete, 1);
            this.reflow();
            this.update();
        },
        calculateTotal: function(data){
            this.total = 0;
            helpers.each(data,function(segment){
                this.total += segment.value;
            },this);
            this.scale.valuesCount = this.segments.length;
        },
        updateScaleRange: function(datapoints){
            var valuesArray = [];
            helpers.each(datapoints,function(segment){
                valuesArray.push(segment.value);
            });

            var scaleSizes = (this.options.scaleOverride) ?
                {
                    steps: this.options.scaleSteps,
                    stepValue: this.options.scaleStepWidth,
                    min: this.options.scaleStartValue,
                    max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
                } :
                helpers.calculateScaleRange(
                    valuesArray,
                    helpers.min([this.chart.width, this.chart.height])/2,
                    this.options.scaleFontSize,
                    this.options.scaleBeginAtZero,
                    this.options.scaleIntegersOnly
                );

            helpers.extend(
                this.scale,
                scaleSizes,
                {
                    size: helpers.min([this.chart.width, this.chart.height]),
                    xCenter: this.chart.width/2,
                    yCenter: this.chart.height/2
                }
            );

        },
        update : function(){
            this.calculateTotal(this.segments);

            helpers.each(this.segments,function(segment){
                segment.save();
            });

            this.reflow();
            this.render();
        },
        reflow : function(){
            helpers.extend(this.SegmentArc.prototype,{
                x : this.chart.width/2,
                y : this.chart.height/2
            });
            this.updateScaleRange(this.segments);
            this.scale.update();

            helpers.extend(this.scale,{
                xCenter: this.chart.width/2,
                yCenter: this.chart.height/2
            });

            helpers.each(this.segments, function(segment){
                segment.update({
                    outerRadius : this.scale.calculateCenterOffset(segment.value)
                });
            }, this);

        },
        draw : function(ease){
            var easingDecimal = ease || 1;
            //Clear & draw the canvas
            this.clear();
            helpers.each(this.segments,function(segment, index){
                segment.transition({
                    circumference : this.scale.getCircumference(),
                    outerRadius : this.scale.calculateCenterOffset(segment.value)
                },easingDecimal);

                segment.endAngle = segment.startAngle + segment.circumference;

                // If we've removed the first segment we need to set the first one to
                // start at the top.
                if (index === 0){
                    segment.startAngle = Math.PI * 1.5;
                }

                //Check to see if it's the last segment, if not get the next and update the start angle
                if (index < this.segments.length - 1){
                    this.segments[index+1].startAngle = segment.endAngle;
                }
                segment.draw();
            }, this);
            this.scale.draw();
        }
    });

}).call(this);

(function(){
    "use strict";

    var root = this,
        Chart = root.Chart,
        helpers = Chart.helpers;



    Chart.Type.extend({
        name: "Radar",
        defaults:{
            //Boolean - Whether to show lines for each scale point
            scaleShowLine : true,

            //Boolean - Whether we show the angle lines out of the radar
            angleShowLineOut : true,

            //Boolean - Whether to show labels on the scale
            scaleShowLabels : false,

            // Boolean - Whether the scale should begin at zero
            scaleBeginAtZero : true,

            //String - Colour of the angle line
            angleLineColor : "rgba(0,0,0,.1)",

            //Number - Pixel width of the angle line
            angleLineWidth : 1,

            //String - Point label font declaration
            pointLabelFontFamily : "'Arial'",

            //String - Point label font weight
            pointLabelFontStyle : "normal",

            //Number - Point label font size in pixels
            pointLabelFontSize : 10,

            //String - Point label font colour
            pointLabelFontColor : "#666",

            //Boolean - Whether to show a dot for each point
            pointDot : true,

            //Number - Radius of each point dot in pixels
            pointDotRadius : 3,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,

            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>"

        },

        initialize: function(data){
            this.PointClass = Chart.Point.extend({
                strokeWidth : this.options.pointDotStrokeWidth,
                radius : this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius : this.options.pointHitDetectionRadius,
                ctx : this.chart.ctx
            });

            this.datasets = [];

            this.buildScale(data);

            //Set up tooltip events on the chart
            if (this.options.showTooltips){
                helpers.bindEvents(this, this.options.tooltipEvents, function(evt){
                    var activePointsCollection = (evt.type !== 'mouseout') ? this.getPointsAtEvent(evt) : [];

                    this.eachPoints(function(point){
                        point.restore(['fillColor', 'strokeColor']);
                    });
                    helpers.each(activePointsCollection, function(activePoint){
                        activePoint.fillColor = activePoint.highlightFill;
                        activePoint.strokeColor = activePoint.highlightStroke;
                    });

                    this.showTooltip(activePointsCollection);
                });
            }

            //Iterate through each of the datasets, and build this into a property of the chart
            helpers.each(data.datasets,function(dataset){

                var datasetObject = {
                    label: dataset.label || null,
                    fillColor : dataset.fillColor,
                    strokeColor : dataset.strokeColor,
                    pointColor : dataset.pointColor,
                    pointStrokeColor : dataset.pointStrokeColor,
                    points : []
                };

                this.datasets.push(datasetObject);

                helpers.each(dataset.data,function(dataPoint,index){
                    //Add a new point for each piece of data, passing any required data to draw.
                    var pointPosition;
                    if (!this.scale.animation){
                        pointPosition = this.scale.getPointPosition(index, this.scale.calculateCenterOffset(dataPoint));
                    }
                    datasetObject.points.push(new this.PointClass({
                        value : dataPoint,
                        label : data.labels[index],
                        datasetLabel: dataset.label,
                        x: (this.options.animation) ? this.scale.xCenter : pointPosition.x,
                        y: (this.options.animation) ? this.scale.yCenter : pointPosition.y,
                        strokeColor : dataset.pointStrokeColor,
                        fillColor : dataset.pointColor,
                        highlightFill : dataset.pointHighlightFill || dataset.pointColor,
                        highlightStroke : dataset.pointHighlightStroke || dataset.pointStrokeColor
                    }));
                },this);

            },this);

            this.render();
        },
        eachPoints : function(callback){
            helpers.each(this.datasets,function(dataset){
                helpers.each(dataset.points,callback,this);
            },this);
        },

        getPointsAtEvent : function(evt){
            var mousePosition = helpers.getRelativePosition(evt),
                fromCenter = helpers.getAngleFromPoint({
                    x: this.scale.xCenter,
                    y: this.scale.yCenter
                }, mousePosition);

            var anglePerIndex = (Math.PI * 2) /this.scale.valuesCount,
                pointIndex = Math.round((fromCenter.angle - Math.PI * 1.5) / anglePerIndex),
                activePointsCollection = [];

            // If we're at the top, make the pointIndex 0 to get the first of the array.
            if (pointIndex >= this.scale.valuesCount || pointIndex < 0){
                pointIndex = 0;
            }

            if (fromCenter.distance <= this.scale.drawingArea){
                helpers.each(this.datasets, function(dataset){
                    activePointsCollection.push(dataset.points[pointIndex]);
                });
            }

            return activePointsCollection;
        },

        buildScale : function(data){
            this.scale = new Chart.RadialScale({
                display: this.options.showScale,
                fontStyle: this.options.scaleFontStyle,
                fontSize: this.options.scaleFontSize,
                fontFamily: this.options.scaleFontFamily,
                fontColor: this.options.scaleFontColor,
                showLabels: this.options.scaleShowLabels,
                showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                backdropColor: this.options.scaleBackdropColor,
                backgroundColors: this.options.scaleBackgroundColors,
                backdropPaddingY : this.options.scaleBackdropPaddingY,
                backdropPaddingX: this.options.scaleBackdropPaddingX,
                lineWidth: (this.options.scaleShowLine) ? this.options.scaleLineWidth : 0,
                lineColor: this.options.scaleLineColor,
                angleLineColor : this.options.angleLineColor,
                angleLineWidth : (this.options.angleShowLineOut) ? this.options.angleLineWidth : 0,
                // Point labels at the edge of each line
                pointLabelFontColor : this.options.pointLabelFontColor,
                pointLabelFontSize : this.options.pointLabelFontSize,
                pointLabelFontFamily : this.options.pointLabelFontFamily,
                pointLabelFontStyle : this.options.pointLabelFontStyle,
                height : this.chart.height,
                width: this.chart.width,
                xCenter: this.chart.width/2,
                yCenter: this.chart.height/2,
                ctx : this.chart.ctx,
                templateString: this.options.scaleLabel,
                labels: data.labels,
                valuesCount: data.datasets[0].data.length
            });

            this.scale.setScaleSize();
            this.updateScaleRange(data.datasets);
            this.scale.buildYLabels();
        },
        updateScaleRange: function(datasets){
            var valuesArray = (function(){
                var totalDataArray = [];
                helpers.each(datasets,function(dataset){
                    if (dataset.data){
                        totalDataArray = totalDataArray.concat(dataset.data);
                    }
                    else {
                        helpers.each(dataset.points, function(point){
                            totalDataArray.push(point.value);
                        });
                    }
                });
                return totalDataArray;
            })();


            var scaleSizes = (this.options.scaleOverride) ?
                {
                    steps: this.options.scaleSteps,
                    stepValue: this.options.scaleStepWidth,
                    min: this.options.scaleStartValue,
                    max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
                } :
                helpers.calculateScaleRange(
                    valuesArray,
                    helpers.min([this.chart.width, this.chart.height])/2,
                    this.options.scaleFontSize,
                    this.options.scaleBeginAtZero,
                    this.options.scaleIntegersOnly
                );

            helpers.extend(
                this.scale,
                scaleSizes
            );

        },
        addData : function(valuesArray,label){
            //Map the values array for each of the datasets
            this.scale.valuesCount++;
            helpers.each(valuesArray,function(value,datasetIndex){
                var pointPosition = this.scale.getPointPosition(this.scale.valuesCount, this.scale.calculateCenterOffset(value));
                this.datasets[datasetIndex].points.push(new this.PointClass({
                    value : value,
                    label : label,
                    datasetLabel: this.datasets[datasetIndex].label,
                    x: pointPosition.x,
                    y: pointPosition.y,
                    strokeColor : this.datasets[datasetIndex].pointStrokeColor,
                    fillColor : this.datasets[datasetIndex].pointColor
                }));
            },this);

            this.scale.labels.push(label);

            this.reflow();

            this.update();
        },
        removeData : function(){
            this.scale.valuesCount--;
            this.scale.labels.shift();
            helpers.each(this.datasets,function(dataset){
                dataset.points.shift();
            },this);
            this.reflow();
            this.update();
        },
        update : function(){
            this.eachPoints(function(point){
                point.save();
            });
            this.reflow();
            this.render();
        },
        reflow: function(){
            helpers.extend(this.scale, {
                width : this.chart.width,
                height: this.chart.height,
                size : helpers.min([this.chart.width, this.chart.height]),
                xCenter: this.chart.width/2,
                yCenter: this.chart.height/2
            });
            this.updateScaleRange(this.datasets);
            this.scale.setScaleSize();
            this.scale.buildYLabels();
        },
        draw : function(ease){
            var easeDecimal = ease || 1,
                ctx = this.chart.ctx;
            this.clear();
            this.scale.draw();

            helpers.each(this.datasets,function(dataset){

                //Transition each point first so that the line and point drawing isn't out of sync
                helpers.each(dataset.points,function(point,index){
                    if (point.hasValue()){
                        point.transition(this.scale.getPointPosition(index, this.scale.calculateCenterOffset(point.value)), easeDecimal);
                    }
                },this);



                //Draw the line between all the points
                ctx.lineWidth = this.options.datasetStrokeWidth;
                ctx.strokeStyle = dataset.strokeColor;
                ctx.beginPath();
                helpers.each(dataset.points,function(point,index){
                    if (index === 0){
                        ctx.moveTo(point.x,point.y);
                    }
                    else{
                        ctx.lineTo(point.x,point.y);
                    }
                },this);
                ctx.closePath();
                ctx.stroke();

                ctx.fillStyle = dataset.fillColor;
                if(this.options.datasetFill){
                    ctx.fill();
                }
                //Now draw the points over the line
                //A little inefficient double looping, but better than the line
                //lagging behind the point positions
                helpers.each(dataset.points,function(point){
                    if (point.hasValue()){
                        point.draw();
                    }
                });

            },this);

        }

    });





}).call(this);


// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


(function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "moment"], t) : "object" == typeof exports ? module.exports = t(require("jquery"), require("moment")) : t(jQuery, moment)
})(function(t, e) {
    function n() {
        var e, n, i, r, s, o = Array.prototype.slice.call(arguments),
            l = {};
        for (e = 0; Pe.length > e; e++) {
            for (n = Pe[e], i = null, r = 0; o.length > r; r++) s = o[r][n], t.isPlainObject(s) ? i = t.extend(i || {}, s) : null != s && (i = null);
            null !== i && (l[n] = i)
        }
        return o.unshift({}), o.push(l), t.extend.apply(t, o)
    }

    function i(e) {
        var n, i = {
            views: e.views || {}
        };
        return t.each(e, function(e, r) {
            "views" != e && (t.isPlainObject(r) && !/(time|duration|interval)$/i.test(e) && -1 == t.inArray(e, Pe) ? (n = null, t.each(r, function(t, r) {
                /^(month|week|day|default|basic(Week|Day)?|agenda(Week|Day)?)$/.test(t) ? (i.views[t] || (i.views[t] = {}), i.views[t][e] = r) : (n || (n = {}), n[t] = r)
            }), n && (i[e] = n)) : i[e] = r)
        }), i
    }

    function r(t, e) {
        e.left && t.css({
            "border-left-width": 1,
            "margin-left": e.left - 1
        }), e.right && t.css({
            "border-right-width": 1,
            "margin-right": e.right - 1
        })
    }

    function s(t) {
        t.css({
            "margin-left": "",
            "margin-right": "",
            "border-left-width": "",
            "border-right-width": ""
        })
    }

    function o() {
        t("body").addClass("fc-not-allowed")
    }

    function l() {
        t("body").removeClass("fc-not-allowed")
    }

    function a(e, n, i) {
        var r = Math.floor(n / e.length),
            s = Math.floor(n - r * (e.length - 1)),
            o = [],
            l = [],
            a = [],
            c = 0;
        u(e), e.each(function(n, i) {
            var u = n === e.length - 1 ? s : r,
                d = t(i).outerHeight(!0);
            u > d ? (o.push(i), l.push(d), a.push(t(i).height())) : c += d
        }), i && (n -= c, r = Math.floor(n / o.length), s = Math.floor(n - r * (o.length - 1))), t(o).each(function(e, n) {
            var i = e === o.length - 1 ? s : r,
                u = l[e],
                c = a[e],
                d = i - (u - c);
            i > u && t(n).height(d)
        })
    }

    function u(t) {
        t.height("")
    }

    function c(e) {
        var n = 0;
        return e.find("> *").each(function(e, i) {
            var r = t(i).outerWidth();
            r > n && (n = r)
        }), n++, e.width(n), n
    }

    function d(t, e) {
        return t.height(e).addClass("fc-scroller"), t[0].scrollHeight - 1 > t[0].clientHeight ? !0 : (h(t), !1)
    }

    function h(t) {
        t.height("").removeClass("fc-scroller")
    }

    function f(e) {
        var n = e.css("position"),
            i = e.parents().filter(function() {
                var e = t(this);
                return /(auto|scroll)/.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
            }).eq(0);
        return "fixed" !== n && i.length ? i : t(e[0].ownerDocument || document)
    }

    function g(t) {
        var e = t.offset();
        return {
            left: e.left,
            right: e.left + t.outerWidth(),
            top: e.top,
            bottom: e.top + t.outerHeight()
        }
    }

    function p(t) {
        var e = t.offset(),
            n = v(t),
            i = e.left + E(t, "border-left-width") + n.left,
            r = e.top + E(t, "border-top-width") + n.top;
        return {
            left: i,
            right: i + t[0].clientWidth,
            top: r,
            bottom: r + t[0].clientHeight
        }
    }

    function m(t) {
        var e = t.offset(),
            n = e.left + E(t, "border-left-width") + E(t, "padding-left"),
            i = e.top + E(t, "border-top-width") + E(t, "padding-top");
        return {
            left: n,
            right: n + t.width(),
            top: i,
            bottom: i + t.height()
        }
    }

    function v(t) {
        var e = t.innerWidth() - t[0].clientWidth,
            n = {
                left: 0,
                right: 0,
                top: 0,
                bottom: t.innerHeight() - t[0].clientHeight
            };
        return y() && "rtl" == t.css("direction") ? n.left = e : n.right = e, n
    }

    function y() {
        return null === Ve && (Ve = w()), Ve
    }

    function w() {
        var e = t("<div><div/></div>").css({
                position: "absolute",
                top: -1e3,
                left: 0,
                border: 0,
                padding: 0,
                overflow: "scroll",
                direction: "rtl"
            }).appendTo("body"),
            n = e.children(),
            i = n.offset().left > e.offset().left;
        return e.remove(), i
    }

    function E(t, e) {
        return parseFloat(t.css(e)) || 0
    }

    function S(t) {
        return 1 == t.which && !t.ctrlKey
    }

    function b(t, e) {
        var n = {
            left: Math.max(t.left, e.left),
            right: Math.min(t.right, e.right),
            top: Math.max(t.top, e.top),
            bottom: Math.min(t.bottom, e.bottom)
        };
        return n.left < n.right && n.top < n.bottom ? n : !1
    }

    function D(t, e) {
        return {
            left: Math.min(Math.max(t.left, e.left), e.right),
            top: Math.min(Math.max(t.top, e.top), e.bottom)
        }
    }

    function C(t) {
        return {
            left: (t.left + t.right) / 2,
            top: (t.top + t.bottom) / 2
        }
    }

    function T(t, e) {
        return {
            left: t.left - e.left,
            top: t.top - e.top
        }
    }

    function H(t, e) {
        var n, i, r, s, o = t.start,
            l = t.end,
            a = e.start,
            u = e.end;
        return l > a && u > o ? (o >= a ? (n = o.clone(), r = !0) : (n = a.clone(), r = !1), u >= l ? (i = l.clone(), s = !0) : (i = u.clone(), s = !1), {
            start: n,
            end: i,
            isStart: r,
            isEnd: s
        }) : void 0
    }

    function x(t, n) {
        return e.duration({
            days: t.clone().stripTime().diff(n.clone().stripTime(), "days"),
            ms: t.time() - n.time()
        })
    }

    function R(t, n) {
        return e.duration({
            days: t.clone().stripTime().diff(n.clone().stripTime(), "days")
        })
    }

    function k(t, n, i) {
        return e.duration(Math.round(t.diff(n, i, !0)), i)
    }

    function M(t, e) {
        var n, i, r;
        for (n = 0; Ye.length > n && (i = Ye[n], r = F(i, t, e), !(r >= 1 && U(r))); n++);
        return i
    }

    function F(t, n, i) {
        return null != i ? i.diff(n, t, !0) : e.isDuration(n) ? n.as(t) : n.end.diff(n.start, t, !0)
    }

    function z(t) {
        return Boolean(t.hours() || t.minutes() || t.seconds() || t.milliseconds())
    }

    function G(t) {
        return "[object Date]" === Object.prototype.toString.call(t) || t instanceof Date
    }

    function L(t) {
        return /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(t)
    }

    function _(t) {
        var e = function() {};
        return e.prototype = t, new e
    }

    function P(t, e) {
        for (var n in t) A(t, n) && (e[n] = t[n])
    }

    function V(t, e) {
        var n, i, r = ["constructor", "toString", "valueOf"];
        for (n = 0; r.length > n; n++) i = r[n], t[i] !== Object.prototype[i] && (e[i] = t[i])
    }

    function A(t, e) {
        return Ie.call(t, e)
    }

    function O(e) {
        return /undefined|null|boolean|number|string/.test(t.type(e))
    }

    function N(e, n, i) {
        if (t.isFunction(e) && (e = [e]), e) {
            var r, s;
            for (r = 0; e.length > r; r++) s = e[r].apply(n, i) || s;
            return s
        }
    }

    function B() {
        for (var t = 0; arguments.length > t; t++)
            if (void 0 !== arguments[t]) return arguments[t]
    }

    function Y(t) {
        return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
    }

    function I(t) {
        return t.replace(/&.*?;/g, "")
    }

    function W(e) {
        var n = [];
        return t.each(e, function(t, e) {
            null != e && n.push(t + ":" + e)
        }), n.join(";")
    }

    function Z(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }

    function j(t, e) {
        return t - e
    }

    function U(t) {
        return 0 === t % 1
    }

    function q(t, e) {
        var n = t[e];
        return function() {
            return n.apply(t, arguments)
        }
    }

    function $(t, e) {
        var n, i, r, s, o = function() {
            var l = +new Date - s;
            e > l && l > 0 ? n = setTimeout(o, e - l) : (n = null, t.apply(r, i), n || (r = i = null))
        };
        return function() {
            r = this, i = arguments, s = +new Date, n || (n = setTimeout(o, e))
        }
    }

    function X(n, i, r) {
        var s, o, l, a, u = n[0],
            c = 1 == n.length && "string" == typeof u;
        return e.isMoment(u) ? (a = e.apply(null, n), Q(u, a)) : G(u) || void 0 === u ? a = e.apply(null, n) : (s = !1, o = !1, c ? We.test(u) ? (u += "-01", n = [u], s = !0, o = !0) : (l = Ze.exec(u)) && (s = !l[5], o = !0) : t.isArray(u) && (o = !0), a = i || s ? e.utc.apply(e, n) : e.apply(null, n), s ? (a._ambigTime = !0, a._ambigZone = !0) : r && (o ? a._ambigZone = !0 : c && (a.utcOffset ? a.utcOffset(u) : a.zone(u)))), a._fullCalendar = !0, a
    }

    function K(t, n) {
        var i, r, s = !1,
            o = !1,
            l = t.length,
            a = [];
        for (i = 0; l > i; i++) r = t[i], e.isMoment(r) || (r = Le.moment.parseZone(r)), s = s || r._ambigTime, o = o || r._ambigZone, a.push(r);
        for (i = 0; l > i; i++) r = a[i], n || !s || r._ambigTime ? o && !r._ambigZone && (a[i] = r.clone().stripZone()) : a[i] = r.clone().stripTime();
        return a
    }

    function Q(t, e) {
        t._ambigTime ? e._ambigTime = !0 : e._ambigTime && (e._ambigTime = !1), t._ambigZone ? e._ambigZone = !0 : e._ambigZone && (e._ambigZone = !1)
    }

    function J(t, e) {
        t.year(e[0] || 0).month(e[1] || 0).date(e[2] || 0).hours(e[3] || 0).minutes(e[4] || 0).seconds(e[5] || 0).milliseconds(e[6] || 0)
    }

    function te(t, e) {
        return Ue.format.call(t, e)
    }

    function ee(t, e) {
        return ne(t, le(e))
    }

    function ne(t, e) {
        var n, i = "";
        for (n = 0; e.length > n; n++) i += ie(t, e[n]);
        return i
    }

    function ie(t, e) {
        var n, i;
        return "string" == typeof e ? e : (n = e.token) ? qe[n] ? qe[n](t) : te(t, n) : e.maybe && (i = ne(t, e.maybe), i.match(/[1-9]/)) ? i : ""
    }

    function re(t, e, n, i, r) {
        var s;
        return t = Le.moment.parseZone(t), e = Le.moment.parseZone(e), s = (t.localeData || t.lang).call(t), n = s.longDateFormat(n) || n, i = i || " - ", se(t, e, le(n), i, r)
    }

    function se(t, e, n, i, r) {
        var s, o, l, a, u = "",
            c = "",
            d = "",
            h = "",
            f = "";
        for (o = 0; n.length > o && (s = oe(t, e, n[o]), s !== !1); o++) u += s;
        for (l = n.length - 1; l > o && (s = oe(t, e, n[l]), s !== !1); l--) c = s + c;
        for (a = o; l >= a; a++) d += ie(t, n[a]), h += ie(e, n[a]);
        return (d || h) && (f = r ? h + i + d : d + i + h), u + f + c
    }

    function oe(t, e, n) {
        var i, r;
        return "string" == typeof n ? n : (i = n.token) && (r = $e[i.charAt(0)], r && t.isSame(e, r)) ? te(t, i) : !1
    }

    function le(t) {
        return t in Xe ? Xe[t] : Xe[t] = ae(t)
    }

    function ae(t) {
        for (var e, n = [], i = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g; e = i.exec(t);) e[1] ? n.push(e[1]) : e[2] ? n.push({
            maybe: ae(e[2])
        }) : e[3] ? n.push({
            token: e[3]
        }) : e[5] && n.push(e[5]);
        return n
    }

    function ue() {}

    function ce(t, e) {
        return t || e ? t && e ? t.grid === e.grid && t.row === e.row && t.col === e.col : !1 : !0
    }

    function de(t) {
        var e = fe(t);
        return "background" === e || "inverse-background" === e
    }

    function he(t) {
        return "inverse-background" === fe(t)
    }

    function fe(t) {
        return B((t.source || {}).rendering, t.rendering)
    }

    function ge(t) {
        var e, n, i = {};
        for (e = 0; t.length > e; e++) n = t[e], (i[n._id] || (i[n._id] = [])).push(n);
        return i
    }

    function pe(t, e) {
        return t.eventStartMS - e.eventStartMS
    }

    function me(t, e) {
        return t.eventStartMS - e.eventStartMS || e.eventDurationMS - t.eventDurationMS || e.event.allDay - t.event.allDay || (t.event.title || "").localeCompare(e.event.title)
    }

    function ve(n) {
        var i, r, s, o, l = Le.dataAttrPrefix;
        return l && (l += "-"), i = n.data(l + "event") || null, i && (i = "object" == typeof i ? t.extend({}, i) : {}, r = i.start, null == r && (r = i.time), s = i.duration, o = i.stick, delete i.start, delete i.time, delete i.duration, delete i.stick), null == r && (r = n.data(l + "start")), null == r && (r = n.data(l + "time")), null == s && (s = n.data(l + "duration")), null == o && (o = n.data(l + "stick")), r = null != r ? e.duration(r) : null, s = null != s ? e.duration(s) : null, o = Boolean(o), {
            eventProps: i,
            startTime: r,
            duration: s,
            stick: o
        }
    }

    function ye(t, e) {
        var n, i;
        for (n = 0; e.length > n; n++)
            if (i = e[n], i.leftCol <= t.rightCol && i.rightCol >= t.leftCol) return !0;
        return !1
    }

    function we(t, e) {
        return t.leftCol - e.leftCol
    }

    function Ee(t) {
        var e, n, i;
        if (t.sort(me), e = Se(t), be(e), n = e[0]) {
            for (i = 0; n.length > i; i++) De(n[i]);
            for (i = 0; n.length > i; i++) Ce(n[i], 0, 0)
        }
    }

    function Se(t) {
        var e, n, i, r = [];
        for (e = 0; t.length > e; e++) {
            for (n = t[e], i = 0; r.length > i && Te(n, r[i]).length; i++);
            n.level = i, (r[i] || (r[i] = [])).push(n)
        }
        return r
    }

    function be(t) {
        var e, n, i, r, s;
        for (e = 0; t.length > e; e++)
            for (n = t[e], i = 0; n.length > i; i++)
                for (r = n[i], r.forwardSegs = [], s = e + 1; t.length > s; s++) Te(r, t[s], r.forwardSegs)
    }

    function De(t) {
        var e, n, i = t.forwardSegs,
            r = 0;
        if (void 0 === t.forwardPressure) {
            for (e = 0; i.length > e; e++) n = i[e], De(n), r = Math.max(r, 1 + n.forwardPressure);
            t.forwardPressure = r
        }
    }

    function Ce(t, e, n) {
        var i, r = t.forwardSegs;
        if (void 0 === t.forwardCoord)
            for (r.length ? (r.sort(xe), Ce(r[0], e + 1, n), t.forwardCoord = r[0].backwardCoord) : t.forwardCoord = 1, t.backwardCoord = t.forwardCoord - (t.forwardCoord - n) / (e + 1), i = 0; r.length > i; i++) Ce(r[i], 0, t.forwardCoord)
    }

    function Te(t, e, n) {
        n = n || [];
        for (var i = 0; e.length > i; i++) He(t, e[i]) && n.push(e[i]);
        return n
    }

    function He(t, e) {
        return t.bottom > e.top && t.top < e.bottom
    }

    function xe(t, e) {
        return e.forwardPressure - t.forwardPressure || (t.backwardCoord || 0) - (e.backwardCoord || 0) || me(t, e)
    }

    function Re(n, i) {
        function r() {
            j ? l() && (c(), a()) : s()
        }

        function s() {
            U = B.theme ? "ui" : "fc", n.addClass("fc"), B.isRTL ? n.addClass("fc-rtl") : n.addClass("fc-ltr"), B.theme ? n.addClass("ui-widget") : n.addClass("fc-unthemed"), j = t("<div class='fc-view-container'/>").prependTo(n), W = N.header = new Fe(N, B), Z = W.render(), Z && n.prepend(Z), a(B.defaultView), B.handleWindowResize && (K = $(h, B.windowResizeDelay), t(window).resize(K))
        }

        function o() {
            q && q.removeElement(), W.destroy(), j.remove(), n.removeClass("fc fc-ltr fc-rtl fc-unthemed ui-widget"), K && t(window).unbind("resize", K)
        }

        function l() {
            return n.is(":visible")
        }

        function a(e) {
            ie++, q && e && q.type !== e && (W.deactivateButton(q.type), G(), q.removeElement(), q = N.view = null), !q && e && (q = N.view = ne[e] || (ne[e] = N.instantiateView(e)), q.setElement(t("<div class='fc-view fc-" + e + "-view' />").appendTo(j)), W.activateButton(e)), q && (Q = q.massageCurrentDate(Q), q.isDisplayed && Q.isWithin(q.intervalStart, q.intervalEnd) || l() && (G(), q.display(Q), L(), E(), S(), m())), L(), ie--
        }

        function u(t) {
            return l() ? (t && d(), ie++, q.updateSize(!0), ie--, !0) : void 0
        }

        function c() {
            l() && d()
        }

        function d() {
            X = "number" == typeof B.contentHeight ? B.contentHeight : "number" == typeof B.height ? B.height - (Z ? Z.outerHeight(!0) : 0) : Math.round(j.width() / Math.max(B.aspectRatio, .5))
        }

        function h(t) {
            !ie && t.target === window && q.start && u(!0) && q.trigger("windowResize", ee)
        }

        function f() {
            p(), v()
        }

        function g() {
            l() && (G(), q.displayEvents(re), L())
        }

        function p() {
            G(), q.clearEvents(), L()
        }

        function m() {
            !B.lazyFetching || J(q.start, q.end) ? v() : g()
        }

        function v() {
            te(q.start, q.end)
        }

        function y(t) {
            re = t, g()
        }

        function w() {
            g()
        }

        function E() {
            W.updateTitle(q.title)
        }

        function S() {
            var t = N.getNow();
            t.isWithin(q.intervalStart, q.intervalEnd) ? W.disableButton("today") : W.enableButton("today")
        }

        function b(t, e) {
            t = N.moment(t), e = e ? N.moment(e) : t.hasTime() ? t.clone().add(N.defaultTimedEventDuration) : t.clone().add(N.defaultAllDayEventDuration), q.select({
                start: t,
                end: e
            })
        }

        function D() {
            q && q.unselect()
        }

        function C() {
            Q = q.computePrevDate(Q), a()
        }

        function T() {
            Q = q.computeNextDate(Q), a()
        }

        function H() {
            Q.add(-1, "years"), a()
        }

        function x() {
            Q.add(1, "years"), a()
        }

        function R() {
            Q = N.getNow(), a()
        }

        function k(t) {
            Q = N.moment(t), a()
        }

        function M(t) {
            Q.add(e.duration(t)), a()
        }

        function F(t, e) {
            var n;
            e = e || "day", n = N.getViewSpec(e) || N.getUnitViewSpec(e), Q = t, a(n ? n.type : null)
        }

        function z() {
            return Q.clone()
        }

        function G() {
            j.css({
                width: "100%",
                height: j.height(),
                overflow: "hidden"
            })
        }

        function L() {
            j.css({
                width: "",
                height: "",
                overflow: ""
            })
        }

        function P() {
            return N
        }

        function V() {
            return q
        }

        function A(t, e) {
            return void 0 === e ? B[t] : (("height" == t || "contentHeight" == t || "aspectRatio" == t) && (B[t] = e, u(!0)), void 0)
        }

        function O(t, e) {
            return B[t] ? B[t].apply(e || ee, Array.prototype.slice.call(arguments, 2)) : void 0
        }
        var N = this;
        N.initOptions(i || {});
        var B = this.options;
        N.render = r, N.destroy = o, N.refetchEvents = f, N.reportEvents = y, N.reportEventChange = w, N.rerenderEvents = g, N.changeView = a, N.select = b, N.unselect = D, N.prev = C, N.next = T, N.prevYear = H, N.nextYear = x, N.today = R, N.gotoDate = k, N.incrementDate = M, N.zoomTo = F, N.getDate = z, N.getCalendar = P, N.getView = V, N.option = A, N.trigger = O;
        var Y = _(Me(B.lang));
        if (B.monthNames && (Y._months = B.monthNames), B.monthNamesShort && (Y._monthsShort = B.monthNamesShort), B.dayNames && (Y._weekdays = B.dayNames), B.dayNamesShort && (Y._weekdaysShort = B.dayNamesShort), null != B.firstDay) {
            var I = _(Y._week);
            I.dow = B.firstDay, Y._week = I
        }
        Y._fullCalendar_weekCalc = function(t) {
            return "function" == typeof t ? t : "local" === t ? t : "iso" === t || "ISO" === t ? "ISO" : void 0
        }(B.weekNumberCalculation), N.defaultAllDayEventDuration = e.duration(B.defaultAllDayEventDuration), N.defaultTimedEventDuration = e.duration(B.defaultTimedEventDuration), N.moment = function() {
            var t;
            return "local" === B.timezone ? (t = Le.moment.apply(null, arguments), t.hasTime() && t.local()) : t = "UTC" === B.timezone ? Le.moment.utc.apply(null, arguments) : Le.moment.parseZone.apply(null, arguments), "_locale" in t ? t._locale = Y : t._lang = Y, t
        }, N.getIsAmbigTimezone = function() {
            return "local" !== B.timezone && "UTC" !== B.timezone
        }, N.rezoneDate = function(t) {
            return N.moment(t.toArray())
        }, N.getNow = function() {
            var t = B.now;
            return "function" == typeof t && (t = t()), N.moment(t)
        }, N.getEventEnd = function(t) {
            return t.end ? t.end.clone() : N.getDefaultEventEnd(t.allDay, t.start)
        }, N.getDefaultEventEnd = function(t, e) {
            var n = e.clone();
            return t ? n.stripTime().add(N.defaultAllDayEventDuration) : n.add(N.defaultTimedEventDuration), N.getIsAmbigTimezone() && n.stripZone(), n
        }, N.humanizeDuration = function(t) {
            return (t.locale || t.lang).call(t, B.lang).humanize()
        }, ze.call(N, B);
        var W, Z, j, U, q, X, K, Q, J = N.isFetchNeeded,
            te = N.fetchEvents,
            ee = n[0],
            ne = {},
            ie = 0,
            re = [];
        Q = null != B.defaultDate ? N.moment(B.defaultDate) : N.getNow(), N.getSuggestedViewHeight = function() {
            return void 0 === X && c(), X
        }, N.isHeightAuto = function() {
            return "auto" === B.contentHeight || "auto" === B.height
        }
    }

    function ke(e) {
        t.each(fn, function(t, n) {
            null == e[t] && (e[t] = n(e))
        })
    }

    function Me(t) {
        var n = e.localeData || e.langData;
        return n.call(e, t) || n.call(e, "en")
    }

    function Fe(e, n) {
        function i() {
            var e = n.header;
            return f = n.theme ? "ui" : "fc", e ? g = t("<div class='fc-toolbar'/>").append(s("left")).append(s("right")).append(s("center")).append('<div class="fc-clear"/>') : void 0
        }

        function r() {
            g.remove()
        }

        function s(i) {
            var r = t('<div class="fc-' + i + '"/>'),
                s = n.header[i];
            return s && t.each(s.split(" "), function() {
                var i, s = t(),
                    o = !0;
                t.each(this.split(","), function(i, r) {
                    var l, a, u, c, d, h, g, m, v;
                    "title" == r ? (s = s.add(t("<h2>&nbsp;</h2>")), o = !1) : (l = e.getViewSpec(r), l ? (a = function() {
                        e.changeView(r)
                    }, p.push(r), u = l.buttonTextOverride, c = l.buttonTextDefault) : e[r] && (a = function() {
                        e[r]()
                    }, u = (e.overrides.buttonText || {})[r], c = n.buttonText[r]), a && (d = n.themeButtonIcons[r], h = n.buttonIcons[r], g = u ? Y(u) : d && n.theme ? "<span class='ui-icon ui-icon-" + d + "'></span>" : h && !n.theme ? "<span class='fc-icon fc-icon-" + h + "'></span>" : Y(c), m = ["fc-" + r + "-button", f + "-button", f + "-state-default"], v = t('<button type="button" class="' + m.join(" ") + '">' + g + "</button>").click(function() {
                        v.hasClass(f + "-state-disabled") || (a(), (v.hasClass(f + "-state-active") || v.hasClass(f + "-state-disabled")) && v.removeClass(f + "-state-hover"))
                    }).mousedown(function() {
                        v.not("." + f + "-state-active").not("." + f + "-state-disabled").addClass(f + "-state-down")
                    }).mouseup(function() {
                        v.removeClass(f + "-state-down")
                    }).hover(function() {
                        v.not("." + f + "-state-active").not("." + f + "-state-disabled").addClass(f + "-state-hover")
                    }, function() {
                        v.removeClass(f + "-state-hover").removeClass(f + "-state-down")
                    }), s = s.add(v)))
                }), o && s.first().addClass(f + "-corner-left").end().last().addClass(f + "-corner-right").end(), s.length > 1 ? (i = t("<div/>"), o && i.addClass("fc-button-group"), i.append(s), r.append(i)) : r.append(s)
            }), r
        }

        function o(t) {
            g.find("h2").text(t)
        }

        function l(t) {
            g.find(".fc-" + t + "-button").addClass(f + "-state-active")
        }

        function a(t) {
            g.find(".fc-" + t + "-button").removeClass(f + "-state-active")
        }

        function u(t) {
            g.find(".fc-" + t + "-button").attr("disabled", "disabled").addClass(f + "-state-disabled")
        }

        function c(t) {
            g.find(".fc-" + t + "-button").removeAttr("disabled").removeClass(f + "-state-disabled")
        }

        function d() {
            return p
        }
        var h = this;
        h.render = i, h.destroy = r, h.updateTitle = o, h.activateButton = l, h.deactivateButton = a, h.disableButton = u, h.enableButton = c, h.getViewsWithButtons = d;
        var f, g = t(),
            p = []
    }

    function ze(n) {
        function i(t, e) {
            return !W || t.clone().stripZone() < W.clone().stripZone() || e.clone().stripZone() > Z.clone().stripZone()
        }

        function r(t, e) {
            W = t, Z = e, te = [];
            var n = ++K,
                i = X.length;
            Q = i;
            for (var r = 0; i > r; r++) s(X[r], n)
        }

        function s(e, n) {
            o(e, function(i) {
                var r, s, o, l = t.isArray(e.events);
                if (n == K) {
                    if (i)
                        for (r = 0; i.length > r; r++) s = i[r], o = l ? s : E(s, e), o && te.push.apply(te, T(o));
                    Q--, Q || q(te)
                }
            })
        }

        function o(e, i) {
            var r, s, l = Le.sourceFetchers;
            for (r = 0; l.length > r; r++) {
                if (s = l[r].call(I, e, W.clone(), Z.clone(), n.timezone, i), s === !0) return;
                if ("object" == typeof s) return o(s, i), void 0
            }
            var a = e.events;
            if (a) t.isFunction(a) ? (y(), a.call(I, W.clone(), Z.clone(), n.timezone, function(t) {
                i(t), w()
            })) : t.isArray(a) ? i(a) : i();
            else {
                var u = e.url;
                if (u) {
                    var c, d = e.success,
                        h = e.error,
                        f = e.complete;
                    c = t.isFunction(e.data) ? e.data() : e.data;
                    var g = t.extend({}, c || {}),
                        p = B(e.startParam, n.startParam),
                        m = B(e.endParam, n.endParam),
                        v = B(e.timezoneParam, n.timezoneParam);
                    p && (g[p] = W.format()), m && (g[m] = Z.format()), n.timezone && "local" != n.timezone && (g[v] = n.timezone), y(), t.ajax(t.extend({}, gn, e, {
                        data: g,
                        success: function(e) {
                            e = e || [];
                            var n = N(d, this, arguments);
                            t.isArray(n) && (e = n), i(e)
                        },
                        error: function() {
                            N(h, this, arguments), i()
                        },
                        complete: function() {
                            N(f, this, arguments), w()
                        }
                    }))
                } else i()
            }
        }

        function l(t) {
            var e = a(t);
            e && (X.push(e), Q++, s(e, K))
        }

        function a(e) {
            var n, i, r = Le.sourceNormalizers;
            if (t.isFunction(e) || t.isArray(e) ? n = {
                    events: e
                } : "string" == typeof e ? n = {
                    url: e
                } : "object" == typeof e && (n = t.extend({}, e)), n) {
                for (n.className ? "string" == typeof n.className && (n.className = n.className.split(/\s+/)) : n.className = [], t.isArray(n.events) && (n.origArray = n.events, n.events = t.map(n.events, function(t) {
                        return E(t, n)
                    })), i = 0; r.length > i; i++) r[i].call(I, n);
                return n
            }
        }

        function u(e) {
            X = t.grep(X, function(t) {
                return !c(t, e)
            }), te = t.grep(te, function(t) {
                return !c(t.source, e)
            }), q(te)
        }

        function c(t, e) {
            return t && e && d(t) == d(e)
        }

        function d(t) {
            return ("object" == typeof t ? t.origArray || t.googleCalendarId || t.url || t.events : null) || t
        }

        function h(t) {
            t.start = I.moment(t.start), t.end = t.end ? I.moment(t.end) : null, H(t, f(t)), q(te)
        }

        function f(e) {
            var n = {};
            return t.each(e, function(t, e) {
                g(t) && void 0 !== e && O(e) && (n[t] = e)
            }), n
        }

        function g(t) {
            return !/^_|^(id|allDay|start|end)$/.test(t)
        }

        function p(t, e) {
            var n, i, r, s = E(t);
            if (s) {
                for (n = T(s), i = 0; n.length > i; i++) r = n[i], r.source || (e && ($.events.push(r), r.source = $), te.push(r));
                return q(te), n
            }
            return []
        }

        function m(e) {
            var n, i;
            for (null == e ? e = function() {
                    return !0
                } : t.isFunction(e) || (n = e + "", e = function(t) {
                    return t._id == n
                }), te = t.grep(te, e, !0), i = 0; X.length > i; i++) t.isArray(X[i].events) && (X[i].events = t.grep(X[i].events, e, !0));
            q(te)
        }

        function v(e) {
            return t.isFunction(e) ? t.grep(te, e) : null != e ? (e += "", t.grep(te, function(t) {
                return t._id == e
            })) : te
        }

        function y() {
            J++ || j("loading", null, !0, U())
        }

        function w() {
            --J || j("loading", null, !1, U())
        }

        function E(i, r) {
            var s, o, l, a = {};
            if (n.eventDataTransform && (i = n.eventDataTransform(i)), r && r.eventDataTransform && (i = r.eventDataTransform(i)), t.extend(a, i), r && (a.source = r), a._id = i._id || (void 0 === i.id ? "_fc" + pn++ : i.id + ""), a.className = i.className ? "string" == typeof i.className ? i.className.split(/\s+/) : i.className : [], s = i.start || i.date, o = i.end, L(s) && (s = e.duration(s)), L(o) && (o = e.duration(o)), i.dow || e.isDuration(s) || e.isDuration(o)) a.start = s ? e.duration(s) : null, a.end = o ? e.duration(o) : null, a._recurring = !0;
            else {
                if (s && (s = I.moment(s), !s.isValid())) return !1;
                o && (o = I.moment(o), o.isValid() || (o = null)), l = i.allDay, void 0 === l && (l = B(r ? r.allDayDefault : void 0, n.allDayDefault)), S(s, o, l, a)
            }
            return a
        }

        function S(t, e, n, i) {
            i.start = t, i.end = e, i.allDay = n, b(i), Ge(i)
        }

        function b(t) {
            D(t), t.end && !t.end.isAfter(t.start) && (t.end = null), t.end || (t.end = n.forceEventDuration ? I.getDefaultEventEnd(t.allDay, t.start) : null)
        }

        function D(t) {
            null == t.allDay && (t.allDay = !(t.start.hasTime() || t.end && t.end.hasTime())), t.allDay ? (t.start.stripTime(), t.end && t.end.stripTime()) : (t.start.hasTime() || (t.start = I.rezoneDate(t.start)), t.end && !t.end.hasTime() && (t.end = I.rezoneDate(t.end)))
        }

        function C(e) {
            var n;
            return e.end || (n = e.allDay, null == n && (n = !e.start.hasTime()), e = t.extend({}, e), e.end = I.getDefaultEventEnd(n, e.start)), e
        }

        function T(e, n, i) {
            var r, s, o, l, a, u, c, d, h, f = [];
            if (n = n || W, i = i || Z, e)
                if (e._recurring) {
                    if (s = e.dow)
                        for (r = {}, o = 0; s.length > o; o++) r[s[o]] = !0;
                    for (l = n.clone().stripTime(); l.isBefore(i);)(!r || r[l.day()]) && (a = e.start, u = e.end, c = l.clone(), d = null, a && (c = c.time(a)), u && (d = l.clone().time(u)), h = t.extend({}, e), S(c, d, !a && !u, h), f.push(h)), l.add(1, "days")
                } else f.push(e);
            return f
        }

        function H(e, n, i) {
            function r(t, e) {
                return i ? k(t, e, i) : n.allDay ? R(t, e) : x(t, e)
            }
            var s, o, l, a, u, c, d = {};
            return n = n || {}, n.start || (n.start = e.start.clone()), void 0 === n.end && (n.end = e.end ? e.end.clone() : null), null == n.allDay && (n.allDay = e.allDay), b(n), s = {
                start: e._start.clone(),
                end: e._end ? e._end.clone() : I.getDefaultEventEnd(e._allDay, e._start),
                allDay: n.allDay
            }, b(s), o = null !== e._end && null === n.end, l = r(n.start, s.start), n.end ? (a = r(n.end, s.end), u = a.subtract(l)) : u = null, t.each(n, function(t, e) {
                g(t) && void 0 !== e && (d[t] = e)
            }), c = M(v(e._id), o, n.allDay, l, u, d), {
                dateDelta: l,
                durationDelta: u,
                undo: c
            }
        }

        function M(e, n, i, r, s, o) {
            var l = I.getIsAmbigTimezone(),
                a = [];
            return r && !r.valueOf() && (r = null), s && !s.valueOf() && (s = null), t.each(e, function(e, u) {
                    var c, d;
                    c = {
                        start: u.start.clone(),
                        end: u.end ? u.end.clone() : null,
                        allDay: u.allDay
                    }, t.each(o, function(t) {
                        c[t] = u[t]
                    }), d = {
                        start: u._start,
                        end: u._end,
                        allDay: i
                    }, b(d), n ? d.end = null : s && !d.end && (d.end = I.getDefaultEventEnd(d.allDay, d.start)), r && (d.start.add(r), d.end && d.end.add(r)), s && d.end.add(s), l && !d.allDay && (r || s) && (d.start.stripZone(), d.end && d.end.stripZone()), t.extend(u, o, d), Ge(u), a.push(function() {
                        t.extend(u, c), Ge(u)
                    })
                }),
                function() {
                    for (var t = 0; a.length > t; t++) a[t]()
                }
        }

        function F(e) {
            var i, r = n.businessHours,
                s = {
                    className: "fc-nonbusiness",
                    start: "09:00",
                    end: "17:00",
                    dow: [1, 2, 3, 4, 5],
                    rendering: "inverse-background"
                },
                o = I.getView();
            return r && (i = t.extend({}, s, "object" == typeof r ? r : {})), i ? (e && (i.start = null, i.end = null), T(E(i), o.start, o.end)) : []
        }

        function z(t, e) {
            var i = e.source || {},
                r = B(e.constraint, i.constraint, n.eventConstraint),
                s = B(e.overlap, i.overlap, n.eventOverlap);
            return t = C(t), P(t, r, s, e)
        }

        function G(t) {
            return P(t, n.selectConstraint, n.selectOverlap)
        }

        function _(e, n) {
            var i, r;
            return n && (i = t.extend({}, n, e), r = T(E(i))[0]), r ? z(e, r) : (e = C(e), G(e))
        }

        function P(e, n, i, r) {
            var s, o, l, a, u, c;
            if (e = t.extend({}, e), e.start = e.start.clone().stripZone(), e.end = e.end.clone().stripZone(), null != n) {
                for (s = V(n), o = !1, a = 0; s.length > a; a++)
                    if (A(s[a], e)) {
                        o = !0;
                        break
                    }
                if (!o) return !1
            }
            for (l = I.getPeerEvents(r, e), a = 0; l.length > a; a++)
                if (u = l[a], Y(u, e)) {
                    if (i === !1) return !1;
                    if ("function" == typeof i && !i(u, r)) return !1;
                    if (r) {
                        if (c = B(u.overlap, (u.source || {}).overlap), c === !1) return !1;
                        if ("function" == typeof c && !c(r, u)) return !1
                    }
                }
            return !0
        }

        function V(t) {
            return "businessHours" === t ? F() : "object" == typeof t ? T(E(t)) : v(t)
        }

        function A(t, e) {
            var n = t.start.clone().stripZone(),
                i = I.getEventEnd(t).stripZone();
            return e.start >= n && i >= e.end
        }

        function Y(t, e) {
            var n = t.start.clone().stripZone(),
                i = I.getEventEnd(t).stripZone();
            return i > e.start && e.end > n
        }
        var I = this;
        I.isFetchNeeded = i, I.fetchEvents = r, I.addEventSource = l, I.removeEventSource = u, I.updateEvent = h, I.renderEvent = p, I.removeEvents = m, I.clientEvents = v, I.mutateEvent = H, I.normalizeEventRange = b, I.normalizeEventRangeTimes = D, I.ensureVisibleEventRange = C;
        var W, Z, j = I.trigger,
            U = I.getView,
            q = I.reportEvents,
            $ = {
                events: []
            },
            X = [$],
            K = 0,
            Q = 0,
            J = 0,
            te = [];
        t.each((n.events ? [n.events] : []).concat(n.eventSources || []), function(t, e) {
            var n = a(e);
            n && X.push(n)
        }), I.getBusinessHoursEvents = F, I.isEventRangeAllowed = z, I.isSelectionRangeAllowed = G, I.isExternalDropRangeAllowed = _, I.getEventCache = function() {
            return te
        }
    }

    function Ge(t) {
        t._allDay = t.allDay, t._start = t.start.clone(), t._end = t.end ? t.end.clone() : null
    }
    var Le = t.fullCalendar = {
            version: "2.3.1"
        },
        _e = Le.views = {};
    t.fn.fullCalendar = function(e) {
        var n = Array.prototype.slice.call(arguments, 1),
            i = this;
        return this.each(function(r, s) {
            var o, l = t(s),
                a = l.data("fullCalendar");
            "string" == typeof e ? a && t.isFunction(a[e]) && (o = a[e].apply(a, n), r || (i = o), "destroy" === e && l.removeData("fullCalendar")) : a || (a = new Le.CalendarBase(l, e), l.data("fullCalendar", a), a.render())
        }), i
    };
    var Pe = ["header", "buttonText", "buttonIcons", "themeButtonIcons"];
    Le.intersectionToSeg = H, Le.applyAll = N, Le.debounce = $, Le.isInt = U, Le.htmlEscape = Y, Le.cssToStr = W, Le.proxy = q, Le.getClientRect = p, Le.getContentRect = m, Le.getScrollbarWidths = v;
    var Ve = null;
    Le.computeIntervalUnit = M, Le.durationHasTime = z;
    var Ae, Oe, Ne, Be = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        Ye = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"],
        Ie = {}.hasOwnProperty,
        We = /^\s*\d{4}-\d\d$/,
        Ze = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/,
        je = e.fn,
        Ue = t.extend({}, je);
    Le.moment = function() {
        return X(arguments)
    }, Le.moment.utc = function() {
        var t = X(arguments, !0);
        return t.hasTime() && t.utc(), t
    }, Le.moment.parseZone = function() {
        return X(arguments, !0, !0)
    }, je.clone = function() {
        var t = Ue.clone.apply(this, arguments);
        return Q(this, t), this._fullCalendar && (t._fullCalendar = !0), t
    }, je.week = je.weeks = function(t) {
        var e = (this._locale || this._lang)._fullCalendar_weekCalc;
        return null == t && "function" == typeof e ? e(this) : "ISO" === e ? Ue.isoWeek.apply(this, arguments) : Ue.week.apply(this, arguments)
    }, je.time = function(t) {
        if (!this._fullCalendar) return Ue.time.apply(this, arguments);
        if (null == t) return e.duration({
            hours: this.hours(),
            minutes: this.minutes(),
            seconds: this.seconds(),
            milliseconds: this.milliseconds()
        });
        this._ambigTime = !1, e.isDuration(t) || e.isMoment(t) || (t = e.duration(t));
        var n = 0;
        return e.isDuration(t) && (n = 24 * Math.floor(t.asDays())), this.hours(n + t.hours()).minutes(t.minutes()).seconds(t.seconds()).milliseconds(t.milliseconds())
    }, je.stripTime = function() {
        var t;
        return this._ambigTime || (t = this.toArray(), this.utc(), Oe(this, t.slice(0, 3)), this._ambigTime = !0, this._ambigZone = !0), this
    }, je.hasTime = function() {
        return !this._ambigTime
    }, je.stripZone = function() {
        var t, e;
        return this._ambigZone || (t = this.toArray(), e = this._ambigTime, this.utc(), Oe(this, t), this._ambigTime = e || !1, this._ambigZone = !0), this
    }, je.hasZone = function() {
        return !this._ambigZone
    }, je.local = function() {
        var t = this.toArray(),
            e = this._ambigZone;
        return Ue.local.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, e && Ne(this, t), this
    }, je.utc = function() {
        return Ue.utc.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, this
    }, t.each(["zone", "utcOffset"], function(t, e) {
        Ue[e] && (je[e] = function(t) {
            return null != t && (this._ambigTime = !1, this._ambigZone = !1), Ue[e].apply(this, arguments)
        })
    }), je.format = function() {
        return this._fullCalendar && arguments[0] ? ee(this, arguments[0]) : this._ambigTime ? te(this, "YYYY-MM-DD") : this._ambigZone ? te(this, "YYYY-MM-DD[T]HH:mm:ss") : Ue.format.apply(this, arguments)
    }, je.toISOString = function() {
        return this._ambigTime ? te(this, "YYYY-MM-DD") : this._ambigZone ? te(this, "YYYY-MM-DD[T]HH:mm:ss") : Ue.toISOString.apply(this, arguments)
    }, je.isWithin = function(t, e) {
        var n = K([this, t, e]);
        return n[0] >= n[1] && n[0] < n[2]
    }, je.isSame = function(t, e) {
        var n;
        return this._fullCalendar ? e ? (n = K([this, t], !0), Ue.isSame.call(n[0], n[1], e)) : (t = Le.moment.parseZone(t), Ue.isSame.call(this, t) && Boolean(this._ambigTime) === Boolean(t._ambigTime) && Boolean(this._ambigZone) === Boolean(t._ambigZone)) : Ue.isSame.apply(this, arguments)
    }, t.each(["isBefore", "isAfter"], function(t, e) {
        je[e] = function(t, n) {
            var i;
            return this._fullCalendar ? (i = K([this, t]), Ue[e].call(i[0], i[1], n)) : Ue[e].apply(this, arguments)
        }
    }), Ae = "_d" in e() && "updateOffset" in e, Oe = Ae ? function(t, n) {
        t._d.setTime(Date.UTC.apply(Date, n)), e.updateOffset(t, !1)
    } : J, Ne = Ae ? function(t, n) {
        t._d.setTime(+new Date(n[0] || 0, n[1] || 0, n[2] || 0, n[3] || 0, n[4] || 0, n[5] || 0, n[6] || 0)), e.updateOffset(t, !1)
    } : J;
    var qe = {
        t: function(t) {
            return te(t, "a").charAt(0)
        },
        T: function(t) {
            return te(t, "A").charAt(0)
        }
    };
    Le.formatRange = re;
    var $e = {
            Y: "year",
            M: "month",
            D: "day",
            d: "day",
            A: "second",
            a: "second",
            T: "second",
            t: "second",
            H: "second",
            h: "second",
            m: "second",
            s: "second"
        },
        Xe = {};
    Le.Class = ue, ue.extend = function(t) {
        var e, n = this;
        return t = t || {}, A(t, "constructor") && (e = t.constructor), "function" != typeof e && (e = t.constructor = function() {
            n.apply(this, arguments)
        }), e.prototype = _(n.prototype), P(t, e.prototype), V(t, e.prototype), P(n, e), e
    }, ue.mixin = function(t) {
        P(t.prototype || t, this.prototype)
    };
    var Ke = ue.extend({
            isHidden: !0,
            options: null,
            el: null,
            documentMousedownProxy: null,
            margin: 10,
            constructor: function(t) {
                this.options = t || {}
            },
            show: function() {
                this.isHidden && (this.el || this.render(), this.el.show(), this.position(), this.isHidden = !1, this.trigger("show"))
            },
            hide: function() {
                this.isHidden || (this.el.hide(), this.isHidden = !0, this.trigger("hide"))
            },
            render: function() {
                var e = this,
                    n = this.options;
                this.el = t('<div class="fc-popover"/>').addClass(n.className || "").css({
                    top: 0,
                    left: 0
                }).append(n.content).appendTo(n.parentEl), this.el.on("click", ".fc-close", function() {
                    e.hide()
                }), n.autoHide && t(document).on("mousedown", this.documentMousedownProxy = q(this, "documentMousedown"))
            },
            documentMousedown: function(e) {
                this.el && !t(e.target).closest(this.el).length && this.hide()
            },
            destroy: function() {
                this.hide(), this.el && (this.el.remove(), this.el = null), t(document).off("mousedown", this.documentMousedownProxy)
            },
            position: function() {
                var e, n, i, r, s, o = this.options,
                    l = this.el.offsetParent().offset(),
                    a = this.el.outerWidth(),
                    u = this.el.outerHeight(),
                    c = t(window),
                    d = f(this.el);
                r = o.top || 0, s = void 0 !== o.left ? o.left : void 0 !== o.right ? o.right - a : 0, d.is(window) || d.is(document) ? (d = c, e = 0, n = 0) : (i = d.offset(), e = i.top, n = i.left), e += c.scrollTop(), n += c.scrollLeft(), o.viewportConstrain !== !1 && (r = Math.min(r, e + d.outerHeight() - u - this.margin), r = Math.max(r, e + this.margin), s = Math.min(s, n + d.outerWidth() - a - this.margin), s = Math.max(s, n + this.margin)), this.el.css({
                    top: r - l.top,
                    left: s - l.left
                })
            },
            trigger: function(t) {
                this.options[t] && this.options[t].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        }),
        Qe = ue.extend({
            grid: null,
            rowCoords: null,
            colCoords: null,
            containerEl: null,
            bounds: null,
            constructor: function(t) {
                this.grid = t
            },
            build: function() {
                this.rowCoords = this.grid.computeRowCoords(), this.colCoords = this.grid.computeColCoords(), this.computeBounds()
            },
            clear: function() {
                this.rowCoords = null, this.colCoords = null
            },
            getCell: function(e, n) {
                var i, r, s, o = this.rowCoords,
                    l = o.length,
                    a = this.colCoords,
                    u = a.length,
                    c = null,
                    d = null;
                if (this.inBounds(e, n)) {
                    for (i = 0; l > i; i++)
                        if (r = o[i], n >= r.top && r.bottom > n) {
                            c = i;
                            break
                        }
                    for (i = 0; u > i; i++)
                        if (r = a[i], e >= r.left && r.right > e) {
                            d = i;
                            break
                        }
                    if (null !== c && null !== d) return s = this.grid.getCell(c, d), s.grid = this.grid, t.extend(s, o[c], a[d]), s
                }
                return null
            },
            computeBounds: function() {
                this.bounds = this.containerEl ? p(this.containerEl) : null
            },
            inBounds: function(t, e) {
                var n = this.bounds;
                return n ? t >= n.left && n.right > t && e >= n.top && n.bottom > e : !0
            }
        }),
        Je = ue.extend({
            coordMaps: null,
            constructor: function(t) {
                this.coordMaps = t
            },
            build: function() {
                var t, e = this.coordMaps;
                for (t = 0; e.length > t; t++) e[t].build()
            },
            getCell: function(t, e) {
                var n, i = this.coordMaps,
                    r = null;
                for (n = 0; i.length > n && !r; n++) r = i[n].getCell(t, e);
                return r
            },
            clear: function() {
                var t, e = this.coordMaps;
                for (t = 0; e.length > t; t++) e[t].clear()
            }
        }),
        tn = Le.DragListener = ue.extend({
            options: null,
            isListening: !1,
            isDragging: !1,
            originX: null,
            originY: null,
            mousemoveProxy: null,
            mouseupProxy: null,
            subjectEl: null,
            subjectHref: null,
            scrollEl: null,
            scrollBounds: null,
            scrollTopVel: null,
            scrollLeftVel: null,
            scrollIntervalId: null,
            scrollHandlerProxy: null,
            scrollSensitivity: 30,
            scrollSpeed: 200,
            scrollIntervalMs: 50,
            constructor: function(t) {
                t = t || {}, this.options = t, this.subjectEl = t.subjectEl
            },
            mousedown: function(t) {
                S(t) && (t.preventDefault(), this.startListening(t), this.options.distance || this.startDrag(t))
            },
            startListening: function(e) {
                var n;
                this.isListening || (e && this.options.scroll && (n = f(t(e.target)), n.is(window) || n.is(document) || (this.scrollEl = n, this.scrollHandlerProxy = $(q(this, "scrollHandler"), 100), this.scrollEl.on("scroll", this.scrollHandlerProxy))), t(document).on("mousemove", this.mousemoveProxy = q(this, "mousemove")).on("mouseup", this.mouseupProxy = q(this, "mouseup")).on("selectstart", this.preventDefault), e ? (this.originX = e.pageX, this.originY = e.pageY) : (this.originX = 0, this.originY = 0), this.isListening = !0, this.listenStart(e))
            },
            listenStart: function(t) {
                this.trigger("listenStart", t)
            },
            mousemove: function(t) {
                var e, n, i = t.pageX - this.originX,
                    r = t.pageY - this.originY;
                this.isDragging || (e = this.options.distance || 1, n = i * i + r * r, n >= e * e && this.startDrag(t)), this.isDragging && this.drag(i, r, t)
            },
            startDrag: function(t) {
                this.isListening || this.startListening(), this.isDragging || (this.isDragging = !0, this.dragStart(t))
            },
            dragStart: function(t) {
                var e = this.subjectEl;
                this.trigger("dragStart", t), (this.subjectHref = e ? e.attr("href") : null) && e.removeAttr("href")
            },
            drag: function(t, e, n) {
                this.trigger("drag", t, e, n), this.updateScroll(n)
            },
            mouseup: function(t) {
                this.stopListening(t)
            },
            stopDrag: function(t) {
                this.isDragging && (this.stopScrolling(), this.dragStop(t), this.isDragging = !1)
            },
            dragStop: function(t) {
                var e = this;
                this.trigger("dragStop", t), setTimeout(function() {
                    e.subjectHref && e.subjectEl.attr("href", e.subjectHref)
                }, 0)
            },
            stopListening: function(e) {
                this.stopDrag(e), this.isListening && (this.scrollEl && (this.scrollEl.off("scroll", this.scrollHandlerProxy), this.scrollHandlerProxy = null), t(document).off("mousemove", this.mousemoveProxy).off("mouseup", this.mouseupProxy).off("selectstart", this.preventDefault), this.mousemoveProxy = null, this.mouseupProxy = null, this.isListening = !1, this.listenStop(e))
            },
            listenStop: function(t) {
                this.trigger("listenStop", t)
            },
            trigger: function(t) {
                this.options[t] && this.options[t].apply(this, Array.prototype.slice.call(arguments, 1))
            },
            preventDefault: function(t) {
                t.preventDefault()
            },
            computeScrollBounds: function() {
                var t = this.scrollEl;
                this.scrollBounds = t ? g(t) : null
            },
            updateScroll: function(t) {
                var e, n, i, r, s = this.scrollSensitivity,
                    o = this.scrollBounds,
                    l = 0,
                    a = 0;
                o && (e = (s - (t.pageY - o.top)) / s, n = (s - (o.bottom - t.pageY)) / s, i = (s - (t.pageX - o.left)) / s, r = (s - (o.right - t.pageX)) / s, e >= 0 && 1 >= e ? l = -1 * e * this.scrollSpeed : n >= 0 && 1 >= n && (l = n * this.scrollSpeed), i >= 0 && 1 >= i ? a = -1 * i * this.scrollSpeed : r >= 0 && 1 >= r && (a = r * this.scrollSpeed)), this.setScrollVel(l, a)
            },
            setScrollVel: function(t, e) {
                this.scrollTopVel = t, this.scrollLeftVel = e, this.constrainScrollVel(), !this.scrollTopVel && !this.scrollLeftVel || this.scrollIntervalId || (this.scrollIntervalId = setInterval(q(this, "scrollIntervalFunc"), this.scrollIntervalMs))
            },
            constrainScrollVel: function() {
                var t = this.scrollEl;
                0 > this.scrollTopVel ? 0 >= t.scrollTop() && (this.scrollTopVel = 0) : this.scrollTopVel > 0 && t.scrollTop() + t[0].clientHeight >= t[0].scrollHeight && (this.scrollTopVel = 0), 0 > this.scrollLeftVel ? 0 >= t.scrollLeft() && (this.scrollLeftVel = 0) : this.scrollLeftVel > 0 && t.scrollLeft() + t[0].clientWidth >= t[0].scrollWidth && (this.scrollLeftVel = 0)
            },
            scrollIntervalFunc: function() {
                var t = this.scrollEl,
                    e = this.scrollIntervalMs / 1e3;
                this.scrollTopVel && t.scrollTop(t.scrollTop() + this.scrollTopVel * e), this.scrollLeftVel && t.scrollLeft(t.scrollLeft() + this.scrollLeftVel * e), this.constrainScrollVel(), this.scrollTopVel || this.scrollLeftVel || this.stopScrolling()
            },
            stopScrolling: function() {
                this.scrollIntervalId && (clearInterval(this.scrollIntervalId), this.scrollIntervalId = null, this.scrollStop())
            },
            scrollHandler: function() {
                this.scrollIntervalId || this.scrollStop()
            },
            scrollStop: function() {}
        }),
        en = tn.extend({
            coordMap: null,
            origCell: null,
            cell: null,
            coordAdjust: null,
            constructor: function(t, e) {
                tn.prototype.constructor.call(this, e), this.coordMap = t
            },
            listenStart: function(t) {
                var e, n, i, r = this.subjectEl;
                tn.prototype.listenStart.apply(this, arguments), this.computeCoords(), t ? (n = {
                    left: t.pageX,
                    top: t.pageY
                }, i = n, r && (e = g(r), i = D(i, e)), this.origCell = this.getCell(i.left, i.top), r && this.options.subjectCenter && (this.origCell && (e = b(this.origCell, e) || e), i = C(e)), this.coordAdjust = T(i, n)) : (this.origCell = null, this.coordAdjust = null)
            },
            computeCoords: function() {
                this.coordMap.build(), this.computeScrollBounds()
            },
            dragStart: function(t) {
                var e;
                tn.prototype.dragStart.apply(this, arguments), e = this.getCell(t.pageX, t.pageY), e && this.cellOver(e)
            },
            drag: function(t, e, n) {
                var i;
                tn.prototype.drag.apply(this, arguments), i = this.getCell(n.pageX, n.pageY), ce(i, this.cell) || (this.cell && this.cellOut(), i && this.cellOver(i))
            },
            dragStop: function() {
                this.cellDone(), tn.prototype.dragStop.apply(this, arguments)
            },
            cellOver: function(t) {
                this.cell = t, this.trigger("cellOver", t, ce(t, this.origCell), this.origCell)
            },
            cellOut: function() {
                this.cell && (this.trigger("cellOut", this.cell), this.cellDone(), this.cell = null)
            },
            cellDone: function() {
                this.cell && this.trigger("cellDone", this.cell)
            },
            listenStop: function() {
                tn.prototype.listenStop.apply(this, arguments), this.origCell = this.cell = null, this.coordMap.clear()
            },
            scrollStop: function() {
                tn.prototype.scrollStop.apply(this, arguments), this.computeCoords()
            },
            getCell: function(t, e) {
                return this.coordAdjust && (t += this.coordAdjust.left, e += this.coordAdjust.top), this.coordMap.getCell(t, e)
            }
        }),
        nn = ue.extend({
            options: null,
            sourceEl: null,
            el: null,
            parentEl: null,
            top0: null,
            left0: null,
            mouseY0: null,
            mouseX0: null,
            topDelta: null,
            leftDelta: null,
            mousemoveProxy: null,
            isFollowing: !1,
            isHidden: !1,
            isAnimating: !1,
            constructor: function(e, n) {
                this.options = n = n || {}, this.sourceEl = e, this.parentEl = n.parentEl ? t(n.parentEl) : e.parent()
            },
            start: function(e) {
                this.isFollowing || (this.isFollowing = !0, this.mouseY0 = e.pageY, this.mouseX0 = e.pageX, this.topDelta = 0, this.leftDelta = 0, this.isHidden || this.updatePosition(), t(document).on("mousemove", this.mousemoveProxy = q(this, "mousemove")))
            },
            stop: function(e, n) {
                function i() {
                    this.isAnimating = !1, r.destroyEl(), this.top0 = this.left0 = null, n && n()
                }
                var r = this,
                    s = this.options.revertDuration;
                this.isFollowing && !this.isAnimating && (this.isFollowing = !1, t(document).off("mousemove", this.mousemoveProxy), e && s && !this.isHidden ? (this.isAnimating = !0, this.el.animate({
                    top: this.top0,
                    left: this.left0
                }, {
                    duration: s,
                    complete: i
                })) : i())
            },
            getEl: function() {
                var t = this.el;
                return t || (this.sourceEl.width(), t = this.el = this.sourceEl.clone().css({
                    position: "absolute",
                    visibility: "",
                    display: this.isHidden ? "none" : "",
                    margin: 0,
                    right: "auto",
                    bottom: "auto",
                    width: this.sourceEl.width(),
                    height: this.sourceEl.height(),
                    opacity: this.options.opacity || "",
                    zIndex: this.options.zIndex
                }).appendTo(this.parentEl)), t
            },
            destroyEl: function() {
                this.el && (this.el.remove(), this.el = null)
            },
            updatePosition: function() {
                var t, e;
                this.getEl(), null === this.top0 && (this.sourceEl.width(), t = this.sourceEl.offset(), e = this.el.offsetParent().offset(), this.top0 = t.top - e.top, this.left0 = t.left - e.left), this.el.css({
                    top: this.top0 + this.topDelta,
                    left: this.left0 + this.leftDelta
                })
            },
            mousemove: function(t) {
                this.topDelta = t.pageY - this.mouseY0, this.leftDelta = t.pageX - this.mouseX0, this.isHidden || this.updatePosition()
            },
            hide: function() {
                this.isHidden || (this.isHidden = !0, this.el && this.el.hide())
            },
            show: function() {
                this.isHidden && (this.isHidden = !1, this.updatePosition(), this.getEl().show())
            }
        }),
        rn = ue.extend({
            view: null,
            isRTL: null,
            cellHtml: "<td/>",
            constructor: function(t) {
                this.view = t, this.isRTL = t.opt("isRTL")
            },
            rowHtml: function(t, e) {
                var n, i, r = this.getHtmlRenderer("cell", t),
                    s = "";
                for (e = e || 0, n = 0; this.colCnt > n; n++) i = this.getCell(e, n), s += r(i);
                return s = this.bookendCells(s, t, e), "<tr>" + s + "</tr>"
            },
            bookendCells: function(t, e, n) {
                var i = this.getHtmlRenderer("intro", e)(n || 0),
                    r = this.getHtmlRenderer("outro", e)(n || 0),
                    s = this.isRTL ? r : i,
                    o = this.isRTL ? i : r;
                return "string" == typeof t ? s + t + o : t.prepend(s).append(o)
            },
            getHtmlRenderer: function(t, e) {
                var n, i, r, s, o = this.view;
                return n = t + "Html", e && (i = e + Z(t) + "Html"), i && (s = o[i]) ? r = o : i && (s = this[i]) ? r = this : (s = o[n]) ? r = o : (s = this[n]) && (r = this), "function" == typeof s ? function() {
                    return s.apply(r, arguments) || ""
                } : function() {
                    return s || ""
                }
            }
        }),
        sn = Le.Grid = rn.extend({
            start: null,
            end: null,
            rowCnt: 0,
            colCnt: 0,
            rowData: null,
            colData: null,
            el: null,
            coordMap: null,
            elsByFill: null,
            externalDragStartProxy: null,
            colHeadFormat: null,
            eventTimeFormat: null,
            displayEventTime: null,
            displayEventEnd: null,
            cellDuration: null,
            largeUnit: null,
            constructor: function() {
                rn.apply(this, arguments), this.coordMap = new Qe(this), this.elsByFill = {}, this.externalDragStartProxy = q(this, "externalDragStart")
            },
            computeColHeadFormat: function() {},
            computeEventTimeFormat: function() {
                return this.view.opt("smallTimeFormat")
            },
            computeDisplayEventTime: function() {
                return !0
            },
            computeDisplayEventEnd: function() {
                return !0
            },
            setRange: function(t) {
                var e, n, i = this.view;
                this.start = t.start.clone(), this.end = t.end.clone(), this.rowData = [], this.colData = [], this.updateCells(), this.colHeadFormat = i.opt("columnFormat") || this.computeColHeadFormat(), this.eventTimeFormat = i.opt("eventTimeFormat") || i.opt("timeFormat") || this.computeEventTimeFormat(), e = i.opt("displayEventTime"), null == e && (e = this.computeDisplayEventTime()), n = i.opt("displayEventEnd"), null == n && (n = this.computeDisplayEventEnd()), this.displayEventTime = e, this.displayEventEnd = n
            },
            updateCells: function() {},
            rangeToSegs: function() {},
            diffDates: function(t, e) {
                return this.largeUnit ? k(t, e, this.largeUnit) : x(t, e)
            },
            getCell: function(e, n) {
                var i;
                return null == n && ("number" == typeof e ? (n = e % this.colCnt, e = Math.floor(e / this.colCnt)) : (n = e.col, e = e.row)), i = {
                    row: e,
                    col: n
                }, t.extend(i, this.getRowData(e), this.getColData(n)), t.extend(i, this.computeCellRange(i)), i
            },
            computeCellRange: function(t) {
                var e = this.computeCellDate(t);
                return {
                    start: e,
                    end: e.clone().add(this.cellDuration)
                }
            },
            computeCellDate: function() {},
            getRowData: function(t) {
                return this.rowData[t] || {}
            },
            getColData: function(t) {
                return this.colData[t] || {}
            },
            getRowEl: function() {},
            getColEl: function() {},
            getCellDayEl: function(t) {
                return this.getColEl(t.col) || this.getRowEl(t.row)
            },
            computeRowCoords: function() {
                var t, e, n, i = [];
                for (t = 0; this.rowCnt > t; t++) e = this.getRowEl(t), n = e.offset().top, i.push({
                    top: n,
                    bottom: n + e.outerHeight()
                });
                return i
            },
            computeColCoords: function() {
                var t, e, n, i = [];
                for (t = 0; this.colCnt > t; t++) e = this.getColEl(t), n = e.offset().left, i.push({
                    left: n,
                    right: n + e.outerWidth()
                });
                return i
            },
            setElement: function(e) {
                var n = this;
                this.el = e, e.on("mousedown", function(e) {
                    t(e.target).is(".fc-event-container *, .fc-more") || t(e.target).closest(".fc-popover").length || n.dayMousedown(e)
                }), this.bindSegHandlers(), this.bindGlobalHandlers()
            },
            removeElement: function() {
                this.unbindGlobalHandlers(), this.el.remove()
            },
            renderSkeleton: function() {},
            renderDates: function() {},
            destroyDates: function() {},
            bindGlobalHandlers: function() {
                t(document).on("dragstart sortstart", this.externalDragStartProxy)
            },
            unbindGlobalHandlers: function() {
                t(document).off("dragstart sortstart", this.externalDragStartProxy)
            },
            dayMousedown: function(t) {
                var e, n, i = this,
                    r = this.view,
                    s = r.opt("selectable"),
                    a = new en(this.coordMap, {
                        scroll: r.opt("dragScroll"),
                        dragStart: function() {
                            r.unselect()
                        },
                        cellOver: function(t, r, l) {
                            l && (e = r ? t : null, s && (n = i.computeSelection(l, t), n ? i.renderSelection(n) : o()))
                        },
                        cellOut: function() {
                            e = null, n = null, i.destroySelection(), l()
                        },
                        listenStop: function(t) {
                            e && r.trigger("dayClick", i.getCellDayEl(e), e.start, t), n && r.reportSelection(n, t), l()
                        }
                    });
                a.mousedown(t)
            },
            renderRangeHelper: function(t, e) {
                var n = this.fabricateHelperEvent(t, e);
                this.renderHelper(n, e)
            },
            fabricateHelperEvent: function(t, e) {
                var n = e ? _(e.event) : {};
                return n.start = t.start.clone(), n.end = t.end ? t.end.clone() : null, n.allDay = null, this.view.calendar.normalizeEventRange(n), n.className = (n.className || []).concat("fc-helper"), e || (n.editable = !1), n
            },
            renderHelper: function() {},
            destroyHelper: function() {},
            renderSelection: function(t) {
                this.renderHighlight(t)
            },
            destroySelection: function() {
                this.destroyHighlight()
            },
            computeSelection: function(t, e) {
                var n, i = [t.start, t.end, e.start, e.end];
                return i.sort(j), n = {
                    start: i[0].clone(),
                    end: i[3].clone()
                }, this.view.calendar.isSelectionRangeAllowed(n) ? n : null
            },
            renderHighlight: function(t) {
                this.renderFill("highlight", this.rangeToSegs(t))
            },
            destroyHighlight: function() {
                this.destroyFill("highlight")
            },
            highlightSegClasses: function() {
                return ["fc-highlight"]
            },
            renderFill: function() {},
            destroyFill: function(t) {
                var e = this.elsByFill[t];
                e && (e.remove(), delete this.elsByFill[t])
            },
            renderFillSegEls: function(e, n) {
                var i, r = this,
                    s = this[e + "SegEl"],
                    o = "",
                    l = [];
                if (n.length) {
                    for (i = 0; n.length > i; i++) o += this.fillSegHtml(e, n[i]);
                    t(o).each(function(e, i) {
                        var o = n[e],
                            a = t(i);
                        s && (a = s.call(r, o, a)), a && (a = t(a), a.is(r.fillSegTag) && (o.el = a, l.push(o)))
                    })
                }
                return l
            },
            fillSegTag: "div",
            fillSegHtml: function(t, e) {
                var n = this[t + "SegClasses"],
                    i = this[t + "SegCss"],
                    r = n ? n.call(this, e) : [],
                    s = W(i ? i.call(this, e) : {});
                return "<" + this.fillSegTag + (r.length ? ' class="' + r.join(" ") + '"' : "") + (s ? ' style="' + s + '"' : "") + " />"
            },
            headHtml: function() {
                return '<div class="fc-row ' + this.view.widgetHeaderClass + '">' + "<table>" + "<thead>" + this.rowHtml("head") + "</thead>" + "</table>" + "</div>"
            },
            headCellHtml: function(t) {
                var e = this.view,
                    n = t.start;
                return '<th class="fc-day-header ' + e.widgetHeaderClass + " fc-" + Be[n.day()] + '">' + Y(n.format(this.colHeadFormat)) + "</th>"
            },
            bgCellHtml: function(t) {
                var e = this.view,
                    n = t.start,
                    i = this.getDayClasses(n);
                return i.unshift("fc-day", e.widgetContentClass), '<td class="' + i.join(" ") + '"' + ' data-date="' + n.format("YYYY-MM-DD") + '"' + "></td>"
            },
            getDayClasses: function(t) {
                var e = this.view,
                    n = e.calendar.getNow().stripTime(),
                    i = ["fc-" + Be[t.day()]];
                return 1 == e.intervalDuration.as("months") && t.month() != e.intervalStart.month() && i.push("fc-other-month"), t.isSame(n, "day") ? i.push("fc-today", e.highlightStateClass) : n > t ? i.push("fc-past") : i.push("fc-future"), i
            }
        });
    sn.mixin({
        mousedOverSeg: null,
        isDraggingSeg: !1,
        isResizingSeg: !1,
        isDraggingExternal: !1,
        segs: null,
        renderEvents: function(t) {
            var e, n, i = this.eventsToSegs(t),
                r = [],
                s = [];
            for (e = 0; i.length > e; e++) n = i[e], de(n.event) ? r.push(n) : s.push(n);
            r = this.renderBgSegs(r) || r, s = this.renderFgSegs(s) || s, this.segs = r.concat(s)
        },
        destroyEvents: function() {
            this.triggerSegMouseout(), this.destroyFgSegs(), this.destroyBgSegs(), this.segs = null
        },
        getEventSegs: function() {
            return this.segs || []
        },
        renderFgSegs: function() {},
        destroyFgSegs: function() {},
        renderFgSegEls: function(e, n) {
            var i, r = this.view,
                s = "",
                o = [];
            if (e.length) {
                for (i = 0; e.length > i; i++) s += this.fgSegHtml(e[i], n);
                t(s).each(function(n, i) {
                    var s = e[n],
                        l = r.resolveEventEl(s.event, t(i));
                    l && (l.data("fc-seg", s), s.el = l, o.push(s))
                })
            }
            return o
        },
        fgSegHtml: function() {},
        renderBgSegs: function(t) {
            return this.renderFill("bgEvent", t)
        },
        destroyBgSegs: function() {
            this.destroyFill("bgEvent")
        },
        bgEventSegEl: function(t, e) {
            return this.view.resolveEventEl(t.event, e)
        },
        bgEventSegClasses: function(t) {
            var e = t.event,
                n = e.source || {};
            return ["fc-bgevent"].concat(e.className, n.className || [])
        },
        bgEventSegCss: function(t) {
            var e = this.view,
                n = t.event,
                i = n.source || {};
            return {
                "background-color": n.backgroundColor || n.color || i.backgroundColor || i.color || e.opt("eventBackgroundColor") || e.opt("eventColor")
            }
        },
        businessHoursSegClasses: function() {
            return ["fc-nonbusiness", "fc-bgevent"]
        },
        bindSegHandlers: function() {
            var e = this,
                n = this.view;
            t.each({
                mouseenter: function(t, n) {
                    e.triggerSegMouseover(t, n)
                },
                mouseleave: function(t, n) {
                    e.triggerSegMouseout(t, n)
                },
                click: function(t, e) {
                    return n.trigger("eventClick", this, t.event, e)
                },
                mousedown: function(i, r) {
                    t(r.target).is(".fc-resizer") && n.isEventResizable(i.event) ? e.segResizeMousedown(i, r, t(r.target).is(".fc-start-resizer")) : n.isEventDraggable(i.event) && e.segDragMousedown(i, r)
                }
            }, function(n, i) {
                e.el.on(n, ".fc-event-container > *", function(n) {
                    var r = t(this).data("fc-seg");
                    return !r || e.isDraggingSeg || e.isResizingSeg ? void 0 : i.call(this, r, n)
                })
            })
        },
        triggerSegMouseover: function(t, e) {
            this.mousedOverSeg || (this.mousedOverSeg = t, this.view.trigger("eventMouseover", t.el[0], t.event, e))
        },
        triggerSegMouseout: function(t, e) {
            e = e || {}, this.mousedOverSeg && (t = t || this.mousedOverSeg, this.mousedOverSeg = null, this.view.trigger("eventMouseout", t.el[0], t.event, e))
        },
        segDragMousedown: function(t, e) {
            var n, i = this,
                r = this.view,
                s = r.calendar,
                a = t.el,
                u = t.event,
                c = new nn(t.el, {
                    parentEl: r.el,
                    opacity: r.opt("dragOpacity"),
                    revertDuration: r.opt("dragRevertDuration"),
                    zIndex: 2
                }),
                d = new en(r.coordMap, {
                    distance: 5,
                    scroll: r.opt("dragScroll"),
                    subjectEl: a,
                    subjectCenter: !0,
                    listenStart: function(t) {
                        c.hide(), c.start(t)
                    },
                    dragStart: function(e) {
                        i.triggerSegMouseout(t, e), i.segDragStart(t, e), r.hideEvent(u)
                    },
                    cellOver: function(e, l, a) {
                        t.cell && (a = t.cell), n = i.computeEventDrop(a, e, u), n && !s.isEventRangeAllowed(n, u) && (o(), n = null), n && r.renderDrag(n, t) ? c.hide() : c.show(), l && (n = null)
                    },
                    cellOut: function() {
                        r.destroyDrag(), c.show(), n = null
                    },
                    cellDone: function() {
                        l()
                    },
                    dragStop: function(e) {
                        c.stop(!n, function() {
                            r.destroyDrag(), r.showEvent(u), i.segDragStop(t, e), n && r.reportEventDrop(u, n, this.largeUnit, a, e)
                        })
                    },
                    listenStop: function() {
                        c.stop()
                    }
                });
            d.mousedown(e)
        },
        segDragStart: function(t, e) {
            this.isDraggingSeg = !0, this.view.trigger("eventDragStart", t.el[0], t.event, e, {})
        },
        segDragStop: function(t, e) {
            this.isDraggingSeg = !1, this.view.trigger("eventDragStop", t.el[0], t.event, e, {})
        },
        computeEventDrop: function(t, e, n) {
            var i, r, s = this.view.calendar,
                o = t.start,
                l = e.start;
            return o.hasTime() === l.hasTime() ? (i = this.diffDates(l, o), n.allDay && z(i) ? (r = {
                start: n.start.clone(),
                end: s.getEventEnd(n),
                allDay: !1
            }, s.normalizeEventRangeTimes(r)) : r = {
                start: n.start.clone(),
                end: n.end ? n.end.clone() : null,
                allDay: n.allDay
            }, r.start.add(i), r.end && r.end.add(i)) : r = {
                start: l.clone(),
                end: null,
                allDay: !l.hasTime()
            }, r
        },
        applyDragOpacity: function(t) {
            var e = this.view.opt("dragOpacity");
            null != e && t.each(function(t, n) {
                n.style.opacity = e
            })
        },
        externalDragStart: function(e, n) {
            var i, r, s = this.view;
            s.opt("droppable") && (i = t((n ? n.item : null) || e.target), r = s.opt("dropAccept"), (t.isFunction(r) ? r.call(i[0], i) : i.is(r)) && (this.isDraggingExternal || this.listenToExternalDrag(i, e, n)))
        },
        listenToExternalDrag: function(t, e, n) {
            var i, r, s = this,
                a = ve(t);
            i = new en(this.coordMap, {
                listenStart: function() {
                    s.isDraggingExternal = !0
                },
                cellOver: function(t) {
                    r = s.computeExternalDrop(t, a), r ? s.renderDrag(r) : o()
                },
                cellOut: function() {
                    r = null, s.destroyDrag(), l()
                },
                dragStop: function() {
                    s.destroyDrag(), l(), r && s.view.reportExternalDrop(a, r, t, e, n)
                },
                listenStop: function() {
                    s.isDraggingExternal = !1
                }
            }), i.startDrag(e)
        },
        computeExternalDrop: function(t, e) {
            var n = {
                start: t.start.clone(),
                end: null
            };
            return e.startTime && !n.start.hasTime() && n.start.time(e.startTime), e.duration && (n.end = n.start.clone().add(e.duration)), this.view.calendar.isExternalDropRangeAllowed(n, e.eventProps) ? n : null
        },
        renderDrag: function() {},
        destroyDrag: function() {},
        segResizeMousedown: function(t, e, n) {
            var i, r, s = this,
                a = this.view,
                u = a.calendar,
                c = t.el,
                d = t.event,
                h = u.getEventEnd(d);
            i = new en(this.coordMap, {
                distance: 5,
                scroll: a.opt("dragScroll"),
                subjectEl: c,
                dragStart: function(e) {
                    s.triggerSegMouseout(t, e), s.segResizeStart(t, e)
                },
                cellOver: function(e, i, l) {
                    r = n ? s.computeEventStartResize(l, e, d) : s.computeEventEndResize(l, e, d), r && (u.isEventRangeAllowed(r, d) ? r.start.isSame(d.start) && r.end.isSame(h) && (r = null) : (o(), r = null)), r && (a.hideEvent(d), s.renderEventResize(r, t))
                },
                cellOut: function() {
                    r = null
                },
                cellDone: function() {
                    s.destroyEventResize(), a.showEvent(d), l()
                },
                dragStop: function(e) {
                    s.segResizeStop(t, e), r && a.reportEventResize(d, r, this.largeUnit, c, e)
                }
            }), i.mousedown(e)
        },
        segResizeStart: function(t, e) {
            this.isResizingSeg = !0, this.view.trigger("eventResizeStart", t.el[0], t.event, e, {})
        },
        segResizeStop: function(t, e) {
            this.isResizingSeg = !1, this.view.trigger("eventResizeStop", t.el[0], t.event, e, {})
        },
        computeEventStartResize: function(t, e, n) {
            return this.computeEventResize("start", t, e, n)
        },
        computeEventEndResize: function(t, e, n) {
            return this.computeEventResize("end", t, e, n)
        },
        computeEventResize: function(t, e, n, i) {
            var r, s, o = this.view.calendar,
                l = this.diffDates(n[t], e[t]);
            return r = {
                start: i.start.clone(),
                end: o.getEventEnd(i),
                allDay: i.allDay
            }, r.allDay && z(l) && (r.allDay = !1, o.normalizeEventRangeTimes(r)), r[t].add(l), r.start.isBefore(r.end) || (s = i.allDay ? o.defaultAllDayEventDuration : o.defaultTimedEventDuration, this.cellDuration && s > this.cellDuration && (s = this.cellDuration), "start" == t ? r.start = r.end.clone().subtract(s) : r.end = r.start.clone().add(s)), r
        },
        renderEventResize: function() {},
        destroyEventResize: function() {},
        getEventTimeText: function(t, e, n) {
            return null == e && (e = this.eventTimeFormat), null == n && (n = this.displayEventEnd), this.displayEventTime && t.start.hasTime() ? n && t.end ? this.view.formatRange(t, e) : t.start.format(e) : ""
        },
        getSegClasses: function(t, e, n) {
            var i = t.event,
                r = ["fc-event", t.isStart ? "fc-start" : "fc-not-start", t.isEnd ? "fc-end" : "fc-not-end"].concat(i.className, i.source ? i.source.className : []);
            return e && r.push("fc-draggable"), n && r.push("fc-resizable"), r
        },
        getEventSkinCss: function(t) {
            var e = this.view,
                n = t.source || {},
                i = t.color,
                r = n.color,
                s = e.opt("eventColor");
            return {
                "background-color": t.backgroundColor || i || n.backgroundColor || r || e.opt("eventBackgroundColor") || s,
                "border-color": t.borderColor || i || n.borderColor || r || e.opt("eventBorderColor") || s,
                color: t.textColor || n.textColor || e.opt("eventTextColor")
            }
        },
        eventsToSegs: function(t, e) {
            var n, i = this.eventsToRanges(t),
                r = [];
            for (n = 0; i.length > n; n++) r.push.apply(r, this.eventRangeToSegs(i[n], e));
            return r
        },
        eventsToRanges: function(e) {
            var n = this,
                i = ge(e),
                r = [];
            return t.each(i, function(t, e) {
                e.length && r.push.apply(r, he(e[0]) ? n.eventsToInverseRanges(e) : n.eventsToNormalRanges(e))
            }), r
        },
        eventsToNormalRanges: function(t) {
            var e, n, i, r, s = this.view.calendar,
                o = [];
            for (e = 0; t.length > e; e++) n = t[e], i = n.start.clone().stripZone(), r = s.getEventEnd(n).stripZone(), o.push({
                event: n,
                start: i,
                end: r,
                eventStartMS: +i,
                eventDurationMS: r - i
            });
            return o
        },
        eventsToInverseRanges: function(t) {
            var e, n, i = this.view,
                r = i.start.clone().stripZone(),
                s = i.end.clone().stripZone(),
                o = this.eventsToNormalRanges(t),
                l = [],
                a = t[0],
                u = r;
            for (o.sort(pe), e = 0; o.length > e; e++) n = o[e], n.start > u && l.push({
                event: a,
                start: u,
                end: n.start
            }), u = n.end;
            return s > u && l.push({
                event: a,
                start: u,
                end: s
            }), l
        },
        eventRangeToSegs: function(t, e) {
            var n, i, r;
            for (n = e ? e(t) : this.rangeToSegs(t), i = 0; n.length > i; i++) r = n[i], r.event = t.event, r.eventStartMS = t.eventStartMS, r.eventDurationMS = t.eventDurationMS;
            return n
        }
    }), Le.compareSegs = me, Le.dataAttrPrefix = "";
    var on = sn.extend({
        numbersVisible: !1,
        bottomCoordPadding: 0,
        breakOnWeeks: null,
        cellDates: null,
        dayToCellOffsets: null,
        rowEls: null,
        dayEls: null,
        helperEls: null,
        constructor: function() {
            sn.apply(this, arguments), this.cellDuration = e.duration(1, "day")
        },
        renderDates: function(t) {
            var e, n, i, r = this.view,
                s = this.rowCnt,
                o = this.colCnt,
                l = s * o,
                a = "";
            for (e = 0; s > e; e++) a += this.dayRowHtml(e, t);
            for (this.el.html(a), this.rowEls = this.el.find(".fc-row"), this.dayEls = this.el.find(".fc-day"), n = 0; l > n; n++) i = this.getCell(n), r.trigger("dayRender", null, i.start, this.dayEls.eq(n))
        },
        destroyDates: function() {
            this.destroySegPopover()
        },
        renderBusinessHours: function() {
            var t = this.view.calendar.getBusinessHoursEvents(!0),
                e = this.eventsToSegs(t);
            this.renderFill("businessHours", e, "bgevent")
        },
        dayRowHtml: function(t, e) {
            var n = this.view,
                i = ["fc-row", "fc-week", n.widgetContentClass];
            return e && i.push("fc-rigid"), '<div class="' + i.join(" ") + '">' + '<div class="fc-bg">' + "<table>" + this.rowHtml("day", t) + "</table>" + "</div>" + '<div class="fc-content-skeleton">' + "<table>" + (this.numbersVisible ? "<thead>" + this.rowHtml("number", t) + "</thead>" : "") + "</table>" + "</div>" + "</div>"
        },
        dayCellHtml: function(t) {
            return this.bgCellHtml(t)
        },
        computeColHeadFormat: function() {
            return this.rowCnt > 1 ? "ddd" : this.colCnt > 1 ? this.view.opt("dayOfMonthFormat") : "dddd"
        },
        computeEventTimeFormat: function() {
            return this.view.opt("extraSmallTimeFormat")
        },
        computeDisplayEventEnd: function() {
            return 1 == this.colCnt
        },
        updateCells: function() {
            var t, e, n, i;
            if (this.updateCellDates(), t = this.cellDates, this.breakOnWeeks) {
                for (e = t[0].day(), i = 1; t.length > i && t[i].day() != e; i++);
                n = Math.ceil(t.length / i)
            } else n = 1, i = t.length;
            this.rowCnt = n, this.colCnt = i
        },
        updateCellDates: function() {
            for (var t = this.view, e = this.start.clone(), n = [], i = -1, r = []; e.isBefore(this.end);) t.isHiddenDay(e) ? r.push(i + .5) : (i++, r.push(i), n.push(e.clone())), e.add(1, "days");
            this.cellDates = n, this.dayToCellOffsets = r
        },
        computeCellDate: function(t) {
            var e = this.colCnt,
                n = t.row * e + (this.isRTL ? e - t.col - 1 : t.col);
            return this.cellDates[n].clone()
        },
        getRowEl: function(t) {
            return this.rowEls.eq(t)
        },
        getColEl: function(t) {
            return this.dayEls.eq(t)
        },
        getCellDayEl: function(t) {
            return this.dayEls.eq(t.row * this.colCnt + t.col)
        },
        computeRowCoords: function() {
            var t = sn.prototype.computeRowCoords.call(this);
            return t[t.length - 1].bottom += this.bottomCoordPadding, t
        },
        rangeToSegs: function(t) {
            var e, n, i, r, s, o, l, a, u, c, d = this.isRTL,
                h = this.rowCnt,
                f = this.colCnt,
                g = [];
            for (t = this.view.computeDayRange(t), e = this.dateToCellOffset(t.start), n = this.dateToCellOffset(t.end.subtract(1, "days")), i = 0; h > i; i++) r = i * f, s = r + f - 1, a = Math.max(r, e), u = Math.min(s, n), a = Math.ceil(a), u = Math.floor(u), u >= a && (o = a === e, l = u === n, a -= r, u -= r, c = {
                row: i,
                isStart: o,
                isEnd: l
            }, d ? (c.leftCol = f - u - 1, c.rightCol = f - a - 1) : (c.leftCol = a, c.rightCol = u), g.push(c));
            return g
        },
        dateToCellOffset: function(t) {
            var e = this.dayToCellOffsets,
                n = t.diff(this.start, "days");
            return 0 > n ? e[0] - 1 : n >= e.length ? e[e.length - 1] + 1 : e[n]
        },
        renderDrag: function(t, e) {
            return this.renderHighlight(this.view.calendar.ensureVisibleEventRange(t)), e && !e.el.closest(this.el).length ? (this.renderRangeHelper(t, e), this.applyDragOpacity(this.helperEls), !0) : void 0
        },
        destroyDrag: function() {
            this.destroyHighlight(), this.destroyHelper()
        },
        renderEventResize: function(t, e) {
            this.renderHighlight(t), this.renderRangeHelper(t, e)
        },
        destroyEventResize: function() {
            this.destroyHighlight(), this.destroyHelper()
        },
        renderHelper: function(e, n) {
            var i, r = [],
                s = this.eventsToSegs([e]);
            s = this.renderFgSegEls(s), i = this.renderSegRows(s), this.rowEls.each(function(e, s) {
                var o, l = t(s),
                    a = t('<div class="fc-helper-skeleton"><table/></div>');
                o = n && n.row === e ? n.el.position().top : l.find(".fc-content-skeleton tbody").position().top, a.css("top", o).find("table").append(i[e].tbodyEl), l.append(a), r.push(a[0])
            }), this.helperEls = t(r)
        },
        destroyHelper: function() {
            this.helperEls && (this.helperEls.remove(), this.helperEls = null)
        },
        fillSegTag: "td",
        renderFill: function(e, n, i) {
            var r, s, o, l = [];
            for (n = this.renderFillSegEls(e, n), r = 0; n.length > r; r++) s = n[r], o = this.renderFillRow(e, s, i), this.rowEls.eq(s.row).append(o), l.push(o[0]);
            return this.elsByFill[e] = t(l), n
        },
        renderFillRow: function(e, n, i) {
            var r, s, o = this.colCnt,
                l = n.leftCol,
                a = n.rightCol + 1;
            return i = i || e.toLowerCase(), r = t('<div class="fc-' + i + '-skeleton">' + "<table><tr/></table>" + "</div>"), s = r.find("tr"), l > 0 && s.append('<td colspan="' + l + '"/>'), s.append(n.el.attr("colspan", a - l)), o > a && s.append('<td colspan="' + (o - a) + '"/>'), this.bookendCells(s, e), r
        }
    });
    on.mixin({
        rowStructs: null,
        destroyEvents: function() {
            this.destroySegPopover(), sn.prototype.destroyEvents.apply(this, arguments)
        },
        getEventSegs: function() {
            return sn.prototype.getEventSegs.call(this).concat(this.popoverSegs || [])
        },
        renderBgSegs: function(e) {
            var n = t.grep(e, function(t) {
                return t.event.allDay
            });
            return sn.prototype.renderBgSegs.call(this, n)
        },
        renderFgSegs: function(e) {
            var n;
            return e = this.renderFgSegEls(e), n = this.rowStructs = this.renderSegRows(e), this.rowEls.each(function(e, i) {
                t(i).find(".fc-content-skeleton > table").append(n[e].tbodyEl)
            }), e
        },
        destroyFgSegs: function() {
            for (var t, e = this.rowStructs || []; t = e.pop();) t.tbodyEl.remove();
            this.rowStructs = null
        },
        renderSegRows: function(t) {
            var e, n, i = [];
            for (e = this.groupSegRows(t), n = 0; e.length > n; n++) i.push(this.renderSegRow(n, e[n]));
            return i
        },
        fgSegHtml: function(t, e) {
            var n, i, r = this.view,
                s = t.event,
                o = r.isEventDraggable(s),
                l = !e && s.allDay && t.isStart && r.isEventResizableFromStart(s),
                a = !e && s.allDay && t.isEnd && r.isEventResizableFromEnd(s),
                u = this.getSegClasses(t, o, l || a),
                c = W(this.getEventSkinCss(s)),
                d = "";
            return u.unshift("fc-day-grid-event", "fc-h-event"), t.isStart && (n = this.getEventTimeText(s), n && (d = '<span class="fc-time">' + Y(n) + "</span>")), i = '<span class="fc-title">' + (Y(s.title || "") || "&nbsp;") + "</span>", '<a class="' + u.join(" ") + '"' + (s.url ? ' href="' + Y(s.url) + '"' : "") + (c ? ' style="' + c + '"' : "") + ">" + '<div class="fc-content">' + (this.isRTL ? i + " " + d : d + " " + i) + "</div>" + (l ? '<div class="fc-resizer fc-start-resizer" />' : "") + (a ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
        },
        renderSegRow: function(e, n) {
            function i(e) {
                for (; e > o;) c = (v[r - 1] || [])[o], c ? c.attr("rowspan", parseInt(c.attr("rowspan") || 1, 10) + 1) : (c = t("<td/>"), l.append(c)), m[r][o] = c, v[r][o] = c, o++
            }
            var r, s, o, l, a, u, c, d = this.colCnt,
                h = this.buildSegLevels(n),
                f = Math.max(1, h.length),
                g = t("<tbody/>"),
                p = [],
                m = [],
                v = [];
            for (r = 0; f > r; r++) {
                if (s = h[r], o = 0, l = t("<tr/>"), p.push([]), m.push([]), v.push([]), s)
                    for (a = 0; s.length > a; a++) {
                        for (u = s[a], i(u.leftCol), c = t('<td class="fc-event-container"/>').append(u.el), u.leftCol != u.rightCol ? c.attr("colspan", u.rightCol - u.leftCol + 1) : v[r][o] = c; u.rightCol >= o;) m[r][o] = c, p[r][o] = u, o++;
                        l.append(c)
                    }
                i(d), this.bookendCells(l, "eventSkeleton"), g.append(l)
            }
            return {
                row: e,
                tbodyEl: g,
                cellMatrix: m,
                segMatrix: p,
                segLevels: h,
                segs: n
            }
        },
        buildSegLevels: function(t) {
            var e, n, i, r = [];
            for (t.sort(me), e = 0; t.length > e; e++) {
                for (n = t[e], i = 0; r.length > i && ye(n, r[i]); i++);
                n.level = i, (r[i] || (r[i] = [])).push(n)
            }
            for (i = 0; r.length > i; i++) r[i].sort(we);
            return r
        },
        groupSegRows: function(t) {
            var e, n = [];
            for (e = 0; this.rowCnt > e; e++) n.push([]);
            for (e = 0; t.length > e; e++) n[t[e].row].push(t[e]);
            return n
        }
    }), on.mixin({
        segPopover: null,
        popoverSegs: null,
        destroySegPopover: function() {
            this.segPopover && this.segPopover.hide()
        },
        limitRows: function(t) {
            var e, n, i = this.rowStructs || [];
            for (e = 0; i.length > e; e++) this.unlimitRow(e), n = t ? "number" == typeof t ? t : this.computeRowLevelLimit(e) : !1, n !== !1 && this.limitRow(e, n)
        },
        computeRowLevelLimit: function(e) {
            function n(e, n) {
                s = Math.max(s, t(n).outerHeight())
            }
            var i, r, s, o = this.rowEls.eq(e),
                l = o.height(),
                a = this.rowStructs[e].tbodyEl.children();
            for (i = 0; a.length > i; i++)
                if (r = a.eq(i).removeClass("fc-limited"), s = 0, r.find("> td > :first-child").each(n), r.position().top + s > l) return i;
            return !1
        },
        limitRow: function(e, n) {
            function i(i) {
                for (; i > D;) r = E.getCell(e, D), c = E.getCellSegs(r, n), c.length && (f = o[n - 1][D], w = E.renderMoreLink(r, c), y = t("<div/>").append(w), f.append(y), b.push(y[0])), D++
            }
            var r, s, o, l, a, u, c, d, h, f, g, p, m, v, y, w, E = this,
                S = this.rowStructs[e],
                b = [],
                D = 0;
            if (n && S.segLevels.length > n) {
                for (s = S.segLevels[n - 1], o = S.cellMatrix, l = S.tbodyEl.children().slice(n).addClass("fc-limited").get(), a = 0; s.length > a; a++) {
                    for (u = s[a], i(u.leftCol), h = [], d = 0; u.rightCol >= D;) r = this.getCell(e, D), c = this.getCellSegs(r, n), h.push(c), d += c.length, D++;
                    if (d) {
                        for (f = o[n - 1][u.leftCol], g = f.attr("rowspan") || 1, p = [], m = 0; h.length > m; m++) v = t('<td class="fc-more-cell"/>').attr("rowspan", g), c = h[m], r = this.getCell(e, u.leftCol + m), w = this.renderMoreLink(r, [u].concat(c)), y = t("<div/>").append(w), v.append(y), p.push(v[0]), b.push(v[0]);
                        f.addClass("fc-limited").after(t(p)), l.push(f[0])
                    }
                }
                i(this.colCnt), S.moreEls = t(b), S.limitedEls = t(l)
            }
        },
        unlimitRow: function(t) {
            var e = this.rowStructs[t];
            e.moreEls && (e.moreEls.remove(), e.moreEls = null), e.limitedEls && (e.limitedEls.removeClass("fc-limited"), e.limitedEls = null)
        },
        renderMoreLink: function(e, n) {
            var i = this,
                r = this.view;
            return t('<a class="fc-more"/>').text(this.getMoreLinkText(n.length)).on("click", function(s) {
                var o = r.opt("eventLimitClick"),
                    l = e.start,
                    a = t(this),
                    u = i.getCellDayEl(e),
                    c = i.getCellSegs(e),
                    d = i.resliceDaySegs(c, l),
                    h = i.resliceDaySegs(n, l);
                "function" == typeof o && (o = r.trigger("eventLimitClick", null, {
                    date: l,
                    dayEl: u,
                    moreEl: a,
                    segs: d,
                    hiddenSegs: h
                }, s)), "popover" === o ? i.showSegPopover(e, a, d) : "string" == typeof o && r.calendar.zoomTo(l, o)
            })
        },
        showSegPopover: function(t, e, n) {
            var i, r, s = this,
                o = this.view,
                l = e.parent();
            i = 1 == this.rowCnt ? o.el : this.rowEls.eq(t.row), r = {
                className: "fc-more-popover",
                content: this.renderSegPopoverContent(t, n),
                parentEl: this.el,
                top: i.offset().top,
                autoHide: !0,
                viewportConstrain: o.opt("popoverViewportConstrain"),
                hide: function() {
                    s.segPopover.destroy(), s.segPopover = null, s.popoverSegs = null
                }
            }, this.isRTL ? r.right = l.offset().left + l.outerWidth() + 1 : r.left = l.offset().left - 1, this.segPopover = new Ke(r), this.segPopover.show()
        },
        renderSegPopoverContent: function(e, n) {
            var i, r = this.view,
                s = r.opt("theme"),
                o = e.start.format(r.opt("dayPopoverFormat")),
                l = t('<div class="fc-header ' + r.widgetHeaderClass + '">' + '<span class="fc-close ' + (s ? "ui-icon ui-icon-closethick" : "fc-icon fc-icon-x") + '"></span>' + '<span class="fc-title">' + Y(o) + "</span>" + '<div class="fc-clear"/>' + "</div>" + '<div class="fc-body ' + r.widgetContentClass + '">' + '<div class="fc-event-container"></div>' + "</div>"),
                a = l.find(".fc-event-container");
            for (n = this.renderFgSegEls(n, !0), this.popoverSegs = n, i = 0; n.length > i; i++) n[i].cell = e, a.append(n[i].el);
            return l
        },
        resliceDaySegs: function(e, n) {
            var i = t.map(e, function(t) {
                    return t.event
                }),
                r = n.clone().stripTime(),
                s = r.clone().add(1, "days"),
                o = {
                    start: r,
                    end: s
                };
            return e = this.eventsToSegs(i, function(t) {
                var e = H(t, o);
                return e ? [e] : []
            }), e.sort(me), e
        },
        getMoreLinkText: function(t) {
            var e = this.view.opt("eventLimitText");
            return "function" == typeof e ? e(t) : "+" + t + " " + e
        },
        getCellSegs: function(t, e) {
            for (var n, i = this.rowStructs[t.row].segMatrix, r = e || 0, s = []; i.length > r;) n = i[r][t.col], n && s.push(n), r++;
            return s
        }
    });
    var ln = sn.extend({
        slotDuration: null,
        snapDuration: null,
        minTime: null,
        maxTime: null,
        axisFormat: null,
        dayEls: null,
        slatEls: null,
        slatTops: null,
        helperEl: null,
        businessHourSegs: null,
        constructor: function() {
            sn.apply(this, arguments), this.processOptions()
        },
        renderDates: function() {
            this.el.html(this.renderHtml()), this.dayEls = this.el.find(".fc-day"), this.slatEls = this.el.find(".fc-slats tr")
        },
        renderBusinessHours: function() {
            var t = this.view.calendar.getBusinessHoursEvents();
            this.businessHourSegs = this.renderFill("businessHours", this.eventsToSegs(t), "bgevent")
        },
        renderHtml: function() {
            return '<div class="fc-bg"><table>' + this.rowHtml("slotBg") + "</table>" + "</div>" + '<div class="fc-slats">' + "<table>" + this.slatRowHtml() + "</table>" + "</div>"
        },
        slotBgCellHtml: function(t) {
            return this.bgCellHtml(t)
        },
        slatRowHtml: function() {
            for (var t, n, i, r = this.view, s = this.isRTL, o = "", l = 0 === this.slotDuration.asMinutes() % 15, a = e.duration(+this.minTime); this.maxTime > a;) t = this.start.clone().time(a), n = t.minutes(), i = '<td class="fc-axis fc-time ' + r.widgetContentClass + '" ' + r.axisStyleAttr() + ">" + (l && n ? "" : "<span>" + Y(t.format(this.axisFormat)) + "</span>") + "</td>", o += "<tr " + (n ? 'class="fc-minor"' : "") + ">" + (s ? "" : i) + '<td class="' + r.widgetContentClass + '"/>' + (s ? i : "") + "</tr>", a.add(this.slotDuration);
            return o
        },
        processOptions: function() {
            var t = this.view,
                n = t.opt("slotDuration"),
                i = t.opt("snapDuration");
            n = e.duration(n), i = i ? e.duration(i) : n, this.slotDuration = n, this.snapDuration = i, this.cellDuration = i, this.minTime = e.duration(t.opt("minTime")), this.maxTime = e.duration(t.opt("maxTime")), this.axisFormat = t.opt("axisFormat") || t.opt("smallTimeFormat")
        },
        computeColHeadFormat: function() {
            return this.colCnt > 1 ? this.view.opt("dayOfMonthFormat") : "dddd"
        },
        computeEventTimeFormat: function() {
            return this.view.opt("noMeridiemTimeFormat")
        },
        computeDisplayEventEnd: function() {
            return !0
        },
        updateCells: function() {
            var t, e = this.view,
                n = [];
            for (t = this.start.clone(); t.isBefore(this.end);) n.push({
                day: t.clone()
            }), t.add(1, "day"), t = e.skipHiddenDays(t);
            this.isRTL && n.reverse(), this.colData = n, this.colCnt = n.length, this.rowCnt = Math.ceil((this.maxTime - this.minTime) / this.snapDuration)
        },
        computeCellDate: function(t) {
            var e = this.computeSnapTime(t.row);
            return this.view.calendar.rezoneDate(t.day).time(e)
        },
        getColEl: function(t) {
            return this.dayEls.eq(t)
        },
        computeSnapTime: function(t) {
            return e.duration(this.minTime + this.snapDuration * t)
        },
        rangeToSegs: function(t) {
            var e, n, i, r, s = this.colCnt,
                o = [];
            for (t = {
                    start: t.start.clone().stripZone(),
                    end: t.end.clone().stripZone()
                }, n = 0; s > n; n++) i = this.colData[n].day, r = {
                start: i.clone().time(this.minTime),
                end: i.clone().time(this.maxTime)
            }, e = H(t, r), e && (e.col = n, o.push(e));
            return o
        },
        updateSize: function(t) {
            this.computeSlatTops(), t && this.updateSegVerticals()
        },
        computeRowCoords: function() {
            var t, e, n = this.el.offset().top,
                i = [];
            for (t = 0; this.rowCnt > t; t++) e = {
                top: n + this.computeTimeTop(this.computeSnapTime(t))
            }, t > 0 && (i[t - 1].bottom = e.top), i.push(e);
            return e.bottom = e.top + this.computeTimeTop(this.computeSnapTime(t)), i
        },
        computeDateTop: function(t, n) {
            return this.computeTimeTop(e.duration(t.clone().stripZone() - n.clone().stripTime()))
        },
        computeTimeTop: function(t) {
            var e, n, i, r, s = (t - this.minTime) / this.slotDuration;
            return s = Math.max(0, s), s = Math.min(this.slatEls.length, s), e = Math.floor(s), n = s - e, i = this.slatTops[e], n ? (r = this.slatTops[e + 1], i + (r - i) * n) : i
        },
        computeSlatTops: function() {
            var e, n = [];
            this.slatEls.each(function(i, r) {
                e = t(r).position().top, n.push(e)
            }), n.push(e + this.slatEls.last().outerHeight()), this.slatTops = n
        },
        renderDrag: function(t, e) {
            return e ? (this.renderRangeHelper(t, e), this.applyDragOpacity(this.helperEl), !0) : (this.renderHighlight(this.view.calendar.ensureVisibleEventRange(t)), void 0)
        },
        destroyDrag: function() {
            this.destroyHelper(), this.destroyHighlight()
        },
        renderEventResize: function(t, e) {
            this.renderRangeHelper(t, e)
        },
        destroyEventResize: function() {
            this.destroyHelper()
        },
        renderHelper: function(e, n) {
            var i, r, s, o, l = this.eventsToSegs([e]);
            for (l = this.renderFgSegEls(l), i = this.renderSegTable(l), r = 0; l.length > r; r++) s = l[r], n && n.col === s.col && (o = n.el, s.el.css({
                left: o.css("left"),
                right: o.css("right"),
                "margin-left": o.css("margin-left"),
                "margin-right": o.css("margin-right")
            }));
            this.helperEl = t('<div class="fc-helper-skeleton"/>').append(i).appendTo(this.el)
        },
        destroyHelper: function() {
            this.helperEl && (this.helperEl.remove(), this.helperEl = null)
        },
        renderSelection: function(t) {
            this.view.opt("selectHelper") ? this.renderRangeHelper(t) : this.renderHighlight(t)
        },
        destroySelection: function() {
            this.destroyHelper(), this.destroyHighlight()
        },
        renderFill: function(e, n, i) {
            var r, s, o, l, a, u, c, d, h, f;
            if (n.length) {
                for (n = this.renderFillSegEls(e, n), r = this.groupSegCols(n), i = i || e.toLowerCase(), s = t('<div class="fc-' + i + '-skeleton">' + "<table><tr/></table>" + "</div>"), o = s.find("tr"), l = 0; r.length > l; l++)
                    if (a = r[l], u = t("<td/>").appendTo(o), a.length)
                        for (c = t('<div class="fc-' + i + '-container"/>').appendTo(u), d = this.colData[l].day, h = 0; a.length > h; h++) f = a[h], c.append(f.el.css({
                            top: this.computeDateTop(f.start, d),
                            bottom: -this.computeDateTop(f.end, d)
                        }));
                this.bookendCells(o, e), this.el.append(s), this.elsByFill[e] = s
            }
            return n
        }
    });
    ln.mixin({
        eventSkeletonEl: null,
        renderFgSegs: function(e) {
            return e = this.renderFgSegEls(e), this.el.append(this.eventSkeletonEl = t('<div class="fc-content-skeleton"/>').append(this.renderSegTable(e))), e
        },
        destroyFgSegs: function() {
            this.eventSkeletonEl && (this.eventSkeletonEl.remove(), this.eventSkeletonEl = null)
        },
        renderSegTable: function(e) {
            var n, i, r, s, o, l, a = t("<table><tr/></table>"),
                u = a.find("tr");
            for (n = this.groupSegCols(e), this.computeSegVerticals(e), s = 0; n.length > s; s++) {
                for (o = n[s], Ee(o), l = t('<div class="fc-event-container"/>'), i = 0; o.length > i; i++) r = o[i], r.el.css(this.generateSegPositionCss(r)), 30 > r.bottom - r.top && r.el.addClass("fc-short"), l.append(r.el);
                u.append(t("<td/>").append(l))
            }
            return this.bookendCells(u, "eventSkeleton"), a
        },
        updateSegVerticals: function() {
            var t, e = (this.segs || []).concat(this.businessHourSegs || []);
            for (this.computeSegVerticals(e), t = 0; e.length > t; t++) e[t].el.css(this.generateSegVerticalCss(e[t]))
        },
        computeSegVerticals: function(t) {
            var e, n;
            for (e = 0; t.length > e; e++) n = t[e], n.top = this.computeDateTop(n.start, n.start), n.bottom = this.computeDateTop(n.end, n.start)
        },
        fgSegHtml: function(t, e) {
            var n, i, r, s = this.view,
                o = t.event,
                l = s.isEventDraggable(o),
                a = !e && t.isStart && s.isEventResizableFromStart(o),
                u = !e && t.isEnd && s.isEventResizableFromEnd(o),
                c = this.getSegClasses(t, l, a || u),
                d = W(this.getEventSkinCss(o));
            return c.unshift("fc-time-grid-event", "fc-v-event"), s.isMultiDayEvent(o) ? (t.isStart || t.isEnd) && (n = this.getEventTimeText(t), i = this.getEventTimeText(t, "LT"), r = this.getEventTimeText(t, null, !1)) : (n = this.getEventTimeText(o), i = this.getEventTimeText(o, "LT"), r = this.getEventTimeText(o, null, !1)), '<a class="' + c.join(" ") + '"' + (o.url ? ' href="' + Y(o.url) + '"' : "") + (d ? ' style="' + d + '"' : "") + ">" + '<div class="fc-content">' + (n ? '<div class="fc-time" data-start="' + Y(r) + '"' + ' data-full="' + Y(i) + '"' + ">" + "<span>" + Y(n) + "</span>" + "</div>" : "") + (o.title ? '<div class="fc-title">' + Y(o.title) + "</div>" : "") + "</div>" + '<div class="fc-bg"/>' + (u ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
        },
        generateSegPositionCss: function(t) {
            var e, n, i = this.view.opt("slotEventOverlap"),
                r = t.backwardCoord,
                s = t.forwardCoord,
                o = this.generateSegVerticalCss(t);
            return i && (s = Math.min(1, r + 2 * (s - r))), this.isRTL ? (e = 1 - s, n = r) : (e = r, n = 1 - s), o.zIndex = t.level + 1, o.left = 100 * e + "%", o.right = 100 * n + "%", i && t.forwardPressure && (o[this.isRTL ? "marginLeft" : "marginRight"] = 20), o
        },
        generateSegVerticalCss: function(t) {
            return {
                top: t.top,
                bottom: -t.bottom
            }
        },
        groupSegCols: function(t) {
            var e, n = [];
            for (e = 0; this.colCnt > e; e++) n.push([]);
            for (e = 0; t.length > e; e++) n[t[e].col].push(t[e]);
            return n
        }
    });
    var an = Le.View = ue.extend({
            type: null,
            name: null,
            title: null,
            calendar: null,
            options: null,
            coordMap: null,
            el: null,
            isDisplayed: !1,
            isSkeletonRendered: !1,
            isEventsRendered: !1,
            start: null,
            end: null,
            intervalStart: null,
            intervalEnd: null,
            intervalDuration: null,
            intervalUnit: null,
            isSelected: !1,
            scrollerEl: null,
            scrollTop: null,
            widgetHeaderClass: null,
            widgetContentClass: null,
            highlightStateClass: null,
            nextDayThreshold: null,
            isHiddenDayHash: null,
            documentMousedownProxy: null,
            constructor: function(t, n, i, r) {
                this.calendar = t, this.type = this.name = n, this.options = i, this.intervalDuration = r || e.duration(1, "day"), this.nextDayThreshold = e.duration(this.opt("nextDayThreshold")), this.initThemingProps(), this.initHiddenDays(), this.documentMousedownProxy = q(this, "documentMousedown"), this.initialize()
            },
            initialize: function() {},
            opt: function(t) {
                return this.options[t]
            },
            trigger: function(t, e) {
                var n = this.calendar;
                return n.trigger.apply(n, [t, e || this].concat(Array.prototype.slice.call(arguments, 2), [this]))
            },
            setDate: function(t) {
                this.setRange(this.computeRange(t))
            },
            setRange: function(e) {
                t.extend(this, e), this.updateTitle()
            },
            computeRange: function(t) {
                var e, n, i = M(this.intervalDuration),
                    r = t.clone().startOf(i),
                    s = r.clone().add(this.intervalDuration);
                return /year|month|week|day/.test(i) ? (r.stripTime(), s.stripTime()) : (r.hasTime() || (r = this.calendar.rezoneDate(r)), s.hasTime() || (s = this.calendar.rezoneDate(s))), e = r.clone(), e = this.skipHiddenDays(e), n = s.clone(), n = this.skipHiddenDays(n, -1, !0), {
                    intervalUnit: i,
                    intervalStart: r,
                    intervalEnd: s,
                    start: e,
                    end: n
                }
            },
            computePrevDate: function(t) {
                return this.massageCurrentDate(t.clone().startOf(this.intervalUnit).subtract(this.intervalDuration), -1)
            },
            computeNextDate: function(t) {
                return this.massageCurrentDate(t.clone().startOf(this.intervalUnit).add(this.intervalDuration))
            },
            massageCurrentDate: function(t, e) {
                return 1 >= this.intervalDuration.as("days") && this.isHiddenDay(t) && (t = this.skipHiddenDays(t, e), t.startOf("day")), t
            },
            updateTitle: function() {
                this.title = this.computeTitle()
            },
            computeTitle: function() {
                return this.formatRange({
                    start: this.intervalStart,
                    end: this.intervalEnd
                }, this.opt("titleFormat") || this.computeTitleFormat(), this.opt("titleRangeSeparator"))
            },
            computeTitleFormat: function() {
                return "year" == this.intervalUnit ? "YYYY" : "month" == this.intervalUnit ? this.opt("monthYearFormat") : this.intervalDuration.as("days") > 1 ? "ll" : "LL"
            },
            formatRange: function(t, e, n) {
                var i = t.end;
                return i.hasTime() || (i = i.clone().subtract(1)), re(t.start, i, e, n, this.opt("isRTL"))
            },
            setElement: function(t) {
                this.el = t, this.bindGlobalHandlers()
            },
            removeElement: function() {
                this.clear(), this.isSkeletonRendered && (this.destroySkeleton(), this.isSkeletonRendered = !1), this.unbindGlobalHandlers(), this.el.remove()
            },
            display: function(t) {
                var e = null;
                this.isDisplayed && (e = this.queryScroll()), this.clear(), this.setDate(t), this.render(), this.updateSize(), this.renderBusinessHours(), this.isDisplayed = !0, e = this.computeInitialScroll(e), this.forceScroll(e), this.triggerRender()
            },
            clear: function() {
                this.isDisplayed && (this.unselect(), this.clearEvents(), this.triggerDestroy(), this.destroyBusinessHours(), this.destroy(), this.isDisplayed = !1)
            },
            render: function() {
                this.isSkeletonRendered || (this.renderSkeleton(), this.isSkeletonRendered = !0), this.renderDates()
            },
            destroy: function() {
                this.destroyDates()
            },
            renderSkeleton: function() {},
            destroySkeleton: function() {},
            renderDates: function() {},
            destroyDates: function() {},
            renderBusinessHours: function() {},
            destroyBusinessHours: function() {},
            triggerRender: function() {
                this.trigger("viewRender", this, this, this.el)
            },
            triggerDestroy: function() {
                this.trigger("viewDestroy", this, this, this.el)
            },
            bindGlobalHandlers: function() {
                t(document).on("mousedown", this.documentMousedownProxy)
            },
            unbindGlobalHandlers: function() {
                t(document).off("mousedown", this.documentMousedownProxy)
            },
            initThemingProps: function() {
                var t = this.opt("theme") ? "ui" : "fc";
                this.widgetHeaderClass = t + "-widget-header", this.widgetContentClass = t + "-widget-content", this.highlightStateClass = t + "-state-highlight"
            },
            updateSize: function(t) {
                var e;
                t && (e = this.queryScroll()), this.updateHeight(), this.updateWidth(), t && this.setScroll(e)
            },
            updateWidth: function() {},
            updateHeight: function() {
                var t = this.calendar;
                this.setHeight(t.getSuggestedViewHeight(), t.isHeightAuto())
            },
            setHeight: function() {},
            computeScrollerHeight: function(t) {
                var e, n, i = this.scrollerEl;
                return e = this.el.add(i), e.css({
                    position: "relative",
                    left: -1
                }), n = this.el.outerHeight() - i.height(), e.css({
                    position: "",
                    left: ""
                }), t - n
            },
            computeInitialScroll: function() {
                return 0
            },
            queryScroll: function() {
                return this.scrollerEl ? this.scrollerEl.scrollTop() : void 0
            },
            setScroll: function(t) {
                return this.scrollerEl ? this.scrollerEl.scrollTop(t) : void 0
            },
            forceScroll: function(t) {
                var e = this;
                this.setScroll(t), setTimeout(function() {
                    e.setScroll(t)
                }, 0)
            },
            displayEvents: function(t) {
                var e = this.queryScroll();
                this.clearEvents(), this.renderEvents(t), this.isEventsRendered = !0, this.setScroll(e), this.triggerEventRender()
            },
            clearEvents: function() {
                this.isEventsRendered && (this.triggerEventDestroy(), this.destroyEvents(), this.isEventsRendered = !1)
            },
            renderEvents: function() {},
            destroyEvents: function() {},
            triggerEventRender: function() {
                this.renderedEventSegEach(function(t) {
                    this.trigger("eventAfterRender", t.event, t.event, t.el)
                }), this.trigger("eventAfterAllRender")
            },
            triggerEventDestroy: function() {
                this.renderedEventSegEach(function(t) {
                    this.trigger("eventDestroy", t.event, t.event, t.el)
                })
            },
            resolveEventEl: function(e, n) {
                var i = this.trigger("eventRender", e, e, n);
                return i === !1 ? n = null : i && i !== !0 && (n = t(i)), n
            },
            showEvent: function(t) {
                this.renderedEventSegEach(function(t) {
                    t.el.css("visibility", "")
                }, t)
            },
            hideEvent: function(t) {
                this.renderedEventSegEach(function(t) {
                    t.el.css("visibility", "hidden")
                }, t)
            },
            renderedEventSegEach: function(t, e) {
                var n, i = this.getEventSegs();
                for (n = 0; i.length > n; n++) e && i[n].event._id !== e._id || i[n].el && t.call(this, i[n])
            },
            getEventSegs: function() {
                return []
            },
            isEventDraggable: function(t) {
                var e = t.source || {};
                return B(t.startEditable, e.startEditable, this.opt("eventStartEditable"), t.editable, e.editable, this.opt("editable"))
            },
            reportEventDrop: function(t, e, n, i, r) {
                var s = this.calendar,
                    o = s.mutateEvent(t, e, n),
                    l = function() {
                        o.undo(), s.reportEventChange()
                    };
                this.triggerEventDrop(t, o.dateDelta, l, i, r), s.reportEventChange()
            },
            triggerEventDrop: function(t, e, n, i, r) {
                this.trigger("eventDrop", i[0], t, e, n, r, {})
            },
            reportExternalDrop: function(e, n, i, r, s) {
                var o, l, a = e.eventProps;
                a && (o = t.extend({}, a, n), l = this.calendar.renderEvent(o, e.stick)[0]), this.triggerExternalDrop(l, n, i, r, s)
            },
            triggerExternalDrop: function(t, e, n, i, r) {
                this.trigger("drop", n[0], e.start, i, r), t && this.trigger("eventReceive", null, t)
            },
            renderDrag: function() {},
            destroyDrag: function() {},
            isEventResizableFromStart: function(t) {
                return this.opt("eventResizableFromStart") && this.isEventResizable(t)
            },
            isEventResizableFromEnd: function(t) {
                return this.isEventResizable(t)
            },
            isEventResizable: function(t) {
                var e = t.source || {};
                return B(t.durationEditable, e.durationEditable, this.opt("eventDurationEditable"), t.editable, e.editable, this.opt("editable"))
            },
            reportEventResize: function(t, e, n, i, r) {
                var s = this.calendar,
                    o = s.mutateEvent(t, e, n),
                    l = function() {
                        o.undo(), s.reportEventChange()
                    };
                this.triggerEventResize(t, o.durationDelta, l, i, r), s.reportEventChange()
            },
            triggerEventResize: function(t, e, n, i, r) {
                this.trigger("eventResize", i[0], t, e, n, r, {})
            },
            select: function(t, e) {
                this.unselect(e), this.renderSelection(t), this.reportSelection(t, e)
            },
            renderSelection: function() {},
            reportSelection: function(t, e) {
                this.isSelected = !0, this.trigger("select", null, t.start, t.end, e)
            },
            unselect: function(t) {
                this.isSelected && (this.isSelected = !1, this.destroySelection(), this.trigger("unselect", null, t))
            },
            destroySelection: function() {},
            documentMousedown: function(e) {
                var n;
                this.isSelected && this.opt("unselectAuto") && S(e) && (n = this.opt("unselectCancel"), n && t(e.target).closest(n).length || this.unselect(e))
            },
            initHiddenDays: function() {
                var e, n = this.opt("hiddenDays") || [],
                    i = [],
                    r = 0;
                for (this.opt("weekends") === !1 && n.push(0, 6), e = 0; 7 > e; e++)(i[e] = -1 !== t.inArray(e, n)) || r++;
                if (!r) throw "invalid hiddenDays";
                this.isHiddenDayHash = i
            },
            isHiddenDay: function(t) {
                return e.isMoment(t) && (t = t.day()), this.isHiddenDayHash[t]
            },
            skipHiddenDays: function(t, e, n) {
                var i = t.clone();
                for (e = e || 1; this.isHiddenDayHash[(i.day() + (n ? e : 0) + 7) % 7];) i.add(e, "days");
                return i
            },
            computeDayRange: function(t) {
                var e, n = t.start.clone().stripTime(),
                    i = t.end,
                    r = null;
                return i && (r = i.clone().stripTime(), e = +i.time(), e && e >= this.nextDayThreshold && r.add(1, "days")), (!i || n >= r) && (r = n.clone().add(1, "days")), {
                    start: n,
                    end: r
                }
            },
            isMultiDayEvent: function(t) {
                var e = this.computeDayRange(t);
                return e.end.diff(e.start, "days") > 1
            }
        }),
        un = Le.Calendar = Le.CalendarBase = ue.extend({
            dirDefaults: null,
            langDefaults: null,
            overrides: null,
            options: null,
            viewSpecCache: null,
            view: null,
            header: null,
            constructor: Re,
            initOptions: function(t) {
                var e, r, s, o;
                t = i(t), e = t.lang, r = cn[e], r || (e = un.defaults.lang, r = cn[e] || {}), s = B(t.isRTL, r.isRTL, un.defaults.isRTL), o = s ? un.rtlDefaults : {}, this.dirDefaults = o, this.langDefaults = r, this.overrides = t, this.options = n(un.defaults, o, r, t), ke(this.options), this.viewSpecCache = {}
            },
            getViewSpec: function(t) {
                var e = this.viewSpecCache;
                return e[t] || (e[t] = this.buildViewSpec(t))
            },
            getUnitViewSpec: function(e) {
                var n, i, r;
                if (-1 != t.inArray(e, Ye))
                    for (n = this.header.getViewsWithButtons(), t.each(Le.views, function(t) {
                            n.push(t)
                        }), i = 0; n.length > i; i++)
                        if (r = this.getViewSpec(n[i]), r && r.singleUnit == e) return r
            },
            buildViewSpec: function(t) {
                for (var i, r, s, o, l, a, u = this.overrides.views || {}, c = [], d = [], h = t; h && !i;) r = _e[h] || {}, s = u[h] || {}, o = o || s.duration || r.duration, h = s.type || r.type, "function" == typeof r ? (i = r, c.unshift(i.defaults || {})) : c.unshift(r), d.unshift(s);
                return i ? (a = {
                    "class": i,
                    type: t
                }, o && (o = e.duration(o), o.valueOf() || (o = null)), o && (a.duration = o, l = M(o), 1 === o.as(l) && (a.singleUnit = l, d.unshift(u[l] || {}))), a.defaults = n.apply(null, c), a.overrides = n.apply(null, d), this.buildViewSpecOptions(a), this.buildViewSpecButtonText(a, t), a) : void 0
            },
            buildViewSpecOptions: function(t) {
                t.options = n(un.defaults, t.defaults, this.dirDefaults, this.langDefaults, this.overrides, t.overrides), ke(t.options)
            },
            buildViewSpecButtonText: function(t, e) {
                function n(n) {
                    var i = n.buttonText || {};
                    return i[e] || (t.singleUnit ? i[t.singleUnit] : null)
                }
                t.buttonTextOverride = n(this.overrides) || t.overrides.buttonText, t.buttonTextDefault = n(this.langDefaults) || n(this.dirDefaults) || t.defaults.buttonText || n(un.defaults) || (t.duration ? this.humanizeDuration(t.duration) : null) || e
            },
            instantiateView: function(t) {
                var e = this.getViewSpec(t);
                return new e["class"](this, t, e.options, e.duration)
            },
            isValidViewType: function(t) {
                return Boolean(this.getViewSpec(t))
            }
        });
    un.defaults = {
        titleRangeSeparator: " â€” ",
        monthYearFormat: "MMMM YYYY",
        defaultTimedEventDuration: "02:00:00",
        defaultAllDayEventDuration: {
            days: 1
        },
        forceEventDuration: !1,
        nextDayThreshold: "09:00:00",
        defaultView: "month",
        aspectRatio: 1.35,
        header: {
            left: "title",
            center: "",
            right: "today prev,next"
        },
        weekends: !0,
        weekNumbers: !1,
        weekNumberTitle: "W",
        weekNumberCalculation: "local",
        lazyFetching: !0,
        startParam: "start",
        endParam: "end",
        timezoneParam: "timezone",
        timezone: !1,
        isRTL: !1,
        buttonText: {
            prev: "prev",
            next: "next",
            prevYear: "prev year",
            nextYear: "next year",
            year: "year",
            today: "today",
            month: "month",
            week: "week",
            day: "day"
        },
        buttonIcons: {
            prev: "left-single-arrow",
            next: "right-single-arrow",
            prevYear: "left-double-arrow",
            nextYear: "right-double-arrow"
        },
        theme: !1,
        themeButtonIcons: {
            prev: "circle-triangle-w",
            next: "circle-triangle-e",
            prevYear: "seek-prev",
            nextYear: "seek-next"
        },
        dragOpacity: .75,
        dragRevertDuration: 500,
        dragScroll: !0,
        unselectAuto: !0,
        dropAccept: "*",
        eventLimit: !1,
        eventLimitText: "more",
        eventLimitClick: "popover",
        dayPopoverFormat: "LL",
        handleWindowResize: !0,
        windowResizeDelay: 200
    }, un.englishDefaults = {
        dayPopoverFormat: "dddd, MMMM D"
    }, un.rtlDefaults = {
        header: {
            left: "next,prev today",
            center: "",
            right: "title"
        },
        buttonIcons: {
            prev: "right-single-arrow",
            next: "left-single-arrow",
            prevYear: "right-double-arrow",
            nextYear: "left-double-arrow"
        },
        themeButtonIcons: {
            prev: "circle-triangle-e",
            next: "circle-triangle-w",
            nextYear: "seek-prev",
            prevYear: "seek-next"
        }
    };
    var cn = Le.langs = {};
    Le.datepickerLang = function(e, n, i) {
        var r = cn[e] || (cn[e] = {});
        r.isRTL = i.isRTL, r.weekNumberTitle = i.weekHeader, t.each(dn, function(t, e) {
            r[t] = e(i)
        }), t.datepicker && (t.datepicker.regional[n] = t.datepicker.regional[e] = i, t.datepicker.regional.en = t.datepicker.regional[""], t.datepicker.setDefaults(i))
    }, Le.lang = function(e, i) {
        var r, s;
        r = cn[e] || (cn[e] = {}), i && (r = cn[e] = n(r, i)), s = Me(e), t.each(hn, function(t, e) {
            null == r[t] && (r[t] = e(s, r))
        }), un.defaults.lang = e
    };
    var dn = {
            buttonText: function(t) {
                return {
                    prev: I(t.prevText),
                    next: I(t.nextText),
                    today: I(t.currentText)
                }
            },
            monthYearFormat: function(t) {
                return t.showMonthAfterYear ? "YYYY[" + t.yearSuffix + "] MMMM" : "MMMM YYYY[" + t.yearSuffix + "]"
            }
        },
        hn = {
            dayOfMonthFormat: function(t, e) {
                var n = t.longDateFormat("l");
                return n = n.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, ""), e.isRTL ? n += " ddd" : n = "ddd " + n, n
            },
            mediumTimeFormat: function(t) {
                return t.longDateFormat("LT").replace(/\s*a$/i, "a")
            },
            smallTimeFormat: function(t) {
                return t.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "a")
            },
            extraSmallTimeFormat: function(t) {
                return t.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "t")
            },
            hourFormat: function(t) {
                return t.longDateFormat("LT").replace(":mm", "").replace(/(\Wmm)$/, "").replace(/\s*a$/i, "a")
            },
            noMeridiemTimeFormat: function(t) {
                return t.longDateFormat("LT").replace(/\s*a$/i, "")
            }
        },
        fn = {
            smallDayDateFormat: function(t) {
                return t.isRTL ? "D dd" : "dd D"
            },
            weekFormat: function(t) {
                return t.isRTL ? "w[ " + t.weekNumberTitle + "]" : "[" + t.weekNumberTitle + " ]w"
            },
            smallWeekFormat: function(t) {
                return t.isRTL ? "w[" + t.weekNumberTitle + "]" : "[" + t.weekNumberTitle + "]w"
            }
        };
    Le.lang("en", un.englishDefaults), Le.sourceNormalizers = [], Le.sourceFetchers = [];
    var gn = {
            dataType: "json",
            cache: !1
        },
        pn = 1;
    un.prototype.getPeerEvents = function(t) {
        var e, n, i = this.getEventCache(),
            r = [];
        for (e = 0; i.length > e; e++) n = i[e], t && t._id === n._id || r.push(n);
        return r
    };
    var mn = _e.basic = an.extend({
            dayGrid: null,
            dayNumbersVisible: !1,
            weekNumbersVisible: !1,
            weekNumberWidth: null,
            headRowEl: null,
            initialize: function() {
                this.dayGrid = new on(this), this.coordMap = this.dayGrid.coordMap
            },
            setRange: function(t) {
                an.prototype.setRange.call(this, t), this.dayGrid.breakOnWeeks = /year|month|week/.test(this.intervalUnit), this.dayGrid.setRange(t)
            },
            computeRange: function(t) {
                var e = an.prototype.computeRange.call(this, t);
                return /year|month/.test(e.intervalUnit) && (e.start.startOf("week"), e.start = this.skipHiddenDays(e.start), e.end.weekday() && (e.end.add(1, "week").startOf("week"), e.end = this.skipHiddenDays(e.end, -1, !0))), e
            },
            render: function() {
                this.dayNumbersVisible = this.dayGrid.rowCnt > 1, this.weekNumbersVisible = this.opt("weekNumbers"), this.dayGrid.numbersVisible = this.dayNumbersVisible || this.weekNumbersVisible, this.el.addClass("fc-basic-view").html(this.renderHtml()), this.headRowEl = this.el.find("thead .fc-row"), this.scrollerEl = this.el.find(".fc-day-grid-container"), this.dayGrid.coordMap.containerEl = this.scrollerEl, this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(this.hasRigidRows())
            },
            destroy: function() {
                this.dayGrid.destroyDates(), this.dayGrid.removeElement()
            },
            renderBusinessHours: function() {
                this.dayGrid.renderBusinessHours()
            },
            renderHtml: function() {
                return '<table><thead class="fc-head"><tr><td class="' + this.widgetHeaderClass + '">' + this.dayGrid.headHtml() + "</td>" + "</tr>" + "</thead>" + '<tbody class="fc-body">' + "<tr>" + '<td class="' + this.widgetContentClass + '">' + '<div class="fc-day-grid-container">' + '<div class="fc-day-grid"/>' + "</div>" + "</td>" + "</tr>" + "</tbody>" + "</table>"
            },
            headIntroHtml: function() {
                return this.weekNumbersVisible ? '<th class="fc-week-number ' + this.widgetHeaderClass + '" ' + this.weekNumberStyleAttr() + ">" + "<span>" + Y(this.opt("weekNumberTitle")) + "</span>" + "</th>" : void 0
            },
            numberIntroHtml: function(t) {
                return this.weekNumbersVisible ? '<td class="fc-week-number" ' + this.weekNumberStyleAttr() + ">" + "<span>" + this.dayGrid.getCell(t, 0).start.format("w") + "</span>" + "</td>" : void 0
            },
            dayIntroHtml: function() {
                return this.weekNumbersVisible ? '<td class="fc-week-number ' + this.widgetContentClass + '" ' + this.weekNumberStyleAttr() + "></td>" : void 0
            },
            introHtml: function() {
                return this.weekNumbersVisible ? '<td class="fc-week-number" ' + this.weekNumberStyleAttr() + "></td>" : void 0
            },
            numberCellHtml: function(t) {
                var e, n = t.start;
                return this.dayNumbersVisible ? (e = this.dayGrid.getDayClasses(n), e.unshift("fc-day-number"), '<td class="' + e.join(" ") + '" data-date="' + n.format() + '">' + n.date() + "</td>") : "<td/>"
            },
            weekNumberStyleAttr: function() {
                return null !== this.weekNumberWidth ? 'style="width:' + this.weekNumberWidth + 'px"' : ""
            },
            hasRigidRows: function() {
                var t = this.opt("eventLimit");
                return t && "number" != typeof t
            },
            updateWidth: function() {
                this.weekNumbersVisible && (this.weekNumberWidth = c(this.el.find(".fc-week-number")))
            },
            setHeight: function(t, e) {
                var n, i = this.opt("eventLimit");
                h(this.scrollerEl), s(this.headRowEl), this.dayGrid.destroySegPopover(), i && "number" == typeof i && this.dayGrid.limitRows(i), n = this.computeScrollerHeight(t), this.setGridHeight(n, e), i && "number" != typeof i && this.dayGrid.limitRows(i), !e && d(this.scrollerEl, n) && (r(this.headRowEl, v(this.scrollerEl)), n = this.computeScrollerHeight(t), this.scrollerEl.height(n))
            },
            setGridHeight: function(t, e) {
                e ? u(this.dayGrid.rowEls) : a(this.dayGrid.rowEls, t, !0)
            },
            renderEvents: function(t) {
                this.dayGrid.renderEvents(t), this.updateHeight()
            },
            getEventSegs: function() {
                return this.dayGrid.getEventSegs()
            },
            destroyEvents: function() {
                this.dayGrid.destroyEvents()
            },
            renderDrag: function(t, e) {
                return this.dayGrid.renderDrag(t, e)
            },
            destroyDrag: function() {
                this.dayGrid.destroyDrag()
            },
            renderSelection: function(t) {
                this.dayGrid.renderSelection(t)
            },
            destroySelection: function() {
                this.dayGrid.destroySelection()
            }
        }),
        vn = _e.month = mn.extend({
            computeRange: function(t) {
                var e, n = mn.prototype.computeRange.call(this, t);
                return this.isFixedWeeks() && (e = Math.ceil(n.end.diff(n.start, "weeks", !0)), n.end.add(6 - e, "weeks")), n
            },
            setGridHeight: function(t, e) {
                e = e || "variable" === this.opt("weekMode"), e && (t *= this.rowCnt / 6), a(this.dayGrid.rowEls, t, !e)
            },
            isFixedWeeks: function() {
                var t = this.opt("weekMode");
                return t ? "fixed" === t : this.opt("fixedWeekCount")
            }
        });
    vn.duration = {
        months: 1
    }, vn.defaults = {
        fixedWeekCount: !0
    }, _e.basicWeek = {
        type: "basic",
        duration: {
            weeks: 1
        }
    }, _e.basicDay = {
        type: "basic",
        duration: {
            days: 1
        }
    };
    var yn = {
            allDaySlot: !0,
            allDayText: "all-day",
            scrollTime: "06:00:00",
            slotDuration: "00:30:00",
            minTime: "00:00:00",
            maxTime: "24:00:00",
            slotEventOverlap: !0
        },
        wn = 5,
        En = _e.agenda = an.extend({
            timeGrid: null,
            dayGrid: null,
            axisWidth: null,
            noScrollRowEls: null,
            bottomRuleEl: null,
            bottomRuleHeight: null,
            initialize: function() {
                this.timeGrid = new ln(this), this.opt("allDaySlot") ? (this.dayGrid = new on(this), this.coordMap = new Je([this.dayGrid.coordMap, this.timeGrid.coordMap])) : this.coordMap = this.timeGrid.coordMap
            },
            setRange: function(t) {
                an.prototype.setRange.call(this, t), this.timeGrid.setRange(t), this.dayGrid && this.dayGrid.setRange(t)
            },
            render: function() {
                this.el.addClass("fc-agenda-view").html(this.renderHtml()), this.scrollerEl = this.el.find(".fc-time-grid-container"), this.timeGrid.coordMap.containerEl = this.scrollerEl, this.timeGrid.setElement(this.el.find(".fc-time-grid")), this.timeGrid.renderDates(), this.bottomRuleEl = t('<hr class="fc-divider ' + this.widgetHeaderClass + '"/>').appendTo(this.timeGrid.el), this.dayGrid && (this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(), this.dayGrid.bottomCoordPadding = this.dayGrid.el.next("hr").outerHeight()), this.noScrollRowEls = this.el.find(".fc-row:not(.fc-scroller *)")
            },
            destroy: function() {
                this.timeGrid.destroyDates(), this.timeGrid.removeElement(), this.dayGrid && (this.dayGrid.destroyDates(), this.dayGrid.removeElement())
            },
            renderBusinessHours: function() {
                this.timeGrid.renderBusinessHours(), this.dayGrid && this.dayGrid.renderBusinessHours()
            },
            renderHtml: function() {
                return '<table><thead class="fc-head"><tr><td class="' + this.widgetHeaderClass + '">' + this.timeGrid.headHtml() + "</td>" + "</tr>" + "</thead>" + '<tbody class="fc-body">' + "<tr>" + '<td class="' + this.widgetContentClass + '">' + (this.dayGrid ? '<div class="fc-day-grid"/><hr class="fc-divider ' + this.widgetHeaderClass + '"/>' : "") + '<div class="fc-time-grid-container">' + '<div class="fc-time-grid"/>' + "</div>" + "</td>" + "</tr>" + "</tbody>" + "</table>"
            },
            headIntroHtml: function() {
                var t, e;
                return this.opt("weekNumbers") ? (t = this.timeGrid.getCell(0).start, e = t.format(this.opt("smallWeekFormat")), '<th class="fc-axis fc-week-number ' + this.widgetHeaderClass + '" ' + this.axisStyleAttr() + ">" + "<span>" + Y(e) + "</span>" + "</th>") : '<th class="fc-axis ' + this.widgetHeaderClass + '" ' + this.axisStyleAttr() + "></th>"
            },
            dayIntroHtml: function() {
                return '<td class="fc-axis ' + this.widgetContentClass + '" ' + this.axisStyleAttr() + ">" + "<span>" + (this.opt("allDayHtml") || Y(this.opt("allDayText"))) + "</span>" + "</td>"
            },
            slotBgIntroHtml: function() {
                return '<td class="fc-axis ' + this.widgetContentClass + '" ' + this.axisStyleAttr() + "></td>"
            },
            introHtml: function() {
                return '<td class="fc-axis" ' + this.axisStyleAttr() + "></td>"
            },
            axisStyleAttr: function() {
                return null !== this.axisWidth ? 'style="width:' + this.axisWidth + 'px"' : ""
            },
            updateSize: function(t) {
                this.timeGrid.updateSize(t), an.prototype.updateSize.call(this, t)
            },
            updateWidth: function() {
                this.axisWidth = c(this.el.find(".fc-axis"))
            },
            setHeight: function(t, e) {
                var n, i;
                null === this.bottomRuleHeight && (this.bottomRuleHeight = this.bottomRuleEl.outerHeight()), this.bottomRuleEl.hide(), this.scrollerEl.css("overflow", ""), h(this.scrollerEl), s(this.noScrollRowEls), this.dayGrid && (this.dayGrid.destroySegPopover(), n = this.opt("eventLimit"), n && "number" != typeof n && (n = wn), n && this.dayGrid.limitRows(n)), e || (i = this.computeScrollerHeight(t), d(this.scrollerEl, i) ? (r(this.noScrollRowEls, v(this.scrollerEl)), i = this.computeScrollerHeight(t), this.scrollerEl.height(i)) : (this.scrollerEl.height(i).css("overflow", "hidden"), this.bottomRuleEl.show()))
            },
            computeInitialScroll: function() {
                var t = e.duration(this.opt("scrollTime")),
                    n = this.timeGrid.computeTimeTop(t);
                return n = Math.ceil(n), n && n++, n
            },
            renderEvents: function(t) {
                var e, n, i = [],
                    r = [],
                    s = [];
                for (n = 0; t.length > n; n++) t[n].allDay ? i.push(t[n]) : r.push(t[n]);
                e = this.timeGrid.renderEvents(r), this.dayGrid && (s = this.dayGrid.renderEvents(i)), this.updateHeight()
            },
            getEventSegs: function() {
                return this.timeGrid.getEventSegs().concat(this.dayGrid ? this.dayGrid.getEventSegs() : [])
            },
            destroyEvents: function() {
                this.timeGrid.destroyEvents(), this.dayGrid && this.dayGrid.destroyEvents()
            },
            renderDrag: function(t, e) {
                return t.start.hasTime() ? this.timeGrid.renderDrag(t, e) : this.dayGrid ? this.dayGrid.renderDrag(t, e) : void 0
            },
            destroyDrag: function() {
                this.timeGrid.destroyDrag(), this.dayGrid && this.dayGrid.destroyDrag()
            },
            renderSelection: function(t) {
                t.start.hasTime() || t.end.hasTime() ? this.timeGrid.renderSelection(t) : this.dayGrid && this.dayGrid.renderSelection(t)
            },
            destroySelection: function() {
                this.timeGrid.destroySelection(), this.dayGrid && this.dayGrid.destroySelection()
            }
        });
    return En.defaults = yn, _e.agendaWeek = {
        type: "agenda",
        duration: {
            weeks: 1
        }
    }, _e.agendaDay = {
        type: "agenda",
        duration: {
            days: 1
        }
    }, Le
});
(function(e) {
    "function" == typeof define && define.amd ? define(["jquery", "moment"], e) : e(jQuery, moment)
})(function(e, t) {
    (t.defineLocale || t.lang).call(t, "pt-br", {
        months: "janeiro_fevereiro_marÃ§o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
        monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
        weekdays: "domingo_segunda-feira_terÃ§a-feira_quarta-feira_quinta-feira_sexta-feira_sÃ¡bado".split("_"),
        weekdaysShort: "dom_seg_ter_qua_qui_sex_sÃ¡b".split("_"),
        weekdaysMin: "dom_2Âª_3Âª_4Âª_5Âª_6Âª_sÃ¡b".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "LT:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY [Ã s] LT",
            LLLL: "dddd, D [de] MMMM [de] YYYY [Ã s] LT"
        },
        calendar: {
            sameDay: "[Hoje Ã s] LT",
            nextDay: "[AmanhÃ£ Ã s] LT",
            nextWeek: "dddd [Ã s] LT",
            lastDay: "[Ontem Ã s] LT",
            lastWeek: function() {
                return 0 === this.day() || 6 === this.day() ? "[Ãšltimo] dddd [Ã s] LT" : "[Ãšltima] dddd [Ã s] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "em %s",
            past: "%s atrÃ¡s",
            s: "segundos",
            m: "um minuto",
            mm: "%d minutos",
            h: "uma hora",
            hh: "%d horas",
            d: "um dia",
            dd: "%d dias",
            M: "um mÃªs",
            MM: "%d meses",
            y: "um ano",
            yy: "%d anos"
        },
        ordinalParse: /\d{1,2}Âº/,
        ordinal: "%dÂº"
    }), e.fullCalendar.datepickerLang("pt-br", "pt-BR", {
        closeText: "Fechar",
        prevText: "&#x3C;Anterior",
        nextText: "PrÃ³ximo&#x3E;",
        currentText: "Hoje",
        monthNames: ["Janeiro", "Fevereiro", "MarÃ§o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        dayNames: ["Domingo", "Segunda-feira", "TerÃ§a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "SÃ¡bado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "SÃ¡b"],
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "SÃ¡b"],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    }), e.fullCalendar.lang("pt-br", {
        buttonText: {
            month: "MÃªs",
            week: "Semana",
            day: "Dia",
            list: "Compromissos"
        },
        allDayText: "dia inteiro",
        eventLimitText: function(e) {
            return "mais +" + e
        }
    })
});

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$




! function(e) {
    var t = function(t, n) {
        this.$element = e(t), this.type = this.$element.data("uploadtype") || (this.$element.find(".thumbnail").length > 0 ? "image" : "file"), this.$input = this.$element.find(":file");
        if (this.$input.length === 0) return;
        this.name = this.$input.attr("name") || n.name, this.$hidden = this.$element.find('input[type=hidden][name="' + this.name + '"]'), this.$hidden.length === 0 && (this.$hidden = e('<input type="hidden" />'), this.$element.prepend(this.$hidden)), this.$preview = this.$element.find(".fileupload-preview");
        var r = this.$preview.css("height");
        this.$preview.css("display") != "inline" && r != "0px" && r != "none" && this.$preview.css("line-height", r), this.original = {
            exists: this.$element.hasClass("fileupload-exists"),
            preview: this.$preview.html(),
            hiddenVal: this.$hidden.val()
        }, this.$remove = this.$element.find('[data-dismiss="fileupload"]'), this.$element.find('[data-trigger="fileupload"]').on("click.fileupload", e.proxy(this.trigger, this)), this.listen()
    };
    t.prototype = {
        listen: function() {
            this.$input.on("change.fileupload", e.proxy(this.change, this)), e(this.$input[0].form).on("reset.fileupload", e.proxy(this.reset, this)), this.$remove && this.$remove.on("click.fileupload", e.proxy(this.clear, this))
        },
        change: function(e, t) {
            if (t === "clear") return;
            var n = e.target.files !== undefined ? e.target.files[0] : e.target.value ? {
                name: e.target.value.replace(/^.+\\/, "")
            } : null;
            if (!n) {
                this.clear();
                return
            }
            this.$hidden.val(""), this.$hidden.attr("name", ""), this.$input.attr("name", this.name);
            if (this.type === "image" && this.$preview.length > 0 && (typeof n.type != "undefined" ? n.type.match("image.*") : n.name.match(/\.(gif|png|jpe?g)$/i)) && typeof FileReader != "undefined") {
                var r = new FileReader,
                    i = this.$preview,
                    s = this.$element;
                r.onload = function(e) {
                    i.html('<img src="' + e.target.result + '" ' + (i.css("max-height") != "none" ? 'style="max-height: ' + i.css("max-height") + ';"' : "") + " />"), s.addClass("fileupload-exists").removeClass("fileupload-new")
                }, r.readAsDataURL(n)
            } else this.$preview.text(n.name), this.$element.addClass("fileupload-exists").removeClass("fileupload-new")
        },
        clear: function(e) {
            this.$hidden.val(""), this.$hidden.attr("name", this.name), this.$input.attr("name", "");
            if (navigator.userAgent.match(/msie/i)) {
                var t = this.$input.clone(!0);
                this.$input.after(t), this.$input.remove(), this.$input = t
            } else this.$input.val("");
            this.$preview.html(""), this.$element.addClass("fileupload-new").removeClass("fileupload-exists"), e && (this.$input.trigger("change", ["clear"]), e.preventDefault())
        },
        reset: function(e) {
            this.clear(), this.$hidden.val(this.original.hiddenVal), this.$preview.html(this.original.preview), this.original.exists ? this.$element.addClass("fileupload-exists").removeClass("fileupload-new") : this.$element.addClass("fileupload-new").removeClass("fileupload-exists")
        },
        trigger: function(e) {
            this.$input.trigger("click"), e.preventDefault()
        }
    }, e.fn.fileupload = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("fileupload");
            i || r.data("fileupload", i = new t(this, n)), typeof n == "string" && i[n]()
        })
    }, e.fn.fileupload.Constructor = t, e(document).on("click.fileupload.data-api", '[data-provides="fileupload"]', function(t) {
        var n = e(this);
        if (n.data("fileupload")) return;
        n.fileupload(n.data());
        var r = e(t.target).closest('[data-dismiss="fileupload"],[data-trigger="fileupload"]');
        r.length > 0 && (r.trigger("click.fileupload"), t.preventDefault())
    })
}(window.jQuery)

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

$(document).on('change', '.btn-file :file', function() {
  var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
        
    });
});