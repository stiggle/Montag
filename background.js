/* 
	Montag - A fireman bypassing 451
	
	A quick and dirty browser addon
	Check all incoming URL for a HTTP status of 451 (Unavailable For Legal Reasons)
	usually used to block EU citizens due to GDPR.
	
	Redirect these requests through Google Translate to bypass the restriction.
	Requests a translation in French, but views the original.
	
	David Priestley - 29/08/2018
*/


var pattern = "<all_urls>";
var hostLang = "en";
var targetLang = "fr";

function redirect(requestDetails) {
	if ( requestDetails.statusCode == 451) {
		return {
			redirectUrl: "https://translate.google.com/translate?hl=" + hostLang + "&tl=" + targetLang + "&sl=auto&anno=2&u=" + requestDetails.url
		}
	} 
}

browser.webRequest.onHeadersReceived.addListener(
  redirect,
  {urls:[pattern]},
  ["blocking"]
);