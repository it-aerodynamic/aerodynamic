module.exports = {
  target: 'serverless',
  images: {
    domains: ['cdn.sanity.io'],
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/rhnmht30/image/upload/',
  },
};
