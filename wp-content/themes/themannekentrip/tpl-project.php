<?php /* Template Name: Project Template */ ?>

<?php get_header(); ?>

    <div id="primary" class="hfeed">
        <h1><?php the_title(); ?></h1>

        <?php the_content(); ?>

        <?php
        $childArgs = [
            'sort_order' => 'ASC',
            'sort_column' => 'menu_order',
            'child_of' => get_the_ID()
        ];
        $childList = get_pages($childArgs);
        foreach ($childList as $child) : ?>
            <nav>
                <ul>
                    <li>
                        <a href="#<?php echo $child->post_name; ?>"><?php echo $child->post_title; ?></a>
                    </li>
                </ul>
            </nav>
        <?php endforeach; ?>

            <?php foreach ($childList as $child) : ?>
            <div id="<?php echo $child->post_name; ?>" class="child-page">
                <h2 class="child-title">
                    <a href="<?php echo get_permalink($child->ID) ?>"><?php echo $child->post_title; ?></a>
                </h2>
                <?php echo apply_filters( 'the_content', $child->post_content); ?>
            </div>

        <?php endforeach; ?>
    </div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>