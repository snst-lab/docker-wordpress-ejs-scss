import gulp from "gulp";
import shell from "child_process";
/**
 * 起動中のDockerコンテナ停止 & docker-composeによるサーバ起動
 */
class Docker {
  constructor() {
    gulp.task("docker:stop", done => {
      const proc = shell.exec("docker ps -aq | xargs docker stop");
      proc.stdout.on("data", data => {
        console.log(data);
      });
      proc.stderr.on("data", data => {
        console.log(data);
      });
      proc.on("error", err => {
        console.log(err);
      });
      proc.on("close", (code, signal) => {
        done();
      });
    });
    gulp.task("docker:start", done => {
      const proc = shell.exec("docker-compose -f ./docker/docker-compose.nginx-php.yml up -d ");
    
      proc.stdout.on("data", data => {
        console.log(data);
      });
      proc.stderr.on("data", data => {
        console.log(data);
      });
      proc.on("error", err => {
        console.log(err);
      });
      proc.on("close", (code, signal) => {
        done();
      });
    });
    gulp.task("docker:restart", gulp.series("docker:stop", "docker:start"));
  }
}
export default new Docker();