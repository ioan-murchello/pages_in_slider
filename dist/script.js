/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/download.js":
/*!************************************!*\
  !*** ./src/js/modules/download.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Download; }
/* harmony export */ });
class Download {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
    this.path = 'assets/img/mainbg.jpg';
  }
  downloadItem(path) {
    const link = document.createElement('a');
    link.setAttribute('href', this.path);
    link.setAttribute('download', 'nice__picture');
    link.style.display = 'none';
    document.body.append(link);
    console.log(link);
    link.click();
    console.log(link, 'two');
    document.body.removeChild(link);
  }
  init() {
    this.btns.forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
        this.downloadItem(this.path);
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Form; }
/* harmony export */ });
class Form {
  constructor(formSelector) {
    this.forms = document.querySelectorAll(formSelector);
    this.inputs = document.querySelectorAll('.input');
    this.message = {
      loading: 'loading...',
      succses: 'soon we whrite you',
      fail: 'some error width server...'
    };
    this.path = 'assets/question.php';
  }
  async postData(url, data) {
    let res = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json"
      }
    });
    return await res.json();
  }
  clearInputs() {
    this.inputs.forEach(el => {
      el.value = '';
    });
  }
  checkMailInputs() {
    const mailInput = document.querySelectorAll('[type="email"]');
    mailInput.forEach(el => {
      el.addEventListener('keypress', e => {
        if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
          e.preventDefault();
        }
      });
    });
  }
  initMask() {
    function setCursorPosition(position, element) {
      element.focus();
      if (element.setSelectionRange) {
        element.setCursorPosition(position, position);
      } else if (element.createTextRange) {
        let range = element.createTextRange();
        range.collapse(true);
        range.moveEnd("character", position);
        range.moveStart("character", position);
        range.select();
      }
    }
    function createPhoneMask(event) {
      let matrix = "+1 (___) __-___",
        i = 0,
        // static value
        def = matrix.replace(/\D/g, ""),
        // dynamic value
        val = this.value.replace(/\D/g, "");
      if (def.length >= val.length) {
        val = def;
      }
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
      });
      if (event.type === "blur") {
        if (this.value.length == 2) {
          this.value = "";
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
    let inputs = document.querySelectorAll('[name="phone"]');
    inputs.forEach(el => {
      el.addEventListener("input", createPhoneMask);
      el.addEventListener("focus", createPhoneMask);
      el.addEventListener("blur", createPhoneMask);
    });
  }
  init() {
    this.checkMailInputs();
    this.initMask();
    this.forms.forEach(el => {
      el.addEventListener("submit", e => {
        e.preventDefault();
        let statusMessage = document.createElement("div");
        statusMessage.style.cssText = `
                margin-top: 15px;
                font-size: 18px;
                color: gray;
            `;
        el.parentNode.append(statusMessage);
        statusMessage.textContent = this.message.loading;
        const formDate = new FormData(el);
        this.postData(this.path, formDate).then(res => {
          console.log(res);
          statusMessage.textContent = this.message.succses;
        }).catch(() => {
          statusMessage.textContent = this.message.fail;
        }).finally(() => {
          this.clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 4000);
        });
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/main-slider.js":
/*!***************************************!*\
  !*** ./src/js/modules/main-slider.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MainSlider; }
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(btns, next, prev) {
    super(btns, next, prev);
  }
  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }
    try {
      this.hanson.style.opacity = "0";
      if (n === 3) {
        this.hanson.classList.add("animated");
        setTimeout(() => {
          this.hanson.style.opacity = "1";
          this.hanson.classList.add("slideInUp");
        }, 3000);
      } else {
        this.hanson.classList.remove("slideInUp");
      }
    } catch (error) {}
    [...this.slides].forEach(slide => {
      slide.style.display = "none";
    });
    this.slides[this.slideIndex - 1].style.display = "block";
  }
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  bindTriggers() {
    this.btns.forEach(el => {
      el.addEventListener("click", () => {
        this.plusSlides(1);
      });
      el.parentNode.previousElementSibling.addEventListener("click", e => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
    this.showSlides(this.slideIndex);
    this.prev = document.querySelectorAll(".prevmodule").forEach(el => {
      el.addEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });
    this.next = document.querySelectorAll(".nextmodule").forEach(el => {
      el.addEventListener("click", e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(1);
      });
    });
  }
  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector(".hanson");
      } catch (error) {}
      this.bindTriggers();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/mini-slider.js":
/*!***************************************!*\
  !*** ./src/js/modules/mini-slider.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MiniSlider; }
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
  }
  decoratesSlides() {
    [...this.slides].forEach(slide => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector(".card__title").style.opacity = "0.4";
        slide.querySelector(".card__controls-arrow").style.opacity = "0";
      }
    });
    //if first slide !== button
    if (!this.slides[0].closest("button")) {
      this.slides[0].classList.add(this.activeClass);
    }
    if (this.animate) {
      this.slides[0].querySelector(".card__title").style.opacity = "1";
      this.slides[0].querySelector(".card__controls").style.opacity = "1";
    }
  }
  nextSlider() {
    this.next.addEventListener("click", () => {
      if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
        this.container.append(this.slides[0]); // slide
        this.container.append(this.slides[1]); // btn
        this.container.append(this.slides[2]); // btn

        this.decoratesSlides();
      } else if (this.slides[1].tagName == "BUTTON") {
        this.container.append(this.slides[0]); // slide
        this.container.append(this.slides[1]); // btn
        this.decoratesSlides();
      } else {
        this.container.append(this.slides[0]);
        this.decoratesSlides();
      }
    });
  }
  triggers() {
    this.next.addEventListener("click", () => {
      this.nextSlider();
    });
    this.prev.addEventListener("click", () => {
      for (let i = this.slides.length - 1; i > 0; i--) {
        if (this.slides[i].tagName !== "BUTTON") {
          let active = this.slides[i];
          this.container.insertBefore(active, this.slides[0]);
          this.decoratesSlides();
          break;
        }
      }
    });
    if (this.animate) {
      this.slides[0].querySelector(".card__title").style.opacity = "1";
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
    }
  }
  init() {
    try {
      this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: center;
        `;
      this.triggers();
      this.decoratesSlides();
      if (this.autoplay) {
        setInterval(() => this.nextSlider(), 5000);
      }
    } catch (e) {}
  }
}

/***/ }),

/***/ "./src/js/modules/playVideo.js":
/*!*************************************!*\
  !*** ./src/js/modules/playVideo.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ VideoPlayer; }
/* harmony export */ });
class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }
  createPlayer(url) {
    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: `${url}`,
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
    this.overlay.style.display = "flex";
  }
  onPlayerStateChange(state) {
    try {
      const blockedEl = this.activeBtn.closest(".module__video-item").nextElementSibling;
      // copy svg html , true - deep copy
      const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);
      if (state.data == 0) {
        if (blockedEl.querySelector(".play__circle").classList.contains("closed")) {
          blockedEl.querySelector(".play__circle").classList.remove("closed");
          blockedEl.querySelector("svg").remove();
          blockedEl.querySelector(".play__circle").append(playBtn);
          blockedEl.querySelector(".play__text").textContent = "play video";
          blockedEl.querySelector(".play__text").classList.remove("attention");
          blockedEl.style.opacity = 1;
          blockedEl.style.filter = "none";
          blockedEl.setAttribute("data-disabled", "false");
        }
      }
    } catch (e) {}
  }
  bindTriggers() {
    [...this.btns].forEach((btn, i) => {
      try {
        const blockedEl = btn.closest(".module__video-item").nextElementSibling;
        if (i % 2 == 0) {
          blockedEl.setAttribute("data-disabled", "true");
        }
      } catch (e) {}
      btn.addEventListener("click", () => {
        if (!btn.closest(".module__video-item") || btn.closest(".module__video-item").getAttribute('data-disabled') !== 'true') {
          this.activeBtn = btn;
          if (document.querySelector("iframe#frame")) {
            this.overlay.style.display = "flex";
            if (this.path !== btn.getAttribute("data-url")) {
              this.path = btn.getAttribute("data-url");
              this.player.loadVideoById({
                videoId: this.path
              });
            }
          } else {
            this.path = btn.getAttribute("data-url");
            this.createPlayer(this.path);
          }
        }
      });
    });
  }
  bindCloseBtn() {
    this.close.addEventListener("click", () => {
      this.player.stopVideo();
      this.overlay.style.display = "none";
    });
  }
  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindTriggers();
      this.bindCloseBtn();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/showBlocks.js":
/*!**************************************!*\
  !*** ./src/js/modules/showBlocks.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ showBlocks; }
/* harmony export */ });
class showBlocks {
  constructor(firstContainer, secondContainer, items) {
    try {
      this.firstContainer = document.querySelector(firstContainer);
      this.secondContainer = document.querySelector(secondContainer);
      this.firstItems = this.firstContainer.querySelectorAll(items);
      this.secondItems = this.secondContainer.querySelectorAll(items);
      this.items = items;
      this.firstCounter = 0;
      this.secondCounter = 0;
    } catch (e) {}
  }
  bindTriggers(container, items, counter) {
    container.querySelector(".plus").addEventListener("click", () => {
      if (counter !== items.length - 2) {
        items[counter].style.display = "flex";
        counter++;
      } else {
        items[counter].style.display = "flex";
        items[items.length - 1].remove();
      }
    });
  }
  hideItems(items) {
    items.forEach((item, i, arr) => {
      // check that current element is not last in this colection
      if (i !== arr.length - 1) {
        item.style.display = "none";
      }
    });
  }
  init() {
    try {
      this.hideItems(this.firstItems);
      this.hideItems(this.secondItems);
      this.bindTriggers(this.firstContainer, this.firstItems, this.firstCounter);
      this.bindTriggers(this.secondContainer, this.secondItems, this.secondCounter);
    } catch (e) {}
  }
}

/***/ }),

/***/ "./src/js/modules/showInfo.js":
/*!************************************!*\
  !*** ./src/js/modules/showInfo.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ShowInfo; }
/* harmony export */ });
class ShowInfo {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
  }
  init() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const sibling = btn.closest('.module__info-show').nextElementSibling;
        sibling.classList.toggle('msg');
        sibling.style.marginTop = '20px';
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider; }
/* harmony export */ });
class Slider {
  constructor() {
    let {
      container = null,
      btns = null,
      next = null,
      prev = null,
      activeClass = '',
      animate,
      autoplay
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.container = document.querySelector(container);
    this.btns = document.querySelectorAll(btns);
    try {
      this.slides = this.container.children;
    } catch (e) {}
    this.slideIndex = 1;
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_main_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/main-slider */ "./src/js/modules/main-slider.js");
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");
/* harmony import */ var _modules_mini_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/mini-slider */ "./src/js/modules/mini-slider.js");
/* harmony import */ var _modules_showBlocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/showBlocks */ "./src/js/modules/showBlocks.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");
/* harmony import */ var _modules_showInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/showInfo */ "./src/js/modules/showInfo.js");
/* harmony import */ var _modules_download__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/download */ "./src/js/modules/download.js");







window.addEventListener("DOMContentLoaded", function () {
  const mainSlider = new _modules_main_slider__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: ".page",
    btns: ".next"
  });
  mainSlider.render();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__["default"](".showup__video .play", ".overlay").init();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__["default"](".module__video-item .play", ".overlay").init();
  const showUpSlider = new _modules_mini_slider__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next ",
    activeClass: "card-active",
    animate: true
  });
  showUpSlider.init();
  const modulesSlider = new _modules_mini_slider__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: ".modules__content-slider",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
    activeClass: "card-active",
    animate: true,
    autoplay: true
  });
  modulesSlider.init();
  const feedSlider = new _modules_mini_slider__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: ".feed__slider",
    prev: ".feed__slider .slick-prev",
    next: ".feed__slider .slick-next",
    activeClass: "feed__item-active"
  });
  feedSlider.init();
  new _modules_showBlocks__WEBPACK_IMPORTED_MODULE_3__["default"]('.officerold', '.officernew', '.officer__card-item').init();
  new _modules_form__WEBPACK_IMPORTED_MODULE_4__["default"]('.form').init();
  const moduleSlider = new _modules_main_slider__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.moduleapp',
    btns: '.next',
    prev: '.prevmodule',
    next: '.nextmodule'
  });
  moduleSlider.render();
  new _modules_showInfo__WEBPACK_IMPORTED_MODULE_5__["default"]('.plus__content').init();
  new _modules_download__WEBPACK_IMPORTED_MODULE_6__["default"]('.download').init();
});
}();
/******/ })()
;
//# sourceMappingURL=script.js.map