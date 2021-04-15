import "./index.css";

window.addEventListener('load', function () {
  console.log('onload');
})

window.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded');
  const verifyCodes = document.querySelectorAll('.verifyCode');
  const container = document.querySelector('.container');
  const hiddenInput = document.querySelector('input[type]');
  const removeBtn = document.querySelector('.removeBtn');
  const triggerBtn = document.querySelector('.triggerBtn');
  console.log(hiddenInput);

  let first = verifyCodes[0];

  first.addEventListener('click', atTargetPhase, {
    passive: true
  });
  container.addEventListener('click', atBubblePhase, {
    once: true
  });
  container.addEventListener('click', atCapturePhase, {
    capture: true
  });
  container.addEventListener('click', byUseCapture, true);
  removeBtn.addEventListener('click', handleRemove);
  triggerBtn.addEventListener('click', triggerMyEvent);

  function handleRemove(e) {
    console.log("handleRemove");
    container.removeEventListener('click', byUseCapture, false);
    container.removeEventListener('click', atCapturePhase, {
      capture: true
    });
  }

  container.addEventListener('myEvent', customEventHandler, true);

  function isDigit(key) {
    return /\d/.test(key);
  }

  function atCapturePhase(e) {
    // e.stopPropagation();
    console.log("atCapturePhase");
  }

  function atBubblePhase(e) {
    console.log("atBubblePhase");
  }

  function atTargetPhase(e) {
    console.log("atTargetPhase");
  }

  function byUseCapture(e) {
    console.log("byUseCapture");
  }

  function triggerMyEvent() {
    let MyEvent = new Event('myEvent', {
      bubbles: true,
      cancelable: true,
    });
    container.dispatchEvent(MyEvent);
  }

  function customEventHandler(e) {
    console.log(e)
  }
})