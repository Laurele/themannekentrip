<?php if( !is_single() ) { ?>
    
    <h2 class="entry-title"><a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php printf(__('Permanent Link to %s', 'zilla'), get_the_title()); ?>"> <?php the_title(); ?></a></h2>
    
<?php } else { ?>

    <h1 class="entry-title"><?php the_title(); ?></h1>
    
<?php } ?>

<?php get_template_part( 'content-post', 'meta' ); ?>

<?php /* if the post has a WP 2.9+ Thumbnail */
if ( function_exists('has_post_thumbnail') && has_post_thumbnail() ) { ?>
    
    <div class="post-media">
    	<a title="<?php printf(__('Permanent Link to %s', 'zilla'), get_the_title()); ?>" href="<?php the_permalink(); ?>"><?php the_post_thumbnail('thumbnail-large'); /* post thumbnail settings configured in functions.php */ ?></a>
    </div>
    
<?php } ?>

<!--BEGIN .entry-content -->
<div class="entry-content">
	<?php the_content(__('Continue Reading', 'zilla')); ?>
	<?php wp_link_pages(array('before' => '<p><strong>'.__('Pages:', 'framework').'</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
<!--END .entry-content -->
</div>