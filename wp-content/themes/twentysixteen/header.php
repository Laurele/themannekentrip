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
<section id="primary" class="content-area">
	<header id="topbar">
		<?php twentysixteen_the_custom_logo(); ?>

		<?php if ( is_front_page() && is_home() ) : ?>
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
		<?php else : ?>
		<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
		<?php endif; ?>

		<?php if ( has_nav_menu( 'primary' ) || has_nav_menu( 'social' ) ) : ?>
			<button id="menu-toggle" class="menu-toggle"><?php _e( 'Menu', 'twentysixteen' ); ?></button>

			<div id="site-header-menu" class="site-header-menu">
				<?php if ( has_nav_menu( 'primary' ) ) : ?>
					<nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'twentysixteen' ); ?>">
						<?php
						wp_nav_menu( array(
							'theme_location' => 'primary',
							'menu_class'     => 'primary-menu',
						) );
						?>
					</nav><!-- .main-navigation -->
				<?php endif; ?>

				<?php if ( has_nav_menu( 'social' ) ) : ?>
				<div class="content--socials">
					<nav id="content--socials--nav" class="social-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Social Links Menu', 'twentysixteen' ); ?>">
						<?php
						wp_nav_menu( array(
							'theme_location' => 'social',
							'menu_class'     => 'content--socials--nav-list',
							'depth'          => 1,
							'link_before'    => '<li class="content--socials--list-item">',
							'link_after'     => '</li>',
							'item_spacing'   => 'discard'
						) );
						?>
					</nav><!-- .social-navigation -->
				<?php endif; ?>
			</div><!-- .site-header-menu -->
		<?php endif; ?>


		</div>
	</header>

	<main id="main" class="site-main" role="main">
