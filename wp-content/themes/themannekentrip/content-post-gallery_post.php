<div class="entry-content">
    <?php if (!is_single()) { ?>

        <h2 class="entry-title">
            <a href="<?php echo get_permalink($post->ID); ?>"><?php the_title(); ?></a>
        </h2>

    <?php } else { ?>

        <h1 class="entry-title"><?php the_title(); ?></h1>

    <?php } ?>

    <?php get_template_part( 'content-post', 'meta' ); ?>

    <?php the_content(__('Continue Reading', 'zilla')); ?>

    <br/>
    <br/>

    <?php
    // Creating cover of gallery
    // Get the images ids from the post_metadata
    $images = acf_photo_gallery('pictures', $post->ID);

    // Check if return array has anything in it
    if (count($images)) : ?>
        <?php if (!is_single()) : ?>
            <a href="<?php echo get_permalink($post->ID); ?>">
                <div class="my-slideshow">
                    <?php foreach ($images as $key => $image): ?>
                        <?php $limit = 3; ?>
                        <?php if ($key >= $limit) : ?>
                            <?php break; ?>
                        <?php endif; ?>

                        <?php
                            $id = $image['id']; // The attachment id of the media
                            $title = $image['title']; //The title
                            $thumbnail_image_url = $image['thumbnail_image_url']; //Get the thumbnail size image url 150px by 150px
                            $alt = get_field('photo_gallery_alt', $id ); //Get the alt which is a extra field (See below how to add extra fields)
                            $class = get_field('photo_gallery_class', $id); //Get the class which is a extra field (See below how to add extra fields)
                        ?>
                        <div class="thumbnail">
                            <img src="<?php echo $thumbnail_image_url; ?>" alt="<?php echo $alt; ?>" title="<?php echo $title; ?>" class="<?php echo $class; ?>">
                        </div>
                    <?php endforeach; ?>
                </div>
            </a>
        <?php else : ?>
            <div class="my-slideshow" data-view="gallery">
                <?php foreach ($images as $key => $image): ?>
                    <?php $attachment = get_post( $image['id'] ); ?>
                    <?php
                        $id = $image['id']; // The attachment id of the media
                        $title = $image['title']; //The title
                        $caption = htmlspecialchars($attachment->post_excerpt); //The caption
                        $full_image_url = $image['full_image_url']; //Full size image url
//                        $full_image_url = acf_photo_gallery_resize_image($full_image_url, 1920, 1080); //Resized size to 1920px width by 1080px height image url
                        $full_image_url = wp_get_attachment_image_src($image['id'], 'slideshow-large')[0];
                        $thumbnail_image_url = $image['thumbnail_image_url']; //Get the thumbnail size image url 150px by 150px
                        $alt = get_field('photo_gallery_alt', $id ); //Get the alt which is a extra field (See below how to add extra fields)
                        $class = get_field('photo_gallery_class', $id); //Get the class which is a extra field (See below how to add extra fields)
                    ?>
                    <div data-thumbnail class="thumbnail" data-title="<?php echo $title; ?>" data-caption="<?php echo $caption; ?>" data-url="<?php echo $full_image_url; ?>" data-item="<?php echo $key; ?>" data-miniature-url="<?php echo $thumbnail_image_url; ?>">
                        <img src="<?php echo $thumbnail_image_url; ?>" alt="<?php echo $alt; ?>" title="<?php echo $title; ?>" class="<?php echo $class; ?>">
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    <?php endif; ?>

    <?php wp_link_pages(array('before' => '<p><strong>'.__('Pages:', 'framework').'</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
</div>