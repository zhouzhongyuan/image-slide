/**
 * Created by bokeadmin on 16/4/19.
 */
//接受参数 url imageUrl time
function addSlide(data,time){
    var slide = $('#slide');
    var tempFn = doT.template('{{~it :value:index}}\
        <li class="list-item {{? index===0}}active{{?}}">\
            <a href="{{=value.url}}" title="" target="_blank"><img src="{{=value.imageUrl}}"></a>\
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
        slideItl = setInterval(onNext,2*1000);
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

};
function onPrev(){
    var slide = $('#slide');
    var curLi = slide.find('li.active');
    var nextLi = $(curLi).prev('li');
    if(!nextLi.length){
        nextLi = $(slide.find('li')).last();
    }
    curLi.toggleClass('active');
    nextLi.toggleClass('active');

};
function onNext(e){
    var slide = $('#slide');
    var curLi = slide.find('li.active');
    var nextLi = $(curLi).next('li');
    if(!nextLi.length){
        nextLi = $(slide.find('li')).first();
    }
    curLi.toggleClass('active');
    nextLi.toggleClass('active');
};
function addBmNav(){
};
function addHorNav(){

};

var data =[
    {url:'https://promo.lu.com/activity-pages/aqlc-20160405/index.html',imageUrl:'https://static.lufaxcdn.com/wcm-images/QbyJQayiUMHLV_6CtfRfqg.jpg'},
    {url:'https://list.lu.com/insurance/product/29837702/detail',imageUrl:'https://static.lufaxcdn.com/wcm-images/8YqJG8M7xdhlUwHHozoPNw.jpg'},
    {url:'https://list.lu.com/list/dingqi?minMoney=&amp;maxMoney=&amp;minDays=&amp;maxDays=&amp;minRate=&amp;maxRate=&amp;mode=&amp;isCx=&amp;currentPage=1&amp;orderCondition=&amp;isShared=&amp;canRealized=&amp;productCategoryEnum=HUIFU',imageUrl:'https://static.lufaxcdn.com/wcm-images/coAV-JkBHbnTgNDkuYC5Aw.jpg'},
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