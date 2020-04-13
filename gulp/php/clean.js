import gulp from "gulp";
import del from "del";
/**
 * ディレクトリの掃除
 */
class Clean {
  constructor() {
    gulp.task("clean", done => {
      del(["./dist/**"]);
      done();
    });
  }
}
export default new Clean();
