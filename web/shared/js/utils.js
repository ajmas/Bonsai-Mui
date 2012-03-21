utils = {

	isScrolledIntoView: function  (elem, container) {
		var docViewTop = $j(container).scrollTop ();
		var docViewBottom = docViewTop + $j(container).height ();
	
		var elemTop = $j(elem).offset ().top;
		var elemBottom = elemTop + $j(elem).height ();
	
		// return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
	
//	abridge: function (elem) {
//	    console.log('xxxx');
//	    var opts = elem.data("opts");
//	    var txt = elem.html();
//	    var len = opts.substr_len;
//	    var dots = "<span>" + opts.ellipses + "</span>";
//	    var charAtLen = txt.substr(len, 1);
//	    while (len < txt.length && !/\s/.test(charAtLen)) {
//	        len++;
//	        charAtLen = txt.substr(len, 1);
//	    }
//	    var shown = txt.substring(0, len) + dots;
//	    var hidden = '<span class="hidden" style="display:none;">' + txt.substring(len, txt.length) + '</span>';
//	    elem.html(shown + hidden);
//	  }

};

jQuery.extend ( jQuery.expr[":"], {
    reallyvisible : function (a) {
        return !(jQuery (a).is (":hidden") || jQuery (a).parents (":hidden").length || jQuery (a).css ('display') == 'none');
    }
});

String.prototype.endsWith = function (pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.lastIndexOf (pattern) === d;
};