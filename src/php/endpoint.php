<?php
ini_set('display_errors', 0);
require_once("./sendmail.php");
require_once("./csv.php");

try {
    if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) or strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest')
        throw new \Exception(100); 

        
    //CSV書き出し（いらない場合はコメントアウト）
    // new \CSV\Write($_POST);
    
    //メール送信
    new \Mail\Send($_POST);


    http_response_code(200);
    exit;

} catch (\Exception $e) {
    echo $e;
    exit;
}
