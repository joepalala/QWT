/*
	TODO: 
		- Create example code
*/
var SHA1 = require("crypto-js/sha1");
var Base64 = require("crypto-js/enc-base64");
var CryptoCore = require("crypto-js/core");

// morse for 'Q', used as salt for creating signature
const signingSalt = '1101';
// separator used in creating signature
const sep = ';'; 

function encodeWithBase64(str) {
  const encodedWord = CryptoCore.Utf8.parse(str); 
  const encoded = Base64.stringify(encodedWord);

  return encoded;
}

/*
	function generateQWT
	
	arguments: 
		- <header>: plainText header data 
		- <payload>: plainText payload data 
*/
function generateQWT(header, payload) {
   const encodedHeader = encodeWithBase64(header);
   const encodedPayload = encodeWithBase64(payload);
   const signature = SHA1(signingSalt + sep + encodedHeader + sep + encodedPayload);
   
   const token = encodedHeader + "." + encodedPayload + "." + signature;
   return token;
}

/* verify the token with the signature  */
function verifyQwt(qtoken) {
	const parts = qtoken.split("\\.");
	const [header, payload, signature] = parts;
	const expectedSig = SHA1(signingSalt + sep + header + sep + payload);
	
	const isSigValid = (signature === expected) ?  true : false;
	return isSigValid;
}
