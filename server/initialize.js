


serverStartupItems = [];
setServerStartupItems = function(fun){
  serverStartupItems.push(arguments)
}

setServerStartupItems(function(){
  
});

setServerStartupItems(function(){
  //observe the taunt collection (adding and removal) in order to impace the tag collection
  var extractTags = function() {

    
    tauntColl.find().observe({
      _suppress_initial: true,
      added: function(x,y) {
          for(var i = 0, l=x.taunt.tags.length; i<l; i++){
            if(x.taunt.tags[i].length > 0){
              var asdf = tagsColl.find({tag:x.taunt.tags[i]}).fetch()[0];
              if(typeof asdf === 'undefined'){
                tagsColl.insert({
                  tag:x.taunt.tags[i],
                  popularityTally:1
                });
              } else {
                tagsColl.update(
                  {tag:x.taunt.tags[i]},
                  {$inc:{popularityTally:1}}
                )
              }
            }
          }
        
        
      },
      removed: function() {
        return tagsColl.find({});
      }
    }); 
  };
  extractTags();
});

setServerStartupItems(function(){
  //observe the creation of a user in order to get a snapshot of their profile info.
  Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        options.profile.avatar = '';
        user.profile = options.profile;
    }
    return user;
  });
});

setServerStartupItems(function(){
  //Default data into the taunt collection if it's a brand new database (for testing)
  if (tauntColl.find().count() === 0) {
     var data = [
        {
          taunt:{
            bodyText:'Guns sucks',
            datePosted: new Date(),
            tags: ['guns','politics','sucks']
          },
          responses:[
            {
              bodyText:'No you suck No you suck No you suck No you suck No you suck No you suck No you suck No you suck',
              datePosted: new Date(),
              avatar:'/avatars/tiger.jpg'
            },
            {
              bodyText:'Bite me hillbilly.',
              datePosted: new Date(),
              avatar:'/avatars/moe.jpg'
            }
          ],
          discussion:[
            {
              bodyText:'This discussion is really heating up',
              datePosted: new Date(),
              avatar:'/profilepics/brian.jpg',
              userId:'108334',
              userName:'Crixus'
            },
            {
              bodyText:'I agree, quite.',
              datePosted: new Date(),
              avatar:'/profilepics/andy.jpg',
              userId:'3945893',
              userName:'Richard'
            }
          ],
          latestresponses:'zzz',
          latestdiscussion:'zzz'
        },
        {
          taunt:{
            bodyText:'Pot rules',
            datePosted: new Date(),
            tags: ['guns','politics','sucks']
          },
          responses:[
            {
              bodyText:'No you suck',
              datePosted: new Date(),
              avatar:'/avatars/tiger.jpg'
            },
            {
              bodyText:'Bite me hillbilly.',
              datePosted: new Date(),
              avatar:'/avatars/moe.jpg'
            }
          ],
          discussion:[
            {
              bodyText:'This discussion is really heating up',
              datePosted: new Date(),
              avatar:'/profilepics/andy.png',
              userId:'108334',
              userName:'Crixus'
            },
            {
              bodyText:'I agree, quite.',
              datePosted: new Date(),
              avatar:'/profilepics/brian.png',
              userId:'3945893',
              userName:'Richard'
            }
          ],
          latestresponses:'zzz',
          latestdiscussion:'zzz'
        }
     ]
     for (var i = 0; i < data.length; i++){
        tauntColl.insert(data[i]);
     }
  }
});

setServerStartupItems(function(){
  //Set permissions and define how to identify an admin.
  function adminUser(userId) {
    console.log(userId, userId === 'fPgLK48zrcm4GPXAi')
    var adminUser = Meteor.users.findOne({username:"asdf"});
    return (userId && adminUser && userId === adminUser._id);
  }
  tauntColl.allow({
    insert: function(userId, doc){
      return (adminUser(userId) || (userId && doc.owner === userId) || 1==1);
    },
    update: function(userId, docs, fields, modifier){
      return adminUser(userId) || _.all(docs, function(doc) {
        return (doc.owner === userId || 1==1);
      });
    },
    remove: function (userId, docs){
      return adminUser(userId) || _.all(docs, function(doc) {
        return doc.owner === userId;
      });
    }
  });
});




Meteor.startup(function () {
  for(var i=0,l=serverStartupItems.length; i<l; i++){
    var args = serverStartupItems[i];
    args[0]();
  }
  


  




  



});


