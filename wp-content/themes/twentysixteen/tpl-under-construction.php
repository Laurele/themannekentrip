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
<section id="primary" class="content-area">
    <header id="topbar">
        <div class="construction-content--socials">
            <ul class="construction-content--socials--list">
                <li class="construction-content--socials--list-item">
                    <a target="_blank" class="construction-content--socials--list-item-link" title="<?php echo pll__('View us on Facebook'); ?>" href="http://facebook.com/themannekentrip.be"><i class="icon-facebook"></i></a>
                </li>
<!--                <li class="construction-content--socials--list-item">-->
<!--                    <a target="_blank" class="construction-content--socials--list-item-link" title="--><?php //echo pll__('Follow us on Twitter'); ?><!--" href="http://twitter.com"><i class="icon-twitter"></i></a>-->
<!--                </li>-->
                <li class="construction-content--socials--list-item">
                    <a target="_blank" class="construction-content--socials--list-item-link" title="<?php echo pll__('Visualize us on Youtube'); ?>" href="https://www.youtube.com/channel/UCdBuvxropmqlWFnNBmBcU9g?guided_help_flow=3"><i class="icon-youtube"></i></a>
                </li>
            </ul>
        </div>
    </header>

    <main id="main" class="site-main" role="main">

            <header class="construction-header">
                <h1 class="construction-header--title">
                    <img src="<?php echo sprintf('%s/logo.png', getImageDirectory()); ?>" alt="<?php echo get_bloginfo('name'); ?>"/>
                </h1>
                <h2 class="construction-header--subtitle"><?php the_title(); ?></h2>
            </header>

            <section class="construction-content">
                <div class="construction-content--wysiwyg">
                    <?php the_content(); ?>
                </div>
            </section>

    </main><!-- .site-main -->

    <?php get_footer(); ?>
</section>
<!-- .content-area -->
