const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // Mock authentication for MVP
  if (email === 'admin@ecocampus.edu' && password === 'admin123') {
    const token = jwt.sign({ id: 1, role: 'Super Admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    return res.json({ token, user: { email, role: 'Super Admin' } });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
};

