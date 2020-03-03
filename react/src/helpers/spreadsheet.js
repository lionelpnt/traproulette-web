import config from '../config';

/**
 * Get the user authentication status
 */
export function checkAuth(immediate, callback) {
  window.gapi.auth.authorize({
    'client_id': config.clientId,
    'scope': config.scope,
    'immediate': immediate
  }, callback);
}

/**
 * Load the quotes from the spreadsheet
 * Embellish them with user own likes
 */
export function load(callback) {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: 'A1:E'
    }).then((response) => {
      const data = response.result.values || [],
        categories = [],
        sousCategories = [];

      let questions = data.map((quote, i) => {
        let id = quote[0], 
            categorie = quote[1],
            question = quote[2], 
            reponse = quote[3],
            sousCategorie = quote[4] || ''; 

        // Save an array of unique authors for the filters
        if (categories.indexOf(categorie) === -1) {
          categories.push(categorie);
        }

        // Save an array of unique authors for the filters
        if (sousCategories.indexOf(sousCategorie) === -1) {
          sousCategories.push(sousCategorie);
        }

        categories.sort();
        sousCategories.sort();

        return {
          id,
          categorie,
          question,
          reponse,
          sousCategorie
        }
      });
      
      // Initially order questions by date, most recent first
      questions = questions.sort((a, b) => a.id - b.id);
      
      callback({
        questions,
        categories,
        sousCategories
      });
    }, (response) => {
      callback(false, response.result.error);
    });
  });
}

export function updateCell(id, value, successCallback, errorCallback) {
  window.gapi.client.load('sheets', 'v4', () => {
    console.log(this);
    console.log(window.gapi);
    window.gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: config.spreadsheetId,
      range: 'TrapRoulette!B' + id + ':E' + id,
      valueInputOption: 'USER_ENTERED',
      values: [ value ]
    }).then(successCallback, errorCallback);
  });
}

