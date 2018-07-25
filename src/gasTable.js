var GasTable = (function () {
  'use strict';
  /**
   * 
   */
  var defaultAirtableSettings = {
    root: 'https://api.airtable.com/v0',
    params: {
      apiKey: null,
      base: null,
      table: null,
      fields: [],
      maxRecords: null,
      filterByFormula: null,
      pageSize: null,
      sort: [],
      view: null,
    }
  };


  var GasTable = function (options) {

    var airtable = {
      settings: defaultAirtableSettings,
      reset: function () {
        this.settings = defaultAirtableSettings;
      },
      resetOpt: function () {
        this.settings.optional = defaultAirtableSettings.optional;
      },
      set: set,
      getCurrentUrl: getCurrentUrl
    };

    if (options) {
      Object.keys(options).map(function(key){
        airtable.settings.params[key] = options[key]; 
      })
    }

    return airtable;

    function getCurrentUrl() {
      return encodeUrl();
    }

    function set(payload) {
      var params = Object.keys(payload);
      for (var index = 0; index < params.length; index++) {
        var key = params[index];
        this.settings.params[key] = payload[key];
      }
      return this;
    }

    function appendParam(url, property, value) {
      if (value && value.length > 0) {
        return url + "&" + property + "=" + value;
      }
      return url;
    }

    // appendBase :: String -> String
    function appendBase(url) {
      return url + "/" + airtable.settings.params.base;
    }

    // appendTable :: String -> String
    function appendTable(url) {
      return url + "/" + airtable.settings.params.table + "?";
    }

    function appendKey(url) {
      return url + "api_key=" + airtable.settings.params.apiKey;
    }


    function encodeUrl() {
      const base = encodeURIComponent(airtable.settings.params.base)
      const table = encodeURIComponent(airtable.settings.params.table)
      var params = []

      if (airtable.settings.params.fields.length > 0) {

        var fields = airtable.settings.params.fields

        for (var i = 0; i < fields.length; i++) {
          var field = fields[i];
          params.push('fields%5B%5D=' + encodeURIComponent(field).split('%20').join('+'));
        }

      }

      if (airtable.settings.params.filterByFormula) {
        params.push('filterByFormula=' + encodeURIComponent(airtable.settings.params.filterByFormula.trim()));
      }

      const maxRecords = airtable.settings.params.maxRecords ? parseInt(airtable.settings.params.maxRecords) : 0
      if (maxRecords) {
        params.push('maxRecords=' + maxRecords);
      }

      const pageSize = airtable.settings.params.pageSize ? parseInt(airtable.settings.params.pageSize) : 0
      if (pageSize) {
        params.push('pageSize=' + pageSize)
      }


      if (airtable.settings.params.sort.length > 0) {
        airtable.settings.params.sort.map(function (sort) {
          params.push('sort%5B0%5D%5Bfield%5D=' + sort.field + '&sort%5B0%5D%5Bdirection%5D=' + sort.direction);
        })
      }

      const view = airtable.settings.params.view;
      if (view) {
        params.push('view=' + encodeURIComponent(view))
      }


      var url = airtable.settings.root + '/' + base + '/' + table

      if (params.length) {
        url = url + '?' + params.join('&')
      }


      url = url + '?api_key=' + airtable.settings.params.apiKey;

      return url
    }

  };

  return GasTable;
}());