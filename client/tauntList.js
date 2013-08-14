addTemplateHelper('tauntList','dataArray',function(){
	console.log(this,arguments)
  var sortParams = {};
  sortParams[Session.get('sortType')] = Session.get('sortDirection')
  return tauntColl.find({})
})