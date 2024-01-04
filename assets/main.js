var currentIndex = 0;
var heading = document.querySelector('header h2');
var cdThumb = document.querySelector('.cd-thumb');
var audio = document.querySelector('#audio');
var cd = document.querySelector('.cd');
var btnPlay = document.querySelector('.btn-toggle-play');
var player = document.querySelector('.player');
var isPlaying = false;
var progress = document.querySelector('#progress');
var btnNext = document.querySelector('.btn-next');
var btnPrev = document.querySelector('.btn-prev');
var btnRandom = document.querySelector('.btn-random');
var isRandom = false;
var btnRepeat = document.querySelector('.btn-repeat');
var isRepeat = false;
var playlist = document.querySelector('.playlist');

var songs = [
    {
        name: 'On The Ground',
        singer: 'ROSÉ',
        path: './assets/music/OnTheGround.mp3',
        image: 'https://avatar-ex-swe.nixcdn.com/song/2021/03/12/e/2/9/e/1615525268442_500.jpg'
    },
    {
        name: 'Lalisa',
        singer: 'LISA',
        path: './assets/music/Lalisa.mp3',
        image: 'https://avatar-ex-swe.nixcdn.com/song/2021/09/10/2/9/e/9/1631247429446_500.jpg'
    },
    {
        name: 'Typa Girl',
        singer: 'BLACKPINK',
        path: './assets/music/TypaGirl.mp3',
        image: 'https://avatar-ex-swe.nixcdn.com/song/2022/09/16/0/2/1/c/1663301917984_500.jpg'
    },
    {
        name: 'Money',
        singer: 'LISA',
        path: './assets/music/Money.mp3',
        image: 'https://tanluc1200.github.io/Player_Music/img/money.jpeg'
    },
    
    {
        name: 'Flower',
        singer: 'JISOO',
        path: './assets/music/Flower.mp3',
        image: 'https://avatar-ex-swe.nixcdn.com/song/2023/03/31/4/b/6/5/1680235062583_500.jpg'
    },
    {
        name: 'Pretty Savage',
        singer: 'LISA',
        path: './assets/music/PrettySavage.mp3',
        image: 'https://avatar-ex-swe.nixcdn.com/song/2020/10/02/a/e/7/c/1601612216739_500.jpg'
    },
    {
        name: 'Solo',
        singer: 'JENNIE',
        path: './assets/music/Solo.mp3',
        image: 'https://avatar-ex-swe.nixcdn.com/song/2018/11/12/7/f/3/1/1542015331222_500.jpg'
    },
    {
        name: 'Thích Hay Là Yêu Còn Chưa Biết',
        singer:'LONA, Ricky Star',
        path: './assets/music/ThichHayLaYeuConChuaBiet.mp3',
        image: 'https://avatar-ex-swe.nixcdn.com/song/2022/03/25/1/b/3/0/1648218092020_500.jpg'
    },
    {
        name: 'Đế Vương',
        singer: 'DungHoangPham',
        path: './assets/music/DeVuong.mp3',
        image: 'https://tse4.mm.bing.net/th?id=OIP.pHjPqR7bSAGM2UbI3drg6wHaHa&pid=Api&P=0'
    },
    {
        name: 'Cô Đơn Trên Sofa',
        singer: 'Hồ Ngọc Hà',
        path: './assets/music/CoDonTrenSofa.mp3',
        image: 'https://avatar-ex-swe.nixcdn.com/song/2022/10/19/7/1/f/4/1666185034236_500.jpg'
    },
    {
        name: 'Thuyền Quyên',
        singer: 'Diệu Kiên',
        path: './assets/music/ThuyenQuyen.mp3',
        image: 'http://avatar.nct.nixcdn.com/song/2023/01/05/c/a/8/d/1672900678048.jpg'
    },
    {
        name: 'Xem Như Em Chẳng May',
        singer: 'DungHoangPham',
        path: './assets/music/XemNhuEmChangMay.mp3',
        image: 'https://tse1.mm.bing.net/th?id=OIP.2sFVZztrSjBu2TCl6bP4QwAAAA&pid=Api&P=0'
    },
    {
        name: 'Ai Chung Tình Được Mãi',
        singer: 'Thương Võ',
        path: './assets/music/AiChungTinhDuocMai.mp3',
        image: 'https://tse1.mm.bing.net/th?id=OIP.Gywj0hSy69ZidB86fsLggAHaEK&pid=Api&P=0'
    },
    {
        name: 'Mật Ngọt',
        singer: 'DungHoangPham',
        path: './assets/music/MatNgot.mp3',
        image: 'https://tse3.mm.bing.net/th?id=OIF.Ek5zkLdtlr%2buWz2j8wdoRw&pid=Api&P=0'
    },
    {
        name: 'Cho Em Một Lần Yêu',
        singer: 'Đông Nhi',
        path: './assets/music/ChoEmMotLanYeu.mp3',
        image: 'https://tse3.mm.bing.net/th?id=OIP.WvEv65C5FaHjI0a6UJlcIQAAAA&pid=Api&P=0'
    }


]

function start() {
    
    //định nghĩa các thuộc tính cho object
    defineProperties();
    //lắng nghe/xử lý các sự kiện(DOM events)
    handleEvents();
    //tải thông tin bài hát đầu tiên vào UI khi chạy app
    loadCurrentSong();

    //hiện thị playlist
    render();
}
start();
function defineProperties() {
    Object.defineProperty(songs, 'currentSong', {//định nghĩa thuộc tính mới oặc cập nhập thuộc tính có sẵn trên object
        get: function () {
            return songs[currentIndex];
        }
    })
}
function render() {
    
    var htmls = songs.map(function (song, index) {
        return `
            <div class="song ${index===currentIndex ?'active':''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
        `
    });
    playlist.innerHTML = htmls.join('');
}
function handleEvents() {
    var cdWidth = cd.offsetWidth;

    //Xử lý cd quay/dừng
    var cdThumbAnimate = cdThumb.animate([
        {transform: 'rotate(360deg)'}
    ],{
        duration: 10000, //quay 1 vòng hết 10 giây
        iterations: Infinity //quay vô hạn
    })
    cdThumbAnimate.pause();

    //xử lý phong to/ thu nhỏ cd
    document.onscroll = function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var newWidth = cdWidth - scrollTop;
        if (newWidth > 0) {
            cd.style.width = newWidth + 'px';

        } else {
            newWidth = 0;
            cd.style.width = newWidth + 'px';
        }
        cd.style.opacity = newWidth / cdWidth; //opacity chạy từ 0 -> 1
    }

    //xử lý khi click play
    btnPlay.onclick = function () {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        render();
    }

    //khi song được play 
    audio.onplay = function(){
        isPlaying = true;
        player.classList.add('playing');
        cdThumbAnimate.play();
    }
     //khi song bị pause 
     audio.onpause = function(){
        isPlaying = false;
        player.classList.remove('playing');
        cdThumbAnimate.pause();
    }
    //khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function(){
        if(audio.duration){
            var progressPersent = Math.floor(
                audio.currentTime/audio.duration*100);
            progress.value = progressPersent;
        }
    }

    //xử lý khi tua song
    progress.onchange = function(e){
        var seekTime = Math.floor(audio.duration*e.target.value/100);
        audio.currentTime = seekTime;
    }

    //xử lý khi next song
    btnNext.onclick = function(){
        if(isRandom){
            randomSong();
        }else{
            nextSong()
        }
        audio.play()
        render();
        scrollToActive();
    }
    //xử lý khi prev song
    btnPrev.onclick = function(){
        if(isRandom){
            randomSong();
        }else{
            prevSong()
        }
        audio.play();
        render();
        scrollToActive();
    }
    //xử lý khi random song
    btnRandom.onclick = function(){
        isRandom = !isRandom; //luôn gán true false cho nhau
        btnRandom.classList.toggle('active',isRandom);
        
    }
    //xử lý khi kết thúc bài
    audio.onended = function(){
        if(isRepeat){
            audio.play();
        }else{
            btnNext.click() //giống như việc tự bấm vào nút next
        }
    }
    //xử lý khi repeat 
    btnRepeat.onclick = function(){
        isRepeat = !isRepeat;
        btnRepeat.classList.toggle('active', isRepeat);
    }
    //lắng nghe hành vi click vào playlist
    playlist.onclick = function(e){
        var songNode = e.target.closest('.song:not(.active)')
        //closest trả về element con của nó or cha của nó
        if(songNode || e.target.closest('.option')){
            //xử lý khi click vào song
            if(songNode){
                currentIndex = Number(songNode.dataset.index)
                loadCurrentSong()
                render()
                audio.play()
            }
            //xử lý khi click vào song option
            if(e.target.closest('.option')){

            }
        }
    }
}
function loadCurrentSong() {
    heading.textContent = songs.currentSong.name;
    cdThumb.style.backgroundImage = `url(${songs.currentSong.image})`;
    audio.src = songs.currentSong.path;
}
function nextSong(){
    currentIndex++;
    if(currentIndex >= songs.length){
        currentIndex = 0;
    }
    loadCurrentSong();
}
 function prevSong(){
    currentIndex --;
    if(currentIndex <= 0){
        currentIndex = songs.length-1;
    }
    loadCurrentSong();
 }
 function randomSong(){
    var newIndex;
    do{
        newIndex = Math.floor(Math.random() * songs.length);

    }while(newIndex === currentIndex);

    currentIndex = newIndex;
    loadCurrentSong();
 }
 function scrollToActive(){
    setTimeout(function(){
        document.querySelector('.song.active').scrollIntoView({
             behavior: "smooth", 
             block: "center", 
             inline: "center" });
    },300)
 }

 