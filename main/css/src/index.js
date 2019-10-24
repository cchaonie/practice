import "./index.scss";

window.onload = function() {
  console.log('onload');
  // const verifyCodes = document.querySelectorAll('.verifyCode');
  // const hiddenInput = document.querySelector('input[type]');
  // console.log(hiddenInput);
  // console.log(verifyCodes[0].draggable);
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded');
  const verifyCodes = document.querySelectorAll('.verifyCode');
  const hiddenInput = document.querySelector('input[type]');
  console.log(hiddenInput);

  verifyCodes.forEach(v => v.addEventListener('keyup', checkCode));

  function checkCode(e) {
    console.log(e)
    if (isDigit(e.key)) {
      console.dir(this);
    }
  }

  function isDigit(key) {
    return /\d/.test(key);
  }
})
