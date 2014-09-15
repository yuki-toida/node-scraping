var model = (function() {
        var _isExist = function(array, value) {
            for(var i=0; i<array.length; i++) {
                if (value == array[i])
                    return true;
            }
            return false;
        };

        return {
            isExist :   _isExist
        };
}());

module.exports = model;
