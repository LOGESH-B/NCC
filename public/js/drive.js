
const { response } = require('express');
const { google } = require('googleapis');
const path = require('path');



//const GOOGLE_API_FOLDER_ID = '1HLkjrXOOeDn-ckFvDbzKBbUDzLL6jNwG'
const GOOGLE_API_FOLDER_ID = '1SE8U3rjQkq-s49LNEWKYDkrYDLInmJCu'
const url = 'https://drive.google.com/file/d//view'

async function links(id='1m-Vj4i9Yln-hOUMWpiWC-F4i7aX27sJr') {
    let _RESULT = null;

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, "../../serviceaccount.json"),
            scopes: 'https://www.googleapis.com/auth/drive'
        })
        const googleDriveClient = google.drive({ version: 'v3', auth });

        const response = await googleDriveClient.files.list
            ({
                pageSize: 150,
                q: `'${id}' in parents`
            });

        if (response && response.data && response.data.files) {
            _RESULT = response.data.files;
        }
       
    }
    catch (ex) { console.log(ex); }

    

    return _RESULT;
}





async function document_links(id='1SE8U3rjQkq-s49LNEWKYDkrYDLInmJCu') {
    let _RESULT = null;

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, "../../serviceaccount.json"),
            scopes: 'https://www.googleapis.com/auth/drive'
        })
        const googleDriveClient = google.drive({ version: 'v3', auth });

        const response = await googleDriveClient.files.list
            ({
                pageSize: 150,
                q: `'${id}' in parents`
            });

        if (response && response.data && response.data.files) {
            _RESULT = response.data.files;
        }
        list=[];
        for (const value of _RESULT) {
            data=await links(value.id);
            await list.push(data)
            
        }
    }
    catch (ex) { console.log(ex); }


    return list;
}

module.exports = {links, document_links };


























