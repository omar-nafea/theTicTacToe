const container = document.querySelector('.container');
const winning_combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let next_move = "X";
let board = [];
let isGameActive = true;
let holder = document.querySelector('.result');
let theHold = document.querySelector(".thehold");
const reset = document.querySelector('.reset');
const image_input = document.querySelector("#image-input");
const image_tag = document.createElement('img');
const image_input_2 = document.querySelector("#image-input-2");
const image_tag_2 = document.createElement('img');
const div_one = document.getElementById('display-image')
const div_two = document.getElementById('display-image-2')
const tali_marks_image = document.createElement('img');
const tali_marks_image_2 = document.createElement('img');
const tali_marks_image_3 = document.createElement('img');
const tali_image = document.createElement('img');
const tali_image_2 = document.createElement('img');
const tali_image_3 = document.createElement('img');
const the_message = document.querySelector('.message');
let uploaded_image;
let uploaded_image_2;
if (window.sessionStorage.getItem("image")) {
    koko = window.sessionStorage.getItem("image");
    document.querySelector("#display-image").append(image_tag);
    image_tag.src = koko;
}
image_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        window.sessionStorage.setItem("image", uploaded_image);
        image_tag.src = uploaded_image;
        document.querySelector("#display-image").append(image_tag);
    });
    reader.readAsDataURL(this.files[0]);
});

if (window.sessionStorage.getItem("image_2")) {
    lolo = window.sessionStorage.getItem("image_2");
    document.querySelector("#display-image-2").append(image_tag_2);
    image_tag_2.src = lolo;
}
image_input_2.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image_2 = reader.result;
        window.sessionStorage.setItem("image_2", uploaded_image_2);
        image_tag_2.src = uploaded_image_2;
        document.querySelector("#display-image-2").append(image_tag_2);
    });
    reader.readAsDataURL(this.files[0]);

});


reset.addEventListener('click', () => {
    function isDraw() {
        let output = true;
        board.forEach(({ status }) => {
            if (status === "") {
                output = false;
            }
        });
        return output;
    }

    function won_game() {
        for (let i = 0; i < winning_combination.length; i++) {
            const [a, b, c] = winning_combination[i];
            if (board[a].status !== "" && board[a].status == board[b].status && board[b].status == board[c].status) {
                if (board[a].status === "X") {
                    if (window.sessionStorage.getItem("image")) {
                        koko = window.sessionStorage.getItem("image");
                        document.querySelector("#display-image").append(image_tag);
                        image_tag.src = koko;
                        board[a].ele.innerHTML = ""
                        tali_marks_image.src = koko
                        board[a].ele.append(tali_marks_image)
                        board[b].ele.innerHTML = ""
                        tali_marks_image_2.src = koko
                        board[b].ele.append(tali_marks_image_2)
                        board[c].ele.innerHTML = ""
                        tali_marks_image_3.src = koko
                        board[c].ele.append(tali_marks_image_3)
                    }
                    holder.innerHTML = `<div>player <span class="playerX">X</span> has won the game</div>`
                    theHold.style.visibility = "hidden";
                }
                if (board[a].status === "O") {
                    if (window.sessionStorage.getItem("image_2")) {
                        lolo = window.sessionStorage.getItem("image_2");
                        document.querySelector("#display-image-2").append(image_tag_2);
                        image_tag_2.src = lolo;
                        board[a].ele.innerHTML = ""
                        tali_image.src = lolo
                        board[a].ele.append(tali_image)
                        board[b].ele.innerHTML = ""
                        tali_image_2.src = lolo
                        board[b].ele.append(tali_image_2)
                        board[c].ele.innerHTML = ""
                        tali_image_3.src = lolo
                        board[c].ele.append(tali_image_3)
                    }
                    holder.innerHTML = `<div>player <span class="playerO">O</span> has won the game</div>`
                    theHold.style.visibility = "hidden";
                }
                isGameActive = false;
                return true;
            }
        }
        return false;
    }
    class classSquare {
        constructor(ele, index) {
            this.ele = ele;
            this.index = index;
            this.status = "";
        }
        nextMove() {
            if (isGameActive) {
                this.status = next_move;
                if (next_move === "X") {
                    theHold.innerHTML = `<div>player <span class="playerO">O</span>'s Turn</div>`
                }
                if (next_move === "O") {
                    theHold.innerHTML = `<div>player <span class="playerX">X</span>'s Turn</div>`
                }
                this.ele.innerHTML = this.status
                if (this.status === "X") {
                    this.ele.classList.add('playerX')
                }
                if (this.status === "O") {
                    this.ele.classList.add('playerO')
                }
                next_move === "O" ? next_move = "X" : next_move = "O"
            }
            won_game()
            if (isDraw()) {
                if (holder.textContent !== "player X has won the game" && holder.textContent !== "player O has won the game") {
                    holder.innerHTML = ""
                    holder.textContent = `its a tie`
                    theHold.style.visibility = "hidden";
                }
            }
        }
    }


    the_message.style.display = " none";
    holder.innerHTML = "";
    isGameActive = true;
    board = []
    theHold.style.visibility = "visible";
    holder.style.visibility = "visible";
    for (var i = container.childNodes.length - 1; i >= 0; --i) {
        container.removeChild(container.childNodes[i]);
    }
    for (let i = 0; i < 9; i++) {
        const div = document.createElement("div");
        div.classList.add("square");
        const square = new classSquare(div, i);
        container.appendChild(div);
        board.push(square);
        // theHold.style.visibility = "visible";
        div.addEventListener("click", () => {
            square.nextMove()
        }, { once: true });
    }
});