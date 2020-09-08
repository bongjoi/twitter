const backUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.bongjoi-twitter.ga'
    : 'http://localhost:4000';
export { backUrl as default };
