module.exports = (function() {
        function Info(_name, _category, _searchQuery) {
            this.name = _name;
            this.category = _category;
            this.searchQuery = _searchQuery;
        }

		var premia = new Info('PremiaLeague', 1, 'premia+league');
		var espanola = new Info('LigaEspanola', 2, 'liga+espanola');
		var bundes = new Info('Bundesliga', 3, 'bundesliga');
		var seria = new Info('SeriaA', 4, 'seria+a');

        var _info = [premia, espanola, bundes, seria];
        
        return _info;
}());
