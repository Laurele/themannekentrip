<?php get_header(); ?>


<?php $backgroundImage = get_field('background_image'); ?>

<div id="primary" class="hfeed"<?php if ($backgroundImage) : ?> style="background-image: url('<?php echo $backgroundImage['url']; ?>')"<?php endif; ?>>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

	<?php zilla_page_before(); ?>
	<div <?php post_class() ?> id="post-<?php the_ID(); ?>">
	<?php zilla_page_start(); ?>

		<div class="entry-icon"></div>

		<h1 class="entry-title"><?php the_title(); ?></h1>

		<div class="entry-meta entry-header">
			<?php edit_post_link( __('edit', 'zilla'), '<span class="edit-post">[', ']</span>' ); ?>
		</div>

		<div class="entry-content">
			<?php the_content(); ?>
			<?php wp_link_pages(array('before' => '<p><strong>'.__('Pages:', 'zilla').'</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
		</div>

	<?php zilla_page_end(); ?>
	</div>
	<?php zilla_page_after(); ?>

	<?php
		zilla_comments_before();
		comments_template('', true);
		zilla_comments_after();
	?>

	<?php endwhile; endif; ?>

</div>
			
<?php get_sidebar(); ?>

<?php get_footer(); ?>