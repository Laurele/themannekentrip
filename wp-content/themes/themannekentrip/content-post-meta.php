<?php 
    $format = get_post_format(); 

    // if standard post format 
    if ( !$format ) { ?>
        
        <div class="entry-meta entry-header">
            <span class="published">&middot;<?php echo pll__('Posted'); ?> <?php echo human_time_diff( get_the_time('U'), current_time('timestamp') ) . pll__('ago'); ?>&middot;</span>
            <span class="entry-tags"><?php the_tags('&nbsp;'.__('Tagged:', 'zilla').' &middot; ', ', ', ''); ?></span>
        </div>
        
    <?php } elseif ( in_array( $format, array('image', 'gallery', 'audio', 'video', 'link') ) ) { ?>
        
        <div class="entry-meta entry-footer">
            <span class="entry-tags"><?php the_tags(__('Tagged:', 'zilla').' ', ', ', ''); ?></span>
            <span class="published">
                <?php
                    echo '&middot;' . pll__('Posted') . human_time_diff( get_the_time('U'), current_time('timestamp') ) . pll__('ago') . '&middot;';
                ?>
            </span>
        </div>
        
    <?php } ?>