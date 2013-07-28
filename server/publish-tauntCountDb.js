var publishCounter = function(params) {
  var collection, count, handle, id, init, pub,
    _this = this;
  count = 0;
  init = true;
  id = Random.id();
  pub = params.handle;
  collection = params.collection;
  handle = collection.find(params.filter, params.options).observeChanges({
    added: function() {
      count++;
      if (!init) {
        return pub.changed(params.name, id, {
          count: count
        });
      }
    },
    removed: function() {
      count--;
      if (!init) {
        return pub.changed(params.name, id, {
          count: count
        });
      }
    }
  });
  init = false;
  pub.added(params.name, id, {
    count: count
  });
  pub.ready();
  return pub.onStop(function() {
    return handle.stop();
  });
};

Meteor.publish('tauntCountDb', function(params) {
  if (params == null) {
    params = {};
  }
  return publishCounter({
    handle: this,
    name: 'tauntCountDb',
    collection: tauntColl,
    filter: params
  });
});