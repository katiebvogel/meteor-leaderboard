//Collections Defined
PlayersList = new Mongo.Collection('players');
PrizeList = new Mongo.Collection('prizes');

import tacos from "./imports/tacos.jsx";



///////////////////////////////
//Client side code
if(Meteor.isClient){

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
          },
        'showPrizes': function(){
          var showPrizes = Session.get('showPrizes');
          return showPrizes;
        },
        tacos(){
          return tacos;
        }
    });
    Template.leaderboard.events({
        'click .player': function(){
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
        },
        'click .increment': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('updateScore', selectedPlayer, 5);
        },
        'click .decrement': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('updateScore', selectedPlayer, -5);
        },
        'click .remove': function(){
          var selectedPlayer = Session.get('selectedPlayer');
          Meteor.call('removePlayer', selectedPlayer);
        },
        'click .prizeButton': function(event){
          console.log("you have clicked that button!");
          // event.preventDefault();
          Session.set('showPrizes', true);
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
      'click .prize': function(){
        var prizeId = this._id;
        Session.set('selectedPrize', prizeId);
      }
    });

    Template.addPlayerForm.events({
      'submit form': function(){
        event.preventDefault();
        // var playerScoreVar = event.target.playerScore.value;
        var playerNameVar = event.target.playerName.value;
        Meteor.call('createPlayer', playerNameVar);
        event.target.playerName.value = "";
        // event.target.playerScore.value = "";
      }
    });



    Meteor.subscribe('thePlayers');
    Meteor.subscribe('thePrizes');

}
//end of the block of client-side code ///
///////////////////////////////////////


//////////////////////
//server side code
if(Meteor.isServer){

  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({ createdBy: currentUserId });
  });

  Meteor.publish('thePrizes', function(){
    return PrizeList.find().fetch();
  });

// console.log( PlayersList.find().fetch());

}




/////////////////////////////////////////
//Meteor Methods
Meteor.methods({
  'createPlayer': function(playerNameVar){
    check(playerNameVar, String);
    // check(playerScoreVar, Number);
    var currentUserId = Meteor.userId();
    if(currentUserId){
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId,
        createdAt: new Date()
      });
    }
  },
  'removePlayer': function(selectedPlayer){
    // alert("Are you sure you want to remove?");
    check(selectedPlayer, String);
    var currentUserId = Meteor.userId();
    if(currentUserId){
      PlayersList.remove({ _id: selectedPlayer, createdBy: currentUserId });
    }
  },
  'updateScore': function(selectedPlayer, scoreValue){
    check(selectedPlayer, String);
    // check(scoreValue, Number);
    var currentUserId = Meteor.userId();
    if(currentUserId){
      PlayersList.update({ _id: selectedPlayer, createdBy: currentUserId }, { $inc: {score: scoreValue} });
    }
  }
});
//end Meteor methods///
//////////////////////////////////////////
