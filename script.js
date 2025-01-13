let order = [];
let totalPrice = 0;

function addToOrder(pizzaName, pizzaPrice) {
    // Kontrollera om pizzan redan finns i beställningen
    const existingPizza = order.find(pizza => pizza.name === pizzaName);
    if (existingPizza) {
        // Om pizzan redan finns, öka antalet
        existingPizza.quantity++;
        existingPizza.price = pizzaPrice * existingPizza.quantity;
    } else {
        // Lägg till ny pizza med mängd 1
        order.push({ name: pizzaName, price: pizzaPrice, quantity: 1 });
    }

    // Uppdatera den totala priset
    totalPrice = order.reduce((sum, pizza) => sum + pizza.price, 0);

    // Uppdatera beställningslistan i DOM
    updateOrderList();
}

function updateOrderList() {
    const orderListElement = document.getElementById('order-list');
    orderListElement.innerHTML = '';

    // Skapa en lista över alla beställningar
    order.forEach((pizza, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'order-item';
        listItem.innerHTML = `${pizza.name} (x${pizza.quantity}) - ${pizza.price} kr <button onclick="removeFromOrder(${index})">Ta bort</button>`;
        orderListElement.appendChild(listItem);
    });

    // Uppdatera det totala priset i DOM
    document.getElementById('total-price').textContent = `Totalpris: ${totalPrice} kr`;
}

function removeFromOrder(index) {
    const pizza = order[index];

    // Minska antalet eller ta bort pizzan helt
    if (pizza.quantity > 1) {
        pizza.quantity--;
        pizza.price = pizza.price / (pizza.quantity + 1) * pizza.quantity;
    } else {
        order.splice(index, 1);
    }

    // Uppdatera den totala priset
    totalPrice = order.reduce((sum, pizza) => sum + pizza.price, 0);

    // Uppdatera beställningslistan i DOM
    updateOrderList();
}

function submitOrder() {
    if (order.length === 0) {
        alert('Du måste lägga till minst en pizza innan du kan skicka beställningen!');
        return;
    }

    // Skapa en beställningsöversikt
    let orderSummary = 'Din beställning:\n';
    order.forEach(pizza => {
        orderSummary += `${pizza.name} (x${pizza.quantity}) - ${pizza.price} kr\n`;
    });
    orderSummary += `\nTotalpris: ${totalPrice} kr`;

    // Visa beställningsöversikten i en alert
    alert(`${orderSummary}\n\nTack för din beställning!`);

    // Töm beställningen och återställ totalpriset
    order = [];
    totalPrice = 0;
    updateOrderList();
}








function openGoogleMaps() {
    console.log("Map clicked!"); // Debugging line

    // Address you want to search in Google Maps
    const address = "Stockholm, Sweden";

    // Encode the address to make it URL-safe
    const encodedAddress = encodeURIComponent(address);

    // Open Google Maps with the address in a new tab
    window.open(`https://www.google.com/maps/place/Romario+Grill_Pizzeria_Manakish/@59.3831422,16.5109403,392m/data=!3m2!1e3!4b1!4m6!3m5!1s0x465ef32b60007f67:0x4a3591892ea11331!8m2!3d59.3831395!4d16.5135152!16s%2Fg%2F11ltv8z4gp?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoASAFQAw%3D%3D`, '_blank');
}