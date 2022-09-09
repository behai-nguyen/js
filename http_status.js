//
// Informational
//

// 'Continue', 'Request received, please continue',
const CONTINUE = 100; 
// 'Switching Protocols', 'Switching to new protocol; 
// obey Upgrade header'.
const SWITCHING_PROTOCOLS = 101;
// 'Processing'.
const PROCESSING = 102;
//'Early Hints'.
const EARLY_HINTS = 103;

//
// Success.
//

// 'OK', 'Request fulfilled, document follows'.
const OK = 200;
// 'Created', 'Document created, URL follows'.
const CREATED = 201;
// 'Accepted', 'Request accepted, processing continues off-line'.
const ACCEPTED = 202;
// 'Non-Authoritative Information', 'Request fulfilled from cache'.
const NON_AUTHORITATIVE_INFORMATION = 203;
// 'No Content', 'Request fulfilled, nothing follows'.
const NO_CONTENT = 204;
// 'Reset Content', 'Clear input form for further input'.
const RESET_CONTENT = 205;
// 'Partial Content', 'Partial content follows'.
const PARTIAL_CONTENT = 206;
// 'Multi-Status'.
const MULTI_STATUS = 207;
// 'Already Reported.
const ALREADY_REPORTED = 208;
// 'IM Used'.
const IM_USED = 226;

//
// Redirection.
//

// 'Multiple Choices, Object has several resources -- see URI list'.
const MULTIPLE_CHOICES = 300;
// 'Moved Permanently, Object moved permanently -- see URI list'.
const MOVED_PERMANENTLY = 301; 
// 'Found, Object moved temporarily -- see URI list'.
const FOUND = 302;
// 'See Other', 'Object moved -- see Method and URL list'
const SEE_OTHER = 303;

// 'Not Modified', 'Document has not changed since given time'.
const NOT_MODIFIED = 304;
// 'Use Proxy', 'You must use proxy specified in Location to access this resource'.
const USE_PROXY = 305;
// 'Temporary Redirect, Object moved temporarily -- see URI list'.
const TEMPORARY_REDIRECT = 307;
// 'Permanent Redirect, Object moved permanently -- see URI list'.
const PERMANENT_REDIRECT = 308;

//
// Client error.
//

// 'Bad Request', 'Bad request syntax or unsupported method'.
const BAD_REQUEST = 400;
// 'Unauthorized', 'No permission -- see authorization schemes'.
const UNAUTHORIZED = 401;
// 'Payment Required', 'No payment -- see charging schemes'.
const PAYMENT_REQUIRED = 402;
// 'Forbidden', 'Request forbidden -- authorization will not help'.
const FORBIDDEN = 403;
// 'Not Found', 'Nothing matches the given URI'.
const NOT_FOUND = 404;
// 'Method Not Allowed, Specified method is invalid for this resource'.	
const METHOD_NOT_ALLOWED = 405;
// 'Not Acceptable', 'URI not available in preferred format'.
const NOT_ACCEPTABLE = 406;

// 'Proxy Authentication Required',
// 'You must authenticate with this proxy before proceeding')
const PROXY_AUTHENTICATION_REQUIRED = 407;
// 'Request Timeout', 'Request timed out; try again later'.
const REQUEST_TIMEOUT = 408;
// 'Conflict', 'Request conflict'.
const CONFLICT = 409;
// 'Gone', 'URI no longer exists and has been permanently removed'.
const GONE = 410;
// 'Length Required', 'Client must specify Content-Length'.
const LENGTH_REQUIRED = 411;
// 'Precondition Failed', 'Precondition in headers is false'.	
const PRECONDITION_FAILED = 412;
// 'Request Entity Too Large, Entity is too large')	
const REQUEST_ENTITY_TOO_LARGE = 413;
// 'Request-URI Too Long', 'URI is too long'.	
const REQUEST_URI_TOO_LONG = 414;
// 'Unsupported Media Type', 'Entity body in unsupported format'.
const UNSUPPORTED_MEDIA_TYPE = 415;
// 'Requested Range Not Satisfiable', 'Cannot satisfy request range'.	
const REQUESTED_RANGE_NOT_SATISFIABLE = 416;
// 'Expectation Failed', 'Expect condition could not be satisfied'.
const EXPECTATION_FAILED = 417;
	
// 'I'm a Teapot',
// 'Server refuses to brew coffee because it is a teapot.'
const IM_A_TEAPOT = 418;
// 'Misdirected Request', 'Server is not able to produce a response'.
const MISDIRECTED_REQUEST = 421;
// 'Unprocessable Entity'.	
const UNPROCESSABLE_ENTITY = 422;
// 'Locked'.
const LOCKED = 423;
// 'Failed Dependency'.
const FAILED_DEPENDENCY = 424;
// 'Too Early'.
const TOO_EARLY = 425;
// 'Upgrade Required'.
const UPGRADE_REQUIRED = 426;
// 'Precondition Required', 'The origin server requires the request to be conditional'.
const PRECONDITION_REQUIRED = 428;
// 'Too Many Requests',
// 'The user has sent too many requests in '
// 'a given amount of time ("rate limiting")')
const TOO_MANY_REQUESTS = 429;
// 'Request Header Fields Too Large',
// 'The server is unwilling to process the request because its header '
// 'fields are too large'.
const REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
// 'Unavailable For Legal Reasons'.
// 'The server is denying access to the '
// 'resource as a consequence of a legal demand'.
const UNAVAILABLE_FOR_LEGAL_REASONS = 451;

//
// Server errors.
//

// 'Internal Server Error', 'Server got itself in trouble'.
const INTERNAL_SERVER_ERROR = 500;
// 'Not Implemented', 'Server does not support this operation'.
const NOT_IMPLEMENTED = 501;
// 'Bad Gateway', 'Invalid responses from another server/proxy'.
const BAD_GATEWAY = 502;
// 'Service Unavailable', 'The server cannot process the request due to a high load'.
const SERVICE_UNAVAILABLE = 503;
// 'Gateway Timeout', 'The gateway server did not receive a timely response'.
const GATEWAY_TIMEOUT = 504;
// 'HTTP Version Not Supported', 'Cannot fulfill request'.
const HTTP_VERSION_NOT_SUPPORTED = 505;
// 'Variant Also Negotiates'.
const VARIANT_ALSO_NEGOTIATES = 506;
// 'Insufficient Storage'.
const INSUFFICIENT_STORAGE = 507;
// 'Loop Detected'.
const LOOP_DETECTED = 508;
// 'Not Extended'.
const NOT_EXTENDED = 510;
// 'Network Authentication Required'.
// 'The client needs to authenticate to gain network access'.
const NETWORK_AUTHENTICATION_REQUIRED = 511;