<?php
namespace Mail;

class Send{

    function __construct($post)
    {
        //====================================
        //言語設定、内部エンコーディングを指定
        //====================================
        mb_language("Japanese");
        mb_internal_encoding("UTF-8");

        //====================================
        //パラメータ定義
        //====================================
        $this->MAIL_FROM = 'hoge@hoge.local';  //メール送信元アドレス
        $this->MAIL_TO = 'hoge@hoge.local';    //管理者メールアドレス
        $this->MAIL_CC = '';
        $this->MAIL_BCC = '';
        //====================================
       
        //管理者へのメール送信
        if(isset($this->MAIL_TO))
            $this->toAdmin($post);

        //お客さんへのメール送信
        if(isset($post['email']))
            $this->toCustomer($post);
    }
    

    private function toAdmin($post){
        $headers = 'From:' . $this->MAIL_FROM . "\r\n";
        if($this->MAIL_CC !== '')  $headers .='Cc:'. $this->MAIL_CC . "\r\n";
        if($this->MAIL_BCC !== '')  $headers .='Bcc:'. $this->MAIL_BCC . "\r\n";

        $to      =  $this->MAIL_TO;
        $subject = "「株式会社〇〇〇〇」のサイトからお問い合わせがありました";
        $message = "\n" .
            "以下の内容でお問い合わせがありました。" . "\n\n" .
            "------------------------" . "\n" .
            "ご用件" . "\n" .
            "　" . $post['subject'] . "\n\n" .
            "お名前" . "\n" .
            "　" . $post['name'] . "\n\n" .
            "郵便番号" . "\n" .
            "　" . $post['zip'] . "\n\n" .
            "ご住所" . "\n" .
            "　" . $post['address'] . "\n\n" .
            "メールアドレス" . "\n" .
            "　" . $post['email'] . "\n\n" .
            "お電話番号" . "\n" .
            "　" . $post['tel'] . "\n\n" .
            "お問い合わせ内容" . "\n" .
            "　" . $post['content'] . "\n" .
            "-------------------------" . "\n\n\n" ;
            
        if (!mb_send_mail($to, $subject, $message, $headers)) {
            echo '管理者へのメール送信が失敗しました';
            exit;
        }else{
            echo '管理者へのメール送信完了';
        }
    }


    private function toCustomer($post){
        $headers = 'From:' . $this->MAIL_FROM . "\r\n";

        $to      =  $post['email'];
        $subject = "[株式会社〇〇〇〇]お問い合わせありがとうございます";
        $message = "\n" .
            "お問い合わせいただき誠にありがとうございます。" . "\n\n" .
            "送信いただいた内容を確認の上、改めてご連絡いたします。いましばらくお待ちください。" . "\n\n" .
            "送信いただいた内容は以下の通りです。" . "\n\n" .
            "------------------------" . "\n" .
            "ご用件" . "\n" .
            "　" . $post['subject'] . "\n\n" .
            "お名前" . "\n" .
            "　" . $post['name'] . "\n\n" .
            "郵便番号" . "\n" .
            "　" . $post['zip'] . "\n\n" .
            "ご住所" . "\n" .
            "　" . $post['address'] . "\n\n" .
            "メールアドレス" . "\n" .
            "　" . $post['email'] . "\n\n" .
            "お電話番号" . "\n" .
            "　" . $post['tel'] . "\n\n" .
            "お問い合わせ内容" . "\n" .
            "　" . $post['content'] . "\n" .
            "-------------------------" . "\n\n\n" .
            "※このメールは「株式会社〇〇〇〇」のWebサイトから自動送信されたものです。" . "\n" .
            "お心当たりのない場合は、どなたかが誤って貴方のメールアドレスを入力した可能性がありますので、" . "\n" .
            "大変お手数ではございますが、下記TELまたはEmailまでご連絡ください。" . "\n\n" .
            "____________________________________________________________" . "\n\n" .
            "株式会社〇〇〇〇" . "\n" .
            "所在地／〒920-0000 石川県金沢市〇〇" . "\n" .
            "TEL／076-000-0000" . "\n" .
            "Email／hoge@hoge.com" . "\n" .
            "受付時間／9:00-18:00（土日祝休）" . "\n" .
            "____________________________________________________________"  . "\n";
            
        if (!mb_send_mail($to, $subject, $message, $headers)) {
            echo 'メール送信が失敗しました';
            exit;
        }else{
            echo 'メール送信完了';
            exit;
        }
    }
}
