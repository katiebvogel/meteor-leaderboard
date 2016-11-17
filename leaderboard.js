
PlayersList = new Mongo.Collection('players');
PrizeList = new Mongo.Collection('prizes');

if(Meteor.isClient){
  Meteor.subscribe('thePlayers');

    Template.leaderboard.helpers({
        'player': function(){
            var currentUserId = Meteor.userId();
            return PlayersList.find({createdBy: currentUserId},
                { sort: {score: -1, name: 1} });
        },
        'selectedClass': function(){
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if(playerId == selectedPlayer){
                return "selected"
                //the return statement gives the name of the class defined in CSS
            }
        },
        'selectedPlayer': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            return PlayersList.findOne({ _id: selectedPlayer });
        }
    });
    Template.leaderboard.events({
        'click .player': function(){
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
        },
        'click .increment': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.update({ _id: selectedPlayer }, { $inc: {score: 5} });
        },
        'click .decrement': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.update({ _id: selectedPlayer }, {$inc: {score: -5} });
        },
        'click .remove': function(){
          var selectedPlayer = Session.get('selectedPlayer');
          alert("Are you sure you want to remove?");
          PlayersList.remove({_id: selectedPlayer });
        }
    });

    Template.prizes.helpers({
      'prize': function(){
        return PrizeList.find({}, {sort: {item: 1} });
      },
      'selectedPrizeClass': function(){
          var prizeId = this._id;
          var selectedPrize = Session.get('selectedPrize');
          if(prizeId == selectedPrize){
              return "selected_prize"
              //this return statement is the same of the class created in CSS
          }
        },
        'selectedPrize': function(){
          var selectedPrize = Session.get('selectedPrize');
          return PrizeList.findOne({_id: selectedPrize});
        }
    });
    Template.prizes.events({
      'click .prizeButton': function(){
        return "prizeButton"
      },
      'click .prize': function(){
        var prizeId = this._id;
        Session.set('selectedPrize', prizeId);
      }
    });

    Template.addPlayerForm.events({
      'submit form': function(){
        event.preventDefault();
        var playerScoreVar = event.target.playerScore.value;
        var playerNameVar = event.target.playerName.value;
        var currentUserId = Meteor.userId();
        PlayersList.insert({
          name: playerNameVar,
          score: playerScoreVar,
          createdBy: currentUserId,
          createdAt: new Date()
        });
        event.target.playerName.value = "";
        event.target.playerScore.value = "";
      }
    });
}

if(Meteor.isServer){

  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({ createdBy: currentUserId });
  });
// console.log( PlayersList.find().fetch());

}
