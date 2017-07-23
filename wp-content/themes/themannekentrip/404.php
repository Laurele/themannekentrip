<?php get_header(); ?>

			<!--BEGIN #primary .hfeed-->
			<div id="primary" class="hfeed">
			
				<!--BEGIN #post-0-->
				<div id="post-0" <?php post_class() ?>>
					
					<div class="entry-icon"></div>
				
    				<h1 class="entry-title"><?php _e('Error 404 - Not Found', 'zilla') ?></h1>
                    
                    <!--BEGIN .entry-meta .entry-header-->
					<div class="entry-meta entry-header">
						<?php edit_post_link( __('edit', 'zilla'), '<span class="edit-post">[', ']</span>' ); ?>
					<!--END .entry-meta .entry-header-->
                    </div>				
					
					<!--BEGIN .entry-content-->
					<div class="entry-content">
						<p><?php _e("Sorry, but you are looking for something that isn't here.", 'zilla') ?></p>
					<!--END .entry-content-->
					</div>
					
				<!--END #post-0-->
				</div>
				
			<!--END #primary .hfeed-->
			</div>
 
<?php get_sidebar(); ?>

<?php get_footer(); ?>