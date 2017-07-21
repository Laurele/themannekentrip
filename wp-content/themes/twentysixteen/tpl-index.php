<?php /* Template Name: Home Template */ ?>

<?php get_header(); ?>
<?php global $post; ?>

<div class="background-paper"></div>

<div class="parallax">
    <section id="group1" class="parallax__group">
        <div class="parallax__layer parallax__layer--base">
            <div class="box header">
                <div class="header-content">
                    <h1><?php bloginfo('name'); ?></h1>
                    <?= get_post_field('post_content', $post->ID) ?>
                </div>
            </div>
        </div>
        <div class="parallax__layer parallax__layer--back background-paper-parallax">
            <div class="box background-map"></div>
        </div>
    </section>
    <section id="group2" class="parallax__group">
        <div class="parallax__layer parallax__layer--deep">
            <div class="box gallery">
                <?php $i = 0; ?>
                <?php while ($i < 6) : ?>
                    <span class="gallery-item">
                    <img src="http://lorempixel.com/100/100">
                </span>
                    <?php $i++; ?>
                <?php endwhile; ?>
            </div>
        </div>
    </section>
    <section id="group3" class="parallax__group">
        <div class="parallax__layer parallax__layer--base">
            <div class="box">
                <?php $myPosts = get_posts(
                    [
                        'tax_query' => [
                            [
                                'taxonomy' => 'post_tag',
                                'field' => 'slug',
                                'terms' => 'home-project'
                            ]
                        ]
                    ]
                ); ?>
                <?php foreach ($myPosts as $post) : setup_postdata($post); ?>
                    <!-- TODO : implement the project page link -->
                    <h3>
                        <a href="#"><?php the_title(); ?></a>
                    </h3>
                    <p>
                        <?php the_content(); ?>
                    </p>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <section id="group4" class="parallax__group">
        <div class="parallax__layer parallax__layer--base">
            <div class="box">
                <?php $myPosts = get_posts(
                    [
                        'tax_query' => [
                            [
                                'taxonomy' => 'post_tag',
                                'field' => 'slug',
                                'terms' => 'home-stats'
                            ]
                        ]
                    ]
                ); ?>
                <?php foreach ($myPosts as $post) : setup_postdata($post); ?>
                    <!-- TODO : implement the stats page link ? -->
                    <h3>
                        <a href="#"><?php the_title(); ?></a>
                    </h3>
                    <p>
                        <?php the_content(); ?>
                    </p>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
</div>

<?php get_footer(); ?>
