/**
* @class Cart
*/
function Cart() {
    this.products = []
}
Cart.prototype.setProducts = function (product) {
    this.products.push(product)
}
Cart.prototype.unsetProducts = function (index) {
    this.products.splice(index, 1)
}
Cart.prototype.getProducts = function () {
    return this.products
}
Cart.prototype.isEmpty = function () {
    return this.products.length == 0
}
Cart.prototype.clearProducts = function () {
    this.products.splice(0, 1)
}
Cart.prototype.getProduct = function (index) {
    return this.products[index]
}
/**
* @class Offer
* @property {string} email
* @property {number} postCode
* @property {string} phoneNumber
* @property {string} town
*/

function Offer(email, postCode, phoneNumber, town){
    this.email = email
    this.postCode = postCode
    this.phoneNumber =  phoneNumber
    this.town =  town
}
const regEmail = /[a-z0-9]+\@[a-z]+\.[a-z]{2,}/i
const regphoneNumber = /\([0-9]{3}\s[0-9]{3}\-[0-9]{2}-[0-9]{2}\)/
const regPostCode = /[0-9]+/
const regTown = /[A-Z]{1}[a-z]+$/
Offer.test = function (data, reg) {
    return reg.test(data)
}

/**
* @class Product
* @property {*} manufacturer
* @property {*} type
* @property {*} model
* @property {*} price
* @property {*} description
*/
function Product(
    manufacturer,
    type,
    model,
    price,
    description
){
    this.getManufacturer = function(){
        return manufacturer
    }
    this.getType = function(){
        return type
    }
    this.getModel = function(){
        return model
    }
    this.getPrice = function(){
        return price
    }
    this.getDescription = function(){
        return description
    }
    this.toString = function () {
        return '${'+this.getManufacturer()+'} ${'+this.getType()+'} ${'+ this.getModel()+'} ${'+this.getPrice()+'}'
    }
}
const ASC = "ASC"
const DESC = "DESC"
function Shop(products){
    this.products = products
    this.sortProduct = function (flag) {
        let callback
        switch (flag) {
            case ASC: {
                callback = function (first, last) {
                    return first.getPrice() > last.getPrice()
                }
                break
            }
            case DESC: {
                console.log(flag);
                callback = function (first, last) {
                    return first.getPrice() < last.getPrice()
                }
                break
            }
        }
        return this.products.sort(callback)
    }
    this.getProduct = function (index) {
        return Object.assign({}, this.products[index])
    }
    this.filter = function (category) {
        return products.filter((el) => el.getCategory() === category)
    }
    this.getShopProducts = function(){
        return this.products
    }
    this.listProducts = function(products = null){
        if(products == null){
            products = this.getShopProducts();
        }
        let result = ''
        let index = 0;
        for(let item of products){
            result = result + '#' + index++ + ' ' + item.toString() + "\r\n"
        }
        return result
    }
}

let fillShop = function(){
    let result = []
    for(let i=0; i < 10; i++){
        result.push(new Product("lorem"+ i, "lorem"+ i, getRandomInt(100, 105), getRandomInt(1, 207), "lorem"+ i ))
    }
    console.log(result);
    return result
}

let getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const validate = function () {
    let num = prompt("Enter your phone number")
    let mail = prompt("Enter your e-mail address")
    let code = prompt("Enter your post code")
    let city = prompt("Enter name your city")
    let order = new Offer(num, mail, code, city)
    const error = {
      phone: "Phone number is not correct!",
      mail: "Email is not correct!",
      post: "Post code number is not correct!",
      city: "City is not correct!"
    }
    console.log(order)
    if(!Offer.test(city, regTown)){
         alert(error.city)
         validate()
    }
    if(!Offer.test(num, regphoneNumber)){
         alert(error.phone)
         validate()
    }
    if(!Offer.test(mail, regEmail)){
         alert(error.mail)
         validate()
    }
    if(!Offer.test(code, regPostCode)){
         alert(error.post)
         validate()
    }
    alert('Your order sucssesfuly send')
}

let init = function(shop, cart){
     do{
        const cmd = prompt ("Enter the command")
        if(cmd == "exit") break
        switch (cmd) {
            case "list products": {
                alert(shop.listProducts())
                break
            }
            case "sort by price": {
                let sortCmd = prompt("enter type sort ASC or DESC")
                alert(shop.sortProduct(sortCmd))
                break
            }
            case "add product": {
                let numProduct = prompt("enter number of product")
                cart.setProducts(shop.getProduct(numProduct))
                break
            }
            case "view my product": {
                alert(cart.getProducts())
                break
            }
            case "offer": {
                if(cart.isEmpty()){
                    alert('You not added products to cart!!!')
                    break
                }
                validate()
                Cart.clearProducts()
                break
            }
            case "delete products": {
                if(cart.isEmpty()){
                    alert('You not added products to cart!!!')
                    break
                }
                cart.clearProducts()
                alert("Your cart is empty")
                break
            }
            default:
                alert(cmd + " no found")
                break
        }
    }while(true)
}
init(new Shop(fillShop()), new Cart());
