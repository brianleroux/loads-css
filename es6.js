/*!
 * this is all @scottjehl, really i just export it and supply a callback
 */
function loadCSS(href, callback) {
	var ss = window.document.createElement( "link" );
	var ref = window.document.getElementsByTagName( "script" )[ 0 ];
	var sheets = window.document.styleSheets;
	ss.rel = "stylesheet";
	ss.href = href;
	// temporarily, set media to something non-matching to ensure it'll fetch without blocking render
	ss.media = "only x";
	// inject link
	ref.parentNode.insertBefore( ss, ref );
	// This function sets the link's media back to `all` so that the stylesheet applies once it loads
	// It is designed to poll until document.styleSheets includes the new sheet.
	function toggleMedia(){
		var defined;
		for( var i = 0; i < sheets.length; i++ ){
			if( sheets[ i ].href && sheets[ i ].href.indexOf( href ) > -1 ){
				defined = true;
			}
		}
		if( defined ){
			ss.media = "all";
            callback()
		}
		else {
			setTimeout( toggleMedia );
		}
	}
	toggleMedia();
	return ss;
}

export default loadCSS
