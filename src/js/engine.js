(function(root){
'use strict';
const items={lever:{name:'Tray lever',icon:'🔧',w:4,h:1,color:'#bccbd4',desc:'A long maintenance lever. The narrow printer nook leaves no room to set the box down; the tool needs to slide straight out.'},plant:{name:'Desk plant',icon:'🪴',w:2,h:2,color:'#adcbb6',desc:'Bea gave me this cutting on my first day. It grew toward her desk.'},mug:{name:'Values mug',icon:'☕',w:2,h:1,color:'#efb9a1',desc:'Bea and I shared this mug when the kettle broke. Two straws. Terrible system.'},poster:{name:'Team poster',icon:'📜',w:1,h:3,color:'#c5b8db',desc:'Everyone signed this after our first launch. Jo drew a potato that was meant to be me.'},photo:{name:'Team photo',icon:'🖼️',w:2,h:2,color:'#e7c97b',desc:'Tuesday lunch club. We missed the camera timer three times.'},award:{name:'Excellence award',icon:'🏆',w:3,h:2,color:'#ebd6a0',desc:'I stayed late for six weeks to earn this. It is heavier than I remember.'},slip:{name:'Exit slip',icon:'📄',w:1,h:2,color:'#d8dfeb',desc:'Proof that you have permission to leave a job you no longer have.'},token:{name:'Supply token',icon:'🪙',w:1,h:1,color:'#dac797',desc:'One last perk. Redeem for something useful.'},sketchbook:{name:'Bea’s sketchbook',icon:'📒',w:3,h:2,color:'#efaca0',desc:'A whole world of ideas. None of them belong in a locked drawer.'},sticker:{name:'Goose sticker',icon:'🏷️',w:1,h:1,color:'#b7cbd8',desc:'“HONK IF YOU HAVE COMPLETED YOUR EXIT CHECKLIST.”'}};
function fresh(){return {version:3,started:false,room:'desk',collected:[],packed:{},flags:{},hints:{},position:{x:46,y:64},ended:false,park:{},settled:false,parkLast:null};}
function boxSize(s){return s.flags.tutorial?{w:6,h:4}:{w:3,h:2};}
function dimensions(id,r=0){let i=items[id];return r%2?{w:i.h,h:i.w}:{w:i.w,h:i.h};}
function canPlace(s,id,x,y,r=0){if(!items[id]||!Number.isInteger(x)||!Number.isInteger(y)||![0,1].includes(r))return false;const d=dimensions(id,r),size=boxSize(s);if(x<0||y<0||x+d.w>size.w||y+d.h>size.h)return false;return !Object.entries(s.packed).some(([k,v])=>{if(k===id)return false;let z=dimensions(k,v.r);return x<v.x+z.w&&x+d.w>v.x&&y<v.y+z.h&&y+d.h>v.y;});}
function pack(s,id,x,y,r=0){if(id==='token')return false;if(!s.collected.includes(id)||!canPlace(s,id,x,y,r))return false;s.packed[id]={x,y,r};if(s.packed.plant&&s.packed.mug)s.flags.tutorial=true;return true;}
function autoPack(s,id,r=0){const size=boxSize(s);for(let y=0;y<size.h;y++)for(let x=0;x<size.w;x++)if(canPlace(s,id,x,y,r)&&!placementIssue(s,id,{x,y,r})){const proposed={...s,packed:{...s.packed,[id]:{x,y,r}}};const breaks=Object.entries(s.packed).some(([other,v])=>other!==id&&!placementIssue(s,other,v)&&placementIssue(proposed,other,v));if(!breaks&&pack(s,id,x,y,r))return true;};return false;}
function give(s,id){if(items[id]&&!s.collected.includes(id))s.collected.push(id);}
function consume(s,id){s.collected=s.collected.filter(k=>k!==id);delete s.packed[id];}
function goal(s){if(s.ended)return 'A little room for whatever comes next.';if(!s.flags.inviteRead&&!s.flags.tutorial)return 'Check your computer.';if(s.flags.gate&&travelIssue(s))return 'Make your box safe for the walk home.';if(!s.flags.tutorial)return !s.packed.plant?'Pack something worth keeping.':'Make room for a second keepsake.';if(!s.flags.printer&&!s.flags.sawPrinter&&!s.flags.label)return 'Take a look around. Keep what matters.';if(!s.flags.printer)return s.flags.label?'Find a way to release the printer tray.':'Investigate the printer jam.';if(!s.flags.gate&&!s.packed.slip)return 'Pack your exit slip. Graham will need it.';if(!s.flags.gate)return s.flags.sawGraham?'Pack for the trip home. Show Graham your exit slip.':'Bring your exit slip to the lobby.';return 'Choose what comes with you. Then head outside.';}
function interact(s,key){
 const reply=(speaker,text,extra={})=>({speaker,text,...extra});
 if(s.ended)return reply('Pip','Lunch first. Everything else later.');
 if(items[key]&&['plant','mug','poster','photo','award'].includes(key)){if(s.collected.includes(key))return reply('Pip','Already set aside safely. '+items[key].desc,{item:key});give(s,key);return reply('Pip',items[key].desc,{item:key,effect:'collect'});}
 if(key==='water'){if(!s.flags.tutorial||!s.packed.mug)return reply('Pip','I need my mug packed before I can carry any water.',{hint:'Put your mug in the box so you can carry some water.'});s.flags.water=true;return reply('Pip','Filled the values mug. Finally, some liquidity.',{sound:'water',effect:'water'});}
 if(key==='printer'){s.flags.sawPrinter=true;
  if(s.flags.printer)return reply('Printer','The tray is open.');
  if(!s.flags.label){
   if(!s.flags.tutorial||!s.packed.mug||!s.flags.water)return reply('Pip','A dry adhesive seal covers the latch.');
   s.flags.label=true;return reply('Pip','The label peels away.',{effect:'label',sound:'paper'});
  }
  if(!s.collected.includes('lever'))return reply('Pip','An empty socket. The tray is still stuck.');
  if(!s.packed.plant||!s.packed.mug)return reply('Pip','I’ve left something behind.',{hint:'Repack the plant and mug, then arrange the lever along the top edge.'});
  if(!s.packed.lever)return reply('Pip','The lever isn’t with me.');
  const v=s.packed.lever;
  if(v.r!==0||v.y!==0)return reply('Pip','The lever is buried.');if(s.packed.mug.r!==0)return reply('Pip','The mug wobbles as I reach for it.');
  s.flags.printer=true;s.flags.leverReturned=true;consume(s,'lever');give(s,'slip');give(s,'token');return reply('Printer','CLACK. Found: exit slip + supply token.'+(s.flags.favorKnown?' The token opens Bea’s lower drawer.':' The token opens the locked sketchbook drawer.'),{sound:'latch',effect:'tray'});
 }
 if(key==='bea'){
  const first=!s.flags.metBea;s.flags.metBea=true;s.flags.favorKnown=true;
  const book=s.flags.bea?(s.collected.includes('sketchbook')?(s.packed.sketchbook?'My sketchbook is safe in your box. Thank you.':'Thank you for offering to carry my sketchbook. It’s waiting to be packed.'):'You got my sketchbook back. Thank you. Five forks, one sandwich—the drawing is safe.'):s.collected.includes('token')?'You found the token. It opens the lower drawer with my sketchbook.':'My sketchbook is locked in the lower drawer. The printer swallowed the supply token that opens it.';
  return reply('Bea',(first&&!s.flags.bea?'Tuesday lunch club. One sandwich, five forks. I brought enough this time. '+(s.collected.includes('token')?'You found the token for my sketchbook drawer. ':'My sketchbook is still locked in the lower drawer. '):book+' ')+(s.flags.lunchChosen?(s.flags.invited?' Your shady seat is saved.':' You can have a quiet afternoon. That’s okay.'):' I’m having lunch in the park. You’re welcome to join me, whether or not you help.'),{choice:'bea',offerLunch:!s.flags.lunchChosen});
 }
 if(key==='beaFavor'){
  s.flags.favorKnown=true;s.flags.favorFocus=!s.flags.bea;
  if(s.flags.bea)return reply('Bea',s.collected.includes('sketchbook')?(s.packed.sketchbook?'My book is packed for the park. Thank you.':'You offered to carry my book. Pack it, or I can carry it myself.'):'My book is back with me. Thank you. I’ll carry it to the park.',{choice:'carryBook'});
  if(!s.flags.printer)return reply('Bea','The printer swallowed the token for my lower drawer. Fixing it should free your paperwork and the token. Helping me is optional.');
  return reply('Bea','You found the supply token in the printer. Click the locked sketchbook drawer to use it. No need to pack the token.');
 }
 if(key==='lunch')return reply('Bea',s.flags.invited?'Your seat is saved. Would you like to change your plans?':'I’ll be under the big tree. Would you like company, or some time alone?',{choice:'invite'});
 if(key==='tool'){
  if(s.flags.leverReturned)return reply('Pip','The lever is back on its hook. The printer tray is open.');
  if(s.collected.includes('lever'))return reply('Pip',s.packed.lever?'The lever is already in my box. Back to the printer.':'The lever is set aside safely. Pack it, then return to the printer.',{item:'lever'});
  give(s,'lever');return reply('Pip','A tray lever. Polished smooth from years of use.',{item:'lever',effect:'tool'});
 }
 if(key==='drawer'){
  s.flags.favorKnown=true;s.flags.favorFocus=!s.flags.bea;
  if(s.flags.bea)return reply('Pip','The lower drawer stands open. Bea’s sketchbook has been returned.');
  if(!s.collected.includes('token'))return reply('Pip','Bea’s sketchbook is inside the lower wooden drawer. The lock takes a supply token. The printer seems to have swallowed it.');
  helpBea(s);return reply('Bea','You unlock the drawer and hand Bea her sketchbook. “Five forks, one sandwich. You can see the crumbs. Thank you.” Bea can carry her book, or Pip can offer to take it to the park.',{choice:'carryBook',effect:'drawer',sound:'latch'});
 }
 if(key==='graham'){s.flags.sawGraham=true;
  if(s.flags.gate)return reply('Graham','All clear. Your continued existence is outside my jurisdiction.');
  if(!s.packed.slip)return reply('Graham','No exit slip, no exit. These are the rules. I did not write them. I would have used more honks.',{hint:'Rescue the exit slip at the printer, then put it in your box.'});
  if(s.packed.slip.r!==0||s.packed.slip.x!==5)return reply('Graham','I need to pull the slip out without unpacking your life. Place it vertically against the right edge.',{hint:'Move keepsakes away from the last column. Pack the 1×2 exit slip there.'});const problem=travelIssue(s);if(problem)return reply('Graham',problem,{hint:'For the trip: the heavy award goes on the bottom edge. Cushion the photo directly above the poster or sketchbook.'});s.flags.gate=true;give(s,'sticker');return reply('Graham',(s.flags.boss?'I saw your handoff note. “Ask the people.” Sensible. ':s.flags.bossDeclined?'Your manager called. I told them the exit policy contains no spreadsheet clause. ':'')+'Slip stamped. Frame protected. One sticker. I put it on crooked; you may file a complaint.',{sound:'honk',effect:'stamp'});
 }
 if(key==='boss'&&s.flags.boss)return reply('Pip','The handoff note is sent. The next question can wait until someone else’s Monday.');
 if(key==='boss'&&s.flags.bossDeclined)return reply('Pip','I already said no. A boundary does not need a second spreadsheet.');
 if(key==='boss')return reply('Manager','Before you go, could you make yourself replaceable? Just a quick handoff. Everything you know. Maybe a spreadsheet.',{choice:'boss'});
 if(key==='screen')return reply('CEO','The CEO says “We’re a family.” Behind him, someone silently removes a chair. He keeps talking.');
 if(key==='elevator'){
  if(!s.flags.gate)return reply('Elevator','The door stays closed. Graham needs your exit slip first.',{hint:'Speak to Graham beside the elevator.'});
  const problem=travelIssue(s);if(problem)return reply('Pip',problem,{hint:'Make your box safe for the walk home before leaving.'});return reply('Pip','One last look at what comes with me.',{choice:'exit'});
 }
 return reply('Pip','Bring your whole self to work. Please take your whole self home.');
}
function helpBea(s){if(!s.flags.printer||!s.collected.includes('token')||s.flags.bea)return false;consume(s,'token');s.flags.bea=true;s.flags.favorKnown=true;s.flags.favorFocus=false;return true;}
function placementIssue(s,id,v){
 if(!v)return 'Not packed yet.';
 if(!s.flags.tutorial)return null;
 if(id==='lever'&&s.flags.label&&(v.r!==0||v.y!==0))return 'Place the lever horizontally along the top row.';
 if(id==='mug'&&s.flags.label&&!s.flags.printer&&v.r!==0)return 'Turn the full mug to its wide orientation.';
 if(!s.flags.printer)return null;
 if(id==='slip'&&(v.r!==0||v.x!==5))return 'Place the exit slip vertically along the right edge.';
 if(id==='award'&&v.y+dimensions(id,v.r).h!==4)return 'Put the heavy award against the bottom edge.';
 if(id==='photo'){const d=dimensions(id,v.r);const supported=['poster','sketchbook'].some(key=>{const pad=s.packed[key];if(!pad)return false;const z=dimensions(key,pad.r);return pad.y===v.y+d.h&&pad.x<=v.x&&pad.x+z.w>=v.x+d.w;});if(!supported)return 'Cushion the photo directly above the poster or sketchbook, supporting its full width.';}
 return null;
}
function arrangementIssues(s,id,v){
 const proposed={...s,packed:{...s.packed,[id]:v}};
 return Object.entries(proposed.packed).flatMap(([key,placement])=>{const issue=placementIssue(proposed,key,placement);return issue?[{id:key,message:issue}]:[];});
}
function returnBook(s){if(!s.flags.bea)return false;consume(s,'sketchbook');return true;}
function readiness(s){
 const rows=[];const add=(key,label,pass,detail)=>rows.push({key,label,pass:!!pass,detail});
 if(!s.flags.tutorial){add('plant','Plant packed',s.packed.plant,'Fit the plant into the small compartment.');add('mug','Mug packed',s.packed.mug,'Turn the mug to fit beside the plant.');}
 else if(!s.flags.printer){add('plant','Plant travelling with you',s.packed.plant,'Pack the plant.');add('mug',s.flags.label?'Full mug in wide orientation':'Mug packed',s.packed.mug&&!placementIssue(s,'mug',s.packed.mug),s.flags.label?'Pack the mug in its wide orientation.':'Pack the mug.');if(s.flags.label)add('lever','Lever reachable from top row',s.packed.lever&&!placementIssue(s,'lever',s.packed.lever),'Collect the lever and place it horizontally on the top row.');}
 else{if(!s.flags.gate)add('slip','Slip reachable from right edge',s.packed.slip&&!placementIssue(s,'slip',s.packed.slip),'Pack the exit slip vertically in the last column.');if(s.packed.award)add('award','Award resting on bottom edge',!placementIssue(s,'award',s.packed.award),placementIssue(s,'award',s.packed.award));if(s.packed.photo)add('photo','Photo cushioned across its full width',!placementIssue(s,'photo',s.packed.photo),placementIssue(s,'photo',s.packed.photo));}
 const ready=rows.every(row=>row.pass);const summary=ready?(!s.flags.tutorial?'Both keepsakes fit.':!s.flags.printer?(s.flags.label?'Ready to release the printer tray.':(s.flags.water?'Water ready. Return to the printer.':'Keepsakes packed. The printer still needs investigating.')):'Box ready for the walk home.'):rows.find(row=>!row.pass).detail;
 return {rows,ready,summary};
}
function travelIssue(s){for(const id of ['award','photo'])if(s.packed[id]){const issue=placementIssue(s,id,s.packed[id]);if(issue)return issue;}return null;}
function departure(s){const desk=['plant','mug','poster','photo','award'],keeps=[...desk,'sketchbook','sticker'];const setAside=keeps.filter(id=>s.collected.includes(id)&&!s.packed[id]&&!(id==='sketchbook'&&s.flags.bea));const untouched=desk.filter(id=>!s.collected.includes(id));return {kept:keeps.filter(id=>s.packed[id]),setAside,untouched,left:[...setAside,...untouched]};}
function endingMemory(s){const k=id=>!!s.packed[id];const lines=[s.flags.invited?'Bea saves the shady end of the bench. Tuesday lunch club has moved.':'Pip finds a quiet bench. For a moment, being alone feels like having room.'];
 const memories={plant:'The cutting Bea gave Pip is still growing. There will be another windowsill.',mug:s.flags.invited?'Bea has brought two cups this time. The old mug is welcome anyway.':'Pip keeps the familiar mug close. Tea for one still counts.',poster:'Jo’s potato drawing sits among the signatures. Pip laughs before realizing it.',photo:'The lunch-club photograph keeps every face, including the ones who missed the camera timer.',award:'Those six late weeks were real work. Pip can keep the award without owing the company another evening.',sketchbook:'Bea’s rescued sketchbook has room for drawings no one needs to approve.',sticker:'A crooked goose sticker marks a strange day survived.'};
 for(const id of ['plant','mug','poster','photo','award','sketchbook','sticker'])if(k(id))lines.push(memories[id]);
 if(k('photo')&&k('sketchbook'))lines.push('An old photograph and a fresh page: there can be another lunch club.');
 if(s.collected.includes('award')&&!k('award'))lines.push('Pip left the award at the desk. The six weeks that earned it still happened.');
 if(!Object.keys(s.packed).some(id=>memories[id]))lines.push('Pip’s paws are lighter. The memories do not need a box.');
 if(s.flags.bea&&!k('sketchbook'))lines.push(s.flags.invited?'Bea carries her rescued sketchbook herself.':'Bea has her sketchbook back. Pip takes the quiet afternoon alone.');
 if(s.flags.boss)lines.push('The handoff is finished. Pip leaves the next question unanswered.');else if(s.flags.bossDeclined)lines.push('No spreadsheet follows Pip outside.');
 return lines.join(' ');
}
function validate(o){try{if(![1,2,3].includes(o.version)||!Array.isArray(o.collected)||!o.packed||!o.flags||!['desk','supply','lobby'].includes(o.room))return null;const n=fresh();n.started=!!o.started;n.room=o.room;for(const [key,value] of Object.entries(o.hints||{}))if(['packing','explore','label','waterReady','tool','lever','favor','weight','padding','exit','done'].includes(key)&&Number.isInteger(value)&&value>=0&&value<=3)n.hints[key]=value;n.flags=Object.fromEntries(Object.entries(o.flags).filter(([k,v])=>['water','label','printer','leverReturned','bea','gate','boss','bossDeclined','metBea','invited','lunchChosen','favorKnown','favorFocus','tutorial','sawPrinter','sawGraham','boxIntroduced','inviteRead'].includes(k)&&typeof v==='boolean'));if(o.version===1&&n.started)n.flags.tutorial=true;if(o.version<3&&n.started)n.flags.inviteRead=true;if(!Object.hasOwn(o.flags,'favorKnown'))n.flags.favorKnown=!!(n.flags.metBea||n.flags.bea);if(!Object.hasOwn(o.flags,'favorFocus'))n.flags.favorFocus=!!(n.flags.favorKnown&&!n.flags.bea);if(!Object.hasOwn(o.flags,'lunchChosen'))n.flags.lunchChosen=!!n.flags.metBea;n.collected=[...new Set(o.collected.filter(k=>Object.hasOwn(items,k)))];for(const [id,v] of Object.entries(o.packed)){if(id==='token')continue;if(!v||![0,1].includes(v.r)||!pack(n,id,v.x,v.y,v.r))return null;}if(o.position&&Number.isFinite(o.position.x)&&Number.isFinite(o.position.y))n.position={x:Math.max(2,Math.min(98,o.position.x)),y:Math.max(4,Math.min(96,o.position.y))};n.ended=!!o.ended&&!!n.flags.gate;n.settled=n.ended&&o.settled===true;for(const [id,zone] of Object.entries(o.park||{}))if(n.packed[id]&&['bench','ground','bea'].includes(zone)&&(zone!=='bea'||n.flags.invited))n.park[id]=zone;if(n.park[o.parkLast])n.parkLast=o.parkLast;return n;}catch{return null;}}
function favorGoal(s){if(!s.flags.favorKnown)return '';if(s.flags.bea)return 'Optional · Sketchbook returned to Bea.';return s.flags.printer?'Optional · Use the token at Bea’s lower drawer.':'Optional · Free the printer token for Bea’s book.';}
function resumeLine(s){
 if(!s.flags.inviteRead&&!s.flags.tutorial)return goal(s);
 if(!s.flags.tutorial)return s.packed.plant?'Your plant is packed. There’s still room for the mug.':'Your last day is waiting. Make room for your plant and mug.';
 if(s.flags.bea&&s.collected.includes('sketchbook')&&!s.packed.sketchbook)return 'Bea’s book is rescued. Pack it if you’re carrying it, or ask her to take it.';
 if(s.flags.favorFocus&&!s.flags.bea&&s.flags.printer)return 'The supply token is in your pocket. Bea’s lower drawer is ready to unlock.';
 if(s.flags.label&&!s.flags.printer)return s.collected.includes('lever')?(s.packed.lever?(readiness(s).ready?'The latch is exposed and the lever is within reach. Return to the printer.':'The lever is packed, but the box needs rearranging before I can reach the latch.'):'The lever is set aside. Pack it, then return to the exposed latch.'):'The printer latch is exposed. The tray lever is on its hook.';
 return goal(s);
}
function roomLine(s){
 if(s.room==='supply')return s.flags.bea?(s.collected.includes('sketchbook')?'Bea’s sketchbook is safe. I offered to carry it.':'Bea has her sketchbook back. One less thing left behind.'):s.collected.includes('token')&&s.flags.favorKnown?'The token in my pocket fits Bea’s lower drawer.':'Bea is still here. We used to take lunch together every Tuesday.';
 if(s.room==='lobby')return s.flags.gate?'Graham has cleared my exit slip. I can head outside when my box is ready.':'The doors are close. Graham is watching the box, not the clock.';
 return 'The desk is quieter with every thing I take.';
}
const api={arrangementIssues,returnBook,resumeLine,roomLine,favorGoal,items,fresh,boxSize,dimensions,canPlace,pack,autoPack,give,consume,goal,interact,helpBea,placementIssue,readiness,travelIssue,departure,endingMemory,validate};if(typeof module!=='undefined')module.exports=api;else root.OfficeGame=api;
})(typeof window!=='undefined'?window:globalThis);
