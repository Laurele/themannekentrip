
		<?php zilla_content_end(); ?>
		<!-- END #content -->
		</div>

		<?php zilla_footer_before(); ?>

		</main>

		<footer id="footer" role="contentinfo">
			<?php zilla_footer_start(); ?>

			<div class="site-info">
				<span class="site-title">© <?php bloginfo( 'name' ); ?> <?php echo date("Y"); ?></span>
			</div>

			<?php zilla_footer_end(); ?>
		</footer>

		<?php zilla_footer_after(); ?>
	</div>
</section>

<div id="background-primary" data-view="background.main">
	<?php $items = [1, 2, 3, 4]; ?>
	<?php foreach ($items as $item) : ?>
		<div data-el="item-<?php echo $item; ?>" class="item-<?php echo $item; ?><?php if ($item === 1) : ?> is-visible<?php endif; ?>"></div>
	<?php endforeach; ?>
</div>

<?php wp_footer(); ?>
<?php zilla_body_end(); ?>
</body>
</html>