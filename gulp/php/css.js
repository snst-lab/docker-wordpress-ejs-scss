import gulp from "gulp";
import rename from "gulp-rename";
import maps from "gulp-sourcemaps";
import prefix from "gulp-autoprefixer";
import plumber from "gulp-plumber";
import sass from "gulp-sass";
import jsonScss from "gulp-json-sass";
import browserSync from "browser-sync";

class Css {
  constructor() {
    /**
     * config.jsonからconfig.scssへ変数展開
     */
    gulp.task("build:json", done => {
      gulp
        .src(["./src/css/config.json"])
        .pipe(
          jsonScss({
            delim: "-",
            sass: false,
            ignoreJsonErrors: true,
            escapeIllegalCharacters: true,
            prefixFirstNumericCharacter: true,
            firstCharacter: "_"
          })
        )
        .pipe(rename("_config.scss"))
        .pipe(gulp.dest("./src/css/"));
      done();
    });
    /**
     * CSSのコンパイル
     */
    gulp.task("build:css", done => {
      gulp
        .src(["./src/css/**/*.scss"])
        .pipe(plumber())
        .pipe(maps.init())
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(prefix())
        .pipe(gulp.dest("./dist/css/"))
        .pipe(browserSync.stream());
      done();
    });
  }
}
export default new Css();
