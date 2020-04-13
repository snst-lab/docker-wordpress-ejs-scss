import Inview from "./Inview";
import Scroll from "./Scroll";
import SpMenu from "./SpMenu";
import MenuCurrent from "./MenuCurrent";
import agent from "./UserAgent";


export default class Common {
  constructor() {
    const self = this;
    self.getUrlParams();
    self.getBasename();
    self.setTelAction();
    self.addClickEvent();
    self.splitString();
    new Inview();
    new MenuCurrent();
    new SpMenu();
    self.scrollTo = new Scroll().scrollTo;

    //案件固有設定
    if (urlParams['subject'] == "recruit") {
      $('[name="subject[]"]:eq(6)').prop("checked", true);
    }
  }

  getUrlParams(){
    window.urlParams =   (function() {
      var vars = [],
        max = 0,
        hash = "",
        array = "";
      var url = window.location.search;
      //?を取り除くため、1から始める。複数のクエリ文字列に対応するため、&で区切る
      hash = url.slice(1).split("&");
      max = hash.length;
      for (var i = 0; i < max; i++) {
        array = hash[i].split("="); //keyと値に分割。
        vars.push(array[0]); //末尾にクエリ文字列のkeyを挿入。
        vars[array[0]] = array[1]; //先ほど確保したkeyに、値を代入。
      }
      return vars;
    })();
  }

  /**
   * 下層ページのbasenameを取得（トップの場合は'home')
   */
  getBasename() {
    window.basename = window.location.href.split("/").reverse()[1];
    basename = (/\./.test(basename) || /localhost/.test(basename))  ? 'home' : basename;
  }

  /**
   * .clickクラスの付いた要素をクリックすると.click--onクラスが付く
   */
  addClickEvent() {
    $(".click").click(function() {
      $(this).toggleClass("click--on");
    });
  }

  /**
   * .splitクラスの付いたテキストを１文字ずつspanで分割
   */
  splitString() {
    $(".split").each(function() {
      var self = this;
      var chars = $(self)
        .text()
        .split("");
      $(self).text("");
      chars.forEach(function(e) {
        $(self).append("<span>" + e + "</span>");
      });
    });
  }

  /**
   * PC時はTEL発信しない
   */
  setTelAction() {
    const self = this;
    if (!agent.isMobile) {
      $('a[href^="tel:"]').css({ cursor: "default" });
      $('a[href^="tel:"]').on("click", function(event) {
        event.preventDefault();
      });
    }
  }
}

window.addEventListener("DOMContentLoaded", event => {
  window.commonJS = new Common();
});
