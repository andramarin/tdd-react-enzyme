const request = require('superagent');


// Super quick test to check validity of response
// Run with: `node ajaxTest.js`
request
  .get('https://api.github.com/users')
  .end((err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(res.body);
  });
