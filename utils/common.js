exports.dbErr = [
  {
    location: 'db',
    msg: 'An error has occured. Please try again',
    param: 'general',
    value: '',
  },
];

exports.handle = async (promise) => {
  try {
    const data = await promise;
    return [data, undefined];
  } catch (err) {
    if (!err)
      return [
        undefined,
        [
          {
            location: 'handle',
            param: '',
            msg: 'an error has occured',
            value: '',
          },
        ],
      ];

    return [undefined, err];
  }
};
