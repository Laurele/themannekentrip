<?php /* Template Name: Home Template */ ?>

<?php get_header(); ?>
<?php global $post; ?>

<div class="parallax">
    <section id="group1" class="parallax__group">
        <div class="parallax__layer parallax__layer--fore">
            <div class="box header">
                <div class="header-content">
                    <h1><?php bloginfo('name'); ?></h1>
                    <?= get_post_field('post_content', $post->ID) ?>
                </div>
            </div>
        </div>
        <div class="parallax__layer parallax__layer--base background-paper-parallax">
            <div class="box background-map"></div>
        </div>
    </section>
    <section id="group2" class="parallax__group">
        <div class="parallax__layer parallax__layer--base">
            <div class="box">
                <?php $myPosts = get_posts(
                    [
                        'post_type' => 'home_post',
                        'tax_query' => [
                            [
                                'taxonomy' => 'post_tag',
                                'field' => 'slug',
                                'terms' => sprintf('home-project-%s', strtoupper(pll_current_language())),
                            ]
                        ]
                    ]
                ); ?>
                <?php foreach ($myPosts as $post) : setup_postdata($post); ?>
                    <h3>
                        <a href="<?php echo custom_get_page_link('the-project'); ?>"><?php the_title(); ?></a>
                    </h3>

                    <?php the_content(); ?>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="parallax__layer parallax__layer--back has-gallery">
            <div class="box box-gallery">
                <?php $i = 0; ?>
                <?php while($i < 3) : ?>
                    <span class="box-gallery-item">
                        <img src="/wp-content/themes/themannekentrip/build/images/home/gallery/kayak.jpg">
                    </span>
                        <span class="box-gallery-item">
                        <img src="/wp-content/themes/themannekentrip/build/images/home/gallery/beach_camp.jpg">
                    </span>
                        <span class="box-gallery-item">
                        <img src="/wp-content/themes/themannekentrip/build/images/home/gallery/bike_road.jpg">
                    </span>
                        <span class="box-gallery-item">
                        <img src="/wp-content/themes/themannekentrip/build/images/home/gallery/savane_bike.jpg">
                    </span>
                        <span class="box-gallery-item">
                        <img src="/wp-content/themes/themannekentrip/build/images/home/gallery/laponia_finland.jpg">
                    </span>
                        <span class="box-gallery-item">
                        <img src="/wp-content/themes/themannekentrip/build/images/home/gallery/laponia_sunset.jpg">
                    </span>
                        <span class="box-gallery-item">
                        <img src="/wp-content/themes/themannekentrip/build/images/home/gallery/meet_people.jpg">
                    </span>
                        <span class="box-gallery-item">
                        <img src="/wp-content/themes/themannekentrip/build/images/home/gallery/finland_angeli.jpg">
                    </span>
                        <span class="box-gallery-item">
                        <img src="/wp-content/themes/themannekentrip/build/images/home/gallery/mountain_top.jpg">
                    </span>
                        <span class="box-gallery-item">
                        <img src="/wp-content/themes/themannekentrip/build/images/home/gallery/boat.jpg">
                    </span>
                        <span class="box-gallery-item">
                        <img src="/wp-content/themes/themannekentrip/build/images/home/gallery/canyon_view.jpg">
                    </span>
                        <span class="box-gallery-item">
                        <img src="/wp-content/themes/themannekentrip/build/images/home/gallery/cascade.jpg">
                    </span>
                    <?php $i++; ?>
                <?php endwhile; ?>
            </div>
        </div>
    </section>
    <section id="group3" class="parallax__group">
        <div class="parallax__layer parallax__layer--fore">
            <div class="box stats">
                <?php $myPosts = get_posts(
                    [
                        'post_type' => 'home_post',
                        'tax_query' => [
                            [
                                'taxonomy' => 'post_tag',
                                'field' => 'slug',
                                'terms' => sprintf('home-stats-%s', strtoupper(pll_current_language()))
                            ]
                        ]
                    ]
                ); ?>
                <?php foreach ($myPosts as $post) : setup_postdata($post); ?>
                    <h3>
                        <a href="<?php echo custom_get_page_link('stats'); ?>"><?php the_title(); ?></a>
                    </h3>

                    <?php the_content(); ?>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <section id="group4" class="parallax__group">
        <div class="parallax__layer parallax__layer--base">
            <div class="box video">
                <iframe src="https://www.youtube.com/embed/jPJ1avYUcIc?autoplay=0&modestbranding=1"></iframe>
            </div>
        </div>
    </section>
    <section id="group5" class="parallax__group">
        <?php $myPosts = get_posts(
            [
                'post_type' => 'home_post',
                'tax_query' => [
                    [
                        'taxonomy' => 'post_tag',
                        'field' => 'slug',
                        'terms' => sprintf('home-environmental-project-%s', strtoupper(pll_current_language()))
                    ]
                ]
            ]
        ); ?>
        <?php foreach ($myPosts as $post) : setup_postdata($post); ?>
        <div class="parallax__layer parallax__layer--fore">
            <div class="box">

                    <h3>
                        <a href="<?php echo custom_get_page_link('the-project'); ?>"><?php the_title(); ?></a>
                    </h3>

                    <?php the_content(); ?>
            </div>
        </div>
        <div class="parallax__layer parallax__layer--back has-background-image" style="background-image: url('<?php echo get_the_post_thumbnail_url($post, 'thumbnail-large'); ?>')"></div>
        <?php endforeach; ?>
    </section>
    <section id="group7" class="parallax__group">
        <div class="parallax__layer parallax__layer--base">
            <div class="box facebook">
                <iframe class="iframe-mobile" src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Ffacebook.com%2Fthemannekentrip.be&width=300&layout=standard&action=like&size=large&show_faces=true&share=true&height=80&appId=471768236515584" width="300" height="80" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
                <iframe class="iframe-desktop" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fthemannekentrip.be%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=471768236515584" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
            </div>
        </div>
    </section>
</div>


<div id="footer" role="contentinfo">
    <div class="site-info">
        <a class="site-title" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">© <?php bloginfo( 'name' ); ?> <?php echo date("Y"); ?></a>
    </div>

    <ul class="sponsors-list">
        <li class="sponsors-list-item">
            supported by
        </li>
        <li class="sponsors-list-item">
            <a class="sponsors-list-item-link" href="https://int.berghaus.com/" target="_blank">
                <img src="/wp-content/themes/themannekentrip/build/images/footer/logo-berghaus.svg" alt="Berghaus"/>
            </a>
        </li>
        <li class="sponsors-list-item">
            <a class="sponsors-list-item-link" href="https://flysurfer.com/" target="_blank">
                <img src="/wp-content/themes/themannekentrip/build/images/footer/logo-flysurfer-orange.svg" alt="FlySurfer"/>
            </a>
        </li>
        <li class="sponsors-list-item">
            <a class="sponsors-list-item-link" href="http://www.studiofrancine.be/" target="_blank">
                <img src="/wp-content/themes/themannekentrip/build/images/footer/logo-studiofrancine-white.png" alt="Studio Francine"/>
            </a>
        </li>
    </ul>
</div>

</main>

</section>

<?php wp_footer(); ?>
</body>
</html>

