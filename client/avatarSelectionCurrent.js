addTemplateHelper('avatarSelectionCurrent','getAvatarSelectionCurrent',function(){
  var debateId = this.dataItem._id;
  var meteorUser = Meteor.user();
  if(
    meteorUser === null || 
    typeof meteorUser.profile === 'undefined' ||
    typeof meteorUser.profile['avatar'+debateId] === 'undefined'
  ){
    return false;
  } else {
    return meteorUser.profile['avatar'+debateId]
  }
  //return Meteor.user().profile.
})