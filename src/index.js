import MVVM from './MVVM.js';
// import MVVM from './2/mvvm';

window.vm = new MVVM({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    text: '12'
  }
});
