Meteor.publish("taunts", function(page,resultsCount,sortDirection,sortType,tagsIncludeArray,tagsExcludeArray) {
  console.log('====')
  console.log(tagsIncludeArray) 
  console.log(tagsExcludeArray)
  var $andCriteria = [];

  if(tagsIncludeArray.length > 0){
    $andCriteria.push({
      'taunt.tags':{$in:tagsIncludeArray}
    })
  }

  if(tagsExcludeArray.length > 0){
    $andCriteria.push({
      'taunt.tags':{$nin:tagsExcludeArray}
    })
  }

  var findCriteria = {};
  if($andCriteria.length > 0){
    findCriteria = {
      $and: $andCriteria
    }
  }

  //This collection behaves interstingly.  It only repopulates the collection on the client...
  //when the client changes call parameters.  So you can change an oldest-and-sorted property without...
  //losing the rendered item's postion when it updates.
  returnSortProperty = function(sortType,sortDirection){
    if(sortType === 'latesttaunt'){
      sortType = 'taunt.datePosted'
    }
    var sortProperty = {};
    sortProperty[sortType] = sortDirection;
    return sortProperty;
  }
 	  
  var skipAmount = (page - 1) * resultsCount;
 	var sortProperty = returnSortProperty(sortType,sortDirection)
	var n = Number(resultsCount);

  var resultArray = tauntColl.find(findCriteria,{
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