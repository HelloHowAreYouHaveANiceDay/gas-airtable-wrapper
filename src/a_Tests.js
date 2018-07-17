function taggedLog(tag) {
  return function (log) {
    Logger.log(tag);
    Logger.log(log);
  }
}

function test() {
  taggedLog('testAirtabe')(gasAirtableWrapper());
  taggedLog('testTable')(gasAirtableWrapper().base('success').getSettings());
  taggedLog('testInstance')(gasAirtableWrapper().getSettings());
  taggedLog('testCall')(gasAirtableWrapper().base('test2').getRequest());
  taggedLog('testCall')(gasAirtableWrapper()
    .apiKey('testKey')
    .base('testbasea')
    .table('testtable')
    .getRequest());
}