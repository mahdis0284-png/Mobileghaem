let cart = [];


// اضافه کردن به سبد خرید

function addCart(name, price) {

 cart.push({
    name:name,
    price:price
});

localStorage.setItem("cart", JSON.stringify(cart));

showCart();

    alert("✅ محصول به سبد خرید اضافه شد");

}




// نمایش سبد خرید

function showCart() {

    let cartBox = document.getElementById("cart");
    let totalBox = document.getElementById("total");


    if(!cartBox) return;


    let html = "";
    let total = 0;


    cart.forEach(function(item,index){


        html += `

        <div>

        📦 ${item.name}

        <br>

        💰 ${item.price.toLocaleString()} تومان

        <br>

        <button onclick="removeCart(${index})">

        ❌ حذف

        </button>


        </div>

        <hr>

        `;


        total += item.price;


    });



    if(cart.length == 0){

        cartBox.innerHTML =
        "🛒 سبد خرید خالی است";


    }else{

        cartBox.innerHTML = html;

    }



    if(totalBox){

        totalBox.innerHTML =
        "💰 جمع کل: "+
        total.toLocaleString()+
        " تومان";

    }


}






// حذف از سبد

function removeCart(index){

    cart.splice(index,1);

    showCart();

}






// پاک کردن سبد

function clearCart(){

    cart=[];

    showCart();

}








// ثبت سفارش

function sendOrder(){


    if(cart.length == 0){

        alert("🛒 سبد خرید خالی است");

        return;

    }



    let name =
    document.getElementById("customerName").value;



    let phone =
    document.getElementById("phone").value;



    let instagram =
    document.getElementById("instagram").value;



if(name.trim() === ""){
    alert("نام و نام خانوادگی را وارد کنید.");
    return;
}

if(phone.trim() === ""){
    alert("شماره تماس را وارد کنید.");
    return;
}

if(phone.length < 11){
    alert("شماره تماس معتبر نیست.");
    return;
}



    let total = 0;

    let items = "";




    cart.forEach(function(item){


        items += item.name + " ، ";

        total += item.price;


    });





    // ذخیره سفارش

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];




    orders.push({

        name:name,

        phone:phone,

        instagram:instagram,

        items:items,

        total:total


    });





    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );





    // پیام واتساپ


    let message =

    "سلام فروشگاه موبایل قائم\n\n"+

    "👤 نام: "+name+

    "\n📞 شماره: "+phone+

    "\n📸 اینستاگرام: "+instagram+

    "\n\n📦 سفارش:\n"+items+

    "\n💰 مبلغ: "+

    total.toLocaleString()+

    " تومان";





  let link =

"https://api.whatsapp.com/send?phone=989360496995&text="

+ encodeURIComponent(message);




window.open(link, "_blank");

setTimeout(function () {
    cart = [];
    showCart();

    document.getElementById("customerName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("instagram").value = "";
}, 500);


}// جستجوی محصولات
function searchProduct() {

    let input = document.getElementById("searchInput").value.toLowerCase();

    let products = document.querySelectorAll(".product");

    products.forEach(function(product){

        let text = product.innerText.toLowerCase();

        if(text.indexOf(input) > -1){

            product.style.display = "";

        }else{

            product.style.display = "none";

        }

    });

}