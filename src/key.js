function _getKey() {
  var userKey = PropertiesService.getUserProperties().getProperty('AIRTABLE_API_KEY');
  if (userKey) {
    return userKey;
  }
  var scriptKey = PropertiesService.getScriptProperties().getProperty('AIRTABLE_API_KEY');
  if (scriptKey) {
    return scriptKey;
  }
  throw 'no api key found, please at add the API key to either user or script properties.'
}