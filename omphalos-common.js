let AVAILABLE_LANGUAGES = [
	{ code: "af", name: "Afrikaans"},
	{ code: "sq", name: "Albanian"},
	{ code: "ar", name: "Arabic"},
	{ code: "hy", name: "Armenian"},
	{ code: "az", name: "Azerbaijani"},
	{ code: "eu", name: "Basque"},
	{ code: "be", name: "Belarusian"},
	{ code: "bn", name: "Bengali"},
	{ code: "bs", name: "Bosnian (Latin)"},
	{ code: "bg", name: "Bulgarian"},
	{ code: "ca", name: "Catalan"},
	{ code: "ceb", name: "Cebuano"},
	{ code: "zh", name: "Chinese (Simplified)"},
	{ code: "zh-TW", name: "Chinese (Traditional)"},
	{ code: "hr", name: "Croatian"},
	{ code: "cs", name: "Czech"},
	{ code: "da", name: "Danish"},
	{ code: "nl", name: "Dutch"},
	{ code: "en", name: "English"},
	{ code: "eo", name: "Esperanto"},
	{ code: "et", name: "Estonian"},
	{ code: "tl", name: "Filipino"},
	{ code: "fi", name: "Finnish"},
	{ code: "fr", name: "French"},
	{ code: "gl", name: "Galician"},
	{ code: "ka", name: "Georgian"},
	{ code: "de", name: "German"},
	{ code: "el", name: "Greek"},
	{ code: "gu", name: "Gujarati"},
	{ code: "ht", name: "Haitian Creole"},
	{ code: "ha", name: "Hausa"},
	{ code: "iw", name: "Hebrew"},
	{ code: "hi", name: "Hindi"},
	{ code: "hmn", name: "Hmong"},
	{ code: "hu", name: "Hungarian"},
	{ code: "is", name: "Icelandic"},
	{ code: "ig", name: "Igbo"},
	{ code: "id", name: "Indonesian"},
	{ code: "ga", name: "Irish"},
	{ code: "it", name: "Italian"},
	{ code: "ja", name: "Japanese"},
	{ code: "jw", name: "Javanese"},
	{ code: "kn", name: "Kannada"},
	{ code: "km", name: "Khmer"},
	{ code: "ko", name: "Korean"},
	{ code: "lo", name: "Lao"},
	{ code: "la", name: "Latin"},
	{ code: "lv", name: "Latvian"},
	{ code: "lt", name: "Lithuanian"},
	{ code: "mk", name: "Macedonian"},
	{ code: "ms", name: "Malay"},
	{ code: "mt", name: "Maltese"},
	{ code: "mi", name: "Maori"},
	{ code: "mr", name: "Marathi"},
	{ code: "mn", name: "Mongolian"},
	{ code: "ne", name: "Nepali"},
	{ code: "no", name: "Norwegian"},
	{ code: "fa", name: "Persian"},
	{ code: "pl", name: "Polish"},
	{ code: "pt", name: "Portuguese"},
	{ code: "pa", name: "Punjabi"},
	{ code: "ro", name: "Romanian"},
	{ code: "ru", name: "Russian"},
	{ code: "sr", name: "Serbian (Cyrillic)"},
	{ code: "sk", name: "Slovak"},
	{ code: "sl", name: "Slovenian"},
	{ code: "so", name: "Somali"},
	{ code: "es", name: "Spanish"},
	{ code: "sw", name: "Swahili"},
	{ code: "sv", name: "Swedish"},
	{ code: "ta", name: "Tamil"},
	{ code: "te", name: "Telugu"},
	{ code: "th", name: "Thai"},
	{ code: "tr", name: "Turkish"},
	{ code: "uk", name: "Ukrainian"},
	{ code: "ur", name: "Urdu"},
	{ code: "vi", name: "Vietnamese"},
	{ code: "cy", name: "Welsh"},
	{ code: "yi", name: "Yiddish"},
	{ code: "yo", name: "Yoruba"},
	{ code: "zu", name: "Zulu"},
	{ code: "mww", name: "Hmong Daw"},
	{ code: "tlh", name: "Klingon"},
	{ code: "sr-La", name: "Serbian (Latin)"},
	{ code: "am", name: "Amharic"},
	{ code: "ny", name: "Chichewa"},
	{ code: "fy", name: "Frisian"},
	{ code: "haw", name: "Hawaiian"},
	{ code: "kk", name: "Kazakh"},
	{ code: "ku", name: "Kurdish"},
	{ code: "ky", name: "Kyrgyz"},
	{ code: "lb", name: "Luxembourgish"},
	{ code: "mg", name: "Malagasy"},
	{ code: "ml", name: "Malayalam"},
	{ code: "my", name: "Burmese"},
	{ code: "ps", name: "Pashto"},
	{ code: "sm", name: "Samoan"},
	{ code: "gd", name: "Scots Gaelic"},
	{ code: "st", name: "Sesotho"},
	{ code: "sn", name: "Shona"},
	{ code: "sd", name: "Sindhi"},
	{ code: "si", name: "Sinhala"},
	{ code: "su", name: "Sundanese"},
	{ code: "tg", name: "Tajik"},
	{ code: "uz", name: "Uzbek"},
	{ code: "xh", name: "Xhosa"},
	{ code: "yua", name: "Yucatec Maya"},
	{ code: "en-gb", name: "English (British)"},
	{ code: "es-la", name: "Spanish (Latin America)"},
	{ code: "pt-br", name: "Portuguese (Brazil)"},
	{ code: "fr-ca", name: "French (Canada)"}
];

function genericDialog( title, message, msgClass, callback )
{
	var dlgTitle = ( typeof(title) != 'undefined' && title.length > 0 ) ?
			title : 'For Your Info';

	var dlgMessage = ( typeof(message) != 'undefined' && message.length > 0 ) ?
							message : 'Please contact support.';

	var dlgMsgClass = ( typeof(msgClass) != 'undefined' && msgClass.length > 0 ) ?
							msgClass : 'omphalos-dialog-message';

	dlgMessage = '<span class="' + dlgMsgClass + '">' + dlgMessage + '</span>';

	var dlg = $( '<div></div>' ).dialog({
		autoOpen: false,
		modal: true,
		title: dlgTitle,
		buttons: [
			{
			  text: ' Ok ',
			  click: function() {
				$( this ).dialog( 'close' );

				if ( $.isFunction(callback) ) callback();
			  }
			}
		]
	}).append( dlgMessage );

	dlg.dialog( 'open' );
};

function infoDialog( title, message, callback )
{
	genericDialog( title, message, callback );
};

function errorDialog( title, message, callback )
{
	genericDialog( title, message, 'omphalos-dialog-message-error', callback );
};

// https://stackoverflow.com/questions/3781142/jquery-or-javascript-how-determine-if-shift-key-being-pressed-while-clicking-an
function isNonPrintableControlKey( code ) {
	return CONTROL_KEYS.includes( code );
};