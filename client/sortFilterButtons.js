addTemplateHelper('sortFilterButtons','asdfasdf',function() {
  
  return function(){alert('asdf')}
})

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
    return false;
  }
})