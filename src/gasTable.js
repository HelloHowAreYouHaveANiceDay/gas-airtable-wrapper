var GasTable = (function () {
  'use strict';
  /**
   * 
   */
  var defaultAirtableSettings = {
    root: 'https://api.airtable.com/v0',
    mounts: {
      create: undefined,
      read: undefined,
      up: undefined,
      del: undefined
    },
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
      offset: null,
    }
  };


  var GasTable = function (options) {

    var airtable = {
      settings: defaultAirtableSettings,
      reset: function () {
        this.settings = defaultAirtableSettings;
      },
      resetOpt: function () {
        // clean up
        this.settings.params.fields = [];
        this.settings.params.maxRecords = null;
        this.settings.params.filterByFormula = null;
        this.settings.params.pageSize = null;
        this.settings.params.sort = [];
        this.settings.params.view = null;
      },
      set: set,
      mount: mount,
      mountGASDefaults: mountGASDefaults,
      create: create,
      getRecords: getRecords,
      getAllRecords: getAllRecords,
      getCurrentUrl: getCurrentUrl
    };

    if (options) {
      Object.keys(options).map(function (key) {
        airtable.settings.params[key] = options[key];
      });
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

    function mount(payload) {
      var params = Object.keys(payload);
      for (var index = 0; index < params.length; index++) {
        var key = params[index];
        this.settings.mounts[key] = payload[key];
      }
      return this;
    }

    function create(payload) {
      var url = _getTableUrl();
      var post = airtable.settings.mounts.create;
      var api_key = airtable.settings.params.apiKey;
      url = url + '?api_key=' + api_key;
      var response = post(url, JSON.stringify(payload));
      return JSON.parse(response);
    }

    function getRecords() {
      var read = airtable.settings.mounts.read;
      if (read) {
        return JSON.parse(read(encodeUrl())).records;
      } else {
        throw new Error('read function not available, please mount read function first');
      }
    }

    function getAllRecords() {
      var read = airtable.settings.mounts.read;
      if (read) {
        var collection = [];
        var its = true;
        while (its === true) {
          var result = JSON.parse(read(encodeUrl()));
          if (result.offset) {
            Logger.log(result.offset);
            collection.push(result.records);
            airtable.settings.params.offset = encodeURIComponent(result.offset);
          } else {
            Logger.log(result.offset);
            collection.push(result.records);
            airtable.settings.params.offset = undefined;
            its = false;
          }
        }
        return [].concat.apply([], collection);
      } else {
        throw new Error('read function not available, please mount read function first');
      }
    }

    function _getTableUrl() {
      var base = encodeURIComponent(airtable.settings.params.base);
      var table = encodeURIComponent(airtable.settings.params.table);
      var url = airtable.settings.root + '/' + base + '/' + table;
      return url;
    }

    function encodeUrl() {
      var base = encodeURIComponent(airtable.settings.params.base);
      var table = encodeURIComponent(airtable.settings.params.table);
      var params = [];

      if (airtable.settings.params.fields.length > 0) {

        var fields = airtable.settings.params.fields;

        for (var i = 0; i < fields.length; i++) {
          var field = fields[i];
          params.push(
            'fields%5B%5D=' +
            encodeURIComponent(field)
              .split('%20')
              .join('+')
          );
        }

      }

      if (airtable.settings.params.filterByFormula) {
        params.push('filterByFormula=' + encodeURIComponent(airtable.settings.params.filterByFormula.trim()));
      }

      var maxRecords = airtable.settings.params.maxRecords ? parseInt(airtable.settings.params.maxRecords) : 0;
      if (maxRecords) {
        params.push('maxRecords=' + maxRecords);
      }

      var pageSize = airtable.settings.params.pageSize ? parseInt(airtable.settings.params.pageSize) : 0;
      if (pageSize) {
        params.push('pageSize=' + pageSize);
      }


      for (var index = 0; index < airtable.settings.params.sort.length; index++) {
        var element = airtable.settings.params.sort[index];
        params.push('sort%5B' + index + '%5D%5Bfield%5D=' + element.field +
          '&sort%5B' + index + '%5D%5Bdirection%5D=' + element.direction);
      }

      var view = airtable.settings.params.view;
      if (view) {
        params.push('view=' + encodeURIComponent(view));
      }

      var offset = airtable.settings.params.offset;
      if (offset) {
        params.push('offset=' + offset);
      }

      var api_key = airtable.settings.params.apiKey;
      if (api_key) {
        params.push('api_key=' + api_key);
      }

      var url = airtable.settings.root + '/' + base + '/' + table;

      if (params.length) {
        url = url + '?' + params.join('&');
      }

      return url;
    }


    // GOOGLE APPS SCRIPTS FUNCTION MOUNTINGS

    function mountGASDefaults() {
      airtable.settings.mounts = {
        create: _GAScreate,
        read: _GASget,
        up: _GASpatch,
        del: _GASdelete
      };
      return this;
    }

    function _GAScreate(url, payload) {
      return UrlFetchApp.fetch(url, {
        method: 'post',
        contentType: 'application/json',
        payload: payload
      });
    }

    function _GASget(url) {
      return UrlFetchApp.fetch(url);
    }

    function _GASpatch(url, payload) {
      return UrlFetchApp.fetch(url, {
        method: 'patch',
        contentType: 'application/json',
        payload: payload
      });
    }

    function _GASdelete(url) {
      return UrlFetchApp.fetch(url, {
        method: 'delete'
      });
    }

  };

  return GasTable;
}());