let price = 3.26;
// let cid = [
//   ["PENNY", 1.01],
//   ["NICKEL", 0],
//   ["DIME", 0],
//   ["QUARTER", 0],
//   ["ONE", 0],
//   ["FIVE", 0],
//   ["TEN", 0],
//   ["TWENTY", 0],
//   ["ONE HUNDRED", 0]
// ];

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const cash = document.getElementById('cash')
const purchase = document.getElementById('purchase-btn')
const change = document.getElementById('change-due')
const priceText = document.getElementById('price')

let displayCoins = [0, 0, 0, 0, 0, 0, 0, 0, 0]

priceText.innerText = `Total: $${price}`

purchase.addEventListener('click', ()=>{
  if (cash.value < price) {
    alert('Customer does not have enough money to purchase the item')
    return
  } else if (parseFloat(cash.value) === price) { 
    change.innerText = 'No change due - customer paid with exact cash'
    return
  }

  const changeTotal = parseFloat(cash.value) - price
  if (checkFund(changeTotal) != -1) {
    getChange(changeTotal)
  }

  displayCoins = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  
})

const checkFund = (changeCoin) => {
  let cashInDrawer = 0
  cid.forEach((coin) => {
    cashInDrawer += coin[1]
  })
  cashInDrawer = parseFloat(cashInDrawer.toFixed(2))
  if (cashInDrawer < changeCoin) {
    change.innerText = 'Status: INSUFFICIENT_FUNDS'
    return -1
  } else if (cashInDrawer === changeCoin) {
    change.innerText = 'Status: CLOSED'
    editStatus(-1, changeCoin)
    return -1
  }
}

const getChange = (changeCoin) => {
  let changeTotal = changeCoin
  while (changeTotal > 0 ) {
    switch (true) {
      case (changeTotal >= 100) && (cid[8][1] >= 100):
        changeTotal = updateValues(changeTotal, 8, 100)
        break
      case (changeTotal >= 20) && (cid[7][1] >= 20):
        changeTotal = updateValues(changeTotal, 7, 20)
        break
      case (changeTotal >= 10) && (cid[6][1] >= 10):
        changeTotal = updateValues(changeTotal, 6, 10)
        break
      case (changeTotal >= 5) && (cid[5][1] >= 5):
        changeTotal = updateValues(changeTotal, 5, 5)
        break
      case (changeTotal >= 1) && (cid[4][1] >= 1):
        changeTotal = updateValues(changeTotal, 4, 1)
        break
      case (changeTotal >= 0.25) && (cid[3][1] >= 0.25):
        changeTotal = updateValues(changeTotal, 3, 0.25)
        break
      case (changeTotal >= 0.1) && (cid[2][1] >= 0.1):
        changeTotal = updateValues(changeTotal, 2, 0.1)
        break
      case (changeTotal >= 0.05) && (cid[1][1] >= 0.05):
        changeTotal = updateValues(changeTotal, 1, 0.05)
        break
      case (changeTotal >= 0.01) && (cid[0][1] >= 0.01):
        changeTotal = updateValues(changeTotal, 0, 0.01)
        break
      default:
        if (changeTotal != 0) {
          changeTotal = -1
          console.log("liada grande")
        }
        break
    }
  } 

  if ( changeTotal === -1) {
    change.innerText = 'Status: INSUFFICIENT_FUNDS'
    return
  } else {
    change.innerText = 'Status: OPEN'
    editStatus(0, changeCoin)
  }

} 

const updateValues = (changeTotal, num, value) => {
  cid[num][1] = parseFloat((cid[num][1] - value).toFixed(2))
  displayCoins[num] = parseFloat((displayCoins[num] + value).toFixed(2))
  return parseFloat((changeTotal-value).toFixed(2))
}

const editStatus = (num, changeCoin) => {
  const amount = ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE HUNDRED"]
  if (num != -1) {
    for (let i=displayCoins.length-1; i>=0; i--) {
      if (displayCoins[i] !== 0) {
        change.innerText += ` ${amount[i]}: $${displayCoins[i]}`
      }
    }
  } else {
    let cidArr = []
    cid.forEach((number) => cidArr.push(number[1]))
    
    for (let i=cidArr.length-1; i>=0; i--) {
      if (cidArr[i] !== 0 || checkStarter(changeCoin) >= i) {
        change.innerText += ` ${amount[i]}: $${cidArr[i]}`
      }
    }
  }
  console.log(change.innerText)
}

const checkStarter = (change) => {
  let index = 0
  switch (true) {
    case change >= 100:
      index = 8
      break
    case change >= 20:
      index = 7
      break
    case change >= 10:
      index = 6
      break
    case change >= 5:
      index = 5
      break
    case change >= 1:
      index = 4
      break
    case change >= 0.25:
      index = 3
      break
    case change >= 0.1:
      index = 2
      break
    case change >= 0.05:
      index = 1
      break
    case change >= 0.01:
      index = 0
      break
  }
  return index
}