/*
  various functions to be used in generating QWTs
	
  TODO: 
		- Test code if it works
		- Create decode function for QWT
*/
function UrlEncode(strbase64){
    return strbase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}

function UrlDecode(base64url){
    const base64url = (base64url + '===').slice(0, base64url.length + (base64url.length % 4));
    return base64url.replace(/-/g, '+').replace(/_/g, '/');
}

function encodeToURLData(data) {
   return UrlEncode(btoa(data));
}

/* 
  function returns plaintext of the base64url encoded string
  to be used for decoding
*/
function decodeFromURLData(baseUrlEncodedStr) {
	// convert first to plain base64 string
	const base64Str = UrlDecode(baseUrlEncodedStr);
	return atob(base64Str);
}

/* function requires CryptoJS */
function sign(header, payload) {
	const signingSalt = '1101';
	return CryptoJS.SHA1(signingSalt + ';' + encodeToURLData(header) + ';' + encodeToURLData(payload));
}

/*
	function generateQWT
	
	arguments: 
		- <header>: plainText header data 
		- <payload>: plainText payload data 
*/
function generateQWT(header, payload) {
   const encodedHeader = encodeToURLData(header);
   const encodedPayload = encodeToURLData(payload);
   const signature = sign(header, payload);
   return encodedHeader + '.' + encodedPayload + '.' + signature;
}
