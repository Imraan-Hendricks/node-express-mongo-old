exports.dbErr = [
  {
    location: 'db',
    msg: 'An error has occured. Please try again',
    param: 'general',
    value: '',
  },
];

exports.handle = (promise) =>
  promise
    .then((data) => [data, undefined])
    .catch((error) => Promise.resolve([undefined, error ? error : true]));
