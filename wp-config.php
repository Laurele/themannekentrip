<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'themannetdwp');

/** MySQL database username */
define('DB_USER', 'themannetdwp');

/** MySQL database password */
define('DB_PASSWORD', '8JFmRFsPPAy6');

/** MySQL hostname */
define('DB_HOST', 'mysql55-55.perso');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'H@:{,:v!(|^C&vV2E(z7&{kl<ecwmXl:&A8@wccvOUZ>1bC,K5#f),tENsZe4>ob');
define('SECURE_AUTH_KEY',  '#kg$8fJ?m*(]?dE01^:>$r2MVfrg|8b|ddouA93](>63q?vlp6X[lRC O86eq:qU');
define('LOGGED_IN_KEY',    'u.UpXE!FbS1X|^F&:+gTi8^R% }#!$lwA!,oa4{l P:`#Jp<( 8/<?0jG7#aVZBJ');
define('NONCE_KEY',        '-x!A5k>xp4y>#YV0>-9TmK&=G,nBD9,+qP2t>M]#$c{RvEME8SQA#cn@H0&=J[n}');
define('AUTH_SALT',        'z<#?bY5v~.:){SAfLc8E]FsGYDSWOPMhE]r:dP7:jkR{s5czqH|(&Jf|Y^WF*#hE');
define('SECURE_AUTH_SALT', 't,>QpCP:UMvriG__>S%BxF$#OPf45I~yX?@AjzmU%R:Q(!)MwUIhEVFKzaMGBgC:');
define('LOGGED_IN_SALT',   'Ds!^QIPc[Q|:*xfm</[yj$95,>i)f6GSUT471HeJKPx^Y@sQj(Af4?@FM8e)J%MM');
define('NONCE_SALT',       ']&{54s@z}}eq0>RNAg$|h4.k69;{RNctBb)HJDgKx/1,q@2b_0V`gn+lHI]QTn^u');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
