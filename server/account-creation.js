setServerStartupItems(function(){
  //observe the creation of a user in order to get a snapshot of their profile info.
  //account-creation
  Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        options.profile.avatar = '';
        user.profile = options.profile;
    }
    return user;
  });
});