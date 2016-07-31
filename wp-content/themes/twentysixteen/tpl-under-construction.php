<?php /* Template Name: Under Construction Template */ ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js"<?php if (is_dev_environment()) : ?> data-env="dev"<?php endif; ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <?php if (is_singular() && pings_open(get_queried_object())) : ?>
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <?php endif; ?>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">

            <header>
                <h1><?php the_title(); ?></h1>
            </header>

            <section>
                <?php the_content(); ?>

                <div class="construction-socials">
                    <ul class="construction-socials--list">
                        <li class="construction-socials--list">
                            <a target="_blank" class="construction-socials--list-item" href="http://facebook.com"><?php echo pll__('View us on Facebook'); ?></a>
                        </li>
                        <li class="construction-socials--list">
                            <a target="_blank" class="construction-socials--list-item" href="http://twitter.com"><?php echo pll__('Follow us on Twitter'); ?></a>
                        </li>
                        <li class="construction-socials--list">
                            <a target="_blank" class="construction-socials--list-item" href="http://youtube.com"><?php echo pll__('Visualize us on Youtube'); ?></a>
                        </li>
                    </ul>
                </div>
            </section>

    </main><!-- .site-main -->

    <?php get_footer(); ?>
</div>
<!-- .content-area -->
