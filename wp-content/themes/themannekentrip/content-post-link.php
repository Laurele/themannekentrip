<?php if ( !is_single() ) { ?>
    
    <h2 class="entry-title"><a href="<?php echo get_post_meta($post->ID, '_zilla_link_url', true); ?>"><?php the_title(); ?></a></h2>
    
<?php } else { ?>
    
    <h1 class="entry-title"><a href="<?php echo get_post_meta($post->ID, '_zilla_link_url', true); ?>"><?php the_title(); ?></a></h1>
    
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