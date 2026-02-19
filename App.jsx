import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPA_URL = "https://hfojdltnlynfxduerfei.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhmb2pkbHRubHluZnh1ZXJmZWkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNzgzODMwNSwiZXhwIjoyMDUzNDE0MzA1fQ.yXSJI5s8CnZWU2A6ltOdWH0FLPXgfAabXtPv6hDnXYo";
const sb = createClient(SUPA_URL, SUPA_KEY);

// Styles
const IS = {width:"100%",padding:"8px 10px",background:"#0f172a",border:"1px solid #334155",borderRadius:6,color:"#e2e8f0",fontSize:13,fontFamily:"inherit",direction:"rtl"};
const LS = {display:"block",fontSize:11,color:"#94a3b8",marginBottom:4,fontWeight:500};
const BP = {padding:"8px 16px",background:"linear-gradient(135deg,#0369a1,#0284c7)",border:"none",borderRadius:7,color:"#fff",fontWeight:600,cursor:"pointer",fontFamily:"inherit",fontSize:13};
const BS = {padding:"8px 14px",background:"#1e293b",border:"1px solid #334155",borderRadius:7,color:"#94a3b8",cursor:"pointer",fontFamily:"inherit",fontSize:13};
const BX = {padding:"4px 8px",background:"transparent",border:"1px solid #334155",borderRadius:5,color:"#94a3b8",cursor:"pointer",fontFamily:"inherit",fontSize:12};
const TD = {padding:"8px 10px",verticalAlign:"middle",color:"#e2e8f0"};
const CATS = {medical:"طبي",furniture:"أثاث",device:"أجهزة",technical:"تقني",print:"مطبوعات"};

// Components
function PBar({value,max=100,color}){
  const p=max>0?Math.min(100,Math.round((value/max)*100)):0;
  const c=color||(p===100?"#10b981":p>=80?"#3b82f6":p>0?"#f59e0b":"#6b7280");
  return <div style={{background:"#0f172a",borderRadius:6,height:8,overflow:"hidden",width:"100%"}}><div style={{width:`${p}%`,height:"100%",background:c,borderRadius:6,transition:"width 0.4s"}}/></div>;
}

function Card({icon,label,value,color="#38bdf8"}){
  return <div style={{background:"#1e293b",border:`1px solid ${color}33`,borderRadius:10,padding:"14px 16px",flex:1,minWidth:120}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div><div style={{fontSize:11,color:"#94a3b8",marginBottom:4}}>{label}</div><div style={{fontSize:26,fontWeight:700,color}}>{value}</div></div>
      <span style={{fontSize:22}}>{icon}</span>
    </div>
  </div>;
}

function Badge({text,color="#38bdf8",small}){
  return <span style={{background:`${color}22`,border:`1px solid ${color}44`,color,borderRadius:4,padding:small?"1px 5px":"2px 7px",fontSize:small?10:11,whiteSpace:"nowrap"}}>{text}</span>;
}

function getStatusLabel(pct){
  if(pct===0) return {label:"لم يبدأ",color:"#6b7280"};
  if(pct<80) return {label:"جاري التحضير",color:"#d97706"};
  if(pct<100) return {label:"شبه جاهز",color:"#2563eb"};
  return {label:"جاهز",color:"#059669"};
}

function Login({onLogin}){
  const [u,setU]=useState("");const [p,setP]=useState("");const [err,setErr]=useState("");
  const USERS=[
    {username:"admin",password:"admin123",name:"مدير الإمداد",role:"admin",roleLabel:"مسؤول"},
    {username:"warehouse",password:"wh123",name:"أمين المستودع",role:"warehouse",roleLabel:"مستودع"},
    {username:"team1",password:"team123",name:"فريق التحضير 1",role:"preparation",roleLabel:"تحضير"},
    {username:"team2",password:"team456",name:"فريق التحضير 2",role:"preparation",roleLabel:"تحضير"},
    {username:"leader",password:"lead123",name:"القيادة العليا",role:"leadership",roleLabel:"قيادة"},
  ];
  const login=()=>{const user=USERS.find(x=>x.username===u&&x.password===p);if(user)onLogin(user);else setErr("بيانات غير صحيحة");};
  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f172a,#1e3a5f,#0f172a)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:380,background:"rgba(30,41,59,0.97)",border:"1px solid #334155",borderRadius:14,padding:32,boxShadow:"0 25px 50px rgba(0,0,0,0.5)"}}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{fontSize:40,marginBottom:6}}>🕌</div>
          <h1 style={{margin:0,fontSize:18,color:"#38bdf8",fontWeight:700}}>نظام إدارة الإمداد الطبي</h1>
          <p style={{color:"#94a3b8",fontSize:11,margin:"4px 0 0"}}>موسم الحج | مركز قيادة العمليات</p>
        </div>
        <div style={{background:"#0f172a",borderRadius:7,padding:10,marginBottom:14,border:"1px solid #1e3a5f"}}>
          <p style={{margin:"0 0 5px",fontSize:10,color:"#64748b"}}>دخول سريع:</p>
          {USERS.map(x=><button key={x.username} onClick={()=>{setU(x.username);setP(x.password);}} style={{display:"block",width:"100%",textAlign:"right",padding:"2px 6px",background:"none",border:"none",color:"#64748b",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>← {x.username} / {x.password} ({x.roleLabel})</button>)}
        </div>
        <div style={{marginBottom:11}}><label style={LS}>اسم المستخدم</label><input value={u} onChange={e=>setU(e.target.value)} style={IS} placeholder="username"/></div>
        <div style={{marginBottom:14}}><label style={LS}>كلمة المرور</label><input type="password" value={p} onChange={e=>setP(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} style={IS} placeholder="password"/></div>
        {err&&<div style={{color:"#f87171",fontSize:12,marginBottom:9,textAlign:"center"}}>{err}</div>}
        <button onClick={login} style={{...BP,width:"100%",padding:11,fontSize:14}}>دخول إلى النظام</button>
      </div>
    </div>
  );
}

export default function App(){
  const [loggedIn,setLoggedIn]=useState(false);
  const [currentUser,setCurrentUser]=useState(null);
  const [screen,setScreen]=useState("dashboard");
  const [sidebar,setSidebar]=useState(true);
  const [alerts,setAlerts]=useState([]);
  const [loading,setLoading]=useState(true);
  
  const [zones,setZones]=useState([]);
  const [sectors,setSectors]=useState([]);
  const [centers,setCenters]=useState([]);
  const [items,setItems]=useState([]);
  const [standards,setStandards]=useState([]);
  const [warehouse,setWarehouse]=useState([]);
  const [preparation,setPreparation]=useState({});
  const [requirements,setRequirements]=useState({});
  const [reqGenerated,setReqGenerated]=useState(false);

  const addAlert=useCallback((msg,type="info")=>{
    const id=Date.now();
    setAlerts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setAlerts(p=>p.filter(a=>a.id!==id)),4000);
  },[]);

  const loadAll=useCallback(async()=>{
    setLoading(true);
    try{
      const [z,s,c,it,std,wh,prep]=await Promise.all([
        sb.from("zones").select("*").order("id"),
        sb.from("sectors").select("*").order("id"),
        sb.from("centers").select("*").order("id"),
        sb.from("items").select("*").order("id"),
        sb.from("supply_standards").select("*"),
        sb.from("warehouse").select("*"),
        sb.from("preparation").select("*"),
      ]);
      if(z.error||s.error||c.error) throw new Error("خطأ في تحميل البيانات");
      setZones(z.data||[]);
      setSectors(s.data||[]);
      setCenters(c.data||[]);
      setItems(it.data||[]);
      setStandards(std.data||[]);
      setWarehouse(wh.data||[]);
      const prepObj={};
      (prep.data||[]).forEach(p=>{prepObj[`${p.center_id}_${p.item_id}`]=p;});
      setPreparation(prepObj);
    }catch(e){addAlert(e.message,"error");}
    finally{setLoading(false);}
  },[addAlert]);

  useEffect(()=>{loadAll();},[loadAll]);

  useEffect(()=>{
    const channel=sb.channel("realtime-all")
      .on("postgres_changes",{event:"*",schema:"public",table:"preparation"},(payload)=>{
        setPreparation(prev=>{
          const np={...prev};
          const r=payload.new;
          if(payload.eventType==="DELETE"){delete np[`${payload.old.center_id}_${payload.old.item_id}`];}
          else{np[`${r.center_id}_${r.item_id}`]=r;}
          return np;
        });
      })
      .on("postgres_changes",{event:"*",schema:"public",table:"centers"},()=>loadAll())
      .on("postgres_changes",{event:"*",schema:"public",table:"zones"},()=>loadAll())
      .on("postgres_changes",{event:"*",schema:"public",table:"sectors"},()=>loadAll())
      .on("postgres_changes",{event:"*",schema:"public",table:"items"},()=>loadAll())
      .on("postgres_changes",{event:"*",schema:"public",table:"supply_standards"},()=>loadAll())
      .on("postgres_changes",{event:"*",schema:"public",table:"warehouse"},()=>loadAll())
      .subscribe();
    return ()=>sb.removeChannel(channel);
  },[loadAll]);

  const getPrep=useCallback((cid,iid)=>preparation[`${cid}_${iid}`]||{received_quantity:0},[preparation]);
  const getRequired=useCallback((cid,iid)=>requirements[`${cid}_${iid}`]||0,[requirements]);

  const getWarehouseRemaining=useCallback((itemId)=>{
    const w=warehouse.find(w=>w.item_id===itemId);
    if(!w) return 0;
    const used=centers.filter(c=>c.active).reduce((s,c)=>s+(preparation[`${c.id}_${itemId}`]?.received_quantity||0),0);
    return w.initial_quantity-used;
  },[warehouse,centers,preparation]);

  const generateRequirements=useCallback(()=>{
    const r={};
    centers.filter(c=>c.active).forEach(center=>{
      items.filter(i=>i.is_active).forEach(item=>{
        const std=standards.find(s=>s.item_id===item.id);
        if(!std) return;
        let qty=0;
        if(std.calculation_type==="ambulance_team") qty=std.ambulance_qty*center.ambulance_teams_count;
        else if(std.calculation_type==="foot_team") qty=std.foot_qty*center.foot_teams_count;
        else if(std.calculation_type==="staff") qty=std.staff_qty*center.staff_count;
        else if(std.calculation_type==="fixed_manual") qty=std.fixed_qty;
        r[`${center.id}_${item.id}`]=qty;
      });
    });
    setRequirements(r);setReqGenerated(true);
    addAlert("✅ تم احتساب الاحتياجات لجميع المراكز","success");
  },[centers,items,standards,addAlert]);

  const updateReceived=useCallback(async(cid,iid,val)=>{
    const rec=Math.max(0,parseInt(val)||0);
    setPreparation(prev=>({...prev,[`${cid}_${iid}`]:{...prev[`${cid}_${iid}`],center_id:cid,item_id:iid,received_quantity:rec}}));
    const {error}=await sb.from("preparation").upsert({center_id:cid,item_id:iid,received_quantity:rec,last_update:new Date().toISOString()},{onConflict:"center_id,item_id"});
    if(error) addAlert("خطأ في الحفظ: "+error.message,"error");
  },[addAlert]);

  const stats=useMemo(()=>{
    const ac=centers.filter(c=>c.active);
    if(!reqGenerated) return {total:ac.length,ready:0,notReady:ac.length,readiness:0,totalShortage:0};
    let ready=0,totalShortage=0;
    ac.forEach(center=>{
      let allReady=true;
      items.filter(i=>i.is_active).forEach(item=>{
        const req=getRequired(center.id,item.id);
        const rec=getPrep(center.id,item.id).received_quantity||0;
        if(req>0&&rec<req) allReady=false;
        totalShortage+=Math.max(0,req-rec);
      });
      if(allReady) ready++;
    });
    return {total:ac.length,ready,notReady:ac.length-ready,readiness:ac.length>0?Math.round((ready/ac.length)*100):0,totalShortage};
  },[centers,items,requirements,preparation,reqGenerated,getRequired,getPrep]);

  const centerReadiness=useCallback((cid)=>{
    if(!reqGenerated) return 0;
    let tReq=0,tRec=0;
    items.filter(i=>i.is_active).forEach(item=>{
      const req=getRequired(cid,item.id);
      tReq+=req;tRec+=Math.min(getPrep(cid,item.id).received_quantity||0,req);
    });
    return tReq>0?Math.round((tRec/tReq)*100):0;
  },[items,getRequired,getPrep,reqGenerated]);

  if(!loggedIn) return <Login onLogin={u=>{setCurrentUser(u);setLoggedIn(true);addAlert(`مرحباً ${u.name}`,"success");}}/>;

  if(loading) return <div style={{minHeight:"100vh",background:"#0f172a",display:"flex",alignItems:"center",justifyContent:"center",color:"#94a3b8",fontSize:14}}>⏳ جاري التحميل...</div>;

  const lowStockCount=warehouse.filter(w=>getWarehouseRemaining(w.item_id)<w.minimum_threshold).length;
  const isAdmin=currentUser?.role==="admin";

  return(
    <div style={{fontFamily:"'Segoe UI',Tahoma,Arial,sans-serif",background:"#0f172a",minHeight:"100vh",color:"#e2e8f0",padding:20}}>
      <div style={{maxWidth:1400,margin:"0 auto"}}>
        <div style={{background:"#1e293b",borderRadius:10,padding:20,marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <h1 style={{margin:0,fontSize:20,color:"#38bdf8"}}>🕌 نظام إدارة الإمداد الطبي</h1>
            <p style={{margin:"5px 0 0",fontSize:12,color:"#64748b"}}>مرحباً {currentUser?.name} ({currentUser?.roleLabel})</p>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{width:8,height:8,background:"#10b981",borderRadius:"50%",boxShadow:"0 0 6px #10b981"}} title="متصل"/>
            {lowStockCount>0&&<Badge text={`⚠️ ${lowStockCount} مواد منخفضة`} color="#ef4444"/>}
            <button onClick={loadAll} style={{...BX}}>🔄</button>
            <button onClick={()=>setLoggedIn(false)} style={{...BX}}>تسجيل خروج</button>
          </div>
        </div>

        <div style={{position:"fixed",top:14,left:14,zIndex:9999,display:"flex",flexDirection:"column",gap:6,maxWidth:300}}>
          {alerts.map(a=><div key={a.id} style={{background:a.type==="success"?"#064e3b":a.type==="error"?"#7f1d1d":"#1e3a5f",border:`1px solid ${a.type==="success"?"#10b981":a.type==="error"?"#ef4444":"#3b82f6"}`,borderRadius:7,padding:"8px 14px",fontSize:12,color:"#fff",boxShadow:"0 4px 12px rgba(0,0,0,0.4)"}}>{a.msg}</div>)}
        </div>

        {!reqGenerated&&isAdmin&&(
          <div style={{background:"linear-gradient(135deg,#7c2d12,#9a3412)",border:"1px solid #ea580c",borderRadius:9,padding:16,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div><div style={{fontWeight:600,color:"#fed7aa"}}>⚠️ لم يتم احتساب الاحتياجات بعد</div></div>
            <button onClick={generateRequirements} style={{padding:"8px 16px",background:"#ea580c",border:"none",borderRadius:7,color:"#fff",fontWeight:600,cursor:"pointer"}}>احتساب الآن</button>
          </div>
        )}

        <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
          <Card icon="🏥" label="إجمالي المراكز" value={stats.total}/>
          <Card icon="✅" label="جاهزة" value={stats.ready} color="#10b981"/>
          <Card icon="📊" label="نسبة الجاهزية" value={`${stats.readiness}%`} color={stats.readiness>=80?"#10b981":"#f59e0b"}/>
          <Card icon="⚠️" label="النواقص" value={stats.totalShortage} color="#ef4444"/>
        </div>

        <div style={{background:"#1e293b",borderRadius:10,padding:20,textAlign:"center"}}>
          <h2 style={{color:"#38bdf8",marginBottom:10}}>النظام متصل بقاعدة البيانات ✅</h2>
          <p style={{color:"#94a3b8",fontSize:14}}>جميع البيانات محفوظة ومتزامنة بين جميع المستخدمين</p>
          <div style={{marginTop:20,display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <div style={{background:"#0f172a",padding:"10px 20px",borderRadius:7}}><strong style={{color:"#38bdf8"}}>{zones.length}</strong> نطاق</div>
            <div style={{background:"#0f172a",padding:"10px 20px",borderRadius:7}}><strong style={{color:"#38bdf8"}}>{sectors.length}</strong> قطاع</div>
            <div style={{background:"#0f172a",padding:"10px 20px",borderRadius:7}}><strong style={{color:"#38bdf8"}}>{centers.length}</strong> مركز</div>
            <div style={{background:"#0f172a",padding:"10px 20px",borderRadius:7}}><strong style={{color:"#38bdf8"}}>{items.length}</strong> مادة</div>
          </div>
        </div>
      </div>
    </div>
  );
}
