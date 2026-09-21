const app = document.getElementById("app");

const meals = [
  {name:"Cơm gà xào rau củ", time:20, price:25000, kcal:460, tag:"Healthy & Cân bằng", img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"},
  {name:"Trứng cuộn rau củ sốt cà", time:15, price:18000, kcal:310, tag:"Tiết kiệm & Dễ làm", img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80"},
  {name:"Canh trứng cà chua đậu hũ", time:10, price:12000, kcal:190, tag:"Nhanh gọn số 1", img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80"},
  {name:"Mì udon bò xào bông cải", time:15, price:35000, kcal:520, tag:"Cân bằng & Năng lượng", img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80"},
  {name:"Cải thìa xào tỏi sốt nấm", time:10, price:15000, kcal:140, tag:"Thuần chay", img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"},
  {name:"Ức gà nướng bơ tỏi ăn kèm bắp", time:25, price:32000, kcal:390, tag:"Eatclean & Gym", img:"https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80"}
];

const ingredients = [
  ["Trứng gà","~3.500đ / quả","Protein"],["Thịt gà","Ức/đùi fillet","Protein"],["Thịt bò","Thăn mềm","Protein"],
  ["Đậu phụ","Đậu hũ non/trắng","Protein"],["Thịt ba chỉ","Kho/lược ngon","Protein"],["Tôm tươi","Tôm thẻ/nâu","Protein"],
  ["Cá hồi","Omega-3","Protein"],["Xúc xích","Tiện ăn liền","Protein"],["Chả lụa","Kèm bánh mì","Protein"],
  ["Cà rốt","Giàu lutein","Rau"],["Bắp cải","Luộc/xào rẻ","Rau"],["Cà chua","Nấu canh/sốt","Rau"],
  ["Bông cải xanh","Siêu lợi khuẩn","Rau"],["Rau muống","Xào tỏi quốc dân","Rau"],["Cải bó xôi","Rau bina","Rau"],
  ["Nấm rơm","Kho tiêu/nấu","Rau"],["Dưa chuột","Ăn kèm","Rau"],["Khoai tây","Hầm/canh","Rau"],
  ["Hành tây","Xào thịt bò","Rau"],["Gạo ST25","Cơm dẻo thơm","Tinh bột"],["Mì gói","Cứu đói đêm","Tinh bột"],
  ["Bún tươi","Bún trộn/bún","Tinh bột"],["Bánh mì sandwich","Bữa sáng 5 phút","Tinh bột"],["Yến mạch","Eat clean","Tinh bột"],
  ["Khoai lang","Hấp/nồi cơm","Tinh bột"],["Dầu ăn","Dầu thực vật","Gia vị"],["Nước mắm","Đậm đà vị Việt","Gia vị"],
  ["Hạt nêm","Nêm canh/kho","Gia vị"],["Tỏi ớt","Khử mùi, phi","Gia vị"],["Tiêu đen","Xay nhuyễn","Gia vị"],["Sốt me rang","Trộn salad siêu...","Gia vị"]
];

const state = {
  page:"overview",
  name:"Khánh Huyền",
  streak:5,
  checkedMeals: JSON.parse(localStorage.getItem("mealmate_checked") || "[]"),
  selectedIngredients: new Set(JSON.parse(localStorage.getItem("mealmate_ingredients") || '["Trứng gà","Thịt gà","Thịt bò","Đậu phụ","Xúc xích","Cà rốt","Bắp cải","Cà chua","Dưa chuột","Khoai tây","Gạo ST25","Mì gói","Bánh mì sandwich","Dầu ăn"]'))
};

function navItem(key, icon, label){return `<button data-page="${key}" class="${state.page===key?'active':''}"><b>${icon}</b><span>${label}</span></button>`}
function shell(content){
  app.innerHTML = `
  <div class="app">
    <aside class="sidebar">
      <div class="brand"><div class="brand-logo">🥬</div><div><strong>MealMate</strong><span>Dinh dưỡng sinh viên</span></div></div>
      <div class="nav-title">MENU CHÍNH</div>
      <nav class="nav">
        ${navItem("overview","▦","Tổng quan")}
        ${navItem("calendar","▣","Lịch của tôi")}
        ${navItem("ingredients","▤","Quản lý nguyên liệu")}
        ${navItem("meals","🍴","Gợi ý món ăn")}
        ${navItem("community","▷","Cộng đồng & Reels")}
        ${navItem("habits","♨","Theo dõi thói quen")}
      </nav>
      <div class="sidebar-streak">🔥 <b>Chuỗi ${state.streak} bữa đủ chất</b><span>Đạt ${state.streak} ngày liên tiếp</span> 🔥</div>
    </aside>
    <main class="main">
      <header class="topbar"><div class="search">⌕ &nbsp; Tìm món nhanh, nguyên liệu, calo sinh viên...</div><div class="profile"><span>🔔</span><div class="avatar">KH</div><div><b>${state.name}</b><small style="display:block;color:var(--muted)">Sinh viên năm 3</small></div>⌄</div></header>
      <section class="content">${content}</section>
    </main>
    <div class="toast" id="toast"></div>
    <div class="modal-backdrop" id="modal"><div class="modal"><h2>Chỉnh tên hiển thị</h2><input id="nameInput" value="${state.name}" maxlength="30"/><div class="modal-actions"><button class="btn-soft" onclick="closeModal()">Hủy</button><button class="btn-primary" onclick="saveName()">Lưu</button></div></div></div>
  </div>`;
  document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>{state.page=b.dataset.page;render()}));
}

function pageHead(kicker,title,desc,button=""){return `<div class="page-head"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${desc}</p></div>${button}</div>`}

function overview(){
 return pageHead("HỌC KỲ 1 • 2025–2026",`Chào buổi sáng, ${state.name}! ☀️`,"Hôm nay bạn có lịch trình như thế nào? Cùng chuẩn bị ngày mới thật nhiều năng lượng nhé!","<button class='btn-soft' onclick='openModal()'>✎ Đổi tên</button>")+
 `<div class="hero"><div><div class="eyebrow" style="color:#d9ffe6">🔥 MEAL STREAK</div><h2>Một bữa ăn ngon không chỉ giúp bạn đủ năng lượng</h2><p>Hãy ăn trưa trước 12:30 để học cả chiều tỉnh táo nhé!</p></div><div class="streak">${state.streak} ngày 🔥</div></div>
 <div class="stat-row">
  <div class="stat"><span>CHUỖI ĂN UỐNG</span><b>${state.streak} ngày</b><span>Ăn đúng giờ & đủ 3 bữa</span></div>
  <div class="stat"><span>TỦ LẠNH SINH VIÊN</span><b>${state.selectedIngredients.size} nguyên liệu</b><span>Đủ nấu nhiều món</span></div>
  <div class="stat"><span>CỘNG ĐỒNG & REELS</span><b>48 reels</b><span>Bí kíp dưới 10 phút</span></div>
 </div>
 <div class="grid grid-2" style="margin-top:16px">
  <div class="card"><div style="display:flex;justify-content:space-between"><div><h2>Lịch trình hôm nay</h2><div class="muted">Tự động đồng bộ với lịch học</div></div><button class="btn-soft" onclick="go('calendar')">+ Thêm tiết học</button></div>
   <div class="timeline" style="margin-top:14px">
    <div class="timeline-item"><div class="timeline-time">07:30–11:30</div><div class="timeline-body"><b>Học tại trường (Giảng đường A3)</b><span>Thiết kế giao diện đa nền tảng</span></div></div>
    <div class="timeline-item"><div class="timeline-time">11:30–13:00</div><div class="timeline-body"><b>🍴 Thời gian rảnh nấu nướng</b><span>Khoảng 90 phút nghỉ giữa ca học & đi làm</span></div></div>
    <div class="timeline-item"><div class="timeline-time">13:00–17:00</div><div class="timeline-body"><b>💼 Đi làm thêm (Part-time)</b><span>Ca làm tại trung tâm ngoại ngữ</span></div></div>
    <div class="timeline-item"><div class="timeline-time">18:00–22:00</div><div class="timeline-body"><b>🌙 Thời gian rảnh & Bữa tối</b><span>Nấu ăn nhanh, học bài & nghỉ ngơi</span></div></div>
   </div>
  </div>
  <div class="card"><div style="display:flex;justify-content:space-between"><div><h2>MealMate gợi ý cho bạn</h2><div class="muted">Bữa trưa lý tưởng</div></div><span>✨</span></div>
   ${mealCard(meals[1])}
  </div>
 </div>
 <div class="card" style="margin-top:16px"><div style="display:flex;justify-content:space-between"><div><h2>Mục tiêu calo hôm nay</h2><div class="muted">Đã nạp 1.250 / 1.850 kcal • Đủ 4 nhóm chất</div></div><div style="font-size:22px;font-weight:800;color:var(--green)">68%</div></div><div class="progress" style="margin-top:12px"><i style="width:68%"></i></div></div>`;
}

function mealCard(m){
 return `<div class="food-card" style="margin-top:12px"><div class="food-img" style="background-image:url('${m.img}')"></div><div class="body"><span class="tag">${m.tag}</span><h3 style="margin-top:8px">${m.name}</h3><div class="muted">Món ngon, giàu protein và phù hợp lịch bận của sinh viên.</div><div class="food-meta"><span>⏱ ${m.time} phút</span><span class="price">${m.price.toLocaleString("vi-VN")}đ</span><span>🔥 ${m.kcal} kcal</span></div><div class="food-actions"><button class="detail" onclick="showToast('Đã lưu món vào thực đơn tuần!')">Lưu món</button><button class="cook" onclick="showToast('Bắt đầu chế độ Nấu ngay 🍳')">Nấu ngay</button></div></div></div>`;
}

function mealsPage(){
 return pageHead("AI THỰC ĐƠN SINH VIÊN","12 món ăn tối ưu theo 14 nguyên liệu có sẵn & lịch rảnh 45 phút","MealMate tính các món chuẩn dinh dưỡng, không cần đi chợ thêm mà vẫn kịp trước giờ học chiều.","<button class='btn-primary' onclick='showToast(\"Đã tạo thực đơn 7 ngày!\")'>＋ Tạo thực đơn tuần</button>")+
 `<div class="card"><div class="filters"><span class="muted" style="padding:8px 4px">⏱ Thời gian nấu:</span>${["Tất cả","< 10 phút","15 phút","20 phút","30+ phút"].map((x,i)=>`<button class="chip ${i===0?'active':''}" onclick="filterChip(this)">${x}</button>`).join("")}</div><div class="filters"><span class="muted" style="padding:8px 4px">💰 Mức giá sinh viên:</span>${["Tất cả ngân sách","Tiết kiệm < 20k","Vừa vặn 20k–40k","Đủ chất > 40k"].map((x,i)=>`<button class="chip ${i===0?'active':''}" onclick="filterChip(this)">${x}</button>`).join("")}</div></div>
 <div class="food-grid" style="margin-top:16px">${meals.map(mealCard).join("")}</div>`;
}

function ingredientsPage(){
 const selected=[...state.selectedIngredients];
 return pageHead("TRỢ LÝ DINH DƯỠNG SINH VIÊN","Nguyên liệu của tôi","Tích chọn nguyên liệu bạn có, MealMate sẽ tự gợi ý công thức tiết kiệm và đủ dinh dưỡng.","<button class='btn-primary' onclick='showToast(\"Đã lưu tủ lạnh!\")'>＋ Thêm tự chọn</button>")+
 `<div class="grid grid-2"><div>
  <div class="card"><div style="display:flex;gap:8px"><input id="ingredientSearch" oninput="searchIngredients()" placeholder="⌕  Tìm nguyên liệu..." style="flex:1;border:1px solid var(--line);border-radius:14px;padding:11px 13px;outline:none"><button class="btn-primary" onclick="addCustomIngredient()">＋ Thêm</button></div>
   <div class="filters">${["Tất cả","Đạm & Thịt","Rau củ & Nấm","Tinh bột","Gia vị"].map((x,i)=>`<button class="chip ${i===0?'active':''}" onclick="filterChip(this)">${x}</button>`).join("")}</div>
  </div>
  <div class="card" style="margin-top:16px"><h2>Danh sách nguyên liệu</h2><div class="ingredient-grid" id="ingredientGrid">${ingredients.map(([n,d])=>ingredientItem(n,d)).join("")}</div></div>
 </div>
 <div><div class="card"><h2>Hiện có trong tủ</h2><div class="muted">${selected.length} nguyên liệu đã chọn</div><div class="fridge" style="margin-top:12px"><b>Độ phong phú tủ lạnh</b><div style="font-size:25px;font-weight:800;color:var(--green);margin:8px 0">${Math.min(95,60+selected.length*2)}%</div><div class="progress"><i style="width:${Math.min(95,60+selected.length*2)}%"></i></div><small class="muted">Đủ nấu nhiều món chuẩn sinh viên</small></div><div class="side-list" style="margin-top:12px">${selected.slice(0,10).map(x=>`<div class="rank"><span>• ${x}</span><b>✓</b></div>`).join("")}</div></div>
 <div class="card" style="margin-top:16px"><h2>Mẹo đi chợ sinh viên</h2><p class="muted">Trứng gà và đậu phụ là 2 nguyên liệu nền tảng kinh tế. Kết hợp rau củ tươi giúp bạn có bữa ăn đủ nhóm chất.</p><b>💰 Dự toán chi tiêu tuần: ~85.000đ/ngày</b></div></div></div>`;
}

function ingredientItem(name,desc){
 const sel=state.selectedIngredients.has(name);
 return `<div class="ingredient ${sel?'selected':''}" data-name="${name}"><div><b style="font-size:11px">${name}</b><small>${desc}</small></div><button class="check" onclick="toggleIngredient('${name}')">${sel?'✓':''}</button></div>`;
}

function calendarPage(){
 return pageHead("HỌC KỲ 1 • 2025–2026","Lịch của tôi","Đồng bộ lịch học, lịch làm thêm và đề xuất chuẩn bị bữa ăn tiết kiệm thời gian.","<button class='btn-primary' onclick='showToast(\"Đã thêm sự kiện!\")'>＋ Thêm sự kiện / Lịch học</button>")+
 `<div class="stat-row"><div class="stat"><span>THỜI GIAN RẢNH NẤU ĂN</span><b>11.5h</b><span>/ tuần • Đủ nấu 9 bữa chính</span></div><div class="stat"><span>CÂN BẰNG HỌC & LÀM</span><b>26h</b><span>học • 14h làm thêm</span></div><div class="stat"><span>MEAL PREP</span><b>Thứ 3</b><span>18:30–22:00</span></div></div>
 <div class="card" style="margin-top:16px;overflow:auto"><div class="calendar" style="min-width:800px">
  <div></div>${["Thứ 2<br>21/9","Thứ 3<br>22/9","Thứ 4<br>23/9","Hôm nay<br>24/9","Thứ 6<br>25/9"].map(x=>`<div class="cal-head">${x}</div>`).join("")}
  <div class="cal-row-label">🌞 SÁNG<br><small>07:00–11:30</small></div>
  ${["Toán Cao Cấp A2","Tự học thư viện","Tiếng Anh Chuyên Ngành","Lập trình Web Frontend","Cơ Sở Dữ Liệu"].map(x=>`<div class="event"><b>${x}</b><br><span class="muted">07:30–11:30</span></div>`).join("")}
  <div class="cal-row-label">🍴 TRƯA<br><small>11:30–13:30</small></div>
  ${["Thịt băm rim + Trứng cút","Cơm đậu phụ sốt cà chua","Cơm gà xào rau củ","Trứng cuộn rau + cơm","Bún thịt băm cà chua"].map(x=>`<div class="event meal"><b>${x}</b><br><span class="muted">Bữa ăn đã lên lịch</span></div>`).join("")}
  <div class="cal-row-label">💼 CHIỀU<br><small>13:30–17:30</small></div>
  ${["Gia sư Tiếng Anh","Kinh tế Vĩ mô 2","Gia sư Tiếng Anh","Tập gym tại KTX","Ca Barista quán cà phê"].map(x=>`<div class="event work"><b>${x}</b><br><span class="muted">Ca học / làm thêm</span></div>`).join("")}
  <div class="cal-row-label">🌙 TỐI<br><small>18:00–22:30</small></div>
  ${["Đậu phụ nhồi thịt sốt cà","Ca thu ngân Circle K","Cà rốt & nấm","Ca thu ngân Circle K","Trứng cuộn rau củ"].map(x=>`<div class="event personal"><b>${x}</b><br><span class="muted">Nấu ăn / nghỉ ngơi</span></div>`).join("")}
 </div></div>
 <div class="grid grid-2" style="margin-top:16px"><div class="card"><h2>Theo dõi Dinh dưỡng & Calo dự kiến 7 ngày</h2><div class="habit-columns">${["T2","T3","T4","T5","T6","T7","CN"].map((d,i)=>`<div class="bar-col"><div class="bar-stack"><i class="bar-green" style="height:${60+i%3*18}px"></i><i class="${i===3||i===5?'bar-orange':'bar-orange'}" style="height:${20+i%2*10}px"></i></div><div class="day">${d}</div></div>`).join("")}</div><div class="muted">Mức calo trung bình: <b>1.920 kcal/ngày</b></div></div>
 <div class="card"><h2>Nguyên liệu cần mua</h2>${["Ức gà phi lê (300g)","Trứng gà công nghiệp (10 quả)","Đậu phụ trắng (3 bìa)","Cà chua + Rau muống"].map((x,i)=>`<div class="rank" style="margin-top:8px"><span>☐ ${x}</span><b>${[25000,28000,12000,15000][i].toLocaleString("vi-VN")}đ</b></div>`).join("")}<div style="text-align:right;margin-top:12px;font-weight:800;color:var(--green)">~185.000đ / tuần</div></div></div>`;
}

function communityPage(){
 const reels=[
  ["Cơm-chiên-kim-chi 7 phút","https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80"],
  ["Nấu canh không cần đậu hũ","https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80"],
  ["Trứng cuộn 10 phút","https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=700&q=80"],
  ["Mì cay 3 phút","https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80"]
 ];
 return pageHead("#CỘNGĐỒNGSINHVIÊN","Cộng đồng ẩm thực sinh viên MealMate","Chia sẻ bữa cơm xóm trọ ngon – bổ – rẻ, lưu reels nấu ăn thần tốc và gom ưu đãi.","<button class='btn-primary' onclick='showToast(\"Mở form Đăng bài / Reel\")'>＋ Tạo bài đăng / Đăng Reel mới</button>")+
 `<div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><div><h2>Reels ngắn 30s nấu siêu tốc</h2><div class="muted">Lướt nhanh công thức, mẹo tiết kiệm trong phòng trọ</div></div><b class="eyebrow">Xem tất cả (48) →</b></div><div class="reels" style="margin-top:14px">${reels.map(r=>`<div class="reel" style="background-image:url('${r[1]}')"><div class="reel-caption"><b>${r[0]}</b><br><span>❤️ 31.5k • 0:25</span></div></div>`).join("")}</div></div>
 <div class="grid grid-2" style="margin-top:16px"><div class="card"><div class="eyebrow">TOP KOC • 1 giờ trước</div><h2>Mâm cơm 3 món chuẩn vị mẹ nấu</h2><p class="muted">Thịt kho trứng cút, canh bí sườn & rau muống xào tỏi — tổng chi phí dưới 28.000đ.</p><div class="post-image" style="background-image:url('https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80')"></div><div class="food-meta"><span>♡ 1.2k Thích</span><span>💬 184 Bình luận</span><span>🔖 Lưu công thức</span></div></div>
 <div class="card"><h2>Bảng xếp hạng tuần</h2><div class="side-list" style="margin-top:12px">${[["Thảo Bếp Trọ","2.480 pts"],["Hoàng Cookhalic","2.190 pts"],["Linh Healthy Eat","1.940 pts"]].map((x,i)=>`<div class="rank"><span><b>${i+1}</b> &nbsp;${x[0]}</span><b>${x[1]}</b></div>`).join("")}</div><div class="card" style="margin-top:14px;background:#e9f8ee"><b>🏆 #CookAtDorm</b><p class="muted">Nấu bữa cơm chỉ bằng 1 nồi cơm điện đa năng. Tham gia challenge và nhận voucher.</p><button class="btn-primary" onclick="showToast('Đã tham gia challenge!')">Tham gia →</button></div></div></div>`;
}

function habitsPage(){
 const days=["21/9","22/9","23/9","24/9","25/9","26/9","27/9"];
 return pageHead("NHẬT KÝ THÓI QUEN & DINH DƯỠNG","Theo dõi thói quen ăn uống của bạn","Hạm mục dinh dưỡng đề xuất: bữa sáng đủ đạm, trưa đủ chất xơ, tối nhẹ nhàng đúng giờ.","<button class='btn-primary' onclick='checkMeal(\"today\")'>✓ Check-in bữa tối</button>")+
 `<div class="hero"><div><div class="eyebrow" style="color:#d9ffe6">🔥 KỶ LỤC TUẦN</div><h2>Meal Streak: ${state.streak} ngày liên tiếp!</h2><p>Hoàn thành 3 bữa/ngày để giữ ngọn lửa năng lượng học tập.</p></div><div class="streak">🔥 ${state.streak}</div></div>
 <div class="card"><h2>Bảng check-in 3 bữa trong ngày</h2><div class="muted">Hạm mục dinh dưỡng đề xuất: bữa sáng đủ đạm, trưa giàu chất xơ, tối nhẹ nhàng đúng giờ.</div><div class="check-grid" style="margin-top:14px">${days.map((d,i)=>dayCard(d,i===3)).join("")}</div></div>
 <div class="grid grid-2" style="margin-top:16px"><div class="card"><h2>Biểu đồ thói quen 7 ngày</h2><div class="muted">Dữ liệu tổng hợp từ các bữa đã nạp</div><div class="habit-columns" style="margin-top:12px">${days.map((d,i)=>`<div class="bar-col"><div class="bar-stack"><i class="bar-green" style="height:${60+i*5}px"></i><i class="bar-orange" style="height:${20+(i%3)*8}px"></i>${i===2?'<i class="bar-red"></i>':''}</div><div class="day">${["T2","T3","T4","T5","T6","T7","CN"][i]}</div></div>`).join("")}</div><div class="stat-row"><div class="stat"><span>BỮA ĂN CÂN BẰNG</span><b>8/12</b></div><div class="stat"><span>ĐÚNG NHỊP</span><b>9/12</b></div><div class="stat"><span>CHI PHÍ TB</span><b>21.500đ</b></div></div></div>
 <div class="card"><h2>Món ăn nổi bật tuần này</h2>${mealCard(meals[0])}</div></div>
 <div class="card" style="margin-top:16px;background:#e3f4e8"><b>💡 Lời khuyên dinh dưỡng từ Bé Mate</b><p class="muted">Bạn đã hạn chế mì tôm khua xuất sắc trong 4 ngày qua! Tiếp tục duy trì để giữ chuỗi streak nhé.</p></div>`;
}

function dayCard(day,today){
 return `<div class="day-card ${today?'today':''}"><b>${day}</b>${["Bữa sáng","Bữa trưa","Bữa tối"].map((m,j)=>{const id=day+"-"+j;const done=state.checkedMeals.includes(id);return `<div class="meal-check ${done?'done':''}">${m}<button onclick="toggleMeal('${id}')">${done?'✓':'○'}</button><div class="muted">${j===0?'07:45':j===1?'12:10':'19:00'}</div></div>`}).join("")}</div>`;
}

function render(){
 let content= state.page==="overview"?overview():state.page==="calendar"?calendarPage():state.page==="ingredients"?ingredientsPage():state.page==="meals"?mealsPage():state.page==="community"?communityPage():habitsPage();
 shell(content);
}
function go(p){state.page=p;render()}
function showToast(msg){const t=document.getElementById("toast");if(!t)return;t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function openModal(){document.getElementById("modal").classList.add("show")}
function closeModal(){document.getElementById("modal").classList.remove("show")}
function saveName(){state.name=document.getElementById("nameInput").value.trim()||"Khánh Huyền";closeModal();render();showToast("Đã cập nhật tên hiển thị!")}
function toggleIngredient(name){state.selectedIngredients.has(name)?state.selectedIngredients.delete(name):state.selectedIngredients.add(name);localStorage.setItem("mealmate_ingredients",JSON.stringify([...state.selectedIngredients]));render();showToast(`${state.selectedIngredients.has(name)?"Đã thêm":"Đã bỏ"} ${name}`)}
function addCustomIngredient(){const name=prompt("Tên nguyên liệu mới:");if(name){state.selectedIngredients.add(name);localStorage.setItem("mealmate_ingredients",JSON.stringify([...state.selectedIngredients]));render();showToast("Đã thêm nguyên liệu mới!");}}
function searchIngredients(){const q=document.getElementById("ingredientSearch").value.toLowerCase();document.querySelectorAll("#ingredientGrid .ingredient").forEach(x=>x.style.display=x.dataset.name.toLowerCase().includes(q)?"flex":"none")}
function filterChip(el){el.parentElement.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));el.classList.add("active");showToast("Đã áp dụng bộ lọc")}
function toggleMeal(id){if(state.checkedMeals.includes(id))state.checkedMeals=state.checkedMeals.filter(x=>x!==id);else state.checkedMeals.push(id);localStorage.setItem("mealmate_checked",JSON.stringify(state.checkedMeals));if(state.checkedMeals.length%3===0)state.streak=Math.min(30,state.streak+1);render();showToast("Đã cập nhật check-in bữa ăn!")}
function checkMeal(){toggleMeal("24/9-2")}
window.go=go;window.showToast=showToast;window.openModal=openModal;window.closeModal=closeModal;window.saveName=saveName;window.toggleIngredient=toggleIngredient;window.addCustomIngredient=addCustomIngredient;window.searchIngredients=searchIngredients;window.filterChip=filterChip;window.toggleMeal=toggleMeal;window.checkMeal=checkMeal;

render();
