export default function login(req) {

  const user = {
    name: req.body.name,
    accessToken: req.body.accessToken
  };
  req.session.user = user;
  return Promise.resolve(user);
}
