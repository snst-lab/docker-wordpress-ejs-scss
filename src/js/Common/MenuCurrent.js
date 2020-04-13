/**
 * グローバルナビゲーションのカレント
 */
export default class MenuCurrent {
  constructor(option) {
    const self = this;

    self.option = Object.assign(
      {
        menu: [".hed_menu"],
        link: " > a",
        current: ".menu_current",
        child: ".menu_current > span",
        submenu: ".submenu",
        timeout: 2000 //Timout経過後、ページナビへカレントを戻す
      },
      option
    );

    self.page = [];
    self.menu = [];
    self.current = [];
    self.child = [];
    self.link = [];
    self.submenu = [];
    self.menuActive = false;
    self.submenuActive = false;

    self.option.menu.forEach((menu, i) => {
      self.menu[i] = document.querySelector(menu);
      self.page[i] = document.querySelector(menu + self.option.link + "." + window.basename);
      self.current[i] = document.querySelector(menu + " " + self.option.current);
      self.child[i] = document.querySelector(menu + " " + self.option.child);
      self.link[i] = document.querySelectorAll(menu + self.option.link);
      self.submenu[i] = document.querySelectorAll(menu + " " + self.option.submenu);
      self.hoverin(i);
      self.hoverout(i);
      self.init(i);
    });
  }

  init(i) {
    const self = this;
    if (self.page[i] !== null) {
      self.current[i].style.left = getLeft(self.page[i]) + "px";
      self.current[i].style.width = getWidth(self.page[i]) + "px";
      self.child[i].style.width = "100%";
    } else {
      self.child[i].style.width = "0%";
    }
  }

  hoverin(i) {
    const self = this;
    Array.prototype.forEach.call(self.link[i], function(menu) {
      menu.addEventListener("mouseover", event => {
        menu.classList.add("active");
        self.menuActive = true;
        self.submenuActive = false;

        const next = menu.nextElementSibling;
        if (next !== null && next.classList.contains(self.option.submenu.replace(".", ""))) {
          next.classList.add("active");
          self.submenuActive = true;
        }

        self.current[i].style.left = getLeft(menu) + "px";
        self.current[i].style.width = getWidth(menu) + "px";
        self.child[i].style.width = "100%";
      });
    });

    Array.prototype.forEach.call(self.submenu[i], function(menu) {
      menu.addEventListener("mouseover", event => {
        menu.classList.add("active");
        self.menuActive = true;
        self.submenuActive = true;
        self.child[i].style.width = "100%";
      });
    });
  }

  hoverout(i) {
    const self = this;
    Array.prototype.forEach.call(self.link[i], function(menu) {
      menu.addEventListener("mouseleave", event => {
        self.menuActive = false;
        self.reset(i);
      });
    });
    Array.prototype.forEach.call(self.submenu[i], function(menu) {
      menu.addEventListener("mouseleave", event => {
        menu.classList.remove("active");
        self.menuActive = false;
        self.submenuActive = false;
        self.child[i].style.width = "0%";
        setTimeout(() => {
          if (!self.menuActive && !self.submenuActive) {
            self.init(i);
          }
        }, self.option.timeout);
      });
    });
  }

  reset(i) {
    const self = this;
    Array.prototype.forEach.call(self.link[i], function(e) {
      e.classList.remove("active");
    });
    Array.prototype.forEach.call(self.submenu[i], function(e) {
      e.classList.remove("active");
    });
    self.child[i].style.width = "0%";
    setTimeout(() => {
      if (!self.menuActive && !self.submenuActive) {
        self.init(i);
      }
    }, self.option.timeout);
  }
}
