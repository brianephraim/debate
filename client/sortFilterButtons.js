

setTemplateEvents('sortFilterButtons',{
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