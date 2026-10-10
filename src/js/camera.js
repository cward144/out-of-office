(function(root){
'use strict';
// A continuous three-band scene: extend the top edge, retain furniture, adapt the open floor.
// Logical puzzle coordinates stay unchanged; every actor and pointer uses this projection.
const artworkRatio=1672/941,worldFraction=.84375,seam=72;
function layout(width,height,ending=false){
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
