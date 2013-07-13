

  

Meteor.publish("taunts", function(page,resultsCount,sortDirection,sortType) {
 	/**/
  //This collection behaves interstingly.  It only repopulates the collection on the client...
  //when the client changes call parameters.  So you can change an oldest-and-sorted property without...
  //losing the rendered item's postion when it updates.  
  var skipAmount = (page - 1) * resultsCount;
 	var sortProperty = returnSortProperty(sortType,sortDirection)
	var n = Number(resultsCount);

  var resultArray = tauntColl.find({},{
    sort: sortProperty,
    limit: n,
    skip: skipAmount
  }).fetch()
  var resultIdentifiers = [];
  for(var i=0,l=resultArray.length; i<l; i++){
    resultIdentifiers.push(resultArray[i]._id)
  }


  var pointer = tauntColl.find( { '_id': { $in: resultIdentifiers } }, {sort: sortProperty} )


  return pointer
  //return tauntColl.find( { '_id': { $in: resultIdentifiers } } )

    
});



Meteor.publish("userData", function () {
	return Meteor.users.find({_id: this.userId},
		{fields: {'profile': 1}});
});
Meteor.publish("allUsers", function () {
	//TODO: For testing only, remove this
	return Meteor.users.find({}, {fields: {'profile': 1}});
});





//------------
//------------

Meteor.publishCounter = function(params) {
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
  return Meteor.publishCounter({
    handle: this,
    name: 'tauntCountDb',
    collection: tauntColl,
    filter: params
  });
});

//---------
//---------

Meteor.extractTags = function() {

  
  tauntColl.find().observe({
    _suppress_initial: true,
    added: function(x,y) {
      //FOR SOME REASON IT ALWAYS FIRES TWICE.
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

Meteor.publish('tagsDb', function(params) {
  if (params == null) {
    params = {};
  }
  //return Meteor.extractTags();
  return tagsColl.find({});
});





Meteor.startup(function () {
  Meteor.extractTags();
  Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        options.profile.avatar = '';
        user.profile = options.profile;
    }
    return user;
  });


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


