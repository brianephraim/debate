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


