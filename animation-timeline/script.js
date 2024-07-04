


var items = $('.items'),           //アイテムのコンテナ(ul)
    item = [],                     //各アイテムを代入する
    order = [],                    //各アイテムのorderプロパティ
    num = items.children().length, //アイテム数(liの数=imgの数)
    index = 0,                     //配列操作用の変数
    running = false;               //アニメーション重複を防ぐフラグ

for(var i = 0; i < num; i++){
//0 ~ 要素数までのliを格納
  item.push( items.children().eq( i ) );
//orderプロパティとpして配列にプッシュ
//order[0,1,2,3]
  order.push( i );
//各アイテムにORDERプロパティをふる
  item[i].css('order', i );
}

function slider( prev ){
//アニメーションのフラグON
  running = true;
//prevによって左右の回り方を決める。
//prev=true: leftプロパティを0にして前のスライド。
//prev=false: leftプロパティを-200%で次のスライド。
  var offset = prev ? 0 : '-200%';   

  items.animate({left: offset }, 600, 'swing', function(){
  //アニメーション後の並び替えの関数を実行
    ordering( prev );                     
  //アニメーションフラグ解除
    running = false;                     
  });
}

//アイテムの並び替え処理
function ordering( prev ){
  //prev=true: 右端のアイテムを左端に持ってくる。
  if( prev ){
    //indexが0の時、item[0]が左端にいる。アイテム数-1で配列の最大インデックスがiに代入される。
    //item[3]が右端にいるので、item[3]のorderを4減らせば、orderが-1で左端に来る。
    //indexが2のとき、index-1で逆回りになるため、index[1]がトップ。

    var i = index > 0 ? index - 1 : num - 1;
    
    
    item[i].css('order', order[i]-=num);
    index = i;

  //prev=false: 左端のアイテムを右端に持ってくる。
  } else {
    //orderプロパティ初期値0,1,2,3
    //0+numで4,5,6,7,8,9,10と1ずつ増えていく
    item[index].css('order', order[index]+=num);
    //indexが、配列のインデックス以上になると(最後尾のスライドになると)、indexに0を代入して、最初のスライドに戻す。
    index = index < num - 1 ? index + 1 : 0;
    
  }
  items.css('left','-100%');
}

var setSlider = setInterval( slider, 1000);


if('ontouchstart' in window){
  // flick
  //ボタンを中身の含めて丸ごと削除
  $('.buttons').remove();
  var startX,
      endX;
  $('.slider').on('touchstart', function(e){
    startX = e.originalEvent.changedTouches[0].pageX;
    endX = startX;
  }).on('touchmove', function(e){
    endX = e.originalEvent.changedTouches[0].pageX;
  }).on('touchend', function(e){
    var difX = endX - startX;
    if( Math.abs(difX) > 100 ){
      if( running ) return;
      clearInterval( setSlider );
      var prev = difX > 0 ? true : false;
      slider(prev);
    }
  });
}else{
  // click
  $('.button').on('click', function(){
    if( running ) return;
    clearInterval( setSlider );

    //$('.button')にクラスprevが付いてたら、prev変数はtrueで逆回しになる。
    var prev = $(this).is('.prev') ? true : false;
    slider( prev );
  });
}


  
