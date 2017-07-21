<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js"<?php if (is_dev_environment()) : ?> data-env="dev"<?php endif; ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<section id="primary" class="content-area" data-view="navigation.main">
	<header id="topbar">
		<?php twentysixteen_the_custom_logo(); ?>

		<?php if ( is_front_page() && is_home() ) : ?>
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
		<?php else : ?>
		    <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
		<?php endif; ?>

        <?php if ( has_nav_menu( 'primary' ) || has_nav_menu( 'social' ) ) : ?>
            <button id="menu-toggle" class="menu-toggle" title="<?php _e( 'Menu', 'twentysixteen' ); ?>" data-el="topbar-menu-toggle"><i class="icon-align-justify"></i></button>
        <?php endif; ?>

    </header>

    <?php if ( has_nav_menu( 'primary' ) || has_nav_menu( 'social' ) ) : ?>

    <div id="site-aside-menu" class="site-aside-menu" data-el="site-aside-menu">
        <div class="site-aside-content">
            <div class="site-aside-content-centered">
                <?php if ( has_nav_menu( 'primary' ) ) : ?>
                    <nav id="site-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'twentysixteen' ); ?>">
                        <ul class="primary-menu">
                            <?php $nav = wp_get_nav_menu_items('Main'); ?>
                            <?php if ( is_array($nav) ) : ?>
                                <?php foreach ( $nav as $nav_item ) : ?>
                                    <li class="primary-menu-item">
                                        <a href="<?php echo $nav_item->url; ?>" class="primary-menu-item-link"><?php echo $nav_item->title; ?></a>
                                    </li>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </ul>
                    </nav>
                <?php endif; ?>

                <?php if ( has_nav_menu( 'social' ) ) : ?>
                    <nav id="social-navigation" class="content--socials" role="navigation" aria-label="<?php esc_attr_e( 'Social Links Menu', 'twentysixteen' ); ?>">
                        <ul class="content--socials--list">
                            <?php $nav = wp_get_nav_menu_items('Top Socials'); ?>
                            <?php if ( is_array($nav) ) : ?>
                                <?php foreach ( $nav as $nav_item ) : ?>
                                    <li class="content--socials--list-item">
                                        <a href="<?php echo $nav_item->url; ?>" class="content--socials--list-item-link" title="<?php echo $nav_item->title; ?>">
                                            <i class="<?php echo implode(' ', $nav_item->classes); ?>"></i>
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </ul>
                    </nav>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <?php endif; ?>

	<main id="main" class="site-main" role="main">