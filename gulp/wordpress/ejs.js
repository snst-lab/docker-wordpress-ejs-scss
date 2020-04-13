import gulp from "gulp";
import fs from "fs";
import path from "path";
import data from "gulp-data";
import replace from "gulp-replace";
import rename from "gulp-rename";
import ejs from "gulp-ejs";
import plumber from "gulp-plumber";
/**
 * 環境変数読み込み
 */
import env from "node-env-file";
env(".env");

/**
 * EJSのコンパイル
 */
class Ejs {
  constructor() {
    const time = process.env.CACHE === "yes" ? "?" + Date.now() : "";
    const metaJson = JSON.parse(fs.readFileSync("./meta.json"));
    const cssConfigJson = JSON.parse(fs.readFileSync("./src/css/config.json"));

    gulp.task("build:html:toppage", done => {
      gulp
        .src(["./src/html/home.ejs"])
        .pipe(plumber())
        .pipe(
          data(file => {
            return {
              basename: path.basename(file.path,".ejs")
            };
          })
        )
        .pipe(ejs({ meta: metaJson, css: cssConfigJson }))
        .pipe(replace(/\.js"/g, `.js${time}"`))
        .pipe(replace(/\.css"/g, `.css${time}"`))
        .pipe(replace(/\.jpg"/g, `.jpg${time}"`))
        .pipe(replace(/\.png"/g, `.png${time}"`))
        .pipe(
          rename(path => {
            path.basename = "index";
            path.extname = ".php";
          })
        )
        .pipe(gulp.dest("./dist/wp-content/themes/template/"));
      done();
    });
    gulp.task("build:html:subpage", done => {
      gulp
        .src(["./src/html/*.ejs", "!./src/html/home.ejs", "!./src/html/_*.ejs","!./src/html/*-archive.ejs","!./src/html/*-single.ejs","!./src/html/404.ejs","!./src/html/sidebar.ejs"])
        .pipe(plumber())
        .pipe(
          data(file => {
            return {
              basename: path.basename(file.path,".ejs")
            };
          })
        )
        .pipe(ejs({ meta: metaJson, css: cssConfigJson }))
        .pipe(replace(/\.js"/g, `.js${time}"`))
        .pipe(replace(/\.css"/g, `.css${time}"`))
        .pipe(replace(/\.jpg"/g, `.jpg${time}"`))
        .pipe(replace(/\.png"/g, `.png${time}"`))
        .pipe(
          rename(path => {
            path.dirname = path.basename;
            path.basename = "index";
            path.extname = ".php";
          })
        )
        .pipe(gulp.dest("./dist/"));
      done();
    });
    gulp.task("build:html:cms", done => {
      gulp
        .src(["!./src/html/_*.ejs","./src/html/*-archive.ejs","./src/html/*-single.ejs","./src/html/404.ejs","./src/html/sidebar.ejs"])
        .pipe(plumber())
        .pipe(
          data(file => {
            return {
              basename: path.basename(file.path,".ejs")
            };
          })
        )
        .pipe(ejs({ meta: metaJson, css: cssConfigJson }))
        .pipe(replace(/\.js"/g, `.js${time}"`))
        .pipe(replace(/\.css"/g, `.css${time}"`))
        .pipe(replace(/\.jpg"/g, `.jpg${time}"`))
        .pipe(replace(/\.png"/g, `.png${time}"`))
        .pipe(
          rename(path => {
            if(/-archive$/.test(path.basename)) path.basename = 'archive-' + path.basename.replace('-archive','');
            if(/-single$/.test(path.basename)) path.basename = 'single-' + path.basename.replace('-single','');
            path.extname = ".php";
          })
        )
        .pipe(gulp.dest("./dist/wp-content/themes/template/"));
      done();
    });
    gulp.task("build:html", gulp.parallel("build:html:subpage", "build:html:toppage","build:html:cms"));
  }
}
export default new Ejs();
