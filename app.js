const navlinks = document.querySelectorAll('header nav a');
const logolinks = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon')
const navbar = document.querySelector('header nav')
const navContact = document.querySelector("#contact-page")

document.querySelector("#hire-btn").addEventListener("click", ()=>  navContact.click());

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activepage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    header.classList.remove('active')
    setTimeout(() => {
        header.classList.add('active');
    }, 1100);
    
    navlinks.forEach(link => {
        link.classList.remove("active")
    });

    barsBox.classList.remove('active')
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 1100);

    sections.forEach(section => {
        section.classList.remove("active")
    });
}

navlinks.forEach((link, idx) => {
    link.addEventListener('click' , () =>{
        if(!link.classList.contains("active")) {
            activepage();
            link.classList.add("active");

            setTimeout(() => {
                sections[idx].classList.add("active");
            }, 1100);
        }
    });
});

logolinks.addEventListener('click' , () =>{ 
    if (!navlinks[0].classList.contains("active")){
        activepage();
        navlinks[0].classList.add("active");

        setTimeout(() => {
            sections[0].classList.add("active");
        }, 1100);
    };
});

const projectBtns = document.querySelectorAll('.resume-btn');
projectBtns.forEach((btn, idx) =>{
    btn.addEventListener('click', () => {
        
        const projectDetails = document.querySelectorAll('.resume-details');

        projectBtns.forEach(btn => {
            btn.classList.remove("active");
        });
        btn.classList.add("active");

        projectDetails.forEach(details => {
            details.classList.remove("active");
        });
        projectDetails[idx].classList.add("active");
    });
});


const arrowRight = document.querySelector('.projects-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.projects-box .navigation .arrow-left');

let index = 0;

const activeportfolio = () => {
    const imgslid = document.querySelector('.projects-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.projects-details');

    imgslid.style.transform = `translateX(calc(-${index * 100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
};

arrowRight.addEventListener('click', () => {
    if(index < 4) {
        index++;
        arrowLeft.classList.remove('disabled')
    }
    else{
        index = 5;
        arrowRight.classList.add('disabled')
    }

    activeportfolio();
});

arrowLeft.addEventListener('click', () => {
    if(index > 1) {
        index--;
        arrowRight.classList.remove('disabled')
    }
    else{
        index = 0;
        arrowLeft.classList.add('disabled')
    }
    
    activeportfolio();
});


const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail(){
    const bodyMessage =`Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}<br>`

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "shakil.sarkar3072@gmail.com",
        Password : "B605199D48C6F636449A67DDA84ECED4D3A7",
        To : 'shakil.sarkar3072@gmail.com',
        From : "shakil.sarkar3072@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if (message == "OK") {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
            })
        }
      }
    );
}

function checkInputs () {
    const items = document.querySelectorAll(".item");

    for( const item of items ) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () =>{
            checkEmail();
        })

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else{
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        })
    }
}

function checkEmail () {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTextEmail = document.querySelector(".error-text.email");

    if(!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if(email.value != "") {
            errorTextEmail.innerText = "Enter a valid email address";
        }
        else{
            errorTextEmail.innerText = "Email Address can't be blank";
        }
    }

    else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();

    if(!fullName.classList.contains("error") && !email.classList.contains("error") &&  !phone.classList.contains("error") &&  !subject.classList.contains("error") && !mess.classList.contains("error")) {
        sendEmail();

        form.reset();
        return false;
    }
});