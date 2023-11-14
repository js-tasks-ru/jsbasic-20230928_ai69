export default function promiseClick(button) {
  return new Promise(resolve => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      resolve(event);
    }, { once: true });
  });
}
