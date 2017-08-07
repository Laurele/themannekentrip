<!--BEGIN .entry-content -->
<div class="entry-content">
	<?php if( !is_single() ) { ?>

		<h2 class="entry-title"><?php the_title(); ?></h2>

	<?php } else { ?>

		<h1 class="entry-title"><?php the_title(); ?></h1>

	<?php } ?>

	<?php the_content(__('', 'zilla')); ?>
<!--END .entry-content -->
</div>
