
export function XHR() {

const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log('Resposta do xhr', xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/greeting');

xhr.send();
}