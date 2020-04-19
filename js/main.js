
const articlesContainer = document.querySelector('.articles__list');
const input = document.querySelector('.article__form-input');
const button = document.querySelector('.article__form-btn');
const form = document.querySelector('.article__form');
let isEmptyFieldError = false;

const BUTTON_NODE_NAME = 'BUTTON';
const VALIDATION_MESSAGE = 'Заполните поле'

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

const showValidatinMessage = () => {
  if (!isEmptyFieldError) {
    const validationElement = document.createElement('span');
    validationElement.innerText = VALIDATION_MESSAGE;
    validationElement.className = 'error';
    form.insertBefore(validationElement, button);
    isEmptyFieldError = true;
  }
}

const getErrorElementNode = () => form.querySelector('.error');

const addArticle = () => {
  const article = {};
  const articleName = input.value;
  if (articleName) {
    article.name = articleName;
    articles.push(article);
    input.value = '';
    print(article);
    return;
  }
  showValidatinMessage();
}

button.addEventListener('click', (event) => {
  event.preventDefault();
  addArticle();
})

input.addEventListener('input', () => {
  if (isEmptyFieldError) {
    form.removeChild(getErrorElementNode());
    isEmptyFieldError = false;
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
