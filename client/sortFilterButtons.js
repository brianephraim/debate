setTemplateEvents('sortFilterButtons',{
  "click .tagYes": function (e, tmpl, x) {
    //.tagCloud
    var $el = $(e.target);
    if($el.closest('.tagCloud').length > 0){
    
      var tag = this.match.tag;
      var checked = $el.attr('checked')
      var currentSession = Session.get('tagsIncludeArray')
      var indexOfTag = currentSession.indexOf(this.tag)
      if(typeof checked !== 'undefined' && checked === 'checked'){
        console.log('CHECKED!')
        if(indexOfTag === -1){
          currentSession.push(tag)
          Session.set('tagsIncludeArray', currentSession);
        }
        //
      } else {

        console.log('NOT CHECKED!')
        currentSession.splice(indexOfTag,1)
        Session.set('tagsIncludeArray',currentSession);
      }
    }


  },
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