!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},n.parcelRequired7c6=r);var i=r("iU1Pc"),a=document.querySelector(".form"),l=document.querySelector('[name="delay"]'),u=document.querySelector('[name="step"]'),c=document.querySelector('[name="amount"]'),d=null;function f(e,n){var t=Math.random()>.3;d=setInterval((function(){var o=l.value+u.value,r=e+1;if(e!==c.value)return new Promise((function(n,i){t&&n({position:r,delay:o}),i({position:r,delay:o}),e+=1}),n);clearInterval(d)}))}a.addEventListener("submit",(function(e){e.preventDefault(),f(1,l.value)})),f(2,500).then((function(n){var t=n.position,o=n.delay;e(i).Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(o,"ms"))})).catch((function(n){var t=n.position,o=n.delay;e(i).Notify.failure("❌ Rejected promise ".concat(t," in ").concat(o,"ms"))}))}();
//# sourceMappingURL=03-promises.601a908f.js.map