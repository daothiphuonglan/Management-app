const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';
const expiresIn = '9h';

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get('users').find({ username, password }).value();

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn });
  res.status(200).json({ token });
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
