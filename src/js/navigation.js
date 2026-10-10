(function(root){
'use strict';
// Furniture footprints use the same logical coordinates as the illustrated rooms.
const obstacles={desk:[[0,0,100,29],[0,0,37,40],[12,24,28,45],[38,0,59,37],[61,0,96,40],[69,24,84,45]],supply:[[0,0,100,26],[4,0,35,36],[0,0,5,64],[40,12,49,35],[50,0,73,38],[75,0,100,38],[73,72,79,78]],lobby:[[0,0,100,29],[12,0,38,31],[39,0,50,36],[50,0,61,35],[92,0,100,40],[27,72,33,78]]};
function walkable(room,p){return !!obstacles[room]&&p.x>=2&&p.x<=98&&p.y>=4&&p.y<=96&&!obstacles[room].some(([x1,y1,x2,y2])=>p.x>=x1&&p.x<=x2&&p.y>=y1&&p.y<=y2);}
const point=(x,y)=>({x:2+x*4,y:4+y*4}),key=(x,y)=>x+','+y;
function nearest(room,p){let best=null,dist=Infinity;for(let y=0;y<24;y++)for(let x=0;x<25;x++){const q=point(x,y),d=(p.x-q.x)**2+(p.y-q.y)**2;if(walkable(room,q)&&d<dist){best={x,y};dist=d;}}return best;}
function path(room,from,to){if(!obstacles[room])return [];const a=nearest(room,from),b=nearest(room,to);if(!a||!b)return [];const queue=[a],seen=new Set([key(a.x,a.y)]),parents=new Map();let end=null;for(let i=0;i<queue.length;i++){const p=queue[i];if(p.x===b.x&&p.y===b.y){end=p;break;}for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){const q={x:p.x+dx,y:p.y+dy},k=key(q.x,q.y);if(q.x<0||q.x>=25||q.y<0||q.y>=24||seen.has(k)||!walkable(room,point(q.x,q.y)))continue;if(dx&&dy&&(!walkable(room,point(p.x+dx,p.y))||!walkable(room,point(p.x,p.y+dy))))continue;seen.add(k);parents.set(k,p);queue.push(q);}}
if(!end)return [];const result=[];for(let p=end;p;p=parents.get(key(p.x,p.y)))result.push(point(p.x,p.y));return result.reverse();}
function safePosition(room,p){if(walkable(room,p))return p;const n=nearest(room,p);return n?point(n.x,n.y):{x:48,y:84};}
const api={safePosition,walkable,path,obstacles};if(typeof module!=='undefined')module.exports=api;else root.OfficeNav=api;
})(typeof window!=='undefined'?window:globalThis);
