<!DOCTYPE html>

<!-- BEGIN html -->
<html <?php language_attributes(); ?>>
<!-- A ThemeZilla design (http://www.themezilla.com) - Proudly powered by WordPress (http://wordpress.org) -->

<!-- BEGIN head -->
<head>

	<!-- Meta Tags -->
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
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
    
	<!-- BEGIN #container -->
	<div id="container">
			
		<!--BEGIN #content -->
		<div id="content" class="clearfix">
		<?php zilla_content_start(); ?>