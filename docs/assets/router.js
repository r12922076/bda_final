(function(){
  const routes = {};
  function current(){ return (location.hash.replace(/^#\/?/,"") || "home").split("?")[0]; }
  function go(route){ location.hash = `#/${route}`; }
  function register(name, fn){ routes[name]=fn; }
  function render(){
    const name=current();
    document.querySelectorAll("[data-route]").forEach(a=>a.classList.toggle("active", a.dataset.route===name));
    const fn=routes[name] || routes.home;
    fn();
    window.scrollTo({top:0, behavior:"smooth"});
  }
  window.addEventListener("hashchange", render);
  window.PG = Object.assign(window.PG || {}, {register, render, go, current});
})();
