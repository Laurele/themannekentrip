<?php

/**
 * Create the Styling Options section
 */
add_action('admin_init', 'zilla_styling_options');
function zilla_styling_options(){
	
	$styling_options['description'] = 'Configure the visual appearance of you theme by selecting a stylesheet if applicable, choosing your overall layout and inserting any custom CSS necessary.';
	
	$styling_options[] = array('title' => 'Main Layout',
                               'desc' => 'Select main content and sidebar alignment.',
                               'type' => 'radio',
                               'id' => 'style_main_layout',
                               'val' => 'layout-2cr',
                               'options' => array(
                                   'layout-2cr' => '2 Columns (right)',
                                   'layout-2cl' => '2 Columns (left)'
                               ));

    $styling_options[] = array('title' => 'Custom CSS',
                               'desc' => 'Quickly add some CSS to your theme by adding it to this block.',
                               'type' => 'textarea',
                               'id' => 'style_custom_css');
                                
    zilla_add_framework_page( 'Styling Options', $styling_options, 10 );
}


/**
 * Output main layout
 */
function zilla_style_main_layout($classes){
	$zilla_values = get_option( 'zilla_framework_values' );
	$layout = 'layout-2cr';
	if( array_key_exists( 'style_main_layout', $zilla_values ) && $zilla_values['style_main_layout'] != '' ){
		$layout = $zilla_values['style_main_layout'];
	}
	$classes[] = $layout;
	return $classes;
}
add_filter( 'body_class', 'zilla_style_main_layout' );


/**
 * Output the custom CSS
 */
function zilla_custom_css($content) {
    $zilla_values = get_option( 'zilla_framework_values' );
    if( array_key_exists( 'style_custom_css', $zilla_values ) && $zilla_values['style_custom_css'] != '' ){
    	$content .= '/* Custom CSS */' . "\n";
        $content .= stripslashes($zilla_values['style_custom_css']);
        $content .= "\n\n";
    }
    return $content;
    
}
add_filter( 'zilla_custom_styles', 'zilla_custom_css' );

?>