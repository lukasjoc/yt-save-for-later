parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"pILq":[function(require,module,exports) {
function n(){return document.querySelector("h1.title").innerText}function t(){return document.querySelector(".ytp-time-duration").innerText}function e(){return document.querySelector(".ytp-time-current").innerText}function r(){return window.location.search.match(/[^=]{8,}/)[0]}function o(){return document.querySelector(".ytd-channel-name").innerText}function u(){var n=window.location.href,t=c();return"".concat(n,"&t=").concat(t)}function c(){return d(e())}function i(){return d(t())}function a(){return Math.round(100*c()/i())}function d(n){for(var t=n.split(":"),e=0,r=1;t.length>0;)e+=r*parseInt(t.pop(),10),r*=60;return e}function f(c,i,d){if("popup"!==c.from||"add_video"!==c.why)return!1;var f={id:r(),channel:o(),link:u(),title:n(),duration:t(),current:e(),percent:a()};return console.log("DEBUG!!: PAYLOAD BEFORE SEND",f),d(f),!0}chrome.runtime.onMessage.addListener(f);
},{}]},{},["pILq"], null)