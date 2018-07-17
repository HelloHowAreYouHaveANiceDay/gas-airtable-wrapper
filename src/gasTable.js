var GasTable = (function () {
  'use strict';
  /**
   * 
   */
  var defaultAirtableSettings = {
    root: 'https://api.airtable.com/v0',
    params: {
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
      }
    };

    return airtable;

    function get() {

    }

    function appendParam(url, property, value) {
      if (value && value.length > 0) {
        return url + "&" + property + "=" + value;
      }
      return url;
    }

    function appendBase(url) {
      return url + "/" + this.settings.params.base;
    }

    function appendTable (url) {
      return url + "/" + this.settings.params.table + "?";
    }


    function encodeUrl() {
      var url = appendTable(appendBase(this.settings.params.root));
      var params = Object.keys(this.settings.params);
      params.map(function (key) { url = appendParam(url, key, optionalSettings[key]); });
      return url;
    }

  };

  return GasTable;
}());