addTemplateHelper('debateSet','userLoggedIn',function(){
  var meteorUser = Meteor.user();
  if(meteorUser === null){
    return false;
  } else {
    return true
  }
})

addTemplateHelper('debateSet','userSelectedAvatar',function(){
  var debateId = this.dataItem._id;
  var meteorUser = Meteor.user();
  if(
    meteorUser === null || 
    typeof meteorUser.profile === 'undefined' ||
    typeof meteorUser.profile['avatar'+debateId] === 'undefined'
  ){
    return false;
  } else {
    return true
  }
  //return Meteor.user().profile.
})