  const browserFrame = document.getElementById('browserFrame');
  document.querySelectorAll('#deviceToggle button').forEach(b=>{
    b.onclick = ()=>{
      document.querySelectorAll('#deviceToggle button').forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
      const w = b.dataset.w;
      browserFrame.style.width = (w==='full') ? '' : w+'px';
      browserFrame.style.maxWidth = '100%';
    };
  });
