// create object order
const order = {
    'coffee': null,
    'coffee_index': null,
    'extras': [null],
    'total': null,
    'email': null
}

// const coffees = [
//     {
//         'name': 'Americano Latte',
//         'description': 'Sweet, Chocolatey',
//         'price': 2.50,
//         'image_src': 'https://thumbs.dreamstime.com/b/latte-art-top-view-cup-coffee-white-background-showed-heart-cup-latte-art-top-view-cup-coffee-white-109437076.jpg',
//         'available': true
//     },
//     {
//         'name': 'Latte Express',
//         'description': 'Strong, Nutty',
//         'price': 1.50,
//         'image_src': 'https://thumbs.dreamstime.com/b/latte-art-top-view-cup-coffee-white-background-showed-heart-cup-latte-art-top-view-cup-coffee-white-109437076.jpg',
//         'available': false
//     }
// ]
// const extras = [
//     {
//         'name': 'Sugar',
//         'price': 0.00,
//         'available': true
//     },
//     {
//         'name': 'Semi-Skimmed Milk',
//         'price': 0.50,
//         'available': false
//     },
//     {
//         'name': 'Chocolate',
//         'price': 1.50,
//         'available': true
//     }
// ]

var PoundSterling = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
});

const updateOrderDetails = () => {
    const nameObj = document.querySelector('[data-coffee-order-name]')
    const descriptionObj = document.querySelector('[data-coffee-order-desc]')
    const priceObj = document.querySelector('[data-coffee-order-price]')
    const imageObj = document.querySelector('[data-coffee-order-image]') 
    nameObj.innerText = coffees[order.coffee_index].name
    descriptionObj.innerText = coffees[order.coffee_index].description
    priceObj.innerText = PoundSterling.format(coffees[order.coffee_index].price)
    imageObj.src = coffees[order.coffee_index].image_src
}

const updateOrderPrices = () => {
    const totalPriceObj = document.querySelector('[data-coffee-order-total]')
    order.extras = []
    let total = 0
    total += parseFloat(coffees[order.coffee_index].price)
    const extrasObjects = document.querySelectorAll('[data-extra]') // global var
    // for each extra, if it is checked add to order to order obj and add total price
    extrasObjects.forEach(extra => {
        if (extra.checked) {
            index = parseInt(extra.value)
            order.extras.push(extras[index].name)
            total += parseFloat(extras[index].price) // items price in string format 
        }
    })
    order.total = total
    totalPriceObj.innerText = PoundSterling.format(total)
}
const setOrderDetails = () => {
    // first stage fill out ui details
    const detailsObj = document.querySelector('[data-confirmed-order-details]')
    const totalObj = document.querySelector('[data-confirmed-order-total]')
    const joinedExtrasString = order.extras.join(', ')
    const singularityCatch_JoinedExtrasString = order.extras.length == 0 ? '' : ' with <b>' + joinedExtrasString + '</b>'
    const formattedTotal = PoundSterling.format(order.total)
    detailsObj.innerHTML = `Your order is: <b>${order.coffee}</b>${singularityCatch_JoinedExtrasString}`
    totalObj.innerHTML = `Total price: <b>${formattedTotal}</b>`
    // second stage fill out hidden inputs
    const hiddenCoffee = document.querySelector('[data-hidden-coffee]')
    const hiddenExtras = document.querySelector('[data-hidden-extras]')
    const hiddenTotal = document.querySelector('[data-hidden-total]')
    hiddenCoffee.value = order.coffee
    hiddenExtras.value = joinedExtrasString
    hiddenTotal.value = formattedTotal
}
const inputEmail = document.querySelector('[data-email-entry]') 
const updateID = () => {
    let value = inputEmail.value
    const deleteVals = ['gw', '@glow', '.ea.glasgow', '.sch.uk']
    for (let i = 0; i < deleteVals.length; i++) {
        if (value.search(deleteVals[i]) >= 0) {
            value = value.replace(deleteVals[i], '')
        }
    }
    const id = document.querySelector('[data-hidden-id')
    id.value = value
}
inputEmail.addEventListener('input', updateID)

// when first button clicked append coffee name by index to order
const setCoffee = (coffeeIndex) => {
    order.coffee = coffees[coffeeIndex].name
    order.coffee_index = coffeeIndex
    updateOrderDetails()
    updateOrderPrices()
}
// display coffees and extras
const main = () => { // only call when all data is loaded
    const insertCoffee = (index, name, description, price, image_src, available) => {
        if (name == '') return // prevent any items with no name
        let formatted_price = '';
        if (price.toString().search("£") < 0) {
              formatted_price = PoundSterling.format(price)
        }
        if (available.toLowerCase() == '') {
            document.querySelector('[data-coffees-container]').insertAdjacentHTML("beforeend", `
                <button type="button" class="card available" data-next onclick="setCoffee(${index})">
                    <div class="image-container"><img src='${image_src}' data-next></div>
                    <div class="text-container" data-next>
                    <h2 data-next>${name}<span data-next>${formatted_price}</span></h2>
                    <p data-next>${description}</p>
                    </div>
                </button>
            `)
        } else {
            document.querySelector('[data-coffees-container]').insertAdjacentHTML("beforeend", `
                <button type="button" class="card" disabled="true">
                    <div class="image-container"><img src='./outOfStock.jpg'></div>
                    <div class="text-container">
                    <h2>${name}<span data-next>${formatted_price}</span></h2>
                    <p>Item Unavailable</p>
                    </div>
                </button>
            `)    
        }
    }
    for (let index = 0; index < coffees.length; index++) {
        const name = coffees[index].name
        const description = coffees[index].description
        const price = coffees[index].price
        const image_src = coffees[index].image_src
        const available = coffees[index].available
        insertCoffee(index, name, description, price, image_src, available)   
    }
    const insertExtras = (index, name, price, available) => {
        if (name == '') return // prevent any items with no name
        let formatted_price = '';
        if (price.toString().search("£") < 0) {
              formatted_price = PoundSterling.format(price)
        }
        if (available.toLowerCase() == '') {
            document.querySelector('[data-extras-container]').insertAdjacentHTML("beforeend", `
            <label class="input available" onclick="updateOrderPrices()">
                <p>${name}<span>${formatted_price}</span></p>
                <input type="checkbox" value="${index}" data-extra>
                <span class="checkmark"></span>
            </label>
        `)
        } else {
            document.querySelector('[data-extras-container]').insertAdjacentHTML("beforeend", `
                <label class="input unavailable">
                    <p>${name}<span>${formatted_price}</span></p>
                    <span class="checkmark"></span>
                </label>
            `)
        }
    }
    for (let index = 0; index < extras.length; index++) {
        const name = extras[index].name
        const price = extras[index].price
        const available = extras[index].available
        insertExtras(index, name, price, available)   
    }
}
const resetChecks = () => {
    // if an extra is checked, uncheck it.
    const extrasObjects = document.querySelectorAll('[data-extra]') // global var
    extrasObjects.forEach(extra => {
        if (extra.checked) {
            extra.checked = false
        }
    })
    updateOrderPrices()
}