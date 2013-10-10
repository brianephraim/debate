addTemplateHelper('chatInputForm','chatInputDataHelper',function(){
  // var tagsArray = Template.rootView.tagsHelper();
  // var buttonGroupArray = []
  // var total = tagsArray.length;
  // for(var i=0,l=total; i<l; i++){
  //   buttonGroupArray.push({label:tagsArray[i].tag + ' ' + tagsArray[i].popularityTally,class:'tagsInclude-button',match:tagsArray[i]})
  // }
  var dataForHelper = {
    class:'chatInput',
    buttonText:'; D',
    label:'chat input',
    currentValue:''
  }
  return dataForHelper;
})

setTemplateEvents('chatInputForm',{
  "click button": function (e, tmpl, x) {
    var self = this;
    var inputValue = $(e.target).closest('form').find('input').val();
    var itemId = this.dataItem._id;
    var updateTimeStampProperty = {};
    if(self.dataItemSegmentKey === 'exposedChat'){
      var picToPost = Meteor.user().profile.picture
      updateTimeStampProperty['latest'+self.dataItemSegmentKey] = new Date();
    }
    if(self.dataItemSegmentKey === 'avatarChat'){
      var picToPost = Meteor.user().profile['avatar'+itemId]
      updateTimeStampProperty['latest'+self.dataItemSegmentKey] = new Date();
    }

    var newEntry = {
      avatar: picToPost,
      bodyText: inputValue,
      datePosted: new Date()
    };
    var newProperty = {}
    newProperty[this.dataItemSegmentKey] = newEntry
    tauntColl.update({'_id':itemId}, {
      $set:updateTimeStampProperty,
      $push:newProperty}
    );


    sessionDataItemSetter(itemId,'scrollBotNeeded'+self.dataItemSegmentKey,true)


    return false

  },
  "keyup input": function(e){
    var listingFrame = $(e.target).closest('.chat').find('.listingFrame')
    var listingHeight = listingFrame.find('.listing').height()
    $(e.target).closest('.chat').find('.listingFrame').scrollTop(listingHeight)
  }
})