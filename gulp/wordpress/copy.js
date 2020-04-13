import gulp from "gulp";
import fs from "fs";
import rename from "gulp-rename";

/**
 * ファイル存在確認関数
 */
function fileExist(path) {
  try {
    fs.statSync(path);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") return false;
  }
}

/**
 * ファイルのコピー
 */
class Copy {
  constructor() {
    gulp.task("copy:favicon", done => {
      gulp.src(["./src/favicon.ico"]).pipe(gulp.dest("./dist/"));
      done();
    });
    gulp.task("copy:font", done => {
      gulp.src(["./src/font/**"]).pipe(gulp.dest("./dist/font"));
      done();
    });
    gulp.task("copy:vendor", done => {
      gulp.src(["./src/vendor/**"]).pipe(gulp.dest("./dist/vendor"));
      done();
    });
    gulp.task("copy:lib", done => {
      gulp.src(["./src/lib/**/dist/*.js","!./src/lib/**/node_modules/**/*.js"]).pipe(gulp.dest("./dist/js"));
      done();
    });
    gulp.task("copy:files", done => {
      gulp.src(["./src/files/**"]).pipe(gulp.dest("./dist/files"));
      done();
    });
    gulp.task("copy:php", done => {
      gulp.src(["./src/php/**"]).pipe(gulp.dest("./dist/php"));
      done();
    });
    gulp.task("copy:wordpress", done => {
      gulp.src(["./wordpress/themes/**"]).pipe(gulp.dest("./dist/wp-content/themes/template/"));
      gulp.src(["./wordpress/plugins/**"]).pipe(gulp.dest("./dist/wp-content/plugins/"));
      done();
    });
    gulp.task("copy", gulp.parallel("copy:favicon", "copy:font", "copy:lib","copy:vendor", "copy:files","copy:php", "copy:wordpress"));
  
      /**
     * プロジェクト構築時用テンプレートコピータスク
     */
    gulp.task("copy:template", done => {
      const metaJson = JSON.parse(fs.readFileSync("./meta.json"));
      Object.keys(metaJson.page).forEach(page => {
        if (!fileExist("./src/html/" + page + ".ejs")) {
          gulp
            .src(["./src/_template/html/index.ejs"])
            .pipe(
              rename(path => {
                path.basename = page;
              })
            )
            .pipe(gulp.dest("./src/html/"));
        }
        if (!fileExist("./src/css/" + page)) {
          gulp.src(["./src/_template/css/**"]).pipe(gulp.dest("./src/css/" + page + "/"));
        }
      });
      done();
    });
  }
}
export default new Copy();
