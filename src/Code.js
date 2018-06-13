function hasKey() {
  return ENV.apiKey || false;
}


var Airtable = function(key) {
  this._key = key;

  this._value = null;

  this._rootURL = 'https://api.airtable.com/v0/';

  this.options = {
    method: '',
    contentType: 'application/json',
    payload: null,
  };

  this.settings = {
    base: null,
    table: null,
    fields: [],
    maxRecords: null,
    filterByFormula: null,
    pageSize: null,
    sort: null,
    view: null,
  };
};

Airtable.of = function(key) {
  return new Airtable(key);
};

Airtable.prototype.map = function(f) {
  return Airtable.of(f(this._value));
}

Airtable.prototype.isNothing = function() {
  return (this._value == null || this._value === undefined);
}

Airtable.prototype.setBase = function(base_id) {
  this.settings.base = base_id;
}