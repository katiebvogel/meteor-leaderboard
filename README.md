
This application is a simple First Meteor App which allows "players" to keep score.  If a player is in the lead, their position will change to the top of the list, etc.

<!-- http://meteortips.com/first-meteor-tutorial -->


11/17/16  Learnings and ideas
-Sessions are used to store small pieces of data that isn't saved to the database or remembered on return visits
-To create a session, use the  ```Session.set``` function
-To retrieve the value of the session (such as item.id) ```Session.get``` function

-Added more meteor packages for user accounts today:
1. meteor add accounts-password
  -Meteor.users from console will indicate you have an empty meteor collection (once installed, there is automatically a Meteor collection for users created)
  -You can also run Meteor.users.find().fetch(); from console
  -This also makes available a useful function:
     Meteor.userId()   

    -That function allows us to retrieve the id of the logged-in user

2. meteor add accounts-ui
  -Then within the body of a template:   {{> loginButtons}}

3.  meteor remove autopublish
  -This is for security purposes.  Autopublish comes with meteor as a convenience for development.  Removing autopublish secures the information in the database (so it can no longer be accessed through the console)
  -We then added in a Meteor.publish function to the Meteor.isServer conditional and also added a Meteor.subscribe function to the Meteor.isClient conditional.  There are some more specifics about making sure the currentUserId is used as an identifier so as to publish only the players created by that logged-in user.

4. meteor remove insecure
  -This will make it so random users cannot interact with the PlayersList DB. Before this step, we could still create, remove, and update player information from the console (we just couldn't GET the information printed as of the previous step

5.  Create Meteor.methods outside of isClient and outside of isServer conditionals

6.  More security for data inserts:    meteor add check
