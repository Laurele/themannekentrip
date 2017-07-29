<?php /* Template Name: Blog Template */ ?>

<?php get_header(); ?>

    <!--BEGIN #primary .hfeed-->
    <div id="primary" class="hfeed">
        <h1><?php echo pll__('Blog'); ?></h1>

        <?php
        $my_slug = 'blog_post';
        $args = array('post_type' => $my_slug, 'numberposts' => -1);
        $my_posts = get_posts($args);

        foreach ($my_posts as $post) : setup_postdata($post); ?>
            <?php zilla_post_before(); ?>
            <!--BEGIN .hentry -->
            <div <?php post_class(); ?> id="post-<?php the_ID(); ?>">
                <?php zilla_post_start(); ?>
                <?php
                $format = get_post_format();
                if (false === $format) {
                    $format = 'standard';
                }
                ?>

                <!--BEGIN .entry-meta .entry-icon-->
                <div class="<?php echo $format === 'standard' ? 'format-quote' : $format; ?> entry-meta entry-icon">
                    <!--END .entry-meta entry-icon -->
                </div>
                <?php get_template_part('content-post', $format); ?>
                <?php zilla_post_end(); ?>
                <!--END .hentry-->
            </div>
            <?php zilla_post_after(); ?>
        <?php endforeach; ?>
    </div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>