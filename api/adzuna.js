const https = require('https');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { keywords = 'warehouse security labourer care assistant cleaner driver', location = '', salary_min = '25396' } = req.query;

  const params = new URLSearchParams({
    app_id: '6cdb0826',
    app_key: '267ec9dee63729f0b65a3b7657c0c850',
    results_per_page: '50',
    what: keywords,
    where: location,
    salary_min,
    max_days_old: '2'
  });

  const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?${params}`;

  https.get(url, { headers: { 'User-Agent': 'HaqqJobs/1.0' } }, (apiRes) => {
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
