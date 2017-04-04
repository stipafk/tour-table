class tourTable {
	constructor(team,structure){
		this.team = team;
		this.structure = structure;
		this.container = $('<div id="tourTable">');
		this.renderTable(this.structure);
	}
	setStructure(structure){
		var that = this;
		that.structure = structure;
		that.renderTable(that.structure);
	}
	renderTable(structure){
		var that = this;

		$('body').find('#tourTable').empty();
		var split = $('<div class="split">');

		$.each(structure, function(index_round,team_round){
			var round = $('<div class="round round-'+ that.intToString(index_round) +'" data-round-id="'+ index_round +'">');
			$.each(team_round, function(index_match, team_match){
				var winner = team_match.winner;

				var match = $('<ul class="matchup" data-match-id="'+ index_match +'"><li class="team team-top">'+ team_match.team1 +'</li><li class="team team-bottom">'+ team_match.team2 +'</li></ul>');
				if(winner == team_match.team1){
					match.find('.team-top').addClass('winner');
				}
				if(winner == team_match.team2){
					match.find('.team-bottom').addClass('winner');
				}

				match.on('click', '.team', function(){
					var round_id = $(this).parents('.round').data('round-id');
					var match_id = $(this).parents('.matchup').data('match-id');
					if($(this).hasClass('winner')){
						that.structure[round_id][match_id].winner = '';
					}else{
						that.structure[round_id][match_id].winner = $(this).text();
					}
					that.setStructure(that.structure);
				})
				round.append(match)
			})
			split.append(round)
		})

		that.container.append(split);
		$('body').append(that.container);
	}
	intToString(int){
		var masive = ['one','two', 'three', 'four', 'five']
		return masive[int]
	}
}