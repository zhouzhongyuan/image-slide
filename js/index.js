/**
 * Created by bokeadmin on 16/4/19.
 */
//接受参数 url imageUrl time
function addSlide(data,time){
    var slide = $('#slide');
    var tempFn = doT.template('{{~it :value:index}}\
        <li class="list-item {{? index===0}}active{{?}}"  data-sk="banner{{=index}}">\
            <a href="{{=value.url}}" alt="logo" target="_blank"><img src="{{=value.imageUrl}}"></a>\
        </li>\
        {{~}}');
    var result = tempFn(data);
    slide.html(result);
    var prev = $('.flex-prev');
    var next = $('.flex-next');
    prev.on("click",onPrev);
    next.on("click",onNext);
    var slideItl;
    slideItl= setInterval(onNext,5*1000);
    slide.mouseover(function(){
        console.log('hover');
        clearInterval(slideItl);
    });
    slide.mouseout(function(){
        console.log('out');
        slideItl = setInterval(onNext,5*1000);
    });
    //移动端事件
    var slideNew = document.getElementById('slide');
    var hammertime = new Hammer(slideNew);
    hammertime.on('swiperight swipeleft', function(ev) {
        var type = ev.type;
        switch (type){
            case 'swipeleft':
                onNext();
                break;
            case 'swiperight':
                onPrev();
                break;
            default:
                console.log(type);
        };
    });
    addBmNav(data);
};
function onPrev(e){
    
    var slide = $('#slide');
    var curLi = slide.find('li.active');
    var nextLi = $(curLi).prev('li');
    if(!nextLi.length){
        nextLi = $(slide.find('li')).last();
    }
    curLi.toggleClass('active');
    nextLi.toggleClass('active');
    //底部切换
    var curSk = $(curLi).attr('data-sk');
    var curNum = curSk.slice(-1);
    curNum = parseInt(curNum,10);
    var bottomNavA = $('.bottom-nav a');
    var prevNum = curNum-1;
    if(prevNum<0){
        prevNum = bottomNavA.length -1 ;
    }
    console.log(curNum,prevNum);
    $(bottomNavA[curNum]).removeClass('active');
    $(bottomNavA[prevNum]).addClass('active');
};
function onNext(e){
    //底部切换
    var slide = $('#slide');
    var curLi = slide.find('li.active');
    var nextLi = $(curLi).next('li');
    if(!nextLi.length){
        nextLi = $(slide.find('li')).first();
    }
    curLi.toggleClass('active');
    nextLi.toggleClass('active');
        //底部切换
    var curSk = $(curLi).attr('data-sk');
    var curNum = curSk.slice(-1);
    curNum = parseInt(curNum,10);
    var bottomNavA = $('.bottom-nav a');
    var nextNum = curNum+1;
    if(nextNum>bottomNavA.length-1){
        nextNum = 0 ;
    }
    console.log(curNum,nextNum);
    $(bottomNavA[curNum]).removeClass('active');
    $(bottomNavA[nextNum]).addClass('active');
};
function addBmNav(data){
    var bottomNav = $('.bottom-nav');
    var num = data.length;
    var tempFn = doT.template('{{~it :value:index}}<li><a class="{{? index===0}}active{{?}}" data-sk="bn{{=index}}">•</a></li>{{~}}');
    var result = tempFn(data);
    bottomNav.html(result);
    var bottomNavA = $('.bottom-nav a');
    bottomNavA.click(goto);
    // bottomNavA.hover(goto);
};
function goto(e){
    var curA = $(e.target).attr('data-sk');
    curA = curA.slice(-1);
    curA = parseInt(curA,10);
    console.log(curA);
    
    //bottom
    var bottomNavA = $('.bottom-nav a');
    bottomNavA.removeClass('active');
    $(bottomNavA[curA]).addClass('active');
    //img
    var slide = $('#slide li');
    slide.removeClass('active');
    $(slide[curA]).addClass('active');
    // nextLi.toggleClass('active');
};
function addHorNav(){

};

var data =[
    {url:'https://promo.lu.com/activity-pages/aqlc-20160405/index.html',imageUrl:'img/1.jpg'},
    {url:'#',imageUrl:'img/2.jpg'},
    {url:'#',imageUrl:'img/3.jpg'},
    {url:'#',imageUrl:'img/3.jpg'},
    {url:'#',imageUrl:'img/3.jpg'},
    ];
addSlide(data);


/*
* 1.IE8 测试
* 2.移动端测试
* 3.效率问题测试
* 4.加载速度,首个图片加载速度
* 5.onload
* 6.UA
* 7.防止点击两次问题
* */

/*改进:
* 移动版
*
*
* */
//TODO setInterval