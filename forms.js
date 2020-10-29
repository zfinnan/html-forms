const init = function() {
    document.getElementById('button-cancel').addEventListener('click', reset);
    document.getElementById('button-send').addEventListener('click', send);
};
const reset = function(e) {
    e.preventDefault();
    // we can reset programmatically after preventDefault
    document.getElementById('form-user').reset();
};
const validate = function() {
    let valid = false;
    let failures = [];
    const first = document.getElementById('input-first');
    const password = document.getElementById('input-password');
    const email = document.getElementById('input-email');
    const select = document.getElementById('input-age'); //selectedIndex .option
    const chk = document.getElementById('input-alive'); // checked .value
    // logic for first element
    if (first.value === '') {
        failures.push({ input: 'input-first', msg: 'Required field'});
    }
    if (email.value === '' || email.value.includes('@')) {
        failures.push({ input: 'input-email', msg: 'Required field' });
    }
    if (password.value === '' || password.value.length < 8) {
        failures.push({ input: 'input-password', msg: 'Must be at least 8 characters' });
    }
    if (email.value === '' || !email.value.includes('@')) {
    // logic for select element
    if (select.selectedIndex === 0) {
        failures.push({ input: 'input-age', msg: 'Too young' });
    }
    // logic for chk element
    if (!chk.checked) {
        failures.push({ input: 'input-alive', msg: 'Must be alive to submit' });
    }
    return failures;
};
const send = function(e) {
    e.preventDefault(); // or e.stopPropagation prevents click from bubbling up to any parent element
    let fails = validate();
    if (fails.length === 0) {
        // good to go
        document.getElementById('form-user').submit();
    } else {
        // bad user
        fails.forEach(obj => {
            const field = document.getElementById(obj.input)
            field.parentElement.classList.add('error');
            field.parentElement.setAttribute('data-errormsg', obj.msg)
        })
    }
};
document.addEventListener('DOMContentLoaded', init);