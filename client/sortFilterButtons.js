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
    smallSize:1,
    largeSize:1,
    itemClass:'left no-margin',
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
    groupClass:'panel',
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
    groupClass:'panel',
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
    groupClass:'',
    headlineString:'Sort direction'
  }



  return dataForHelper;

})



addTemplateHelper('rootView','sortTypeDataHelper',function(){
  var buttonGroupArray = [];
  buttonGroupArray.push({label:'taunts',class:'latesttaunt-button sortType-button',match:'latesttaunt'})
  buttonGroupArray.push({label:'responses',class:'latestresponses-button sortType-button',match:'latestresponses'})
  buttonGroupArray.push({label:'discussion',class:'latestdiscussion-button sortType-button',match:'latestdiscussion'})


  var dataForHelper = {
    toGet:'sortType',
    buttonGroupArray:buttonGroupArray,
    smallSize:6,
    largeSize:4,
    itemClass:'columns',
    groupClass:'',
    headlineString:'Sort by'
  }



  return dataForHelper;

})





setTemplateEvents('sortFilterButtons',{
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
      }
    }
    
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
    if($el.hasClass('resultsCount-button')){

      

      Session.set('resultsCount', this.match);



      var pages = Math.floor(Session.get('totalTaunts')/Session.get('resultsCount'))
      var remainder = Session.get('totalTaunts')%Session.get('resultsCount')
      remainder = remainder > 0 ? 1 : 0;
      pages += remainder;
      Session.set('totalPages',pages)

      //If changing result count makes the current page disappear, set current page to last page.
      if(Session.get('page') > Session.get('totalPages')){
        Session.set('page',Session.get('totalPages'))
      }


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