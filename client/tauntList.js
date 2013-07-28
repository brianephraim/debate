addTemplateHelper('tauntList','dataArray',function(){
  var sortParams = {};
  sortParams[Session.get('sortType')] = Session.get('sortDirection')
  return tauntColl.find({})
})