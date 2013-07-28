setTemplateEvents('listingFrame',{
  "scroll": function(e){
    var scrollValue = $(e.target).closest('.chat').find('.listingFrame').scrollTop();
    sessionDataItemSetter(this.dataItem._id,'scrollTop'+this.dataItemSegmentKey,scrollValue)
  }
})

addTemplateHelper('listingFrame','rendered',function(e) {
  var self = this;
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
      //console.log('on initial render, scroll to bottom')
      sessionDataItemSetter(self.data.dataItem._id,'initialScrollBotDone'+self.data.dataItemSegmentKey,true)
      scrollToBottom()
    } else {
      //console.log('on subsequent renders')
      sessionDataItemGetter(self.data.dataItem._id,'scrollBotNeeded'+self.data.dataItemSegmentKey,function(b){
        if(typeof b !== 'undefined' && b===true){
          //console.log('on current user submission, scroll to bottom')
          scrollToBottom()
        } else {
          //console.log('on submission from other users')
          sessionDataItemGetter(self.data.dataItem._id,'scrollTop'+self.data.dataItemSegmentKey,function(scrollTop){
            if((scrollBottomValue - scrollTop) - latestItemHeight < 2){
              //console.log('if already close to bottom, just scroll all the way to bottom')
              scrollToBottom()
            } else {
              //console.log('if not close to bottom, keep scroll where it is')
              $(self.lastNode).scrollTop(scrollTop)
            }
          })
        }
      })
    }
  });



})