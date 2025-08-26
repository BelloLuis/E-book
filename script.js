// Colores de sección
const sectionColors = {
    'i am': '#850808',
    'lyrics note': '#8b0b76',
    'qr list': '#09274d',
    'administracion': '#6e98e6',
    'marketing': '#E67E22',
    'trabajos': '#4b2606',
    'contacto': '#0f62fe'
};

// Mostrar sección
function mostrarSeccion(id) {
    document.querySelectorAll("section").forEach(sec => { sec.classList.remove("active"); sec.style.opacity=0; });
    const section = document.getElementById(id);
    section.classList.add("active");
    setTimeout(()=>section.style.opacity=1,50);

    // Actualizar nav y colores
    const navButtons = document.querySelectorAll("nav button");
    navButtons.forEach(btn=>btn.style.background="none");

    const activeButton = Array.from(navButtons).find(b => b.getAttribute("onclick").includes(`'${id}'`));
    if(activeButton) {
        activeButton.style.background = sectionColors[id];
        // Centrar botón activo
        activeButton.scrollIntoView({ behavior: "smooth", inline: "center" });
    }

    document.querySelectorAll("header, nav, footer").forEach(el=>el.style.background=sectionColors[id]);
}

// Carrusel automático
function iniciarCarruseles() {
    document.querySelectorAll(".carousel").forEach(carousel=>{
        let items=carousel.querySelectorAll(".carousel-item");
        if(items.length===0) return;
        let index=0;
        setInterval(()=>{
            items[index].classList.remove("active");
            index=(index+1)%items.length;
            items[index].classList.add("active");
        },4000);
    });
}

// Parallax scroll
function parallaxScroll() {
    document.querySelectorAll(".parallax").forEach(el=>{
        let speed = parseFloat(el.dataset.speed) || 0.3;
        let offset = window.scrollY * speed;
        el.style.transform = `translateY(${offset}px)`;
    });
}

// Inicializar
document.addEventListener("DOMContentLoaded", ()=>{
    iniciarCarruseles();
    window.addEventListener("scroll", parallaxScroll);
    
    // Centrado automático de nav al hacer scroll sobre ella
    const nav = document.querySelector("nav");
    nav.addEventListener("wheel", e=>{
        e.preventDefault();
        nav.scrollLeft += e.deltaY;
    });
});
