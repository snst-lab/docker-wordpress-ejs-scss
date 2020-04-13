import gulp from "gulp";
import browserSync from "browser-sync";

/**
 * 環境変数読み込み
 */
import env from "node-env-file";
env(".env");

/**
 *  ミドルウェアを使用する場合
 */
import TagEditor from "../../src/lib/node-tageditor/dist/server/index.js";
// import TagEditor from "node-tageditor";
const middleWare =
  process.env.MIDDLEWARE === "yes"
    ? [
        new TagEditor()
      ]
    : [];

/**
 *  BrowserSyncの設定
 */
class BrowserSync {
  constructor() {
    gulp.task("browserSync:init", done => {
      browserSync.init({
        proxy: "localhost:" + process.env.PORT,
        // open: "external",
        online: true,
        notify: false,
        ghostMode: false,
        ui: false,
        minify: false,
        logLevel: "debug",
        middleware: middleWare || []
      });
      done();
    });
    gulp.task("browserSync:reload", done => {
      browserSync.reload();
      done();
    });
  }
}
export default new BrowserSync();
