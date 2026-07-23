document.addEventListener('DOMContentLoaded', () => {
    // ── Cart functionality ──────────────────────────────────────────────
    const cartButtons = document.querySelectorAll('.bx-cart-add');

    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const itemBox = button.closest('.box1');
            const itemTitle = itemBox.getAttribute('data-title');
            const itemPrice = itemBox.getAttribute('data-price');
            const itemImg = itemBox.getAttribute('data-img');

            const cartItem = {
                title: itemTitle,
                price: itemPrice,
                img: itemImg
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));

            alert('Item added to cart');
        });
    });

    // ── Mobile hamburger menu ───────────────────────────────────────────
    const menuIcon = document.getElementById('menu-icon');
    const navbar   = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuIcon.classList.toggle('bx-x');
        });

        // Close menu when any nav link is clicked
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            });
        });
    }

    // Close menu on scroll
    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('bx-x');
    });
});

function clicker(){
    var ker= document.getElementById("change");
    var ber= document.getElementById("form");
    var mem=document.getElementById("fields");
    var sec=document.getElementById("hiders");

    if(!mem.checkValidity()){
        ker.innerHTML="<h4 style=font-size: 50px;>Enter Correct Email!</h4>";
    } else {
        ker.innerHTML="<h4 style=font-size: 50px;>Thanks For Signing Up!</h4>";
        ber.innerHTML="";
        sec.innerHTML="";
    }
}

function learn(){
    location.href="women.html";
}

function learner(){
    location.href="mens.html";
}
