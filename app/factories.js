const { stringToSlug } = require('./helpers');

function Article(props) {
  this.h1 = props.h1 || '';
  this.title = props.title || '';
  this.slug = stringToSlug(this.h1);
  this.keywords = props.keywords || '';
  this.description = props.description || '';
  this.image = props.image || '';
  this.tags = props.tags || [];
}

module.exports = {
  Article,
};
