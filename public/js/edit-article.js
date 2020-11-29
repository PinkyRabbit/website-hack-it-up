/* eslint-disable consistent-return, func-names, no-unused-vars */
const inputOptions = {
  h1: [3, 30],
  title: [3, 300],
  keywords: [0, 300],
  description: [0, 300],
};

function inputRemoveGreen(el) {
  if (el.hasClass('has-success')) {
    el.removeClass('has-success');
    el.find('.glyphicon-ok').remove();
  }
}

function inputMakeRed(el) {
  if (!el.hasClass('has-error')) {
    el.addClass('has-error');
    el
      .find('.input-group')
      .append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
  }
}

function inputRemoveRed(el) {
  if (el.hasClass('has-error')) {
    el.removeClass('has-error');
    el.find('.glyphicon-remove').remove();
  }
}

function inputMakeGreen(el) {
  if (!el.hasClass('has-success')) {
    el.addClass('has-success');
    el
      .find('.input-group')
      .append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
  }
}

function validateInput(name) {
  const el = $(`#${name}`);
  if (!el) {
    return false;
  }
  const value = el.find('input').val();
  const [min, max] = inputOptions[name];
  if (value.length > max) {
    inputRemoveGreen(el);
    inputMakeRed(el);
    return true;
  }

  if (value.length > min) {
    inputRemoveRed(el);
    inputMakeGreen(el);
    return true;
  }

  inputRemoveGreen(el);
  inputRemoveRed(el);
}

let timestamp = Date.now();
const delay = 1000;
function delayedInputValidation(name) {
  const el = $(`#${name}`);
  if (!el) {
    return false;
  }
  validateInput(name);

  $(el).on('keyup', () => {
    const timer = setTimeout(() => {
      if (Date.now() - timestamp >= delay) {
        validateInput(name);
        clearTimeout(timer);
      }
    }, delay);
    timestamp = Date.now();
  });
}

function setCategoryColor(select, value) {
  if (value) {
    select.addClass('input-success');
  } else {
    select.removeClass('input-success');
  }
}

function selectCategory() {
  const el = $('#category');
  const value = el.data('base-value');
  const select = el.find('select');
  select.val(value);
  setCategoryColor(select, value);
  select.on('change', function () {
    const newValue = $(this).val();
    setCategoryColor(select, newValue);
  });
}

function addEditor() {
  const editorSettings = {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['font', 'size'],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ['link', 'image', 'code-block'],
      ],
    },
  };

  const container = document.getElementById('editor');
  const editor = new Quill(container, editorSettings);
}

function bidTagRemove(el) {
  el.on('click', function () {
    $(this).remove();
  });
}

function initTags() {
  $('.tag-wrapper').each(function () {
    const el = $(this);
    bidTagRemove(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const inputs = Object.keys(inputOptions);
  inputs.forEach((name) => delayedInputValidation(name));
  selectCategory();
  addEditor();
  initTags();
});
