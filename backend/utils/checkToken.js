import jwt from 'jsonwebtoken';

const checkToken = token => {
  // const authHeader = req.headers['authorization'];
  //   const token = authHeader && authHeader.split(' ')[1];
  //   const token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET, err => {
    if (err) return false;
    return true;
  });
};

export default checkToken;
