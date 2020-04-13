import agent from "./UserAgent";

export default class Inview {
  constructor() {
    const self = this;
    self.defineMethod();

    self.setMainvHideAction(["#mainv,#sp-mainv"]);

    /**
     * Retinaディスプレイ等、devicePixelRatio > 2　の場合は、
     * screenY x devicePixelRatio のscrollTopまで行かないとInterSectionObserver
     * が発動しないので、Inviewインタラクションは諦める
    */
    if (window.devicePixelRatio > 2) {
      [".inview"].forEach(function(e) {
        Array.prototype.forEach.call(document.querySelectorAll(e), function(i) {
          i.classList.add("inview--on");
        });
      });
    }else{
      if (agent.isMobile || agent.isTablet) self.setInteraction([".inview"], false);
      else self.setInteraction([".inview"], true);
    }
  }

  defineMethod() {
    /**
     * @function HTMLElement.prototype.inview　HTML要素と画面の交差を判定し処理を実行する
     */
    if (!HTMLElement.prototype.inview) {
      Object.defineProperty(HTMLElement.prototype, "inview", {
        configurable: true,
        enumerable: false,
        writable: true,
        /**
         * @function callbackInView  HTML要素が画面内に入った時に実行する関数
         * @function callbackOutView  HTML要素が画面から出た時に実行する関数
         */
        value: function(callbackInView, callbackOutView) {
          const inViewOptions = {
            root: null,
            rootMargin: "-5%", //要素が交差する手前でコールバックを呼び出したい場合はrootMarginに0%以外の値を
            threshold: [0] //交差領域が100%変化した時にコールバックを呼び出す
          };
          const outViewOptions = {
            root: null,
            rootMargin: "-2%", //要素が交差する手前でコールバックを呼び出したい場合はrootMarginに0%以外の値を
            threshold: [0] //交差領域が100%変化した時にコールバックを呼び出す
          };
          
          new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
              //要素が画面内に入った時( e.isIntersecting 交差を判定するブール値)
              if (e.isIntersecting && Object.prototype.toString.call(callbackInView) === "[object Function]") {
                callbackInView(e);
              }
            });
          }, inViewOptions).observe(this);
          
          new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
              //要素が画面から出た時
              if (!e.isIntersecting && Object.prototype.toString.call(callbackOutView) === "[object Function]") {
                callbackOutView(e);
              }
            });
          }, outViewOptions).observe(this);

        
        }
      });
    }
  }

  setInteraction(elements, alternate) {
    elements.forEach(function(e) {
      Array.prototype.forEach.call(document.querySelectorAll(e), function(i) {
        i.inview(
          function() {
            i.classList.add("inview--on");
          },
          function() {
            if (alternate) i.classList.remove("inview--on");
          }
        );
      });
    });
  }

  setMainvHideAction(mainv) {
    mainv.forEach(function(e) {
      Array.prototype.forEach.call(document.querySelectorAll(e), function(i) {
        i.inview(
          function() {
            Array.prototype.forEach.call(document.querySelectorAll(".mainv__hide"), function(j) {
              j.classList.remove("mainv__hide--on");
            });
          },
          function() {
            Array.prototype.forEach.call(document.querySelectorAll(".mainv__hide"), function(j) {
              j.classList.add("mainv__hide--on");
            });
          }
        );
      });
    });
  }
}
