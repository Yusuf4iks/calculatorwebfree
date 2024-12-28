const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');

    function saveFilesToLocalStorage(files) {
      let savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = function (e) {
          savedFiles.push({ name: file.name, data: e.target.result });
          localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));
          displayFiles();
        };
        reader.readAsDataURL(file);
      }
    }

    function displayFiles() {
      fileList.innerHTML = '';
      const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
      savedFiles.forEach((file, index) => {
        const li = document.createElement('li');
        li.textContent = file.name;
        const downloadBtn = document.createElement('a');
        downloadBtn.textContent = ' Download';
        downloadBtn.href = file.data;
        downloadBtn.download = file.name;
        li.appendChild(downloadBtn);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = ' Delete';
        deleteBtn.onclick = () => deleteFile(index);
        li.appendChild(deleteBtn);
        fileList.appendChild(li);
      });
    }

    function uploadFiles() {
      const files = fileInput.files;
      if (files.length > 0) {
        saveFilesToLocalStorage(files);
      }
    }

    function deleteFile(index) {
      let savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
      savedFiles.splice(index, 1);
      localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));
      displayFiles();
    }

    window.onload = displayFiles;