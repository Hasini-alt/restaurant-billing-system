// Prices
const prices = {
    paneer: 180,
    lollipop: 220,
    butterChicken: 250,
    paneerMasala: 200,
    biryani: 220,
    paneerBiryani: 240,
    coffee: 100,
    lassi: 60,
    gulab: 80,
    icecream: 90
};

// Item Names
const itemNames = {
    paneer: "Paneer Tikka",
    lollipop: "Chicken Lollipop",
    butterChicken: "Butter Chicken",
    paneerMasala: "Paneer Butter Masala",
    biryani: "Chicken Biryani",
    paneerBiryani: "Paneer Biryani",
    coffee: "Cold Coffee",
    lassi: "Sweet Lassi",
    gulab: "Gulab Jamun",
    icecream: "Ice Cream"
};

// Quantities
const quantities = {
    paneer: 0,
    lollipop: 0,
    butterChicken: 0,
    paneerMasala: 0,
    biryani: 0,
    paneerBiryani: 0,
    coffee: 0,
    lassi: 0,
    gulab: 0,
    icecream: 0
};

// Generate Bill Number Once
let billNo = localStorage.getItem("billNo");

if (!billNo) {
    billNo = 1000;
}

billNo = Number(billNo) + 1;
localStorage.setItem("billNo", billNo);

// Change Quantity
function changeQty(item, value) {
    quantities[item] += value;

    if (quantities[item] < 0) {
        quantities[item] = 0;
    }

    document.getElementById(item + "Qty").innerText = quantities[item];

    updateBill();
}

// Update Bill
function updateBill() {
    let total = 0;
    let bill = "";

    const customerName = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    bill += "<center><h3>🍴 Hyderabadi Restaurant</h3></center>";
    bill += "<hr>";
    bill += "Bill No: " + billNo + "<br>";
    bill += "Date: " + date + "<br>";
    bill += "Time: " + time + "<br>";

    if (customerName) {
        bill += "Customer: " + customerName + "<br>";
    }

    if (phone) {
        bill += "Phone: " + phone + "<br>";
    }

    bill += "<hr>";

    let hasItems = false;

    for (let item in quantities) {
        if (quantities[item] > 0) {
            hasItems = true;

            const cost = quantities[item] * prices[item];
            total += cost;

            bill += `
                <div>
                    ${itemNames[item]} × ${quantities[item]}
                    = ₹${cost}
                </div>
            `;
        }
    }

    if (!hasItems) {
        document.getElementById("bill").innerHTML = "No items selected";
        return;
    }

    const gst = total * 0.05;
    const finalTotal = total + gst;

    bill += "<hr>";
    bill += `<div>Subtotal: ₹${total}</div>`;
    bill += `<div>GST (5%): ₹${gst.toFixed(2)}</div>`;
    bill += `<h3>Total: ₹${finalTotal.toFixed(2)}</h3>`;
    bill += "<hr>";
    bill += "<center>🙏 Thank You! Visit Again 😊</center>";

    document.getElementById("bill").innerHTML = bill;
}

// Reset Order
function resetOrder() {
    for (let item in quantities) {
        quantities[item] = 0;
        document.getElementById(item + "Qty").innerText = 0;
    }

    document.getElementById("bill").innerHTML = "No items selected";

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
}

// Print Bill
function printBill() {
    window.print();
}