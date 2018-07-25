if ((typeof GasTap) === 'undefined') { // GasT Initialization. (only if not initialized yet.)
  eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText());
} // Class GasTap is ready for use now!

var test = new GasTap();

function runTests() {
  var airtable = new GasTable();
  airtable.set({
    apiKey: _getKey(),
    base: 'appkQMyX2Zb4gCLBY',
    table: 'Games'
  });

  // url encoding tests
  test('baseCase', function (t) {
    var url = 'https://api.airtable.com/v0/appkQMyX2Zb4gCLBY/Games?api_key=' + _getKey();
    t.equal(airtable.getCurrentUrl(), url, 'base url good');
  });

  test('withFields', function (t) {
    airtable.resetOpt();
    airtable.set({
      fields: ['Name', 'elo']
    });
    var url = 'https://api.airtable.com/v0/appkQMyX2Zb4gCLBY/Games?fields%5B%5D=Name&fields%5B%5D=elo?api_key=' + _getKey();
    t.equal(airtable.getCurrentUrl(), url, 'with fields good');
  });

  test('withSort', function (t) {
    airtable.resetOpt();
    airtable.set({
      sort: [
        {
          field: 'first',
          direction: 'asc'
        },
        {
          field: 'second',
          direction: 'desc'
        },
      ]
    });

    var url = 'https://api.airtable.com/v0/appkQMyX2Zb4gCLBY/Games?sort%5B0%5D%5Bfield%5D=first&sort%5B0%5D%5Bdirection%5D=asc&sort%5B1%5D%5Bfield%5D=second&sort%5B1%5D%5Bdirection%5D=desc?api_key=' + _getKey();
    t.equal(airtable.getCurrentUrl(), url, 'with sort good');
  });

  test('withView', function (t) {
    airtable.resetOpt();
    airtable.set({
      view: 'testView'
    });
    var url = 'https://api.airtable.com/v0/appkQMyX2Zb4gCLBY/Games?view=testView?api_key=' + _getKey();
    t.equal(airtable.getCurrentUrl(), url, 'with view good');
  });

  test.finish();
}
