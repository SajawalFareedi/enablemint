const config = require("../../config");
const express = require('express');
const {spawn} = require('child_process');

const router = express.Router();
// const server_url= 'http://localhost:8000/';
const Papa = require('papaparse/papaparse.min')
router.post('/', async (req, res) => {
  if (req.files != null) {
    let cvFile = req.files.file;

    let results = Papa.parse(cvFile.data.toString(), {header: true})

    results.data.forEach(record => {
      if (record.linkedin_url) {
        const python = spawn('python', ['company_profile_scraper.py', record.linkedin_url]);
        // collect data from script
        python.stdout.on('data', function (data) {
          let dataToSend = data.toString();
        //  Save to DB here
        })
      }
    })
    cvFile.mv(`./public/${cvFile.name}`, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send(err);
      }
      res.json({file: `${config.server_url}${cvFile.name}`});
    });
  } else {
    res.json({file: null});
  }
})

module.exports = router;
