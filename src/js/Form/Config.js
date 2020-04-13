export const selector = {
  form: "#form",
  rowPrefix: "#form-",
  row: ".form-row",
  message: ".notice",
  buttonFlagValid: ".valid",
  buttonFlagInvalid: ".invalid",
  pageFront: ".page-front",
  pageConfirm: ".page-confirm",
  pageThanks: ".page-thanks",
  loader: ".loader"
};
export const sendto = "/php/endpoint.php";

export const inputs = {
  subject: {
    type: "checkbox",
    rules: [
      {
        condition: "value.length === 0",
        message: "必須項目です"
      }
    ]
  },
  name: {
    type: "text",
    rules: [
      {
        condition: "value.length === 0",
        message: "必須項目です"
      }
    ]
  },
  kana: {
    type: "text",
    rules: [
      {
        condition: "!value.match(/^[ァ-ンー　]*$/)",
        message: "カタカナで入力してください"
      }
    ]
  },
  organization: {
    type: "text",
    rules: [
      {
        condition: "value.length === 0",
        message: "必須項目です"
      }
    ]
  },
  zip: {
    type: "tel",
    rules: [
      {
        condition: "value.length === 0",
        message: "必須項目です"
      },
      {
        condition: "!value.match(/[0-9]{3}-[0-9]{4}/) && !value.match(/^[0-9]{7}$/)",
        message: "郵便番号の形式が不正です"
      }
    ]
  },
  address: {
    type: "text",
    rules: [
      {
        condition: "value.length === 0",
        message: "必須項目です"
      }
    ]
  },
  tel: {
    type: "tel",
    rules: [
      {
        condition: "value.length === 0",
        message: "必須項目です"
      },
      {
        condition: "!value.match(/0[0-9]{1,4}-[0-9]{1,6}(-[0-9]{0,5})?/) && !value.match(/^[0-9]{7,13}$/)",
        message: "電話番号の形式が不正です"
      }
    ]
  },
  fax: {
    type: "text",
    rules: [
      {
        condition:
          "value.length !== 0 && !value.match(/0[0-9]{1,4}-[0-9]{1,6}(-[0-9]{0,5})?/) && !value.match(/^[0-9]{7,13}$/)",
        message: "FAX番号の形式が不正です"
      }
    ]
  },
  email: {
    type: "text",
    rules: [
      {
        condition: "value.length === 0",
        message: "必須項目です"
      },
      {
        condition:
          "!value.match(/^[-a-z0-9~!$%^&*_=+}{'?]+(.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(.[-a-z0-9_]+)*.([a-z]{2,})|([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}))(:[0-9]{1,5})?$/i)",
        message: "メールアドレスの形式が不正です"
      }
    ]
  },
  email_confirm: {
    type: "text",
    rules: [
      {
        condition: "value.length === 0",
        message: "必須項目です"
      },
      {
        condition:
          "!value.match(/^[-a-z0-9~!$%^&*_=+}{'?]+(.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(.[-a-z0-9_]+)*.([a-z]{2,})|([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}))(:[0-9]{1,5})?$/i)",
        message: "メールアドレスの形式が不正です"
      },
      {
        condition: "value !== $('input[name=\"email\"]').val()",
        message: "メールアドレスが一致しません"
      }
    ]
  },
  content: {
    type: "textarea",
    rules: [
      {
        condition: "value.length === 0",
        message: "必須項目です"
      }
    ]
  }
};
