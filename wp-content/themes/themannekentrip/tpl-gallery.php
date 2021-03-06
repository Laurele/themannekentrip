<?php /* Template Name: Gallery Template */ ?>

<?php get_header(); ?>

    <div id="primary" class="hfeed">
        <h1><?php the_title(); ?></h1>

        <?php
        $my_slug = 'gallery_post';
        $args = array('post_type' => $my_slug, 'numberposts' => -1);
        $my_posts = get_posts($args);

        foreach ($my_posts as $post) : setup_postdata($post); ?>
            <?php zilla_post_before(); ?>
            <div <?php post_class(); ?> id="post-<?php the_ID(); ?>">
                <?php zilla_post_start(); ?>

                <div class="format-gallery entry-meta entry-icon"></div>

                <?php get_template_part('content-post', 'gallery_post'); ?>

                <?php zilla_post_end(); ?>
            </div>
            <?php zilla_post_after(); ?>
        <?php endforeach; ?>
    </div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>