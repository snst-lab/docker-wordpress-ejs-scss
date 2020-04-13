import {selector,sendto,inputs} from "./Config";

const changes = [];
const keyups = [];

Object.keys(inputs).forEach(_name => {
  switch (inputs[_name]["type"]) {
    case "text":
      keyups.push(_name);
      break;
    case "tel":
      keyups.push(_name);
      break;
    case "textarea":
      keyups.push(_name);
      break;
    case "select":
      changes.push(_name);
      break;
    case "radio":
      changes.push(_name);
      break;
    case "checkbox":
      changes.push(_name + '[]');
      break;
  }
});
const names = changes.concat(keyups);

window.formData = {};
window.userInfo = {};

$(document).ready(function() {
    /**
   * @returns {void}
   */
  (function init() {
    $(selector.loader).css({ "z-index": -1 });
    $(selector.pageThanks).hide();
    $(selector.pageFront).show();
  })();

  /**
   * @returns {void}
   */
  (function post() {
    $(document).on("click", selector.form + " " + selector.buttonFlagValid, function(event) {
      event.preventDefault();

      window.userInfo = $.get(
        "https://ipinfo.io",
        data => {
          window.userInfo = data;
          delete window.userInfo.readme;
          delete window.userInfo.hostname;
        },
        "jsonp"
      );
      const postData = Object.assign(window.userInfo, window.formData);

      $.ajax({
        type: "POST",
        url: sendto,
        dataType: "json",
        data: postData,
        beforeSend: function(xhr, settings) {
          $(selector.loader).css({ "z-index": 9999 });
          $("body").css("pointer-events", "none");
        },
        complete: function(xhr, textStatus) {
          setTimeout(function() {
            window.scrollTo(0, 0);
            $(selector.loader).css({ "z-index": -1 });
            $(selector.pageFront).hide();
            $(selector.pageThanks).show();
            $(selector.buttonFlagValid).hide();
            $("body").css("pointer-events", "auto");
            setTimeout(function() {
              location.href = "/";
            }, 3000);
          }, 1500);
        },
        statusCode: {
          200: function(data) {
            console.log(data);
          },
          403: function(err) {
            console.log(err);
          }
        }
      });
    });
  })();

  /**
   * validation フォームのバリデーション
   * @returns {void}
   */
  (function validation() {
    (function start() {
      toggleButton(checkAll("first_view"));

      keyups.forEach(function(_name) {
        $(selector.form + " [name='" + _name + "']").on("focus keyup blur", function() {
          toggleButton(checkAll(_name));
        });
      });
      changes.forEach(function(_name) {
          $(selector.form + " [name='" + _name + "']").on("change", function() {
          toggleButton(checkAll(_name));
        });
      });

      addClickBack();
    })();

    /**
     * 一括チェック
     * @param {string} action 入力フェーズ
     * @returns {bool}} エラーチェック結果
     */
    function checkAll(action) {
      var result = {};
      switch (action) {
        case "first_view":
          names.forEach(function(_name) {
            _name = _name.replace("[]", "");
            result[_name] = check(inputs[_name].type, _name, inputs[_name].rules, false);
          });
          break;
        case "click_back":
          names.forEach(function(_name) {
            _name = _name.replace("[]", "");
            result[_name] = check(inputs[_name].type, _name, inputs[_name].rules, true);
          });
          break;
        default:
          names.forEach(function(_name) {
            if (_name === action) {
              _name = _name.replace("[]", "");
              result[_name] = check(inputs[_name].type, _name, inputs[_name].rules, true);

            } else {
              _name = _name.replace("[]", "");
              result[_name] = check(inputs[_name].type, _name, inputs[_name].rules, false);
            }
          });
      }
      window.formData = result;

      var valid = true;
      Object.keys(result).forEach(function(key) {
        if (result[key] === null) valid = false;
      });
      
      console.log(valid,result);

      return valid;
    }

    /**
     * ボタンの切り替え
     * @param {bool} result エラーチェック結果
     * @returns {void}
     */
    function toggleButton(valid) {
      if (valid) {
        $(selector.form + " " + selector.buttonFlagInvalid).addClass("valid");
      } else {
        $(selector.form + " " + selector.buttonFlagInvalid).removeClass("valid");
      }
    }

    /**
     * 入力エラーがありますボタンを押した時の挙動
     * @returns {void}
     */
    function addClickBack() {
      document.querySelector(selector.form + " " + selector.buttonFlagInvalid).addEventListener(
        "click",
        function(event) {
          event.preventDefault();
          if (!checkAll("click_back")) {
            var anchor = "header";
            $(
              $(selector.row)
                .get()
                .reverse()
            ).each(function() {
              if (
                $(this)
                  .find(selector.message)
                  .text() != ""
              ) {
                anchor = "#"+$(this).attr("id");
              }
            });
            window.commonJS.scrollTo(anchor);
          }
        },
        false
      );
    }

    /**
     * @param {array} array
     * @returns {string}
     */
    function arrayToCSV(array) {
      var csv = "";
      for (var i = 0; i < array.length; i++) {
        csv += array[i] + ",";
      }
      csv = csv.slice(0, -1);
      return csv;
    }

    /**
     * @param {string} type input type
     * @param {string} name input name
     * @param {array} rules バリデーションルール
     * @param {bool} display_err エラー表示の有無
     * @returns {string} 結果
     */
    function check(type, name, rules, display_err) {
      switch (type) {
        case "text":
          var value = $(selector.form + " " + "[name='" + name + "']").val();
          break;
        case "tel":
          var value = $(selector.form + " " + "[name='" + name + "']").val();
          break;
        case "select":
          var value = $(selector.form + " " + "[name='" + name + "']:checked").val();
          break;
        case "textarea":
          var value = $(selector.form + " " + "[name='" + name + "']").val();
          break;
        case "radio":
          var value = $(selector.form + " " + "[name='" + name + "']:checked").val();
          break;
        case "checkbox":
          var value = arrayToCSV(
            $(selector.form + " " + "[name='" + name + "[]']:checked")
              .map(function() {
                return $(this).val();
              })
              .get()
          );
          break;
        default:
          var value = "";
      }
      const message = $(selector.form + " " + selector.rowPrefix + name + " " + selector.message);
      rules = rules || [{ condition: "value.length === 0", message: "必須項目です" }];

      try {
        rules.forEach(rule => {
          if (eval(rule.condition)) throw rule.message;
        });
      } catch (err) {
        if (display_err) {
          $(selector.form + " " + selector.rowPrefix + name).addClass("err");
          message.text(err);
        }
        return null;
      }

      if (display_err) {
        $(selector.form + " " + selector.rowPrefix + name).removeClass("err");
        message.text("");
      }
      return value;
    }
  })();
});
