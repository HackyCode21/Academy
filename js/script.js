document.addEventListener('DOMContentLoaded', function() {
    // Фильтрация курсов
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Удаляем активный класс у всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                this.classList.add('active'));
                
                // Здесь должна быть логика фильтрации курсов
                // Например, можно скрывать/показывать элементы по data-атрибутам
            });
        });
    }

    // Обработка формы
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить валидацию и отправку формы
            alert('Форма отправлена! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }

    // Мобильное меню (можно добавить позже)
});