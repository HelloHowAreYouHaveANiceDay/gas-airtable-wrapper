# GAS Airtable Wrapper

gas-airtable-wrapper makes pushing requests to airtable quick and painless.

## Installation

Copy and paste everything in `src/gasTable.js` into a `.gs` file on the Apps Scripts IDE.
- or - 
Copy and paste the file into your folder and push through `clasp`

*API Key*

in `Code.js` you'll see this function

``` js
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
```

you can pull your API keys in however you want, but here I'm using the properties service available in google apps scripts. You can add the key by going to File > Project Properties.

## Usage

``` js
// instantiate the wrapper
var airtable = new GasTable();
// mount the default google apps script URLFetch functions
airtable.mountGASDefaults()
// set options
  .set({
  // MANDATORY
  apiKey: _getKey(),
  base: 'BASE_ID',
  table: 'TABLE_NAME'
  // OPTIONAL
  fields: [
    'field1',
    'field2'
  ],
  filterByFormula: 'string formula',
  maxRecords: 100,
  pageSize: 50,
  sort: [
    {
      field: 'field1',
      direction: 'asc'
    },
    {
      field: 'field2',
      direction: 'desc'
    }
  ],
  view: 'view name'
  });

// pulls all records from table
airtable.getAllRecords();

// pulls up to the first 100 records
airtable.getRecords();

// create a new record
airtable.create(payload);

// update a record
airtable.update(record_id, payload);

// delete a record
airtabe.delete(record_id)

```