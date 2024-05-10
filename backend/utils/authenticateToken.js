import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  const token = req.cookies.jwt;
  console.log(token);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, { id }) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.id = id;

    next();
  });
};

export default authenticateToken;
