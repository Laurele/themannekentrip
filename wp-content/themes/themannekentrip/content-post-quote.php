<?php
    $quote = get_post_meta($post->ID, '_zilla_quote_quote', true);

    if( !is_single() ) { ?>
        
        <h2 class="entry-title"><?php echo $quote; ?></h2>
        
    <?php } else { ?>
        
        <h1 class="entry-title"><?php echo $quote; ?></h1>
        
    <?php } ?>    
    
    <span class="sub-title"><?php the_title(); ?></span>
    
    <div class="clear"></div>
    
    <?php if( is_single() ) { ?>

        <!--BEGIN .entry-content -->
        <div class="entry-content">
        	<?php the_content(__('Continue Reading', 'zilla')); ?>
        	<?php wp_link_pages(array('before' => '<p><strong>'.__('Pages:', 'framework').'</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
        <!--END .entry-content -->
        </div>

    <?php } ?>