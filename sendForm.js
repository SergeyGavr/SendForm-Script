// Form

// объект с сообзениями, которые будут показываться пользователю
let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
};

let form = document.querySelector('.main-form'), //получаем нашу форму со страницы
    input = form.getElementsByTagName('input'), // получаем все наши инпуты с формы
    statusMessage = document.createElement('div'); // Создаем сообщение, которое буде появляться при отправке формы

statusMessage.classList.add('status'); // добавляем к сообщению какой-либо стиль

// после отправки формы добавляем событие...
form.addEventListener('submit', function(event) {
    event.preventDefault(); // отменяем стандартное поведение браузера(перезагрузка страницы после отправки формы)
    form.appendChild(statusMessage); // после формы добавляем наше сообщение

    let request = new XMLHttpRequest(); // создаем запрос
    request.open('POST', 'server.php'); // метод запроса, путь к серверу

    // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); - наш контент, то что мы отправляем на сервер, будет содержать данные, которые получены из формы. 
    
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    let formData = new FormData(form); // получаем все данные введенные пользователем

     //создаем объект, куда через метод forEach будем запиывать данные из formData
    let obj = {};  
    formData.forEach(function(value, key) {
        obj[key] = value;
    });

    // в новый обьект json с помощью метода stringify записываем данные из obj
    let json = JSON.stringify(obj);

    // передаем json-файл как body в метод send
    request.send(json);

    // добавляем событие readystatechange, чтобы отследивать изменения нашего запроса
    request.addEventListener('readystatechange', function() {
        if (request.readyState < 4) {
            statusMessage.innerHTML = message.loading;  // запрос еще не отправился
        } else if (request.readyState === 4 && request.status == 200) {
            statusMessage.innerHTML = message.success;  // запрос отправился(200 код)
        } else {
            statusMessage.innerHTML = message.failure;  // что-то пошло не так
        }
    });

    // после отправки формы очищаем наши поля для ввода
    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }
});