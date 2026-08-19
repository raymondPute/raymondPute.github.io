// ==============================
// MOBILE MENU
// ==============================
const menuBtn = document.getElementById("menu-btn");
const nav = document.querySelector("nav");

menuBtn.onclick = () => {
    nav.classList.toggle("active");
    if(nav.classList.contains("active")){
        menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }else{
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
};

// ==============================
// CLOSE MENU WHEN LINK CLICKED
// ==============================
document.querySelectorAll("nav a").forEach(link=>{
    link.addEventListener("click",()=>{
        nav.classList.remove("active");
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// ==============================
// ACTIVE NAVIGATION
// ==============================
let sections=document.querySelectorAll("section");
let navLinks=document.querySelectorAll("header nav a");

window.onscroll=()=>{
    sections.forEach(sec=>{
        let top=window.scrollY;
        let offset=sec.offsetTop-180;
        let height=sec.offsetHeight;
        let id=sec.getAttribute("id");

        if(top>=offset && top<offset+height){
            navLinks.forEach(link=>{
                link.classList.remove("active");
            });
            document.querySelector("header nav a[href*="+id+"]").classList.add("active");
        }
    });
};

// ==============================
// TYPING EFFECT
// ==============================
new Typed(".typing",{
    strings:[
        "Full-Stack Developer",
        "Flutter Specialist",
        "Machine Learning Generalist",
        "UI/UX Designer"
    ],
    typeSpeed:90,
    backSpeed:50,
    backDelay:1500,
    loop:true
});

// ==============================
// SCROLL REVEAL
// ==============================
const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:.2
});

document.querySelectorAll(
".skill-card,.project-card,.about-image,.about-text,.home-content,.home-image,.contact-desc,#contact-form"
).forEach(el=>{
    el.classList.add("fade-up");
    observer.observe(el);
});

// ==============================
// HEADER SHADOW
// ==============================
const header=document.querySelector("header");

window.addEventListener("scroll",()=>{
    if(window.scrollY>80){
        header.style.background="rgba(0,0,0,.92)";
        header.style.boxShadow="0 5px 25px rgba(0,0,0,.4)";
    }else{
        header.style.background="rgba(0,0,0,.4)";
        header.style.boxShadow="none";
    }
});

// ==============================
// FLOATING ICONS
// ==============================
document.querySelectorAll(".floating").forEach((icon,index)=>{
    let direction=1;
    setInterval(()=>{
        let y=parseFloat(icon.dataset.y||0);
        y+=direction;
        if(y>12) direction=-1;
        if(y<-12) direction=1;
        icon.dataset.y=y;
        icon.style.transform=`translateY(${y}px)`;
    },40+index*8);
});

// ==============================
// BUTTON RIPPLE
// ==============================
document.querySelectorAll(".btn").forEach(btn=>{
    btn.addEventListener("mousemove",(e)=>{
        const rect=btn.getBoundingClientRect();
        const x=e.clientX-rect.left;
        const y=e.clientY-rect.top;
        btn.style.setProperty("--x",x+"px");
        btn.style.setProperty("--y",y+"px");
    });
});

// ==============================
// PARALLAX PROFILE
// ==============================
const profile=document.querySelector(".home-image");

document.addEventListener("mousemove",(e)=>{
    if(!profile) return;
    const x=(window.innerWidth/2-e.clientX)/45;
    const y=(window.innerHeight/2-e.clientY)/45;
    profile.style.transform=`translate(${x}px,${y}px)`;
});

// ==============================
// SCROLL TO TOP
// ==============================
const topBtn=document.createElement("div");
topBtn.innerHTML='<i class="fa-solid fa-arrow-up"></i>';
topBtn.style.position="fixed";
topBtn.style.bottom="30px";
topBtn.style.right="30px";
topBtn.style.width="55px";
topBtn.style.height="55px";
topBtn.style.borderRadius="50%";
topBtn.style.background="#ff7b00";
topBtn.style.display="flex";
topBtn.style.alignItems="center";
topBtn.style.justifyContent="center";
topBtn.style.cursor="pointer";
topBtn.style.boxShadow="0 0 20px rgba(255,123,0,.5)";
topBtn.style.opacity="0";
topBtn.style.transition=".4s";
topBtn.style.zIndex="999";
document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{
    if(window.scrollY>500){
        topBtn.style.opacity="1";
    }else{
        topBtn.style.opacity="0";
    }
});

topBtn.onclick=()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
};

// ==============================
// LOADING ANIMATION
// ==============================
window.addEventListener("load",()=>{
    document.body.style.opacity="0";
    setTimeout(()=>{
        document.body.style.transition="opacity .8s";
        document.body.style.opacity="1";
    },100);
});



// ==============================
// FULLSCREEN PROJECT VIEWER
// ==============================
const pvOverlay  = document.getElementById("pv-overlay");
const pvClose    = document.getElementById("pv-close");
const pvIframe   = document.getElementById("pv-iframe");
const pvGallery  = document.getElementById("pv-gallery");
const pvImg      = document.getElementById("pv-img");
const pvPrev     = document.getElementById("pv-prev");
const pvNext     = document.getElementById("pv-next");
const pvDots     = document.getElementById("pv-dots");

let pvImages = [];
let pvIndex  = 0;

function pvSetDots(){
    pvDots.innerHTML = "";
    pvImages.forEach((_,i)=>{
        const d = document.createElement("span");
        d.className = "pv-dot" + (i===pvIndex?" active":"");
        d.onclick = ()=>{ pvIndex=i; pvSetImage(); };
        pvDots.appendChild(d);
    });
}
function pvSetImage(){
    pvImg.src = pvImages[pvIndex];
    pvSetDots();
}

document.querySelectorAll(".preview-wrap").forEach(wrap=>{
    wrap.addEventListener("click", ()=>{
        const type    = wrap.dataset.type;
        const title   = wrap.dataset.title || "";

        pvOverlay.classList.add("active");

        // reset both panels
        pvIframe.classList.remove("active");
        pvIframe.src = "";
        pvGallery.classList.remove("active");
        pvDots.innerHTML = "";

        if(type === "iframe"){
            pvIframe.src = wrap.dataset.src;
            pvIframe.classList.add("active");
        } else if(type === "image"){
            pvImages = [wrap.dataset.src];
            pvIndex  = 0;
            pvSetImage();
            pvGallery.classList.add("active");
            pvPrev.style.visibility = "hidden";
            pvNext.style.visibility = "hidden";
        } else if(type === "gallery"){
            // images from data-images attr
            pvImages = wrap.dataset.images ? wrap.dataset.images.split(",") : [];
            // if there's also an iframe for archive, open that separately — skip here
            pvIndex = 0;
            if(pvImages.length > 0){
                pvSetImage();
                pvGallery.classList.add("active");
                pvPrev.style.visibility = pvImages.length > 1 ? "visible" : "hidden";
                pvNext.style.visibility = pvImages.length > 1 ? "visible" : "hidden";
            } else if(wrap.dataset.iframe){
                pvIframe.src = wrap.dataset.iframe;
                pvIframe.classList.add("active");
            }
        }
    });
});

pvPrev.addEventListener("click", ()=>{
    pvIndex = (pvIndex - 1 + pvImages.length) % pvImages.length;
    pvSetImage();
});
pvNext.addEventListener("click", ()=>{
    pvIndex = (pvIndex + 1) % pvImages.length;
    pvSetImage();
});

pvClose.addEventListener("click", ()=>{
    pvOverlay.classList.remove("active");
    pvIframe.src = "";
});
pvOverlay.addEventListener("click", (e)=>{
    if(e.target === pvOverlay){
        pvOverlay.classList.remove("active");
        pvIframe.src = "";
    }
});
document.addEventListener("keydown", (e)=>{
    if(!pvOverlay.classList.contains("active")) return;
    if(e.key === "Escape"){ pvOverlay.classList.remove("active"); pvIframe.src=""; }
    if(e.key === "ArrowRight"){ pvIndex=(pvIndex+1)%pvImages.length; pvSetImage(); }
    if(e.key === "ArrowLeft"){ pvIndex=(pvIndex-1+pvImages.length)%pvImages.length; pvSetImage(); }
});

// ==============================
// AJAX CONTACT FORM SUBMISSION
// ==============================
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if(contactForm){
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Change button state
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;
        
        // Prepare data
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        // Send via AJAX
        fetch('https://formsubmit.co/ajax/raymondpute22@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                // Success
                formStatus.style.display = "block";
                formStatus.style.color = "#22c55e"; // green
                formStatus.innerText = "Message sent successfully! I'll get back to you soon.";
                contactForm.reset();
            } else {
                // FormSubmit Error
                formStatus.style.display = "block";
                formStatus.style.color = "#ef4444"; // red
                formStatus.innerText = "Failed to send message. Please try again later.";
            }
        })
        .catch(error => {
            console.log(error);
            formStatus.style.display = "block";
            formStatus.style.color = "#ef4444";
            formStatus.innerText = "An error occurred. Make sure you are connected to the internet.";
        })
        .finally(() => {
            // Restore button
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            
            // Hide status after 5 seconds
            setTimeout(()=>{ formStatus.style.display = "none"; }, 5000);
        });
    });
}

// ==============================
// CONSOLE MESSAGE
// ==============================
console.log("%cPortfolio Developed Successfully", "color:#ff7b00;font-size:18px;font-weight:bold;");
