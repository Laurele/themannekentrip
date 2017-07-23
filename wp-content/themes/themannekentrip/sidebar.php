<?php zilla_sidebar_before(); ?>
<!--BEGIN #sidebar .aside-->
<div id="sidebar" class="aside">

<?php zilla_sidebar_start(); ?>

	<?php zilla_header_before(); ?>
	<!-- BEGIN #header -->
	<div id="header">
	<?php zilla_header_start(); ?>

		<div id="logo">
			<?php the_custom_logo(); ?>
			<p><?php bloginfo('name'); ?></p>
		</div>

		<!-- BEGIN .widget -->
		<div class="widget intro">
			<p><?php bloginfo('description'); ?></p>
		</div>
		<!-- END .widget -->

	<?php zilla_header_end(); ?>
	<!--END #header-->
	</div>
	<?php zilla_header_after(); ?>

<?php
	/* Widgetised Area */
	dynamic_sidebar( 'sidebar-main' );

	zilla_sidebar_end();
?>

<!--END #sidebar .aside-->
</div>
<?php zilla_sidebar_after(); ?>