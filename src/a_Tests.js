if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
  eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText())
} // Class GasTap is ready for use now!

var test = new GasTap()

function runTests() {
  var airtable = new GasTable();
  airtable.set({
    apiKey: _getKey(),
    base: 'appkQMyX2Zb4gCLBY',
    table: 'Games'
  })

  test('baseCase', function (t) {
    var url = 'https://api.airtable.com/v0/appkQMyX2Zb4gCLBY/Games?api_key=' + _getKey();
    t.equal(airtable.getCurrentUrl(), url, 'base url good')
  })

  test('withFields', function (t) {
    airtable.resetOpt();
    airtable.set({
      fields: ['Name', 'elo']
    })
    var url = 'https://api.airtable.com/v0/appkQMyX2Zb4gCLBY/Games?fields%5B%5D=Name&fields%5B%5D=elo?api_key=' + _getKey()
    t.equal(airtable.getCurrentUrl(), url, 'base url good')
  })
  test.finish();
}