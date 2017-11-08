var Scroll=function(){

  function _addGestures(nodes){
    for(var cnt=0,m=nodes.length;cnt<m;cnt++){
      nodes[cnt].addEventListener('touchmove',_touchmove,false);
      nodes[cnt].addEventListener('touchend',_touchend,false);
    }
  }
  function _touchmove(evt){
    var c=this.querySelector(".container");
    var x=evt.touches[0].screenX;
    if(!this.touchData){
      this.setAttribute('data-touched',1);
      this.touchData={x1:x,objx:c.offsetLeft};
    }
    var d=this.touchData;
    d.x2=x;
    c.style.left=(d.x2-d.x1+d.objx)+'px';
  }

  function _touchend(evt){
    var d=this.touchData;
    this.removeAttribute('data-touched');
    if(d && Math.abs(d.x1-d.x2)>50){
      if(d.x2>d.x1){
        _prev(this);
      } else {
        _next(this);
      };
    } else {
      var c=this.querySelector(".container");
      c.style.left=d.objx+"px";
    }
    this.touchData=null;
  }

  function _init(o){
    var s=o;
    while(s){
      if(s.className=="scroll"){
        break;
      }
      s=s.parentNode;
    }
    if(!s) return null;
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
    var pos=100*sc.curPage;
    var posLen=sc.curPage*sc.obj.offsetWidth;
    sc.container.style.left=pos+"%";
    if(sc.firstPage.offsetLeft>-posLen){
        sc.container.insertBefore(sc.lastPage,sc.firstPage);
        sc.lastPage.style.left=-pos+"%";
    }
  }
  function _next(o){
    var sc=_init(o);
    sc.curPage--;
    sc.obj.setAttribute('data-page',sc.curPage);
    var pos=100*sc.curPage;
    var posLen=sc.curPage*sc.obj.offsetWidth;
    sc.container.style.left=pos+"%";
    if(sc.lastPage.offsetLeft<-posLen){
        sc.container.appendChild(sc.firstPage);
        sc.firstPage.style.left=-pos+"%";
    }
  }

  return {
    prev:_prev,
    next:_next,
    addGestures:_addGestures
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
