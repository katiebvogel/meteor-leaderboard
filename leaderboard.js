
PlayersList = new Mongo.Collection('players');
PrizeList = new Mongo.Collection('prizes');

if(Meteor.isClient){
    Template.leaderboard.helpers({
        'player': function(){
            return PlayersList.find({}, { sort: {score: -1, name: 1} });
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
        }
    });

    Template.prizes.helpers({
      'prize': function(){
        return PrizeList.find({});
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
      'click .prize': function(){
        var prizeId = this._id;
        Session.set('selectedPrize', prizeId);
      }
    });
}

if(Meteor.isServer){
    // this code only runs on the server
}
