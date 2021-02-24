document.addEventListener('DOMContentLoaded', () => {


    const countTimer = (deadline) => {
        let timerHours = document.getElementById('timer-hours'),
            timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds');
        
        const getTimeRemaining = () => {
            let seconds = 0;
            let minutes = 0;
            let hours = 0;
            let dateStop = new Date(deadline).getTime();
            let dateNow = new Date().getTime();
            let dateDiff = (dateStop - dateNow) / 1000;
            if(dateDiff > 0){
                seconds = (dateDiff % 60) ^ 0;
                minutes = ((dateDiff / 60) % 60) ^ 0;
                hours = (dateDiff / 60 / 60) ^ 0;
            }


            return {dateDiff, hours, minutes, seconds};
        };

        const updateClock = () => {
            let timer = getTimeRemaining();
            timerSeconds.textContent = addZero(timer.seconds);
            timerMinutes.textContent = addZero(timer.minutes);
            timerHours.textContent = addZero(timer.hours);
        };
        updateClock();
        setInterval(updateClock, 1000);
    };

    function addZero(number){
        return +number < 10 ? ('0' + number) : number;
    }

    countTimer('28 Feb 2021');

    const toggleMenu = () => {
        const menuBtn = document.querySelector('.menu');
        const closeBtn = document.querySelector('.close-btn');
        const menu = document.querySelector('menu');
        const menuItems = menu.querySelectorAll('ul>li');
        const menuHandler = () => {
            menu.classList.toggle('active-menu');
        };

        menuBtn.addEventListener('click', menuHandler);
        closeBtn.addEventListener('click', menuHandler);
        menuItems.forEach((element) => {
           element.addEventListener('click', menuHandler);
        });
    };
    toggleMenu();

    const togglePopup = () => {
        let popupBtn = document.querySelectorAll('.popup-btn');
        let popup = document.querySelector('.popup');
        let popupContent = document.querySelector('.popup-content');
        let popupClose = document.querySelector('.popup-close');

        popupBtn.forEach((elem) => {
           elem.addEventListener('click', () => {
             popupShow();
           });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        let popupShow = () => {
            let ID;
            if (document.documentElement.clientWidth > 768){
                popup.style.display = 'block';
                popupContent.style.transform = `scale(0,0) translateX(-50px) rotate(-90deg)`;
                let start = performance.now();
                let duration = 120;
                let progress = 0;
                let popupAnimate = () => {
                    let now = performance.now();
                    progress = (now - start)/duration;
                    let deg = 90 - 90 * progress;
                    if(progress <= 1){
                        if(progress > 1){
                            progress = 1;
                        }
                        popupContent.style.transform = `scale(${progress}) translateX(-50px) rotate(-${deg}deg)`;
                        ID = requestAnimationFrame(popupAnimate);
                    } else {
                        popupContent.style.transform = `scale(1, 1) translateX(-50px) rotate(0deg)`;
                        cancelAnimationFrame(ID);
                    }
                };
                popupAnimate();
            } else {
                popup.style.display = 'block';
            }


        };
    };
    togglePopup();
    //добавление планых прокруток к элементам
    const addScrollToElements = () => {
        const serviceBlock = document.querySelector('.service');//блок услуги
        const serviceBlockAnchor = document.querySelector('a[href="#service-block"]');//ссылка на блок услуги
        const menu = document.querySelector('menu');//меню
        const menuItems = menu.querySelectorAll('ul>li');//пункты меню
        /**
         * Функция плавного скролла до элемента, чистая, работает как вверх, так и вниз (писал сам)))
         * @param element - ссылка на элемент
         * @param duration - продолжительность скролла в мс
         */
        const scrollToElement = (element, duration) => {
            let Id; //id анимации
            let start = performance.now();  //время старта
            let topPosition = element.getBoundingClientRect().top; //текущая позиция элемента
            let currentDocumentPosition = document.documentElement.scrollTop;//текущая прокрутка документа
            let progress = 0;           //прогресс анимации
            let animateScroll = () => {
                let now = performance.now();    //текущее время
                progress = (now - start)/duration;  //вычисляем прогресс
                if(progress <= 1){
                    document.documentElement.scrollTop = currentDocumentPosition + topPosition*progress;
                    Id = requestAnimationFrame(animateScroll);
                } else {
                    document.documentElement.scrollTop= currentDocumentPosition + topPosition;
                    cancelAnimationFrame(Id);
                }
            };
            animateScroll();
        };
        //добавляем скроллы на ссылку
        serviceBlockAnchor.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement(serviceBlock, 200);
        });
        //добавляем плавные скроллы на меню
        menuItems.forEach((element) => {
            let targetElementName = element.querySelector('a').getAttribute('href').slice(1);
            let targetElement = document.getElementById(targetElementName);

            element.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToElement(targetElement, 200);
            });
        });
    };
    addScrollToElements();















});