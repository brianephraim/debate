serverStartupItems = [];
setServerStartupItems = function(fun){
  serverStartupItems.push(arguments)
}

Meteor.startup(function () {
  for(var i=0,l=serverStartupItems.length; i<l; i++){
    var args = serverStartupItems[i];
    args[0]();
  }
});


