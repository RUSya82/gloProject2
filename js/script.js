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
            if (dateDiff > 0) {
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

    function addZero(number) {
        return +number < 10 ? ('0' + number) : number;
    }
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
            progress = (now - start) / duration;  //вычисляем прогресс
            if (progress <= 1) {
                document.documentElement.scrollTop = currentDocumentPosition + topPosition * progress;
                Id = requestAnimationFrame(animateScroll);
            } else {
                document.documentElement.scrollTop = currentDocumentPosition + topPosition;
                cancelAnimationFrame(Id);
            }
        };
        animateScroll();
    };

    countTimer('28 Feb 2021');

    const toggleMenu = () => {
        const menu = document.querySelector('menu');
        const menuItems = menu.querySelectorAll('ul>li');
        //соберем Nodelist в массив, чтобы пользоваться функциями
        let menuItemsArr = [...menuItems];

        const menuHandler = () => {
            menu.classList.toggle('active-menu');
        };
        //клики по документу
        document.body.addEventListener('click', (e) => {
            let target = e.target;
            //если меню активно и кликнули не по нему
            if (!target.closest('menu') && menu.classList.contains('active-menu')) {
                menuHandler();
            }
            //если нажали по кнопке меню
            if (target.closest('.menu')) {
                menuHandler();
            }
            if (target.classList.contains('close-btn')) {
                menuHandler();
            }
            let li = target.closest('li');
            //если li есть в машем массиве
            if (menuItemsArr.indexOf(li) !== -1) {
                e.preventDefault();
                //берем название целевого элемента
                let targetElementName = li.querySelector('a').getAttribute('href').slice(1);
                let targetElement = document.getElementById(targetElementName);
                scrollToElement(targetElement, 200);//плавный скролл до него
                menuHandler();//закрываем меню
            }
        });
    };
    toggleMenu();

    const togglePopup = () => {
        let popupBtn = document.querySelectorAll('.popup-btn');
        let popup = document.querySelector('.popup');
        let popupContent = document.querySelector('.popup-content');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popupShow();
            });
        });

        popup.addEventListener('click', (e) => {
            let target = e.target;
            //клик по кнопке закрыть
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            }
            //при клике вне модалки - закрываем
            if (!target.closest('.popup-content')) {
                popup.style.display = 'none';
            }
        });

        let popupShow = () => {
            let ID;
            if (document.documentElement.clientWidth > 768) {
                popup.style.display = 'block';
                popupContent.style.transform = `scale(0,0) translateX(-50px) rotate(-90deg)`;
                let start = performance.now();
                let duration = 120;
                let progress = 0;
                let popupAnimate = () => {
                    let now = performance.now();
                    progress = (now - start) / duration;
                    let deg = 90 - 90 * progress;
                    if (progress <= 1) {
                        if (progress > 1) {
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

    //добавление плавных прокруток к элементам
    const addScrollToElements = () => {
        const serviceBlock = document.querySelector('.service');//блок услуги
        const serviceBlockAnchor = document.querySelector('a[href="#service-block"]');//ссылка на блок услуги
        //добавляем скроллы на ссылку
        serviceBlockAnchor.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement(serviceBlock, 200);
        });
    };
    addScrollToElements();

    const serviceTabs = () => {
        const serviceHeader = document.querySelector('.service-header');
        const serviceHeaderTabs = document.querySelectorAll('.service-header-tab');
        const serviceTab = document.querySelectorAll('.service-tab');

        serviceHeader.addEventListener('click', (e) => {
            let target = e.target.closest('.service-header-tab');
            if (target) {
                serviceHeaderTabs.forEach((item, i) => {
                    if (item === target) {
                        console.log(serviceTab[i]);
                        serviceTab[i].classList.remove('d-none');
                        item.classList.add('active');
                    } else {
                        serviceTab[i].classList.add('d-none');
                        item.classList.remove('active');
                    }
                });
            }
        });
    };
    serviceTabs();

    /**
     * Запуск и инициализация слайдера
     * @param interval
     */
    const slider = (interval) => {
        const slider = document.querySelector('.portfolio-content');//сам слайдер
        const slides = document.querySelectorAll('.portfolio-item');//слайды
        const dotsContainer = document.querySelector('.portfolio-dots');//контейнер для точек
        let dots = [];              //массив с будущими точками
        let currentSlide = 0;       //текущий слайд
        let intervalID;     //id для setInterval
        /**
         * Добавление точек
         */
        const addDots = () => {
            for(let i = 0; i < slides.length; i++){
                let dot = document.createElement('li');
                dot.classList.add('dot');
                if(i === 0){
                    dot.classList.add('dot-active');
                }
                dots.push(dot);
                dotsContainer.append(dot);
            }

        };
        addDots();
        /**
         * проверка номера текущего слайда, если что не так, корректирует
         */
        const checkSlideNumber = () => {
          if(currentSlide < 0){
              currentSlide = slides.length - 1;
          } else if(currentSlide >= slides.length){
              currentSlide = 0;
          }
        };
        /**
         * Переход на следующий слайд
         * @param next - если true, то следующий, false - предыдущий
         */
        const clickNextSlide = (next = true) =>{
            slides[currentSlide].classList.remove('portfolio-item-active');
            dots[currentSlide].classList.remove('dot-active');
            if (next){
                currentSlide++;
            } else {
                currentSlide--;
            }
            checkSlideNumber();
            slides[currentSlide].classList.add('portfolio-item-active');
            dots[currentSlide].classList.add('dot-active');
        };
        /**
         * Запуск слайдера в автоплей
         */
        const playSlider = () => {
            intervalID = setInterval(clickNextSlide, interval, true);
        };
        /**
         * Остановка слайдера
         */
        const stopSlider = () => {
            clearInterval(intervalID);
        };
        playSlider();
        /**
         * клики через делегирование
         */
        slider.addEventListener('click', (e) => {
            e.preventDefault();
            let target = e.target;
            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }
            //клики по кнопкам
            if(target.matches('#arrow-right')){
                clickNextSlide(true);
            } else if(target.matches('#arrow-left')){
                clickNextSlide(false);
            } else if(target.matches('.dot')){          //клики по точкам
                slides[currentSlide].classList.remove('portfolio-item-active');
                dots[currentSlide].classList.remove('dot-active');
                currentSlide = dots.indexOf(target);
                slides[currentSlide].classList.add('portfolio-item-active');
                dots[currentSlide].classList.add('dot-active');
            }
        });
        //остановка слайдера при наведении на точки и стрелки
        slider.addEventListener('mouseover', (e) => {
            let target = e.target;
            if(target.matches('.portfolio-btn') || target.matches('.dot')){
                stopSlider();
            }
        });
        //запуск слайдера после того, как мышку убрали с точек и стрелок
        slider.addEventListener('mouseout', (e) => {
            let target = e.target;
            if(target.matches('.portfolio-btn') || target.matches('.dot')){
                playSlider();
            }
        });

    };

    slider(3000);

});