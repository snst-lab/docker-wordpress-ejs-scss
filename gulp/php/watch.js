import gulp from "gulp";
/**
 *  ファイルの監視
 */
class Watch {
  constructor() {
    gulp.task("watch:exceptjs", done => {
      gulp.watch(["./src/**/config.json"], gulp.series("build:json", "build:css"));
      gulp.watch(["./src/css/**/*.scss", "!./src/css/_config.scss"], gulp.series("build:css"));
      gulp.watch(["./src/**/meta.json"], gulp.series("build:html", "browserSync:reload"));
      gulp.watch(["./src/html/**/*.ejs"], gulp.series("build:html", "browserSync:reload"));
      gulp.watch(["./src/js/**/*.js"], gulp.series("browserSync:reload"));
      gulp.watch(["./src/img/*.+(jpg|jpeg|png|gif|svg)"], gulp.series("compress:image"));
      gulp.watch(["./src/php/**"], gulp.series("copy:php"));
      gulp.watch(["./src/files/**"], gulp.series("copy:files"));
      gulp.watch(["./src/lib/**/dist/*.js","!./src/lib/**/node_modules/**/*.js"], gulp.series("copy:lib"));
      gulp.watch(["./src/font/**"], gulp.series("copy:font"));
      gulp.watch(["./src/favicon.ico"], gulp.series("copy:favicon"));
      done();
    });
    gulp.task("watch",gulp.series(["watch:exceptjs","watch:js"]));
  }
}
export default new Watch();
