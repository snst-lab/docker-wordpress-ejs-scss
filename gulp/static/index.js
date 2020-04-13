import gulp from "gulp";
import "./copy";
import "./js";
import "./ejs";
import "./image";
import "./css";
import "./browserSync";
import "./watch";
import "./clean";


/**
 *  作業中 - BrowserSync再起動 & ファイル監視開始
 */
gulp.task("default", gulp.series("browserSync:init", "watch"));

/**
 *  作業開始時 - サーバ再起動 & BrowserSync再起動 & ファイル監視開始
 */
gulp.task("up", gulp.series("default"));

/**
 *  再コンパイル - `ファイルのビルド
 */
gulp.task("build", gulp.series("copy", "compress:image", "build:html", "build:css", "build:js"));

/**
 *  テンプレート切替時 - 配布ディレクトリの削除　& ファイルのビルド
 */
gulp.task("replace", gulp.series("clean",  "build"));

/**
 *  サイト生成 -  テンプレートファイルのコピー & 配布ディレクトリの削除　& ファイルのビルド
 */
gulp.task("init", gulp.series("copy:template",  "replace"));

