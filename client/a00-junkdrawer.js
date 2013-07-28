if(typeof Session.get('asdf') === 'undefined'){
  Session.set('resultsCount', 1);
  Session.set('page', 1);
}
if(typeof Session.get('sortDirection') === 'undefined'){
  Session.set('sortDirection', 1);
}
if(typeof Session.get('sortType') === 'undefined'){
  Session.set('sortType', 'latestdiscussion');
}
Session.set('totalTaunts', '0');

Meteor.autosubscribe(function () {
  Meteor.subscribe('taunts', 
    Session.get('page'),
    Session.get('resultsCount'),
    Session.get('sortDirection'),
    Session.get('sortType')      
  );

  Meteor.subscribe('allUsers',null , function() { 
    //console.log(Meteor.users.find().fetch()) 
  });
  Meteor.subscribe('userData', null, function() {
    //console.log(Meteor.user())
  });

  Meteor.subscribe('tauntCountDb');
  Meteor.subscribe('tagsDb');
});

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


helpersForTemplates = []
addTemplateHelper = function(template,helperName,fun){
  helpersForTemplates.push(arguments)
}

eventsForTemplates = []
setTemplateEvents = function(fun){
  eventsForTemplates.push(arguments)
}














var frag;
Meteor.startup(function () {
  //Apply helpers and events after startup so the Template object is available.
  for(var i=0,l=helpersForTemplates.length; i<l; i++){
    var args = helpersForTemplates[i];
    Template[args[0]][args[1]] = args[2]
  }

  for(var i=0,l=eventsForTemplates.length; i<l; i++){
    var args = eventsForTemplates[i];
    Template[args[0]].events(args[1]);
  }

  
  return (function(){

    frag = Meteor.render(function() {

      return Template['rootView']();
    });   
    $('body').prepend(frag);//
  })();
});

Accounts.ui.config({   passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL' });



