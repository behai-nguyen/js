/*
    Date Created: 13/03/2022.
*/
SUFFIX_MAP = [
	{ name: '.svgz', value: '.svg.gz' },
	{ name: '.tgz', value: '.tar.gz' },
	{ name: '.taz', value: '.tar.gz' },
	{ name: '.tz', value: '.tar.gz' },
	{ name: '.tbz2', value:'.tar.bz2' },
	{ name: '.txz', value: '.tar.xz' }
];

ENCODINGS_MAP = [
	{ name: '.gz', value: 'gzip' },
	{ name: '.Z', value: 'compress' },
	{ name: '.bz2', value: 'bzip2' },
	{ name: '.xz', value: 'xz' },
	{ name: '.br', value: 'br' }
];

/*
	Before adding new types, make sure they are either registered with IANA,
	at http://www.iana.org/assignments/media-types
	or extensions, i.e. using the x- prefix

	If you add to these, please keep them sorted by mime type.
	Make sure the entry with the preferred file extension for a particular mime type
	appears before any others of the same mimetype.
*/ 
TYPES_MAP  = [
	{ name: '.js', value: 'application/javascript' },
	{ name: '.mjs', value: 'application/javascript' },
	{ name: '.json', value: 'application/json' },
	{ name: '.webmanifest', value: 'application/manifest+json' },
	{ name: '.doc', value: 'application/msword' },
	{ name: '.dot', value: 'application/msword' },
	{ name: '.wiz', value: 'application/msword' },
	{ name: '.bin', value: 'application/octet-stream' },
	{ name: '.a', value: 'application/octet-stream' },
	{ name: '.dll', value: 'application/octet-stream' },
	{ name: '.exe', value: 'application/octet-stream' },
	{ name: '.o', value: 'application/octet-stream' },
	{ name: '.obj', value: 'application/octet-stream' },
	{ name: '.so', value: 'application/octet-stream' },
	{ name: '.oda', value: 'application/oda' },
	{ name: '.pdf', value: 'application/pdf' },
	{ name: '.p7c', value: 'application/pkcs7-mime' },
	{ name: '.ps', value: 'application/postscript' },
	{ name: '.ai', value: 'application/postscript' },
	{ name: '.eps', value: 'application/postscript' },
	{ name: '.m3u', value: 'application/vnd.apple.mpegurl' },
	{ name: '.m3u8', value: 'application/vnd.apple.mpegurl' },
	{ name: '.xls', value: 'application/vnd.ms-excel' },
	{ name: '.xlb', value: 'application/vnd.ms-excel' },
	{ name: '.ppt', value: 'application/vnd.ms-powerpoint' },
	{ name: '.pot', value: 'application/vnd.ms-powerpoint' },
	{ name: '.ppa', value: 'application/vnd.ms-powerpoint' },
	{ name: '.pps', value: 'application/vnd.ms-powerpoint' },
	{ name: '.pwz', value: 'application/vnd.ms-powerpoint' },
	{ name: '.wasm', value: 'application/wasm' },
	{ name: '.bcpio', value: 'application/x-bcpio' },
	{ name: '.cpio', value: 'application/x-cpio' },
	{ name: '.csh', value: 'application/x-csh' },
	{ name: '.dvi', value: 'application/x-dvi' },
	{ name: '.gtar', value: 'application/x-gtar' },
	{ name: '.hdf', value: 'application/x-hdf' },
	{ name: '.h5', value: 'application/x-hdf5' },
	{ name: '.latex', value: 'application/x-latex' },
	{ name: '.mif', value: 'application/x-mif' },
	{ name: '.cdf', value: 'application/x-netcdf' },
	{ name: '.nc', value: 'application/x-netcdf' },
	{ name: '.p12', value: 'application/x-pkcs12' },
	{ name: '.pfx', value: 'application/x-pkcs12' },
	{ name: '.ram', value: 'application/x-pn-realaudio' },
	{ name: '.pyc', value: 'application/x-python-code' },
	{ name: '.pyo', value: 'application/x-python-code' },
	{ name: '.sh', value: 'application/x-sh' },
	{ name: '.shar', value: 'application/x-shar' },
	{ name: '.swf', value: 'application/x-shockwave-flash' },
	{ name: '.sv4cpio', value: 'application/x-sv4cpio' },
	{ name: '.sv4crc', value: 'application/x-sv4crc' },
	{ name: '.tar', value: 'application/x-tar' },
	{ name: '.tcl', value: 'application/x-tcl' },
	{ name: '.tex', value: 'application/x-tex' },
	{ name: '.texi', value: 'application/x-texinfo' },
	{ name: '.texinfo', value: 'application/x-texinfo' },
	{ name: '.roff', value: 'application/x-troff' },
	{ name: '.t', value: 'application/x-troff' },
	{ name: '.tr', value: 'application/x-troff' },
	{ name: '.man', value: 'application/x-troff-man' },
	{ name: '.me', value: 'application/x-troff-me' },
	{ name: '.ms', value: 'application/x-troff-ms' },
	{ name: '.ustar', value: 'application/x-ustar' },
	{ name: '.src', value: 'application/x-wais-source' },
	{ name: '.xsl', value: 'application/xml' },
	{ name: '.rdf', value: 'application/xml' },
	{ name: '.wsdl', value: 'application/xml' },
	{ name: '.xpdl', value: 'application/xml' },
	{ name: '.zip', value: 'application/zip' },
	{ name: '.3gp', value: 'audio/3gpp' },
	{ name: '.3gpp', value: 'audio/3gpp' },
	{ name: '.3g2', value: 'audio/3gpp2' },
	{ name: '.3gpp2', value: 'audio/3gpp2' },
	{ name: '.aac', value: 'audio/aac' },
	{ name: '.adts', value: 'audio/aac' },
	{ name: '.loas', value: 'audio/aac' },
	{ name: '.ass', value: 'audio/aac' },
	{ name: '.au', value: 'audio/basic' },
	{ name: '.snd', value: 'audio/basic' },
	{ name: '.mp3', value: 'audio/mpeg' },
	{ name: '.mp2', value: 'audio/mpeg' },
	{ name: '.opus', value: 'audio/opus' },
	{ name: '.aif', value: 'audio/x-aiff' },
	{ name: '.aifc', value: 'audio/x-aiff' },
	{ name: '.aiff', value: 'audio/x-aiff' },
	{ name: '.ra', value: 'audio/x-pn-realaudio' },
	{ name: '.wav', value: 'audio/x-wav' },
	{ name: '.bmp', value: 'image/bmp' },
	{ name: '.gif', value: 'image/gif' },
	{ name: '.ief', value: 'image/ief' },
	{ name: '.jpg', value: 'image/jpeg' },
	{ name: '.jpe', value: 'image/jpeg' },
	{ name: '.jpeg', value: 'image/jpeg' },
	{ name: '.heic', value: 'image/heic' },
	{ name: '.heif', value: 'image/heif' },
	{ name: '.png', value: 'image/png' },
	{ name: '.svg', value: 'image/svg+xml' },
	{ name: '.tiff', value: 'image/tiff' },
	{ name: '.tif', value: 'image/tiff' },
	{ name: '.ico', value: 'image/vnd.microsoft.icon' },
	{ name: '.ras', value: 'image/x-cmu-raster' },
	{ name: '.bmp', value: 'image/x-ms-bmp' },
	{ name: '.pnm', value: 'image/x-portable-anymap' },
	{ name: '.pbm', value: 'image/x-portable-bitmap' },
	{ name: '.pgm', value: 'image/x-portable-graymap' },
	{ name: '.ppm', value: 'image/x-portable-pixmap' },
	{ name: '.rgb', value: 'image/x-rgb' },
	{ name: '.xbm', value: 'image/x-xbitmap' },
	{ name: '.xpm', value: 'image/x-xpixmap' },
	{ name: '.xwd', value: 'image/x-xwindowdump' },
	{ name: '.eml', value: 'message/rfc822' },
	{ name: '.mht', value: 'message/rfc822' },
	{ name: '.mhtml', value: 'message/rfc822' },
	{ name: '.nws', value: 'message/rfc822' },
	{ name: '.css', value: 'text/css' },
	{ name: '.csv', value: 'text/csv' },
	{ name: '.html', value: 'text/html' },
	{ name: '.htm', value: 'text/html' },
	{ name: '.txt', value: 'text/plain' },
	{ name: '.bat', value: 'text/plain' },
	{ name: '.c', value: 'text/plain' },
	{ name: '.h', value: 'text/plain' },
	{ name: '.ksh', value: 'text/plain' },
	{ name: '.pl', value: 'text/plain' },
	{ name: '.rtx', value: 'text/richtext' },
	{ name: '.tsv', value: 'text/tab-separated-values' },
	{ name: '.py', value: 'text/x-python' },
	{ name: '.etx', value: 'text/x-setext' },
	{ name: '.sgm', value: 'text/x-sgml' },
	{ name: '.sgml', value: 'text/x-sgml' },
	{ name: '.vcf', value: 'text/x-vcard' },
	{ name: '.xml', value: 'text/xml' },
	{ name: '.mp4', value: 'video/mp4' },
	{ name: '.mpeg', value: 'video/mpeg' },
	{ name: '.m1v', value: 'video/mpeg' },
	{ name: '.mpa', value: 'video/mpeg' },
	{ name: '.mpe', value: 'video/mpeg' },
	{ name: '.mpg', value: 'video/mpeg' },
	{ name: '.mov', value: 'video/quicktime' },
	{ name: '.qt', value: 'video/quicktime' },
	{ name: '.webm', value: 'video/webm' },
	{ name: '.avi', value: 'video/x-msvideo' },
	{ name: '.movie', value: 'video/x-sgi-movie' }
];

/*
	These are non-standard types, commonly found in the wild.  They will
	only match if strict=0 flag is given to the API methods.

	Please sort these too
*/
COMMON_TYPES = [
	{ name: '.rtf', value: 'application/rtf' },
	{ name: '.midi', value: 'audio/midi' },
	{ name: '.mid', value: 'audio/midi' },
	{ name: '.jpg', value: 'image/jpg' },
	{ name: '.pict', value: 'image/pict' },
	{ name: '.pct', value: 'image/pict' },
	{ name: '.pic', value: 'image/pict' },
	{ name: '.xul', value: 'text/xul' }
];

function get_suffix_map( _name ) {
    const result = SUFFIX_MAP.find( ({ name }) => name === _name );
	return ( typeof(result) === 'undefined' ) ? '' : result.value;
};

function get_encodings_map( _name ) {
    const result = ENCODINGS_MAP.find( ({ name }) => name === _name );
	return ( typeof(result) === 'undefined' ) ? '' : result.value;
};

function get_types_map( _name ) {
    const result = TYPES_MAP.find( ({ name }) => name === _name );
	return ( typeof(result) === 'undefined' ) ? '' : result.value;
};

function get_common_types( _name ) {
    const result = COMMON_TYPES.find( ({ name }) => name === _name );
	return ( typeof(result) === 'undefined' ) ? '' : result.value;
};