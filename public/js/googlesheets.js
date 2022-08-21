const { google } = require("googleapis");



async function sheets() {
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "16VQ_v-qHT8g1KvouWJc0nLCZZVr-abGWqZ4GdjCgYOQ";


  const request = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '16VQ_v-qHT8g1KvouWJc0nLCZZVr-abGWqZ4GdjCgYOQ',  // TODO: Update placeholder value.

    range: 'Sheet1!A:B',  // TODO: Update placeholder value.



    auth: client,
  };

  try {
    const response = (await googleSheets.spreadsheets.values.get(request)).data;

  const readData = await googleSheets.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: "Sheet1!B7:H", //range of cells to read from.
})
  return (readData.data.values);


}catch(e)
{console.log(e)}
}

async function achivementssheets() {
  const auth = new google.auth.GoogleAuth({
      keyFile: "serviceaccount.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    // Create client instance for auth
    const client = await auth.getClient();
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = "1JaRELH5kY3mI7lh9yPfnjPxzZxLdtK8zTazQoEudZGg";
  

  
    try {
    
  
    const readData = await googleSheets.spreadsheets.values.get({
      auth, //auth object
      spreadsheetId, // spreadsheet id
      range: "Sheet1!B7:H", //range of cells to read from.
  })
    return (readData.data.values);
  
  
  }catch(e)
  {console.log(e)}
  }

module.exports = {sheets ,achivementssheets};