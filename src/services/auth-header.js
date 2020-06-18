export default function authHeader() {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (user && token) {
    return {
      "Content-Type": "application/json",
      'Authorization': "" + token
    };
  } else {
    return {};
  }
}