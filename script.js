AOS.init({duration:700,once:true,offset:60});

// Navbar scroll effect
window.addEventListener('scroll',()=>{
  document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>30);
});

// ── CROP MANAGER ──────────────────────────────────────────
let crops = JSON.parse(localStorage.getItem('atc_crops')||'[]');
renderCrops();
function addCrop(){
  const t=document.getElementById('cropType').value;
  const d=document.getElementById('sowDate').value;
  const a=document.getElementById('fieldArea').value;
  const s=document.getElementById('soilType').value;
  const g=document.getElementById('growthStage').value;
  const n=document.getElementById('cropNotes').value;
  if(!t||!d||!a||!s){showToast('⚠ Please fill in all required fields.','warn');return;}
  crops.push({id:Date.now(),type:t,date:d,area:a,soil:s,stage:g,notes:n});
  localStorage.setItem('atc_crops',JSON.stringify(crops));
  renderCrops();
  showToast('🌱 '+t+' session added successfully!','success');
  document.getElementById('cropType').value='';
  document.getElementById('sowDate').value='';
  document.getElementById('fieldArea').value='';
  document.getElementById('soilType').value='';
  document.getElementById('cropNotes').value='';
}
function renderCrops(){
  const tb=document.getElementById('cropBody');
  if(!crops.length){
    tb.innerHTML='<tr id="empty-row"><td colspan="6" class="text-center py-4" style="color:var(--muted);font-size:.88rem;">No sessions yet. Add your first crop above! 🌾</td></tr>';
    return;
  }
  tb.innerHTML=crops.map((c,i)=>{
    const stageBadge=c.stage.includes('Seed')?'stage-seed':c.stage.includes('Harvest')?'stage-harvest':'stage-grow';
    return`<tr>
      <td><strong>${c.type}</strong>${c.notes?`<br><small style="color:var(--muted)">${c.notes.substring(0,40)}…</small>`:''}
      </td>
      <td>${c.date}</td>
      <td>${c.area} ac</td>
      <td>${c.soil}</td>
      <td><span class="badge-stage ${stageBadge}">${c.stage}</span></td>
      <td><button class="btn btn-sm" style="background:rgba(200,50,50,.1);color:#c43333;border:none;border-radius:8px;" onclick="removeCrop(${i})"><i class="fas fa-trash-alt"></i></button></td>
    </tr>`;
  }).join('');
}
function removeCrop(i){crops.splice(i,1);localStorage.setItem('atc_crops',JSON.stringify(crops));renderCrops();showToast('🗑 Session removed.','info');}
function clearCrops(){if(crops.length&&confirm('Clear all crop sessions?')){crops=[];localStorage.removeItem('atc_crops');renderCrops();showToast('✅ All sessions cleared.','info');}}

// ── WEATHER ──────────────────────────────────────────────
function updateWeatherCity(){
  const v=document.getElementById('weatherLocation').value.trim();
  if(!v){showToast('⚠ Please enter a city name.','warn');return;}
  showToast('📍 Fetching forecast for '+v+'…','success');
}

// ── CULTIVATION GUIDE ─────────────────────────────────────
const GUIDES={
  wheat:{steps:[
    {icon:'fa-vial',step:'Step 1',title:'Soil Preparation & Testing',desc:'Test soil pH (target 6.0–7.5) and NPK levels. Deep plough 20–25 cm. Apply FYM @ 10 t/ha. Level the field for uniform irrigation.',tips:['Avoid waterlogging — wheat needs well-drained soil','Add lime if pH < 6.0']},
    {icon:'fa-seedling',step:'Step 2',title:'Seed Selection & Treatment',desc:'Choose certified HYV like GW-322, K-307, or HD-2967. Treat seed with Carbendazim 2 g/kg + Thiram 2 g/kg to prevent seed-borne disease.',tips:['Use 100–125 kg seed/ha','Germination test: >85% viability needed']},
    {icon:'fa-calendar-check',step:'Step 3',title:'Sowing (Nov 1–20)',desc:'Sow at 20 cm row spacing, 4–5 cm depth. Apply basal dose: 60 kg N + 60 kg P + 40 kg K per hectare. Use a seed-cum-fertiliser drill.',tips:['Optimal soil temperature: 15–20°C','Irrigate 24 hrs before sowing']},
    {icon:'fa-tint',step:'Step 4',title:'Irrigation Schedule (5–6 times)',desc:'Crown root initiation (21 DAS), Tillering (40 DAS), Jointing (60 DAS), Flowering (80 DAS), Grain filling (90 DAS), Dough stage (105 DAS).',tips:['Do NOT irrigate at grain ripening stage','Each irrigation ~6 cm water depth']},
    {icon:'fa-bug',step:'Step 5',title:'Pest & Disease Management',desc:'Monitor for Yellow Rust, Brown Rust, Aphids, and Armyworm. Spray Propiconazole 0.1% for rust. Use Dimethoate 30 EC for aphids at 500 mL/ha.',tips:['Scout fields weekly from 30 DAS','Apply fungicide only above economic threshold']},
    {icon:'fa-scissors',step:'Step 6',title:'Harvesting & Threshing',desc:'Harvest when grain moisture is 14–16% (120–150 DAS). Use combine harvester for large fields. Thresh within 2–3 days to prevent losses. Target yield: 40–50 q/ha.',tips:['Harvest early morning to avoid grain shattering','Avoid harvesting wet crop — wait for dew to dry']},
    {icon:'fa-warehouse',step:'Step 7',title:'Post-Harvest & Marketing',desc:'Dry to <12% moisture. Store in jute bags on wooden pallets. Sell through APMC mandi, e-NAM portal, or direct contract. Current MSP: ₹2,275/q.',tips:['Stack bags max 10 high','Check e-NAM app for best realisation price']}
  ]},
  tomato:{steps:[
    {icon:'fa-vial',step:'Step 1',title:'Nursery Preparation',desc:'Raise nursery in raised beds (3×1 m). Treat soil with formaldehyde. Sow seeds 0.5 cm deep. Germination in 5–7 days. Ready to transplant in 25–30 days.',tips:['Use pro-trays with cocopeat for better success','Shade nursery for first 7 days']},
    {icon:'fa-seedling',step:'Step 2',title:'Field Preparation & Planting',desc:'Form ridges 60 cm apart. Transplant seedlings at 45 cm plant-to-plant spacing. Apply FYM 25 t/ha. Base fertiliser: 50 kg N+50 kg P+50 kg K.',tips:['Transplant in evening to reduce transplanting shock','Water immediately after planting']},
    {icon:'fa-tint',step:'Step 3',title:'Drip Irrigation & Fertigation',desc:'Install drip at 4 L/hour emitters. Irrigate daily (4–5 L/plant). Fertigate: 19:19:19 @ 3 kg/acre weekly for first 30 days, then shift to K-heavy schedule.',tips:['Maintain soil moisture at 60–70% field capacity','Avoid water stress at flowering']},
    {icon:'fa-bug',step:'Step 4',title:'Disease & Pest Management',desc:'Key threats: Early Blight, Late Blight, Fusarium Wilt, Whitefly, Thrips. Use Mancozeb 2.5 g/L preventively. Yellow sticky traps for whitefly monitoring.',tips:['Remove and destroy infected plants immediately','Spray in morning for better efficacy']},
    {icon:'fa-scissors',step:'Step 5',title:'Staking & Pruning',desc:'Stake plants at 30 cm height using bamboo or wire trellis. Remove suckers fortnightly. This improves air circulation and increases marketable yield by 30%.',tips:['Prune to single stem for table tomatoes','Leave 2 stems for processing varieties']},
    {icon:'fa-boxes',step:'Step 6',title:'Harvesting & Grading',desc:'First harvest at 60–65 DAT. Pick at breaker stage for long transport. Grade into: Grade A (>75g, defect-free), Grade B (50–75g), Grade C (export/processing).',tips:['Pick every 3–4 days during peak','Handle gently to avoid bruising']},
    {icon:'fa-rupee-sign',step:'Step 7',title:'Marketing & Profit',desc:'Sell Grade A locally at ₹25–40/kg. Grade B to wholesale at ₹18–25/kg. Process surplus into ketchup/purée for value addition. Expected: 30–40 t/ha net revenue ₹2–3 lakh/acre.',tips:['Register on e-NAM for direct mandi access','Explore contract farming with Heinz, Kagome']}
  ]},
  rice:{steps:[
    {icon:'fa-vial',step:'Step 1',title:'Land Preparation',desc:'Flood field, puddle with rotavator 2–3 times. Level with laser leveller for uniform water distribution. Puddle to 15 cm depth for good transplanting.',tips:['Good puddling reduces weed pressure by 60%','Add 5 t/ha organic matter before puddling']},
    {icon:'fa-seedling',step:'Step 2',title:'Nursery & Transplanting',desc:'Raise nursery using wet method. Sow 20 kg seed/ha. Transplant 25–30 day old seedlings @ 20×15 cm spacing, 2–3 seedlings/hill. Depth: 2–3 cm.',tips:['SRI method: 1 seedling/hill at 12 DAS','Transplant in early morning']},
    {icon:'fa-tint',step:'Step 3',title:'Water Management',desc:'Maintain 5 cm standing water until 10 days before harvest. Critical stages: tillering, panicle initiation, and flowering. Drain 10 days before harvest for easy harvesting.',tips:['Alternate Wetting & Drying (AWD) saves 30% water','Use perforated pipe to measure water level']},
    {icon:'fa-bug',step:'Step 4',title:'Weed & Pest Control',desc:'Apply Pretilachlor 0.75 kg a.i./ha at 3 DAS for pre-emergence control. Monitor for Stem Borer, BPH, and Blast. Use Tricho-cards for stem borer bio-control.',tips:['Weed at 15 and 30 DAT','Pheromone traps for borer monitoring']},
    {icon:'fa-scissors',step:'Step 5',title:'Harvest & Threshing',desc:'Harvest when 80–85% of grains turn golden (28–32 days after flowering). Moisture 20–22%. Thresh within 24 hrs. Target yield: 50–60 q/ha for HYV.',tips:['Avoid delayed harvest — increases shattering','Use axial-flow thresher for less breakage']},
    {icon:'fa-warehouse',step:'Step 6',title:'Milling & Marketing',desc:'Dry paddy to 14% moisture. Mill locally or sell as paddy. Sell through FCI at MSP ₹2,183/q or local mandi. Parboiled rice fetches premium. Rice bran oil for value addition.',tips:['Register with e-NAM for better price discovery','Form FPO for bulk selling advantage']}
  ]},
  onion:{steps:[
    {icon:'fa-vial',step:'Step 1',title:'Variety Selection & Nursery',desc:'Choose Nasik Red, Agrifound Dark Red, or NHRDF Red-2. Raise nursery in 6×1 m raised beds. Sow 8–10 kg seed/ha. Ready in 45–50 days.',tips:['Use pelletised seed for uniform germination','Treat seeds with Trichoderma 4 g/kg']},
    {icon:'fa-seedling',step:'Step 2',title:'Transplanting',desc:'Transplant at 10×10 cm (Kharif) or 15×10 cm (Rabi) spacing. Apply FYM 25 t/ha. Base dose: 50 kg P + 30 kg K/ha at transplanting.',tips:['Trim roots to 3 cm before planting','Irrigate immediately after transplanting']},
    {icon:'fa-tint',step:'Step 3',title:'Irrigation & Fertigation',desc:'Irrigate every 7–10 days. Stop irrigation 15 days before harvest for proper bulb curing. Topdress 50 kg N at 30 DAT and another 50 kg N at 60 DAT.',tips:['Excess moisture causes neck rot','Drip + mulching saves 40% water']},
    {icon:'fa-bug',step:'Step 4',title:'Disease Management',desc:'Key diseases: Purple Blotch, Stemphylium Blight, Basal Rot. Spray Mancozeb 2.5 g/L + Carbendazim 0.5 g/L alternately every 10–12 days.',tips:['Remove yellow/infected leaves','Avoid overhead irrigation']},
    {icon:'fa-scissors',step:'Step 5',title:'Harvesting & Curing',desc:'Harvest when 50% tops fall over (90–120 DAS). Pull bulbs, window them for 3–4 days. Grade: 45mm+ export quality. Store in well-ventilated khatal-type sheds.',tips:['Do not over-mature — doubles storage loss','Curing reduces neck softness']},
    {icon:'fa-rupee-sign',step:'Step 6',title:'Storage & Marketing',desc:'Store in ventilated rope-net structures. Hold for 2–3 months for better price. Sell through Lasalgaon APMC or e-NAM for national reach. Export premium: ₹3,000–5,000/q.',tips:['Treat with CIPC spray to reduce sprouting','Register with NHRDF for export linkage']}
  ]},
  cotton:{steps:[
    {icon:'fa-vial',step:'Step 1',title:'Soil & Land Preparation',desc:'Deep plough (30–45 cm) black cotton soil. Add FYM 10 t/ha. Form broad beds for Bt cotton. pH 6.5–8 ideal. Avoid water stagnation.',tips:['Subsoil ploughing every 3 years','Good drainage critical — cotton is waterlogging-sensitive']},
    {icon:'fa-seedling',step:'Step 2',title:'Seed & Sowing',desc:'Use approved Bt hybrid (e.g., Bollgard II). Sow post-monsoon (June–July) at 120×60 cm. 1 seed/hill, 3–4 cm depth. Target: 14,000 plants/ha.',tips:['Buy certified seed from licensed dealer only','Never reuse Bt cotton seed']},
    {icon:'fa-tint',step:'Step 3',title:'Irrigation',desc:'Dryland crop but requires 5–6 irrigations: germination, squaring, first flowering, boll formation × 3. Each 6–8 cm. Avoid stress at squaring and boll formation.',tips:['Sandy loam: more frequent irrigation','Furrow irrigation preferred over flooding']},
    {icon:'fa-bug',step:'Step 4',title:'Integrated Pest Management',desc:'Key pests: Pink Bollworm (Bt target), Whitefly, Jassids, Mealybug. Install Helilure pheromone traps (5/ha). Monitor weekly. Spray Spinosad for whitefly.',tips:['Never use banned pesticides','Neem oil spray reduces sucking pest pressure']},
    {icon:'fa-scissors',step:'Step 5',title:'Picking & Ginning',desc:'First picking at 150–160 DAS when bolls open fully. 3–4 pickings per season. Keep kapas moisture <8% for premium grade. Ginning: 33–35% lint recovery target.',tips:['Pick early morning for better quality','Separate hand picking by grade — don\'t mix']},
    {icon:'fa-rupee-sign',step:'Step 6',title:'Market & Returns',desc:'Sell through CCI, state gins, or private buyers. MSP for medium staple: ₹6,620/q. Long staple: ₹7,020/q. Organic cotton premium: 25–40% above MSP.',tips:['Register with CCI for MSP protection','Cotton stalk chips for biomass energy — extra income']}
  ]}
};
function updateGuide(){
  const crop=document.getElementById('guideSelect').value;
  const data=GUIDES[crop];
  const el=document.getElementById('guideSteps');
  el.innerHTML=data.steps.map((s,i)=>`
    <div class="tl-step" data-aos="${i%2===0?'fade-right':'fade-left'}">
      <div class="tl-dot"><i class="fas ${s.icon}"></i></div>
      <div class="tl-content">
        <div class="tl-step-num">${s.step}</div>
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
        <ul class="mt-2">${s.tips.map(t=>`<li>${t}</li>`).join('')}</ul>
      </div>
    </div>
  `).join('');
  AOS.refresh();
}
updateGuide();

// ── PROFIT CALCULATOR ─────────────────────────────────────
const MSP={wheat:2275,rice:2183,tomato:2800,onion:1890,soybean:4450};
function calcProfit(){
  const crop=document.getElementById('calcCrop').value;
  const area=parseFloat(document.getElementById('calcArea').value);
  const yld=parseFloat(document.getElementById('calcYield').value);
  const costPerAcre=parseFloat(document.getElementById('calcCost').value);
  const price=MSP[crop]||2000;
  const rev=area*yld*price;
  const cost=area*costPerAcre;
  const profit=rev-cost;
  const fmt=n=>'₹'+Math.abs(n).toLocaleString('en-IN');
  document.getElementById('revenueOut').textContent=fmt(rev);
  document.getElementById('costOut').textContent=fmt(cost);
  document.getElementById('profitOut').textContent=(profit>=0?'':'–')+fmt(profit);
  document.getElementById('profitOut').style.color=profit>=0?'var(--moss)':'#c43333';
  const roi=((profit/cost)*100).toFixed(1);
  document.getElementById('profitAdvice').textContent=profit>=0
    ?`📈 ROI: ${roi}% — Expected profit ₹${(profit/area).toLocaleString('en-IN')}/acre at MSP. Consider grading & storage to increase by 15–20%.`
    :`⚠ At current inputs, you may face a loss. Consider reducing cost, increasing yield, or exploring contract farming.`;
}
calcProfit();

// ── MARKETPLACE ───────────────────────────────────────────
function filterProducts(q){
  document.querySelectorAll('.product-item').forEach(el=>{
    const text=el.textContent.toLowerCase();
    el.style.display=text.includes(q.toLowerCase())?'':'none';
  });
}
function addToCart(name){showToast('🛒 '+name+' added to cart!','success');}
function showSellModal(){new bootstrap.Modal(document.getElementById('sellModal')).show();}
function submitListing(){
  bootstrap.Modal.getInstance(document.getElementById('sellModal')).hide();
  showToast('✅ Your listing has been submitted! Buyers will contact you shortly.','success');
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg,type='success'){
  const colors={success:'var(--moss)',warn:'#c99a00',info:'var(--bark)'};
  const toast=document.createElement('div');
  toast.className='alert mb-2 shadow-sm py-2 px-3';
  toast.style.cssText=`background:${colors[type]||colors.success};color:#fff;border:none;border-radius:12px;font-size:.88rem;font-weight:500;animation:fadeIn .3s ease;`;
  toast.innerHTML=msg;
  document.getElementById('toastArea').prepend(toast);
  setTimeout(()=>toast.remove(),3800);
}
const style=document.createElement('style');
style.textContent='@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(style);