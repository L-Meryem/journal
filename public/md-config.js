const easyMDE = new EasyMDE({
    element: document.getElementById('entry'),
    toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image"],
    status: ["words"] 
});

document.querySelector('.CodeMirror').classList.add('border');

document.querySelector('button[type="reset"]').addEventListener('click', e =>{
  e.preventDefault();
  easyMDE.value('');
  document.querySelector('#title').value = '';
  document.querySelector('#entryid').value = '';
  document.querySelector('button[type="submit"]').innerText = "Save";
});