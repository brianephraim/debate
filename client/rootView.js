addTemplateHelper('rootView','totalTauntsHelper',function(){
  var returnVal = 0;
  if(typeof tauntCountColl.find({}).fetch()[0] !== 'undefined'){
    returnVal = tauntCountColl.find({}).fetch()[0].count
  }
  Session.set('totalTaunts', returnVal);
  return returnVal;
})

addTemplateHelper('rootView','tagsHelper',function(){
  return tagsColl.find({}).fetch()
})