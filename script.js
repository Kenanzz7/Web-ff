const timeEl=document.getElementById('time');
const timezoneEl=document.getElementById('timezone');
const locationEl=document.getElementById('location');
const greetingText=document.getElementById('greeting-text');
const greetingIcon=document.getElementById('greeting-icon');
const body=document.body;
const quoteText=document.getElementById('quote-text');
const quoteAuthor=document.getElementById('quote-author');
const refreshQuoteBtn=document.getElementById('refresh-quote');
const toggleBtn=document.getElementById('toggle-btn');
const btnText=document.getElementById('btn-text');
const detailsPanel=document.getElementById('details');
async function fetchQuote() {
  try {
    const response=await fetch('https://dummyjson.com/quotes/random');
    const data=await response.json();
    quoteText.textContent=`"${data.quote}"`;
    quoteAuthor.textContent=data.author;
  } catch (error) {
    quoteText.textContent=`"First, solve the problem. Then, write the code."`;
    quoteAuthor.textContent="John Johnson";
  }
}
async function fetchTimeData() {
    try {
      const response=await fetch('http://worldtimeapi.org/api/ip');
      if (!response.ok) throw new Error("API cavab vermir");
      const data = await response.json();
      document.getElementById('detail-timezone').textContent=data.timezone;
      document.getElementById('detail-day-year').textContent=data.day_of_year;
      document.getElementById('detail-day-week').textContent=data.day_of_week;
      document.getElementById('detail-week-num').textContent=data.week_number;
      timezoneEl.textContent = data.abbreviation;
    } catch (error) {
      console.log("API bloklandı. B planı işə düşür...");
      const now=new Date();
      document.getElementById('detail-timezone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
       let dayOfWeek=now.getDay();
      document.getElementById('detail-day-week').textContent=dayOfWeek===0 ? 7 : dayOfWeek;
      const start=new Date(now.getFullYear(), 0, 0);
      const diff=(now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
      const dayOfYear=Math.floor(diff / (1000 * 60 * 60 * 24));
      document.getElementById('detail-day-year').textContent = dayOfYear;
      const weekNum=Math.ceil(dayOfYear / 7);
      document.getElementById('detail-week-num').textContent=weekNum; 
         timezoneEl.textContent="AZT";
    }
  }
async function fetchLocationData() {
  try {
    const response=await fetch('https://ipwho.is/');
    const data=await response.json();
    if (data.city) {
      locationEl.textContent=`in ${data.city}, ${data.country_code}`;
    } else {
      throw new Error("Məkan tapılmadı");
    }
  } catch (error) {
     locationEl.textContent = "in Baku, AZ"; 
  }
}
function updateLocalTime() {
    const now =new Date();
    let hours =now.getHours();
    let minutes =now.getMinutes();
    const isMobile=window.innerWidth <= 768;
    const extraText=isMobile ? "" : ", IT'S CURRENTLY";
    if (hours >= 5 && hours < 12) {
      greetingText.textContent=`GOOD MORNING${extraText}`;
      body.className='day-bg'; 
      greetingIcon.src="assets/desktop/icon-sun.svg";
    } else if (hours >= 12 && hours < 18) {
      greetingText.textContent=`GOOD AFTERNOON${extraText}`;
      body.className='day-bg';
      greetingIcon.src="assets/desktop/icon-sun.svg";
    } else {
      greetingText.textContent=`GOOD EVENING${extraText}`;
      body.className='night-bg';
      greetingIcon.src="assets/desktop/icon-moon.svg";
    }
    hours=hours < 10 ? '0' + hours : hours;
    minutes=minutes < 10 ? '0' + minutes : minutes;
    timeEl.textContent=`${hours}:${minutes}`;
  }
  window.addEventListener('resize', updateLocalTime);
toggleBtn.addEventListener('click',()=>{
    detailsPanel.classList.toggle('open');
    body.classList.toggle('panel-open'); 
    if (detailsPanel.classList.contains('open')) {
      btnText.textContent="LESS";
      document.getElementById('arrow-icon').style.transform='rotate(180deg)';
    } else {
      btnText.textContent="MORE";
      document.getElementById('arrow-icon').style.transform='rotate(0deg)';
    }
});
refreshQuoteBtn.addEventListener('click', fetchQuote);
fetchQuote();
fetchTimeData();
fetchLocationData();
updateLocalTime();
setInterval(updateLocalTime, 1000);