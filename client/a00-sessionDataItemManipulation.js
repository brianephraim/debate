sessionDataItemSetter = function (id,property,value){    
  var oldSession = Session.get('tauntCollStates');
  var newProperty = {};
  newProperty[id] = {};
  newProperty[id][property] = value;
  if(typeof oldSession !== 'undefined'){
    var settings = $.extend(true, oldSession, newProperty);
  } else {
    settings = newProperty
  }
  Session.set('tauntCollStates',settings)
}

sessionDataItemGetter = function (id,property,callback){
  var sessionGet = Session.get('tauntCollStates');
  if(typeof sessionGet !== 'undefined'){
    var sessionDataItem = sessionGet[id]
    if(typeof sessionDataItem !== 'undefined'){
      var sessionDataItemProperty = sessionGet[id][property]
      if(typeof sessionDataItemProperty !== 'undefined'){
        callback(sessionDataItemProperty)
        return true;
      }
    }
  }
  callback(false)  
}