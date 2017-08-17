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
									<?php $parent_id = null; ?>
									<?php $subMenu = false; ?>
									<?php $count = 0; ?>

									<?php if ( is_array($nav) ) : ?>

										<?php foreach ( $nav as $nav_item ) : ?>
											<?php if ( !$nav_item->menu_item_parent ): // item does not have a parent so menu_item_parent equals 0 (false) ?>
												<?php $parent_id = $nav_item->ID; // save this id for later comparison with sub-menu items ?>

												<?php $slug = basename(get_permalink()); ?>
												<li class="primary-menu-item">
													<a href="<?php echo $nav_item->url; ?>" class="primary-menu-item-link<?php if(strtolower(str_replace(' ', '-', $nav_item->title)) === $slug) { ?> is-active<?php } ?>"><?php echo $nav_item->title; ?></a>
											<?php endif; ?>

											<?php if ( $parent_id == $nav_item->menu_item_parent ): ?>

												<?php if ( !$subMenu ): $subMenu = true; ?>
													<ul class="primary-sub-menu">
												<?php endif; ?>
														<li class="primary-sub-menu-item">
															<a href="<?php echo $link; ?>" class="title"><?php echo $title; ?></a>
														</li>

												<?php if ( $nav[ $count + 1 ]->menu_item_parent != $parent_id && $subMenu ): ?>
													</ul>
													<?php $subMenu = false; ?>
												<?php endif; ?>

												<?php if ( $nav[ $count + 1 ]->menu_item_parent != $parent_id ): ?>
													</li>
													<?php $submenu = false; ?>
												<?php endif; ?>
												<?php $count++; ?>

											<?php endif; ?>
										<?php endforeach; ?>
									<?php endif; ?>
								</ul>
							</nav>
						<?php endif; ?>

						<ul id="site-language">
						<?php $translations = pll_the_languages(array('raw'=>1)); ?>

						<?php foreach ($translations as $translation) : ?>
							<li class="site-language-item">
								<a class="site-language-item-link" href="<?php echo $translation['url']; ?>"><?php echo $translation['name']; ?></a>
							</li>
						<?php endforeach; ?>
						</ul>
					</div>
				</div>
			</div>
		<?php endif; ?>

		<main id="main" class="site-main" role="main">

		<?php zilla_content_start(); ?>