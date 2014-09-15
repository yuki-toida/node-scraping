module.exports = (function() {
        var _getQueryString = function(url, key) {
			key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");  
			var qs = regex.exec(url);
			if(qs == null) return '';
			else return qs[1];
        };

        return {
            getQueryString: _getQueryString
        };
}());
