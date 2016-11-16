PlayersList = new Meteor.Collection('players');


if(Meteor.isClient){
  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find();
    },
    'otherHelperFunction': function(){
      return "Hi :) ";
    }
  });
}

if(Meteor.isServer){
console.log("hello Server");
}
