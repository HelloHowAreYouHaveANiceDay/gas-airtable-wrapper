var gasAirtableWrapper = function () {


  var _rootURL = function () {
    return 'https://api.airtable.com/v0';
  }

  var options = {
    method: 'get',
    contentType: 'application/json',
    payload: null,
  };

  var requiredSettings = {
    base: null,
    table: null,
  };

  var optionalSettings = {
    fields: [],
    maxRecords: null,
    filterByFormula: null,
    pageSize: null,
    sort: [],
    view: null,
  };


  var addParam = function (url, property, value) {
    if (value && value.length > 0) {
      return url + "&" + property + "=" + value;
    }
    return url
  }

  var replaceSpace = function (string) {
    return string.split(" ")
      .map(function (token) {
        return encodeURIComponent(token);
      })
      .join("+")
  }

  var getAble = function () {
    return this.base && this.table && this.apiKey
  }

  var appendBase = function (url) {
    return url + "/" + requiredSettings.base;
  }

  var appendTable = function (url) {
    return url + "/" + requiredSettings.table + "?";
  }


  var encodeUrl = function () {
    var url = appendTable(appendBase(_rootURL()));
    var params = Object.keys(optionalSettings);
    params.map(function (key) { url = addParam(url, key, optionalSettings[key]) })
    return url;
  }

  return {
    apiKey: function (key) {
      requiredSettings.apiKey = key;
      return this;
    },
    base: function (base) {
      requiredSettings.base = base;
      return this;
    },
    table: function (table) {
      requiredSettings.table = table;
      return this;
    },
    maxRecords: function (maxRecords) {
      optionalSettings.maxRecords = maxRecords;
      return this;
    },
    pageSize: function (pageSize) {
      optionalSettings.pageSize = pageSize;
      return this;
    },
    view: function (view) {
      optionalSettings.view = view;
      return this;
    },
    getSettings: function () {
      return optionalSettings;
    },
    getRequest: function () {
      return encodeUrl();
    },
  };
};