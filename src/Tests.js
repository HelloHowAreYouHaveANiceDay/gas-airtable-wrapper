var test_logAirtableWithKey = function() {
  var testTable = Airtable.of(ENV.apiKey);
  return testTable || false;
}

var test_setBase = function(table, id) {
  table.setBase = id;
  if(table.settings.base === id){
    return 'pass';
  } else {
    return 'no-pass';
  }
}



function test(){
 var table = test_logAirtableWithKey();
 Logger.log(test_setBase(table, 'test_id'))
}