<!DOCTYPE html>

<html <?php language_attributes(); ?><?php if (is_dev_environment()) : ?> data-env="dev"<?php endif; ?>>

<head>

	<!-- Meta Tags -->
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php zilla_meta_head(); ?>
	
	<!-- Title -->
	<title><?php wp_title(''); ?></title>
	
	<!-- Stylesheets -->
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />

	<!-- RSS & Pingbacks -->
	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo( 'name' ); ?> RSS Feed" href="<?php if(zilla_get_option('general_feedburner_url')){ echo zilla_get_option('general_feedburner_url'); } else { bloginfo( 'rss2_url' ); } ?>" />
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

	<?php wp_head(); ?>
    <?php zilla_head(); ?>
    
<!-- END head -->
</head>

<!-- BEGIN body -->
<body <?php body_class(); ?>>
    <?php zilla_body_start(); ?>

	<section id="wrapper" class="content-area" data-view="navigation.main">
		<header id="topbar">
			<?php the_custom_logo() ?>
			<?php if (is_front_page()) : ?>
				<h1 class="site-title"><?php bloginfo( 'name' ); ?></h1>
			<?php else : ?>
				<p class="site-title"><?php bloginfo( 'name' ); ?></p>
			<?php endif; ?>

			<?php if ( has_nav_menu( 'social' ) ) : ?>
				<nav id="social-navigation" class="content--socials" role="navigation" aria-label="<?php esc_attr_e( 'Social Links Menu', 'twentysixteen' ); ?>">
					<ul class="content--socials--list">
						<?php $nav = wp_get_nav_menu_items('Top Socials'); ?>
						<?php if ( is_array($nav) ) : ?>
							<?php foreach ( $nav as $nav_item ) : ?>
								<li class="content--socials--list-item">
									<a href="<?php echo $nav_item->url; ?>" class="content--socials--list-item-link" title="<?php echo $nav_item->title; ?>" target="_blank">
										<i class="<?php echo implode(' ', $nav_item->classes); ?>"></i>
									</a>
								</li>
							<?php endforeach; ?>
						<?php endif; ?>
					</ul>
				</nav>
			<?php endif; ?>

			<?php if ( is_active_sidebar( 'topbar' ) ) : ?>
				<div id="topbar-widget" role="complementary">
					<?php dynamic_sidebar( 'topbar' ); ?>
				</div>
			<?php endif; ?>

			<?php if ( has_nav_menu( 'primary' ) ) : ?>
				<button id="menu-toggle" class="menu-toggle" title="<?php _e( 'Menu', 'twentysixteen' ); ?>" data-el="topbar-menu-toggle">Menu <i class="icon-align-justify"></i></button>
			<?php endif; ?>

		</header>

		<?php if ( has_nav_menu( 'primary' ) ) : ?>

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
					</div>
				</div>
			</div>
		<?php endif; ?>

		<main id="main" class="site-main" role="main">

		<?php zilla_content_start(); ?>