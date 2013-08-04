if(typeof Session.get('asdf') === 'undefined'){
  Session.set('resultsCount', 5);




  Session.set('page', 1);
}
if(typeof Session.get('sortDirection') === 'undefined'){
  Session.set('sortDirection', -1);
}
if(typeof Session.get('sortType') === 'undefined'){
  Session.set('sortType', 'latesttaunt');
}
if(typeof Session.get('tagsIncludeArray') === 'undefined'){
  Session.set('tagsIncludeArray', []);
}
if(typeof Session.get('tagsExcludeArray') === 'undefined'){
  Session.set('tagsExcludeArray', []);
}

Session.set('totalTaunts', 0);
Session.set('totalPages',0)


