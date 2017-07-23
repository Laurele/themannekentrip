		<?php zilla_sidebar_before(); ?>
		<!--BEGIN #sidebar .aside-->
		<div id="sidebar" class="aside">
			
		<?php zilla_sidebar_start(); ?>
			
			<?php zilla_header_before(); ?>
    		<!-- BEGIN #header -->
    		<div id="header">
    		<?php zilla_header_start(); ?>

    			<!-- BEGIN #logo -->
    			<div id="logo">
    				<?php 
    				/*
    				    If "plain text logo" is set in theme options then use text
        				if a logo url has been set in theme options then use that
        				if none of the above then use the default logo.png 
    				*/
    				if (zilla_get_option('general_text_logo') == 'on') { ?>
    				    <a href="<?php echo home_url(); ?>"><?php bloginfo( 'name' ); ?></a>
    				<?php } elseif (zilla_get_option('general_custom_logo')) { ?>
    				    <a href="<?php echo home_url(); ?>"><img src="<?php echo zilla_get_option('general_custom_logo'); ?>" alt="<?php bloginfo( 'name' ); ?>"/></a>
    				<?php } else { ?>
    				    <a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="<?php bloginfo( 'name' ); ?>" width="200" height="100" /></a>
    				<?php } ?>
    			<!-- END #logo -->
    			</div>
    			
    			<!-- BEGIN .widget -->
                <div class="widget intro">
                    <p><?php bloginfo('description'); ?></p>
                </div>
    			<!-- END .widget -->
    			
    			<!-- BEGIN .search -->
                <div class="search">
                    <?php get_search_form(); ?>
                </div>
    			<!-- END .search -->

        	<?php zilla_header_end(); ?>	
    		<!--END #header-->
    		</div>
    		<?php zilla_header_after(); ?>
    	    
		<?php	
			/* Widgetised Area */ 
			dynamic_sidebar( 'sidebar-main' );
			
			zilla_sidebar_end();
		?>
		
		<!--END #sidebar .aside-->
		</div>
		<?php zilla_sidebar_after(); ?>