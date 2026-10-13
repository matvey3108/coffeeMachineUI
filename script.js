const buttonsCoffee = document.querySelectorAll('.coffee-button')
const billsCoffee = document.querySelectorAll('.bill')
const infoText = document.querySelector('.text-info')
const dropzone = document.querySelector('.bill-slot')

let balance = 0

buttonsCoffee.forEach(button => {
    button.addEventListener('click', infoCoffee)
})

billsCoffee.forEach(bill => {
    bill.addEventListener('mousedown', billCoffee)
})

function infoCoffee(event) {
    let btn = event.currentTarget
    if(balance < Number(btn.children[2].textContent.slice(0, -2))) {
        infoText.textContent = `Вы выбрали кофе ${btn.children[1].textContent}, с вас ${btn.children[2].textContent}, у вас не хватает средств проведения оплаты пополните баланс`
    } else {
        makingCoffee(btn)
    }
}
function billCoffee(event) {
    event.preventDefault()
    let bill = event.currentTarget

    bill.style.position = 'absolute'
    bill.style.zIndex = 1000
    document.body.append(bill)
    
    moveAt(event)

    function moveAt(e) {
        bill.style.left = e.pageX - bill.offsetWidth / 2 + 'px'
        bill.style.top = e.pageY - bill.offsetHeight / 2 + 'px'
    }

    function onMouseMove(e) {
        moveAt(e)
        bill.style.transform = 'rotate(90deg)'
    }
    
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)


        bill.style.transition = '' 
        bill.style.transform = 'rotate(0deg)'

        let billRect = bill.getBoundingClientRect()
        let zoneRect = dropzone.getBoundingClientRect()

        let billCenterX = billRect.left + billRect.width / 2
        let billCenterY = billRect.top + billRect.height / 2

        if (billCenterX > zoneRect.left && billCenterX < zoneRect.right &&
            billCenterY > zoneRect.top && billCenterY < zoneRect.bottom) {
            
            bill.remove() 
            depositCoffee(bill)
                
        }
    }
}

function depositCoffee(bill) {
    let billValue = Number(bill.getAttribute('data-value'))
    balance += billValue
    infoText.textContent = `Ваш баланс пополнен на ${billValue}, ваш баланс равен ${balance}`
}

function makingCoffee(coffee) {
    infoText.textContent = `Ваше ${coffee.getAttribute('data-name')} готовиться, подождите.`
    let seconds = 0
    let timerIndicator = setInterval(() => {
        infoText.textContent += '\n⬛'
        seconds += 1
        if(seconds > 5) {
            clearInterval(timerIndicator)
            console.log(coffee)
            if(balance === 0) {
                infoText.textContent = 'Ваше кофе готово'
            } else {
                infoText.textContent = `Ваше кофе готово, ваша сдача ${balance - Number(coffee.getAttribute('data-price').slice(0, -2))}€`
                balance = 0
            }
        }
    }, 1000);
    

}