<?php
namespace CSV;
require_once("./cryptAES.php");

class Write
{
    function __construct($post)
    {
        //====================================
        //パラメータ定義
        //====================================
        $this->FILEPATH = 'data';
        $this->FILENAME = 'enquete.csv';
        $this->TITLE = "IP,City,Region,Country,Location,Organization,Postal,Timezone,subject,name,address,email,tel,content\n";
        $this->ENCRYPT = false; //CSVの暗号化を行うか
        $this->PASSWORD = "hoge"; //暗号化を行ったばあいの復号パスワード

        //ファイルパスがなければ作成
        if (!file_exists($this->FILEPATH)) {
            mkdir($this->FILEPATH, 0777, TRUE);
            chmod($this->FILEPATH, 0777);
        }

        //CSV書き出し
        if ($this->ENCRYPT) {
            new csvWriteSimple($this->FILEPATH . "/" . $this->FILENAME,  $this->TITLE, $this->PASSWORD, $post);
        } else {
            new csvWriteForExcel($this->FILEPATH . "/" . $this->FILENAME, $this->TITLE, $post);
        }
    }
}


class csvWriteSimple
{
    /**
     * @param string $filename ファイル名
     * @throws RuntimeException
     */
    public function __construct($filename, $json, $title, $password)
    {
        $this->aes = new \Crypt\AES(null);
        $this->fp = fopen($filename, 'a');

        if (filesize($filename) < 2) {
            $this->init($title, $password);
        }
        $this->run($json, $password);
    }

    private function init($title, $password)
    {
        if (!isset($password)) {
            $line = $title;
        } else {
            $line = $this->aes->encrypt($title, $password);
        }
        fwrite($this->fp, $line . "\n");
    }


    private function run($json, $password)
    {
        $csv = "";
        foreach ($json as $key => $val) {
            $csv = $csv . $val . "\t";
        }

        if (!isset($password)) {
            $line =  $csv;
        } else {
            $line =  $this->aes->encrypt($csv, $password);
        }
        fwrite($this->fp, $line . "\n");
        fclose($this->fp);
    }
}


/**
 * Excel互換のCSVに特化したSplFileObjectのラッパー
 */
class csvWriteForExcel extends \SplFileObject
{
    private $position = 0;
    private $current;

    /**
     * @param string $filename ファイル名
     * @throws RuntimeException
     */
    public function __construct($filename, $json, $title)
    {
        parent::__construct("php://filter/read=convert.iconv.utf-16le%2Futf-8/write=convert.iconv.utf-8%2Futf-16le/resource=$filename", 'a+b');
        $this->setFlags(
            \SplFileObject::READ_CSV |
                \SplFileObject::SKIP_EMPTY |
                \SplFileObject::READ_AHEAD |
                \SplFileObject::DROP_NEW_LINE
        );
        $this->aes = new \Crypt\AES(null);

        $this->setCsvControl("\t");
        if (filesize($filename) < 2) {
            $this->flock(LOCK_EX);
            $this->fwrite("\xEF\xBB\xBF" . $title);
            $this->flock(LOCK_UN);
            clearstatcache();
        }
        $this->rewind();
        $this->write($json);
    }

    private function write($json)
    {
        // 排他ロックのあと1行ずつファイルに書き込む
        $this->flock(LOCK_EX);
        $this->fputcsv($json);
        // 共有ロックに切り替えて1行ずつ取り出す
        $this->flock(LOCK_SH);
        foreach ($this as $row) {
            var_dump($row);
        }
    }
    /**
     * @return string|null
     */
    public function current()
    {
        return $this->current;
    }

    /**
     * @return int
     */
    public function key()
    {
        return $this->position;
    }

    /**
     * @return null
     */
    public function next()
    {
        $this->current = $this->fgetcsv();
        ++$this->position;
    }

    /**
     * @return null
     */
    public function rewind()
    {
        $this->fseek(2);
        $this->position = 0;
        $this->current = $this->fgetcsv();
    }

    /**
     * @return bool
     */
    public function valid()
    {
        return $this->current !== null;
    }
}
