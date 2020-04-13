export default class SpMenu {
  constructor() {
    const self = this;

    var popup_flag = false;
    var main_fix = true; // メインコンテンツのスクロールOn/Off
    var currentPos = 0;

    $(".hamb_btn").click(function() {
      $("header .sp").toggleClass("spmenu--open");
      if (!popup_flag) {
        popup_flag = true;
        currentPos = $(window).scrollTop();
      } else {
        popup_flag = false;
        if (main_fix) $(window).scrollTop(currentPos);
      }
    });
    $('header .sp menu a[href^="#"]').click(function() {
      $("header .sp").removeClass("spmenu--open");
      popup_flag = false;
      if (main_fix) $(window).scrollTop(currentPos);
    });
  }
}
