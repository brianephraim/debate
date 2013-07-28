Meteor.publish('tagsDb', function(params) {
  if (params == null) {
    params = {};
  }
  return tagsColl.find({});
});