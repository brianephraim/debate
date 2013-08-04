Meteor.autosubscribe(function () {
  Meteor.subscribe('taunts', 
    Session.get('page'),
    Session.get('resultsCount'),
    Session.get('sortDirection'),
    Session.get('sortType'),
    Session.get('tagsIncludeArray'),
    Session.get('tagsExcludeArray')
  );

  Meteor.subscribe('allUsers',null , function() { 
    //console.log(Meteor.users.find().fetch()) 
  });
  Meteor.subscribe('userData', null, function() {
    //console.log(Meteor.user())
  });

  Meteor.subscribe('tauntCountDb');
  Meteor.subscribe('tagsDb');
});