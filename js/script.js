document.addEventListener('DOMContentLoaded', function() {
    // Простая CAPTCHA
    const captchaModal = document.getElementById('captcha-modal');
    const captchaQuestion = document.getElementById('captcha-question');
    const captchaAnswer = document.getElementById('captcha-answer');
    const verifyBtn = document.getElementById('verify-captcha');
    const attemptCounter = document.getElementById('attempt-counter');
    
    let attempts = 0;
    const maxAttempts = 3;
    let currentCaptcha;

    // Генерируем вопрос только с положительными ответами
    function generatePositiveCaptcha() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operators = ['+', '*']; // Только сложение и умножение
        
        // Для вычитания убедимся, что результат положительный
        if (num1 >= num2) {
            operators.push('-');
        }
        
        const operator = operators[Math.floor(Math.random() * operators.length)];
        const question = `${num1} ${operator} ${num2} = ?`;
        let answer;
        
        switch(operator) {
            case '+': answer = num1 + num2; break;
            case '-': answer = num1 - num2; break;
            case '*': answer = num1 * num2; break;
        }
        
        return { question, answer };
    }
    
    // Показываем CAPTCHA только при первом посещении
    if (!sessionStorage.getItem('captchaPassed')) {
        currentCaptcha = generatePositiveCaptcha();
        captchaQuestion.textContent = currentCaptcha.question;
        attemptCounter.textContent = `1/${maxAttempts}`;
        captchaModal.style.display = 'flex';
        
        verifyBtn.addEventListener('click', function() {
            const userAnswer = parseInt(captchaAnswer.value);
            
            if (userAnswer === currentCaptcha.answer) {
                sessionStorage.setItem('captchaPassed', 'true');
                captchaModal.style.display = 'none';
            } else {
                attempts++;
                attemptCounter.textContent = `${attempts + 1}/${maxAttempts}`;
                
                if (attempts >= maxAttempts) {
                    alert('Вы использовали все попытки. Страница будет перезагружена.');
                    sessionStorage.removeItem('captchaPassed');
                    location.reload();
                } else {
                    alert(`Неверный ответ. Осталось попыток: ${maxAttempts - attempts}`);
                    currentCaptcha = generatePositiveCaptcha();
                    captchaQuestion.textContent = currentCaptcha.question;
                    captchaAnswer.value = '';
                    captchaAnswer.focus();
                }
            }
        });
    }
    
    // Остальной код сайта...
});
