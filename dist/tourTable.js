class tourTable {
	constructor(structure, options){
		if(options){
			this.options = options;
		}
		if(structure){
			this.structure = structure;
			this.container = $('<div id="tourTable">');
			this.renderTable(this.structure);
		}
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

				var match = $('<ul class="matchup" data-match-id="'+ index_match +'"><li class="team team-top" data-team-id="'+ team_match.team1id +'">'+ team_match.team1name +'</li><li class="team team-bottom" data-team-id="'+ team_match.team2id +'">'+ team_match.team2name +'</li></ul>');
				if(winner == team_match.team1id){
					match.find('.team-top').addClass('winner');
					match.find('.team-top').append('<span class="score">Winner</span>');
				}
				if(winner == team_match.team2id){
					match.find('.team-bottom').addClass('winner');
					match.find('.team-bottom').append('<span class="score">Winner</span>');
				}

				if(that.options && that.options.permission && that.options.permission == 'administrator' || that.options.permission == 'moderator'){
					match.on('click', '.team', function(){
						var round_id = $(this).parents('.round').data('round-id');
						var match_id = $(this).parents('.matchup').data('match-id');
						var team_id = $(this).data('team-id');
						var countWiner = 0;
						if($(this).hasClass('winner')){
							that.structure[round_id][match_id].winner = '';
						}else{
							that.structure[round_id][match_id].winner = $(this).data('team-id');
							for (let i = 0; i < that.structure[round_id].length; i++){
								if (that.structure[round_id][i].winner){
									countWiner++;
								}
							}
							if(countWiner == that.structure[round_id].length && countWiner != 1){
								that.structure[round_id+1] = [];
								for (var i = round_id+1; i < that.structure.length; i++){ // чистим все следуйщие масивы от игр
									that.structure[i] = [];
								}
								var allWinner = [];
								for (var i = 0; i < countWiner; i++){ // добавляем победителей в масив
									if(that.structure[round_id][i].winner == that.structure[round_id][i].team1id){
										var team = {
											id: that.structure[round_id][i].team1id,
											name: that.structure[round_id][i].team1name
										}
										allWinner.push(team);
									}else {
										var team = {
											id: that.structure[round_id][i].team2id,
											name: that.structure[round_id][i].team2name
										}
										allWinner.push(team);
									}
								}
								for(var i = 0; i < allWinner.length; i++){ // добавляем команду
									var team = {
										team1id: allWinner[i].id,
										team1name: allWinner[i].name,
										team2name: allWinner[i+1].name,
										team2id: allWinner[i+1].id
									}
									i++;
									that.structure[round_id+1].push(team)
								}
							}
							if(round_id != 0){
								for (let i = 0; i < round_id; i++){
									var round_id_change = that.container.find('.round-' + that.intToString(i)).find('li[data-team-id='+ team_id +']').parents('.round').data('round-id');
									var match_id_change = that.container.find('.round-' + that.intToString(i)).find('li[data-team-id='+ team_id +']').parents('.matchup').data('match-id');
									that.structure[round_id_change][match_id_change].winner = $(this).data('team-id');
								}
							}
						}
						that.setStructure(that.structure);
					});
				}

				match.on('mouseover', '.team', function(){
					var round_id = $(this).parents('.round').data('round-id');
					var match_id = $(this).parents('.matchup').data('match-id');
					var team_id = $(this).data('team-id');
					$(this).addClass('hover');
					if(round_id != 0){
						for (let i = 0; i < round_id; i++){
							that.container.find('.round-' + that.intToString(i)).find('li[data-team-id='+ team_id +']').addClass('hover');
						}
					}
				});
				match.on('mouseout', '.team', function(){
					var round_id = $(this).parents('.round').data('round-id');
					var match_id = $(this).parents('.matchup').data('match-id');
					var team_id = $(this).data('team-id');
					$(this).removeClass('hover');
					if(round_id != 0){
						for (let i = 0; i < round_id; i++){
							that.container.find('.round-' + that.intToString(i)).find('li[data-team-id='+ team_id +']').removeClass('hover');
						}
					}
				});

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