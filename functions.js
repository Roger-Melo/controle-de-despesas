function calculatePrice() {
    var valor1 = document.getElementById('copies').value;
    var valor2 = 0.15;
    var valor_total = valor1 * valor2;

    document.getElementById('value').innerHTML = valor_total.toFixed(2);
}

const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const nome = document.querySelector('#text')
const curso = document.querySelector('#course')
const turma = document.querySelector('#turma')
const copias = document.querySelector('#copies')
const data = document.querySelector('#data')
const pago = document.querySelector('#payment')
const valorTotalCopias = document.querySelector('#value')


const localStorageTransctions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransctions : []

const removeTransction = ID => {
    transactions = transactions.filter(transaction =>
        transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = ({ amount, name, id, course, turma, date, copy}) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    /* const CSSClass = pay = "Sim" ? 'minus' : 'plus' */

    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
    
    <table>
        <tr>
            <th>${name}</th>
        </tr>
        <tr>
            <td><strong>Curso: </strong> ${course}</td>
        </tr>
        <tr>
            <td><strong>Turma: </strong> ${turma}</td>
        </tr>
    </table>

    <span><strong>Data: </strong> ${date} <br></span>  

    <span>
        <strong>Qnt.: </strong> ${copy} <br>
        <p>R$ ${amountWithoutOperator.toFixed(2)}</span></p>
        <button class="delete-btn" onClick="removeTransction(${id})">
        x
        </button>
        
    `
    transactionsUl.append(li)

}

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

const getTotal = transactionsAmounts => transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)

const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(({ amount }) => amount)
    const total = getTotal(transactionsAmounts)
    const income = getIncome(transactionsAmounts)
    const expense = getExpenses(transactionsAmounts)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (
    transactionName, transactionCourse,
    transactionClass, transactionCopies,
    transactionData, transactionPay, transactionValue
) => {
    transactions.push({
        id: generateID(),
        name: transactionName,
        course: transactionCourse,
        turma: transactionClass,
        copy: transactionCopies,
        date: transactionData,
        pay: transactionPay,
        amount: Number(transactionValue)
    })
}

const cleanInputs = () => {
    nome.value = ""
    curso.value = ""
    turma.value = ""
    copias.value = ""
    data.value = ""
    pago.value = ""
    valorTotalCopias.innerHTML = 0.00
}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = nome.value.trim()
    const transactionCourse = curso.value.trim()
    const transactionClass = turma.value.trim()
    const transactionCopies = copias.value.trim()
    const transactionData = data.value
    const transactionPay = pago.value.trim()
    const transactionValue = valorTotalCopias.innerHTML
    const isSomeInputEmpty = transactionName === '' || transactionCourse === '' || transactionClass === '' || transactionCopies === '' || transactionData === ''

    if (isSomeInputEmpty) {
        alert('Por favor, preencha todos os dados')
        return
    }


    addToTransactionsArray(transactionName, transactionCourse, transactionClass, transactionCopies, transactionData, transactionPay, transactionValue)
    init()
    updateLocalStorage()
    cleanInputs()



}


form.addEventListener('submit', handleFormSubmit)



