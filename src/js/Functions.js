export default class Functions {
  constructor() {
    /**
     * ### ajax
     * @returns {Promise}
     * @param {object {type, url, async, data}} option
     * @param {string} type 
     * @param {string} url
     * @param {boolean} async
     * @param {string} data
     */
    window.ajax = function(option){
      const xhr = new XMLHttpRequest();
      if (option.type === 'GET') {
          return new Promise(function (resolve, reject) {
              xhr.open('GET', option.url, option.async);
              xhr.onload = function () {
                  if (this.readyState === 4 && this.status >= 200 && this.status < 400)
                      resolve(this);
                  else
                      reject(this);
              };
              xhr.send();
          });
      }
      else if (option.type === 'POST') {
          return new Promise(function (resolve, reject) {
              xhr.open('POST', option.url, option.async);
              xhr.onload = function () {
                  if (this.readyState === 4 && this.status >= 200 && this.status < 400)
                      resolve(this);
                  else
                      reject(this);
              };
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
              xhr.send(option.data);
          });
      }
    }
    /**
     * ### insert
     * @returns {void}
     * @param {string} type 
     * @param {string} url
     */
    window.insert = function(target, url) {

      ajax({type:"GET", url:url, async:true, data:""}).then(function(data){
        document.querySelector(target).insertAdjacentHTML("beforeend", data.responseText);
      }).catch(function(err){
        console.log(err);
      });
    };


    window.getWidth = function(element){
      return +window
      .getComputedStyle(element, null)
      .getPropertyValue("width")
      .replace("px", "");
    }


    window.getLeft = function(element){
      return +window
      .getComputedStyle(element, null)
      .getPropertyValue("left")
      .replace("px", "");
    }
  }
}
new Functions();