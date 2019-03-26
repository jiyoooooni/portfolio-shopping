const bannerMap = {
    0: {
        title: '아트윈도<br/>베스트',
        desc: '국내외 유명작가<br/>사진 쇼핑!'
    },
    1: {
        title: '아트윈도<br/>베스트',
        desc: '아트를 쉽고<br/>편하게 갖는 법'
    },
    2: {
        title: '화제작가<br/>베스트',
        desc: '슈퍼픽션<br/>그림에서 굿즈까지'
    }, 
    3: {
        title: '아트윈도<br/>베스트',
        desc: '그림으로~<br/>트렌디한 내 방'
    }
};

const bannerFlicking = new eg.Flicking("#banner-flicking-wrap", {
    duration: 300,
    circular: true,
    defaultIndex: 0,
    previewPadding: [139, 139]
}).on('flickEnd', function (e) {
    const {title, desc} = bannerMap[e.no];

    $('#banner_title').html(title);
    $('#banner_desc').html(desc);
});

$('#btn_prev_banner').on('click', function (e) {
    bannerFlicking.prev();
});

$('#btn_next_banner').on('click', function (e) {
    bannerFlicking.next();
});