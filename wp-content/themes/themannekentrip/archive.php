<?php get_header(); ?>
<?php /* Get author data */
	if(get_query_var('author_name')) :
	$curauth = get_userdatabylogin(get_query_var('author_name'));
	else :
	$curauth = get_userdata(get_query_var('author'));
	endif;
?>
			
			<!--BEGIN #primary .hfeed-->
			<div id="primary" class="hfeed">
			<?php if (have_posts()) : ?>			
	
	 	  	<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>
	 	  	<?php /* If this is a category archive */ if (is_category()) { ?>
				<h1 class="page-title"><?php printf(__('All posts in &ldquo;%s&rdquo;', 'zilla'), single_cat_title('',false)); ?></h1>
	 	  	<?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
				<h1 class="page-title"><?php printf(__('All posts tagged &ldquo;%s&rdquo;', 'zilla'), single_tag_title('',false)); ?></h1>
	 	  	<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
				<h1 class="page-title"><?php _e('Archive for ', 'zilla') ?> <?php the_time('F jS, Y'); ?></h1>
	 	 	 <?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
				<h1 class="page-title"><?php _e('Archive for ', 'zilla') ?> <?php the_time('F, Y'); ?></h1>
	 		<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
				<h1 class="page-title"><?php _e('Archive for', 'zilla') ?> <?php the_time('Y'); ?></h1>
		  	<?php /* If this is an author archive */ } elseif (is_author()) { ?>
				<h1 class="page-title"><?php _e('All posts by ', 'zilla') ?> <?php echo $curauth->display_name; ?></h1>
	 	  	<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
				<h1 class="page-title"><?php _e('Blog Archives', 'zilla') ?></h1>
	 	  	<?php } ?>
	
			<?php while (have_posts()) : the_post(); ?>
			
			    <?php zilla_post_before(); ?>
				<!--BEGIN .hentry -->
				<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<?php zilla_post_start(); ?>
				    
				    <?php 
				        $format = get_post_format();
				        if( false === $format ) { $format = 'standard'; }
			        ?>
				        
			        <!--BEGIN .entry-meta .entry-icon-->
					<div class="entry-meta entry-icon">
					<!--END .entry-meta entry-icon -->
					</div>	
				        
				    <?php get_template_part( 'content-post', $format ); ?>			
                    
                    <?php zilla_post_end(); ?>
            	<!--END .hentry -->
				</div>
	
			<?php endwhile; ?>
	
			<!--BEGIN .navigation .page-navigation -->
			<div class="navigation page-navigation">
				<?php if(function_exists('wp_pagenavi')) { wp_pagenavi(); } else { ?>
				<div class="nav-next"><?php next_posts_link(__('&larr; Older Entries', 'zilla')) ?></div>
				<div class="nav-previous"><?php previous_posts_link(__('Newer Entries &rarr;', 'zilla')) ?></div>
				<?php } ?>
			<!--END .navigation .page-navigation -->
			</div>
			
			<?php else :
	
    			if ( is_category() ) { // If this is a category archive
    				printf(__('<h2>Sorry, but there aren\'t any posts in the %s category yet.</h2>', 'zilla'), single_cat_title('',false));
    			} else if ( is_date() ) { // If this is a date archive
    				echo(__('<h2>Sorry, but there aren\'t any posts with this date.</h2>', 'zilla'));
    			} else if ( is_author() ) { // If this is a category archive
    				$userdata = get_userdatabylogin(get_query_var('author_name'));
    				printf(__('<h2>Sorry, but there aren\'t any posts by %s yet.</h2>', 'zilla'), $userdata->display_name);
    			} else {
    				echo(__('<h2>No posts found.</h2>', 'zilla'));
    			}
	
			endif; ?>
			
			<!--END #primary .hfeed-->
			</div>
	
<?php get_sidebar(); ?>

<?php get_footer(); ?>