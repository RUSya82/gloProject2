document.addEventListener('DOMContentLoaded', () => {
    const dayPart = document.querySelector('.day-part');
    const dayWeek = document.querySelector('.day-week');
    const time = document.querySelector('.time');
    const toNY = document.querySelector('.to-ny');

    const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    let date = new Date();
    let partOfDay = getPartOfDay(date);
    let dayOfWeek = daysOfWeek[date.getDay()];
    let timeString = `${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}
     ${date.getHours() >= 12 ? 'PM' : 'AM'}`;

    let NY = new Date(date.getFullYear() + 1, 0, 1);
    let daysToNY = Math.floor((NY - date)/1000/60/60/24);
    dayPart.textContent = partOfDay;
    dayWeek.textContent = dayOfWeek;
    time.textContent = timeString;
    toNY.textContent = daysToNY;



    function getPartOfDay(date) {
        let hour = date.getHours();
        if(hour > 0 && hour < 6){
            return 'ночь';
        } else if (hour >= 6 && hour < 12){
            return "утро";
        } else if (hour >= 12 && hour < 18){
            return "день";
        }
        return "вечер";
    }
    function addZero(number){
        return +number < 10 ? ('0' + number) : number;
    }
});