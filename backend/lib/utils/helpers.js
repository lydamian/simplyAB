module.exports = {
  HTTP_CODES: {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    OK: 200,
  	CORS_ORIGIN_DENIED: 200,
    UNSUPPORTED_HTTP_REQUEST_HEADER: 200,
    200	Invalid preflight CORS request: Missing Access-Control-Request-Method header
    201	Created
    202	Accepted
    203	Non-Authoritative Info
    204	No Content
    205	Reset Content
    206	Partial Content
    207	Multi-Status
    300	Multiple Choices
    301	Moved Permanently
    302	Found
    303	See Other
    304	Not Modified
    305	Use Proxy
    307	Temporary Redirect
    400	BAD REQUEST
    400	Unsupported OAuth Version
    401	Developer Inactive
    401	Unauthorized
    402	Payment Required
    403	Forbidden
    403	Timestamp is Invalid
    403	Service Requires SSL
    403	Invalid API Key CID pair
    403	Invalid API Plan
    403	CORS origin denied
    404	Not Found
    405	Method Not Allowed
    406	Not Acceptable
    407	Proxy Authentication Required
    408	Request Timeout
    409	Conflict
    410	Gone
    411	Length Required
    412	Precondition Failed
    413	Request Entity Too Large
    414	Request URI Too Large
    415	Unsupported Media Type
    416	Requested Range Not Satisfiable
    417	Expectation Failed
    419	Authentication Timeout
    420	Method Failure
    422	Unprocessable Entity
    423	Locked
    424	Failed Dependency
    429	Too Many Requests
    450	Blocked by Windows Parental Controls
    451	Redirect
    500	Internal Server Error
    501	Not Implemented
    502	Bad Gateway
    503	Service Unavailable
    504	Gateway Timeout
    505	HTTP Version Not Supported
    510	Not Extended
    596	Invalid preflight CORS request: Missing Origin header or Request's Http Method is not OPTIONS
  }
}