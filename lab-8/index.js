function sanitizeInput(input) {
    const div = document.createElement('div');
    div.innerText = input;
    return div.innerHTML;
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    const firstName = sanitizeInput(document.getElementById('firstName').value);
    const lastName = sanitizeInput(document.getElementById('lastName').value);

    // Use sanitized inputs in further logic...
});
