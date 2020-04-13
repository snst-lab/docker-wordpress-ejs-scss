import gulp from "gulp";
import changed from "gulp-changed";
import imagemin from "gulp-imagemin";
import jpg from "imagemin-mozjpeg";
import png from "imagemin-pngquant";
import gif from "imagemin-gifsicle";
import svgmin from "gulp-svgmin";

/**
 * 画像ファイルの圧縮
 */
class Image {
  constructor() {
    gulp.task("compress:luster", done => {
      gulp
        .src("./src/img/**/*.+(jpg|jpeg|png|gif|ico)")
        .pipe(changed("./dist/img/"))
        .pipe(
          imagemin([
            png({
              quality: [0.65, 0.8],
              speed: 1,
              floyd: 0
            }),
            jpg({
              quality: 85,
              progressive: true
            }),
            gif({
              interlaced: false,
              optimizationLevel: 5,
              colors: 180
            }),
            imagemin.svgo(),
            imagemin.optipng(),
            imagemin.gifsicle()
          ])
        )
        .pipe(gulp.dest("./dist/img/"));
      done();
    });
    gulp.task("compress:svg", done => {
      gulp
        .src("./src/img/**/*.+(svg)")
        .pipe(changed("./dist/img/"))
        .pipe(svgmin())
        .pipe(gulp.dest("./dist/img/"));
      done();
    });
    gulp.task("compress:image", gulp.parallel("compress:luster", "compress:svg"));
  }
}
export default new Image();
