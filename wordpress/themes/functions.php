<?php
add_theme_support('post-thumbnails');

//-------------------------------------------------------------------------
// いらないメタタグ消す
//-------------------------------------------------------------------------

// WordPressのバージョンを非表示にする
remove_action('wp_head', 'wp_generator');

// 前の文書と次の文書へのリンクを非表示にする
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');

// リモート投稿をする時に使うタグを非表示にする
remove_action('wp_head', 'rsd_link');

// リモート投稿をする時に使うタグを非表示にする
remove_action('wp_head', 'wlwmanifest_link');

// WordPressの投稿IDを使った短いURLを非表示にする
remove_action('wp_head', 'wp_shortlink_wp_head');

//簡単に引用表示に使うを非表示にするタグをを非表示にする
remove_action('wp_head', 'rest_output_link_wp_head');

//簡単に引用表示に使うを非表示にするタグをを非表示にする
remove_action('wp_head', 'wp_oembed_add_discovery_links');

//絵文字用のコードを非表示にする
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_styles', 'print_emoji_styles');


// ページネーション rel="index" 削除
remove_action('wp_head', 'index_rel_link');

//フィードタグ
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);



//-------------------------------------------------------------------------
//バージョンアップ通知を非表示にします。
//-------------------------------------------------------------------------
// ダッシュボードのWPバージョン更新メッセージ非表示
function update_nag_hide() {
    remove_action( 'admin_notices', 'update_nag', 3 );
    remove_action( 'admin_notices', 'maintenance_nag', 10 );
}
add_action( 'admin_init', 'update_nag_hide' );

// PHPバージョン警告消去(CSS)
function my_admin_style() {
  echo '<style>
  #dashboard_php_nag{display:none;}
  </style>'.PHP_EOL;
}
add_action('admin_print_styles', 'my_admin_style');

// サイドメニュー更新バッジアイコン非表示
function remove_menus() {
remove_submenu_page('index.php','update-core.php');//ダッシュボード>更新
}
add_action('admin_menu','remove_menus');
//バージョンアップ通知を非表示にします。ここまで


//-------------------------------------------------------------------------
// conosle_logの定義
//-------------------------------------------------------------------------
function console_log($data)
{
    echo '<script>';
    echo 'console.log(' . json_encode($data) . ')';
    echo '</script>';
}


//-------------------------------------------------------------------------
// スマートフォンを判別
//-------------------------------------------------------------------------
function is_mobile()
{
    $useragents = array(
        'iPhone', // iPhone
        'iPod', // iPod touch
        'Android.*Mobile', // 1.5+ Android *** Only mobile
        'Windows.*Phone', // *** Windows Phone
        'dream', // Pre 1.5 Android
        'CUPCAKE', // 1.5+ Android
        'blackberry9500', // Storm
        'blackberry9530', // Storm
        'blackberry9520', // Storm v2
        'blackberry9550', // Storm v2
        'blackberry9800', // Torch
        'webOS', // Palm Pre Experimental
        'incognito', // Other iPhone browser
        'webmate' // Other iPhone browser

    );
    $pattern = '/' . implode('|', $useragents) . '/i';
    return preg_match($pattern, $_SERVER['HTTP_USER_AGENT']);
}


/*-------------------------------------------*/
/*  カスタム画像サイズ定義
/*-------------------------------------------*/

function add_custom_image_sizes()
{
    global $my_custom_image_sizes;
    $my_custom_image_sizes = array(
        // 'メインビジュアル' => array(
        //     'name'       => 'mainv', // 選択肢のラベル名
        //     'width'      => 1920,    // 最大画像幅をpxで設定
        //     'height'     => 700,    // 最大画像高さをpxで設定
        //     'crop'       => true,  // 切り抜きを行うならtrue, 行わないならfalse
        //     'selectable' => true   // 選択肢に含めるならtrue, 含めないならfalse
        // ),
        // 'トップスライドPC' => array(
        //     'name'       => 'topslidePC', // 選択肢のラベル名
        //     'width'      => 1500,    // 最大画像幅をpxで設定
        //     'height'     => 620,    // 最大画像高さをpxで設定
        //     'crop'       => true,  // 切り抜きを行うならtrue, 行わないならfalse
        //     'selectable' => true   // 選択肢に含めるならtrue, 含めないならfalse
        // ),
        // 'トップスライドSP' => array(
        //     'name'       => 'topslideSP', // 選択肢のラベル名
        //     'width'      => 767,    // 最大画像幅をpxで設定
        //     'height'     => 700,    // 最大画像高さをpxで設定
        //     'crop'       => true,  // 切り抜きを行うならtrue, 行わないならfalse
        //     'selectable' => true   // 選択肢に含めるならtrue, 含めないならfalse
        // ),
        // 'サムネイル小' => array(
        //     'name'       => 'thumb_small', // 選択肢のラベル名
        //     'width'      => 240,    // 最大画像幅をpxで設定
        //     'height'     => 160,    // 最大画像高さをpxで設定
        //     'crop'       => true,  // 切り抜きを行うならtrue, 行わないならfalse
        //     'selectable' => true   // 選択肢に含めるならtrue, 含めないならfalse
        // ),
        'サムネイル' => array(
            'name'       => 'thumb', // 選択肢のラベル名
            'width'      => 360,    // 最大画像幅をpxで設定
            'height'     => 240,    // 最大画像高さをpxで設定
            'crop'       => true,  // 切り抜きを行うならtrue, 行わないならfalse
            'selectable' => true   // 選択肢に含めるならtrue, 含めないならfalse
        ),
        // '宣材写真' => array(
        //     'name'       => 'photo', // 選択肢のラベル名
        //     'width'      => 630,    // 最大画像幅をpxで設定
        //     'height'     => 420,    // 最大画像高さをpxで設定
        //     'crop'       => true,  // 切り抜きを行うならtrue, 行わないならfalse
        //     'selectable' => true   // 選択肢に含めるならtrue, 含めないならfalse
        // )
    );
    foreach ($my_custom_image_sizes as $slug => $size) {
        add_image_size($slug, $size['width'], $size['height'], $size['crop']);
    }
}
add_action('after_setup_theme', 'add_custom_image_sizes');



function add_custom_image_size_select($size_names)
{
    global $my_custom_image_sizes;
    $custom_sizes = get_intermediate_image_sizes();
    foreach ($custom_sizes as $custom_size) {
        if (isset($my_custom_image_sizes[$custom_size]['selectable']) && $my_custom_image_sizes[$custom_size]['selectable']) {
            $size_names[$custom_size] = $my_custom_image_sizes[$custom_size]['name'];
        }
    }
    return $size_names;
}
add_filter('image_size_names_choose', 'add_custom_image_size_select');


/*-------------------------------------------*/
/* 　パーマリンク英語表示
/*-------------------------------------------*/

function auto_post_slug($slug, $post_ID, $post_status, $post_type)
{

    if ($post_type == "voice") {
        $slug = $post_ID;
    }
    return $slug;
}
add_filter('wp_unique_post_slug', 'auto_post_slug', 10, 4);


/*-------------------------------------------*/
/* 　カスタムフィールドもプレビューできるようにする
/*-------------------------------------------*/
function get_preview_id($postId)
{
    global $post;
    $previewId = 0;
    if (
        isset($_GET['preview'])
        && ($post->ID == $postId)
        && $_GET['preview'] == true
        && ($postId == url_to_postid($_SERVER['REQUEST_URI']))
    ) {
        $preview = wp_get_post_autosave($postId);
        if ($preview != false) {
            $previewId = $preview->ID;
        }
    }
    return $previewId;
}




/*-------------------------------------------*/
/* 　オプションページを有効化
/*-------------------------------------------*/

if (function_exists('acf_add_options_page')) {
    //   acf_add_options_page(array(
    //       'page_title' => 'トップスライド',
    //       'menu_title' => 'トップスライド',
    //       'menu_slug' => 'option_slide',
    //       'post_id' => 'option_slide',
    //       'icon_url' => 'dashicons-format-gallery',
    //       'position' => 31
    //   ));

    //   acf_add_options_page(array(
    //       'page_title' => 'バナー管理',
    //       'menu_title' => 'バナー管理',
    //       'menu_slug' => 'option_sidebar',
    //       'post_id' => 'option_sidebar',
    //       'icon_url' => 'dashicons-images-alt',
    //       'position' => 32
    //   ));
}


/* ---------------------------------------------------------------------------
 TinyMCE Advanced 設定
--------------------------------------------------------------------------- */
function custom_editor_settings($initArray)
{

    $initArray['body_class'] = 'entory';

    //フォーマット指定
    $style_formats = array(
        array(
            'title' => 'テーブルセル(青)',
            'selector' => 'td',
            'classes' => 'th'
        ),
        array(
            'title' => '太字',
            'inline' => 'b',
            'classes' => 'bold'
        ),
        array(
            'title' => '太字+黄色マーカー',
            'block' => 'strong',
            'classes' => ''
        ),
        array(
            'title' => '背景色 グレー',
            'block' => 'div',
            'classes' => 'bg-gray'
        ),
        array(
            'title' => '枠 グレー',
            'block' => 'div',
            'classes' => 'border-gray'
        )
    );
    $initArray['style_formats'] = json_encode($style_formats);
    $initArray['style_formats_merge'] = false;
    return $initArray;
}
add_filter('tiny_mce_before_init', 'custom_editor_settings');


//エディタ用CSSファイル追加
add_action('admin_init', function () {
    add_editor_style("/css/editor-style.css");
});


/*-------------------------------------------*/
/* 　カスタム投稿タイプの記事編集画面にメタボックス（作成者変更）を表示する
/*-------------------------------------------*/
/* admin_menu アクションフックでカスタムボックスを定義 */
add_action('admin_menu', 'myplugin_add_custom_box');

/* 投稿ページの "advanced" 画面にカスタムセクションを追加 */
function myplugin_add_custom_box()
{
    if (function_exists('add_meta_box')) {
        add_meta_box('myplugin_sectionid', __('作成者', 'myplugin_textdomain'), 'post_author_meta_box', 'voice', 'advanced');
    }
}

/*-------------------------------------------*/
/* 　カスタム投稿タイプの記事一覧に投稿者の項目を追加する
/*-------------------------------------------*/

function manage_books_columns($columns)
{
    global $post;
    if (get_post_type($post) == 'voice') {

        $columns = array();
        $columns["cb"] = '<input type="checkbox" />';
        $columns["title"] = 'タイトル';
        $columns["author"] = '作成者';
        //$columns["addcat"] = 'カテゴリー';        
        $columns["date"] = '日付';
    }
    return $columns;
}



/*-------------------------------------------*/
/* 　関連記事の調整
/*-------------------------------------------*/

add_filter('acf/fields/relationship/query', 'custom_acf_relationship_query', 10, 3);
function custom_acf_relationship_query($args, $field, $post_id)
{
    $args['orderby'] = 'post_date'; //投稿日付順
    $args['order'] = 'DESC'; //新しい順
    return $args;
}

/*-------------------------------------------*/
/* 　カテゴリーをチェックした時の位置を固定
/*-------------------------------------------*/

add_filter('wp_terms_checklist_args', 'ps_wp_terms_checklist_args', 10, 2);
function ps_wp_terms_checklist_args($args, $post_id)
{

    if ($args['checked_ontop'] !== false) {
        $args['checked_ontop'] = false;
    }

    return $args;
}




//-------------------------------------------------------------------------
// デフォルトのエディタ部分を非表示
//-------------------------------------------------------------------------
add_action('init', function () {
    remove_post_type_support('post', 'editor');
});

function disable_visual_editor_in_page()
{
    global $typenow;
    $post_id = $_GET['post'];
    if ($typenow == 'page') {
        if (in_array($post_id, array('15', '15'), true)) {
            $hide_postdiv_css = '<style type="text/css">#postdiv, #postdivrich { display: none; }</style>';
            echo $hide_postdiv_css;
        }
    }
}
add_action('load-post.php', 'disable_visual_editor_in_page');
add_action('load-post-new.php', 'disable_visual_editor_in_page');


//-------------------------------------------------------------------------
// カスタム投稿タイプの定義
//-------------------------------------------------------------------------

add_action('init', function ($query) {
    register_post_type('voice', array( // 投稿タイプ名の定義
        'labels' => array(
            'name'          => 'お客様の声', // 管理画面上で表示する投稿タイプ名
            'singular_name' => 'voice',    // カスタム投稿の識別名
        ),
        'public'        => true,  // 投稿タイプをpublicにするか
        'has_archive'   => true, // アーカイブ機能ON/OFF
        'menu_position' => 5,     // 管理画面上での配置場所
        'show_in_rest' => false, // 5系から出てきた新エディタ「Gutenberg」を無効にする
        'rewrite' => array('with_front' => false),
        'supports' => array('title','editor','thumbnail') //タイトル、エディタ、アイキャッチ画像をサポート
    ));
    //カテゴリ`機能を追加
    // register_taxonomy_for_object_type('category', 'voice');
});



//-------------------------------------------------------------------------
// ダッシュボードメニューの並び替え
//-------------------------------------------------------------------------
function custom_menu_order($menu_ord)
{
    if (!$menu_ord) return true;
    return array(
        'index.php', // ダッシュボード
        'separator1', // 仕切り
        'upload.php', // メディア
        'separator2', // 仕切り
        'edit.php?post_type=voice', // posttype01ページ
        'separator-last', // 仕切り
    );
}
add_filter('custom_menu_order', 'custom_menu_order');
add_filter('menu_order', 'custom_menu_order');



//-------------------------------------------------------------------------
// 詳細ページのナビゲーションに任意のクラス名をつける
//-------------------------------------------------------------------------
add_filter('previous_post_link', 'add_prev_post_link_class');
function add_prev_post_link_class($output)
{
    return str_replace('<a href=', '<a class="prev" href=', $output);
}
add_filter('next_post_link', 'add_next_post_link_class');
function add_next_post_link_class($output)
{
    return str_replace('<a href=', '<a class="next" href=', $output);
}


//-------------------------------------------------------------------------
// 編集者の権限を設定
//-------------------------------------------------------------------------
$role = get_role('editor');
$role->add_cap('manage_options');

function remove_admin_setting_menus_editor_role()
{
    remove_menu_page('edit.php'); // デフォルトの「投稿」を非表示
    remove_menu_page('edit.php?post_type=page'); // デフォルトの「固定ページ」を非表示
    remove_menu_page('edit-comments.php');          // コメント

    if (current_user_can('editor')) {
    remove_menu_page('themes.php');                 // 外観
    remove_menu_page('plugins.php');                // プラグイン
    remove_menu_page('users.php');                  // ユーザー
    remove_menu_page('tools.php'); // ツール
    remove_menu_page('edit.php?post_type=acf-field-group');          // ACF
    remove_menu_page('options-general.php'); // 投稿設定を非表示

    remove_submenu_page('options-general.php', 'options-writing.php'); // 投稿設定を非表示
    remove_submenu_page('options-general.php', 'options-reading.php'); // 表示設定を非表示
    remove_submenu_page('options-general.php', 'options-discussion.php'); // ディスカッション設定を非表示
    remove_submenu_page('options-general.php', 'options-media.php'); // メディア設定を非表示
    remove_submenu_page('options-general.php', 'options-permalink.php'); // パーマリンク設定を非表示
    remove_submenu_page('options-general.php', 'privacy.php'); // プライバシー設定を非表示
    // 上記コードで非表示になるがURLを知っていればアクセス可能なのでリダイレクトさせる
    global $pagenow;
    if (in_array($pagenow, array(

        'edit-comments.php',
        'themes.php',
        'plugins.php',
        'users.php',
        'tools.php',
        'edit.php?post_type=acf-field-group',
        'options-writing.php',
        'options-reading.php',
        'options-discussion.php',
        'options-media.php',
        'options-permalink.php',
    )))
        wp_redirect('index.php');
    }
}
add_action('admin_menu', 'remove_admin_setting_menus_editor_role');



//-------------------------------------------------------------------------
// サムネイルURL取得用関数
//-------------------------------------------------------------------------
function thumb($post){
    $thumb = get_the_post_thumbnail_url( $post->ID, "thumb");
    $image_url = $thumb;
    
    if (!$image_url) {
      // アイキャッチ用画像の指定が無い場合は投稿内の最初の画像を取得
      $first_image = '/<img.*?src=(["\'])(.+?)\1.*?>/i';
      preg_match($first_image, $post->post_content, $image);
      $image_url = $image[2];
    }
    if (!$image_url) {
      // 投稿内の最初の画像もない場合は初期画像を使用
      $image_url = '/img/favicon/icon-192x192.png';
    }
    return $image_url;
}


// /*
// * Basic認証
// */
function basic_auth($auth_list,$realm="Restricted Area",$failed_text="認証に失敗しました"){ 
    if (isset($_SERVER['PHP_AUTH_USER']) and isset($auth_list[$_SERVER['PHP_AUTH_USER']])){
        if ($auth_list[$_SERVER['PHP_AUTH_USER']] == $_SERVER['PHP_AUTH_PW']){
            return $_SERVER['PHP_AUTH_USER'];
        }
    }
    header('WWW-Authenticate: Basic realm="'.$realm.'"');
    header('HTTP/1.0 401 Unauthorized');
    header('Content-type: text/html; charset='.mb_internal_encoding());
 
    die($failed_text);
}


if($_GET['page_id']==3){
// basic_auth(array("lemon" => "tea")); 
}

