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

function sendForm(elem) {
    // после отправки формы добавляем событие...
    elem.addEventListener('submit', function(event) {
        event.preventDefault(); // отменяем стандартное поведение браузера(перезагрузка страницы после отправки формы)
        elem.appendChild(statusMessage); // после формы добавляем наше сообщение

        let formData = new FormData(elem); // получаем все данные введенные пользователем

        //создаем объект, куда через метод forEach будем запиывать данные из formData
        let obj = {};  
        formData.forEach(function(value, key) {
            obj[key] = value;
        });

        // в новый обьект json с помощью метода stringify записываем данные из obj
        let json = JSON.stringify(obj);

        function postData(data) {
            return new Promise(function(resolve,reject) {
                let request = new XMLHttpRequest(); // создаем запрос

                request.open('POST', 'server.php'); // метод запроса, путь к серверу

                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                request.onreadystatechange = function() {
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4) {
                        if (request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    }
                };

                request.send(data);
            });
        }

        function clearInput() {
            // после отправки формы очищаем наши поля для ввода
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }


        postData(json)
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput);

    });
}

sendForm(form);