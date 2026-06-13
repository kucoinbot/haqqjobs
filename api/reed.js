const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const keywords = req.query.keywords || 'warehouse security construction care cleaning driver';
  const location = req.query.location || '';
  const minimumSalary = req.query.minimumSalary || '25396';

  const params = new URLSearchParams({ keywords, locationName: location, resultsToTake: '50', minimumSalary });
  const url = `https://www.reed.co.uk/api/1.0/search?${params}`;
  const auth = Buffer.from('e3d82bd9-5bda-48c8-9a46-7d7baf45a21a:').toString('base64');

  try {
    const data = await new Promise((resolve, reject) => {
      https.get(url, { headers: { 'Authorization': `Basic ${auth}`, 'User-Agent': 'HaqqJobs/1.0' } }, (r) => {
        let body = '';
        r.on('data', c => body += c);
        r.on('end', () => resolve(body));
      }).on('error', reject);
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(200).json({ results: [], error: e.message });
  }
};
