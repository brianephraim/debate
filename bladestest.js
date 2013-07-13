
tauntColl = new Meteor.Collection("taunts");
tagsColl = new Meteor.Collection("tagsDb");
tauntCountColl = new Meteor.Collection('tauntCountDb');

function adminUser(userId) {
  var adminUser = Meteor.users.findOne({username:"asdf"});
  return (userId && adminUser && userId === adminUser._id);
}
tauntColl.allow({
  insert: function(userId, doc){
    return (adminUser(userId) || (userId && doc.owner === userId) || 1==1);
  },
  update: function(userId, docs, fields, modifier){
    return adminUser(userId) || _.all(docs, function(doc) {
      return (doc.owner === userId || 1==1);
    });
  },
  remove: function (userId, docs){
    return adminUser(userId) || _.all(docs, function(doc) {
      return doc.owner === userId;
    });
  }
});


returnSortProperty = function(sortType,sortDirection){

  //return tauntColl.find({},{limit: n});
  if(sortType === 'latesttaunt'){
    sortType = 'taunt.datePosted'
  }
  var sortProperty = {};
  sortProperty[sortType] = sortDirection;
  //console.log(sortProperty)
  return sortProperty;
}



if(Meteor.isServer) {
  console.log('1111')
  







  
}

if (Meteor.isClient) {
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

Template.basicInputForm.asdf = function(){
  this.qwer = 'qwerqwerqwerqwerqwer';
}
Template.debateSet.userLoggedIn = function(){
  var meteorUser = Meteor.user();
  if(meteorUser === null){
    return false;
  } else {
    return true
  }
}
Template.debateSet.userSelectedAvatar = function(){
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
}

Template.avatarSelectionCurrent.getAvatarSelectionCurrent = function(){
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
}

Template.avatarSelection.events({
  "click img": function (e, tmpl, x) {
    var debateId = this.dataItem._id;
    var $el = $(e.target);
    var self = this;
    var newProperty = {};
    newProperty['profile.avatar'+debateId] = $el.attr('src');
    Meteor.users.update({_id:Meteor.user()._id}, {$set:newProperty})
  }
})
if(typeof Session.get('config') === 'undefined'){
    Session.set('config',[
      {
        includeName:'characterList'
      },
      {
        includeName:'characterList'
      }
    ]);
  }

  var timeCounter = 0
  Meteor.setInterval(function(){
    //Session.set("timeCounter",++timeCounter)
  }, 3000)
  

  

  Template.sortFilterButtons.events({ 
    "click a": function (e, tmpl, x) {
      var $el = $(e.target)
      if($el.hasClass('latestdiscussion-button')){
        Session.set('sortType', 'latestdiscussion');
      }
      if($el.hasClass('latestresponses-button')){
        Session.set('sortType', 'latestresponses');
      }
      if($el.hasClass('latesttaunt-button')){
        Session.set('sortType', 'latesttaunt');
      }
      if($el.hasClass('sortNewestFirst-button')){
        Session.set('sortDirection', -1);
      }
      if($el.hasClass('sortOldestFirst-button')){
        Session.set('sortDirection', 1);
      }
      if($el.hasClass('resultsCount1-button')){
        Session.set('resultsCount', 1);
      }
      if($el.hasClass('resultsCount2-button')){
        Session.set('resultsCount', 2);
      }
      if($el.hasClass('resultsCount3-button')){
        Session.set('resultsCount', 3);
      }
      if($el.hasClass('resultsCount4-button')){
        Session.set('resultsCount', 4);
      }
      if($el.hasClass('resultsCount5-button')){
        Session.set('resultsCount', 5);
      }

      if($el.hasClass('page1-button')){
        Session.set('page', 1);
      }
      if($el.hasClass('page2-button')){
        Session.set('page', 2);
      }
      if($el.hasClass('page3-button')){
        Session.set('page', 3);
      }
      if($el.hasClass('page4-button')){
        Session.set('page', 4);
      }
      if($el.hasClass('page5-button')){
        Session.set('page', 5);
      }
      //Session.set('resultsCount', 1);
      //Session.set('sortDirection', 1);
      //Session.set('sortType', 'latestdiscussion');
      return false;
    }
  })

  Template.tauntForm.events({  
    "click button": function (e, tmpl, x) {
      var self = this;
      var tauntValue = $(e.target).closest('form').find('.tauntInput').val();
      var tagsArray = $(e.target).closest('form').find('.tagsInput').val().split(',');
      console.log(tagsArray)
      var newTaunt = {
        taunt:{
          bodyText:tauntValue,
          datePosted: new Date(),
          tags: tagsArray
        },
        responses:[],
        discussion:[],
        latestresponses:'zzz',
        latestdiscussion:'zzz'
      };
      console.log('insert')
      tauntColl.insert(newTaunt);

      /*
      var newEntry = {
        avatar: picToPost,
        bodyText: inputValue,
        datePosted: new Date()
      };
      var newProperty = {}
      newProperty[this.dataItemSegmentKey] = newEntry
      tauntColl.update({'_id':itemId}, {$push:newProperty});
      */

      //sessionDataItemSetter(itemId,'scrollBotNeeded'+self.dataItemSegmentKey,true)


      return false

    },
    "keyup input": function(e){
      var listingFrame = $(e.target).closest('.chat').find('.listingFrame')
      var listingHeight = listingFrame.find('.listing').height()
      $(e.target).closest('.chat').find('.listingFrame').scrollTop(listingHeight)
    }
  })
  Template.basicInputForm.events({ 
    "click button": function (e, tmpl, x) {
      var self = this;
      var inputValue = $(e.target).closest('form').find('input').val();
      var itemId = this.dataItem._id;
      var updateTimeStampProperty = {};
      if(self.dataItemSegmentKey === 'discussion'){
        var picToPost = Meteor.user().profile.picture
        updateTimeStampProperty['latest'+self.dataItemSegmentKey] = new Date();
      }
      if(self.dataItemSegmentKey === 'responses'){
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
  /*
  function groupie(id,propValArrayArray){  //id,property,value  
    var oldSession = Session.get('tauntCollStates');
    if(typeof oldSession !== 'undefined'){
      var settings = $.extend(oldSession, {});
    } else {
      var settings = {}
    }
    for(var i = 0,l = propValArrayArray.length; i<l; i++){
      var property = propValArrayArray[i][0]
      var value = propValArrayArray[i][1]
      var newProperty = {};
      newProperty[id] = {};
      newProperty[id][property] = value;
      settings = $.extend(true, settings, newProperty);
    }
    Session.set('tauntCollStates',settings)
  }
  */
  function sessionDataItemSetter(id,property,value){    
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

  function sessionDataItemGetter(id,property,callback){
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

  Template.listingFrame.events({
    "scroll": function(e){
      var scrollValue = $(e.target).closest('.chat').find('.listingFrame').scrollTop();
      sessionDataItemSetter(this.dataItem._id,'scrollTop'+this.dataItemSegmentKey,scrollValue)
    }
  })

  Template.tauntForm.rendered = function(e) {
    var self = this
    var $frame = $(self.lastNode);
    if(typeof this.alreadyRendered === 'undefined'){
      this.alreadyRendered = true;
      $frame.find('.tagsInput').tagsInput({width:'auto'});
    } 
    
  }

  Template.listingFrame.rendered = function(e) {
    var self = this;
    console.log(self,e)
    var $frame = $(self.lastNode);
    console.log()
    var latestItemHeight = $frame.find('.dataItem').last().outerHeight();
    var scrollPos = ($frame.scrollTop())
    var frame = ($frame.outerHeight(true))
    var inner = ($frame.find('.listing').outerHeight())
    var itemMargin = parseInt($frame.find('.dataItem').css('margin-bottom'));
    latestItemHeight += itemMargin;
    var scrollBottomValue = (inner - frame + itemMargin)

    function scrollToBottom(){
     
      var propValArrayArray = [
        ['scrollTop'+self.data.dataItemSegmentKey, scrollBottomValue],
        ['scrollBotNeeded'+self.data.dataItemSegmentKey,false]
      ]
      var id = self.data.dataItem._id
      //function groupie(id,propValArrayArray){  //id,property,value  
      var oldSession = Session.get('tauntCollStates');
      if(typeof oldSession !== 'undefined'){
        var settings = $.extend(oldSession, {});
      } else {
        var settings = {}
      }
      for(var i = 0,l = propValArrayArray.length; i<l; i++){
        var property = propValArrayArray[i][0]
        var value = propValArrayArray[i][1]
        var newProperty = {};
        newProperty[id] = {};
        newProperty[id][property] = value;
        settings = $.extend(true, settings, newProperty);
      }
      Session.set('tauntCollStates',settings)
      //}


      //sessionDataItemSetter(self.data.dataItem._id,'scrollTop'+self.data.dataItemSegmentKey,scrollBottomValue)
      //sessionDataItemSetter(self.data.dataItem._id,'scrollBotNeeded'+self.data.dataItemSegmentKey,false)
      $(self.lastNode).scrollTop(scrollBottomValue)
    }

    sessionDataItemGetter(self.data.dataItem._id,'initialScrollBotDone'+self.data.dataItemSegmentKey,function(b){
      if(typeof b === 'undefined' || b===false){
        //on initial render, scroll to bottom
        console.log('on initial render, scroll to bottom')
        sessionDataItemSetter(self.data.dataItem._id,'initialScrollBotDone'+self.data.dataItemSegmentKey,true)
        scrollToBottom()
      } else {
        //on subsequent renders
        console.log('on subsequent renders')
        sessionDataItemGetter(self.data.dataItem._id,'scrollBotNeeded'+self.data.dataItemSegmentKey,function(b){
          if(typeof b !== 'undefined' && b===true){
            //on current user submission, scroll to bottom
            console.log('on current user submission, scroll to bottom')
            scrollToBottom()
          } else {
            //on submission from other users
            console.log('on submission from other users')
            sessionDataItemGetter(self.data.dataItem._id,'scrollTop'+self.data.dataItemSegmentKey,function(scrollTop){
              if((scrollBottomValue - scrollTop) - latestItemHeight < 2){

                //if already close to bottom, just scroll all the way to bottom
                console.log('if already close to bottom, just scroll all the way to bottom')
                scrollToBottom()
              } else {
                //if not close to bottom, keep scroll where it is

                console.log('if not close to bottom, keep scroll where it is')
                console.log(scrollBottomValue - scrollTop,latestItemHeight)//latestItemHeight
                $(self.lastNode).scrollTop(scrollTop)
              }
            })
          }
        })
      }
    });
  }
  Template.tauntList.dataArray = function(){
    var sortParams = {};
    sortParams[Session.get('sortType')] = Session.get('sortDirection')
    var asdf = tauntColl.find({}, {sort: sortParams})
    console.log(asdf)
    console.log(Session)
    //return asdf
    return tauntColl.find({})
  }

  Template.rootView.totalTauntsHelper = function(){
    var returnVal = 0;
    if(typeof tauntCountColl.find({}).fetch()[0] !== 'undefined'){
      returnVal = tauntCountColl.find({}).fetch()[0].count
    }
    Session.set('totalTaunts', returnVal);
    return returnVal;
  }

  Template.rootView.tagsHelper = function(){
    return tagsColl.find({}).fetch()
  }


  


  var frag;
  Meteor.startup(function () {
    return (function(){
      frag = Meteor.render(function() {
        return Template['rootView']();
      });
      
      $('body').prepend(frag);//
    })();
  });

  Accounts.ui.config({   passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL' });

}





