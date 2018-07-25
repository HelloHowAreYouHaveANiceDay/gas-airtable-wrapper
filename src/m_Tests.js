function manualTests() {
  var airtable = new GasTable();
  airtable.mountGASDefaults().set({
    apiKey: _getKey(),
    base: 'appkQMyX2Zb4gCLBY',
    table: 'Games'
  });
  var results = airtable.getAllRecords();
  Logger.log(results);
}