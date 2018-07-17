<?php /* Template Name: News Template */ ?>

<?php get_header(); ?>

    <div id="primary" class="hfeed">
        <h1><?php echo pll__('News'); ?></h1>

        <?php
        $my_slug = 'news_post';
        $args = array('post_type' => $my_slug, 'numberposts' => -1);
        $my_posts = get_posts($args);

        foreach ($my_posts as $post) : setup_postdata($post); ?>
            <?php zilla_post_before(); ?>
            <div <?php post_class(); ?> id="post-<?php the_ID(); ?>">
                <?php zilla_post_start(); ?>
                <?php
                    $format = get_post_format();
                    if (false === $format) {
                        $format = 'standard';
                    }
                ?>

                <div class="<?php echo $format === 'standard' ? 'format-aside' : $format; ?> entry-meta entry-icon"></div>
                <?php get_template_part('content-post', $format); ?>

                <div class="template-news-gallery">
                    <?php $gallerie_relation = get_field('gallerie_relation'); ?>
                    <?php if ($gallerie_relation) : ?>
                    <?php
                        global $post;
                        $post = get_post( $gallerie_relation->ID, OBJECT );
                        setup_postdata( $post );

                        get_template_part('content-post', 'gallery_post');
                        wp_reset_postdata();
                    ?>
                    <?php endif; ?>
                    </div>

                <?php zilla_post_end(); ?>
            </div>
            <?php zilla_post_after(); ?>
        <?php endforeach; ?>
    </div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>