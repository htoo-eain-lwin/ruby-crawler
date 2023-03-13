(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/i18n-js/app/assets/javascripts/i18n.js
  var require_i18n = __commonJS({
    "node_modules/i18n-js/app/assets/javascripts/i18n.js"(exports, module) {
      init_global();
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          define("i18n", function() {
            return factory(root);
          });
        } else if (typeof module === "object" && module.exports) {
          module.exports = factory(root);
        } else {
          root.I18n = factory(root);
        }
      })(exports, function(global) {
        "use strict";
        var I18n2 = global && global.I18n || {};
        var slice = Array.prototype.slice;
        var padding = function(number) {
          return ("0" + number.toString()).substr(-2);
        };
        var toFixed = function(number, precision) {
          return decimalAdjust("round", number, -precision).toFixed(precision);
        };
        var isObject = function(obj) {
          var type = typeof obj;
          return type === "function" || type === "object";
        };
        var isFunction = function(func) {
          var type = typeof func;
          return type === "function";
        };
        var isSet = function(value) {
          return typeof value !== "undefined" && value !== null;
        };
        var isArray = function(val) {
          if (Array.isArray) {
            return Array.isArray(val);
          }
          return Object.prototype.toString.call(val) === "[object Array]";
        };
        var isString = function(val) {
          return typeof val === "string" || Object.prototype.toString.call(val) === "[object String]";
        };
        var isNumber = function(val) {
          return typeof val === "number" || Object.prototype.toString.call(val) === "[object Number]";
        };
        var isBoolean = function(val) {
          return val === true || val === false;
        };
        var isNull = function(val) {
          return val === null;
        };
        var decimalAdjust = function(type, value, exp) {
          if (typeof exp === "undefined" || +exp === 0) {
            return Math[type](value);
          }
          value = +value;
          exp = +exp;
          if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
            return NaN;
          }
          value = value.toString().split("e");
          value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
          value = value.toString().split("e");
          return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
        };
        var lazyEvaluate = function(message, scope) {
          if (isFunction(message)) {
            return message(scope);
          } else {
            return message;
          }
        };
        var merge = function(dest, obj) {
          var key, value;
          for (key in obj)
            if (obj.hasOwnProperty(key)) {
              value = obj[key];
              if (isString(value) || isNumber(value) || isBoolean(value) || isArray(value) || isNull(value)) {
                dest[key] = value;
              } else {
                if (dest[key] == null)
                  dest[key] = {};
                merge(dest[key], value);
              }
            }
          return dest;
        };
        var DATE = {
          day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          meridian: ["AM", "PM"]
        };
        var NUMBER_FORMAT = {
          precision: 3,
          separator: ".",
          delimiter: ",",
          strip_insignificant_zeros: false
        };
        var CURRENCY_FORMAT = {
          unit: "$",
          precision: 2,
          format: "%u%n",
          sign_first: true,
          delimiter: ",",
          separator: "."
        };
        var PERCENTAGE_FORMAT = {
          unit: "%",
          precision: 3,
          format: "%n%u",
          separator: ".",
          delimiter: ""
        };
        var SIZE_UNITS = [null, "kb", "mb", "gb", "tb"];
        var DEFAULT_OPTIONS = {
          // Set default locale. This locale will be used when fallback is enabled and
          // the translation doesn't exist in a particular locale.
          defaultLocale: "en",
          locale: "en",
          defaultSeparator: ".",
          placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,
          fallbacks: false,
          translations: {},
          missingBehaviour: "message",
          missingTranslationPrefix: ""
        };
        I18n2.reset = function() {
          var key;
          for (key in DEFAULT_OPTIONS) {
            this[key] = DEFAULT_OPTIONS[key];
          }
        };
        I18n2.initializeOptions = function() {
          var key;
          for (key in DEFAULT_OPTIONS)
            if (!isSet(this[key])) {
              this[key] = DEFAULT_OPTIONS[key];
            }
        };
        I18n2.initializeOptions();
        I18n2.locales = {};
        I18n2.locales.get = function(locale) {
          var result = this[locale] || this[I18n2.locale] || this["default"];
          if (isFunction(result)) {
            result = result(locale);
          }
          if (isArray(result) === false) {
            result = [result];
          }
          return result;
        };
        I18n2.locales["default"] = function(locale) {
          var locales = [], list = [];
          if (locale) {
            locales.push(locale);
          }
          if (!locale && I18n2.locale) {
            locales.push(I18n2.locale);
          }
          if (I18n2.fallbacks && I18n2.defaultLocale) {
            locales.push(I18n2.defaultLocale);
          }
          locales.forEach(function(locale2) {
            var localeParts = locale2.split("-");
            var firstFallback = null;
            var secondFallback = null;
            if (localeParts.length === 3) {
              firstFallback = [
                localeParts[0],
                localeParts[1]
              ].join("-");
              secondFallback = localeParts[0];
            } else if (localeParts.length === 2) {
              firstFallback = localeParts[0];
            }
            if (list.indexOf(locale2) === -1) {
              list.push(locale2);
            }
            if (!I18n2.fallbacks) {
              return;
            }
            [
              firstFallback,
              secondFallback
            ].forEach(function(nullableFallbackLocale) {
              if (typeof nullableFallbackLocale === "undefined") {
                return;
              }
              if (nullableFallbackLocale === null) {
                return;
              }
              if (nullableFallbackLocale === locale2) {
                return;
              }
              if (list.indexOf(nullableFallbackLocale) !== -1) {
                return;
              }
              list.push(nullableFallbackLocale);
            });
          });
          if (!locales.length) {
            locales.push("en");
          }
          return list;
        };
        I18n2.pluralization = {};
        I18n2.pluralization.get = function(locale) {
          return this[locale] || this[I18n2.locale] || this["default"];
        };
        I18n2.pluralization["default"] = function(count) {
          switch (count) {
            case 0:
              return ["zero", "other"];
            case 1:
              return ["one"];
            default:
              return ["other"];
          }
        };
        I18n2.currentLocale = function() {
          return this.locale || this.defaultLocale;
        };
        I18n2.isSet = isSet;
        I18n2.lookup = function(scope, options) {
          options = options || {};
          var locales = this.locales.get(options.locale).slice(), locale, scopes, fullScope, translations;
          fullScope = this.getFullScope(scope, options);
          while (locales.length) {
            locale = locales.shift();
            scopes = fullScope.split(options.separator || this.defaultSeparator);
            translations = this.translations[locale];
            if (!translations) {
              continue;
            }
            while (scopes.length) {
              translations = translations[scopes.shift()];
              if (translations === void 0 || translations === null) {
                break;
              }
            }
            if (translations !== void 0 && translations !== null) {
              return translations;
            }
          }
          if (isSet(options.defaultValue)) {
            return lazyEvaluate(options.defaultValue, scope);
          }
        };
        I18n2.pluralizationLookupWithoutFallback = function(count, locale, translations) {
          var pluralizer = this.pluralization.get(locale), pluralizerKeys = pluralizer(count), pluralizerKey, message;
          if (isObject(translations)) {
            while (pluralizerKeys.length) {
              pluralizerKey = pluralizerKeys.shift();
              if (isSet(translations[pluralizerKey])) {
                message = translations[pluralizerKey];
                break;
              }
            }
          }
          return message;
        };
        I18n2.pluralizationLookup = function(count, scope, options) {
          options = options || {};
          var locales = this.locales.get(options.locale).slice(), locale, scopes, translations, message;
          scope = this.getFullScope(scope, options);
          while (locales.length) {
            locale = locales.shift();
            scopes = scope.split(options.separator || this.defaultSeparator);
            translations = this.translations[locale];
            if (!translations) {
              continue;
            }
            while (scopes.length) {
              translations = translations[scopes.shift()];
              if (!isObject(translations)) {
                break;
              }
              if (scopes.length === 0) {
                message = this.pluralizationLookupWithoutFallback(count, locale, translations);
              }
            }
            if (typeof message !== "undefined" && message !== null) {
              break;
            }
          }
          if (typeof message === "undefined" || message === null) {
            if (isSet(options.defaultValue)) {
              if (isObject(options.defaultValue)) {
                message = this.pluralizationLookupWithoutFallback(count, options.locale, options.defaultValue);
              } else {
                message = options.defaultValue;
              }
              translations = options.defaultValue;
            }
          }
          return { message, translations };
        };
        I18n2.meridian = function() {
          var time = this.lookup("time");
          var date = this.lookup("date");
          if (time && time.am && time.pm) {
            return [time.am, time.pm];
          } else if (date && date.meridian) {
            return date.meridian;
          } else {
            return DATE.meridian;
          }
        };
        I18n2.prepareOptions = function() {
          var args = slice.call(arguments), options = {}, subject;
          while (args.length) {
            subject = args.shift();
            if (typeof subject != "object") {
              continue;
            }
            for (var attr in subject) {
              if (!subject.hasOwnProperty(attr)) {
                continue;
              }
              if (isSet(options[attr])) {
                continue;
              }
              options[attr] = subject[attr];
            }
          }
          return options;
        };
        I18n2.createTranslationOptions = function(scope, options) {
          var translationOptions = [{ scope }];
          if (isSet(options.defaults)) {
            translationOptions = translationOptions.concat(options.defaults);
          }
          if (isSet(options.defaultValue)) {
            translationOptions.push({ message: options.defaultValue });
          }
          return translationOptions;
        };
        I18n2.translate = function(scope, options) {
          options = options || {};
          var translationOptions = this.createTranslationOptions(scope, options);
          var translation;
          var usedScope = scope;
          var optionsWithoutDefault = this.prepareOptions(options);
          delete optionsWithoutDefault.defaultValue;
          var translationFound = translationOptions.some(function(translationOption) {
            if (isSet(translationOption.scope)) {
              usedScope = translationOption.scope;
              translation = this.lookup(usedScope, optionsWithoutDefault);
            } else if (isSet(translationOption.message)) {
              translation = lazyEvaluate(translationOption.message, scope);
            }
            if (translation !== void 0 && translation !== null) {
              return true;
            }
          }, this);
          if (!translationFound) {
            return this.missingTranslation(scope, options);
          }
          if (typeof translation === "string") {
            translation = this.interpolate(translation, options);
          } else if (isArray(translation)) {
            translation = translation.map(function(t) {
              return typeof t === "string" ? this.interpolate(t, options) : t;
            }, this);
          } else if (isObject(translation) && isSet(options.count)) {
            translation = this.pluralize(options.count, usedScope, options);
          }
          return translation;
        };
        I18n2.interpolate = function(message, options) {
          if (message == null) {
            return message;
          }
          options = options || {};
          var matches = message.match(this.placeholder), placeholder, value, name, regex;
          if (!matches) {
            return message;
          }
          while (matches.length) {
            placeholder = matches.shift();
            name = placeholder.replace(this.placeholder, "$1");
            if (isSet(options[name])) {
              value = options[name].toString().replace(/\$/gm, "_#$#_");
            } else if (name in options) {
              value = this.nullPlaceholder(placeholder, message, options);
            } else {
              value = this.missingPlaceholder(placeholder, message, options);
            }
            regex = new RegExp(placeholder.replace(/{/gm, "\\{").replace(/}/gm, "\\}"));
            message = message.replace(regex, value);
          }
          return message.replace(/_#\$#_/g, "$");
        };
        I18n2.pluralize = function(count, scope, options) {
          options = this.prepareOptions({ count: String(count) }, options);
          var pluralizer, result;
          result = this.pluralizationLookup(count, scope, options);
          if (typeof result.translations === "undefined" || result.translations == null) {
            return this.missingTranslation(scope, options);
          }
          if (typeof result.message !== "undefined" && result.message != null) {
            return this.interpolate(result.message, options);
          } else {
            pluralizer = this.pluralization.get(options.locale);
            return this.missingTranslation(scope + "." + pluralizer(count)[0], options);
          }
        };
        I18n2.missingTranslation = function(scope, options) {
          if (this.missingBehaviour === "guess") {
            var s = scope.split(".").slice(-1)[0];
            return (this.missingTranslationPrefix.length > 0 ? this.missingTranslationPrefix : "") + s.replace(/_/g, " ").replace(
              /([a-z])([A-Z])/g,
              function(match, p1, p2) {
                return p1 + " " + p2.toLowerCase();
              }
            );
          }
          var localeForTranslation = options != null && options.locale != null ? options.locale : this.currentLocale();
          var fullScope = this.getFullScope(scope, options);
          var fullScopeWithLocale = [localeForTranslation, fullScope].join(options.separator || this.defaultSeparator);
          return '[missing "' + fullScopeWithLocale + '" translation]';
        };
        I18n2.missingPlaceholder = function(placeholder, message, options) {
          return "[missing " + placeholder + " value]";
        };
        I18n2.nullPlaceholder = function() {
          return I18n2.missingPlaceholder.apply(I18n2, arguments);
        };
        I18n2.toNumber = function(number, options) {
          options = this.prepareOptions(
            options,
            this.lookup("number.format"),
            NUMBER_FORMAT
          );
          var negative = number < 0, string = toFixed(Math.abs(number), options.precision).toString(), parts = string.split("."), precision, buffer = [], formattedNumber, format = options.format || "%n", sign = negative ? "-" : "";
          number = parts[0];
          precision = parts[1];
          while (number.length > 0) {
            buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
            number = number.substr(0, number.length - 3);
          }
          formattedNumber = buffer.join(options.delimiter);
          if (options.strip_insignificant_zeros && precision) {
            precision = precision.replace(/0+$/, "");
          }
          if (options.precision > 0 && precision) {
            formattedNumber += options.separator + precision;
          }
          if (options.sign_first) {
            format = "%s" + format;
          } else {
            format = format.replace("%n", "%s%n");
          }
          formattedNumber = format.replace("%u", options.unit).replace("%n", formattedNumber).replace("%s", sign);
          return formattedNumber;
        };
        I18n2.toCurrency = function(number, options) {
          options = this.prepareOptions(
            options,
            this.lookup("number.currency.format", options),
            this.lookup("number.format", options),
            CURRENCY_FORMAT
          );
          return this.toNumber(number, options);
        };
        I18n2.localize = function(scope, value, options) {
          options || (options = {});
          switch (scope) {
            case "currency":
              return this.toCurrency(value, options);
            case "number":
              scope = this.lookup("number.format", options);
              return this.toNumber(value, scope);
            case "percentage":
              return this.toPercentage(value, options);
            default:
              var localizedValue;
              if (scope.match(/^(date|time)/)) {
                localizedValue = this.toTime(scope, value, options);
              } else {
                localizedValue = value.toString();
              }
              return this.interpolate(localizedValue, options);
          }
        };
        I18n2.parseDate = function(date) {
          var matches, convertedDate, fraction;
          if (date == null) {
            return date;
          }
          if (typeof date === "object") {
            return date;
          }
          matches = date.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})([\.,]\d{1,3})?)?(Z|\+00:?00)?/);
          if (matches) {
            for (var i = 1; i <= 6; i++) {
              matches[i] = parseInt(matches[i], 10) || 0;
            }
            matches[2] -= 1;
            fraction = matches[7] ? 1e3 * ("0" + matches[7]) : null;
            if (matches[8]) {
              convertedDate = new Date(Date.UTC(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction));
            } else {
              convertedDate = new Date(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction);
            }
          } else if (typeof date == "number") {
            convertedDate = /* @__PURE__ */ new Date();
            convertedDate.setTime(date);
          } else if (date.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/)) {
            convertedDate = /* @__PURE__ */ new Date();
            convertedDate.setTime(Date.parse([
              RegExp.$1,
              RegExp.$2,
              RegExp.$3,
              RegExp.$6,
              RegExp.$4,
              RegExp.$5
            ].join(" ")));
          } else if (date.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/)) {
            convertedDate = /* @__PURE__ */ new Date();
            convertedDate.setTime(Date.parse(date));
          } else {
            convertedDate = /* @__PURE__ */ new Date();
            convertedDate.setTime(Date.parse(date));
          }
          return convertedDate;
        };
        I18n2.strftime = function(date, format, options) {
          var options = this.lookup("date", options), meridianOptions = I18n2.meridian();
          if (!options) {
            options = {};
          }
          options = this.prepareOptions(options, DATE);
          if (isNaN(date.getTime())) {
            throw new Error("I18n.strftime() requires a valid date object, but received an invalid date.");
          }
          var weekDay = date.getDay(), day = date.getDate(), year = date.getFullYear(), month = date.getMonth() + 1, hour = date.getHours(), hour12 = hour, meridian = hour > 11 ? 1 : 0, secs = date.getSeconds(), mins = date.getMinutes(), offset = date.getTimezoneOffset(), absOffsetHours = Math.floor(Math.abs(offset / 60)), absOffsetMinutes = Math.abs(offset) - absOffsetHours * 60, timezoneoffset = (offset > 0 ? "-" : "+") + (absOffsetHours.toString().length < 2 ? "0" + absOffsetHours : absOffsetHours) + (absOffsetMinutes.toString().length < 2 ? "0" + absOffsetMinutes : absOffsetMinutes);
          if (hour12 > 12) {
            hour12 = hour12 - 12;
          } else if (hour12 === 0) {
            hour12 = 12;
          }
          format = format.replace("%a", options.abbr_day_names[weekDay]);
          format = format.replace("%A", options.day_names[weekDay]);
          format = format.replace("%b", options.abbr_month_names[month]);
          format = format.replace("%B", options.month_names[month]);
          format = format.replace("%d", padding(day));
          format = format.replace("%e", day);
          format = format.replace("%-d", day);
          format = format.replace("%H", padding(hour));
          format = format.replace("%-H", hour);
          format = format.replace("%k", hour);
          format = format.replace("%I", padding(hour12));
          format = format.replace("%-I", hour12);
          format = format.replace("%l", hour12);
          format = format.replace("%m", padding(month));
          format = format.replace("%-m", month);
          format = format.replace("%M", padding(mins));
          format = format.replace("%-M", mins);
          format = format.replace("%p", meridianOptions[meridian]);
          format = format.replace("%P", meridianOptions[meridian].toLowerCase());
          format = format.replace("%S", padding(secs));
          format = format.replace("%-S", secs);
          format = format.replace("%w", weekDay);
          format = format.replace("%y", padding(year));
          format = format.replace("%-y", padding(year).replace(/^0+/, ""));
          format = format.replace("%Y", year);
          format = format.replace("%z", timezoneoffset);
          format = format.replace("%Z", timezoneoffset);
          return format;
        };
        I18n2.toTime = function(scope, dateString, options) {
          var date = this.parseDate(dateString), format = this.lookup(scope, options);
          if (date == null) {
            return date;
          }
          var date_string = date.toString();
          if (date_string.match(/invalid/i)) {
            return date_string;
          }
          if (!format) {
            return date_string;
          }
          return this.strftime(date, format, options);
        };
        I18n2.toPercentage = function(number, options) {
          options = this.prepareOptions(
            options,
            this.lookup("number.percentage.format", options),
            this.lookup("number.format", options),
            PERCENTAGE_FORMAT
          );
          return this.toNumber(number, options);
        };
        I18n2.toHumanSize = function(number, options) {
          var kb = 1024, size = number, iterations = 0, unit, precision, fullScope;
          while (size >= kb && iterations < 4) {
            size = size / kb;
            iterations += 1;
          }
          if (iterations === 0) {
            fullScope = this.getFullScope("number.human.storage_units.units.byte", options);
            unit = this.t(fullScope, { count: size });
            precision = 0;
          } else {
            fullScope = this.getFullScope("number.human.storage_units.units." + SIZE_UNITS[iterations], options);
            unit = this.t(fullScope);
            precision = size - Math.floor(size) === 0 ? 0 : 1;
          }
          options = this.prepareOptions(
            options,
            { unit, precision, format: "%n%u", delimiter: "" }
          );
          return this.toNumber(size, options);
        };
        I18n2.getFullScope = function(scope, options) {
          options = options || {};
          if (isArray(scope)) {
            scope = scope.join(options.separator || this.defaultSeparator);
          }
          if (options.scope) {
            scope = [options.scope, scope].join(options.separator || this.defaultSeparator);
          }
          return scope;
        };
        I18n2.extend = function(obj1, obj2) {
          if (typeof obj1 === "undefined" && typeof obj2 === "undefined") {
            return {};
          }
          return merge(obj1, obj2);
        };
        I18n2.t = I18n2.translate.bind(I18n2);
        I18n2.l = I18n2.localize.bind(I18n2);
        I18n2.p = I18n2.pluralize.bind(I18n2);
        return I18n2;
      });
    }
  });

  // app/javascript/global.js
  var import_i18n_js;
  var init_global = __esm({
    "app/javascript/global.js"() {
      import_i18n_js = __toESM(require_i18n());
    }
  });

  // node_modules/bootstrap/js/dist/dom/event-handler.js
  var require_event_handler = __commonJS({
    "node_modules/bootstrap/js/dist/dom/event-handler.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.EventHandler = factory());
      })(exports, function() {
        "use strict";
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
        const stripNameRegex = /\..*/;
        const stripUidRegex = /::\d+$/;
        const eventRegistry = {};
        let uidEvent = 1;
        const customEvents = {
          mouseenter: "mouseover",
          mouseleave: "mouseout"
        };
        const customEventsRegex = /^(mouseenter|mouseleave)/i;
        const nativeEvents = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
        function getUidEvent(element, uid) {
          return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
        }
        function getEvent(element) {
          const uid = getUidEvent(element);
          element.uidEvent = uid;
          eventRegistry[uid] = eventRegistry[uid] || {};
          return eventRegistry[uid];
        }
        function bootstrapHandler(element, fn) {
          return function handler(event) {
            event.delegateTarget = element;
            if (handler.oneOff) {
              EventHandler.off(element, event.type, fn);
            }
            return fn.apply(element, [event]);
          };
        }
        function bootstrapDelegationHandler(element, selector, fn) {
          return function handler(event) {
            const domElements = element.querySelectorAll(selector);
            for (let {
              target
            } = event; target && target !== this; target = target.parentNode) {
              for (let i = domElements.length; i--; ) {
                if (domElements[i] === target) {
                  event.delegateTarget = target;
                  if (handler.oneOff) {
                    EventHandler.off(element, event.type, selector, fn);
                  }
                  return fn.apply(target, [event]);
                }
              }
            }
            return null;
          };
        }
        function findHandler(events, handler, delegationSelector = null) {
          const uidEventList = Object.keys(events);
          for (let i = 0, len = uidEventList.length; i < len; i++) {
            const event = events[uidEventList[i]];
            if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
              return event;
            }
          }
          return null;
        }
        function normalizeParams(originalTypeEvent, handler, delegationFn) {
          const delegation = typeof handler === "string";
          const originalHandler = delegation ? delegationFn : handler;
          let typeEvent = getTypeEvent(originalTypeEvent);
          const isNative = nativeEvents.has(typeEvent);
          if (!isNative) {
            typeEvent = originalTypeEvent;
          }
          return [delegation, originalHandler, typeEvent];
        }
        function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
          if (typeof originalTypeEvent !== "string" || !element) {
            return;
          }
          if (!handler) {
            handler = delegationFn;
            delegationFn = null;
          }
          if (customEventsRegex.test(originalTypeEvent)) {
            const wrapFn = (fn2) => {
              return function(event) {
                if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
                  return fn2.call(this, event);
                }
              };
            };
            if (delegationFn) {
              delegationFn = wrapFn(delegationFn);
            } else {
              handler = wrapFn(handler);
            }
          }
          const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
          const events = getEvent(element);
          const handlers = events[typeEvent] || (events[typeEvent] = {});
          const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);
          if (previousFn) {
            previousFn.oneOff = previousFn.oneOff && oneOff;
            return;
          }
          const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ""));
          const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
          fn.delegationSelector = delegation ? handler : null;
          fn.originalHandler = originalHandler;
          fn.oneOff = oneOff;
          fn.uidEvent = uid;
          handlers[uid] = fn;
          element.addEventListener(typeEvent, fn, delegation);
        }
        function removeHandler(element, events, typeEvent, handler, delegationSelector) {
          const fn = findHandler(events[typeEvent], handler, delegationSelector);
          if (!fn) {
            return;
          }
          element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
          delete events[typeEvent][fn.uidEvent];
        }
        function removeNamespacedHandlers(element, events, typeEvent, namespace) {
          const storeElementEvent = events[typeEvent] || {};
          Object.keys(storeElementEvent).forEach((handlerKey) => {
            if (handlerKey.includes(namespace)) {
              const event = storeElementEvent[handlerKey];
              removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
            }
          });
        }
        function getTypeEvent(event) {
          event = event.replace(stripNameRegex, "");
          return customEvents[event] || event;
        }
        const EventHandler = {
          on(element, event, handler, delegationFn) {
            addHandler(element, event, handler, delegationFn, false);
          },
          one(element, event, handler, delegationFn) {
            addHandler(element, event, handler, delegationFn, true);
          },
          off(element, originalTypeEvent, handler, delegationFn) {
            if (typeof originalTypeEvent !== "string" || !element) {
              return;
            }
            const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
            const inNamespace = typeEvent !== originalTypeEvent;
            const events = getEvent(element);
            const isNamespace = originalTypeEvent.startsWith(".");
            if (typeof originalHandler !== "undefined") {
              if (!events || !events[typeEvent]) {
                return;
              }
              removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
              return;
            }
            if (isNamespace) {
              Object.keys(events).forEach((elementEvent) => {
                removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
              });
            }
            const storeElementEvent = events[typeEvent] || {};
            Object.keys(storeElementEvent).forEach((keyHandlers) => {
              const handlerKey = keyHandlers.replace(stripUidRegex, "");
              if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
                const event = storeElementEvent[keyHandlers];
                removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
              }
            });
          },
          trigger(element, event, args) {
            if (typeof event !== "string" || !element) {
              return null;
            }
            const $ = getjQuery();
            const typeEvent = getTypeEvent(event);
            const inNamespace = event !== typeEvent;
            const isNative = nativeEvents.has(typeEvent);
            let jQueryEvent;
            let bubbles = true;
            let nativeDispatch = true;
            let defaultPrevented = false;
            let evt = null;
            if (inNamespace && $) {
              jQueryEvent = $.Event(event, args);
              $(element).trigger(jQueryEvent);
              bubbles = !jQueryEvent.isPropagationStopped();
              nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
              defaultPrevented = jQueryEvent.isDefaultPrevented();
            }
            if (isNative) {
              evt = document.createEvent("HTMLEvents");
              evt.initEvent(typeEvent, bubbles, true);
            } else {
              evt = new CustomEvent(event, {
                bubbles,
                cancelable: true
              });
            }
            if (typeof args !== "undefined") {
              Object.keys(args).forEach((key) => {
                Object.defineProperty(evt, key, {
                  get() {
                    return args[key];
                  }
                });
              });
            }
            if (defaultPrevented) {
              evt.preventDefault();
            }
            if (nativeDispatch) {
              element.dispatchEvent(evt);
            }
            if (evt.defaultPrevented && typeof jQueryEvent !== "undefined") {
              jQueryEvent.preventDefault();
            }
            return evt;
          }
        };
        return EventHandler;
      });
    }
  });

  // node_modules/bootstrap/js/dist/dom/data.js
  var require_data = __commonJS({
    "node_modules/bootstrap/js/dist/dom/data.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Data = factory());
      })(exports, function() {
        "use strict";
        const elementMap = /* @__PURE__ */ new Map();
        const data = {
          set(element, key, instance) {
            if (!elementMap.has(element)) {
              elementMap.set(element, /* @__PURE__ */ new Map());
            }
            const instanceMap = elementMap.get(element);
            if (!instanceMap.has(key) && instanceMap.size !== 0) {
              console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
              return;
            }
            instanceMap.set(key, instance);
          },
          get(element, key) {
            if (elementMap.has(element)) {
              return elementMap.get(element).get(key) || null;
            }
            return null;
          },
          remove(element, key) {
            if (!elementMap.has(element)) {
              return;
            }
            const instanceMap = elementMap.get(element);
            instanceMap.delete(key);
            if (instanceMap.size === 0) {
              elementMap.delete(element);
            }
          }
        };
        return data;
      });
    }
  });

  // node_modules/bootstrap/js/dist/base-component.js
  var require_base_component = __commonJS({
    "node_modules/bootstrap/js/dist/base-component.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_data(), require_event_handler()) : typeof define === "function" && define.amd ? define(["./dom/data", "./dom/event-handler"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Base = factory(global.Data, global.EventHandler));
      })(exports, function(Data, EventHandler) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const Data__default = /* @__PURE__ */ _interopDefaultLegacy(Data);
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
        const MILLISECONDS_MULTIPLIER = 1e3;
        const TRANSITION_END = "transitionend";
        const getTransitionDurationFromElement = (element) => {
          if (!element) {
            return 0;
          }
          let {
            transitionDuration,
            transitionDelay
          } = window.getComputedStyle(element);
          const floatTransitionDuration = Number.parseFloat(transitionDuration);
          const floatTransitionDelay = Number.parseFloat(transitionDelay);
          if (!floatTransitionDuration && !floatTransitionDelay) {
            return 0;
          }
          transitionDuration = transitionDuration.split(",")[0];
          transitionDelay = transitionDelay.split(",")[0];
          return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
        };
        const triggerTransitionEnd = (element) => {
          element.dispatchEvent(new Event(TRANSITION_END));
        };
        const isElement = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const getElement = (obj) => {
          if (isElement(obj)) {
            return obj.jquery ? obj[0] : obj;
          }
          if (typeof obj === "string" && obj.length > 0) {
            return document.querySelector(obj);
          }
          return null;
        };
        const execute = (callback) => {
          if (typeof callback === "function") {
            callback();
          }
        };
        const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
          if (!waitForTransition) {
            execute(callback);
            return;
          }
          const durationPadding = 5;
          const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
          let called = false;
          const handler = ({
            target
          }) => {
            if (target !== transitionElement) {
              return;
            }
            called = true;
            transitionElement.removeEventListener(TRANSITION_END, handler);
            execute(callback);
          };
          transitionElement.addEventListener(TRANSITION_END, handler);
          setTimeout(() => {
            if (!called) {
              triggerTransitionEnd(transitionElement);
            }
          }, emulatedDuration);
        };
        const VERSION = "5.1.3";
        class BaseComponent {
          constructor(element) {
            element = getElement(element);
            if (!element) {
              return;
            }
            this._element = element;
            Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
          }
          dispose() {
            Data__default.default.remove(this._element, this.constructor.DATA_KEY);
            EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
            Object.getOwnPropertyNames(this).forEach((propertyName) => {
              this[propertyName] = null;
            });
          }
          _queueCallback(callback, element, isAnimated = true) {
            executeAfterTransition(callback, element, isAnimated);
          }
          /** Static */
          static getInstance(element) {
            return Data__default.default.get(getElement(element), this.DATA_KEY);
          }
          static getOrCreateInstance(element, config = {}) {
            return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
          }
          static get VERSION() {
            return VERSION;
          }
          static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!');
          }
          static get DATA_KEY() {
            return `bs.${this.NAME}`;
          }
          static get EVENT_KEY() {
            return `.${this.DATA_KEY}`;
          }
        }
        return BaseComponent;
      });
    }
  });

  // node_modules/bootstrap/js/dist/alert.js
  var require_alert = __commonJS({
    "node_modules/bootstrap/js/dist/alert.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/event-handler", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Alert = factory(global.EventHandler, global.Base));
      })(exports, function(EventHandler, BaseComponent) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent);
        const getSelector = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttr = element.getAttribute("href");
            if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
              return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
              hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
          }
          return selector;
        };
        const getElementFromSelector = (element) => {
          const selector = getSelector(element);
          return selector ? document.querySelector(selector) : null;
        };
        const isDisabled = (element) => {
          if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
          }
          if (element.classList.contains("disabled")) {
            return true;
          }
          if (typeof element.disabled !== "undefined") {
            return element.disabled;
          }
          return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
        };
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const enableDismissTrigger = (component, method = "hide") => {
          const clickEvent = `click.dismiss${component.EVENT_KEY}`;
          const name = component.NAME;
          EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
            if (["A", "AREA"].includes(this.tagName)) {
              event.preventDefault();
            }
            if (isDisabled(this)) {
              return;
            }
            const target = getElementFromSelector(this) || this.closest(`.${name}`);
            const instance = component.getOrCreateInstance(target);
            instance[method]();
          });
        };
        const NAME = "alert";
        const DATA_KEY = "bs.alert";
        const EVENT_KEY = `.${DATA_KEY}`;
        const EVENT_CLOSE = `close${EVENT_KEY}`;
        const EVENT_CLOSED = `closed${EVENT_KEY}`;
        const CLASS_NAME_FADE = "fade";
        const CLASS_NAME_SHOW = "show";
        class Alert2 extends BaseComponent__default.default {
          // Getters
          static get NAME() {
            return NAME;
          }
          // Public
          close() {
            const closeEvent = EventHandler__default.default.trigger(this._element, EVENT_CLOSE);
            if (closeEvent.defaultPrevented) {
              return;
            }
            this._element.classList.remove(CLASS_NAME_SHOW);
            const isAnimated = this._element.classList.contains(CLASS_NAME_FADE);
            this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
          }
          // Private
          _destroyElement() {
            this._element.remove();
            EventHandler__default.default.trigger(this._element, EVENT_CLOSED);
            this.dispose();
          }
          // Static
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Alert2.getOrCreateInstance(this);
              if (typeof config !== "string") {
                return;
              }
              if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config](this);
            });
          }
        }
        enableDismissTrigger(Alert2, "close");
        defineJQueryPlugin(Alert2);
        return Alert2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/button.js
  var require_button = __commonJS({
    "node_modules/bootstrap/js/dist/button.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/event-handler", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Button = factory(global.EventHandler, global.Base));
      })(exports, function(EventHandler, BaseComponent) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent);
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const NAME = "button";
        const DATA_KEY = "bs.button";
        const EVENT_KEY = `.${DATA_KEY}`;
        const DATA_API_KEY = ".data-api";
        const CLASS_NAME_ACTIVE = "active";
        const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
        const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
        class Button2 extends BaseComponent__default.default {
          // Getters
          static get NAME() {
            return NAME;
          }
          // Public
          toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE));
          }
          // Static
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Button2.getOrCreateInstance(this);
              if (config === "toggle") {
                data[config]();
              }
            });
          }
        }
        EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, (event) => {
          event.preventDefault();
          const button = event.target.closest(SELECTOR_DATA_TOGGLE);
          const data = Button2.getOrCreateInstance(button);
          data.toggle();
        });
        defineJQueryPlugin(Button2);
        return Button2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/dom/manipulator.js
  var require_manipulator = __commonJS({
    "node_modules/bootstrap/js/dist/dom/manipulator.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Manipulator = factory());
      })(exports, function() {
        "use strict";
        function normalizeData(val) {
          if (val === "true") {
            return true;
          }
          if (val === "false") {
            return false;
          }
          if (val === Number(val).toString()) {
            return Number(val);
          }
          if (val === "" || val === "null") {
            return null;
          }
          return val;
        }
        function normalizeDataKey(key) {
          return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
        }
        const Manipulator = {
          setDataAttribute(element, key, value) {
            element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
          },
          removeDataAttribute(element, key) {
            element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
          },
          getDataAttributes(element) {
            if (!element) {
              return {};
            }
            const attributes = {};
            Object.keys(element.dataset).filter((key) => key.startsWith("bs")).forEach((key) => {
              let pureKey = key.replace(/^bs/, "");
              pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
              attributes[pureKey] = normalizeData(element.dataset[key]);
            });
            return attributes;
          },
          getDataAttribute(element, key) {
            return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
          },
          offset(element) {
            const rect = element.getBoundingClientRect();
            return {
              top: rect.top + window.pageYOffset,
              left: rect.left + window.pageXOffset
            };
          },
          position(element) {
            return {
              top: element.offsetTop,
              left: element.offsetLeft
            };
          }
        };
        return Manipulator;
      });
    }
  });

  // node_modules/bootstrap/js/dist/dom/selector-engine.js
  var require_selector_engine = __commonJS({
    "node_modules/bootstrap/js/dist/dom/selector-engine.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.SelectorEngine = factory());
      })(exports, function() {
        "use strict";
        const isElement = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const isVisible = (element) => {
          if (!isElement(element) || element.getClientRects().length === 0) {
            return false;
          }
          return getComputedStyle(element).getPropertyValue("visibility") === "visible";
        };
        const isDisabled = (element) => {
          if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
          }
          if (element.classList.contains("disabled")) {
            return true;
          }
          if (typeof element.disabled !== "undefined") {
            return element.disabled;
          }
          return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
        };
        const NODE_TEXT = 3;
        const SelectorEngine = {
          find(selector, element = document.documentElement) {
            return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
          },
          findOne(selector, element = document.documentElement) {
            return Element.prototype.querySelector.call(element, selector);
          },
          children(element, selector) {
            return [].concat(...element.children).filter((child) => child.matches(selector));
          },
          parents(element, selector) {
            const parents = [];
            let ancestor = element.parentNode;
            while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
              if (ancestor.matches(selector)) {
                parents.push(ancestor);
              }
              ancestor = ancestor.parentNode;
            }
            return parents;
          },
          prev(element, selector) {
            let previous = element.previousElementSibling;
            while (previous) {
              if (previous.matches(selector)) {
                return [previous];
              }
              previous = previous.previousElementSibling;
            }
            return [];
          },
          next(element, selector) {
            let next = element.nextElementSibling;
            while (next) {
              if (next.matches(selector)) {
                return [next];
              }
              next = next.nextElementSibling;
            }
            return [];
          },
          focusableChildren(element) {
            const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(", ");
            return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
          }
        };
        return SelectorEngine;
      });
    }
  });

  // node_modules/bootstrap/js/dist/carousel.js
  var require_carousel = __commonJS({
    "node_modules/bootstrap/js/dist/carousel.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Carousel = factory(global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
      })(exports, function(EventHandler, Manipulator, SelectorEngine, BaseComponent) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
        const Manipulator__default = /* @__PURE__ */ _interopDefaultLegacy(Manipulator);
        const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent);
        const TRANSITION_END = "transitionend";
        const toType = (obj) => {
          if (obj === null || obj === void 0) {
            return `${obj}`;
          }
          return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        };
        const getSelector = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttr = element.getAttribute("href");
            if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
              return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
              hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
          }
          return selector;
        };
        const getElementFromSelector = (element) => {
          const selector = getSelector(element);
          return selector ? document.querySelector(selector) : null;
        };
        const triggerTransitionEnd = (element) => {
          element.dispatchEvent(new Event(TRANSITION_END));
        };
        const isElement = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const typeCheckConfig = (componentName, config, configTypes) => {
          Object.keys(configTypes).forEach((property) => {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? "element" : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          });
        };
        const isVisible = (element) => {
          if (!isElement(element) || element.getClientRects().length === 0) {
            return false;
          }
          return getComputedStyle(element).getPropertyValue("visibility") === "visible";
        };
        const reflow = (element) => {
          element.offsetHeight;
        };
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const isRTL = () => document.documentElement.dir === "rtl";
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
          let index = list.indexOf(activeElement);
          if (index === -1) {
            return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
          }
          const listLength = list.length;
          index += shouldGetNext ? 1 : -1;
          if (isCycleAllowed) {
            index = (index + listLength) % listLength;
          }
          return list[Math.max(0, Math.min(index, listLength - 1))];
        };
        const NAME = "carousel";
        const DATA_KEY = "bs.carousel";
        const EVENT_KEY = `.${DATA_KEY}`;
        const DATA_API_KEY = ".data-api";
        const ARROW_LEFT_KEY = "ArrowLeft";
        const ARROW_RIGHT_KEY = "ArrowRight";
        const TOUCHEVENT_COMPAT_WAIT = 500;
        const SWIPE_THRESHOLD = 40;
        const Default = {
          interval: 5e3,
          keyboard: true,
          slide: false,
          pause: "hover",
          wrap: true,
          touch: true
        };
        const DefaultType = {
          interval: "(number|boolean)",
          keyboard: "boolean",
          slide: "(boolean|string)",
          pause: "(string|boolean)",
          wrap: "boolean",
          touch: "boolean"
        };
        const ORDER_NEXT = "next";
        const ORDER_PREV = "prev";
        const DIRECTION_LEFT = "left";
        const DIRECTION_RIGHT = "right";
        const KEY_TO_DIRECTION = {
          [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
          [ARROW_RIGHT_KEY]: DIRECTION_LEFT
        };
        const EVENT_SLIDE = `slide${EVENT_KEY}`;
        const EVENT_SLID = `slid${EVENT_KEY}`;
        const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
        const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
        const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
        const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
        const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
        const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
        const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
        const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
        const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
        const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
        const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
        const CLASS_NAME_CAROUSEL = "carousel";
        const CLASS_NAME_ACTIVE = "active";
        const CLASS_NAME_SLIDE = "slide";
        const CLASS_NAME_END = "carousel-item-end";
        const CLASS_NAME_START = "carousel-item-start";
        const CLASS_NAME_NEXT = "carousel-item-next";
        const CLASS_NAME_PREV = "carousel-item-prev";
        const CLASS_NAME_POINTER_EVENT = "pointer-event";
        const SELECTOR_ACTIVE = ".active";
        const SELECTOR_ACTIVE_ITEM = ".active.carousel-item";
        const SELECTOR_ITEM = ".carousel-item";
        const SELECTOR_ITEM_IMG = ".carousel-item img";
        const SELECTOR_NEXT_PREV = ".carousel-item-next, .carousel-item-prev";
        const SELECTOR_INDICATORS = ".carousel-indicators";
        const SELECTOR_INDICATOR = "[data-bs-target]";
        const SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
        const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
        const POINTER_TYPE_TOUCH = "touch";
        const POINTER_TYPE_PEN = "pen";
        class Carousel2 extends BaseComponent__default.default {
          constructor(element, config) {
            super(element);
            this._items = null;
            this._interval = null;
            this._activeElement = null;
            this._isPaused = false;
            this._isSliding = false;
            this.touchTimeout = null;
            this.touchStartX = 0;
            this.touchDeltaX = 0;
            this._config = this._getConfig(config);
            this._indicatorsElement = SelectorEngine__default.default.findOne(SELECTOR_INDICATORS, this._element);
            this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
            this._pointerEvent = Boolean(window.PointerEvent);
            this._addEventListeners();
          }
          // Getters
          static get Default() {
            return Default;
          }
          static get NAME() {
            return NAME;
          }
          // Public
          next() {
            this._slide(ORDER_NEXT);
          }
          nextWhenVisible() {
            if (!document.hidden && isVisible(this._element)) {
              this.next();
            }
          }
          prev() {
            this._slide(ORDER_PREV);
          }
          pause(event) {
            if (!event) {
              this._isPaused = true;
            }
            if (SelectorEngine__default.default.findOne(SELECTOR_NEXT_PREV, this._element)) {
              triggerTransitionEnd(this._element);
              this.cycle(true);
            }
            clearInterval(this._interval);
            this._interval = null;
          }
          cycle(event) {
            if (!event) {
              this._isPaused = false;
            }
            if (this._interval) {
              clearInterval(this._interval);
              this._interval = null;
            }
            if (this._config && this._config.interval && !this._isPaused) {
              this._updateInterval();
              this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
            }
          }
          to(index) {
            this._activeElement = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
            const activeIndex = this._getItemIndex(this._activeElement);
            if (index > this._items.length - 1 || index < 0) {
              return;
            }
            if (this._isSliding) {
              EventHandler__default.default.one(this._element, EVENT_SLID, () => this.to(index));
              return;
            }
            if (activeIndex === index) {
              this.pause();
              this.cycle();
              return;
            }
            const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
            this._slide(order, this._items[index]);
          }
          // Private
          _getConfig(config) {
            config = {
              ...Default,
              ...Manipulator__default.default.getDataAttributes(this._element),
              ...typeof config === "object" ? config : {}
            };
            typeCheckConfig(NAME, config, DefaultType);
            return config;
          }
          _handleSwipe() {
            const absDeltax = Math.abs(this.touchDeltaX);
            if (absDeltax <= SWIPE_THRESHOLD) {
              return;
            }
            const direction = absDeltax / this.touchDeltaX;
            this.touchDeltaX = 0;
            if (!direction) {
              return;
            }
            this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
          }
          _addEventListeners() {
            if (this._config.keyboard) {
              EventHandler__default.default.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
            }
            if (this._config.pause === "hover") {
              EventHandler__default.default.on(this._element, EVENT_MOUSEENTER, (event) => this.pause(event));
              EventHandler__default.default.on(this._element, EVENT_MOUSELEAVE, (event) => this.cycle(event));
            }
            if (this._config.touch && this._touchSupported) {
              this._addTouchEventListeners();
            }
          }
          _addTouchEventListeners() {
            const hasPointerPenTouch = (event) => {
              return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
            };
            const start = (event) => {
              if (hasPointerPenTouch(event)) {
                this.touchStartX = event.clientX;
              } else if (!this._pointerEvent) {
                this.touchStartX = event.touches[0].clientX;
              }
            };
            const move = (event) => {
              this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
            };
            const end = (event) => {
              if (hasPointerPenTouch(event)) {
                this.touchDeltaX = event.clientX - this.touchStartX;
              }
              this._handleSwipe();
              if (this._config.pause === "hover") {
                this.pause();
                if (this.touchTimeout) {
                  clearTimeout(this.touchTimeout);
                }
                this.touchTimeout = setTimeout((event2) => this.cycle(event2), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
              }
            };
            SelectorEngine__default.default.find(SELECTOR_ITEM_IMG, this._element).forEach((itemImg) => {
              EventHandler__default.default.on(itemImg, EVENT_DRAG_START, (event) => event.preventDefault());
            });
            if (this._pointerEvent) {
              EventHandler__default.default.on(this._element, EVENT_POINTERDOWN, (event) => start(event));
              EventHandler__default.default.on(this._element, EVENT_POINTERUP, (event) => end(event));
              this._element.classList.add(CLASS_NAME_POINTER_EVENT);
            } else {
              EventHandler__default.default.on(this._element, EVENT_TOUCHSTART, (event) => start(event));
              EventHandler__default.default.on(this._element, EVENT_TOUCHMOVE, (event) => move(event));
              EventHandler__default.default.on(this._element, EVENT_TOUCHEND, (event) => end(event));
            }
          }
          _keydown(event) {
            if (/input|textarea/i.test(event.target.tagName)) {
              return;
            }
            const direction = KEY_TO_DIRECTION[event.key];
            if (direction) {
              event.preventDefault();
              this._slide(direction);
            }
          }
          _getItemIndex(element) {
            this._items = element && element.parentNode ? SelectorEngine__default.default.find(SELECTOR_ITEM, element.parentNode) : [];
            return this._items.indexOf(element);
          }
          _getItemByOrder(order, activeElement) {
            const isNext = order === ORDER_NEXT;
            return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
          }
          _triggerSlideEvent(relatedTarget, eventDirectionName) {
            const targetIndex = this._getItemIndex(relatedTarget);
            const fromIndex = this._getItemIndex(SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element));
            return EventHandler__default.default.trigger(this._element, EVENT_SLIDE, {
              relatedTarget,
              direction: eventDirectionName,
              from: fromIndex,
              to: targetIndex
            });
          }
          _setActiveIndicatorElement(element) {
            if (this._indicatorsElement) {
              const activeIndicator = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
              activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
              activeIndicator.removeAttribute("aria-current");
              const indicators = SelectorEngine__default.default.find(SELECTOR_INDICATOR, this._indicatorsElement);
              for (let i = 0; i < indicators.length; i++) {
                if (Number.parseInt(indicators[i].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(element)) {
                  indicators[i].classList.add(CLASS_NAME_ACTIVE);
                  indicators[i].setAttribute("aria-current", "true");
                  break;
                }
              }
            }
          }
          _updateInterval() {
            const element = this._activeElement || SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
            if (!element) {
              return;
            }
            const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
            if (elementInterval) {
              this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
              this._config.interval = elementInterval;
            } else {
              this._config.interval = this._config.defaultInterval || this._config.interval;
            }
          }
          _slide(directionOrOrder, element) {
            const order = this._directionToOrder(directionOrOrder);
            const activeElement = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
            const activeElementIndex = this._getItemIndex(activeElement);
            const nextElement = element || this._getItemByOrder(order, activeElement);
            const nextElementIndex = this._getItemIndex(nextElement);
            const isCycling = Boolean(this._interval);
            const isNext = order === ORDER_NEXT;
            const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
            const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
            const eventDirectionName = this._orderToDirection(order);
            if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE)) {
              this._isSliding = false;
              return;
            }
            if (this._isSliding) {
              return;
            }
            const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
            if (slideEvent.defaultPrevented) {
              return;
            }
            if (!activeElement || !nextElement) {
              return;
            }
            this._isSliding = true;
            if (isCycling) {
              this.pause();
            }
            this._setActiveIndicatorElement(nextElement);
            this._activeElement = nextElement;
            const triggerSlidEvent = () => {
              EventHandler__default.default.trigger(this._element, EVENT_SLID, {
                relatedTarget: nextElement,
                direction: eventDirectionName,
                from: activeElementIndex,
                to: nextElementIndex
              });
            };
            if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
              nextElement.classList.add(orderClassName);
              reflow(nextElement);
              activeElement.classList.add(directionalClassName);
              nextElement.classList.add(directionalClassName);
              const completeCallBack = () => {
                nextElement.classList.remove(directionalClassName, orderClassName);
                nextElement.classList.add(CLASS_NAME_ACTIVE);
                activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
                this._isSliding = false;
                setTimeout(triggerSlidEvent, 0);
              };
              this._queueCallback(completeCallBack, activeElement, true);
            } else {
              activeElement.classList.remove(CLASS_NAME_ACTIVE);
              nextElement.classList.add(CLASS_NAME_ACTIVE);
              this._isSliding = false;
              triggerSlidEvent();
            }
            if (isCycling) {
              this.cycle();
            }
          }
          _directionToOrder(direction) {
            if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
              return direction;
            }
            if (isRTL()) {
              return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
            }
            return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
          }
          _orderToDirection(order) {
            if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
              return order;
            }
            if (isRTL()) {
              return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
            }
            return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
          }
          // Static
          static carouselInterface(element, config) {
            const data = Carousel2.getOrCreateInstance(element, config);
            let {
              _config
            } = data;
            if (typeof config === "object") {
              _config = {
                ..._config,
                ...config
              };
            }
            const action = typeof config === "string" ? config : _config.slide;
            if (typeof config === "number") {
              data.to(config);
            } else if (typeof action === "string") {
              if (typeof data[action] === "undefined") {
                throw new TypeError(`No method named "${action}"`);
              }
              data[action]();
            } else if (_config.interval && _config.ride) {
              data.pause();
              data.cycle();
            }
          }
          static jQueryInterface(config) {
            return this.each(function() {
              Carousel2.carouselInterface(this, config);
            });
          }
          static dataApiClickHandler(event) {
            const target = getElementFromSelector(this);
            if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
              return;
            }
            const config = {
              ...Manipulator__default.default.getDataAttributes(target),
              ...Manipulator__default.default.getDataAttributes(this)
            };
            const slideIndex = this.getAttribute("data-bs-slide-to");
            if (slideIndex) {
              config.interval = false;
            }
            Carousel2.carouselInterface(target, config);
            if (slideIndex) {
              Carousel2.getInstance(target).to(slideIndex);
            }
            event.preventDefault();
          }
        }
        EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, Carousel2.dataApiClickHandler);
        EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
          const carousels = SelectorEngine__default.default.find(SELECTOR_DATA_RIDE);
          for (let i = 0, len = carousels.length; i < len; i++) {
            Carousel2.carouselInterface(carousels[i], Carousel2.getInstance(carousels[i]));
          }
        });
        defineJQueryPlugin(Carousel2);
        return Carousel2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/collapse.js
  var require_collapse = __commonJS({
    "node_modules/bootstrap/js/dist/collapse.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_data(), require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/data", "./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Collapse = factory(global.Data, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
      })(exports, function(Data, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const Data__default = /* @__PURE__ */ _interopDefaultLegacy(Data);
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
        const Manipulator__default = /* @__PURE__ */ _interopDefaultLegacy(Manipulator);
        const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent);
        const toType = (obj) => {
          if (obj === null || obj === void 0) {
            return `${obj}`;
          }
          return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        };
        const getSelector = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttr = element.getAttribute("href");
            if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
              return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
              hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
          }
          return selector;
        };
        const getSelectorFromElement = (element) => {
          const selector = getSelector(element);
          if (selector) {
            return document.querySelector(selector) ? selector : null;
          }
          return null;
        };
        const getElementFromSelector = (element) => {
          const selector = getSelector(element);
          return selector ? document.querySelector(selector) : null;
        };
        const isElement = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const getElement = (obj) => {
          if (isElement(obj)) {
            return obj.jquery ? obj[0] : obj;
          }
          if (typeof obj === "string" && obj.length > 0) {
            return document.querySelector(obj);
          }
          return null;
        };
        const typeCheckConfig = (componentName, config, configTypes) => {
          Object.keys(configTypes).forEach((property) => {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? "element" : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          });
        };
        const reflow = (element) => {
          element.offsetHeight;
        };
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const NAME = "collapse";
        const DATA_KEY = "bs.collapse";
        const EVENT_KEY = `.${DATA_KEY}`;
        const DATA_API_KEY = ".data-api";
        const Default = {
          toggle: true,
          parent: null
        };
        const DefaultType = {
          toggle: "boolean",
          parent: "(null|element)"
        };
        const EVENT_SHOW = `show${EVENT_KEY}`;
        const EVENT_SHOWN = `shown${EVENT_KEY}`;
        const EVENT_HIDE = `hide${EVENT_KEY}`;
        const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
        const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
        const CLASS_NAME_SHOW = "show";
        const CLASS_NAME_COLLAPSE = "collapse";
        const CLASS_NAME_COLLAPSING = "collapsing";
        const CLASS_NAME_COLLAPSED = "collapsed";
        const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
        const CLASS_NAME_HORIZONTAL = "collapse-horizontal";
        const WIDTH = "width";
        const HEIGHT = "height";
        const SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
        const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
        class Collapse2 extends BaseComponent__default.default {
          constructor(element, config) {
            super(element);
            this._isTransitioning = false;
            this._config = this._getConfig(config);
            this._triggerArray = [];
            const toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);
            for (let i = 0, len = toggleList.length; i < len; i++) {
              const elem = toggleList[i];
              const selector = getSelectorFromElement(elem);
              const filterElement = SelectorEngine__default.default.find(selector).filter((foundElem) => foundElem === this._element);
              if (selector !== null && filterElement.length) {
                this._selector = selector;
                this._triggerArray.push(elem);
              }
            }
            this._initializeChildren();
            if (!this._config.parent) {
              this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
            }
            if (this._config.toggle) {
              this.toggle();
            }
          }
          // Getters
          static get Default() {
            return Default;
          }
          static get NAME() {
            return NAME;
          }
          // Public
          toggle() {
            if (this._isShown()) {
              this.hide();
            } else {
              this.show();
            }
          }
          show() {
            if (this._isTransitioning || this._isShown()) {
              return;
            }
            let actives = [];
            let activesData;
            if (this._config.parent) {
              const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
              actives = SelectorEngine__default.default.find(SELECTOR_ACTIVES, this._config.parent).filter((elem) => !children.includes(elem));
            }
            const container = SelectorEngine__default.default.findOne(this._selector);
            if (actives.length) {
              const tempActiveData = actives.find((elem) => container !== elem);
              activesData = tempActiveData ? Collapse2.getInstance(tempActiveData) : null;
              if (activesData && activesData._isTransitioning) {
                return;
              }
            }
            const startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);
            if (startEvent.defaultPrevented) {
              return;
            }
            actives.forEach((elemActive) => {
              if (container !== elemActive) {
                Collapse2.getOrCreateInstance(elemActive, {
                  toggle: false
                }).hide();
              }
              if (!activesData) {
                Data__default.default.set(elemActive, DATA_KEY, null);
              }
            });
            const dimension = this._getDimension();
            this._element.classList.remove(CLASS_NAME_COLLAPSE);
            this._element.classList.add(CLASS_NAME_COLLAPSING);
            this._element.style[dimension] = 0;
            this._addAriaAndCollapsedClass(this._triggerArray, true);
            this._isTransitioning = true;
            const complete = () => {
              this._isTransitioning = false;
              this._element.classList.remove(CLASS_NAME_COLLAPSING);
              this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
              this._element.style[dimension] = "";
              EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
            };
            const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
            const scrollSize = `scroll${capitalizedDimension}`;
            this._queueCallback(complete, this._element, true);
            this._element.style[dimension] = `${this._element[scrollSize]}px`;
          }
          hide() {
            if (this._isTransitioning || !this._isShown()) {
              return;
            }
            const startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
            if (startEvent.defaultPrevented) {
              return;
            }
            const dimension = this._getDimension();
            this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_COLLAPSING);
            this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
            const triggerArrayLength = this._triggerArray.length;
            for (let i = 0; i < triggerArrayLength; i++) {
              const trigger = this._triggerArray[i];
              const elem = getElementFromSelector(trigger);
              if (elem && !this._isShown(elem)) {
                this._addAriaAndCollapsedClass([trigger], false);
              }
            }
            this._isTransitioning = true;
            const complete = () => {
              this._isTransitioning = false;
              this._element.classList.remove(CLASS_NAME_COLLAPSING);
              this._element.classList.add(CLASS_NAME_COLLAPSE);
              EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
            };
            this._element.style[dimension] = "";
            this._queueCallback(complete, this._element, true);
          }
          _isShown(element = this._element) {
            return element.classList.contains(CLASS_NAME_SHOW);
          }
          // Private
          _getConfig(config) {
            config = {
              ...Default,
              ...Manipulator__default.default.getDataAttributes(this._element),
              ...config
            };
            config.toggle = Boolean(config.toggle);
            config.parent = getElement(config.parent);
            typeCheckConfig(NAME, config, DefaultType);
            return config;
          }
          _getDimension() {
            return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
          }
          _initializeChildren() {
            if (!this._config.parent) {
              return;
            }
            const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
            SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE, this._config.parent).filter((elem) => !children.includes(elem)).forEach((element) => {
              const selected = getElementFromSelector(element);
              if (selected) {
                this._addAriaAndCollapsedClass([element], this._isShown(selected));
              }
            });
          }
          _addAriaAndCollapsedClass(triggerArray, isOpen) {
            if (!triggerArray.length) {
              return;
            }
            triggerArray.forEach((elem) => {
              if (isOpen) {
                elem.classList.remove(CLASS_NAME_COLLAPSED);
              } else {
                elem.classList.add(CLASS_NAME_COLLAPSED);
              }
              elem.setAttribute("aria-expanded", isOpen);
            });
          }
          // Static
          static jQueryInterface(config) {
            return this.each(function() {
              const _config = {};
              if (typeof config === "string" && /show|hide/.test(config)) {
                _config.toggle = false;
              }
              const data = Collapse2.getOrCreateInstance(this, _config);
              if (typeof config === "string") {
                if (typeof data[config] === "undefined") {
                  throw new TypeError(`No method named "${config}"`);
                }
                data[config]();
              }
            });
          }
        }
        EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
          if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
            event.preventDefault();
          }
          const selector = getSelectorFromElement(this);
          const selectorElements = SelectorEngine__default.default.find(selector);
          selectorElements.forEach((element) => {
            Collapse2.getOrCreateInstance(element, {
              toggle: false
            }).toggle();
          });
        });
        defineJQueryPlugin(Collapse2);
        return Collapse2;
      });
    }
  });

  // node_modules/@popperjs/core/dist/cjs/popper.js
  var require_popper = __commonJS({
    "node_modules/@popperjs/core/dist/cjs/popper.js"(exports) {
      "use strict";
      init_global();
      Object.defineProperty(exports, "__esModule", { value: true });
      function getWindow(node) {
        if (node == null) {
          return window;
        }
        if (node.toString() !== "[object Window]") {
          var ownerDocument = node.ownerDocument;
          return ownerDocument ? ownerDocument.defaultView || window : window;
        }
        return node;
      }
      function isElement(node) {
        var OwnElement = getWindow(node).Element;
        return node instanceof OwnElement || node instanceof Element;
      }
      function isHTMLElement(node) {
        var OwnElement = getWindow(node).HTMLElement;
        return node instanceof OwnElement || node instanceof HTMLElement;
      }
      function isShadowRoot(node) {
        if (typeof ShadowRoot === "undefined") {
          return false;
        }
        var OwnElement = getWindow(node).ShadowRoot;
        return node instanceof OwnElement || node instanceof ShadowRoot;
      }
      var max = Math.max;
      var min = Math.min;
      var round = Math.round;
      function getBoundingClientRect(element, includeScale) {
        if (includeScale === void 0) {
          includeScale = false;
        }
        var rect = element.getBoundingClientRect();
        var scaleX = 1;
        var scaleY = 1;
        if (isHTMLElement(element) && includeScale) {
          var offsetHeight = element.offsetHeight;
          var offsetWidth = element.offsetWidth;
          if (offsetWidth > 0) {
            scaleX = round(rect.width) / offsetWidth || 1;
          }
          if (offsetHeight > 0) {
            scaleY = round(rect.height) / offsetHeight || 1;
          }
        }
        return {
          width: rect.width / scaleX,
          height: rect.height / scaleY,
          top: rect.top / scaleY,
          right: rect.right / scaleX,
          bottom: rect.bottom / scaleY,
          left: rect.left / scaleX,
          x: rect.left / scaleX,
          y: rect.top / scaleY
        };
      }
      function getWindowScroll(node) {
        var win = getWindow(node);
        var scrollLeft = win.pageXOffset;
        var scrollTop = win.pageYOffset;
        return {
          scrollLeft,
          scrollTop
        };
      }
      function getHTMLElementScroll(element) {
        return {
          scrollLeft: element.scrollLeft,
          scrollTop: element.scrollTop
        };
      }
      function getNodeScroll(node) {
        if (node === getWindow(node) || !isHTMLElement(node)) {
          return getWindowScroll(node);
        } else {
          return getHTMLElementScroll(node);
        }
      }
      function getNodeName(element) {
        return element ? (element.nodeName || "").toLowerCase() : null;
      }
      function getDocumentElement(element) {
        return ((isElement(element) ? element.ownerDocument : (
          // $FlowFixMe[prop-missing]
          element.document
        )) || window.document).documentElement;
      }
      function getWindowScrollBarX(element) {
        return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
      }
      function getComputedStyle2(element) {
        return getWindow(element).getComputedStyle(element);
      }
      function isScrollParent(element) {
        var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
        return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
      }
      function isElementScaled(element) {
        var rect = element.getBoundingClientRect();
        var scaleX = round(rect.width) / element.offsetWidth || 1;
        var scaleY = round(rect.height) / element.offsetHeight || 1;
        return scaleX !== 1 || scaleY !== 1;
      }
      function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
        if (isFixed === void 0) {
          isFixed = false;
        }
        var isOffsetParentAnElement = isHTMLElement(offsetParent);
        var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
        var documentElement = getDocumentElement(offsetParent);
        var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
        var scroll = {
          scrollLeft: 0,
          scrollTop: 0
        };
        var offsets = {
          x: 0,
          y: 0
        };
        if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
          if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
          isScrollParent(documentElement)) {
            scroll = getNodeScroll(offsetParent);
          }
          if (isHTMLElement(offsetParent)) {
            offsets = getBoundingClientRect(offsetParent, true);
            offsets.x += offsetParent.clientLeft;
            offsets.y += offsetParent.clientTop;
          } else if (documentElement) {
            offsets.x = getWindowScrollBarX(documentElement);
          }
        }
        return {
          x: rect.left + scroll.scrollLeft - offsets.x,
          y: rect.top + scroll.scrollTop - offsets.y,
          width: rect.width,
          height: rect.height
        };
      }
      function getLayoutRect(element) {
        var clientRect = getBoundingClientRect(element);
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        if (Math.abs(clientRect.width - width) <= 1) {
          width = clientRect.width;
        }
        if (Math.abs(clientRect.height - height) <= 1) {
          height = clientRect.height;
        }
        return {
          x: element.offsetLeft,
          y: element.offsetTop,
          width,
          height
        };
      }
      function getParentNode(element) {
        if (getNodeName(element) === "html") {
          return element;
        }
        return (
          // this is a quicker (but less type safe) way to save quite some bytes from the bundle
          // $FlowFixMe[incompatible-return]
          // $FlowFixMe[prop-missing]
          element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
          element.parentNode || // DOM Element detected
          (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
          // $FlowFixMe[incompatible-call]: HTMLElement is a Node
          getDocumentElement(element)
        );
      }
      function getScrollParent(node) {
        if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
          return node.ownerDocument.body;
        }
        if (isHTMLElement(node) && isScrollParent(node)) {
          return node;
        }
        return getScrollParent(getParentNode(node));
      }
      function listScrollParents(element, list) {
        var _element$ownerDocumen;
        if (list === void 0) {
          list = [];
        }
        var scrollParent = getScrollParent(element);
        var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
        var win = getWindow(scrollParent);
        var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
        var updatedList = list.concat(target);
        return isBody ? updatedList : (
          // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
          updatedList.concat(listScrollParents(getParentNode(target)))
        );
      }
      function isTableElement(element) {
        return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
      }
      function getTrueOffsetParent(element) {
        if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
        getComputedStyle2(element).position === "fixed") {
          return null;
        }
        return element.offsetParent;
      }
      function getContainingBlock(element) {
        var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
        var isIE = navigator.userAgent.indexOf("Trident") !== -1;
        if (isIE && isHTMLElement(element)) {
          var elementCss = getComputedStyle2(element);
          if (elementCss.position === "fixed") {
            return null;
          }
        }
        var currentNode = getParentNode(element);
        while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
          var css = getComputedStyle2(currentNode);
          if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
            return currentNode;
          } else {
            currentNode = currentNode.parentNode;
          }
        }
        return null;
      }
      function getOffsetParent(element) {
        var window2 = getWindow(element);
        var offsetParent = getTrueOffsetParent(element);
        while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
          offsetParent = getTrueOffsetParent(offsetParent);
        }
        if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
          return window2;
        }
        return offsetParent || getContainingBlock(element) || window2;
      }
      var top = "top";
      var bottom = "bottom";
      var right = "right";
      var left = "left";
      var auto = "auto";
      var basePlacements = [top, bottom, right, left];
      var start = "start";
      var end = "end";
      var clippingParents = "clippingParents";
      var viewport = "viewport";
      var popper = "popper";
      var reference = "reference";
      var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
        return acc.concat([placement + "-" + start, placement + "-" + end]);
      }, []);
      var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
        return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
      }, []);
      var beforeRead = "beforeRead";
      var read = "read";
      var afterRead = "afterRead";
      var beforeMain = "beforeMain";
      var main = "main";
      var afterMain = "afterMain";
      var beforeWrite = "beforeWrite";
      var write = "write";
      var afterWrite = "afterWrite";
      var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
      function order(modifiers) {
        var map = /* @__PURE__ */ new Map();
        var visited = /* @__PURE__ */ new Set();
        var result = [];
        modifiers.forEach(function(modifier) {
          map.set(modifier.name, modifier);
        });
        function sort(modifier) {
          visited.add(modifier.name);
          var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
          requires.forEach(function(dep) {
            if (!visited.has(dep)) {
              var depModifier = map.get(dep);
              if (depModifier) {
                sort(depModifier);
              }
            }
          });
          result.push(modifier);
        }
        modifiers.forEach(function(modifier) {
          if (!visited.has(modifier.name)) {
            sort(modifier);
          }
        });
        return result;
      }
      function orderModifiers(modifiers) {
        var orderedModifiers = order(modifiers);
        return modifierPhases.reduce(function(acc, phase) {
          return acc.concat(orderedModifiers.filter(function(modifier) {
            return modifier.phase === phase;
          }));
        }, []);
      }
      function debounce(fn) {
        var pending;
        return function() {
          if (!pending) {
            pending = new Promise(function(resolve) {
              Promise.resolve().then(function() {
                pending = void 0;
                resolve(fn());
              });
            });
          }
          return pending;
        };
      }
      function format(str) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return [].concat(args).reduce(function(p, c) {
          return p.replace(/%s/, c);
        }, str);
      }
      var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
      var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
      var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
      function validateModifiers(modifiers) {
        modifiers.forEach(function(modifier) {
          [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self2) {
            return self2.indexOf(value) === index;
          }).forEach(function(key) {
            switch (key) {
              case "name":
                if (typeof modifier.name !== "string") {
                  console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
                }
                break;
              case "enabled":
                if (typeof modifier.enabled !== "boolean") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
                }
                break;
              case "phase":
                if (modifierPhases.indexOf(modifier.phase) < 0) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
                }
                break;
              case "fn":
                if (typeof modifier.fn !== "function") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
                }
                break;
              case "effect":
                if (modifier.effect != null && typeof modifier.effect !== "function") {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
                }
                break;
              case "requires":
                if (modifier.requires != null && !Array.isArray(modifier.requires)) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
                }
                break;
              case "requiresIfExists":
                if (!Array.isArray(modifier.requiresIfExists)) {
                  console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
                }
                break;
              case "options":
              case "data":
                break;
              default:
                console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
                  return '"' + s + '"';
                }).join(", ") + '; but "' + key + '" was provided.');
            }
            modifier.requires && modifier.requires.forEach(function(requirement) {
              if (modifiers.find(function(mod) {
                return mod.name === requirement;
              }) == null) {
                console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
              }
            });
          });
        });
      }
      function uniqueBy(arr, fn) {
        var identifiers = /* @__PURE__ */ new Set();
        return arr.filter(function(item) {
          var identifier = fn(item);
          if (!identifiers.has(identifier)) {
            identifiers.add(identifier);
            return true;
          }
        });
      }
      function getBasePlacement(placement) {
        return placement.split("-")[0];
      }
      function mergeByName(modifiers) {
        var merged = modifiers.reduce(function(merged2, current) {
          var existing = merged2[current.name];
          merged2[current.name] = existing ? Object.assign({}, existing, current, {
            options: Object.assign({}, existing.options, current.options),
            data: Object.assign({}, existing.data, current.data)
          }) : current;
          return merged2;
        }, {});
        return Object.keys(merged).map(function(key) {
          return merged[key];
        });
      }
      function getViewportRect(element) {
        var win = getWindow(element);
        var html = getDocumentElement(element);
        var visualViewport = win.visualViewport;
        var width = html.clientWidth;
        var height = html.clientHeight;
        var x = 0;
        var y = 0;
        if (visualViewport) {
          width = visualViewport.width;
          height = visualViewport.height;
          if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            x = visualViewport.offsetLeft;
            y = visualViewport.offsetTop;
          }
        }
        return {
          width,
          height,
          x: x + getWindowScrollBarX(element),
          y
        };
      }
      function getDocumentRect(element) {
        var _element$ownerDocumen;
        var html = getDocumentElement(element);
        var winScroll = getWindowScroll(element);
        var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
        var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
        var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
        var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
        var y = -winScroll.scrollTop;
        if (getComputedStyle2(body || html).direction === "rtl") {
          x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
        }
        return {
          width,
          height,
          x,
          y
        };
      }
      function contains(parent, child) {
        var rootNode = child.getRootNode && child.getRootNode();
        if (parent.contains(child)) {
          return true;
        } else if (rootNode && isShadowRoot(rootNode)) {
          var next = child;
          do {
            if (next && parent.isSameNode(next)) {
              return true;
            }
            next = next.parentNode || next.host;
          } while (next);
        }
        return false;
      }
      function rectToClientRect(rect) {
        return Object.assign({}, rect, {
          left: rect.x,
          top: rect.y,
          right: rect.x + rect.width,
          bottom: rect.y + rect.height
        });
      }
      function getInnerBoundingClientRect(element) {
        var rect = getBoundingClientRect(element);
        rect.top = rect.top + element.clientTop;
        rect.left = rect.left + element.clientLeft;
        rect.bottom = rect.top + element.clientHeight;
        rect.right = rect.left + element.clientWidth;
        rect.width = element.clientWidth;
        rect.height = element.clientHeight;
        rect.x = rect.left;
        rect.y = rect.top;
        return rect;
      }
      function getClientRectFromMixedType(element, clippingParent) {
        return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
      }
      function getClippingParents(element) {
        var clippingParents2 = listScrollParents(getParentNode(element));
        var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
        var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
        if (!isElement(clipperElement)) {
          return [];
        }
        return clippingParents2.filter(function(clippingParent) {
          return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
        });
      }
      function getClippingRect(element, boundary, rootBoundary) {
        var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
        var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
        var firstClippingParent = clippingParents2[0];
        var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
          var rect = getClientRectFromMixedType(element, clippingParent);
          accRect.top = max(rect.top, accRect.top);
          accRect.right = min(rect.right, accRect.right);
          accRect.bottom = min(rect.bottom, accRect.bottom);
          accRect.left = max(rect.left, accRect.left);
          return accRect;
        }, getClientRectFromMixedType(element, firstClippingParent));
        clippingRect.width = clippingRect.right - clippingRect.left;
        clippingRect.height = clippingRect.bottom - clippingRect.top;
        clippingRect.x = clippingRect.left;
        clippingRect.y = clippingRect.top;
        return clippingRect;
      }
      function getVariation(placement) {
        return placement.split("-")[1];
      }
      function getMainAxisFromPlacement(placement) {
        return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
      }
      function computeOffsets(_ref) {
        var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
        var basePlacement = placement ? getBasePlacement(placement) : null;
        var variation = placement ? getVariation(placement) : null;
        var commonX = reference2.x + reference2.width / 2 - element.width / 2;
        var commonY = reference2.y + reference2.height / 2 - element.height / 2;
        var offsets;
        switch (basePlacement) {
          case top:
            offsets = {
              x: commonX,
              y: reference2.y - element.height
            };
            break;
          case bottom:
            offsets = {
              x: commonX,
              y: reference2.y + reference2.height
            };
            break;
          case right:
            offsets = {
              x: reference2.x + reference2.width,
              y: commonY
            };
            break;
          case left:
            offsets = {
              x: reference2.x - element.width,
              y: commonY
            };
            break;
          default:
            offsets = {
              x: reference2.x,
              y: reference2.y
            };
        }
        var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
        if (mainAxis != null) {
          var len = mainAxis === "y" ? "height" : "width";
          switch (variation) {
            case start:
              offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
              break;
            case end:
              offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
              break;
          }
        }
        return offsets;
      }
      function getFreshSideObject() {
        return {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      }
      function mergePaddingObject(paddingObject) {
        return Object.assign({}, getFreshSideObject(), paddingObject);
      }
      function expandToHashMap(value, keys) {
        return keys.reduce(function(hashMap, key) {
          hashMap[key] = value;
          return hashMap;
        }, {});
      }
      function detectOverflow(state, options) {
        if (options === void 0) {
          options = {};
        }
        var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
        var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
        var altContext = elementContext === popper ? reference : popper;
        var popperRect = state.rects.popper;
        var element = state.elements[altBoundary ? altContext : elementContext];
        var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
        var referenceClientRect = getBoundingClientRect(state.elements.reference);
        var popperOffsets2 = computeOffsets({
          reference: referenceClientRect,
          element: popperRect,
          strategy: "absolute",
          placement
        });
        var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
        var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
        var overflowOffsets = {
          top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
          bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
          left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
          right: elementClientRect.right - clippingClientRect.right + paddingObject.right
        };
        var offsetData = state.modifiersData.offset;
        if (elementContext === popper && offsetData) {
          var offset2 = offsetData[placement];
          Object.keys(overflowOffsets).forEach(function(key) {
            var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
            var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
            overflowOffsets[key] += offset2[axis] * multiply;
          });
        }
        return overflowOffsets;
      }
      var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
      var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
      var DEFAULT_OPTIONS = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
      };
      function areValidElements() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return !args.some(function(element) {
          return !(element && typeof element.getBoundingClientRect === "function");
        });
      }
      function popperGenerator(generatorOptions) {
        if (generatorOptions === void 0) {
          generatorOptions = {};
        }
        var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
        return function createPopper2(reference2, popper2, options) {
          if (options === void 0) {
            options = defaultOptions;
          }
          var state = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
            modifiersData: {},
            elements: {
              reference: reference2,
              popper: popper2
            },
            attributes: {},
            styles: {}
          };
          var effectCleanupFns = [];
          var isDestroyed = false;
          var instance = {
            state,
            setOptions: function setOptions(setOptionsAction) {
              var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
              cleanupModifierEffects();
              state.options = Object.assign({}, defaultOptions, state.options, options2);
              state.scrollParents = {
                reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
                popper: listScrollParents(popper2)
              };
              var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
              state.orderedModifiers = orderedModifiers.filter(function(m) {
                return m.enabled;
              });
              if (true) {
                var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
                  var name = _ref.name;
                  return name;
                });
                validateModifiers(modifiers);
                if (getBasePlacement(state.options.placement) === auto) {
                  var flipModifier = state.orderedModifiers.find(function(_ref2) {
                    var name = _ref2.name;
                    return name === "flip";
                  });
                  if (!flipModifier) {
                    console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
                  }
                }
                var _getComputedStyle = getComputedStyle2(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
                if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
                  return parseFloat(margin);
                })) {
                  console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
                }
              }
              runModifierEffects();
              return instance.update();
            },
            // Sync update – it will always be executed, even if not necessary. This
            // is useful for low frequency updates where sync behavior simplifies the
            // logic.
            // For high frequency updates (e.g. `resize` and `scroll` events), always
            // prefer the async Popper#update method
            forceUpdate: function forceUpdate() {
              if (isDestroyed) {
                return;
              }
              var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
              if (!areValidElements(reference3, popper3)) {
                if (true) {
                  console.error(INVALID_ELEMENT_ERROR);
                }
                return;
              }
              state.rects = {
                reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
                popper: getLayoutRect(popper3)
              };
              state.reset = false;
              state.placement = state.options.placement;
              state.orderedModifiers.forEach(function(modifier) {
                return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
              });
              var __debug_loops__ = 0;
              for (var index = 0; index < state.orderedModifiers.length; index++) {
                if (true) {
                  __debug_loops__ += 1;
                  if (__debug_loops__ > 100) {
                    console.error(INFINITE_LOOP_ERROR);
                    break;
                  }
                }
                if (state.reset === true) {
                  state.reset = false;
                  index = -1;
                  continue;
                }
                var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
                if (typeof fn === "function") {
                  state = fn({
                    state,
                    options: _options,
                    name,
                    instance
                  }) || state;
                }
              }
            },
            // Async and optimistically optimized update – it will not be executed if
            // not necessary (debounced to run at most once-per-tick)
            update: debounce(function() {
              return new Promise(function(resolve) {
                instance.forceUpdate();
                resolve(state);
              });
            }),
            destroy: function destroy() {
              cleanupModifierEffects();
              isDestroyed = true;
            }
          };
          if (!areValidElements(reference2, popper2)) {
            if (true) {
              console.error(INVALID_ELEMENT_ERROR);
            }
            return instance;
          }
          instance.setOptions(options).then(function(state2) {
            if (!isDestroyed && options.onFirstUpdate) {
              options.onFirstUpdate(state2);
            }
          });
          function runModifierEffects() {
            state.orderedModifiers.forEach(function(_ref3) {
              var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
              if (typeof effect2 === "function") {
                var cleanupFn = effect2({
                  state,
                  name,
                  instance,
                  options: options2
                });
                var noopFn = function noopFn2() {
                };
                effectCleanupFns.push(cleanupFn || noopFn);
              }
            });
          }
          function cleanupModifierEffects() {
            effectCleanupFns.forEach(function(fn) {
              return fn();
            });
            effectCleanupFns = [];
          }
          return instance;
        };
      }
      var passive = {
        passive: true
      };
      function effect$2(_ref) {
        var state = _ref.state, instance = _ref.instance, options = _ref.options;
        var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
        var window2 = getWindow(state.elements.popper);
        var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
        if (scroll) {
          scrollParents.forEach(function(scrollParent) {
            scrollParent.addEventListener("scroll", instance.update, passive);
          });
        }
        if (resize) {
          window2.addEventListener("resize", instance.update, passive);
        }
        return function() {
          if (scroll) {
            scrollParents.forEach(function(scrollParent) {
              scrollParent.removeEventListener("scroll", instance.update, passive);
            });
          }
          if (resize) {
            window2.removeEventListener("resize", instance.update, passive);
          }
        };
      }
      var eventListeners = {
        name: "eventListeners",
        enabled: true,
        phase: "write",
        fn: function fn() {
        },
        effect: effect$2,
        data: {}
      };
      function popperOffsets(_ref) {
        var state = _ref.state, name = _ref.name;
        state.modifiersData[name] = computeOffsets({
          reference: state.rects.reference,
          element: state.rects.popper,
          strategy: "absolute",
          placement: state.placement
        });
      }
      var popperOffsets$1 = {
        name: "popperOffsets",
        enabled: true,
        phase: "read",
        fn: popperOffsets,
        data: {}
      };
      var unsetSides = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
      };
      function roundOffsetsByDPR(_ref) {
        var x = _ref.x, y = _ref.y;
        var win = window;
        var dpr = win.devicePixelRatio || 1;
        return {
          x: round(x * dpr) / dpr || 0,
          y: round(y * dpr) / dpr || 0
        };
      }
      function mapToStyles(_ref2) {
        var _Object$assign2;
        var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
        var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
        var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
          x,
          y
        }) : {
          x,
          y
        };
        x = _ref3.x;
        y = _ref3.y;
        var hasX = offsets.hasOwnProperty("x");
        var hasY = offsets.hasOwnProperty("y");
        var sideX = left;
        var sideY = top;
        var win = window;
        if (adaptive) {
          var offsetParent = getOffsetParent(popper2);
          var heightProp = "clientHeight";
          var widthProp = "clientWidth";
          if (offsetParent === getWindow(popper2)) {
            offsetParent = getDocumentElement(popper2);
            if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
              heightProp = "scrollHeight";
              widthProp = "scrollWidth";
            }
          }
          offsetParent = offsetParent;
          if (placement === top || (placement === left || placement === right) && variation === end) {
            sideY = bottom;
            var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : (
              // $FlowFixMe[prop-missing]
              offsetParent[heightProp]
            );
            y -= offsetY - popperRect.height;
            y *= gpuAcceleration ? 1 : -1;
          }
          if (placement === left || (placement === top || placement === bottom) && variation === end) {
            sideX = right;
            var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : (
              // $FlowFixMe[prop-missing]
              offsetParent[widthProp]
            );
            x -= offsetX - popperRect.width;
            x *= gpuAcceleration ? 1 : -1;
          }
        }
        var commonStyles = Object.assign({
          position
        }, adaptive && unsetSides);
        var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
          x,
          y
        }) : {
          x,
          y
        };
        x = _ref4.x;
        y = _ref4.y;
        if (gpuAcceleration) {
          var _Object$assign;
          return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
        }
        return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
      }
      function computeStyles(_ref5) {
        var state = _ref5.state, options = _ref5.options;
        var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
        if (true) {
          var transitionProperty = getComputedStyle2(state.elements.popper).transitionProperty || "";
          if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
            return transitionProperty.indexOf(property) >= 0;
          })) {
            console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
          }
        }
        var commonStyles = {
          placement: getBasePlacement(state.placement),
          variation: getVariation(state.placement),
          popper: state.elements.popper,
          popperRect: state.rects.popper,
          gpuAcceleration,
          isFixed: state.options.strategy === "fixed"
        };
        if (state.modifiersData.popperOffsets != null) {
          state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.popperOffsets,
            position: state.options.strategy,
            adaptive,
            roundOffsets
          })));
        }
        if (state.modifiersData.arrow != null) {
          state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
            offsets: state.modifiersData.arrow,
            position: "absolute",
            adaptive: false,
            roundOffsets
          })));
        }
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
          "data-popper-placement": state.placement
        });
      }
      var computeStyles$1 = {
        name: "computeStyles",
        enabled: true,
        phase: "beforeWrite",
        fn: computeStyles,
        data: {}
      };
      function applyStyles(_ref) {
        var state = _ref.state;
        Object.keys(state.elements).forEach(function(name) {
          var style = state.styles[name] || {};
          var attributes = state.attributes[name] || {};
          var element = state.elements[name];
          if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
          }
          Object.assign(element.style, style);
          Object.keys(attributes).forEach(function(name2) {
            var value = attributes[name2];
            if (value === false) {
              element.removeAttribute(name2);
            } else {
              element.setAttribute(name2, value === true ? "" : value);
            }
          });
        });
      }
      function effect$1(_ref2) {
        var state = _ref2.state;
        var initialStyles = {
          popper: {
            position: state.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
          },
          arrow: {
            position: "absolute"
          },
          reference: {}
        };
        Object.assign(state.elements.popper.style, initialStyles.popper);
        state.styles = initialStyles;
        if (state.elements.arrow) {
          Object.assign(state.elements.arrow.style, initialStyles.arrow);
        }
        return function() {
          Object.keys(state.elements).forEach(function(name) {
            var element = state.elements[name];
            var attributes = state.attributes[name] || {};
            var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
            var style = styleProperties.reduce(function(style2, property) {
              style2[property] = "";
              return style2;
            }, {});
            if (!isHTMLElement(element) || !getNodeName(element)) {
              return;
            }
            Object.assign(element.style, style);
            Object.keys(attributes).forEach(function(attribute) {
              element.removeAttribute(attribute);
            });
          });
        };
      }
      var applyStyles$1 = {
        name: "applyStyles",
        enabled: true,
        phase: "write",
        fn: applyStyles,
        effect: effect$1,
        requires: ["computeStyles"]
      };
      function distanceAndSkiddingToXY(placement, rects, offset2) {
        var basePlacement = getBasePlacement(placement);
        var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
        var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
          placement
        })) : offset2, skidding = _ref[0], distance = _ref[1];
        skidding = skidding || 0;
        distance = (distance || 0) * invertDistance;
        return [left, right].indexOf(basePlacement) >= 0 ? {
          x: distance,
          y: skidding
        } : {
          x: skidding,
          y: distance
        };
      }
      function offset(_ref2) {
        var state = _ref2.state, options = _ref2.options, name = _ref2.name;
        var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
        var data = placements.reduce(function(acc, placement) {
          acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
          return acc;
        }, {});
        var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
        if (state.modifiersData.popperOffsets != null) {
          state.modifiersData.popperOffsets.x += x;
          state.modifiersData.popperOffsets.y += y;
        }
        state.modifiersData[name] = data;
      }
      var offset$1 = {
        name: "offset",
        enabled: true,
        phase: "main",
        requires: ["popperOffsets"],
        fn: offset
      };
      var hash$1 = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
      };
      function getOppositePlacement(placement) {
        return placement.replace(/left|right|bottom|top/g, function(matched) {
          return hash$1[matched];
        });
      }
      var hash = {
        start: "end",
        end: "start"
      };
      function getOppositeVariationPlacement(placement) {
        return placement.replace(/start|end/g, function(matched) {
          return hash[matched];
        });
      }
      function computeAutoPlacement(state, options) {
        if (options === void 0) {
          options = {};
        }
        var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
        var variation = getVariation(placement);
        var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
          return getVariation(placement2) === variation;
        }) : basePlacements;
        var allowedPlacements = placements$1.filter(function(placement2) {
          return allowedAutoPlacements.indexOf(placement2) >= 0;
        });
        if (allowedPlacements.length === 0) {
          allowedPlacements = placements$1;
          if (true) {
            console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
          }
        }
        var overflows = allowedPlacements.reduce(function(acc, placement2) {
          acc[placement2] = detectOverflow(state, {
            placement: placement2,
            boundary,
            rootBoundary,
            padding
          })[getBasePlacement(placement2)];
          return acc;
        }, {});
        return Object.keys(overflows).sort(function(a, b) {
          return overflows[a] - overflows[b];
        });
      }
      function getExpandedFallbackPlacements(placement) {
        if (getBasePlacement(placement) === auto) {
          return [];
        }
        var oppositePlacement = getOppositePlacement(placement);
        return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
      }
      function flip(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        if (state.modifiersData[name]._skip) {
          return;
        }
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
        var preferredPlacement = state.options.placement;
        var basePlacement = getBasePlacement(preferredPlacement);
        var isBasePlacement = basePlacement === preferredPlacement;
        var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
        var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
          return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
            placement: placement2,
            boundary,
            rootBoundary,
            padding,
            flipVariations,
            allowedAutoPlacements
          }) : placement2);
        }, []);
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var checksMap = /* @__PURE__ */ new Map();
        var makeFallbackChecks = true;
        var firstFittingPlacement = placements2[0];
        for (var i = 0; i < placements2.length; i++) {
          var placement = placements2[i];
          var _basePlacement = getBasePlacement(placement);
          var isStartVariation = getVariation(placement) === start;
          var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
          var len = isVertical ? "width" : "height";
          var overflow = detectOverflow(state, {
            placement,
            boundary,
            rootBoundary,
            altBoundary,
            padding
          });
          var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
          if (referenceRect[len] > popperRect[len]) {
            mainVariationSide = getOppositePlacement(mainVariationSide);
          }
          var altVariationSide = getOppositePlacement(mainVariationSide);
          var checks = [];
          if (checkMainAxis) {
            checks.push(overflow[_basePlacement] <= 0);
          }
          if (checkAltAxis) {
            checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
          }
          if (checks.every(function(check) {
            return check;
          })) {
            firstFittingPlacement = placement;
            makeFallbackChecks = false;
            break;
          }
          checksMap.set(placement, checks);
        }
        if (makeFallbackChecks) {
          var numberOfChecks = flipVariations ? 3 : 1;
          var _loop = function _loop2(_i2) {
            var fittingPlacement = placements2.find(function(placement2) {
              var checks2 = checksMap.get(placement2);
              if (checks2) {
                return checks2.slice(0, _i2).every(function(check) {
                  return check;
                });
              }
            });
            if (fittingPlacement) {
              firstFittingPlacement = fittingPlacement;
              return "break";
            }
          };
          for (var _i = numberOfChecks; _i > 0; _i--) {
            var _ret = _loop(_i);
            if (_ret === "break")
              break;
          }
        }
        if (state.placement !== firstFittingPlacement) {
          state.modifiersData[name]._skip = true;
          state.placement = firstFittingPlacement;
          state.reset = true;
        }
      }
      var flip$1 = {
        name: "flip",
        enabled: true,
        phase: "main",
        fn: flip,
        requiresIfExists: ["offset"],
        data: {
          _skip: false
        }
      };
      function getAltAxis(axis) {
        return axis === "x" ? "y" : "x";
      }
      function within(min$1, value, max$1) {
        return max(min$1, min(value, max$1));
      }
      function withinMaxClamp(min2, value, max2) {
        var v = within(min2, value, max2);
        return v > max2 ? max2 : v;
      }
      function preventOverflow(_ref) {
        var state = _ref.state, options = _ref.options, name = _ref.name;
        var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
        var overflow = detectOverflow(state, {
          boundary,
          rootBoundary,
          padding,
          altBoundary
        });
        var basePlacement = getBasePlacement(state.placement);
        var variation = getVariation(state.placement);
        var isBasePlacement = !variation;
        var mainAxis = getMainAxisFromPlacement(basePlacement);
        var altAxis = getAltAxis(mainAxis);
        var popperOffsets2 = state.modifiersData.popperOffsets;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
          placement: state.placement
        })) : tetherOffset;
        var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
          mainAxis: tetherOffsetValue,
          altAxis: tetherOffsetValue
        } : Object.assign({
          mainAxis: 0,
          altAxis: 0
        }, tetherOffsetValue);
        var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
        var data = {
          x: 0,
          y: 0
        };
        if (!popperOffsets2) {
          return;
        }
        if (checkMainAxis) {
          var _offsetModifierState$;
          var mainSide = mainAxis === "y" ? top : left;
          var altSide = mainAxis === "y" ? bottom : right;
          var len = mainAxis === "y" ? "height" : "width";
          var offset2 = popperOffsets2[mainAxis];
          var min$1 = offset2 + overflow[mainSide];
          var max$1 = offset2 - overflow[altSide];
          var additive = tether ? -popperRect[len] / 2 : 0;
          var minLen = variation === start ? referenceRect[len] : popperRect[len];
          var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
          var arrowElement = state.elements.arrow;
          var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
            width: 0,
            height: 0
          };
          var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
          var arrowPaddingMin = arrowPaddingObject[mainSide];
          var arrowPaddingMax = arrowPaddingObject[altSide];
          var arrowLen = within(0, referenceRect[len], arrowRect[len]);
          var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
          var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
          var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
          var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
          var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
          var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
          var tetherMax = offset2 + maxOffset - offsetModifierValue;
          var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
          popperOffsets2[mainAxis] = preventedOffset;
          data[mainAxis] = preventedOffset - offset2;
        }
        if (checkAltAxis) {
          var _offsetModifierState$2;
          var _mainSide = mainAxis === "x" ? top : left;
          var _altSide = mainAxis === "x" ? bottom : right;
          var _offset = popperOffsets2[altAxis];
          var _len = altAxis === "y" ? "height" : "width";
          var _min = _offset + overflow[_mainSide];
          var _max = _offset - overflow[_altSide];
          var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
          var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
          var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
          var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
          var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
          popperOffsets2[altAxis] = _preventedOffset;
          data[altAxis] = _preventedOffset - _offset;
        }
        state.modifiersData[name] = data;
      }
      var preventOverflow$1 = {
        name: "preventOverflow",
        enabled: true,
        phase: "main",
        fn: preventOverflow,
        requiresIfExists: ["offset"]
      };
      var toPaddingObject = function toPaddingObject2(padding, state) {
        padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
          placement: state.placement
        })) : padding;
        return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
      };
      function arrow(_ref) {
        var _state$modifiersData$;
        var state = _ref.state, name = _ref.name, options = _ref.options;
        var arrowElement = state.elements.arrow;
        var popperOffsets2 = state.modifiersData.popperOffsets;
        var basePlacement = getBasePlacement(state.placement);
        var axis = getMainAxisFromPlacement(basePlacement);
        var isVertical = [left, right].indexOf(basePlacement) >= 0;
        var len = isVertical ? "height" : "width";
        if (!arrowElement || !popperOffsets2) {
          return;
        }
        var paddingObject = toPaddingObject(options.padding, state);
        var arrowRect = getLayoutRect(arrowElement);
        var minProp = axis === "y" ? top : left;
        var maxProp = axis === "y" ? bottom : right;
        var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
        var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
        var arrowOffsetParent = getOffsetParent(arrowElement);
        var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
        var centerToReference = endDiff / 2 - startDiff / 2;
        var min2 = paddingObject[minProp];
        var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
        var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
        var offset2 = within(min2, center, max2);
        var axisProp = axis;
        state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
      }
      function effect(_ref2) {
        var state = _ref2.state, options = _ref2.options;
        var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
        if (arrowElement == null) {
          return;
        }
        if (typeof arrowElement === "string") {
          arrowElement = state.elements.popper.querySelector(arrowElement);
          if (!arrowElement) {
            return;
          }
        }
        if (true) {
          if (!isHTMLElement(arrowElement)) {
            console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
          }
        }
        if (!contains(state.elements.popper, arrowElement)) {
          if (true) {
            console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
          }
          return;
        }
        state.elements.arrow = arrowElement;
      }
      var arrow$1 = {
        name: "arrow",
        enabled: true,
        phase: "main",
        fn: arrow,
        effect,
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"]
      };
      function getSideOffsets(overflow, rect, preventedOffsets) {
        if (preventedOffsets === void 0) {
          preventedOffsets = {
            x: 0,
            y: 0
          };
        }
        return {
          top: overflow.top - rect.height - preventedOffsets.y,
          right: overflow.right - rect.width + preventedOffsets.x,
          bottom: overflow.bottom - rect.height + preventedOffsets.y,
          left: overflow.left - rect.width - preventedOffsets.x
        };
      }
      function isAnySideFullyClipped(overflow) {
        return [top, right, bottom, left].some(function(side) {
          return overflow[side] >= 0;
        });
      }
      function hide(_ref) {
        var state = _ref.state, name = _ref.name;
        var referenceRect = state.rects.reference;
        var popperRect = state.rects.popper;
        var preventedOffsets = state.modifiersData.preventOverflow;
        var referenceOverflow = detectOverflow(state, {
          elementContext: "reference"
        });
        var popperAltOverflow = detectOverflow(state, {
          altBoundary: true
        });
        var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
        var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
        var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
        var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
        state.modifiersData[name] = {
          referenceClippingOffsets,
          popperEscapeOffsets,
          isReferenceHidden,
          hasPopperEscaped
        };
        state.attributes.popper = Object.assign({}, state.attributes.popper, {
          "data-popper-reference-hidden": isReferenceHidden,
          "data-popper-escaped": hasPopperEscaped
        });
      }
      var hide$1 = {
        name: "hide",
        enabled: true,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: hide
      };
      var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
      var createPopper$1 = /* @__PURE__ */ popperGenerator({
        defaultModifiers: defaultModifiers$1
      });
      var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
      var createPopper = /* @__PURE__ */ popperGenerator({
        defaultModifiers
      });
      exports.applyStyles = applyStyles$1;
      exports.arrow = arrow$1;
      exports.computeStyles = computeStyles$1;
      exports.createPopper = createPopper;
      exports.createPopperLite = createPopper$1;
      exports.defaultModifiers = defaultModifiers;
      exports.detectOverflow = detectOverflow;
      exports.eventListeners = eventListeners;
      exports.flip = flip$1;
      exports.hide = hide$1;
      exports.offset = offset$1;
      exports.popperGenerator = popperGenerator;
      exports.popperOffsets = popperOffsets$1;
      exports.preventOverflow = preventOverflow$1;
    }
  });

  // node_modules/bootstrap/js/dist/dropdown.js
  var require_dropdown = __commonJS({
    "node_modules/bootstrap/js/dist/dropdown.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_popper(), require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["@popperjs/core", "./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Dropdown = factory(global.Popper, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
      })(exports, function(Popper, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        function _interopNamespace(e) {
          if (e && e.__esModule)
            return e;
          const n = /* @__PURE__ */ Object.create(null);
          if (e) {
            for (const k in e) {
              if (k !== "default") {
                const d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                  enumerable: true,
                  get: () => e[k]
                });
              }
            }
          }
          n.default = e;
          return Object.freeze(n);
        }
        const Popper__namespace = /* @__PURE__ */ _interopNamespace(Popper);
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
        const Manipulator__default = /* @__PURE__ */ _interopDefaultLegacy(Manipulator);
        const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent);
        const toType = (obj) => {
          if (obj === null || obj === void 0) {
            return `${obj}`;
          }
          return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        };
        const getSelector = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttr = element.getAttribute("href");
            if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
              return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
              hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
          }
          return selector;
        };
        const getElementFromSelector = (element) => {
          const selector = getSelector(element);
          return selector ? document.querySelector(selector) : null;
        };
        const isElement = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const getElement = (obj) => {
          if (isElement(obj)) {
            return obj.jquery ? obj[0] : obj;
          }
          if (typeof obj === "string" && obj.length > 0) {
            return document.querySelector(obj);
          }
          return null;
        };
        const typeCheckConfig = (componentName, config, configTypes) => {
          Object.keys(configTypes).forEach((property) => {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? "element" : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          });
        };
        const isVisible = (element) => {
          if (!isElement(element) || element.getClientRects().length === 0) {
            return false;
          }
          return getComputedStyle(element).getPropertyValue("visibility") === "visible";
        };
        const isDisabled = (element) => {
          if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
          }
          if (element.classList.contains("disabled")) {
            return true;
          }
          if (typeof element.disabled !== "undefined") {
            return element.disabled;
          }
          return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
        };
        const noop = () => {
        };
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const isRTL = () => document.documentElement.dir === "rtl";
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
          let index = list.indexOf(activeElement);
          if (index === -1) {
            return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
          }
          const listLength = list.length;
          index += shouldGetNext ? 1 : -1;
          if (isCycleAllowed) {
            index = (index + listLength) % listLength;
          }
          return list[Math.max(0, Math.min(index, listLength - 1))];
        };
        const NAME = "dropdown";
        const DATA_KEY = "bs.dropdown";
        const EVENT_KEY = `.${DATA_KEY}`;
        const DATA_API_KEY = ".data-api";
        const ESCAPE_KEY = "Escape";
        const SPACE_KEY = "Space";
        const TAB_KEY = "Tab";
        const ARROW_UP_KEY = "ArrowUp";
        const ARROW_DOWN_KEY = "ArrowDown";
        const RIGHT_MOUSE_BUTTON = 2;
        const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY}`);
        const EVENT_HIDE = `hide${EVENT_KEY}`;
        const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
        const EVENT_SHOW = `show${EVENT_KEY}`;
        const EVENT_SHOWN = `shown${EVENT_KEY}`;
        const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
        const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
        const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
        const CLASS_NAME_SHOW = "show";
        const CLASS_NAME_DROPUP = "dropup";
        const CLASS_NAME_DROPEND = "dropend";
        const CLASS_NAME_DROPSTART = "dropstart";
        const CLASS_NAME_NAVBAR = "navbar";
        const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]';
        const SELECTOR_MENU = ".dropdown-menu";
        const SELECTOR_NAVBAR_NAV = ".navbar-nav";
        const SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
        const PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
        const PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
        const PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
        const PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
        const PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
        const PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
        const Default = {
          offset: [0, 2],
          boundary: "clippingParents",
          reference: "toggle",
          display: "dynamic",
          popperConfig: null,
          autoClose: true
        };
        const DefaultType = {
          offset: "(array|string|function)",
          boundary: "(string|element)",
          reference: "(string|element|object)",
          display: "string",
          popperConfig: "(null|object|function)",
          autoClose: "(boolean|string)"
        };
        class Dropdown2 extends BaseComponent__default.default {
          constructor(element, config) {
            super(element);
            this._popper = null;
            this._config = this._getConfig(config);
            this._menu = this._getMenuElement();
            this._inNavbar = this._detectNavbar();
          }
          // Getters
          static get Default() {
            return Default;
          }
          static get DefaultType() {
            return DefaultType;
          }
          static get NAME() {
            return NAME;
          }
          // Public
          toggle() {
            return this._isShown() ? this.hide() : this.show();
          }
          show() {
            if (isDisabled(this._element) || this._isShown(this._menu)) {
              return;
            }
            const relatedTarget = {
              relatedTarget: this._element
            };
            const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, relatedTarget);
            if (showEvent.defaultPrevented) {
              return;
            }
            const parent = Dropdown2.getParentFromElement(this._element);
            if (this._inNavbar) {
              Manipulator__default.default.setDataAttribute(this._menu, "popper", "none");
            } else {
              this._createPopper(parent);
            }
            if ("ontouchstart" in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
              [].concat(...document.body.children).forEach((elem) => EventHandler__default.default.on(elem, "mouseover", noop));
            }
            this._element.focus();
            this._element.setAttribute("aria-expanded", true);
            this._menu.classList.add(CLASS_NAME_SHOW);
            this._element.classList.add(CLASS_NAME_SHOW);
            EventHandler__default.default.trigger(this._element, EVENT_SHOWN, relatedTarget);
          }
          hide() {
            if (isDisabled(this._element) || !this._isShown(this._menu)) {
              return;
            }
            const relatedTarget = {
              relatedTarget: this._element
            };
            this._completeHide(relatedTarget);
          }
          dispose() {
            if (this._popper) {
              this._popper.destroy();
            }
            super.dispose();
          }
          update() {
            this._inNavbar = this._detectNavbar();
            if (this._popper) {
              this._popper.update();
            }
          }
          // Private
          _completeHide(relatedTarget) {
            const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE, relatedTarget);
            if (hideEvent.defaultPrevented) {
              return;
            }
            if ("ontouchstart" in document.documentElement) {
              [].concat(...document.body.children).forEach((elem) => EventHandler__default.default.off(elem, "mouseover", noop));
            }
            if (this._popper) {
              this._popper.destroy();
            }
            this._menu.classList.remove(CLASS_NAME_SHOW);
            this._element.classList.remove(CLASS_NAME_SHOW);
            this._element.setAttribute("aria-expanded", "false");
            Manipulator__default.default.removeDataAttribute(this._menu, "popper");
            EventHandler__default.default.trigger(this._element, EVENT_HIDDEN, relatedTarget);
          }
          _getConfig(config) {
            config = {
              ...this.constructor.Default,
              ...Manipulator__default.default.getDataAttributes(this._element),
              ...config
            };
            typeCheckConfig(NAME, config, this.constructor.DefaultType);
            if (typeof config.reference === "object" && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
              throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
            }
            return config;
          }
          _createPopper(parent) {
            if (typeof Popper__namespace === "undefined") {
              throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            }
            let referenceElement = this._element;
            if (this._config.reference === "parent") {
              referenceElement = parent;
            } else if (isElement(this._config.reference)) {
              referenceElement = getElement(this._config.reference);
            } else if (typeof this._config.reference === "object") {
              referenceElement = this._config.reference;
            }
            const popperConfig = this._getPopperConfig();
            const isDisplayStatic = popperConfig.modifiers.find((modifier) => modifier.name === "applyStyles" && modifier.enabled === false);
            this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
            if (isDisplayStatic) {
              Manipulator__default.default.setDataAttribute(this._menu, "popper", "static");
            }
          }
          _isShown(element = this._element) {
            return element.classList.contains(CLASS_NAME_SHOW);
          }
          _getMenuElement() {
            return SelectorEngine__default.default.next(this._element, SELECTOR_MENU)[0];
          }
          _getPlacement() {
            const parentDropdown = this._element.parentNode;
            if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
              return PLACEMENT_RIGHT;
            }
            if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
              return PLACEMENT_LEFT;
            }
            const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
            if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
              return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
            }
            return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
          }
          _detectNavbar() {
            return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
          }
          _getOffset() {
            const {
              offset
            } = this._config;
            if (typeof offset === "string") {
              return offset.split(",").map((val) => Number.parseInt(val, 10));
            }
            if (typeof offset === "function") {
              return (popperData) => offset(popperData, this._element);
            }
            return offset;
          }
          _getPopperConfig() {
            const defaultBsPopperConfig = {
              placement: this._getPlacement(),
              modifiers: [{
                name: "preventOverflow",
                options: {
                  boundary: this._config.boundary
                }
              }, {
                name: "offset",
                options: {
                  offset: this._getOffset()
                }
              }]
            };
            if (this._config.display === "static") {
              defaultBsPopperConfig.modifiers = [{
                name: "applyStyles",
                enabled: false
              }];
            }
            return {
              ...defaultBsPopperConfig,
              ...typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig
            };
          }
          _selectMenuItem({
            key,
            target
          }) {
            const items = SelectorEngine__default.default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);
            if (!items.length) {
              return;
            }
            getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
          }
          // Static
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Dropdown2.getOrCreateInstance(this, config);
              if (typeof config !== "string") {
                return;
              }
              if (typeof data[config] === "undefined") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config]();
            });
          }
          static clearMenus(event) {
            if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY)) {
              return;
            }
            const toggles = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);
            for (let i = 0, len = toggles.length; i < len; i++) {
              const context = Dropdown2.getInstance(toggles[i]);
              if (!context || context._config.autoClose === false) {
                continue;
              }
              if (!context._isShown()) {
                continue;
              }
              const relatedTarget = {
                relatedTarget: context._element
              };
              if (event) {
                const composedPath = event.composedPath();
                const isMenuTarget = composedPath.includes(context._menu);
                if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
                  continue;
                }
                if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
                  continue;
                }
                if (event.type === "click") {
                  relatedTarget.clickEvent = event;
                }
              }
              context._completeHide(relatedTarget);
            }
          }
          static getParentFromElement(element) {
            return getElementFromSelector(element) || element.parentNode;
          }
          static dataApiKeydownHandler(event) {
            if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
              return;
            }
            const isActive = this.classList.contains(CLASS_NAME_SHOW);
            if (!isActive && event.key === ESCAPE_KEY) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (isDisabled(this)) {
              return;
            }
            const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine__default.default.prev(this, SELECTOR_DATA_TOGGLE)[0];
            const instance = Dropdown2.getOrCreateInstance(getToggleButton);
            if (event.key === ESCAPE_KEY) {
              instance.hide();
              return;
            }
            if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
              if (!isActive) {
                instance.show();
              }
              instance._selectMenuItem(event);
              return;
            }
            if (!isActive || event.key === SPACE_KEY) {
              Dropdown2.clearMenus();
            }
          }
        }
        EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown2.dataApiKeydownHandler);
        EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown2.dataApiKeydownHandler);
        EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, Dropdown2.clearMenus);
        EventHandler__default.default.on(document, EVENT_KEYUP_DATA_API, Dropdown2.clearMenus);
        EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
          event.preventDefault();
          Dropdown2.getOrCreateInstance(this).toggle();
        });
        defineJQueryPlugin(Dropdown2);
        return Dropdown2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/modal.js
  var require_modal = __commonJS({
    "node_modules/bootstrap/js/dist/modal.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Modal = factory(global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
      })(exports, function(EventHandler, Manipulator, SelectorEngine, BaseComponent) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
        const Manipulator__default = /* @__PURE__ */ _interopDefaultLegacy(Manipulator);
        const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent);
        const MILLISECONDS_MULTIPLIER = 1e3;
        const TRANSITION_END = "transitionend";
        const toType = (obj) => {
          if (obj === null || obj === void 0) {
            return `${obj}`;
          }
          return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        };
        const getSelector = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttr = element.getAttribute("href");
            if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
              return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
              hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
          }
          return selector;
        };
        const getElementFromSelector = (element) => {
          const selector = getSelector(element);
          return selector ? document.querySelector(selector) : null;
        };
        const getTransitionDurationFromElement = (element) => {
          if (!element) {
            return 0;
          }
          let {
            transitionDuration,
            transitionDelay
          } = window.getComputedStyle(element);
          const floatTransitionDuration = Number.parseFloat(transitionDuration);
          const floatTransitionDelay = Number.parseFloat(transitionDelay);
          if (!floatTransitionDuration && !floatTransitionDelay) {
            return 0;
          }
          transitionDuration = transitionDuration.split(",")[0];
          transitionDelay = transitionDelay.split(",")[0];
          return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
        };
        const triggerTransitionEnd = (element) => {
          element.dispatchEvent(new Event(TRANSITION_END));
        };
        const isElement = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const getElement = (obj) => {
          if (isElement(obj)) {
            return obj.jquery ? obj[0] : obj;
          }
          if (typeof obj === "string" && obj.length > 0) {
            return document.querySelector(obj);
          }
          return null;
        };
        const typeCheckConfig = (componentName, config, configTypes) => {
          Object.keys(configTypes).forEach((property) => {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? "element" : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          });
        };
        const isVisible = (element) => {
          if (!isElement(element) || element.getClientRects().length === 0) {
            return false;
          }
          return getComputedStyle(element).getPropertyValue("visibility") === "visible";
        };
        const isDisabled = (element) => {
          if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
          }
          if (element.classList.contains("disabled")) {
            return true;
          }
          if (typeof element.disabled !== "undefined") {
            return element.disabled;
          }
          return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
        };
        const reflow = (element) => {
          element.offsetHeight;
        };
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const isRTL = () => document.documentElement.dir === "rtl";
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const execute = (callback) => {
          if (typeof callback === "function") {
            callback();
          }
        };
        const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
          if (!waitForTransition) {
            execute(callback);
            return;
          }
          const durationPadding = 5;
          const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
          let called = false;
          const handler = ({
            target
          }) => {
            if (target !== transitionElement) {
              return;
            }
            called = true;
            transitionElement.removeEventListener(TRANSITION_END, handler);
            execute(callback);
          };
          transitionElement.addEventListener(TRANSITION_END, handler);
          setTimeout(() => {
            if (!called) {
              triggerTransitionEnd(transitionElement);
            }
          }, emulatedDuration);
        };
        const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
        const SELECTOR_STICKY_CONTENT = ".sticky-top";
        class ScrollBarHelper {
          constructor() {
            this._element = document.body;
          }
          getWidth() {
            const documentWidth = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - documentWidth);
          }
          hide() {
            const width = this.getWidth();
            this._disableOverFlow();
            this._setElementAttributes(this._element, "paddingRight", (calculatedValue) => calculatedValue + width);
            this._setElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight", (calculatedValue) => calculatedValue + width);
            this._setElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight", (calculatedValue) => calculatedValue - width);
          }
          _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow");
            this._element.style.overflow = "hidden";
          }
          _setElementAttributes(selector, styleProp, callback) {
            const scrollbarWidth = this.getWidth();
            const manipulationCallBack = (element) => {
              if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
                return;
              }
              this._saveInitialAttribute(element, styleProp);
              const calculatedValue = window.getComputedStyle(element)[styleProp];
              element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
            };
            this._applyManipulationCallback(selector, manipulationCallBack);
          }
          reset() {
            this._resetElementAttributes(this._element, "overflow");
            this._resetElementAttributes(this._element, "paddingRight");
            this._resetElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight");
            this._resetElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight");
          }
          _saveInitialAttribute(element, styleProp) {
            const actualValue = element.style[styleProp];
            if (actualValue) {
              Manipulator__default.default.setDataAttribute(element, styleProp, actualValue);
            }
          }
          _resetElementAttributes(selector, styleProp) {
            const manipulationCallBack = (element) => {
              const value = Manipulator__default.default.getDataAttribute(element, styleProp);
              if (typeof value === "undefined") {
                element.style.removeProperty(styleProp);
              } else {
                Manipulator__default.default.removeDataAttribute(element, styleProp);
                element.style[styleProp] = value;
              }
            };
            this._applyManipulationCallback(selector, manipulationCallBack);
          }
          _applyManipulationCallback(selector, callBack) {
            if (isElement(selector)) {
              callBack(selector);
            } else {
              SelectorEngine__default.default.find(selector, this._element).forEach(callBack);
            }
          }
          isOverflowing() {
            return this.getWidth() > 0;
          }
        }
        const Default$2 = {
          className: "modal-backdrop",
          isVisible: true,
          // if false, we use the backdrop helper without adding any element to the dom
          isAnimated: false,
          rootElement: "body",
          // give the choice to place backdrop under different elements
          clickCallback: null
        };
        const DefaultType$2 = {
          className: "string",
          isVisible: "boolean",
          isAnimated: "boolean",
          rootElement: "(element|string)",
          clickCallback: "(function|null)"
        };
        const NAME$2 = "backdrop";
        const CLASS_NAME_FADE$1 = "fade";
        const CLASS_NAME_SHOW$1 = "show";
        const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$2}`;
        class Backdrop {
          constructor(config) {
            this._config = this._getConfig(config);
            this._isAppended = false;
            this._element = null;
          }
          show(callback) {
            if (!this._config.isVisible) {
              execute(callback);
              return;
            }
            this._append();
            if (this._config.isAnimated) {
              reflow(this._getElement());
            }
            this._getElement().classList.add(CLASS_NAME_SHOW$1);
            this._emulateAnimation(() => {
              execute(callback);
            });
          }
          hide(callback) {
            if (!this._config.isVisible) {
              execute(callback);
              return;
            }
            this._getElement().classList.remove(CLASS_NAME_SHOW$1);
            this._emulateAnimation(() => {
              this.dispose();
              execute(callback);
            });
          }
          // Private
          _getElement() {
            if (!this._element) {
              const backdrop = document.createElement("div");
              backdrop.className = this._config.className;
              if (this._config.isAnimated) {
                backdrop.classList.add(CLASS_NAME_FADE$1);
              }
              this._element = backdrop;
            }
            return this._element;
          }
          _getConfig(config) {
            config = {
              ...Default$2,
              ...typeof config === "object" ? config : {}
            };
            config.rootElement = getElement(config.rootElement);
            typeCheckConfig(NAME$2, config, DefaultType$2);
            return config;
          }
          _append() {
            if (this._isAppended) {
              return;
            }
            this._config.rootElement.append(this._getElement());
            EventHandler__default.default.on(this._getElement(), EVENT_MOUSEDOWN, () => {
              execute(this._config.clickCallback);
            });
            this._isAppended = true;
          }
          dispose() {
            if (!this._isAppended) {
              return;
            }
            EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);
            this._element.remove();
            this._isAppended = false;
          }
          _emulateAnimation(callback) {
            executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
          }
        }
        const Default$1 = {
          trapElement: null,
          // The element to trap focus inside of
          autofocus: true
        };
        const DefaultType$1 = {
          trapElement: "element",
          autofocus: "boolean"
        };
        const NAME$1 = "focustrap";
        const DATA_KEY$1 = "bs.focustrap";
        const EVENT_KEY$1 = `.${DATA_KEY$1}`;
        const EVENT_FOCUSIN = `focusin${EVENT_KEY$1}`;
        const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$1}`;
        const TAB_KEY = "Tab";
        const TAB_NAV_FORWARD = "forward";
        const TAB_NAV_BACKWARD = "backward";
        class FocusTrap {
          constructor(config) {
            this._config = this._getConfig(config);
            this._isActive = false;
            this._lastTabNavDirection = null;
          }
          activate() {
            const {
              trapElement,
              autofocus
            } = this._config;
            if (this._isActive) {
              return;
            }
            if (autofocus) {
              trapElement.focus();
            }
            EventHandler__default.default.off(document, EVENT_KEY$1);
            EventHandler__default.default.on(document, EVENT_FOCUSIN, (event) => this._handleFocusin(event));
            EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
            this._isActive = true;
          }
          deactivate() {
            if (!this._isActive) {
              return;
            }
            this._isActive = false;
            EventHandler__default.default.off(document, EVENT_KEY$1);
          }
          // Private
          _handleFocusin(event) {
            const {
              target
            } = event;
            const {
              trapElement
            } = this._config;
            if (target === document || target === trapElement || trapElement.contains(target)) {
              return;
            }
            const elements = SelectorEngine__default.default.focusableChildren(trapElement);
            if (elements.length === 0) {
              trapElement.focus();
            } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
              elements[elements.length - 1].focus();
            } else {
              elements[0].focus();
            }
          }
          _handleKeydown(event) {
            if (event.key !== TAB_KEY) {
              return;
            }
            this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
          }
          _getConfig(config) {
            config = {
              ...Default$1,
              ...typeof config === "object" ? config : {}
            };
            typeCheckConfig(NAME$1, config, DefaultType$1);
            return config;
          }
        }
        const enableDismissTrigger = (component, method = "hide") => {
          const clickEvent = `click.dismiss${component.EVENT_KEY}`;
          const name = component.NAME;
          EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
            if (["A", "AREA"].includes(this.tagName)) {
              event.preventDefault();
            }
            if (isDisabled(this)) {
              return;
            }
            const target = getElementFromSelector(this) || this.closest(`.${name}`);
            const instance = component.getOrCreateInstance(target);
            instance[method]();
          });
        };
        const NAME = "modal";
        const DATA_KEY = "bs.modal";
        const EVENT_KEY = `.${DATA_KEY}`;
        const DATA_API_KEY = ".data-api";
        const ESCAPE_KEY = "Escape";
        const Default = {
          backdrop: true,
          keyboard: true,
          focus: true
        };
        const DefaultType = {
          backdrop: "(boolean|string)",
          keyboard: "boolean",
          focus: "boolean"
        };
        const EVENT_HIDE = `hide${EVENT_KEY}`;
        const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
        const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
        const EVENT_SHOW = `show${EVENT_KEY}`;
        const EVENT_SHOWN = `shown${EVENT_KEY}`;
        const EVENT_RESIZE = `resize${EVENT_KEY}`;
        const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
        const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
        const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`;
        const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
        const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
        const CLASS_NAME_OPEN = "modal-open";
        const CLASS_NAME_FADE = "fade";
        const CLASS_NAME_SHOW = "show";
        const CLASS_NAME_STATIC = "modal-static";
        const OPEN_SELECTOR = ".modal.show";
        const SELECTOR_DIALOG = ".modal-dialog";
        const SELECTOR_MODAL_BODY = ".modal-body";
        const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
        class Modal2 extends BaseComponent__default.default {
          constructor(element, config) {
            super(element);
            this._config = this._getConfig(config);
            this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
            this._backdrop = this._initializeBackDrop();
            this._focustrap = this._initializeFocusTrap();
            this._isShown = false;
            this._ignoreBackdropClick = false;
            this._isTransitioning = false;
            this._scrollBar = new ScrollBarHelper();
          }
          // Getters
          static get Default() {
            return Default;
          }
          static get NAME() {
            return NAME;
          }
          // Public
          toggle(relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
          }
          show(relatedTarget) {
            if (this._isShown || this._isTransitioning) {
              return;
            }
            const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
              relatedTarget
            });
            if (showEvent.defaultPrevented) {
              return;
            }
            this._isShown = true;
            if (this._isAnimated()) {
              this._isTransitioning = true;
            }
            this._scrollBar.hide();
            document.body.classList.add(CLASS_NAME_OPEN);
            this._adjustDialog();
            this._setEscapeEvent();
            this._setResizeEvent();
            EventHandler__default.default.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
              EventHandler__default.default.one(this._element, EVENT_MOUSEUP_DISMISS, (event) => {
                if (event.target === this._element) {
                  this._ignoreBackdropClick = true;
                }
              });
            });
            this._showBackdrop(() => this._showElement(relatedTarget));
          }
          hide() {
            if (!this._isShown || this._isTransitioning) {
              return;
            }
            const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
            if (hideEvent.defaultPrevented) {
              return;
            }
            this._isShown = false;
            const isAnimated = this._isAnimated();
            if (isAnimated) {
              this._isTransitioning = true;
            }
            this._setEscapeEvent();
            this._setResizeEvent();
            this._focustrap.deactivate();
            this._element.classList.remove(CLASS_NAME_SHOW);
            EventHandler__default.default.off(this._element, EVENT_CLICK_DISMISS);
            EventHandler__default.default.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);
            this._queueCallback(() => this._hideModal(), this._element, isAnimated);
          }
          dispose() {
            [window, this._dialog].forEach((htmlElement) => EventHandler__default.default.off(htmlElement, EVENT_KEY));
            this._backdrop.dispose();
            this._focustrap.deactivate();
            super.dispose();
          }
          handleUpdate() {
            this._adjustDialog();
          }
          // Private
          _initializeBackDrop() {
            return new Backdrop({
              isVisible: Boolean(this._config.backdrop),
              // 'static' option will be translated to true, and booleans will keep their value
              isAnimated: this._isAnimated()
            });
          }
          _initializeFocusTrap() {
            return new FocusTrap({
              trapElement: this._element
            });
          }
          _getConfig(config) {
            config = {
              ...Default,
              ...Manipulator__default.default.getDataAttributes(this._element),
              ...typeof config === "object" ? config : {}
            };
            typeCheckConfig(NAME, config, DefaultType);
            return config;
          }
          _showElement(relatedTarget) {
            const isAnimated = this._isAnimated();
            const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);
            if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
              document.body.append(this._element);
            }
            this._element.style.display = "block";
            this._element.removeAttribute("aria-hidden");
            this._element.setAttribute("aria-modal", true);
            this._element.setAttribute("role", "dialog");
            this._element.scrollTop = 0;
            if (modalBody) {
              modalBody.scrollTop = 0;
            }
            if (isAnimated) {
              reflow(this._element);
            }
            this._element.classList.add(CLASS_NAME_SHOW);
            const transitionComplete = () => {
              if (this._config.focus) {
                this._focustrap.activate();
              }
              this._isTransitioning = false;
              EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
                relatedTarget
              });
            };
            this._queueCallback(transitionComplete, this._dialog, isAnimated);
          }
          _setEscapeEvent() {
            if (this._isShown) {
              EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
                if (this._config.keyboard && event.key === ESCAPE_KEY) {
                  event.preventDefault();
                  this.hide();
                } else if (!this._config.keyboard && event.key === ESCAPE_KEY) {
                  this._triggerBackdropTransition();
                }
              });
            } else {
              EventHandler__default.default.off(this._element, EVENT_KEYDOWN_DISMISS);
            }
          }
          _setResizeEvent() {
            if (this._isShown) {
              EventHandler__default.default.on(window, EVENT_RESIZE, () => this._adjustDialog());
            } else {
              EventHandler__default.default.off(window, EVENT_RESIZE);
            }
          }
          _hideModal() {
            this._element.style.display = "none";
            this._element.setAttribute("aria-hidden", true);
            this._element.removeAttribute("aria-modal");
            this._element.removeAttribute("role");
            this._isTransitioning = false;
            this._backdrop.hide(() => {
              document.body.classList.remove(CLASS_NAME_OPEN);
              this._resetAdjustments();
              this._scrollBar.reset();
              EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
            });
          }
          _showBackdrop(callback) {
            EventHandler__default.default.on(this._element, EVENT_CLICK_DISMISS, (event) => {
              if (this._ignoreBackdropClick) {
                this._ignoreBackdropClick = false;
                return;
              }
              if (event.target !== event.currentTarget) {
                return;
              }
              if (this._config.backdrop === true) {
                this.hide();
              } else if (this._config.backdrop === "static") {
                this._triggerBackdropTransition();
              }
            });
            this._backdrop.show(callback);
          }
          _isAnimated() {
            return this._element.classList.contains(CLASS_NAME_FADE);
          }
          _triggerBackdropTransition() {
            const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
            if (hideEvent.defaultPrevented) {
              return;
            }
            const {
              classList,
              scrollHeight,
              style
            } = this._element;
            const isModalOverflowing = scrollHeight > document.documentElement.clientHeight;
            if (!isModalOverflowing && style.overflowY === "hidden" || classList.contains(CLASS_NAME_STATIC)) {
              return;
            }
            if (!isModalOverflowing) {
              style.overflowY = "hidden";
            }
            classList.add(CLASS_NAME_STATIC);
            this._queueCallback(() => {
              classList.remove(CLASS_NAME_STATIC);
              if (!isModalOverflowing) {
                this._queueCallback(() => {
                  style.overflowY = "";
                }, this._dialog);
              }
            }, this._dialog);
            this._element.focus();
          }
          // ----------------------------------------------------------------------
          // the following methods are used to handle overflowing modals
          // ----------------------------------------------------------------------
          _adjustDialog() {
            const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
            const scrollbarWidth = this._scrollBar.getWidth();
            const isBodyOverflowing = scrollbarWidth > 0;
            if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
              this._element.style.paddingLeft = `${scrollbarWidth}px`;
            }
            if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
              this._element.style.paddingRight = `${scrollbarWidth}px`;
            }
          }
          _resetAdjustments() {
            this._element.style.paddingLeft = "";
            this._element.style.paddingRight = "";
          }
          // Static
          static jQueryInterface(config, relatedTarget) {
            return this.each(function() {
              const data = Modal2.getOrCreateInstance(this, config);
              if (typeof config !== "string") {
                return;
              }
              if (typeof data[config] === "undefined") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config](relatedTarget);
            });
          }
        }
        EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
          const target = getElementFromSelector(this);
          if (["A", "AREA"].includes(this.tagName)) {
            event.preventDefault();
          }
          EventHandler__default.default.one(target, EVENT_SHOW, (showEvent) => {
            if (showEvent.defaultPrevented) {
              return;
            }
            EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
              if (isVisible(this)) {
                this.focus();
              }
            });
          });
          const allReadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
          if (allReadyOpen) {
            Modal2.getInstance(allReadyOpen).hide();
          }
          const data = Modal2.getOrCreateInstance(target);
          data.toggle(this);
        });
        enableDismissTrigger(Modal2);
        defineJQueryPlugin(Modal2);
        return Modal2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/offcanvas.js
  var require_offcanvas = __commonJS({
    "node_modules/bootstrap/js/dist/offcanvas.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_selector_engine(), require_manipulator(), require_event_handler(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/selector-engine", "./dom/manipulator", "./dom/event-handler", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Offcanvas = factory(global.SelectorEngine, global.Manipulator, global.EventHandler, global.Base));
      })(exports, function(SelectorEngine, Manipulator, EventHandler, BaseComponent) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine);
        const Manipulator__default = /* @__PURE__ */ _interopDefaultLegacy(Manipulator);
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent);
        const MILLISECONDS_MULTIPLIER = 1e3;
        const TRANSITION_END = "transitionend";
        const toType = (obj) => {
          if (obj === null || obj === void 0) {
            return `${obj}`;
          }
          return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        };
        const getSelector = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttr = element.getAttribute("href");
            if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
              return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
              hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
          }
          return selector;
        };
        const getElementFromSelector = (element) => {
          const selector = getSelector(element);
          return selector ? document.querySelector(selector) : null;
        };
        const getTransitionDurationFromElement = (element) => {
          if (!element) {
            return 0;
          }
          let {
            transitionDuration,
            transitionDelay
          } = window.getComputedStyle(element);
          const floatTransitionDuration = Number.parseFloat(transitionDuration);
          const floatTransitionDelay = Number.parseFloat(transitionDelay);
          if (!floatTransitionDuration && !floatTransitionDelay) {
            return 0;
          }
          transitionDuration = transitionDuration.split(",")[0];
          transitionDelay = transitionDelay.split(",")[0];
          return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
        };
        const triggerTransitionEnd = (element) => {
          element.dispatchEvent(new Event(TRANSITION_END));
        };
        const isElement = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const getElement = (obj) => {
          if (isElement(obj)) {
            return obj.jquery ? obj[0] : obj;
          }
          if (typeof obj === "string" && obj.length > 0) {
            return document.querySelector(obj);
          }
          return null;
        };
        const typeCheckConfig = (componentName, config, configTypes) => {
          Object.keys(configTypes).forEach((property) => {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? "element" : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          });
        };
        const isVisible = (element) => {
          if (!isElement(element) || element.getClientRects().length === 0) {
            return false;
          }
          return getComputedStyle(element).getPropertyValue("visibility") === "visible";
        };
        const isDisabled = (element) => {
          if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
          }
          if (element.classList.contains("disabled")) {
            return true;
          }
          if (typeof element.disabled !== "undefined") {
            return element.disabled;
          }
          return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
        };
        const reflow = (element) => {
          element.offsetHeight;
        };
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const execute = (callback) => {
          if (typeof callback === "function") {
            callback();
          }
        };
        const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
          if (!waitForTransition) {
            execute(callback);
            return;
          }
          const durationPadding = 5;
          const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
          let called = false;
          const handler = ({
            target
          }) => {
            if (target !== transitionElement) {
              return;
            }
            called = true;
            transitionElement.removeEventListener(TRANSITION_END, handler);
            execute(callback);
          };
          transitionElement.addEventListener(TRANSITION_END, handler);
          setTimeout(() => {
            if (!called) {
              triggerTransitionEnd(transitionElement);
            }
          }, emulatedDuration);
        };
        const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
        const SELECTOR_STICKY_CONTENT = ".sticky-top";
        class ScrollBarHelper {
          constructor() {
            this._element = document.body;
          }
          getWidth() {
            const documentWidth = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - documentWidth);
          }
          hide() {
            const width = this.getWidth();
            this._disableOverFlow();
            this._setElementAttributes(this._element, "paddingRight", (calculatedValue) => calculatedValue + width);
            this._setElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight", (calculatedValue) => calculatedValue + width);
            this._setElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight", (calculatedValue) => calculatedValue - width);
          }
          _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow");
            this._element.style.overflow = "hidden";
          }
          _setElementAttributes(selector, styleProp, callback) {
            const scrollbarWidth = this.getWidth();
            const manipulationCallBack = (element) => {
              if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
                return;
              }
              this._saveInitialAttribute(element, styleProp);
              const calculatedValue = window.getComputedStyle(element)[styleProp];
              element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
            };
            this._applyManipulationCallback(selector, manipulationCallBack);
          }
          reset() {
            this._resetElementAttributes(this._element, "overflow");
            this._resetElementAttributes(this._element, "paddingRight");
            this._resetElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight");
            this._resetElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight");
          }
          _saveInitialAttribute(element, styleProp) {
            const actualValue = element.style[styleProp];
            if (actualValue) {
              Manipulator__default.default.setDataAttribute(element, styleProp, actualValue);
            }
          }
          _resetElementAttributes(selector, styleProp) {
            const manipulationCallBack = (element) => {
              const value = Manipulator__default.default.getDataAttribute(element, styleProp);
              if (typeof value === "undefined") {
                element.style.removeProperty(styleProp);
              } else {
                Manipulator__default.default.removeDataAttribute(element, styleProp);
                element.style[styleProp] = value;
              }
            };
            this._applyManipulationCallback(selector, manipulationCallBack);
          }
          _applyManipulationCallback(selector, callBack) {
            if (isElement(selector)) {
              callBack(selector);
            } else {
              SelectorEngine__default.default.find(selector, this._element).forEach(callBack);
            }
          }
          isOverflowing() {
            return this.getWidth() > 0;
          }
        }
        const Default$2 = {
          className: "modal-backdrop",
          isVisible: true,
          // if false, we use the backdrop helper without adding any element to the dom
          isAnimated: false,
          rootElement: "body",
          // give the choice to place backdrop under different elements
          clickCallback: null
        };
        const DefaultType$2 = {
          className: "string",
          isVisible: "boolean",
          isAnimated: "boolean",
          rootElement: "(element|string)",
          clickCallback: "(function|null)"
        };
        const NAME$2 = "backdrop";
        const CLASS_NAME_FADE = "fade";
        const CLASS_NAME_SHOW$1 = "show";
        const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$2}`;
        class Backdrop {
          constructor(config) {
            this._config = this._getConfig(config);
            this._isAppended = false;
            this._element = null;
          }
          show(callback) {
            if (!this._config.isVisible) {
              execute(callback);
              return;
            }
            this._append();
            if (this._config.isAnimated) {
              reflow(this._getElement());
            }
            this._getElement().classList.add(CLASS_NAME_SHOW$1);
            this._emulateAnimation(() => {
              execute(callback);
            });
          }
          hide(callback) {
            if (!this._config.isVisible) {
              execute(callback);
              return;
            }
            this._getElement().classList.remove(CLASS_NAME_SHOW$1);
            this._emulateAnimation(() => {
              this.dispose();
              execute(callback);
            });
          }
          // Private
          _getElement() {
            if (!this._element) {
              const backdrop = document.createElement("div");
              backdrop.className = this._config.className;
              if (this._config.isAnimated) {
                backdrop.classList.add(CLASS_NAME_FADE);
              }
              this._element = backdrop;
            }
            return this._element;
          }
          _getConfig(config) {
            config = {
              ...Default$2,
              ...typeof config === "object" ? config : {}
            };
            config.rootElement = getElement(config.rootElement);
            typeCheckConfig(NAME$2, config, DefaultType$2);
            return config;
          }
          _append() {
            if (this._isAppended) {
              return;
            }
            this._config.rootElement.append(this._getElement());
            EventHandler__default.default.on(this._getElement(), EVENT_MOUSEDOWN, () => {
              execute(this._config.clickCallback);
            });
            this._isAppended = true;
          }
          dispose() {
            if (!this._isAppended) {
              return;
            }
            EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);
            this._element.remove();
            this._isAppended = false;
          }
          _emulateAnimation(callback) {
            executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
          }
        }
        const Default$1 = {
          trapElement: null,
          // The element to trap focus inside of
          autofocus: true
        };
        const DefaultType$1 = {
          trapElement: "element",
          autofocus: "boolean"
        };
        const NAME$1 = "focustrap";
        const DATA_KEY$1 = "bs.focustrap";
        const EVENT_KEY$1 = `.${DATA_KEY$1}`;
        const EVENT_FOCUSIN = `focusin${EVENT_KEY$1}`;
        const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$1}`;
        const TAB_KEY = "Tab";
        const TAB_NAV_FORWARD = "forward";
        const TAB_NAV_BACKWARD = "backward";
        class FocusTrap {
          constructor(config) {
            this._config = this._getConfig(config);
            this._isActive = false;
            this._lastTabNavDirection = null;
          }
          activate() {
            const {
              trapElement,
              autofocus
            } = this._config;
            if (this._isActive) {
              return;
            }
            if (autofocus) {
              trapElement.focus();
            }
            EventHandler__default.default.off(document, EVENT_KEY$1);
            EventHandler__default.default.on(document, EVENT_FOCUSIN, (event) => this._handleFocusin(event));
            EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
            this._isActive = true;
          }
          deactivate() {
            if (!this._isActive) {
              return;
            }
            this._isActive = false;
            EventHandler__default.default.off(document, EVENT_KEY$1);
          }
          // Private
          _handleFocusin(event) {
            const {
              target
            } = event;
            const {
              trapElement
            } = this._config;
            if (target === document || target === trapElement || trapElement.contains(target)) {
              return;
            }
            const elements = SelectorEngine__default.default.focusableChildren(trapElement);
            if (elements.length === 0) {
              trapElement.focus();
            } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
              elements[elements.length - 1].focus();
            } else {
              elements[0].focus();
            }
          }
          _handleKeydown(event) {
            if (event.key !== TAB_KEY) {
              return;
            }
            this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
          }
          _getConfig(config) {
            config = {
              ...Default$1,
              ...typeof config === "object" ? config : {}
            };
            typeCheckConfig(NAME$1, config, DefaultType$1);
            return config;
          }
        }
        const enableDismissTrigger = (component, method = "hide") => {
          const clickEvent = `click.dismiss${component.EVENT_KEY}`;
          const name = component.NAME;
          EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
            if (["A", "AREA"].includes(this.tagName)) {
              event.preventDefault();
            }
            if (isDisabled(this)) {
              return;
            }
            const target = getElementFromSelector(this) || this.closest(`.${name}`);
            const instance = component.getOrCreateInstance(target);
            instance[method]();
          });
        };
        const NAME = "offcanvas";
        const DATA_KEY = "bs.offcanvas";
        const EVENT_KEY = `.${DATA_KEY}`;
        const DATA_API_KEY = ".data-api";
        const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
        const ESCAPE_KEY = "Escape";
        const Default = {
          backdrop: true,
          keyboard: true,
          scroll: false
        };
        const DefaultType = {
          backdrop: "boolean",
          keyboard: "boolean",
          scroll: "boolean"
        };
        const CLASS_NAME_SHOW = "show";
        const CLASS_NAME_BACKDROP = "offcanvas-backdrop";
        const OPEN_SELECTOR = ".offcanvas.show";
        const EVENT_SHOW = `show${EVENT_KEY}`;
        const EVENT_SHOWN = `shown${EVENT_KEY}`;
        const EVENT_HIDE = `hide${EVENT_KEY}`;
        const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
        const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
        const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
        const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
        class Offcanvas2 extends BaseComponent__default.default {
          constructor(element, config) {
            super(element);
            this._config = this._getConfig(config);
            this._isShown = false;
            this._backdrop = this._initializeBackDrop();
            this._focustrap = this._initializeFocusTrap();
            this._addEventListeners();
          }
          // Getters
          static get NAME() {
            return NAME;
          }
          static get Default() {
            return Default;
          }
          // Public
          toggle(relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
          }
          show(relatedTarget) {
            if (this._isShown) {
              return;
            }
            const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
              relatedTarget
            });
            if (showEvent.defaultPrevented) {
              return;
            }
            this._isShown = true;
            this._element.style.visibility = "visible";
            this._backdrop.show();
            if (!this._config.scroll) {
              new ScrollBarHelper().hide();
            }
            this._element.removeAttribute("aria-hidden");
            this._element.setAttribute("aria-modal", true);
            this._element.setAttribute("role", "dialog");
            this._element.classList.add(CLASS_NAME_SHOW);
            const completeCallBack = () => {
              if (!this._config.scroll) {
                this._focustrap.activate();
              }
              EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
                relatedTarget
              });
            };
            this._queueCallback(completeCallBack, this._element, true);
          }
          hide() {
            if (!this._isShown) {
              return;
            }
            const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
            if (hideEvent.defaultPrevented) {
              return;
            }
            this._focustrap.deactivate();
            this._element.blur();
            this._isShown = false;
            this._element.classList.remove(CLASS_NAME_SHOW);
            this._backdrop.hide();
            const completeCallback = () => {
              this._element.setAttribute("aria-hidden", true);
              this._element.removeAttribute("aria-modal");
              this._element.removeAttribute("role");
              this._element.style.visibility = "hidden";
              if (!this._config.scroll) {
                new ScrollBarHelper().reset();
              }
              EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
            };
            this._queueCallback(completeCallback, this._element, true);
          }
          dispose() {
            this._backdrop.dispose();
            this._focustrap.deactivate();
            super.dispose();
          }
          // Private
          _getConfig(config) {
            config = {
              ...Default,
              ...Manipulator__default.default.getDataAttributes(this._element),
              ...typeof config === "object" ? config : {}
            };
            typeCheckConfig(NAME, config, DefaultType);
            return config;
          }
          _initializeBackDrop() {
            return new Backdrop({
              className: CLASS_NAME_BACKDROP,
              isVisible: this._config.backdrop,
              isAnimated: true,
              rootElement: this._element.parentNode,
              clickCallback: () => this.hide()
            });
          }
          _initializeFocusTrap() {
            return new FocusTrap({
              trapElement: this._element
            });
          }
          _addEventListeners() {
            EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
              if (this._config.keyboard && event.key === ESCAPE_KEY) {
                this.hide();
              }
            });
          }
          // Static
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Offcanvas2.getOrCreateInstance(this, config);
              if (typeof config !== "string") {
                return;
              }
              if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config](this);
            });
          }
        }
        EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
          const target = getElementFromSelector(this);
          if (["A", "AREA"].includes(this.tagName)) {
            event.preventDefault();
          }
          if (isDisabled(this)) {
            return;
          }
          EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
            if (isVisible(this)) {
              this.focus();
            }
          });
          const allReadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
          if (allReadyOpen && allReadyOpen !== target) {
            Offcanvas2.getInstance(allReadyOpen).hide();
          }
          const data = Offcanvas2.getOrCreateInstance(target);
          data.toggle(this);
        });
        EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => SelectorEngine__default.default.find(OPEN_SELECTOR).forEach((el) => Offcanvas2.getOrCreateInstance(el).show()));
        enableDismissTrigger(Offcanvas2);
        defineJQueryPlugin(Offcanvas2);
        return Offcanvas2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/tooltip.js
  var require_tooltip = __commonJS({
    "node_modules/bootstrap/js/dist/tooltip.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_popper(), require_data(), require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["@popperjs/core", "./dom/data", "./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Tooltip = factory(global.Popper, global.Data, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
      })(exports, function(Popper, Data, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        function _interopNamespace(e) {
          if (e && e.__esModule)
            return e;
          const n = /* @__PURE__ */ Object.create(null);
          if (e) {
            for (const k in e) {
              if (k !== "default") {
                const d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                  enumerable: true,
                  get: () => e[k]
                });
              }
            }
          }
          n.default = e;
          return Object.freeze(n);
        }
        const Popper__namespace = /* @__PURE__ */ _interopNamespace(Popper);
        const Data__default = /* @__PURE__ */ _interopDefaultLegacy(Data);
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
        const Manipulator__default = /* @__PURE__ */ _interopDefaultLegacy(Manipulator);
        const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent);
        const MAX_UID = 1e6;
        const toType = (obj) => {
          if (obj === null || obj === void 0) {
            return `${obj}`;
          }
          return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        };
        const getUID = (prefix) => {
          do {
            prefix += Math.floor(Math.random() * MAX_UID);
          } while (document.getElementById(prefix));
          return prefix;
        };
        const isElement = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const getElement = (obj) => {
          if (isElement(obj)) {
            return obj.jquery ? obj[0] : obj;
          }
          if (typeof obj === "string" && obj.length > 0) {
            return document.querySelector(obj);
          }
          return null;
        };
        const typeCheckConfig = (componentName, config, configTypes) => {
          Object.keys(configTypes).forEach((property) => {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? "element" : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          });
        };
        const findShadowRoot = (element) => {
          if (!document.documentElement.attachShadow) {
            return null;
          }
          if (typeof element.getRootNode === "function") {
            const root = element.getRootNode();
            return root instanceof ShadowRoot ? root : null;
          }
          if (element instanceof ShadowRoot) {
            return element;
          }
          if (!element.parentNode) {
            return null;
          }
          return findShadowRoot(element.parentNode);
        };
        const noop = () => {
        };
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const isRTL = () => document.documentElement.dir === "rtl";
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const uriAttributes = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]);
        const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
        const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
        const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
        const allowedAttribute = (attribute, allowedAttributeList) => {
          const attributeName = attribute.nodeName.toLowerCase();
          if (allowedAttributeList.includes(attributeName)) {
            if (uriAttributes.has(attributeName)) {
              return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
            }
            return true;
          }
          const regExp = allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp);
          for (let i = 0, len = regExp.length; i < len; i++) {
            if (regExp[i].test(attributeName)) {
              return true;
            }
          }
          return false;
        };
        const DefaultAllowlist = {
          // Global attributes allowed on any supplied element below.
          "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
          a: ["target", "href", "title", "rel"],
          area: [],
          b: [],
          br: [],
          col: [],
          code: [],
          div: [],
          em: [],
          hr: [],
          h1: [],
          h2: [],
          h3: [],
          h4: [],
          h5: [],
          h6: [],
          i: [],
          img: ["src", "srcset", "alt", "title", "width", "height"],
          li: [],
          ol: [],
          p: [],
          pre: [],
          s: [],
          small: [],
          span: [],
          sub: [],
          sup: [],
          strong: [],
          u: [],
          ul: []
        };
        function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
          if (!unsafeHtml.length) {
            return unsafeHtml;
          }
          if (sanitizeFn && typeof sanitizeFn === "function") {
            return sanitizeFn(unsafeHtml);
          }
          const domParser = new window.DOMParser();
          const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
          const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
          for (let i = 0, len = elements.length; i < len; i++) {
            const element = elements[i];
            const elementName = element.nodeName.toLowerCase();
            if (!Object.keys(allowList).includes(elementName)) {
              element.remove();
              continue;
            }
            const attributeList = [].concat(...element.attributes);
            const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
            attributeList.forEach((attribute) => {
              if (!allowedAttribute(attribute, allowedAttributes)) {
                element.removeAttribute(attribute.nodeName);
              }
            });
          }
          return createdDocument.body.innerHTML;
        }
        const NAME = "tooltip";
        const DATA_KEY = "bs.tooltip";
        const EVENT_KEY = `.${DATA_KEY}`;
        const CLASS_PREFIX = "bs-tooltip";
        const DISALLOWED_ATTRIBUTES = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]);
        const DefaultType = {
          animation: "boolean",
          template: "string",
          title: "(string|element|function)",
          trigger: "string",
          delay: "(number|object)",
          html: "boolean",
          selector: "(string|boolean)",
          placement: "(string|function)",
          offset: "(array|string|function)",
          container: "(string|element|boolean)",
          fallbackPlacements: "array",
          boundary: "(string|element)",
          customClass: "(string|function)",
          sanitize: "boolean",
          sanitizeFn: "(null|function)",
          allowList: "object",
          popperConfig: "(null|object|function)"
        };
        const AttachmentMap = {
          AUTO: "auto",
          TOP: "top",
          RIGHT: isRTL() ? "left" : "right",
          BOTTOM: "bottom",
          LEFT: isRTL() ? "right" : "left"
        };
        const Default = {
          animation: true,
          template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
          trigger: "hover focus",
          title: "",
          delay: 0,
          html: false,
          selector: false,
          placement: "top",
          offset: [0, 0],
          container: false,
          fallbackPlacements: ["top", "right", "bottom", "left"],
          boundary: "clippingParents",
          customClass: "",
          sanitize: true,
          sanitizeFn: null,
          allowList: DefaultAllowlist,
          popperConfig: null
        };
        const Event2 = {
          HIDE: `hide${EVENT_KEY}`,
          HIDDEN: `hidden${EVENT_KEY}`,
          SHOW: `show${EVENT_KEY}`,
          SHOWN: `shown${EVENT_KEY}`,
          INSERTED: `inserted${EVENT_KEY}`,
          CLICK: `click${EVENT_KEY}`,
          FOCUSIN: `focusin${EVENT_KEY}`,
          FOCUSOUT: `focusout${EVENT_KEY}`,
          MOUSEENTER: `mouseenter${EVENT_KEY}`,
          MOUSELEAVE: `mouseleave${EVENT_KEY}`
        };
        const CLASS_NAME_FADE = "fade";
        const CLASS_NAME_MODAL = "modal";
        const CLASS_NAME_SHOW = "show";
        const HOVER_STATE_SHOW = "show";
        const HOVER_STATE_OUT = "out";
        const SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
        const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
        const EVENT_MODAL_HIDE = "hide.bs.modal";
        const TRIGGER_HOVER = "hover";
        const TRIGGER_FOCUS = "focus";
        const TRIGGER_CLICK = "click";
        const TRIGGER_MANUAL = "manual";
        class Tooltip2 extends BaseComponent__default.default {
          constructor(element, config) {
            if (typeof Popper__namespace === "undefined") {
              throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            }
            super(element);
            this._isEnabled = true;
            this._timeout = 0;
            this._hoverState = "";
            this._activeTrigger = {};
            this._popper = null;
            this._config = this._getConfig(config);
            this.tip = null;
            this._setListeners();
          }
          // Getters
          static get Default() {
            return Default;
          }
          static get NAME() {
            return NAME;
          }
          static get Event() {
            return Event2;
          }
          static get DefaultType() {
            return DefaultType;
          }
          // Public
          enable() {
            this._isEnabled = true;
          }
          disable() {
            this._isEnabled = false;
          }
          toggleEnabled() {
            this._isEnabled = !this._isEnabled;
          }
          toggle(event) {
            if (!this._isEnabled) {
              return;
            }
            if (event) {
              const context = this._initializeOnDelegatedTarget(event);
              context._activeTrigger.click = !context._activeTrigger.click;
              if (context._isWithActiveTrigger()) {
                context._enter(null, context);
              } else {
                context._leave(null, context);
              }
            } else {
              if (this.getTipElement().classList.contains(CLASS_NAME_SHOW)) {
                this._leave(null, this);
                return;
              }
              this._enter(null, this);
            }
          }
          dispose() {
            clearTimeout(this._timeout);
            EventHandler__default.default.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
            if (this.tip) {
              this.tip.remove();
            }
            this._disposePopper();
            super.dispose();
          }
          show() {
            if (this._element.style.display === "none") {
              throw new Error("Please use show on visible elements");
            }
            if (!(this.isWithContent() && this._isEnabled)) {
              return;
            }
            const showEvent = EventHandler__default.default.trigger(this._element, this.constructor.Event.SHOW);
            const shadowRoot = findShadowRoot(this._element);
            const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);
            if (showEvent.defaultPrevented || !isInTheDom) {
              return;
            }
            if (this.constructor.NAME === "tooltip" && this.tip && this.getTitle() !== this.tip.querySelector(SELECTOR_TOOLTIP_INNER).innerHTML) {
              this._disposePopper();
              this.tip.remove();
              this.tip = null;
            }
            const tip = this.getTipElement();
            const tipId = getUID(this.constructor.NAME);
            tip.setAttribute("id", tipId);
            this._element.setAttribute("aria-describedby", tipId);
            if (this._config.animation) {
              tip.classList.add(CLASS_NAME_FADE);
            }
            const placement = typeof this._config.placement === "function" ? this._config.placement.call(this, tip, this._element) : this._config.placement;
            const attachment = this._getAttachment(placement);
            this._addAttachmentClass(attachment);
            const {
              container
            } = this._config;
            Data__default.default.set(tip, this.constructor.DATA_KEY, this);
            if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
              container.append(tip);
              EventHandler__default.default.trigger(this._element, this.constructor.Event.INSERTED);
            }
            if (this._popper) {
              this._popper.update();
            } else {
              this._popper = Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
            }
            tip.classList.add(CLASS_NAME_SHOW);
            const customClass = this._resolvePossibleFunction(this._config.customClass);
            if (customClass) {
              tip.classList.add(...customClass.split(" "));
            }
            if ("ontouchstart" in document.documentElement) {
              [].concat(...document.body.children).forEach((element) => {
                EventHandler__default.default.on(element, "mouseover", noop);
              });
            }
            const complete = () => {
              const prevHoverState = this._hoverState;
              this._hoverState = null;
              EventHandler__default.default.trigger(this._element, this.constructor.Event.SHOWN);
              if (prevHoverState === HOVER_STATE_OUT) {
                this._leave(null, this);
              }
            };
            const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE);
            this._queueCallback(complete, this.tip, isAnimated);
          }
          hide() {
            if (!this._popper) {
              return;
            }
            const tip = this.getTipElement();
            const complete = () => {
              if (this._isWithActiveTrigger()) {
                return;
              }
              if (this._hoverState !== HOVER_STATE_SHOW) {
                tip.remove();
              }
              this._cleanTipClass();
              this._element.removeAttribute("aria-describedby");
              EventHandler__default.default.trigger(this._element, this.constructor.Event.HIDDEN);
              this._disposePopper();
            };
            const hideEvent = EventHandler__default.default.trigger(this._element, this.constructor.Event.HIDE);
            if (hideEvent.defaultPrevented) {
              return;
            }
            tip.classList.remove(CLASS_NAME_SHOW);
            if ("ontouchstart" in document.documentElement) {
              [].concat(...document.body.children).forEach((element) => EventHandler__default.default.off(element, "mouseover", noop));
            }
            this._activeTrigger[TRIGGER_CLICK] = false;
            this._activeTrigger[TRIGGER_FOCUS] = false;
            this._activeTrigger[TRIGGER_HOVER] = false;
            const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE);
            this._queueCallback(complete, this.tip, isAnimated);
            this._hoverState = "";
          }
          update() {
            if (this._popper !== null) {
              this._popper.update();
            }
          }
          // Protected
          isWithContent() {
            return Boolean(this.getTitle());
          }
          getTipElement() {
            if (this.tip) {
              return this.tip;
            }
            const element = document.createElement("div");
            element.innerHTML = this._config.template;
            const tip = element.children[0];
            this.setContent(tip);
            tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW);
            this.tip = tip;
            return this.tip;
          }
          setContent(tip) {
            this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
          }
          _sanitizeAndSetContent(template, content, selector) {
            const templateElement = SelectorEngine__default.default.findOne(selector, template);
            if (!content && templateElement) {
              templateElement.remove();
              return;
            }
            this.setElementContent(templateElement, content);
          }
          setElementContent(element, content) {
            if (element === null) {
              return;
            }
            if (isElement(content)) {
              content = getElement(content);
              if (this._config.html) {
                if (content.parentNode !== element) {
                  element.innerHTML = "";
                  element.append(content);
                }
              } else {
                element.textContent = content.textContent;
              }
              return;
            }
            if (this._config.html) {
              if (this._config.sanitize) {
                content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
              }
              element.innerHTML = content;
            } else {
              element.textContent = content;
            }
          }
          getTitle() {
            const title = this._element.getAttribute("data-bs-original-title") || this._config.title;
            return this._resolvePossibleFunction(title);
          }
          updateAttachment(attachment) {
            if (attachment === "right") {
              return "end";
            }
            if (attachment === "left") {
              return "start";
            }
            return attachment;
          }
          // Private
          _initializeOnDelegatedTarget(event, context) {
            return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
          }
          _getOffset() {
            const {
              offset
            } = this._config;
            if (typeof offset === "string") {
              return offset.split(",").map((val) => Number.parseInt(val, 10));
            }
            if (typeof offset === "function") {
              return (popperData) => offset(popperData, this._element);
            }
            return offset;
          }
          _resolvePossibleFunction(content) {
            return typeof content === "function" ? content.call(this._element) : content;
          }
          _getPopperConfig(attachment) {
            const defaultBsPopperConfig = {
              placement: attachment,
              modifiers: [{
                name: "flip",
                options: {
                  fallbackPlacements: this._config.fallbackPlacements
                }
              }, {
                name: "offset",
                options: {
                  offset: this._getOffset()
                }
              }, {
                name: "preventOverflow",
                options: {
                  boundary: this._config.boundary
                }
              }, {
                name: "arrow",
                options: {
                  element: `.${this.constructor.NAME}-arrow`
                }
              }, {
                name: "onChange",
                enabled: true,
                phase: "afterWrite",
                fn: (data) => this._handlePopperPlacementChange(data)
              }],
              onFirstUpdate: (data) => {
                if (data.options.placement !== data.placement) {
                  this._handlePopperPlacementChange(data);
                }
              }
            };
            return {
              ...defaultBsPopperConfig,
              ...typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig
            };
          }
          _addAttachmentClass(attachment) {
            this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
          }
          _getAttachment(placement) {
            return AttachmentMap[placement.toUpperCase()];
          }
          _setListeners() {
            const triggers = this._config.trigger.split(" ");
            triggers.forEach((trigger) => {
              if (trigger === "click") {
                EventHandler__default.default.on(this._element, this.constructor.Event.CLICK, this._config.selector, (event) => this.toggle(event));
              } else if (trigger !== TRIGGER_MANUAL) {
                const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
                const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
                EventHandler__default.default.on(this._element, eventIn, this._config.selector, (event) => this._enter(event));
                EventHandler__default.default.on(this._element, eventOut, this._config.selector, (event) => this._leave(event));
              }
            });
            this._hideModalHandler = () => {
              if (this._element) {
                this.hide();
              }
            };
            EventHandler__default.default.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
            if (this._config.selector) {
              this._config = {
                ...this._config,
                trigger: "manual",
                selector: ""
              };
            } else {
              this._fixTitle();
            }
          }
          _fixTitle() {
            const title = this._element.getAttribute("title");
            const originalTitleType = typeof this._element.getAttribute("data-bs-original-title");
            if (title || originalTitleType !== "string") {
              this._element.setAttribute("data-bs-original-title", title || "");
              if (title && !this._element.getAttribute("aria-label") && !this._element.textContent) {
                this._element.setAttribute("aria-label", title);
              }
              this._element.setAttribute("title", "");
            }
          }
          _enter(event, context) {
            context = this._initializeOnDelegatedTarget(event, context);
            if (event) {
              context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
            }
            if (context.getTipElement().classList.contains(CLASS_NAME_SHOW) || context._hoverState === HOVER_STATE_SHOW) {
              context._hoverState = HOVER_STATE_SHOW;
              return;
            }
            clearTimeout(context._timeout);
            context._hoverState = HOVER_STATE_SHOW;
            if (!context._config.delay || !context._config.delay.show) {
              context.show();
              return;
            }
            context._timeout = setTimeout(() => {
              if (context._hoverState === HOVER_STATE_SHOW) {
                context.show();
              }
            }, context._config.delay.show);
          }
          _leave(event, context) {
            context = this._initializeOnDelegatedTarget(event, context);
            if (event) {
              context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
            }
            if (context._isWithActiveTrigger()) {
              return;
            }
            clearTimeout(context._timeout);
            context._hoverState = HOVER_STATE_OUT;
            if (!context._config.delay || !context._config.delay.hide) {
              context.hide();
              return;
            }
            context._timeout = setTimeout(() => {
              if (context._hoverState === HOVER_STATE_OUT) {
                context.hide();
              }
            }, context._config.delay.hide);
          }
          _isWithActiveTrigger() {
            for (const trigger in this._activeTrigger) {
              if (this._activeTrigger[trigger]) {
                return true;
              }
            }
            return false;
          }
          _getConfig(config) {
            const dataAttributes = Manipulator__default.default.getDataAttributes(this._element);
            Object.keys(dataAttributes).forEach((dataAttr) => {
              if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
                delete dataAttributes[dataAttr];
              }
            });
            config = {
              ...this.constructor.Default,
              ...dataAttributes,
              ...typeof config === "object" && config ? config : {}
            };
            config.container = config.container === false ? document.body : getElement(config.container);
            if (typeof config.delay === "number") {
              config.delay = {
                show: config.delay,
                hide: config.delay
              };
            }
            if (typeof config.title === "number") {
              config.title = config.title.toString();
            }
            if (typeof config.content === "number") {
              config.content = config.content.toString();
            }
            typeCheckConfig(NAME, config, this.constructor.DefaultType);
            if (config.sanitize) {
              config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
            }
            return config;
          }
          _getDelegateConfig() {
            const config = {};
            for (const key in this._config) {
              if (this.constructor.Default[key] !== this._config[key]) {
                config[key] = this._config[key];
              }
            }
            return config;
          }
          _cleanTipClass() {
            const tip = this.getTipElement();
            const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, "g");
            const tabClass = tip.getAttribute("class").match(basicClassPrefixRegex);
            if (tabClass !== null && tabClass.length > 0) {
              tabClass.map((token) => token.trim()).forEach((tClass) => tip.classList.remove(tClass));
            }
          }
          _getBasicClassPrefix() {
            return CLASS_PREFIX;
          }
          _handlePopperPlacementChange(popperData) {
            const {
              state
            } = popperData;
            if (!state) {
              return;
            }
            this.tip = state.elements.popper;
            this._cleanTipClass();
            this._addAttachmentClass(this._getAttachment(state.placement));
          }
          _disposePopper() {
            if (this._popper) {
              this._popper.destroy();
              this._popper = null;
            }
          }
          // Static
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Tooltip2.getOrCreateInstance(this, config);
              if (typeof config === "string") {
                if (typeof data[config] === "undefined") {
                  throw new TypeError(`No method named "${config}"`);
                }
                data[config]();
              }
            });
          }
        }
        defineJQueryPlugin(Tooltip2);
        return Tooltip2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/popover.js
  var require_popover = __commonJS({
    "node_modules/bootstrap/js/dist/popover.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_tooltip()) : typeof define === "function" && define.amd ? define(["./tooltip"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Popover = factory(global.Tooltip));
      })(exports, function(Tooltip2) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const Tooltip__default = /* @__PURE__ */ _interopDefaultLegacy(Tooltip2);
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const NAME = "popover";
        const DATA_KEY = "bs.popover";
        const EVENT_KEY = `.${DATA_KEY}`;
        const CLASS_PREFIX = "bs-popover";
        const Default = {
          ...Tooltip__default.default.Default,
          placement: "right",
          offset: [0, 8],
          trigger: "click",
          content: "",
          template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        };
        const DefaultType = {
          ...Tooltip__default.default.DefaultType,
          content: "(string|element|function)"
        };
        const Event2 = {
          HIDE: `hide${EVENT_KEY}`,
          HIDDEN: `hidden${EVENT_KEY}`,
          SHOW: `show${EVENT_KEY}`,
          SHOWN: `shown${EVENT_KEY}`,
          INSERTED: `inserted${EVENT_KEY}`,
          CLICK: `click${EVENT_KEY}`,
          FOCUSIN: `focusin${EVENT_KEY}`,
          FOCUSOUT: `focusout${EVENT_KEY}`,
          MOUSEENTER: `mouseenter${EVENT_KEY}`,
          MOUSELEAVE: `mouseleave${EVENT_KEY}`
        };
        const SELECTOR_TITLE = ".popover-header";
        const SELECTOR_CONTENT = ".popover-body";
        class Popover2 extends Tooltip__default.default {
          // Getters
          static get Default() {
            return Default;
          }
          static get NAME() {
            return NAME;
          }
          static get Event() {
            return Event2;
          }
          static get DefaultType() {
            return DefaultType;
          }
          // Overrides
          isWithContent() {
            return this.getTitle() || this._getContent();
          }
          setContent(tip) {
            this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);
            this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
          }
          // Private
          _getContent() {
            return this._resolvePossibleFunction(this._config.content);
          }
          _getBasicClassPrefix() {
            return CLASS_PREFIX;
          }
          // Static
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Popover2.getOrCreateInstance(this, config);
              if (typeof config === "string") {
                if (typeof data[config] === "undefined") {
                  throw new TypeError(`No method named "${config}"`);
                }
                data[config]();
              }
            });
          }
        }
        defineJQueryPlugin(Popover2);
        return Popover2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/scrollspy.js
  var require_scrollspy = __commonJS({
    "node_modules/bootstrap/js/dist/scrollspy.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.ScrollSpy = factory(global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
      })(exports, function(EventHandler, Manipulator, SelectorEngine, BaseComponent) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
        const Manipulator__default = /* @__PURE__ */ _interopDefaultLegacy(Manipulator);
        const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent);
        const toType = (obj) => {
          if (obj === null || obj === void 0) {
            return `${obj}`;
          }
          return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        };
        const getSelector = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttr = element.getAttribute("href");
            if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
              return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
              hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
          }
          return selector;
        };
        const getSelectorFromElement = (element) => {
          const selector = getSelector(element);
          if (selector) {
            return document.querySelector(selector) ? selector : null;
          }
          return null;
        };
        const isElement = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const getElement = (obj) => {
          if (isElement(obj)) {
            return obj.jquery ? obj[0] : obj;
          }
          if (typeof obj === "string" && obj.length > 0) {
            return document.querySelector(obj);
          }
          return null;
        };
        const typeCheckConfig = (componentName, config, configTypes) => {
          Object.keys(configTypes).forEach((property) => {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? "element" : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          });
        };
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const NAME = "scrollspy";
        const DATA_KEY = "bs.scrollspy";
        const EVENT_KEY = `.${DATA_KEY}`;
        const DATA_API_KEY = ".data-api";
        const Default = {
          offset: 10,
          method: "auto",
          target: ""
        };
        const DefaultType = {
          offset: "number",
          method: "string",
          target: "(string|element)"
        };
        const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
        const EVENT_SCROLL = `scroll${EVENT_KEY}`;
        const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
        const CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
        const CLASS_NAME_ACTIVE = "active";
        const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
        const SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
        const SELECTOR_NAV_LINKS = ".nav-link";
        const SELECTOR_NAV_ITEMS = ".nav-item";
        const SELECTOR_LIST_ITEMS = ".list-group-item";
        const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}, .${CLASS_NAME_DROPDOWN_ITEM}`;
        const SELECTOR_DROPDOWN = ".dropdown";
        const SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
        const METHOD_OFFSET = "offset";
        const METHOD_POSITION = "position";
        class ScrollSpy2 extends BaseComponent__default.default {
          constructor(element, config) {
            super(element);
            this._scrollElement = this._element.tagName === "BODY" ? window : this._element;
            this._config = this._getConfig(config);
            this._offsets = [];
            this._targets = [];
            this._activeTarget = null;
            this._scrollHeight = 0;
            EventHandler__default.default.on(this._scrollElement, EVENT_SCROLL, () => this._process());
            this.refresh();
            this._process();
          }
          // Getters
          static get Default() {
            return Default;
          }
          static get NAME() {
            return NAME;
          }
          // Public
          refresh() {
            const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
            const offsetMethod = this._config.method === "auto" ? autoMethod : this._config.method;
            const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
            this._offsets = [];
            this._targets = [];
            this._scrollHeight = this._getScrollHeight();
            const targets = SelectorEngine__default.default.find(SELECTOR_LINK_ITEMS, this._config.target);
            targets.map((element) => {
              const targetSelector = getSelectorFromElement(element);
              const target = targetSelector ? SelectorEngine__default.default.findOne(targetSelector) : null;
              if (target) {
                const targetBCR = target.getBoundingClientRect();
                if (targetBCR.width || targetBCR.height) {
                  return [Manipulator__default.default[offsetMethod](target).top + offsetBase, targetSelector];
                }
              }
              return null;
            }).filter((item) => item).sort((a, b) => a[0] - b[0]).forEach((item) => {
              this._offsets.push(item[0]);
              this._targets.push(item[1]);
            });
          }
          dispose() {
            EventHandler__default.default.off(this._scrollElement, EVENT_KEY);
            super.dispose();
          }
          // Private
          _getConfig(config) {
            config = {
              ...Default,
              ...Manipulator__default.default.getDataAttributes(this._element),
              ...typeof config === "object" && config ? config : {}
            };
            config.target = getElement(config.target) || document.documentElement;
            typeCheckConfig(NAME, config, DefaultType);
            return config;
          }
          _getScrollTop() {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
          }
          _getScrollHeight() {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          }
          _getOffsetHeight() {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
          }
          _process() {
            const scrollTop = this._getScrollTop() + this._config.offset;
            const scrollHeight = this._getScrollHeight();
            const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
            if (this._scrollHeight !== scrollHeight) {
              this.refresh();
            }
            if (scrollTop >= maxScroll) {
              const target = this._targets[this._targets.length - 1];
              if (this._activeTarget !== target) {
                this._activate(target);
              }
              return;
            }
            if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
              this._activeTarget = null;
              this._clear();
              return;
            }
            for (let i = this._offsets.length; i--; ) {
              const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === "undefined" || scrollTop < this._offsets[i + 1]);
              if (isActiveTarget) {
                this._activate(this._targets[i]);
              }
            }
          }
          _activate(target) {
            this._activeTarget = target;
            this._clear();
            const queries = SELECTOR_LINK_ITEMS.split(",").map((selector) => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
            const link = SelectorEngine__default.default.findOne(queries.join(","), this._config.target);
            link.classList.add(CLASS_NAME_ACTIVE);
            if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
              SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_TOGGLE, link.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE);
            } else {
              SelectorEngine__default.default.parents(link, SELECTOR_NAV_LIST_GROUP).forEach((listGroup) => {
                SelectorEngine__default.default.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach((item) => item.classList.add(CLASS_NAME_ACTIVE));
                SelectorEngine__default.default.prev(listGroup, SELECTOR_NAV_ITEMS).forEach((navItem) => {
                  SelectorEngine__default.default.children(navItem, SELECTOR_NAV_LINKS).forEach((item) => item.classList.add(CLASS_NAME_ACTIVE));
                });
              });
            }
            EventHandler__default.default.trigger(this._scrollElement, EVENT_ACTIVATE, {
              relatedTarget: target
            });
          }
          _clear() {
            SelectorEngine__default.default.find(SELECTOR_LINK_ITEMS, this._config.target).filter((node) => node.classList.contains(CLASS_NAME_ACTIVE)).forEach((node) => node.classList.remove(CLASS_NAME_ACTIVE));
          }
          // Static
          static jQueryInterface(config) {
            return this.each(function() {
              const data = ScrollSpy2.getOrCreateInstance(this, config);
              if (typeof config !== "string") {
                return;
              }
              if (typeof data[config] === "undefined") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config]();
            });
          }
        }
        EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
          SelectorEngine__default.default.find(SELECTOR_DATA_SPY).forEach((spy) => new ScrollSpy2(spy));
        });
        defineJQueryPlugin(ScrollSpy2);
        return ScrollSpy2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/tab.js
  var require_tab = __commonJS({
    "node_modules/bootstrap/js/dist/tab.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/event-handler", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Tab = factory(global.EventHandler, global.SelectorEngine, global.Base));
      })(exports, function(EventHandler, SelectorEngine, BaseComponent) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
        const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent);
        const getSelector = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttr = element.getAttribute("href");
            if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
              return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
              hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
          }
          return selector;
        };
        const getElementFromSelector = (element) => {
          const selector = getSelector(element);
          return selector ? document.querySelector(selector) : null;
        };
        const isDisabled = (element) => {
          if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
          }
          if (element.classList.contains("disabled")) {
            return true;
          }
          if (typeof element.disabled !== "undefined") {
            return element.disabled;
          }
          return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
        };
        const reflow = (element) => {
          element.offsetHeight;
        };
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const NAME = "tab";
        const DATA_KEY = "bs.tab";
        const EVENT_KEY = `.${DATA_KEY}`;
        const DATA_API_KEY = ".data-api";
        const EVENT_HIDE = `hide${EVENT_KEY}`;
        const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
        const EVENT_SHOW = `show${EVENT_KEY}`;
        const EVENT_SHOWN = `shown${EVENT_KEY}`;
        const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
        const CLASS_NAME_DROPDOWN_MENU = "dropdown-menu";
        const CLASS_NAME_ACTIVE = "active";
        const CLASS_NAME_FADE = "fade";
        const CLASS_NAME_SHOW = "show";
        const SELECTOR_DROPDOWN = ".dropdown";
        const SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
        const SELECTOR_ACTIVE = ".active";
        const SELECTOR_ACTIVE_UL = ":scope > li > .active";
        const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
        const SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
        const SELECTOR_DROPDOWN_ACTIVE_CHILD = ":scope > .dropdown-menu .active";
        class Tab2 extends BaseComponent__default.default {
          // Getters
          static get NAME() {
            return NAME;
          }
          // Public
          show() {
            if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
              return;
            }
            let previous;
            const target = getElementFromSelector(this._element);
            const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);
            if (listElement) {
              const itemSelector = listElement.nodeName === "UL" || listElement.nodeName === "OL" ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
              previous = SelectorEngine__default.default.find(itemSelector, listElement);
              previous = previous[previous.length - 1];
            }
            const hideEvent = previous ? EventHandler__default.default.trigger(previous, EVENT_HIDE, {
              relatedTarget: this._element
            }) : null;
            const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
              relatedTarget: previous
            });
            if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
              return;
            }
            this._activate(this._element, listElement);
            const complete = () => {
              EventHandler__default.default.trigger(previous, EVENT_HIDDEN, {
                relatedTarget: this._element
              });
              EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
                relatedTarget: previous
              });
            };
            if (target) {
              this._activate(target, target.parentNode, complete);
            } else {
              complete();
            }
          }
          // Private
          _activate(element, container, callback) {
            const activeElements = container && (container.nodeName === "UL" || container.nodeName === "OL") ? SelectorEngine__default.default.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine__default.default.children(container, SELECTOR_ACTIVE);
            const active = activeElements[0];
            const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE);
            const complete = () => this._transitionComplete(element, active, callback);
            if (active && isTransitioning) {
              active.classList.remove(CLASS_NAME_SHOW);
              this._queueCallback(complete, element, true);
            } else {
              complete();
            }
          }
          _transitionComplete(element, active, callback) {
            if (active) {
              active.classList.remove(CLASS_NAME_ACTIVE);
              const dropdownChild = SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);
              if (dropdownChild) {
                dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
              }
              if (active.getAttribute("role") === "tab") {
                active.setAttribute("aria-selected", false);
              }
            }
            element.classList.add(CLASS_NAME_ACTIVE);
            if (element.getAttribute("role") === "tab") {
              element.setAttribute("aria-selected", true);
            }
            reflow(element);
            if (element.classList.contains(CLASS_NAME_FADE)) {
              element.classList.add(CLASS_NAME_SHOW);
            }
            let parent = element.parentNode;
            if (parent && parent.nodeName === "LI") {
              parent = parent.parentNode;
            }
            if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
              const dropdownElement = element.closest(SELECTOR_DROPDOWN);
              if (dropdownElement) {
                SelectorEngine__default.default.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach((dropdown) => dropdown.classList.add(CLASS_NAME_ACTIVE));
              }
              element.setAttribute("aria-expanded", true);
            }
            if (callback) {
              callback();
            }
          }
          // Static
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Tab2.getOrCreateInstance(this);
              if (typeof config === "string") {
                if (typeof data[config] === "undefined") {
                  throw new TypeError(`No method named "${config}"`);
                }
                data[config]();
              }
            });
          }
        }
        EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
          if (["A", "AREA"].includes(this.tagName)) {
            event.preventDefault();
          }
          if (isDisabled(this)) {
            return;
          }
          const data = Tab2.getOrCreateInstance(this);
          data.show();
        });
        defineJQueryPlugin(Tab2);
        return Tab2;
      });
    }
  });

  // node_modules/bootstrap/js/dist/toast.js
  var require_toast = __commonJS({
    "node_modules/bootstrap/js/dist/toast.js"(exports, module) {
      init_global();
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_manipulator(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/event-handler", "./dom/manipulator", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Toast = factory(global.EventHandler, global.Manipulator, global.Base));
      })(exports, function(EventHandler, Manipulator, BaseComponent) {
        "use strict";
        const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
        const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
        const Manipulator__default = /* @__PURE__ */ _interopDefaultLegacy(Manipulator);
        const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent);
        const toType = (obj) => {
          if (obj === null || obj === void 0) {
            return `${obj}`;
          }
          return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        };
        const getSelector = (element) => {
          let selector = element.getAttribute("data-bs-target");
          if (!selector || selector === "#") {
            let hrefAttr = element.getAttribute("href");
            if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
              return null;
            }
            if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
              hrefAttr = `#${hrefAttr.split("#")[1]}`;
            }
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
          }
          return selector;
        };
        const getElementFromSelector = (element) => {
          const selector = getSelector(element);
          return selector ? document.querySelector(selector) : null;
        };
        const isElement = (obj) => {
          if (!obj || typeof obj !== "object") {
            return false;
          }
          if (typeof obj.jquery !== "undefined") {
            obj = obj[0];
          }
          return typeof obj.nodeType !== "undefined";
        };
        const typeCheckConfig = (componentName, config, configTypes) => {
          Object.keys(configTypes).forEach((property) => {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = value && isElement(value) ? "element" : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          });
        };
        const isDisabled = (element) => {
          if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
          }
          if (element.classList.contains("disabled")) {
            return true;
          }
          if (typeof element.disabled !== "undefined") {
            return element.disabled;
          }
          return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
        };
        const reflow = (element) => {
          element.offsetHeight;
        };
        const getjQuery = () => {
          const {
            jQuery
          } = window;
          if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
            return jQuery;
          }
          return null;
        };
        const DOMContentLoadedCallbacks = [];
        const onDOMContentLoaded = (callback) => {
          if (document.readyState === "loading") {
            if (!DOMContentLoadedCallbacks.length) {
              document.addEventListener("DOMContentLoaded", () => {
                DOMContentLoadedCallbacks.forEach((callback2) => callback2());
              });
            }
            DOMContentLoadedCallbacks.push(callback);
          } else {
            callback();
          }
        };
        const defineJQueryPlugin = (plugin) => {
          onDOMContentLoaded(() => {
            const $ = getjQuery();
            if ($) {
              const name = plugin.NAME;
              const JQUERY_NO_CONFLICT = $.fn[name];
              $.fn[name] = plugin.jQueryInterface;
              $.fn[name].Constructor = plugin;
              $.fn[name].noConflict = () => {
                $.fn[name] = JQUERY_NO_CONFLICT;
                return plugin.jQueryInterface;
              };
            }
          });
        };
        const enableDismissTrigger = (component, method = "hide") => {
          const clickEvent = `click.dismiss${component.EVENT_KEY}`;
          const name = component.NAME;
          EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
            if (["A", "AREA"].includes(this.tagName)) {
              event.preventDefault();
            }
            if (isDisabled(this)) {
              return;
            }
            const target = getElementFromSelector(this) || this.closest(`.${name}`);
            const instance = component.getOrCreateInstance(target);
            instance[method]();
          });
        };
        const NAME = "toast";
        const DATA_KEY = "bs.toast";
        const EVENT_KEY = `.${DATA_KEY}`;
        const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
        const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
        const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
        const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
        const EVENT_HIDE = `hide${EVENT_KEY}`;
        const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
        const EVENT_SHOW = `show${EVENT_KEY}`;
        const EVENT_SHOWN = `shown${EVENT_KEY}`;
        const CLASS_NAME_FADE = "fade";
        const CLASS_NAME_HIDE = "hide";
        const CLASS_NAME_SHOW = "show";
        const CLASS_NAME_SHOWING = "showing";
        const DefaultType = {
          animation: "boolean",
          autohide: "boolean",
          delay: "number"
        };
        const Default = {
          animation: true,
          autohide: true,
          delay: 5e3
        };
        class Toast2 extends BaseComponent__default.default {
          constructor(element, config) {
            super(element);
            this._config = this._getConfig(config);
            this._timeout = null;
            this._hasMouseInteraction = false;
            this._hasKeyboardInteraction = false;
            this._setListeners();
          }
          // Getters
          static get DefaultType() {
            return DefaultType;
          }
          static get Default() {
            return Default;
          }
          static get NAME() {
            return NAME;
          }
          // Public
          show() {
            const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);
            if (showEvent.defaultPrevented) {
              return;
            }
            this._clearTimeout();
            if (this._config.animation) {
              this._element.classList.add(CLASS_NAME_FADE);
            }
            const complete = () => {
              this._element.classList.remove(CLASS_NAME_SHOWING);
              EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
              this._maybeScheduleHide();
            };
            this._element.classList.remove(CLASS_NAME_HIDE);
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_SHOW);
            this._element.classList.add(CLASS_NAME_SHOWING);
            this._queueCallback(complete, this._element, this._config.animation);
          }
          hide() {
            if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
              return;
            }
            const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
            if (hideEvent.defaultPrevented) {
              return;
            }
            const complete = () => {
              this._element.classList.add(CLASS_NAME_HIDE);
              this._element.classList.remove(CLASS_NAME_SHOWING);
              this._element.classList.remove(CLASS_NAME_SHOW);
              EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
            };
            this._element.classList.add(CLASS_NAME_SHOWING);
            this._queueCallback(complete, this._element, this._config.animation);
          }
          dispose() {
            this._clearTimeout();
            if (this._element.classList.contains(CLASS_NAME_SHOW)) {
              this._element.classList.remove(CLASS_NAME_SHOW);
            }
            super.dispose();
          }
          // Private
          _getConfig(config) {
            config = {
              ...Default,
              ...Manipulator__default.default.getDataAttributes(this._element),
              ...typeof config === "object" && config ? config : {}
            };
            typeCheckConfig(NAME, config, this.constructor.DefaultType);
            return config;
          }
          _maybeScheduleHide() {
            if (!this._config.autohide) {
              return;
            }
            if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
              return;
            }
            this._timeout = setTimeout(() => {
              this.hide();
            }, this._config.delay);
          }
          _onInteraction(event, isInteracting) {
            switch (event.type) {
              case "mouseover":
              case "mouseout":
                this._hasMouseInteraction = isInteracting;
                break;
              case "focusin":
              case "focusout":
                this._hasKeyboardInteraction = isInteracting;
                break;
            }
            if (isInteracting) {
              this._clearTimeout();
              return;
            }
            const nextElement = event.relatedTarget;
            if (this._element === nextElement || this._element.contains(nextElement)) {
              return;
            }
            this._maybeScheduleHide();
          }
          _setListeners() {
            EventHandler__default.default.on(this._element, EVENT_MOUSEOVER, (event) => this._onInteraction(event, true));
            EventHandler__default.default.on(this._element, EVENT_MOUSEOUT, (event) => this._onInteraction(event, false));
            EventHandler__default.default.on(this._element, EVENT_FOCUSIN, (event) => this._onInteraction(event, true));
            EventHandler__default.default.on(this._element, EVENT_FOCUSOUT, (event) => this._onInteraction(event, false));
          }
          _clearTimeout() {
            clearTimeout(this._timeout);
            this._timeout = null;
          }
          // Static
          static jQueryInterface(config) {
            return this.each(function() {
              const data = Toast2.getOrCreateInstance(this, config);
              if (typeof config === "string") {
                if (typeof data[config] === "undefined") {
                  throw new TypeError(`No method named "${config}"`);
                }
                data[config](this);
              }
            });
          }
        }
        enableDismissTrigger(Toast2);
        defineJQueryPlugin(Toast2);
        return Toast2;
      });
    }
  });

  // app/javascript/application.js
  init_global();

  // app/javascript/vendor/index.js
  init_global();

  // app/javascript/vendor/bootstrap/index.js
  init_global();
  var import_alert = __toESM(require_alert());
  var import_button = __toESM(require_button());
  var import_carousel = __toESM(require_carousel());
  var import_collapse = __toESM(require_collapse());
  var import_dropdown = __toESM(require_dropdown());
  var import_modal = __toESM(require_modal());
  var import_offcanvas = __toESM(require_offcanvas());
  var import_popover = __toESM(require_popover());
  var import_scrollspy = __toESM(require_scrollspy());
  var import_tab = __toESM(require_tab());
  var import_toast = __toESM(require_toast());
  var import_tooltip = __toESM(require_tooltip());

  // app/javascript/translations/translations.js
  init_global();
  import_i18n_js.default.translations || (import_i18n_js.default.translations = {});
  import_i18n_js.default.translations["en"] = import_i18n_js.default.extend(import_i18n_js.default.translations["en"] || {}, JSON.parse(`{"activerecord":{"errors":{"messages":{"record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"has_many":"Cannot delete record because dependent %{record} exist","has_one":"Cannot delete record because a dependent %{record} exists"}}}},"date":{"abbr_day_names":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"abbr_month_names":[null,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"day_names":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"formats":{"default":"%Y-%m-%d","long":"%B %d, %Y","short":"%b %d"},"month_names":[null,"January","February","March","April","May","June","July","August","September","October","November","December"],"order":["year","month","day"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"about 1 hour","other":"about %{count} hours"},"about_x_months":{"one":"about 1 month","other":"about %{count} months"},"about_x_years":{"one":"about 1 year","other":"about %{count} years"},"almost_x_years":{"one":"almost 1 year","other":"almost %{count} years"},"half_a_minute":"half a minute","less_than_x_minutes":{"one":"less than a minute","other":"less than %{count} minutes"},"less_than_x_seconds":{"one":"less than 1 second","other":"less than %{count} seconds"},"over_x_years":{"one":"over 1 year","other":"over %{count} years"},"x_days":{"one":"1 day","other":"%{count} days"},"x_minutes":{"one":"1 minute","other":"%{count} minutes"},"x_months":{"one":"1 month","other":"%{count} months"},"x_seconds":{"one":"1 second","other":"%{count} seconds"}},"prompts":{"day":"Day","hour":"Hour","minute":"Minute","month":"Month","second":"Seconds","year":"Year"}},"devise":{"confirmations":{"confirmed":"Your email address has been successfully confirmed.","send_instructions":"You will receive an email with instructions for how to confirm your email address in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes."},"failure":{"already_authenticated":"You are already signed in.","inactive":"Your account is not activated yet.","invalid":"Invalid %{authentication_keys} or password.","last_attempt":"You have one more attempt before your account is locked.","locked":"Your account is locked.","not_found_in_database":"Invalid %{authentication_keys} or password.","timeout":"Your session expired. Please sign in again to continue.","unauthenticated":"You need to sign in or sign up before continuing.","unconfirmed":"You have to confirm your email address before continuing."},"mailer":{"confirmation_instructions":{"subject":"Confirmation instructions"},"email_changed":{"subject":"Email Changed"},"password_change":{"subject":"Password Changed"},"reset_password_instructions":{"subject":"Reset password instructions"},"unlock_instructions":{"subject":"Unlock instructions"}},"omniauth_callbacks":{"failure":"Could not authenticate you from %{kind} because \\"%{reason}\\".","success":"Successfully authenticated from %{kind} account."},"passwords":{"no_token":"You can't access this page without coming from a password reset email. If you do come from a password reset email, please make sure you used the full URL provided.","send_instructions":"You will receive an email with instructions on how to reset your password in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.","updated":"Your password has been changed successfully. You are now signed in.","updated_not_active":"Your password has been changed successfully."},"registrations":{"destroyed":"Bye! Your account has been successfully cancelled. We hope to see you again soon.","signed_up":"Welcome! You have signed up successfully.","signed_up_but_inactive":"You have signed up successfully. However, we could not sign you in because your account is not yet activated.","signed_up_but_locked":"You have signed up successfully. However, we could not sign you in because your account is locked.","signed_up_but_unconfirmed":"A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.","update_needs_confirmation":"You updated your account successfully, but we need to verify your new email address. Please check your email and follow the confirmation link to confirm your new email address.","updated":"Your account has been updated successfully.","updated_but_not_signed_in":"Your account has been updated successfully, but since your password was changed, you need to sign in again."},"sessions":{"already_signed_out":"Signed out successfully.","signed_in":"Signed in successfully.","signed_out":"Signed out successfully."},"unlocks":{"send_instructions":"You will receive an email with instructions for how to unlock your account in a few minutes.","send_paranoid_instructions":"If your account exists, you will receive an email with instructions for how to unlock it in a few minutes.","unlocked":"Your account has been unlocked successfully. Please sign in to continue."}},"errors":{"format":"%{attribute} %{message}","messages":{"accepted":"must be accepted","already_confirmed":"was already confirmed, please try signing in","blank":"can't be blank","confirmation":"doesn't match %{attribute}","confirmation_period_expired":"needs to be confirmed within %{period}, please request a new one","empty":"can't be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","expired":"has expired, please request a new one","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","in":"must be in %{count}","inclusion":"is not included in the list","invalid":"is invalid","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","model_invalid":"Validation failed: %{errors}","not_a_number":"is not a number","not_an_integer":"must be an integer","not_found":"not found","not_locked":"was not locked","not_saved":{"one":"1 error prohibited this %{resource} from being saved:","other":"%{count} errors prohibited this %{resource} from being saved:"},"odd":"must be odd","other_than":"must be other than %{count}","present":"must be blank","required":"must exist","taken":"has already been taken","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"}}},"flash":{"actions":{"create":{"notice":"%{resource_name} was successfully created."},"destroy":{"alert":"%{resource_name} could not be destroyed.","notice":"%{resource_name} was successfully destroyed."},"update":{"notice":"%{resource_name} was successfully updated."}}},"hello":"Hello world","helpers":{"select":{"prompt":"Please select"},"submit":{"create":"Create %{model}","submit":"Save %{model}","update":"Update %{model}"}},"number":{"currency":{"format":{"delimiter":",","format":"%u%n","precision":2,"separator":".","significant":false,"strip_insignificant_zeros":false,"unit":"$"}},"format":{"delimiter":",","precision":3,"round_mode":"default","separator":".","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"Billion","million":"Million","quadrillion":"Quadrillion","thousand":"Thousand","trillion":"Trillion","unit":""}},"format":{"delimiter":"","precision":3,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"eb":"EB","gb":"GB","kb":"KB","mb":"MB","pb":"PB","tb":"TB"}}},"nth":{},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}}},"support":{"array":{"last_word_connector":", and ","two_words_connector":" and ","words_connector":", "}},"time":{"am":"am","formats":{"default":"%a, %d %b %Y %H:%M:%S %z","long":"%B %d, %Y %H:%M","short":"%d %b %H:%M"},"pm":"pm"}}`));

  // app/javascript/initializers/index.js
  init_global();

  // app/javascript/initializers/i18n.js
  init_global();
  import_i18n_js.default.locale = document.getElementsByTagName("html")[0].getAttribute("lang") || import_i18n_js.default.defaultLocale;

  // app/javascript/screens/index.js
  init_global();
})();
/*! Bundled license information:

bootstrap/js/dist/dom/event-handler.js:
  (*!
    * Bootstrap event-handler.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/dom/data.js:
  (*!
    * Bootstrap data.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/base-component.js:
  (*!
    * Bootstrap base-component.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/alert.js:
  (*!
    * Bootstrap alert.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/button.js:
  (*!
    * Bootstrap button.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/dom/manipulator.js:
  (*!
    * Bootstrap manipulator.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/dom/selector-engine.js:
  (*!
    * Bootstrap selector-engine.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/carousel.js:
  (*!
    * Bootstrap carousel.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/collapse.js:
  (*!
    * Bootstrap collapse.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/dropdown.js:
  (*!
    * Bootstrap dropdown.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/modal.js:
  (*!
    * Bootstrap modal.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/offcanvas.js:
  (*!
    * Bootstrap offcanvas.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/tooltip.js:
  (*!
    * Bootstrap tooltip.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/popover.js:
  (*!
    * Bootstrap popover.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/scrollspy.js:
  (*!
    * Bootstrap scrollspy.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/tab.js:
  (*!
    * Bootstrap tab.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)

bootstrap/js/dist/toast.js:
  (*!
    * Bootstrap toast.js v5.1.3 (https://getbootstrap.com/)
    * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)
*/
//# sourceMappingURL=application.js.map
