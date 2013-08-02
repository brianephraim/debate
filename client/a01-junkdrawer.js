

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



