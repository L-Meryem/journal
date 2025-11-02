let entries = document.querySelectorAll("li");
let edit = document.getElementsByClassName("fa-pen");
let trash = document.getElementsByClassName("fa-trash");
let preview = null;
let isPreviewMode = false;


Array.from(trash).forEach(elem => {
  elem.addEventListener('click', e => {
    e.stopPropagation();
    const entryId = e.target.parentNode.parentNode.parentNode.dataset.id; //access to data-id
    console.log(entryId);
    fetch('/entries', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'entryId': entryId
      })
    })
      .then(response => {
        if (response.ok)
          window.location.href = '/entries';
      });
  });
});

//Edit entry
Array.from(edit).forEach(elem => {
  elem.addEventListener('click', async e => {
    e.stopPropagation();

    //switch from preview to form
    document.querySelector('form').style.display = 'block';
    document.querySelector('#preview-area').value = '';
    document.querySelector('#preview-area').hidden = true;

    const entryId = e.target.parentNode.parentNode.parentNode.dataset.id; //access data-id
    console.log(entryId);
    const res = await fetch(`/entries/${entryId}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();

    //fill the form
    document.querySelector('#title').value = data.entry.title;
    easyMDE.value(data.entry.content);

    // change button name
    document.querySelector('button[type="submit"]').innerText = "Update";

    //store id to update the entry
    document.querySelector('#entryid').value = entryId;

  });
});

//MD preview
entries.forEach(entry => {
  entry.addEventListener('click', async e => {
    document.getElementById('preview-area').value = '';
    const entryId = e.currentTarget.dataset.id; //access data-id
    console.log(entryId);

    const res = await fetch(`/entries/${entryId}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();

    //switch from from to preview
    document.querySelector('form').style.display = 'none';
    document.querySelector('#preview-area').hidden = false;

    if (!preview) {
      preview = new EasyMDE({
        element: document.getElementById('preview-area'),
        toolbar: false,
        status: false,
        readOnly: true
      });
    }
    preview.value(data.entry.content);

    if (!isPreviewMode) {
      EasyMDE.togglePreview(preview);
      isPreviewMode = true;
    }
  });
});





