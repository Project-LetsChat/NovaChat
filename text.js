function formatText(command, value = null) {
    if (command === 'createLink') {
        value = prompt('Enter the URL:', 'http://');
    }
    document.execCommand(command, false, value);
}

// Optional: Auto-focus the editor on page load
document.getElementById('editor').focus();

function insertImage() {
    const url = prompt('Enter the image URL:', 'http://');
    if (url) {
        document.execCommand('insertImage', false, url);
    }
}

function saveContent() {
    const content = document.getElementById('editor').innerHTML;
    localStorage.setItem('editorContent', content);
}

function loadContent() {
    const content = localStorage.getItem('editorContent');
    if (content) {
        document.getElementById('editor').innerHTML = content;
    }
}

function toggleFullscreen() {
    const editorContainer = document.querySelector('.editor-container');
    if (!document.fullscreenElement) {
        editorContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.getElementById('editor').addEventListener('input', updateWordCount);

function updateWordCount() {
    const text = document.getElementById('editor').innerText.trim();
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    document.getElementById('wordCount').innerText = `Words: ${wordCount}`;
}

function toggleToolbarOption(option) {
    const button = document.querySelector(`[onclick="formatText('${option}')"]`);
    button.style.display = button.style.display === 'none' ? 'inline-block' : 'none';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.editor-container').classList.toggle('dark-mode');
    document.querySelector('.toolbar').classList.toggle('dark-mode');
}

function printContent() {
    const content = document.getElementById('editor').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

function exportToHTML() {
    const content = document.getElementById('editor').innerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'content.html';
    link.click();
}







