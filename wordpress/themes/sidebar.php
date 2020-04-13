<?php
    $basename = "news";

    //----------------------------
    //　年月別オブジェクトの取得
    //----------------------------
    $myArchive = $wpdb->get_results("SELECT DISTINCT MONTH( post_date ) AS month ,
      YEAR( post_date ) AS year,
      COUNT( id ) as post_count FROM $wpdb->posts
      WHERE post_status = 'publish'
      and post_type = '$basename'
      GROUP BY year,month
      ORDER BY post_date DESC
    ");
    $archives = array();
    $year_total = array(); 
    foreach($myArchive as $archive){
      $archives[$archive->year][] = array('month'=>$archive->month, 'count'=>$archive->post_count);
      $year_total[$archive->year] += $archive->post_count;
    }


    //----------------------------
    //　カテゴリオブジェクトの取得
    //----------------------------
    $myCats = get_categories( 
      array(
      'hide_empty'=> 1,
      'pad_counts'=> true,
      'exclude'=> 1 
    ));

    $cats = array();
    foreach($myCats as $cat){
      if($cat->category_parent>1){
        $cats[$cat->category_parent]['child'][$cat->cat_ID]['name'] = $cat->name;
        $cats[$cat->category_parent]['child'][$cat->cat_ID]['count'] = $cat->count;
      }else{
        $cats[$cat->cat_ID]['name'] =$cat->name;
        $cats[$cat->cat_ID]['count'] =$cat->count;
      }
    }

?>
  

<article class="archive">
    <section class="month">
        <h3 class="ttl">
            <b>ARCHIVE</b>
            <small>
                月別アーカイブ
            </small>
        </h3>
        <?php foreach ($archives as $year => $obj) : ?>
            <dl>
                <dt class="click"><?= $year ?>(<?= $year_total[$year] ?>)</dt>
                <dd>
                    <?php foreach ($obj as $val) : ?>
                        <a href="/<?= $basename ?>/?y=<?= $year ?>&mon=<?= $val['month'] ?>">
                            <?= $val['month'] ?>月(<?= $val['count'] ?>)
                        </a>
                    <?php endforeach; ?>
                </dd>
            </dl>
        <?php endforeach; ?>
    </section>

    <div class="separator"></div>

    <section class="category">
        <h3 class="ttl">
            <b>CATEGORY</b>
            <small>カテゴリー</small>
        </h3>
        <?php foreach ($cats as $key => $parent) : ?>
            <dl>
                <?php if (!isset($parent['child'])) : ?>
                    <dt>
                        <a href="/<?= $basename ?>/?cat=<?= $key ?>">
                            <?= $parent['name'] ?> (<?= $parent['count'] ?>)
                        </a>
                    </dt>
                <?php else : ?>
                    <dt class="click">
                        <?= $parent['name'] ?> (<?= $parent['count'] ?>)
                    </dt>
                    <dd>
                        <?php foreach ($parent['child'] as $id => $child) : ?>
                            <a href="/<?= $basename ?>/?cat=<?= $id ?>"><?= $child['name'] ?> (<?= $child['count'] ?>)</a>
                        <?php endforeach; ?>
                    </dd>
                <?php endif; ?>
            </dl>
        <?php endforeach; ?>
    </section>
</article>