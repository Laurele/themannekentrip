<?php if( function_exists('has_post_thumbnail') && has_post_thumbnail() ) { ?>
    
    <!--BEGIN .post-media -->
    <div class="post-media">
        <?php the_post_thumbnail('thumbnail-large'); ?>
        
        <?php if( !is_single() ) { ?>
            <h2 class="entry-title"><?php the_title(); ?></h2>
        <?php } else { ?>
            <h1 class="entry-title"><?php the_title(); ?></h1>
        <?php } ?>
    <!--END .post-media -->
    </div>
    
<?php } ?>

<?php get_template_part( 'content-post', 'meta' ); ?>

<?php if( is_single() ) { ?>
    
    <!--BEGIN .entry-content -->
    <div class="entry-content">
    	<?php the_content(__('Continue Reading', 'zilla')); ?>
    	<?php wp_link_pages(array('before' => '<p><strong>'.__('Pages:', 'framework').'</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
    <!--END .entry-content -->
    </div>

<?php } ?>