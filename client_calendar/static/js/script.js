$("#sendToBitrix").on("click", function () {
    event.preventDefault();
    const name = $("#name").val();
    const time_start = $("#time_start").val();
    const time_end = $("#time_end").val();
    const budget = $("#budget").val();
    const name_hall = $("#name_hall").val();
    const add_services = $("#add_services").val();
    const dateSource = window.selectedDate;
    const csrftoken = getCookie("csrftoken");

    if (dateSource == "" || dateSource == undefined) {
        alert("Выберите дату записи");
        return;
    }

    // Функция для преобразования времени в минуты
    function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map((num) => parseInt(num, 10)); // Разделяем на часы и минуты
        return hours * 60 + minutes; // Преобразуем в минуты с начала суток
    }

    // Получаем минуты для начального и конечного времени
    const startMinutes = timeToMinutes(time_start);
    const endMinutes = timeToMinutes(time_end);

    // Проверяем, что начальное время не позднее конечного
    if (startMinutes > endMinutes) {
        alert("Начальное время не может быть позже конечного");
        return;
    } else if (startMinutes == endMinutes) {
        alert("Начальное время записи не может совпадать с финальным временем записи");
        return;
    }

    const formattedString = dateSource.replace(/\+/g, " "); // Заменяем "+" на пробел
    const months = {
        Январь: "January",
        Февраль: "February",
        Март: "March",
        Апрель: "April",
        Май: "May",
        Июнь: "June",
        Июль: "July",
        Август: "August",
        Сентябрь: "September",
        Октябрь: "October",
        Ноябрь: "November",
        Декабрь: "December",
    };

    // Переводим название месяца на английский
    const [day, month, year] = formattedString.split(" ");
    const englishMonth = months[month];

    // Создаем дату
    const date = new Date(`${englishMonth} ${day}, ${year}`);

    $.ajax({
        url: "{% url 'client_calendar:addAppointmentToBitrix' %}", // URL для обработки формы
        type: "POST",
        data: {
            name: name,
            date: date,
            time_start: time_start,
            time_end: time_end,
            budget: budget,
            name_hall: name_hall,
            add_services: add_services,
            client_id: window.client_id,
            csrfmiddlewaretoken: csrftoken, // CSRF токен
        },
        success: function (response) {
            // Если ответ успешный, отобразим календарь

            console.log(response);
            alert(response.message);
        },
        error: function (response) {
            // Если ошибка, отображаем сообщение об ошибке
            console.log(response);
        },
    });
});
$("#makeNewAppointment").on("submit", function (event) {
    event.preventDefault(); // предотвращаем перезагрузку страницы

    const name = $("#name").val();
    const time_start = $("#time_start").val();
    const time_end = $("#time_end").val();
    const budget = $("#budget").val();
    const name_hall = $("#name_hall").val();
    const add_services = $("#add_services").val();
    const dateSource = window.selectedDate;
    const csrftoken = getCookie("csrftoken");

    if (dateSource == "" || dateSource == undefined) {
        alert("Выберите дату записи");
        return;
    }

    // Функция для преобразования времени в минуты
    function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map((num) => parseInt(num, 10)); // Разделяем на часы и минуты
        return hours * 60 + minutes; // Преобразуем в минуты с начала суток
    }

    // Получаем минуты для начального и конечного времени
    const startMinutes = timeToMinutes(time_start);
    const endMinutes = timeToMinutes(time_end);

    // Проверяем, что начальное время не позднее конечного
    if (startMinutes > endMinutes) {
        alert("Начальное время не может быть позже конечного");
        return;
    } else if (startMinutes == endMinutes) {
        alert("Начальное время записи не может совпадать с финальным временем записи");
        return;
    }

    const formattedString = dateSource.replace(/\+/g, " "); // Заменяем "+" на пробел
    const months = {
        Январь: "January",
        Февраль: "February",
        Март: "March",
        Апрель: "April",
        Май: "May",
        Июнь: "June",
        Июль: "July",
        Август: "August",
        Сентябрь: "September",
        Октябрь: "October",
        Ноябрь: "November",
        Декабрь: "December",
    };

    // Переводим название месяца на английский
    const [day, month, year] = formattedString.split(" ");
    const englishMonth = months[month];

    // Создаем дату
    const date = new Date(`${englishMonth} ${day}, ${year}`);

    $.ajax({
        url: "{% url 'client_calendar:newAppointment' %}", // URL для обработки формы
        type: "POST",
        data: {
            name: name,
            date: date,
            time_start: time_start,
            time_end: time_end,
            budget: budget,
            name_hall: name_hall,
            add_services: add_services,
            client_id: window.client_id,
            csrfmiddlewaretoken: csrftoken, // CSRF токен
        },
        success: function (response) {
            // Если ответ успешный, отобразим календарь

            console.log(response);
        },
        error: function (response) {
            // Если ошибка, отображаем сообщение об ошибке
            console.log(response);
        },
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

let currentMonth = 0; // Январь
let currentYear = 2025;

function updateCalendar() {
    const calendar = $(".calendar");
    calendar.find(".day:not(:lt(7))").remove(); // Удаляем старые числа

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Вычисляем смещение для первого дня (Пн = 1, Вс = 0 -> Пн = 0, Вс = 6)
    const offset = firstDay === 0 ? 6 : firstDay - 1;

    // Добавляем пустые клетки для смещения
    for (let i = 0; i < offset; i++) {
        calendar.append('<div class="day"></div>');
    }

    // Добавляем числа месяца
    for (let day = 1; day <= daysInMonth; day++) {
        calendar.append(`<div class="day" data-day="${day}">${day}</div>`);
    }

    // Обновляем заголовок месяца
    $("#current-month").text(`${monthNames[currentMonth]} ${currentYear}`);
}

$(document).ready(function () {
    updateCalendar();

    $("#prev-month").click(function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    $("#next-month").click(function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    $(document).on("click", ".day[data-day]", function () {
        $(".day").removeClass("selected"); // Убираем выделение с других дат
        $(this).addClass("selected"); // Добавляем выделение выбранной дате
        window.selectedDate = `${$(this).data("day")} ${monthNames[currentMonth]} ${currentYear}`;

        const formattedString = window.selectedDate.replace(/\+/g, " "); // Заменяем "+" на пробел
        const months = {
            Январь: "January",
            Февраль: "February",
            Март: "March",
            Апрель: "April",
            Май: "May",
            Июнь: "June",
            Июль: "July",
            Август: "August",
            Сентябрь: "September",
            Октябрь: "October",
            Ноябрь: "November",
            Декабрь: "December",
        };

        // Переводим название месяца на английский
        const [day, month, year] = formattedString.split(" ");
        const englishMonth = months[month];

        // Создаем дату
        const date = new Date(`${englishMonth} ${day}, ${year}`);

        const csrftoken = getCookie("csrftoken");
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== "") {
                const cookies = document.cookie.split(";");
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === name + "=") {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        $.ajax({
            url: "{% url 'client_calendar:getAppointmentForDay' %}", // URL для обработки формы
            type: "POST",
            data: {
                date: date,
                csrfmiddlewaretoken: csrftoken, // CSRF токен
            },
            success: function (response) {
                // Если ответ успешный, отобразим календарь

                console.log(response);
                if (response.appointments) {
                    let newHTML = "<h2>Занятые слоты</h2>";

                    response.appointments.forEach((element) => {
                        newHTML += `
                            ${element.date} ${element.time_start}-${element.time_end}
                            <p></p>
                        `;
                    });
                    $(".info-container").html(newHTML);
                }
            },
            error: function (response) {
                // Если ошибка, отображаем сообщение об ошибке
                console.log(response);
            },
        });
    });

    $(".service-header").click(function () {
        const content = $(this).next(".service-content");
        const toggleBtn = $(this).find(".toggle-btn");

        content.slideToggle(); // Скрываем/показываем блок
        toggleBtn.text(content.is(":visible") ? "-" : "+"); // Меняем знак на кнопке
    });
});