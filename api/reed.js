const https = require('https');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { keywords = 'warehouse security construction care cleaning driver', location = '', minimumSalary = '25396' } = req.query;

  const params = new URLSearchParams({
    keywords,
    locationName: location,
    resultsToTake: '50',
    minimumSalary
  });

  const url = `https://www.reed.co.uk/api/1.0/search?${params}`;
  const auth = Buffer.from('e3d82bd9-5bda-48c8-9a46-7d7baf45a21a:').toString('base64');

  const options = {
    headers: {
      'Authorization': `Basic ${auth}`,
      'User-Agent': 'HaqqJobs/1.0'
    }
  };

  https.get(url, options, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => data += chunk);
    apiRes.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    });
  }).on('error', (e) => {
    res.status(500).json({ error: e.message, results: [] });
  });
};
