import gulp from "gulp";
import shell from "child_process";
/**
 * JSのトランスパイル＆バンドル
 */
class Js {
  constructor() {
    gulp.task("build:js", done => {
      const proc = shell.exec("webpack --mode production");
      proc.stdout.on("data", data => {
        console.log(data);
      });
      proc.stderr.on("data", data => {
        console.log(data);
      });
      proc.on("error", err => {
        console.log(err);
        done();
      });
      proc.on("close", (code, signal) => {
        done();
      });
    });
    gulp.task("watch:js", done => {
      const proc = shell.exec("webpack --watch");
      proc.stdout.on("data", data => {
        console.log(data);
      });
      proc.stderr.on("data", data => {
        console.log(data);
      });
      proc.on("error", err => {
        console.log(err);
        done();
      });
      proc.on("close", (code, signal) => {
        done();
      });
    });
  }
}
export default new Js();

