import gulp from "gulp";
import "./docker";
import "./copy";
import "./js";
import "./ejs";
import "./image";
import "./css";
import "./browserSync";
import "./watch";
import "./clean";



/**
 *  作業開始時 - サーバ再起動 & BrowserSync再起動 & ファイル監視開始
 */
gulp.task("default", gulp.series("docker:restart","browserSync:init", "watch"));

/**
 *  サーバ停止
 */
gulp.task("down", gulp.series("docker:stop"));

/**
 *  再コンパイル - `ファイルのビルド
 */
gulp.task("build", gulp.series("copy", "compress:image", "build:html", "build:css", "build:js"));


/**
 *  テンプレート切替時 - 配布ディレクトリの削除　& Docker起動 & テンプレートファイルのコピー & ファイルのビルド
 */
gulp.task("replace", gulp.series("clean", "docker:restart",  "build"));

/**
 *  サイト生成 -  テンプレートファイルのコピー & 配布ディレクトリの削除　& ファイルのビルド
 */
gulp.task("init", gulp.series("copy:template",  "replace"));
