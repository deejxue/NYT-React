// Require the package AXIOS for ajax calls
var axios = require('axios');
// NYT API key variable
var APIKey = '3dbfbf1bb1034c4bb5e8901725645c29';
// Define helpers for export
var helpers = {
// URL query 
  runQuery: function(term, start, end)  {
// define my variables for search term, start dates, and end dates
    var term = term.trim();
    var start = start.trim() + "0101";
    var end = end.trim() + "1231";

    return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
          'api-key': APIKey,
          'q': term,
          'begin_date': start,
          'end_date': end
      }
    })

    .then(function(results){

      return results.data.response;
    });
  },

  getSaved: function(){

    return axios.get('/api/saved')
      .then(function(results){

        return results;
      })
  },

  postSaved: function(title, date, url){

    var newArticle = {title: title, date: date, url: url};
    return axios.post('/api/saved', newArticle)
      .then(function(results){
        return results._id;
      })
  },

  deleteSaved: function(title, data, url){

    return axios.delete('/api/saved', {
      params: {
          'title': title,
          'data': data,
          'url': url,
      }
    })
    .then(function(results){
      return results;
    })
  }
}

module.exports = helpers;