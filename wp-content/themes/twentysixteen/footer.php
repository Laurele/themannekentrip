<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */
?>

	</main>

	<footer id="footer" role="contentinfo">
		<div class="site-info">
			<span class="site-title"><a class="site-title-link" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">© <?php bloginfo( 'name' ); ?> <?php echo date("Y"); ?></a></span>
		</div>
	</footer>

</section>

<?php wp_footer(); ?>
</body>
</html>
