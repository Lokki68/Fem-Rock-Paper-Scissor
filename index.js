const triangle = document.querySelector('.triangle')
const cons = document.querySelectorAll('.con')
const computers = document.querySelectorAll('.computer')
const userInfo = document.querySelector('.user')
const machineInfo = document.querySelector('.machine')
const winModal = document.querySelector('.win-modal')
const winner = winModal.querySelector('.winner')
const scoreDisplay = document.querySelector('#score')
const rulesModal = document.querySelector('.rule-modal')
const rulesImg = rulesModal.querySelector('.rule-img')

const rulesBtn = document.querySelector('.btn-rule')
const closeBtn = rulesImg.querySelector('.close')
const playAgainBtn = document.querySelector('.play')
const resetBtn = document.querySelector('.reset')

rulesBtn.addEventListener('click', toggleRules)
closeBtn.addEventListener('click', toggleRules)

function toggleRules() {
  rulesModal.classList.toggle('show')
  rulesImg.classList.toggle('show')
}

const random = Math.floor(Math.random() * 3)

function displayScore() {
  const localScore = localStorage.getItem('scoreGame')

  if(!localScore) {
    localStorage.setItem('scoreGame', "0")
  }

  scoreDisplay.innerText = localScore
}

displayScore()

cons.forEach((con, index) => {
  con.addEventListener('click', () => {
    showResult(con, computers[random])

    endGame(whoWin(Number(index)))

  } )
})

function editScore(action) {
  if(action === 'add') {
    let actualScore = Number(localStorage.getItem('scoreGame'))
    actualScore++
    localStorage.setItem('scoreGame', JSON.stringify(actualScore))
  }
}

function endGame(win) {

  if (win === 'user') {
    winner.innerText = 'You win'
    editScore('add')
  } else if(win === 'computer') {
    winner.innerText = 'You loose'
  } else {
    winner.innerText = 'Tie !!!'
  }

  winModal.style.display = 'grid'
}

function showResult(userChoice, computerChoice) {
  showInfo()
  hiddenConsAndComputers()
  displayPlayerChoice(userChoice)
  displayComputerChoice(computerChoice)
}

function showInfo() {
  userInfo.classList.toggle('hidden')
  machineInfo.classList.toggle('hidden')
}


function hiddenConsAndComputers() {
  cons.forEach(item => item.style.display = 'none')
  computers.forEach(item => item.style.display = 'none')
}

function displayPlayerChoice(user) {
  triangle.classList.add('hidden')
  user.style.display = 'block'
  user.classList.add('left')
}

function displayComputerChoice(computer) {
  computer.style.display = 'block'
  computer.classList.add('right')
}

function whoWin(user) {
  if(
      user === 0 && random === 2 ||
      user === 1 && random === 0 ||
      user === 2 && random === 1
   ) {
    // userWin
    return 'user'
  } else if(
      user === random
  ) {
    // Tie
    return 'tie'
  } else {
    // computer win
    return 'computer'
  }
}

function reloadPage() {
  window.location.reload()
}

playAgainBtn.addEventListener('click', reloadPage )
resetBtn.addEventListener('click', () => {
  localStorage.removeItem('scoreGame')
  reloadPage()
})

