/**
 * Google Apps Script - Contact Form Handler
 * Spreadsheet: Connects to your Google Sheet
 * Deployment URL: https://script.google.com/macros/s/AKfycbyWm9_PaLQRyu8Aq6ETTKzrmD3Ut4D8i1BPupZaI6Lj-Bj0Uo-BloCv4qdoHgrrJw/exec
 * Deployment ID: AKfycbyWm9_PaLQRyu8Aq6ETTKzrmD3Ut4D8i1BPupZaI6Lj-Bj0Uo-BloCv4qdoHgrrJw
 */

// 1. GET endpoint (visiting the URL in a browser confirms the script is alive)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "success", message: "Google Apps Script is active and working!" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 2. POST endpoint (receives the form data from your portfolio)
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds to avoid simultaneous write collisions

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Automatically initialize header row if sheet is brand new / empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Message"]);
      sheet.getRange("A1:D1").setFontWeight("bold");
    }

    // Support both URL-encoded form data and JSON payloads
    var data = {};
    if (e.parameter) {
      data = e.parameter;
    }
    if (e.postData && e.postData.contents) {
      try {
        var parsed = JSON.parse(e.postData.contents);
        data = Object.assign(data, parsed);
      } catch (err) {}
    }

    var timestamp = new Date();
    var name = data.name || "";
    var email = data.email || "";
    var message = data.message || "";

    // Append submission row to Google Sheet
    sheet.appendRow([timestamp, name, email, message]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", message: "Data recorded successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// 3. Test function (click 'Run' on this in Apps Script editor to authorize permissions)
function test() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([new Date(), "Test Name", "test@example.com", "Test Message from test()"]);
}
