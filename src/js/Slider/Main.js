class Slider {
  constructor(prefix, option) {
    const self = this;
    if (!Element.prototype.prependChild) {
      Element.prototype.prependChild = function(el) {
        this.insertBefore(el, this.firstChild);
      };
    }
    if (!Element.prototype.remove) {
      Element.prototype.remove = function() {
        this.parentNode.removeChild(this);
      };
    }

    self.prefix = prefix;
    self.interval = 5000;
    self.transition = 1000;
    self.page = 1;
    self.length = 7;
    self.content = document.querySelector(prefix + " .slider__content");
    self.navi = document.querySelectorAll(prefix + " .slider__navi > span");
    self.buttonNext = document.querySelector(prefix + " .slider__arrow--right");
    self.buttonPrev = document.querySelector(prefix + " .slider__arrow--left");
    self.items = document.querySelectorAll(prefix + " .slider__item");
    // self.clone();
    self.addEvent();
    self.setTimer();
  }

  addEvent() {
    const self = this;
    self.buttonNext.addEventListener("click", function(event) {
      self.toPage(self.page + 1);
    });
    self.buttonPrev.addEventListener("click", function(event) {
      self.toPage(self.page - 1);
    });
    Array.prototype.forEach.call(self.navi, function(e, i, s) {
      e.addEventListener("click", function(event) {
        self.toPage(e.dataset.page);
      });
    });
  }

  clone() {
    const self = this;
    const after = document.createDocumentFragment();
    const before = document.createDocumentFragment();

    Array.prototype.forEach.call(self.items, function(e, i, s) {
      const cloneAfter = e.cloneNode(true);
      after.appendChild(cloneAfter);
      const cloneBefore = e.cloneNode(true);
      before.appendChild(cloneBefore);
    });

    self.content.appendChild(after);
    self.content.prependChild(before);
    self.items = document.querySelectorAll(self.prefix + " .slider__item");
  }

  setTimer() {
    const self = this;
    setInterval(function() {
      // if (!liquidly.isBreak())
       self.toPage(self.page + 1);
    }, self.interval);
  }

  toPage(page) {
    const self = this;
    self.page = page < 1 ? (page % (self.length + 1)) + self.length : page % (self.length + 1);
    self.page = self.page === 0 ? 1 : self.page;

    Array.prototype.forEach.call(self.items, function(e, i, s) {
      self.width = +window
        .getComputedStyle(e, null)
        .getPropertyValue("width")
        .replace("px", "");
      e.style.transform = "translateX(" + self.width * (1 - self.page) + "px)";
    });

    if (self.navi.length > 0) {
      self.navigate(self.page);
    }
  }

  navigate(page) {
    const self = this;
    Array.prototype.forEach.call(self.navi, function(e, i, s) {
      e.classList.remove("active");
    });

    const current = Array.prototype.filter.call(self.navi, function(e, i, s) {
      return e.dataset.page == page;
    })[0];
    current.classList.add("active");
  }
}
const mainSlider = new Slider("#mainv");
const subSlider = new Slider("#slider__sub");

//Option
Array.prototype.forEach.call(document.querySelectorAll("#slider__sub .slider__item"), function(e, i, s) {
  e.addEventListener("click", event => {
    if (!liquidly.isBreak()) {
      event.preventDefault();
      mainSlider.toPage(e.dataset.page);
    }
  });
});
