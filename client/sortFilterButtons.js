addTemplateHelper('sortFilterButtons','rendered',function(e) {
  var self = this
  zxcv = self;
  if(typeof this.alreadyRendered === 'undefined'){
    this.alreadyRendered = true;
  }

  //TAG CLOUD HEIGHT
  $(document).ready(function() {
    var $tagCloud = $(self.find('.tagCloud'));
    var $tagCloudTop = $tagCloud.offset().top;
    var windowHeight = $(window).height();

    //SIZE IT TO REST-OF-VERTICAL-SCREEN-TO-TOUCH-THE-BOTTOM
    // var scrollContainerHeight = (windowHeight - $tagCloudTop);
    // console.log(scrollContainerHeight)
    // $tagCloud.outerHeight(scrollContainerHeight)

    //SIZE IT TO 50%
    var scrollContainerHeight = (windowHeight/2 - $tagCloudTop);
    $tagCloud.outerHeight(scrollContainerHeight)
    
    // var chunk = $('<div style="z-index:9999999;position:absolute;background:red;top:0;left:0;width:100px;height:100px;"></div>')
    // $('body').append(chunk)
    // chunk.height((windowHeight - $tagCloudTop))
    // chunk.css('top',$tagCloud.offset().top+'px')

  });
  
})


addTemplateHelper('rootView','rendered',function(e) {
  //SET HEADER HEIGHT TO OFFSET SCROLL AREA
  var $headerPieces = $(this.findAll('.headerPiece'));
  var headerHeight = 0;
  $headerPieces.each(function(){
    headerHeight += $(this).outerHeight();
  })
  Session.set('headerHeight',headerHeight)
   
})


addTemplateHelper('rootView','resultsCountInputDataHelper',function(){
  // var tagsArray = Template.rootView.tagsHelper();
  // var buttonGroupArray = []
  // var total = tagsArray.length;
  // for(var i=0,l=total; i<l; i++){
  //   buttonGroupArray.push({label:tagsArray[i].tag + ' ' + tagsArray[i].popularityTally,class:'tagsInclude-button',match:tagsArray[i]})
  // }
  var dataForHelper = {
    class:'resultsCountInput',
    buttonText:': P',
    currentValue:Session.get('resultsCount'),
    label:"# of results"
  }
  return dataForHelper;
})




addTemplateHelper('rootView','tagsCloudDataHelper',function(){
  var tagsArray = Template.rootView.tagsHelper();
  var buttonGroupArray = []
  var total = tagsArray.length;
  for(var i=0,l=total; i<l; i++){
    buttonGroupArray.push({label:tagsArray[i].tag + ' ' + tagsArray[i].popularityTally,class:'tagsInclude-button',match:tagsArray[i]})
  }
  var dataForHelper = {
    toGet:'resultsCount',
    buttonGroupArray:buttonGroupArray,
    smallSize:'void',
    largeSize:'void',
    itemClass:'item',
    groupClass:'panel tagCloud',
    headlineString:'tag cloud'
  }

  return dataForHelper;
})



addTemplateHelper('rootView','resultsCountDataHelper',function(){
  var buttonGroupArray = []
  var total = Template.rootView.totalTauntsHelper();
  for(var i=1,l=total; i<=l; i++){
   buttonGroupArray.push({label:i,class:'resultsCount-button',match:i})
  }

  var dataForHelper = {
    toGet:'resultsCount',
    buttonGroupArray:buttonGroupArray,
    smallSize:1,
    largeSize:1,
    itemClass:'left no-margin',
    groupClass:'panel button-group',
    headlineString:'Results per page'
  }



  return dataForHelper;

})


addTemplateHelper('rootView','pageNumberDataHelper',function(){
  var buttonGroupArray = []
  var totalTaunts = Template.rootView.totalTauntsHelper();
  var pages = Math.floor(totalTaunts/Session.get('resultsCount'))
  var remainder = totalTaunts%Session.get('resultsCount')
  remainder = remainder > 0 ? 1 : 0;
  pages += remainder;
  for(var i=1,l=pages; i<=l; i++){
   buttonGroupArray.push({label:i,class:'page-button',match:i})
  }


  var dataForHelper = {
    toGet:'page',
    buttonGroupArray:buttonGroupArray,
    smallSize:1,
    largeSize:1,
    itemClass:'left no-margin',
    groupClass:'panel button-group',
    headlineString:'Page number'
  }



  return dataForHelper;

})



addTemplateHelper('rootView','sortDirectionDataHelper',function(){
  var buttonGroupArray = [];
  buttonGroupArray.push({label:'newest',class:'sortNewestFirst-button',match:-1})
  buttonGroupArray.push({label:'oldest',class:'sortOldestFirst-button',match:1})



  var dataForHelper = {
    toGet:'sortDirection',
    buttonGroupArray:buttonGroupArray,
    smallSize:6,
    largeSize:6,
    itemClass:'columns',
    groupClass:'button-group',
    headlineString:'Sort direction'
  }



  return dataForHelper;

})



addTemplateHelper('rootView','sortTypeDataHelper',function(){
  var buttonGroupArray = [];
  buttonGroupArray.push({label:'taunts',class:'latesttaunt-button sortType-button',match:'latesttaunt'})
  buttonGroupArray.push({label:'avatarChat',class:'latestavatarChat-button sortType-button',match:'latestavatarChat'})
  buttonGroupArray.push({label:'exposedChat',class:'latestexposedChat-button sortType-button',match:'latestexposedChat'})


  var dataForHelper = {
    toGet:'sortType',
    buttonGroupArray:buttonGroupArray,
    smallSize:6,
    largeSize:4,
    itemClass:'columns',
    groupClass:'button-group',
    headlineString:'Sort by'
  }



  return dataForHelper;

})



var fixTotalPages = function(){
  var pages = Math.floor(Session.get('totalTaunts')/Session.get('resultsCount'))
      var remainder = Session.get('totalTaunts')%Session.get('resultsCount')
      remainder = remainder > 0 ? 1 : 0;
      pages += remainder;
      Session.set('totalPages',pages)

      if(Session.get('page') > Session.get('totalPages')){
        Session.set('page',Session.get('totalPages'))
      }
}
//, 
setTemplateEvents('sortFilterButtons',{
  "keyup .resultsCountInput input": function (e, tmpl, x) {
    console.log(e)
    // var $el = $(e.target);
    // var $input = $el.closest('.row').find('input');
    // var inputValue = +$input.val();
    // console.log(inputValue)
    // Session.set('resultsCount', +inputValue);

    // fixTotalPages()
    
  },
  "click .resultsCountInput button": function (e, tmpl, x) {
    console.log(e)
    e.preventDefault();
    var $el = $(e.target);
    var $input = $el.closest('.row').find('input');
    var inputValue = $input.val();
    var inputValueDeLettered = +(inputValue.replace(/\D/g,''));
    
    inputValueDeLettered = inputValueDeLettered > 0 ? inputValueDeLettered : 1;
    console.log(inputValueDeLettered)
    Session.set('resultsCount', inputValueDeLettered);

    fixTotalPages()
    
  },
  "click .tagCheckbox": function (e, tmpl, x) {
    //.tagCloud

    var $el = $(e.target);
    var sessionIntended;
    if($el.hasClass('tagYes')){
      sessionIntended = 'tagsIncludeArray'
    }
    if($el.hasClass('tagNo')){
      sessionIntended = 'tagsExcludeArray'
    }
    if($el.closest('.tagCloud').length > 0){
    
      var tag = this.match.tag;
      var checked = $el.attr('checked')
      var currentSession = Session.get(sessionIntended)
      var indexOfTag = currentSession.indexOf(tag)
      if(typeof checked !== 'undefined' && checked === 'checked'){
        console.log('CHECKED!')
        console.log(indexOfTag, currentSession,tag)
        if(indexOfTag === -1){
          currentSession.push(tag)
          Session.set(sessionIntended, currentSession);
        }
        //
      } else {

        console.log('NOT CHECKED!')
        currentSession.splice(indexOfTag,1)
        Session.set(sessionIntended,currentSession);
      }
    }


  },
  "click a": function (e, tmpl, x) {
    var $el = $(e.target)
    if($el.hasClass('sortType-button')){
      //TOGGLE DIRECTION OF SORT WHEN A PRE-SELECTED SORTTYPE BUTTON IS PRESSED     
      if(this.parent.selected === this){
        Session.set('sortDirection', Session.get('sortDirection') * -1);
      } else {
        Session.set('sortDirection',-1)
      }
    }
    
    if($el.hasClass('latestexposedChat-button')){
      Session.set('sortType', 'latestexposedChat');

      
    }
    if($el.hasClass('latestavatarChat-button')){
      Session.set('sortType', 'latestavatarChat');
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
    if($el.hasClass('resultsCount-button')){

      
      
      Session.set('resultsCount', this.match);



      fixTotalPages()


    }
    if($el.hasClass('page-button')){
      Session.set('page', this.match);
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
    return false;
  }
})