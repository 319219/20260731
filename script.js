// 1. 自動輪播與手動切換
const track = document.querySelector('.carousel-track');
if (track) {
    let timer, w = () => track.querySelector('.slide')?.clientWidth || track.clientWidth;
    const move = (dir) => {
        if (dir === 'next' && track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) track.scrollTo({ left: 0, behavior: 'smooth' });
        else if (dir === 'prev' && track.scrollLeft <= 5) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        else track.scrollBy({ left: dir === 'next' ? w() : -w(), behavior: 'smooth' });
    };
    const resetTimer = () => (clearInterval(timer), timer = setInterval(() => move('next'), 5000));

    track.addEventListener('click', (e) => {
        const btn = e.target.closest('.carousel-btn');
        if (btn) {
            e.preventDefault();
            move(btn.classList.contains('prev') ? 'prev' : 'next');
            resetTimer();
        }
    });
    resetTimer();
}

// 2. 選單與無障礙字型
document.getElementById('mobile-menu')?.addEventListener('click', () => 
    document.getElementById('nav-links')?.classList.toggle('active')
);

function changeFontSize(size, btn) {
    document.body.className = `font-${size}`;
    document.querySelectorAll('.accessibility-bar .font-btn').forEach(b => b.classList.remove('active'));
    btn?.classList.add('active');
}

// 3. 活動報名表單
function handleRegistration(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const eventName = document.getElementById('reg-event').value;
    alert(`感謝 ${name} 的報名！我們已收到對「${eventName}」的預約，專人將於 3 個工作天內聯繫您。`);
    e.target.reset();
}

// 4. 線上客服機器人
const ans = ["🚀 您的問題無法馬上解決，請聯絡我們的電話 02-1234-5678", "📞 該問題無法解決，請直接撥打 02-1234-5678 與我們聯絡！"];
const aWindow = () => document.getElementById('w')?.classList.toggle('active');

function send() {
    const input = document.getElementById('i');
    const msgBox = document.getElementById('m');
    const txt = input?.value.trim();
    if (!txt) return;
    
    input.value = '';
    msgBox.innerHTML += `<div class="u">${txt}</div>`;
    msgBox.scrollTop = msgBox.scrollHeight;

    setTimeout(() => {
        msgBox.innerHTML += `<div class="b">${ans[Math.floor(Math.random() * ans.length)]}</div>`;
        msgBox.scrollTop = msgBox.scrollHeight;
    }, 200);
}