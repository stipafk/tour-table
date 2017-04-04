class tourTable {
	constructor(team,structure){
		this.team = team;
		this.structure = structure;
		this.container = $('<div id="tourTable">');
		this.renderTable(this.structure);
		this.setContainer();
	}
	setStructure(structure){
		var that = this;
		that.structure = structure;
		that.renderTable(that.structure);
	}
	renderTable(structure){
		var that = this;
		var split = $('<div class="split">');

		$.each(structure, function(index_round,team_round){
			var round = $('<div class="round round-'+ that.intToString(index_round) +'">');
			$.each(team_round, function(index_match, team_match){
				var match = $('<ul class="matchup"><li class="team team-top">'+ team_match.team1 +'</li><li class="team team-bottom">'+ team_match.team2 +'</li></ul>');
				round.append(match)
			})
			split.append(round)
		})

		that.container.append(split);
	}
	setContainer(){
		var that = this;
		$('body').find('#tourTable').remove();
		$('body').append(that.container);
	}
	intToString(int){
		var masive = ['one','two', 'three', 'four', 'five']
		return masive[int]
	}
}