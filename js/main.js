
const ajv = new Ajv({allErrors: true});
const schema = {
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    }
  }
}
const validate = (data) => ajv.validate(schema, data);

const articlesContainer = document.querySelector('.articles__list');
const input = document.querySelector('.article__form-input');
const button = document.querySelector('.article__form-btn');
const form = document.querySelector('.article__form');

const BUTTON_NODE_NAME = 'BUTTON';
const articles = [
  {
    name: 'Lorem, ipsum dolor.',
  },
  {
    name: 'Lorem ipsum dolor sit.',
  }
];

const printArticles = () => {
  articles.forEach(print)
}

const addDeleteButton = (paragfaf) => {
  const button = document.createElement('button');
  button.classList.add('btn--delete');
  paragfaf.appendChild(button);
}

const print = (article) => {
  const paragraf = document.createElement('p');
  paragraf.classList.add('article');
  paragraf.innerHTML = article.name;
  addDeleteButton(paragraf);
  articlesContainer.appendChild(paragraf);
};

const getParagrafNodeList = () => Array.from(articlesContainer.children);

const deleteArticle = (index, deletingNode) => {
  articles.splice(index, 1);
  articlesContainer.removeChild(deletingNode);
}

const showValidatinMessage = (article) => {
  const validationElement = document.createElement('span');
  validationElement.innerText = ajv.errorsText();
  validationElement.className = 'error';
  form.insertBefore(validationElement, button);
}

const getErrorElementNode = () => form.querySelector('.error');

const addArticle = () => {
  const article = {};
  article.name = input.value;
  if (validate(article)) {
    articles.push(article);
    input.value = '';
    print(article);
    return;
  }
  if (!!getErrorElementNode()) {
    return;
  }
  showValidatinMessage(article);
}

button.addEventListener('click', (event) => {
  event.preventDefault();
  addArticle();
})

input.addEventListener('input', () => {
  const element = getErrorElementNode();
  if (element) {
    form.removeChild(element);
  }
})

articlesContainer.addEventListener('click', (event) => {
  if (event.target.nodeName === BUTTON_NODE_NAME) {
    const deletingNode = event.target.parentNode;
    const index = getParagrafNodeList().findIndex(node => node === deletingNode);
    deleteArticle(index, deletingNode);
  }
})

printArticles()
getParagrafNodeList();
