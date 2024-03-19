

const visidanmisi = document.querySelector(".container-visi-dan-misi")
const education = document.querySelector(".education");
const box = document.querySelectorAll(".container-education .education .box");
const boxskills = document.querySelectorAll(".container-skills .skills .box");
const imgskills = document.querySelectorAll(".container-skills .skills .box img");
const wdi = document.querySelector(".container-skills .web-development-img");
const skills = document.querySelector(".container-skills .skills");
const dgi = document.querySelector(".container-skills .digital-marketing-img");
const btn = document.querySelector(".container-feedback .feedback form input[type=button]");
const nama = document.querySelector(".container-feedback .feedback form .container-nama input[type=text]");
const email = document.querySelector(".container-feedback .feedback form .container-email input[type=text]");
const saran = document.querySelector(".container-feedback .feedback form .container-saran textarea");
const liButton = document.querySelectorAll(".navbar a");
const formkp = document.querySelector("#formkp");
const buttonFormkp = document.querySelector(".admin");
const buttonAdmin = document.querySelector("#buttonadmin");
const nameAdmin = document.querySelector("#name");
const passwordAdmin = document.querySelector("#password");


liButton.forEach(e => {
   e.addEventListener("click", () => {
      liButton.forEach(e => {
         e.classList.remove("activeA")
      })
     e.classList.add("activeA")
   })
})


window.addEventListener("scroll", () => {
 const  containerAboutbottom = visidanmisi.getBoundingClientRect().top;
 const educationTop = education.getBoundingClientRect().top;
 const skillsTop = skills.getBoundingClientRect().top;

 if (containerAboutbottom <= window.innerHeight) {
    visidanmisi.classList.add("activeabout");
 } else {
   visidanmisi.classList.remove("activeabout");
 }

   

  if (educationTop <= window.innerHeight) {
   box.forEach(e => {
      e.classList.add("activeBox");
   }) 
  } else {
   box.forEach(e => {
      e.classList.remove("activeBox");
   })
  }

  if (skillsTop <= window.innerHeight) {
   boxskills[0].classList.add("activeskills1");
   boxskills[1].classList.add("activeskills2");
  } else {
   boxskills[0].classList.remove("activeskills1");
   boxskills[1].classList.remove("activeskills2");
  }
 
})

imgskills[1].addEventListener("click" ,()=> {
      dgi.classList.add("activedmi")
})

imgskills[0].addEventListener("click", () => {
  wdi.classList.add("activewdi");
})


window.addEventListener("click", (e) => {
   if (e.target !== imgskills[1]) {
      dgi.classList.remove("activedmi")
   }
   if (e.target !== imgskills[0]) {
      wdi.classList.remove("activewdi");
   }
})




btn.addEventListener("click", () => {
   if (nama.value == "" && email.value == "" &&  saran.value == "" || nama.value && email.value == "" && saran.value == "" || nama.value && email.value && saran.value == "" || nama.value == "" && email.value  && saran.value == "" || nama.value == "" && email.value == "" && saran.value || nama.value == "" && email.value && saran.value || nama.value && email.value && saran.value == "") {
       alert("the data you sent is empty or there is one that is empty")
   } else {     
        const Nama = nama.value;
        const Email = email.value;
        const Saran = saran.value;

         saran.value = "";
         nama.value = "";
         email.value = "";
         

       fetch('http://localhost:3000/feedback', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({ 
           nama: Nama,
           email: Email,
           saran: Saran,
           time: getTime(),
        }),
       })
       .then(response => response.json())
       .then(data => {
           console.log('Response dari server:', data);
       })
       .catch(error => {
           console.error('Error:', error);
       });
   alert("data berhasil hasil masuk");
    }
})


buttonFormkp.addEventListener("click", ()=> {
   formkp.classList.toggle("activeform")
})


buttonAdmin.addEventListener("click", () => {
   const nama = nameAdmin.value;
   const pass = passwordAdmin.value;

 if (!nama  ||  !pass) {
   alert("password atau username ada yang kosong atau salah satunya");
 } else if (nama == "admin" && pass == "admin") {
   location.href = "/admin";
 }  else {
   alert("password dan username yang anda masukkan salah");
 }

})


function getTime() {
   var waktuSekarangUTC = new Date();
   var zonaWaktuLokal = "Asia/Jakarta";
   var waktuSekarangLokal = waktuSekarangUTC.toLocaleString('en-ID', { timeZone: zonaWaktuLokal });
   var stringWaktuLokal = `${waktuSekarangLokal.substr(0, 10)} ${tambahkanNol(waktuSekarangLokal.substr(12))}`;
   return stringWaktuLokal;
 }

 function tambahkanNol(angka) {
   return angka < 10 ? "0" + angka : angka;
 }

