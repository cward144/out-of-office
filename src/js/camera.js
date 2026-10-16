(function(root){
'use strict';
// A continuous three-band scene: extend the top edge, retain furniture, adapt the open floor.
// Logical puzzle coordinates stay unchanged; every actor and pointer uses this projection.
const artworkRatio=1672/941,worldFraction=.84375,seam=72;
// Cover mode (task 005): rooms with a tall painting are cropped to fill the screen, never stretched.
// art = {w,h,coreTop,coreHeight}: image size and where the original 16:9 room ("core") sits in it, as fractions.
// Logical coordinates stay relative to the core, so obstacles and item spots don't change. focusX pans narrow screens to Pip.
const clamp=(v,lo,hi)=>Math.min(hi,Math.max(lo,v));
function coverLayout(width,height,art,focusX){
 const s=Math.max(width/art.w,height/art.h),iw=art.w*s,ih=art.h*s,worldLeftInImg=iw*(1-worldFraction)/2,worldWidth=iw*worldFraction;
 const imgLeft=iw<=width?(width-iw)/2:clamp(width/2-(worldLeftInImg+focusX/100*worldWidth),width-iw,0);
 const coreTop=art.coreTop*ih,coreHeight=art.coreHeight*ih,imgTop=ih<=height?(height-ih)/2:clamp((height-coreHeight)/2-coreTop,height-ih,0);
 const artTop=imgTop+coreTop,architectureHeight=coreHeight*.72,floorTop=artTop+architectureHeight;
 return {width,height,top:0,artTop,artHeight:coreHeight,architectureHeight,floorTop,floorHeight:Math.max(1,height-floorTop),worldLeft:imgLeft+worldLeftInImg,worldWidth,safeBottom:floorTop+coreHeight*.28,walkFloor:coreHeight*.28,cover:true,imgLeft,imgTop,imgWidth:iw,imgHeight:ih};
}
function layout(width,height,ending=false,art=null,focusX=50){
 if(art&&!ending)return coverLayout(width,height,art,focusX);
 const compact=height<500&&width>height;
 const artTop=compact?56:width<=1100?112:64;
 const bottom=ending?Math.min(height*.42,340)+24:compact?120:width<=720?276:width<=1100?144:112;
 const safeBottom=Math.max(artTop+80,height-bottom);
 const artHeight=Math.min(width/artworkRatio,(safeBottom-artTop)*.82/.72);
 const architectureHeight=artHeight*.72,floorTop=artTop+architectureHeight;
 return {width,height,top:0,artTop,artHeight,architectureHeight,floorTop,floorHeight:Math.max(1,height-floorTop),worldLeft:width*(1-worldFraction)/2,worldWidth:width*worldFraction,safeBottom,walkFloor:safeBottom-floorTop};
}
function projectY(y,c){return y<=seam?y:seam+(y-seam)/28*c.walkFloor/c.artHeight*100;}
function point(p,c){return {x:c.worldLeft+p.x/100*c.worldWidth,y:c.artTop+projectY(p.y,c)/100*c.artHeight};}
function unproject(p,c){const dy=p.y-c.artTop;return {x:(p.x-c.worldLeft)/c.worldWidth*100,y:dy<=c.architectureHeight?dy/c.artHeight*100:seam+(dy-c.architectureHeight)/c.walkFloor*28};}
const api={layout,projectY,point,unproject};if(typeof module!=='undefined')module.exports=api;else root.OfficeCamera=api;
})(typeof window!=='undefined'?window:globalThis);
