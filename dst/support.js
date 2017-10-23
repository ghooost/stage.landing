var Scroll=function(){
  function _init(o){
    var s=o.parentNode;
    var ret={
      obj:s,
      container:s.querySelector(".container"),
      curPage:s.attributes['data-page']?parseInt(s.attributes['data-page'].value):0
    };
    var nodes=s.querySelectorAll('.container > .page');

    var cMin=nodes[0].offsetLeft;
    var cMax=nodes[0].offsetLeft;
    for(var cnt=0,m=nodes.length;cnt<m;cnt++){
      if(nodes[cnt].offsetLeft<=cMin){
        ret.firstPage=nodes[cnt];
        cMin=nodes[cnt].offsetLeft;
      };
      if(nodes[cnt].offsetLeft>=cMax){
        ret.lastPage=nodes[cnt];
        cMax=nodes[cnt].offsetLeft;
      };
    }
    return ret;
  }

  function _prev(o){
    var sc=_init(o);
    sc.curPage++;
    sc.obj.setAttribute('data-page',sc.curPage);
    var pos=sc.obj.offsetWidth*sc.curPage;
    sc.container.style.left=pos+"px";
    if(sc.firstPage.offsetLeft>-pos){
        sc.container.insertBefore(sc.lastPage,sc.firstPage);
        sc.lastPage.style.left=-pos+"px";
    }
  }
  function _next(o){
    var sc=_init(o);
    sc.curPage--;
    sc.obj.setAttribute('data-page',sc.curPage);
    var pos=sc.obj.offsetWidth*sc.curPage;
    sc.container.style.left=pos+"px";
    if(sc.lastPage.offsetLeft<-pos){
        sc.container.appendChild(sc.firstPage);
        sc.firstPage.style.left=-pos+"px";
    }
  }
  return {
    prev:_prev,
    next:_next
  }
}();

var Switcher=function(){
  function _init(o){
    var obj=o.parentNode;
    while(obj){
      if(obj.tagName=='div' || obj.tagName=='DIV'){
        break;
      };
      obj=obj.parentNode;
    };
    return {
      obj:obj,
      opened:obj.querySelector('.opened'),
      content:obj.querySelector('.opened > div')
    }
  }
  function _change(o){
    var sc=_init(o);
    if(sc.obj.attributes["data-opened"]){
      sc.opened.style.height="0px";
      sc.obj.removeAttribute("data-opened");
    } else {
      sc.opened.style.height=sc.content.offsetHeight+"px";
      sc.obj.setAttribute("data-opened",1);
    };
  }
  return {
    change:_change
  }
}();
