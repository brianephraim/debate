setServerStartupItems(function(){
  //Set permissions and define how to identify an admin.
  //set-permissions
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