<?php /* Template Name: Home Template */ ?>

<?php get_header(); ?>
<?php global $post; ?>
<div class="home-map"></div>
<header>
    <div class="header-container">
        <div class="header-content">
            <h1><?php bloginfo( 'name' ); ?></h1>
            <?= get_post_field('post_content', $post->ID) ?>
        </div>
    </div>
</header>

<section>
</section>

<?php get_footer(); ?>
