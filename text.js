function formatText(command, value = null) {
    if (command === 'createLink') {
        value = prompt('Enter the URL:', 'http://');
    }
    document.execCommand(command, false, value);
}

// Optional: Auto-focus the editor on page load
document.getElementById('editor').focus();
