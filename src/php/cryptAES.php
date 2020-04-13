<?php
namespace Crypt;

/**
 * ### \Crypt\AES aes-cbcによる暗号処理のクラス
 * @param {string} password パスワード
 */
class AES{
    protected $encryptMethod;
    
    /**
     * @var string method  AES-128-CBC, AES-192-CBC, AES-256-CBC推奨
     */
    function __construct($method){
        if(isset($method)) $this->encryptMethod =  $method;
        else  $this->encryptMethod =  'AES-256-CBC';
    }
    
    /**
     * 文字列を暗号化
     * 
     * @param string $string 暗号化前の文字列.
     * @param string $key キー.
     * @return string Return 暗号化後の文字列.
     */
    public function encrypt($string, $key)
    {
        $ivLength = openssl_cipher_iv_length($this->encryptMethod);
        $iv = openssl_random_pseudo_bytes($ivLength);
        $salt = openssl_random_pseudo_bytes(256);
        $iterations = 999;

        $hashKey = hash_pbkdf2('sha512', $key, $salt, $iterations, ($this->encryptMethodLength() / 4));
        $encryptedString = base64_encode(openssl_encrypt($string, $this->encryptMethod, hex2bin($hashKey), OPENSSL_RAW_DATA, $iv));
        unset($hashKey);
        $output = ['ciphertext' => $encryptedString, 'iv' => bin2hex($iv), 'salt' => bin2hex($salt)];
        unset($encryptedString, $iterations, $iv, $ivLength, $salt);
        echo json_encode($output)."\n";
        return base64_encode(json_encode($output));
    }// encrypt


    /**
     * 文字列を復号化
     * 
     * @param string $encryptedString base64エンコードされた文字列.
     * @param string $key キー.
     * @return mixed Return　復号化された文字列. 不正なsalt, ivの場合はnullを返す.
     */
    public function decrypt($encryptedString, $key)
    {
        $json = json_decode(base64_decode($encryptedString), true);
        try {
            $salt = hex2bin($json["salt"]);
            $iv = hex2bin($json["iv"]);
        } catch (\Exception $e) {
            return null;
        }
        $cipherText = base64_decode($json['ciphertext']);
        $iterations = 999;
        $hashKey = hash_pbkdf2('sha512', $key, $salt, $iterations, ($this->encryptMethodLength() / 4));

        unset($iterations, $json, $salt);
        $decrypted= openssl_decrypt($cipherText , $this->encryptMethod, hex2bin($hashKey), OPENSSL_RAW_DATA, $iv);
        unset($cipherText, $hashKey, $iv);
        return $decrypted;
    }// decrypt


    /**
     * 暗号化長を取得 (128, 192, 256).
     * 
     * @return integer.
     */
    protected function encryptMethodLength()
    {
        $number = filter_var($this->encryptMethod, FILTER_SANITIZE_NUMBER_INT);
        return intval(abs($number));
    }// encryptMethodLength
    
    
    /**
     * 暗号化の方法を設定
     * 
     * @param string $cipherMethod
     */
    public function setCipherMethod($cipherMethod)
    {
        $this->encryptMethod = $cipherMethod;
    }// setCipherMethod
}
?>