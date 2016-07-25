/*! Respond.js v1.4.0: min/max-width media query polyfill. (c) Scott Jehl. MIT Lic. j.mp/respondjs  */
(function( w ){

	"use strict";

	//exposed namespace
	var respond = {};
	w.respond = respond;

	//define update even in native-mq-supporting browsers, to avoid errors
	respond.update = function(){};

	//define ajax obj
	var requestQueue = [],
		xmlHttp = (function() {
			var xmlhttpmethod = false;
			try {
				xmlhttpmethod = new w.XMLHttpRequest();
			}
			catch( e ){
				xmlhttpmethod = new w.ActiveXObject( "Microsoft.XMLHTTP" );
			}
			return function(){
				return xmlhttpmethod;
			};
		})(),

		//tweaked Ajax functions from Quirksmode
		ajax = function( url, callback ) {
			var req = xmlHttp();
			if (!req){
				return;
			}
			req.open( "GET", url, true );
			req.onreadystatechange = function () {
				if ( req.readyState !== 4 || req.status !== 200 && req.status !== 304 ){
					return;
				}
				callback( req.responseText );
			};
			if ( req.readyState === 4 ){
				return;
			}
			req.send( null );
		};

	//expose for testing
	respond.ajax = ajax;
	respond.queue = requestQueue;

	// expose for testing
	respond.regex = {
		media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
		keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
		urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
		findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
		only: /(only\s+)?([a-zA-Z]+)\s?/,
		minw: /\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,
		maxw: /\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/
	};

	//expose media query support flag for external use
	respond.mediaQueriesSupported = w.matchMedia && w.matchMedia( "only all" ) !== null && w.matchMedia( "only all" ).matches;

	//if media queries are supported, exit here
	if( respond.mediaQueriesSupported ){
		return;
	}

	//define vars
	var doc = w.document,
		docElem = doc.documentElement,
		mediastyles = [],
		rules = [],
		appendedEls = [],
		parsedSheets = {},
		resizeThrottle = 30,
		head = doc.getElementsByTagName( "head" )[0] || docElem,
		base = doc.getElementsByTagName( "base" )[0],
		links = head.getElementsByTagName( "link" ),

		lastCall,
		resizeDefer,

		//cached container for 1em value, populated the first time it's needed
		eminpx,

		// returns the value of 1em in pixels
		getEmValue = function() {
			var ret,
				div = doc.createElement('div'),
				body = doc.body,
				originalHTMLFontSize = docElem.style.fontSize,
				originalBodyFontSize = body && body.style.fontSize,
				fakeUsed = false;

			div.style.cssText = "position:absolute;font-size:1em;width:1em";

			if( !body ){
				body = fakeUsed = doc.createElement( "body" );
				body.style.background = "none";
			}

			// 1em in a media query is the value of the default font size of the browser
			// reset docElem and body to ensure the correct value is returned
			docElem.style.fontSize = "100%";
			body.style.fontSize = "100%";

			body.appendChild( div );

			if( fakeUsed ){
				docElem.insertBefore( body, docElem.firstChild );
			}

			ret = div.offsetWidth;

			if( fakeUsed ){
				docElem.removeChild( body );
			}
			else {
				body.removeChild( div );
			}

			// restore the original values
			docElem.style.fontSize = originalHTMLFontSize;
			if( originalBodyFontSize ) {
				body.style.fontSize = originalBodyFontSize;
			}


			//also update eminpx before returning
			ret = eminpx = parseFloat(ret);

			return ret;
		},

		//enable/disable styles
		applyMedia = function( fromResize ){
			var name = "clientWidth",
				docElemProp = docElem[ name ],
				currWidth = doc.compatMode === "CSS1Compat" && docElemProp || doc.body[ name ] || docElemProp,
				styleBlocks	= {},
				lastLink = links[ links.length-1 ],
				now = (new Date()).getTime();

			//throttle resize calls
			if( fromResize && lastCall && now - lastCall < resizeThrottle ){
				w.clearTimeout( resizeDefer );
				resizeDefer = w.setTimeout( applyMedia, resizeThrottle );
				return;
			}
			else {
				lastCall = now;
			}

			for( var i in mediastyles ){
				if( mediastyles.hasOwnProperty( i ) ){
					var thisstyle = mediastyles[ i ],
						min = thisstyle.minw,
						max = thisstyle.maxw,
						minnull = min === null,
						maxnull = max === null,
						em = "em";

					if( !!min ){
						min = parseFloat( min ) * ( min.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
					}
					if( !!max ){
						max = parseFloat( max ) * ( max.indexOf( em ) > -1 ? ( eminpx || getEmValue() ) : 1 );
					}

					// if there's no media query at all (the () part), or min or max is not null, and if either is present, they're true
					if( !thisstyle.hasquery || ( !minnull || !maxnull ) && ( minnull || currWidth >= min ) && ( maxnull || currWidth <= max ) ){
						if( !styleBlocks[ thisstyle.media ] ){
							styleBlocks[ thisstyle.media ] = [];
						}
						styleBlocks[ thisstyle.media ].push( rules[ thisstyle.rules ] );
					}
				}
			}

			//remove any existing respond style element(s)
			for( var j in appendedEls ){
				if( appendedEls.hasOwnProperty( j ) ){
					if( appendedEls[ j ] && appendedEls[ j ].parentNode === head ){
						head.removeChild( appendedEls[ j ] );
					}
				}
			}
			appendedEls.length = 0;

			//inject active styles, grouped by media type
			for( var k in styleBlocks ){
				if( styleBlocks.hasOwnProperty( k ) ){
					var ss = doc.createElement( "style" ),
						css = styleBlocks[ k ].join( "\n" );

					ss.type = "text/css";
					ss.media = k;

					//originally, ss was appended to a documentFragment and sheets were appended in bulk.
					//this caused crashes in IE in a number of circumstances, such as when the HTML element had a bg image set, so appending beforehand seems best. Thanks to @dvelyk for the initial research on this one!
					head.insertBefore( ss, lastLink.nextSibling );

					if ( ss.styleSheet ){
						ss.styleSheet.cssText = css;
					}
					else {
						ss.appendChild( doc.createTextNode( css ) );
					}

					//push to appendedEls to track for later removal
					appendedEls.push( ss );
				}
			}
		},
		//find media blocks in css text, convert to style blocks
		translate = function( styles, href, media ){
			var qs = styles.replace( respond.regex.keyframes, '' ).match( respond.regex.media ),
				ql = qs && qs.length || 0;

			//try to get CSS path
			href = href.substring( 0, href.lastIndexOf( "/" ) );

			var repUrls = function( css ){
					return css.replace( respond.regex.urls, "$1" + href + "$2$3" );
				},
				useMedia = !ql && media;

			//if path exists, tack on trailing slash
			if( href.length ){ href += "/"; }

			//if no internal queries exist, but media attr does, use that
			//note: this currently lacks support for situations where a media attr is specified on a link AND
				//its associated stylesheet has internal CSS media queries.
				//In those cases, the media attribute will currently be ignored.
			if( useMedia ){
				ql = 1;
			}

			for( var i = 0; i < ql; i++ ){
				var fullq, thisq, eachq, eql;

				//media attr
				if( useMedia ){
					fullq = media;
					rules.push( repUrls( styles ) );
				}
				//parse for styles
				else{
					fullq = qs[ i ].match( respond.regex.findStyles ) && RegExp.$1;
					rules.push( RegExp.$2 && repUrls( RegExp.$2 ) );
				}

				eachq = fullq.split( "," );
				eql = eachq.length;

				for( var j = 0; j < eql; j++ ){
					thisq = eachq[ j ];
					mediastyles.push( {
						media : thisq.split( "(" )[ 0 ].match( respond.regex.only ) && RegExp.$2 || "all",
						rules : rules.length - 1,
						hasquery : thisq.indexOf("(") > -1,
						minw : thisq.match( respond.regex.minw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" ),
						maxw : thisq.match( respond.regex.maxw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" )
					} );
				}
			}

			applyMedia();
		},

		//recurse through request queue, get css text
		makeRequests = function(){
			if( requestQueue.length ){
				var thisRequest = requestQueue.shift();

				ajax( thisRequest.href, function( styles ){
					translate( styles, thisRequest.href, thisRequest.media );
					parsedSheets[ thisRequest.href ] = true;

					// by wrapping recursive function call in setTimeout
					// we prevent "Stack overflow" error in IE7
					w.setTimeout(function(){ makeRequests(); },0);
				} );
			}
		},

		//loop stylesheets, send text content to translate
		ripCSS = function(){

			for( var i = 0; i < links.length; i++ ){
				var sheet = links[ i ],
				href = sheet.href,
				media = sheet.media,
				isCSS = sheet.rel && sheet.rel.toLowerCase() === "stylesheet";

				//only links plz and prevent re-parsing
				if( !!href && isCSS && !parsedSheets[ href ] ){
					// selectivizr exposes css through the rawCssText expando
					if (sheet.styleSheet && sheet.styleSheet.rawCssText) {
						translate( sheet.styleSheet.rawCssText, href, media );
						parsedSheets[ href ] = true;
					} else {
						if( (!/^([a-zA-Z:]*\/\/)/.test( href ) && !base) ||
							href.replace( RegExp.$1, "" ).split( "/" )[0] === w.location.host ){
							// IE7 doesn't handle urls that start with '//' for ajax request
							// manually add in the protocol
							if ( href.substring(0,2) === "//" ) { href = w.location.protocol + href; }
							requestQueue.push( {
								href: href,
								media: media
							} );
						}
					}
				}
			}
			makeRequests();
		};

	//translate CSS
	ripCSS();

	//expose update for re-running respond later on
	respond.update = ripCSS;

	//expose getEmValue
	respond.getEmValue = getEmValue;

	//adjust on resize
	function callMedia(){
		applyMedia( true );
	}

	if( w.addEventListener ){
		w.addEventListener( "resize", callMedia, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onresize", callMedia );
	}
})(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3BvbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InJlc3BvbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgUmVzcG9uZC5qcyB2MS40LjA6IG1pbi9tYXgtd2lkdGggbWVkaWEgcXVlcnkgcG9seWZpbGwuIChjKSBTY290dCBKZWhsLiBNSVQgTGljLiBqLm1wL3Jlc3BvbmRqcyAgKi9cbihmdW5jdGlvbiggdyApe1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdC8vZXhwb3NlZCBuYW1lc3BhY2Vcblx0dmFyIHJlc3BvbmQgPSB7fTtcblx0dy5yZXNwb25kID0gcmVzcG9uZDtcblxuXHQvL2RlZmluZSB1cGRhdGUgZXZlbiBpbiBuYXRpdmUtbXEtc3VwcG9ydGluZyBicm93c2VycywgdG8gYXZvaWQgZXJyb3JzXG5cdHJlc3BvbmQudXBkYXRlID0gZnVuY3Rpb24oKXt9O1xuXG5cdC8vZGVmaW5lIGFqYXggb2JqXG5cdHZhciByZXF1ZXN0UXVldWUgPSBbXSxcblx0XHR4bWxIdHRwID0gKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHhtbGh0dHBtZXRob2QgPSBmYWxzZTtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHhtbGh0dHBtZXRob2QgPSBuZXcgdy5YTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2goIGUgKXtcblx0XHRcdFx0eG1saHR0cG1ldGhvZCA9IG5ldyB3LkFjdGl2ZVhPYmplY3QoIFwiTWljcm9zb2Z0LlhNTEhUVFBcIiApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJldHVybiB4bWxodHRwbWV0aG9kO1xuXHRcdFx0fTtcblx0XHR9KSgpLFxuXG5cdFx0Ly90d2Vha2VkIEFqYXggZnVuY3Rpb25zIGZyb20gUXVpcmtzbW9kZVxuXHRcdGFqYXggPSBmdW5jdGlvbiggdXJsLCBjYWxsYmFjayApIHtcblx0XHRcdHZhciByZXEgPSB4bWxIdHRwKCk7XG5cdFx0XHRpZiAoIXJlcSl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHJlcS5vcGVuKCBcIkdFVFwiLCB1cmwsIHRydWUgKTtcblx0XHRcdHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICggcmVxLnJlYWR5U3RhdGUgIT09IDQgfHwgcmVxLnN0YXR1cyAhPT0gMjAwICYmIHJlcS5zdGF0dXMgIT09IDMwNCApe1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYWxsYmFjayggcmVxLnJlc3BvbnNlVGV4dCApO1xuXHRcdFx0fTtcblx0XHRcdGlmICggcmVxLnJlYWR5U3RhdGUgPT09IDQgKXtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0cmVxLnNlbmQoIG51bGwgKTtcblx0XHR9O1xuXG5cdC8vZXhwb3NlIGZvciB0ZXN0aW5nXG5cdHJlc3BvbmQuYWpheCA9IGFqYXg7XG5cdHJlc3BvbmQucXVldWUgPSByZXF1ZXN0UXVldWU7XG5cblx0Ly8gZXhwb3NlIGZvciB0ZXN0aW5nXG5cdHJlc3BvbmQucmVnZXggPSB7XG5cdFx0bWVkaWE6IC9AbWVkaWFbXlxce10rXFx7KFteXFx7XFx9XSpcXHtbXlxcfVxce10qXFx9KSsvZ2ksXG5cdFx0a2V5ZnJhbWVzOiAvQCg/OlxcLSg/Om98bW96fHdlYmtpdClcXC0pP2tleWZyYW1lc1teXFx7XStcXHsoPzpbXlxce1xcfV0qXFx7W15cXH1cXHtdKlxcfSkrW15cXH1dKlxcfS9naSxcblx0XHR1cmxzOiAvKHVybFxcKClbJ1wiXT8oW15cXC9cXCknXCJdW146XFwpJ1wiXSspWydcIl0/KFxcKSkvZyxcblx0XHRmaW5kU3R5bGVzOiAvQG1lZGlhICooW15cXHtdKylcXHsoW1xcU1xcc10rPykkLyxcblx0XHRvbmx5OiAvKG9ubHlcXHMrKT8oW2EtekEtWl0rKVxccz8vLFxuXHRcdG1pbnc6IC9cXChbXFxzXSptaW5cXC13aWR0aFxccyo6W1xcc10qKFtcXHNdKlswLTlcXC5dKykocHh8ZW0pW1xcc10qXFwpLyxcblx0XHRtYXh3OiAvXFwoW1xcc10qbWF4XFwtd2lkdGhcXHMqOltcXHNdKihbXFxzXSpbMC05XFwuXSspKHB4fGVtKVtcXHNdKlxcKS9cblx0fTtcblxuXHQvL2V4cG9zZSBtZWRpYSBxdWVyeSBzdXBwb3J0IGZsYWcgZm9yIGV4dGVybmFsIHVzZVxuXHRyZXNwb25kLm1lZGlhUXVlcmllc1N1cHBvcnRlZCA9IHcubWF0Y2hNZWRpYSAmJiB3Lm1hdGNoTWVkaWEoIFwib25seSBhbGxcIiApICE9PSBudWxsICYmIHcubWF0Y2hNZWRpYSggXCJvbmx5IGFsbFwiICkubWF0Y2hlcztcblxuXHQvL2lmIG1lZGlhIHF1ZXJpZXMgYXJlIHN1cHBvcnRlZCwgZXhpdCBoZXJlXG5cdGlmKCByZXNwb25kLm1lZGlhUXVlcmllc1N1cHBvcnRlZCApe1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vZGVmaW5lIHZhcnNcblx0dmFyIGRvYyA9IHcuZG9jdW1lbnQsXG5cdFx0ZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG5cdFx0bWVkaWFzdHlsZXMgPSBbXSxcblx0XHRydWxlcyA9IFtdLFxuXHRcdGFwcGVuZGVkRWxzID0gW10sXG5cdFx0cGFyc2VkU2hlZXRzID0ge30sXG5cdFx0cmVzaXplVGhyb3R0bGUgPSAzMCxcblx0XHRoZWFkID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcImhlYWRcIiApWzBdIHx8IGRvY0VsZW0sXG5cdFx0YmFzZSA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJiYXNlXCIgKVswXSxcblx0XHRsaW5rcyA9IGhlYWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwibGlua1wiICksXG5cblx0XHRsYXN0Q2FsbCxcblx0XHRyZXNpemVEZWZlcixcblxuXHRcdC8vY2FjaGVkIGNvbnRhaW5lciBmb3IgMWVtIHZhbHVlLCBwb3B1bGF0ZWQgdGhlIGZpcnN0IHRpbWUgaXQncyBuZWVkZWRcblx0XHRlbWlucHgsXG5cblx0XHQvLyByZXR1cm5zIHRoZSB2YWx1ZSBvZiAxZW0gaW4gcGl4ZWxzXG5cdFx0Z2V0RW1WYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHJldCxcblx0XHRcdFx0ZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0XHRib2R5ID0gZG9jLmJvZHksXG5cdFx0XHRcdG9yaWdpbmFsSFRNTEZvbnRTaXplID0gZG9jRWxlbS5zdHlsZS5mb250U2l6ZSxcblx0XHRcdFx0b3JpZ2luYWxCb2R5Rm9udFNpemUgPSBib2R5ICYmIGJvZHkuc3R5bGUuZm9udFNpemUsXG5cdFx0XHRcdGZha2VVc2VkID0gZmFsc2U7XG5cblx0XHRcdGRpdi5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjphYnNvbHV0ZTtmb250LXNpemU6MWVtO3dpZHRoOjFlbVwiO1xuXG5cdFx0XHRpZiggIWJvZHkgKXtcblx0XHRcdFx0Ym9keSA9IGZha2VVc2VkID0gZG9jLmNyZWF0ZUVsZW1lbnQoIFwiYm9keVwiICk7XG5cdFx0XHRcdGJvZHkuc3R5bGUuYmFja2dyb3VuZCA9IFwibm9uZVwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAxZW0gaW4gYSBtZWRpYSBxdWVyeSBpcyB0aGUgdmFsdWUgb2YgdGhlIGRlZmF1bHQgZm9udCBzaXplIG9mIHRoZSBicm93c2VyXG5cdFx0XHQvLyByZXNldCBkb2NFbGVtIGFuZCBib2R5IHRvIGVuc3VyZSB0aGUgY29ycmVjdCB2YWx1ZSBpcyByZXR1cm5lZFxuXHRcdFx0ZG9jRWxlbS5zdHlsZS5mb250U2l6ZSA9IFwiMTAwJVwiO1xuXHRcdFx0Ym9keS5zdHlsZS5mb250U2l6ZSA9IFwiMTAwJVwiO1xuXG5cdFx0XHRib2R5LmFwcGVuZENoaWxkKCBkaXYgKTtcblxuXHRcdFx0aWYoIGZha2VVc2VkICl7XG5cdFx0XHRcdGRvY0VsZW0uaW5zZXJ0QmVmb3JlKCBib2R5LCBkb2NFbGVtLmZpcnN0Q2hpbGQgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0ID0gZGl2Lm9mZnNldFdpZHRoO1xuXG5cdFx0XHRpZiggZmFrZVVzZWQgKXtcblx0XHRcdFx0ZG9jRWxlbS5yZW1vdmVDaGlsZCggYm9keSApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGJvZHkucmVtb3ZlQ2hpbGQoIGRpdiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyByZXN0b3JlIHRoZSBvcmlnaW5hbCB2YWx1ZXNcblx0XHRcdGRvY0VsZW0uc3R5bGUuZm9udFNpemUgPSBvcmlnaW5hbEhUTUxGb250U2l6ZTtcblx0XHRcdGlmKCBvcmlnaW5hbEJvZHlGb250U2l6ZSApIHtcblx0XHRcdFx0Ym9keS5zdHlsZS5mb250U2l6ZSA9IG9yaWdpbmFsQm9keUZvbnRTaXplO1xuXHRcdFx0fVxuXG5cblx0XHRcdC8vYWxzbyB1cGRhdGUgZW1pbnB4IGJlZm9yZSByZXR1cm5pbmdcblx0XHRcdHJldCA9IGVtaW5weCA9IHBhcnNlRmxvYXQocmV0KTtcblxuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9LFxuXG5cdFx0Ly9lbmFibGUvZGlzYWJsZSBzdHlsZXNcblx0XHRhcHBseU1lZGlhID0gZnVuY3Rpb24oIGZyb21SZXNpemUgKXtcblx0XHRcdHZhciBuYW1lID0gXCJjbGllbnRXaWR0aFwiLFxuXHRcdFx0XHRkb2NFbGVtUHJvcCA9IGRvY0VsZW1bIG5hbWUgXSxcblx0XHRcdFx0Y3VycldpZHRoID0gZG9jLmNvbXBhdE1vZGUgPT09IFwiQ1NTMUNvbXBhdFwiICYmIGRvY0VsZW1Qcm9wIHx8IGRvYy5ib2R5WyBuYW1lIF0gfHwgZG9jRWxlbVByb3AsXG5cdFx0XHRcdHN0eWxlQmxvY2tzXHQ9IHt9LFxuXHRcdFx0XHRsYXN0TGluayA9IGxpbmtzWyBsaW5rcy5sZW5ndGgtMSBdLFxuXHRcdFx0XHRub3cgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG5cdFx0XHQvL3Rocm90dGxlIHJlc2l6ZSBjYWxsc1xuXHRcdFx0aWYoIGZyb21SZXNpemUgJiYgbGFzdENhbGwgJiYgbm93IC0gbGFzdENhbGwgPCByZXNpemVUaHJvdHRsZSApe1xuXHRcdFx0XHR3LmNsZWFyVGltZW91dCggcmVzaXplRGVmZXIgKTtcblx0XHRcdFx0cmVzaXplRGVmZXIgPSB3LnNldFRpbWVvdXQoIGFwcGx5TWVkaWEsIHJlc2l6ZVRocm90dGxlICk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRsYXN0Q2FsbCA9IG5vdztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKCB2YXIgaSBpbiBtZWRpYXN0eWxlcyApe1xuXHRcdFx0XHRpZiggbWVkaWFzdHlsZXMuaGFzT3duUHJvcGVydHkoIGkgKSApe1xuXHRcdFx0XHRcdHZhciB0aGlzc3R5bGUgPSBtZWRpYXN0eWxlc1sgaSBdLFxuXHRcdFx0XHRcdFx0bWluID0gdGhpc3N0eWxlLm1pbncsXG5cdFx0XHRcdFx0XHRtYXggPSB0aGlzc3R5bGUubWF4dyxcblx0XHRcdFx0XHRcdG1pbm51bGwgPSBtaW4gPT09IG51bGwsXG5cdFx0XHRcdFx0XHRtYXhudWxsID0gbWF4ID09PSBudWxsLFxuXHRcdFx0XHRcdFx0ZW0gPSBcImVtXCI7XG5cblx0XHRcdFx0XHRpZiggISFtaW4gKXtcblx0XHRcdFx0XHRcdG1pbiA9IHBhcnNlRmxvYXQoIG1pbiApICogKCBtaW4uaW5kZXhPZiggZW0gKSA+IC0xID8gKCBlbWlucHggfHwgZ2V0RW1WYWx1ZSgpICkgOiAxICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKCAhIW1heCApe1xuXHRcdFx0XHRcdFx0bWF4ID0gcGFyc2VGbG9hdCggbWF4ICkgKiAoIG1heC5pbmRleE9mKCBlbSApID4gLTEgPyAoIGVtaW5weCB8fCBnZXRFbVZhbHVlKCkgKSA6IDEgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBpZiB0aGVyZSdzIG5vIG1lZGlhIHF1ZXJ5IGF0IGFsbCAodGhlICgpIHBhcnQpLCBvciBtaW4gb3IgbWF4IGlzIG5vdCBudWxsLCBhbmQgaWYgZWl0aGVyIGlzIHByZXNlbnQsIHRoZXkncmUgdHJ1ZVxuXHRcdFx0XHRcdGlmKCAhdGhpc3N0eWxlLmhhc3F1ZXJ5IHx8ICggIW1pbm51bGwgfHwgIW1heG51bGwgKSAmJiAoIG1pbm51bGwgfHwgY3VycldpZHRoID49IG1pbiApICYmICggbWF4bnVsbCB8fCBjdXJyV2lkdGggPD0gbWF4ICkgKXtcblx0XHRcdFx0XHRcdGlmKCAhc3R5bGVCbG9ja3NbIHRoaXNzdHlsZS5tZWRpYSBdICl7XG5cdFx0XHRcdFx0XHRcdHN0eWxlQmxvY2tzWyB0aGlzc3R5bGUubWVkaWEgXSA9IFtdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0c3R5bGVCbG9ja3NbIHRoaXNzdHlsZS5tZWRpYSBdLnB1c2goIHJ1bGVzWyB0aGlzc3R5bGUucnVsZXMgXSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvL3JlbW92ZSBhbnkgZXhpc3RpbmcgcmVzcG9uZCBzdHlsZSBlbGVtZW50KHMpXG5cdFx0XHRmb3IoIHZhciBqIGluIGFwcGVuZGVkRWxzICl7XG5cdFx0XHRcdGlmKCBhcHBlbmRlZEVscy5oYXNPd25Qcm9wZXJ0eSggaiApICl7XG5cdFx0XHRcdFx0aWYoIGFwcGVuZGVkRWxzWyBqIF0gJiYgYXBwZW5kZWRFbHNbIGogXS5wYXJlbnROb2RlID09PSBoZWFkICl7XG5cdFx0XHRcdFx0XHRoZWFkLnJlbW92ZUNoaWxkKCBhcHBlbmRlZEVsc1sgaiBdICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRhcHBlbmRlZEVscy5sZW5ndGggPSAwO1xuXG5cdFx0XHQvL2luamVjdCBhY3RpdmUgc3R5bGVzLCBncm91cGVkIGJ5IG1lZGlhIHR5cGVcblx0XHRcdGZvciggdmFyIGsgaW4gc3R5bGVCbG9ja3MgKXtcblx0XHRcdFx0aWYoIHN0eWxlQmxvY2tzLmhhc093blByb3BlcnR5KCBrICkgKXtcblx0XHRcdFx0XHR2YXIgc3MgPSBkb2MuY3JlYXRlRWxlbWVudCggXCJzdHlsZVwiICksXG5cdFx0XHRcdFx0XHRjc3MgPSBzdHlsZUJsb2Nrc1sgayBdLmpvaW4oIFwiXFxuXCIgKTtcblxuXHRcdFx0XHRcdHNzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdFx0XHRcdFx0c3MubWVkaWEgPSBrO1xuXG5cdFx0XHRcdFx0Ly9vcmlnaW5hbGx5LCBzcyB3YXMgYXBwZW5kZWQgdG8gYSBkb2N1bWVudEZyYWdtZW50IGFuZCBzaGVldHMgd2VyZSBhcHBlbmRlZCBpbiBidWxrLlxuXHRcdFx0XHRcdC8vdGhpcyBjYXVzZWQgY3Jhc2hlcyBpbiBJRSBpbiBhIG51bWJlciBvZiBjaXJjdW1zdGFuY2VzLCBzdWNoIGFzIHdoZW4gdGhlIEhUTUwgZWxlbWVudCBoYWQgYSBiZyBpbWFnZSBzZXQsIHNvIGFwcGVuZGluZyBiZWZvcmVoYW5kIHNlZW1zIGJlc3QuIFRoYW5rcyB0byBAZHZlbHlrIGZvciB0aGUgaW5pdGlhbCByZXNlYXJjaCBvbiB0aGlzIG9uZSFcblx0XHRcdFx0XHRoZWFkLmluc2VydEJlZm9yZSggc3MsIGxhc3RMaW5rLm5leHRTaWJsaW5nICk7XG5cblx0XHRcdFx0XHRpZiAoIHNzLnN0eWxlU2hlZXQgKXtcblx0XHRcdFx0XHRcdHNzLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRzcy5hcHBlbmRDaGlsZCggZG9jLmNyZWF0ZVRleHROb2RlKCBjc3MgKSApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vcHVzaCB0byBhcHBlbmRlZEVscyB0byB0cmFjayBmb3IgbGF0ZXIgcmVtb3ZhbFxuXHRcdFx0XHRcdGFwcGVuZGVkRWxzLnB1c2goIHNzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdC8vZmluZCBtZWRpYSBibG9ja3MgaW4gY3NzIHRleHQsIGNvbnZlcnQgdG8gc3R5bGUgYmxvY2tzXG5cdFx0dHJhbnNsYXRlID0gZnVuY3Rpb24oIHN0eWxlcywgaHJlZiwgbWVkaWEgKXtcblx0XHRcdHZhciBxcyA9IHN0eWxlcy5yZXBsYWNlKCByZXNwb25kLnJlZ2V4LmtleWZyYW1lcywgJycgKS5tYXRjaCggcmVzcG9uZC5yZWdleC5tZWRpYSApLFxuXHRcdFx0XHRxbCA9IHFzICYmIHFzLmxlbmd0aCB8fCAwO1xuXG5cdFx0XHQvL3RyeSB0byBnZXQgQ1NTIHBhdGhcblx0XHRcdGhyZWYgPSBocmVmLnN1YnN0cmluZyggMCwgaHJlZi5sYXN0SW5kZXhPZiggXCIvXCIgKSApO1xuXG5cdFx0XHR2YXIgcmVwVXJscyA9IGZ1bmN0aW9uKCBjc3MgKXtcblx0XHRcdFx0XHRyZXR1cm4gY3NzLnJlcGxhY2UoIHJlc3BvbmQucmVnZXgudXJscywgXCIkMVwiICsgaHJlZiArIFwiJDIkM1wiICk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHVzZU1lZGlhID0gIXFsICYmIG1lZGlhO1xuXG5cdFx0XHQvL2lmIHBhdGggZXhpc3RzLCB0YWNrIG9uIHRyYWlsaW5nIHNsYXNoXG5cdFx0XHRpZiggaHJlZi5sZW5ndGggKXsgaHJlZiArPSBcIi9cIjsgfVxuXG5cdFx0XHQvL2lmIG5vIGludGVybmFsIHF1ZXJpZXMgZXhpc3QsIGJ1dCBtZWRpYSBhdHRyIGRvZXMsIHVzZSB0aGF0XG5cdFx0XHQvL25vdGU6IHRoaXMgY3VycmVudGx5IGxhY2tzIHN1cHBvcnQgZm9yIHNpdHVhdGlvbnMgd2hlcmUgYSBtZWRpYSBhdHRyIGlzIHNwZWNpZmllZCBvbiBhIGxpbmsgQU5EXG5cdFx0XHRcdC8vaXRzIGFzc29jaWF0ZWQgc3R5bGVzaGVldCBoYXMgaW50ZXJuYWwgQ1NTIG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHRcdC8vSW4gdGhvc2UgY2FzZXMsIHRoZSBtZWRpYSBhdHRyaWJ1dGUgd2lsbCBjdXJyZW50bHkgYmUgaWdub3JlZC5cblx0XHRcdGlmKCB1c2VNZWRpYSApe1xuXHRcdFx0XHRxbCA9IDE7XG5cdFx0XHR9XG5cblx0XHRcdGZvciggdmFyIGkgPSAwOyBpIDwgcWw7IGkrKyApe1xuXHRcdFx0XHR2YXIgZnVsbHEsIHRoaXNxLCBlYWNocSwgZXFsO1xuXG5cdFx0XHRcdC8vbWVkaWEgYXR0clxuXHRcdFx0XHRpZiggdXNlTWVkaWEgKXtcblx0XHRcdFx0XHRmdWxscSA9IG1lZGlhO1xuXHRcdFx0XHRcdHJ1bGVzLnB1c2goIHJlcFVybHMoIHN0eWxlcyApICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly9wYXJzZSBmb3Igc3R5bGVzXG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0ZnVsbHEgPSBxc1sgaSBdLm1hdGNoKCByZXNwb25kLnJlZ2V4LmZpbmRTdHlsZXMgKSAmJiBSZWdFeHAuJDE7XG5cdFx0XHRcdFx0cnVsZXMucHVzaCggUmVnRXhwLiQyICYmIHJlcFVybHMoIFJlZ0V4cC4kMiApICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlYWNocSA9IGZ1bGxxLnNwbGl0KCBcIixcIiApO1xuXHRcdFx0XHRlcWwgPSBlYWNocS5sZW5ndGg7XG5cblx0XHRcdFx0Zm9yKCB2YXIgaiA9IDA7IGogPCBlcWw7IGorKyApe1xuXHRcdFx0XHRcdHRoaXNxID0gZWFjaHFbIGogXTtcblx0XHRcdFx0XHRtZWRpYXN0eWxlcy5wdXNoKCB7XG5cdFx0XHRcdFx0XHRtZWRpYSA6IHRoaXNxLnNwbGl0KCBcIihcIiApWyAwIF0ubWF0Y2goIHJlc3BvbmQucmVnZXgub25seSApICYmIFJlZ0V4cC4kMiB8fCBcImFsbFwiLFxuXHRcdFx0XHRcdFx0cnVsZXMgOiBydWxlcy5sZW5ndGggLSAxLFxuXHRcdFx0XHRcdFx0aGFzcXVlcnkgOiB0aGlzcS5pbmRleE9mKFwiKFwiKSA+IC0xLFxuXHRcdFx0XHRcdFx0bWludyA6IHRoaXNxLm1hdGNoKCByZXNwb25kLnJlZ2V4Lm1pbncgKSAmJiBwYXJzZUZsb2F0KCBSZWdFeHAuJDEgKSArICggUmVnRXhwLiQyIHx8IFwiXCIgKSxcblx0XHRcdFx0XHRcdG1heHcgOiB0aGlzcS5tYXRjaCggcmVzcG9uZC5yZWdleC5tYXh3ICkgJiYgcGFyc2VGbG9hdCggUmVnRXhwLiQxICkgKyAoIFJlZ0V4cC4kMiB8fCBcIlwiIClcblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0YXBwbHlNZWRpYSgpO1xuXHRcdH0sXG5cblx0XHQvL3JlY3Vyc2UgdGhyb3VnaCByZXF1ZXN0IHF1ZXVlLCBnZXQgY3NzIHRleHRcblx0XHRtYWtlUmVxdWVzdHMgPSBmdW5jdGlvbigpe1xuXHRcdFx0aWYoIHJlcXVlc3RRdWV1ZS5sZW5ndGggKXtcblx0XHRcdFx0dmFyIHRoaXNSZXF1ZXN0ID0gcmVxdWVzdFF1ZXVlLnNoaWZ0KCk7XG5cblx0XHRcdFx0YWpheCggdGhpc1JlcXVlc3QuaHJlZiwgZnVuY3Rpb24oIHN0eWxlcyApe1xuXHRcdFx0XHRcdHRyYW5zbGF0ZSggc3R5bGVzLCB0aGlzUmVxdWVzdC5ocmVmLCB0aGlzUmVxdWVzdC5tZWRpYSApO1xuXHRcdFx0XHRcdHBhcnNlZFNoZWV0c1sgdGhpc1JlcXVlc3QuaHJlZiBdID0gdHJ1ZTtcblxuXHRcdFx0XHRcdC8vIGJ5IHdyYXBwaW5nIHJlY3Vyc2l2ZSBmdW5jdGlvbiBjYWxsIGluIHNldFRpbWVvdXRcblx0XHRcdFx0XHQvLyB3ZSBwcmV2ZW50IFwiU3RhY2sgb3ZlcmZsb3dcIiBlcnJvciBpbiBJRTdcblx0XHRcdFx0XHR3LnNldFRpbWVvdXQoZnVuY3Rpb24oKXsgbWFrZVJlcXVlc3RzKCk7IH0sMCk7XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly9sb29wIHN0eWxlc2hlZXRzLCBzZW5kIHRleHQgY29udGVudCB0byB0cmFuc2xhdGVcblx0XHRyaXBDU1MgPSBmdW5jdGlvbigpe1xuXG5cdFx0XHRmb3IoIHZhciBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrICl7XG5cdFx0XHRcdHZhciBzaGVldCA9IGxpbmtzWyBpIF0sXG5cdFx0XHRcdGhyZWYgPSBzaGVldC5ocmVmLFxuXHRcdFx0XHRtZWRpYSA9IHNoZWV0Lm1lZGlhLFxuXHRcdFx0XHRpc0NTUyA9IHNoZWV0LnJlbCAmJiBzaGVldC5yZWwudG9Mb3dlckNhc2UoKSA9PT0gXCJzdHlsZXNoZWV0XCI7XG5cblx0XHRcdFx0Ly9vbmx5IGxpbmtzIHBseiBhbmQgcHJldmVudCByZS1wYXJzaW5nXG5cdFx0XHRcdGlmKCAhIWhyZWYgJiYgaXNDU1MgJiYgIXBhcnNlZFNoZWV0c1sgaHJlZiBdICl7XG5cdFx0XHRcdFx0Ly8gc2VsZWN0aXZpenIgZXhwb3NlcyBjc3MgdGhyb3VnaCB0aGUgcmF3Q3NzVGV4dCBleHBhbmRvXG5cdFx0XHRcdFx0aWYgKHNoZWV0LnN0eWxlU2hlZXQgJiYgc2hlZXQuc3R5bGVTaGVldC5yYXdDc3NUZXh0KSB7XG5cdFx0XHRcdFx0XHR0cmFuc2xhdGUoIHNoZWV0LnN0eWxlU2hlZXQucmF3Q3NzVGV4dCwgaHJlZiwgbWVkaWEgKTtcblx0XHRcdFx0XHRcdHBhcnNlZFNoZWV0c1sgaHJlZiBdID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYoICghL14oW2EtekEtWjpdKlxcL1xcLykvLnRlc3QoIGhyZWYgKSAmJiAhYmFzZSkgfHxcblx0XHRcdFx0XHRcdFx0aHJlZi5yZXBsYWNlKCBSZWdFeHAuJDEsIFwiXCIgKS5zcGxpdCggXCIvXCIgKVswXSA9PT0gdy5sb2NhdGlvbi5ob3N0ICl7XG5cdFx0XHRcdFx0XHRcdC8vIElFNyBkb2Vzbid0IGhhbmRsZSB1cmxzIHRoYXQgc3RhcnQgd2l0aCAnLy8nIGZvciBhamF4IHJlcXVlc3Rcblx0XHRcdFx0XHRcdFx0Ly8gbWFudWFsbHkgYWRkIGluIHRoZSBwcm90b2NvbFxuXHRcdFx0XHRcdFx0XHRpZiAoIGhyZWYuc3Vic3RyaW5nKDAsMikgPT09IFwiLy9cIiApIHsgaHJlZiA9IHcubG9jYXRpb24ucHJvdG9jb2wgKyBocmVmOyB9XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RRdWV1ZS5wdXNoKCB7XG5cdFx0XHRcdFx0XHRcdFx0aHJlZjogaHJlZixcblx0XHRcdFx0XHRcdFx0XHRtZWRpYTogbWVkaWFcblx0XHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWFrZVJlcXVlc3RzKCk7XG5cdFx0fTtcblxuXHQvL3RyYW5zbGF0ZSBDU1Ncblx0cmlwQ1NTKCk7XG5cblx0Ly9leHBvc2UgdXBkYXRlIGZvciByZS1ydW5uaW5nIHJlc3BvbmQgbGF0ZXIgb25cblx0cmVzcG9uZC51cGRhdGUgPSByaXBDU1M7XG5cblx0Ly9leHBvc2UgZ2V0RW1WYWx1ZVxuXHRyZXNwb25kLmdldEVtVmFsdWUgPSBnZXRFbVZhbHVlO1xuXG5cdC8vYWRqdXN0IG9uIHJlc2l6ZVxuXHRmdW5jdGlvbiBjYWxsTWVkaWEoKXtcblx0XHRhcHBseU1lZGlhKCB0cnVlICk7XG5cdH1cblxuXHRpZiggdy5hZGRFdmVudExpc3RlbmVyICl7XG5cdFx0dy5hZGRFdmVudExpc3RlbmVyKCBcInJlc2l6ZVwiLCBjYWxsTWVkaWEsIGZhbHNlICk7XG5cdH1cblx0ZWxzZSBpZiggdy5hdHRhY2hFdmVudCApe1xuXHRcdHcuYXR0YWNoRXZlbnQoIFwib25yZXNpemVcIiwgY2FsbE1lZGlhICk7XG5cdH1cbn0pKHRoaXMpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
