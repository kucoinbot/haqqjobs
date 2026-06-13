const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const keywords = req.query.keywords || 'warehouse security labourer care assistant cleaner driver';
  const location = req.query.location || '';
  const salary_min = req.query.salary_min || '25396';

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

  try {
    const data = await new Promise((resolve, reject) => {
      https.get(url, { headers: { 'User-Agent': 'HaqqJobs/1.0' } }, (r) => {
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
