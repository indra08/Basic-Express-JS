const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMasterProfinsi(page = 1){
    
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT p.* FROM gmedia_bedbos.ms_provinsi p LIMIT ?, ?', 
    [offset.toString(), config.listPerPage.toString()]
  );
  
  // Response
  const data = helper.emptyOrRows(rows);
  const response = {
      data, 
      page
  }

  // Metadata
  var status = 404;
  var message = "Data provinsi kosong";
  if(rows.length > 0){
    status = 200;
    message = "Berhasil memuat data";
  }

  // Output
  const metadata = {
    status,
    message
  }

  return {
    response,
    metadata
  }
}

async function getMasterKota(page = 1){
    
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      'SELECT k.* FROM gmedia_bedbos.ms_kota k LIMIT ?, ?', 
      [offset.toString(), config.listPerPage.toString()]
    );
    
    // Response
    const data = helper.emptyOrRows(rows);
    const response = {
        data, 
        page
    }
  
    // Metadata
    var status = 404;
    var message = "Data provinsi kosong";
    if(rows.length > 0){
      status = 200;
      message = "Berhasil memuat data";
    }
  
    // Output
    const metadata = {
      status,
      message
    }
  
    return {
      response,
      metadata
    }
}

async function savePartai(partai){
    
    const result = await db.query(
      'INSERT INTO gmedia_bedbos.ms_partai (url_logo, nama, akronim) VALUES (?, ?, ?)', 
      [partai.url_logo.toString(),
        partai.nama.toString(),
        partai.akronim.toString()]
    );
    
    // Response
    const insertedId = result.insertId;
    const response = {
        insertedId
    }
  
    // Metadata
    var status = 400;
    var message = "Gagal menyimpan data";
    if(result.affectedRows){
      status = 200;
      message = "Berhasil menyimpan data";
    }
  
    // Output
    const metadata = {
      status,
      message
    }
  
    return {
      response,
      metadata
    }
}

async function updatePartai(id, partai){
    
    const result = await db.query(
      'UPDATE gmedia_bedbos.ms_partai set url_logo = ?, nama = ?, akronim = ? WHERE id = ?', 
      [partai.url_logo.toString(),
        partai.nama.toString(),
        partai.akronim.toString(), id.toString()]
    );
    
    // Response
    const response = {}
  
    // Metadata
    var status = 400;
    var message = "Gagal menyimpan data";
    if(result.affectedRows){
      status = 200;
      message = "Berhasil menyimpan data";
    }
  
    // Output
    const metadata = {
      status,
      message
    }
  
    return {
      response,
      metadata
    }
}

module.exports = {
    getMasterProfinsi,
    getMasterKota,
    savePartai,
    updatePartai
}