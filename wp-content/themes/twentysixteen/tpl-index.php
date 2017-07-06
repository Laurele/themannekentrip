<?php /* Template Name: Home Template */ ?>

<?php get_header(); ?>
<?php global $post; ?>
<header>
    <?= get_post_field('post_content', $post->ID) ?>
</header>

<section>

</section>

<?php get_footer(); ?>
