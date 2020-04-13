/**
 * # 環境変数読み込み
 */
import env from "node-env-file";
env(".env");

/**
 *  # envファイルで指定したテンプレート名に応じて、異なるgulpfile群を呼び出す
 *  ### wordpress ワードプレス案件
 *  ### php PHP案件
 *  ### static 静的ページ案件
 */
switch (process.env.TEMPLATE) {
  case "wordpress":
    exports.wordpress = require('./gulp/wordpress');
    break;
  case "php":
    exports.php = require('./gulp/php');
    break;
  default:
    exports.static = require('./gulp/static');
    break;
}
