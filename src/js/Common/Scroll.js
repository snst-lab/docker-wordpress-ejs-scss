import agent from "./UserAgent";

export default class Scroll{
  constructor() {
    const self = this;
    self.addEvent(self);
  }

  /**
   * スクロールアクションを設定
   */
  addEvent(self) {
    window.scrollRunning = false;

    Array.prototype.forEach.call(document.querySelectorAll("[href^='#']"), function(e) {
      e.addEventListener("click", function(event) {
        if (!agent.isIE && !liquidly.isBreak()) {
          event.preventDefault();
          if (!window.scrollRunning) {
            window.scrollRunning = true;

            const targetID = e.getAttribute("href");
            self.scrollTo(targetID);
          }
        }
      });
    });
  }

  scrollTo(targetID) {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    const targetTop =
      document.querySelector(targetID) !== null
        ? Math.max(window.pageYOffset + document.querySelector(targetID).getBoundingClientRect().top, 0)
        : 0;

    if (agent.isFirefox || agent.isSafari) {
      var deltaTop = (targetTop - scrollTop) * 0.04;
      var deltaMin = 8;
    } else {
      var deltaTop = (targetTop - scrollTop) * 0.02;
      var deltaMin = 4;
    }
    if (targetTop > scrollTop) {
      let scroll = setInterval(() => {
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= targetTop) {
          clearInterval(scroll);
          window.scrollRunning = false;
        } else if (scrollTop < targetTop && targetTop - scrollTop < 300) {
          window.scrollBy(0, deltaMin);
        } else {
          window.scrollBy(0, deltaTop);
        }
      }, 2);
    } else {
      let scroll = setInterval(() => {
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop <= targetTop) {
          clearInterval(scroll);
          window.scrollRunning = false;
        } else if (scrollTop > targetTop && scrollTop - targetTop < 300) {
          window.scrollBy(0, -4);
        } else {
          window.scrollBy(0, deltaTop);
        }
      }, 2);
    }
  }
}
