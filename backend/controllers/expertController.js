const { getDb } = require('../db');

const getExperts = (req, res) => {
  try {
    const db = getDb();
    let experts = db.experts;
    const { category, search, page = 1, limit = 6 } = req.query;

    if (category) experts = experts.filter(e => e.category === category);
    if (search) experts = experts.filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );

    const total = experts.length;
    const start = (page - 1) * limit;
    const paginated = experts.slice(start, start + parseInt(limit));

    res.json({
      experts: paginated,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExpertById = (req, res) => {
  try {
    const db = getDb();
    const expert = db.experts.find(e => e._id === req.params.id);
    if (!expert) return res.status(404).json({ message: 'Expert not found' });
    res.json(expert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getExperts, getExpertById };