const cover = document.getElementById("cover")
const restart = document.getElementById("restart")
const yourMove = document.getElementById("your-move")
const game = document.getElementById("game")
const moveButtons = document.querySelectorAll("[data-move]")
const announcement = document.querySelector("#result p")
const compImage = document.getElementById("comp-move")
const score = document.getElementById("score")

const rpsls = ["rock", "paper", "scissors", "lizard", "spock"]

const winningMoves = {
	scissors: new Set(["paper", "lizard"]),
	spock: new Set(["rock", "scissors"]),
	paper: new Set(["rock", "spock"]),
	lizard: new Set(["spock", "paper"]),
	rock: new Set(["lizard", "scissors"])
}

moveButtons.forEach(
	element =>
		(element.onclick = () => {
			const move = element.dataset.move
			const cmove = computerMove()
			yourMove.src = `./images/icon-${move}.svg`
			yourMove.alt = move
			yourMove.parentElement.setAttribute("data-result", move)
			compImage.parentElement.setAttribute("data-result", cmove)
			compImage.src = `./images/icon-${cmove}.svg`
			compImage.alt = cmove
			const result = play(move, cmove)
			announcement.innerHTML = `YOU ${result}`
			cover.classList.add("hide")
			game.classList.remove("hide")
			if (result === "WIN") score.innerText++
		})
)
restart.onclick = () => {
	cover.classList.remove("hide")
	game.classList.add("hide")
}

function computerMove() {
	return rpsls[Math.floor(Math.random() * rpsls.length)]
}

function play(you, computer) {
	if (you === computer) return "TIE"
	if (winningMoves[you].has(computer)) return "WIN"
	return "LOSE"
}
