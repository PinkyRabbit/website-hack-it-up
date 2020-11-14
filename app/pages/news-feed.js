const pagesOptions = require('../../pages.json');
const articles = require('../articles.json');

const reservedSlugs = [
  'login',
];

module.exports = {
  homePage: (req, res) => res.render('news-feed', {
    page: pagesOptions.main,
    articles,
  }),
  category: (req, res, next) => {
    const { categorySlug } = req.params;
    if (reservedSlugs.includes(categorySlug)) {
      return next();
    }

    const category = {
      name: 'Some category',
      slug: 'some-category',
      description: 'some category description',
      image: '1.jpg',
    };
    const page = {
      ...pagesOptions.main,
      h1: category.name,
      title: category.name,
      descritpion: category.description,
      image: category.image ? `/b/${category.image}` : '/c/no-image.jpg',
    };
    return res.render('news-feed', { page, articles });
  },
};
