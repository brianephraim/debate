setServerStartupItems(function(){
  //observe the taunt collection (adding and removal) in order to impace the tag collection
  //manage-tags
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