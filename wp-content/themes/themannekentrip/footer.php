
	<?php zilla_content_end(); ?>
	<!-- END #content -->
	</div>

	<?php zilla_footer_before(); ?>

	</main>

	<footer id="footer" role="contentinfo">
		<?php zilla_footer_start(); ?>

		<div class="site-info">
			<span class="site-title"><a class="site-title-link" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">© <?php bloginfo( 'name' ); ?> <?php echo date("Y"); ?></a></span>
		</div>

		<?php zilla_footer_end(); ?>
	</footer>

	<?php zilla_footer_after(); ?>

</section>

<?php wp_footer(); ?>
<?php zilla_body_end(); ?>
</body>
</html>