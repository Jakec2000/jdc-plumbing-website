'use strict';

const SECTIONS=[...(window.SECTIONS_PART1||[]),...(window.SECTIONS_PART2||[])];
const STORAGE_KEY = 'vt-l67-recommission:v1';

const GUIDE_ORDER = [
  { id:'initial', phase:'BEFORE START' },
  { id:'battery', phase:'BEFORE START' },
  { id:'fuel', phase:'BEFORE START' },
  { id:'lubrication', phase:'BEFORE START' },
  { id:'cooling', phase:'BEFORE START' },
  { id:'belts', phase:'BEFORE START' },
  { id:'starting', phase:'BEFORE START' },
  { id:'ignition', phase:'BEFORE START' },
  { id:'firststart', phase:'FIRST START' },
  { id:'brakes', phase:'BEFORE DRIVING' },
  { id:'driveline', phase:'BEFORE DRIVING' },
  { id:'tyres', phase:'BEFORE DRIVING' },
  { id:'roadtest', phase:'ROAD TEST' }
];

const emptyState = () => ({ completed:{}, taskNotes:{}, globalNotes:'', updatedAt:new Date().toISOString() });

function loadState(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY);
    if(!raw)return emptyState();
    const parsed=JSON.parse(raw);
    return {completed:parsed.completed||{},taskNotes:parsed.taskNotes||{},globalNotes:parsed.globalNotes||'',updatedAt:parsed.updatedAt||new Date().toISOString()};
  }catch{return emptyState();}
}

let state=loadState();

function saveState(){
  state.updatedAt=new Date().toISOString();
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  updateProgress();
}

function allTasks(){return SECTIONS.flatMap(section=>section.tasks.map(task=>({...task,sectionId:section.id})))}

function escapeHtml(value=''){
  return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
}

function labelFor(level){if(level==='critical')return 'Before start';if(level==='important')return 'Before driving';return 'After start';}

function renderTask(task){
  const checked=!!state.completed[task.id];
  const note=state.taskNotes[task.id]||'';
  return `<article class="task ${checked?'done':''}" data-task="${escapeHtml(task.id)}"><div class="task-row"><label class="check-label"><input class="task-check" type="checkbox" data-id="${escapeHtml(task.id)}" ${checked?'checked':''}/><span class="custom-check" aria-hidden="true"></span><span class="task-text"><span class="task-title">${escapeHtml(task.title)}</span><span class="priority-label ${escapeHtml(task.level)}">${labelFor(task.level)}</span></span></label></div><details class="task-details"><summary>Details</summary><ol>${task.instructions.map(step=>`<li>${escapeHtml(step)}</li>`).join('')}</ol><label class="task-note-label">Note<textarea class="task-note" data-note-id="${escapeHtml(task.id)}" rows="2" placeholder="Reading, part, fault…">${escapeHtml(note)}</textarea></label></details></article>`;
}

let checklistRendered=false;

function renderChecklist(){
  if(checklistRendered)return;
  checklistRendered=true;
  const host=document.getElementById('sections');
  host.innerHTML=SECTIONS.map((section,index)=>`<section class="check-section"><details class="section-details" data-section="${escapeHtml(section.id)}" ${index===0?'open':''}><summary><span class="section-main"><span class="section-title">${escapeHtml(section.title.replace(/^\d+\.\s*/,''))}</span><span class="section-summary">${escapeHtml(section.summary)}</span></span><span class="section-count" id="section-count-${escapeHtml(section.id)}"></span><span class="chev" aria-hidden="true"></span></summary><div class="task-list">${section.tasks.map(renderTask).join('')}</div></details></section>`).join('');
  document.getElementById('checklistLoader')?.classList.add('hidden');
  document.querySelectorAll('.task-check').forEach(input=>input.addEventListener('change',()=>{state.completed[input.dataset.id]=input.checked;input.closest('.task')?.classList.toggle('done',input.checked);saveState();}));
  document.querySelectorAll('.task-note').forEach(area=>area.addEventListener('input',()=>{state.taskNotes[area.dataset.noteId]=area.value;saveState();}));
  updateProgress();
}

function guideTasks(){
  const ordered=[];
  GUIDE_ORDER.forEach(group=>{
    const section=SECTIONS.find(s=>s.id===group.id);
    if(!section)return;
    section.tasks.forEach(task=>ordered.push({...task,sectionId:section.id,sectionTitle:section.title,phase:group.phase}));
  });
  return ordered;
}

function currentGuideTask(){return guideTasks().find(task=>!state.completed[task.id])||null;}

function updateNextCard(){
  const next=currentGuideTask();
  const card=document.getElementById('nextCard');
  const phase=document.getElementById('nextPhase');
  const step=document.getElementById('nextStep');
  const title=document.getElementById('nextTitle');
  const summary=document.getElementById('nextSummary');
  const list=document.getElementById('nextInstructions');
  const mark=document.getElementById('markNextDone');
  const show=document.getElementById('showInChecklist');
  const details=document.getElementById('nextDetails');
  const phaseStatus=document.getElementById('phaseStatus');
  const ordered=guideTasks();
  const doneCount=ordered.filter(t=>state.completed[t.id]).length;
  if(!next){
    card.classList.add('complete');phase.textContent='COMPLETE';step.textContent=`${ordered.length} / ${ordered.length}`;title.textContent='Recommission checklist complete';summary.textContent='All checklist items are marked complete. Review notes and recheck any faults before normal use.';list.innerHTML='';details.open=false;details.style.display='none';mark.style.display='none';show.style.display='none';phaseStatus.textContent='All tasks complete';return;
  }
  card.classList.remove('complete');details.style.display='';mark.style.display='';show.style.display='';phase.textContent=next.phase;step.textContent=`Step ${doneCount+1} of ${ordered.length}`;title.textContent=next.title;summary.textContent=next.sectionTitle.replace(/^\d+\.\s*/,'');list.innerHTML=next.instructions.map(item=>`<li>${escapeHtml(item)}</li>`).join('');phaseStatus.textContent=next.phase;
}

function markCurrentDone(){
  const next=currentGuideTask();if(!next)return;
  state.completed[next.id]=true;
  const checkbox=document.querySelector(`.task-check[data-id="${CSS.escape(next.id)}"]`);
  if(checkbox){checkbox.checked=true;checkbox.closest('.task')?.classList.add('done');}
  saveState();
  window.scrollTo({top:0,behavior:'smooth'});
}

function showCurrentInChecklist(){
  renderChecklist();
  const next=currentGuideTask();if(!next)return;
  const section=document.querySelector(`[data-section="${CSS.escape(next.sectionId)}"]`);if(section)section.open=true;
  requestAnimationFrame(()=>{const task=document.querySelector(`[data-task="${CSS.escape(next.id)}"]`);if(!task)return;task.scrollIntoView({behavior:'smooth',block:'center'});task.classList.remove('highlight');void task.offsetWidth;task.classList.add('highlight');const details=task.querySelector('.task-details');if(details)details.open=true;});
}

function updateProgress(){
  const tasks=allTasks();
  const done=tasks.filter(t=>state.completed[t.id]).length;
  const pct=tasks.length?Math.round(done/tasks.length*100):0;
  document.getElementById('progressText').textContent=`${pct}%`;
  document.getElementById('countText').textContent=`${done} / ${tasks.length} complete`;
  document.getElementById('progressBar').style.width=`${pct}%`;
  const critical=tasks.filter(t=>t.level==='critical');
  const remaining=critical.filter(t=>!state.completed[t.id]).length;
  const gate=document.getElementById('gate');
  if(remaining===0){gate.className='gate go';gate.textContent='Ready for controlled first start';}else{gate.className='gate stop';gate.textContent=`${remaining} critical check${remaining===1?'':'s'} left before first start`;}
  updateNextCard();
  SECTIONS.forEach(section=>{const complete=section.tasks.filter(t=>state.completed[t.id]).length;const el=document.getElementById(`section-count-${section.id}`);if(el)el.textContent=`${complete}/${section.tasks.length}`;});
}

function nextCritical(){
  renderChecklist();
  const next=allTasks().find(t=>t.level==='critical'&&!state.completed[t.id]);
  if(!next){document.getElementById('gate').scrollIntoView({behavior:'smooth',block:'center'});return;}
  const section=document.querySelector(`[data-section="${CSS.escape(next.sectionId)}"]`);if(section)section.open=true;
  requestAnimationFrame(()=>{const task=document.querySelector(`[data-task="${CSS.escape(next.id)}"]`);if(!task)return;task.scrollIntoView({behavior:'smooth',block:'center'});task.classList.remove('highlight');void task.offsetWidth;task.classList.add('highlight');});
}

function toggleAll(){renderChecklist();const details=[...document.querySelectorAll('#sections .section-details')];const shouldOpen=details.some(d=>!d.open);details.forEach(d=>d.open=shouldOpen);document.getElementById('toggleAll').textContent=shouldOpen?'Collapse all':'Expand all';}

function download(filename,text){const blob=new Blob([text],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),800);}

function exportProgress(){const tasks=allTasks();const payload={app:'VT L67 Recommission',vehicle:'1997 Holden Commodore VT Series I L67 3.8 Supercharged',exportedAt:new Date().toISOString(),completed:tasks.filter(t=>state.completed[t.id]).length,total:tasks.length,state,checklist:SECTIONS};download(`vt-l67-recommission-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(payload,null,2));}

document.getElementById('loadChecklist').addEventListener('click',renderChecklist);
document.getElementById('markNextDone').addEventListener('click',markCurrentDone);
document.getElementById('showInChecklist').addEventListener('click',showCurrentInChecklist);
document.getElementById('nextCritical').addEventListener('click',nextCritical);
document.getElementById('toggleAll').addEventListener('click',toggleAll);
document.getElementById('exportBtn').addEventListener('click',exportProgress);
document.getElementById('resetBtn').addEventListener('click',()=>{if(!confirm('Reset all ticks and notes on this device?'))return;localStorage.removeItem(STORAGE_KEY);state=emptyState();document.getElementById('globalNotes').value='';if(checklistRendered){checklistRendered=false;document.getElementById('sections').innerHTML='';document.getElementById('checklistLoader')?.classList.remove('hidden');}updateProgress();});

const globalNotes=document.getElementById('globalNotes');globalNotes.value=state.globalNotes;globalNotes.addEventListener('input',()=>{state.globalNotes=globalNotes.value;saveState();});

updateProgress();

if('serviceWorker' in navigator&&location.protocol.startsWith('http')){window.addEventListener('load',()=>{navigator.serviceWorker.register('./sw.js').catch(()=>{});});}
