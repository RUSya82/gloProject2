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
        let menuBtn = document.querySelector('.menu');
        let closeBtn = document.querySelector('.close-btn');
        let menu = document.querySelector('menu');
        let menuItems = menu.querySelectorAll('ul>li');
        console.log(menuItems);
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
                popupContent.style.top = '-100%';
                popupAnimate();
            } else {
                popup.style.display = 'block';
            }
            function popupAnimate() {
                ID = requestAnimationFrame(popupAnimate);
                popup.style.display = 'block';
                let currentTop = parseInt(getComputedStyle(popupContent).top);
                if(currentTop < 10){
                    popupContent.style.top = `${currentTop + 1}%`;
                } else {
                    cancelAnimationFrame(ID);
                }
            }

        };
    };
    togglePopup();









});