<?php get_header(); ?>
			
			<!--BEGIN #primary .hfeed-->
			<div id="primary" class="hfeed">
			<?php if (have_posts()) : ?>

			<h1 class="page-title"><?php _e('Search Results for', 'zilla') ?> &#8220;<?php the_search_query(); ?>&#8221;</h1>

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
            <?php zilla_post_after(); ?>

			<?php endwhile; ?>

			<!--BEGIN .navigation .page-navigation -->
			<div class="navigation page-navigation">
				<?php if(function_exists('wp_pagenavi')) { wp_pagenavi(); } else { ?>
				<div class="nav-next"><?php next_posts_link(__('&larr; Older Entries', 'zilla')) ?></div>
				<div class="nav-previous"><?php previous_posts_link(__('Newer Entries &rarr;', 'zilla')) ?></div>
				<?php } ?>
			<!--END .navigation ,page-navigation -->
			</div>

			<?php else : ?>
				
				<h1 class="page-title"><?php _e('Your search did not match any entries', 'zilla') ?></h1 >
				
				<!--BEGIN #post-0-->
				<div id="post-0">
					
					<!--BEGIN .entry-content-->
					<div class="entry-content">
					    <p><?php _e('You searched: ', 'zilla'); ?>&#8220;<?php the_search_query(); ?>&#8221;</p>
						<p><?php _e('Suggestions:','zilla') ?></p>
						<ul>
							<li><?php _e('Make sure all words are spelled correctly.', 'zilla') ?></li>
							<li><?php _e('Try different keywords.', 'zilla') ?></li>
							<li><?php _e('Try more general keywords.', 'zilla') ?></li>
						</ul>
						<?php get_search_form(); ?>
					<!--END .entry-content-->
					</div>
					
				<!--END #post-0-->
				</div>

			<?php endif; ?>
			<!--END #primary .hfeed-->
			</div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>