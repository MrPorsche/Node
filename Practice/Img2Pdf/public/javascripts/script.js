let fileUpload = document.getElementById('file-upload');
let selectedFiles = document.querySelector('#selected-files code');
let submitButton = document.querySelector('input[type=submit]');

let fileNames = ""
fileUpload.onchange = function () {
    fileNames = ""
    for(let file of this.files) {
        fileNames += file.name
        fileNames += ","
    }
    selectedFiles.parentElement.style.display = 'block'
    selectedFiles.textContent = fileNames
    submitButton.style.display = 'inline-block';
}