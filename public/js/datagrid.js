var DataSource = function (options) {
  this._formatter = options.formatter;
  this._columns = options.columns;
  this._data = options.data;
  this._delay = options.delay || 0;
};

DataSource.prototype = {
  
  columns: function () {
    return this._columns;
  },

  data: function (options, callback) {

    var self = this;

    setTimeout(function () {
    
          var data = $.extend(true, [], self._data);
          
          console.log(options);
      
          // SEARCHING
          if (options.search) {
            data = _.filter(data, function (item) {
              for (var prop in item) {
                if (!item.hasOwnProperty(prop)) continue;
                if (~item[prop].toString().toLowerCase().indexOf(options.search.toLowerCase())) return true;
              }
              return false;
            });
          }
          var count = data.length;
  
          // SORTING
          if (options.sortProperty) {
            data = _.sortBy(data, options.sortProperty);
            if (options.sortDirection === 'desc') data.reverse();
          }
          
          // PAGING
          var startIndex = options.pageIndex * options.pageSize;
          var endIndex = startIndex + options.pageSize;
          var end = (endIndex > count) ? count : endIndex;
          var pages = Math.ceil(count / options.pageSize);
          var page = options.pageIndex + 1;
          var start = startIndex + 1;
          
          data = data.slice(startIndex, endIndex);
          
          if (self._formatter) self._formatter(data);
          
          callback({ data: data, start: start, end: end, count: count, pages: pages, page: page });
        
        }, this._delay);  
  }
};

// INITIALIZING THE DATAGRID
var dataSource = new DataSource({
  columns: [
    {
      property: 'name',
      label: 'Name',
      sortable: true
    },
    {
      property: 'countrycode',
      label: 'Country',
      sortable: true
    },
    {
      property: 'population',
      label: 'Population',
      sortable: true
    },
    {
      property: 'fcodeName',
      label: 'Type',
      sortable: true
    }
  ],
  data: [
    {name:'foo', countrycode:'United States', population:423459000, fcodeName:'23434123' },
    {name:'boo', countrycode:'Canada', population:123459000, fcodeName:'552432123' },
    {name:'bar', countrycode:'United Kingdom', population:523459000, fcodeName:'54544123' },
    {name:'doo', countrycode:'France', population:323459050, fcodeName:'9848823123' },
    {name:'too', countrycode:'Scotland', population:42344300, fcodeName:'23434123' },
    {name:'woo', countrycode:'Ireland', population:12345903, fcodeName:'52432123' },
    {name:'mar', countrycode:'Austria', population:32342910, fcodeName:'4544123' },
    {name:'soo', countrycode:'Spain', population:23459900, fcodeName:'9848823123' },
    {name:"Dhaka",countrycode:"BD",population:10356500, fcodeName:'1848823123'},
    {name:"Jakarta",countrycode:"BD",population:10356500, fcodeName:'1848823123'},
    {name:"Seoul",countrycode:"ID",population:8540121, fcodeName:'4448828694'},
    {name:"Hong Kong",countrycode:"HK",population:18540121, fcodeName:'349903004'}
  ],
  delay:300
});

$('#MyGrid').datagrid({
  dataSource: dataSource
});

$('#datagrid-reload').on('click', function () {
  $('#MyGrid').datagrid('reload');
});

