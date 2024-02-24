import fs from 'fs';

const registerUser = (req, res) => {
  console.log('register');
  const { username, password, rePassword } = req.body;
  //   const contents = fs.readFileSync('storage.txt', 'utf8');
  console.log('register');
  fs.writeFile('test.txt', username, err => {
    if (err) throw err;
  });
};

export { registerUser };
