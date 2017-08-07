<div class="entry-content">
    <?php
    $quote = get_post_meta($post->ID, '_zilla_quote_quote', true);

    if( !is_single() ) { ?>
        
        <h2 class="entry-title"><?php the_title(); ?></h2>
        
    <?php } else { ?>
        
        <h1 class="entry-title"><?php the_title(); ?></h1>
        
    <?php } ?>

    <div class="clear"></div>
    
    <?php if( is_single() ) { ?>

        	<?php the_content(__('Continue Reading', 'zilla')); ?>
        	<?php wp_link_pages(array('before' => '<p><strong>'.__('Pages:', 'framework').'</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>

    <?php } else { ?>
        <?php the_content(__('', 'zilla')); ?>
    <?php } ?>
</div>

