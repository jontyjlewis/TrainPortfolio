function addFollowText(n,i,t,e,o){n.setFromMatrixPosition(t.matrixWorld),n.project(e);var l=window.innerWidth/2,d=window.innerHeight/2;o.getBoundingClientRect();n.x=n.x*l+l,n.y=n.y*window.innerHeight/2+(1.6+.3/594*(1080-window.innerHeight))*d,i.style.top=`${n.y}px`,i.style.left=`${n.x}px`}function showText(n){n.style.display="inline-block"}function hideText(n){n.style.display="none"}function isOn(n){return"none"!=n.style.display}
//# sourceMappingURL=index.c3f755f2.js.map