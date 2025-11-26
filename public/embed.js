(function(){
  const STYLE = `
    .tonsai-btn{position:fixed;z-index:2147483000;right:20px;bottom:20px;background:#FF7A00;color:#fff;border:none;border-radius:999px;padding:12px 16px;box-shadow:0 8px 30px rgba(0,0,0,.15);cursor:pointer;font-family:inherit}
    .tonsai-badge{background:#fff;color:#FF7A00;border-radius:999px;padding:2px 6px;font-size:12px;margin-left:8px}
    .tonsai-popup{position:fixed;z-index:2147483000;right:20px;bottom:90px;width:400px;height:600px;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,.15);overflow:hidden;background:#fff}
    .tonsai-header{height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 10px;background:linear-gradient(90deg,#0A75AD,#6A0DAD);color:#fff}
    .tonsai-iframe{width:100%;height:calc(100% - 44px);border:0}
    @media (max-width: 480px){.tonsai-popup{width:100%;height:100%;right:0;bottom:0;border-radius:0}}
  `;

  function ensureStyles(){
    if(document.getElementById('tonsai-styles')) return;
    const s=document.createElement('style');
    s.id='tonsai-styles';
    s.innerHTML=STYLE;document.head.appendChild(s);
  }

  function createUI(options){
    const { language='th', position='bottom-right', theme='light', host } = options||{};
    const origin = host || 'https://tonsai-chatbot.vercel.app';

    const btn=document.createElement('button');
    btn.className='tonsai-btn';
    btn.innerHTML='Chat';

    const badge=document.createElement('span');
    badge.className='tonsai-badge';
    badge.style.display='none';
    btn.appendChild(badge);

    const popup=document.createElement('div');
    popup.className='tonsai-popup';
    popup.style.display='none';

    const header=document.createElement('div');
    header.className='tonsai-header';
    header.innerHTML='<div>Tonsai Chat</div><div><button id="tonsai-min" style="margin-right:6px;background:transparent;border:0;color:#fff;cursor:pointer">_</button><button id="tonsai-close" style="background:transparent;border:0;color:#fff;cursor:pointer">✕</button></div>';

    const iframe=document.createElement('iframe');
    iframe.className='tonsai-iframe';
    iframe.src= origin + '/widget?lang=' + encodeURIComponent(language);

    popup.appendChild(header);popup.appendChild(iframe);

    function open(){ popup.style.display='block'; badge.style.display='none'; }
    function close(){ popup.style.display='none'; }

    btn.addEventListener('click',()=>{ if(popup.style.display==='none'){ open(); } else { close(); } });
    header.querySelector('#tonsai-min').addEventListener('click', close);
    header.querySelector('#tonsai-close').addEventListener('click', close);

    window.addEventListener('message', function(e){
      if(e?.data?.source==='tonsai-chat' && e?.data?.type==='new-message' && popup.style.display==='none'){
        badge.textContent=String(Math.min(9, Number(badge.textContent||'0')+1));
        badge.style.display='inline-block';
      }
    });

    document.body.appendChild(btn);
    document.body.appendChild(popup);
  }

  window.TonsaiChatbot = {
    init: function(options){ ensureStyles(); createUI(options||{}); }
  };
})();
