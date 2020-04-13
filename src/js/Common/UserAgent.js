const ua = window.navigator.userAgent.toLowerCase();
const agent = {
  isMac: navigator.platform == "MacIntel",
  isMobile: ua.match(/(iphone|ipod|android.*mobile)/i),
  isTablet: ua.match(/(ipad|kindle)/i) || (ua.indexOf("android") !== -1 && ua.indexOf("mobile") === -1),
  isIE: ua.indexOf("msie") !== -1 || ua.indexOf("trident") !== -1,
  isEdge: ua.indexOf("edge") !== -1,
  isChrome: ua.indexOf("chrome") !== -1,
  isFirefox: ua.indexOf("firefox") !== -1,
  isSafari: ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1 && ua.indexOf("edge") === -1
};
export default agent;
