function manualTests() {
  var airtable = new GasTable();
  airtable.mountGASDefaults().set({
    apiKey: _getKey(),
    base: 'appkQMyX2Zb4gCLBY',
    table: 'Games'
  });
  var results = airtable.getAllRecords();
  Logger.log(results);

  // var createResult = airtable.create({
  //   'fields':{
  //     'rating': 2
  //   }
  // });
  // Logger.log(createResult);

  // var patchResult = airtable.update('recAcX51Bfxx17nIv', {
  //   'fields': {
  //     'Stack': 4
  //   }
  // });
 
  // Logger.log(patchResult);

  var delResult = airtable.del('recAcX51Bfxx17nIv');
  Logger.log(delResult);
}