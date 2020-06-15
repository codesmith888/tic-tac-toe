//DEFINE VARIABLES//
let gameboard = document.getElementById("board");
let reset = document.getElementById("reset"); 
let whosTurn = document.getElementById("whosTurn");
let boxes = document.getElementsByClassName("gameboard")
let computer = document.getElementById("computer")
let twoPlayerGame = document.getElementById("twoPlayerGame")
let gameOver = false 
let computerPlaying = false

//Click event listeners
let playerTwoChooses
let playerOneChooses
let playerOneVersusComputerChooses

//BOXES TO CLICK//
let clickedBoxes = {
    tl: false,
    tm: false,
    tr: false,
    ml: false,
    mm: false,
    mr: false,
    bl: false,
    bm: false,
    br: false,
 };

//START GAME AND EVENT LISTENERS//
function startGame () {
    computer.addEventListener("click", withComputerPlayerGamePlay);
    twoPlayerGame.addEventListener("click", gamePlay);
}; 
startGame();


//GAME PLAY//
function gamePlay () {
    resetBoard();
    if (computerPlaying == true) {
        return
    }
    whosTurn.innerText = "It is Harry Potter's Turn";
    playerOneChooses = function(e) {
        if (computerPlaying == true) {
            return
        }
        if (gameOver == true) {
            return
        }
        let harryPotter = document.getElementById(e.target.id);
        harryPotter.classList.add("image");
        console.log("Player One chose " + e.target.id);
        clickedBoxes[e.target.id] = "Harry Potter"
        whosTurn.innerText = "It is Voldemort's Turn";
        whoIsWinning() 
        gameboard.removeEventListener("click", playerOneChooses);
        gameboard.addEventListener("click", playerTwoChooses);    
    };

    playerTwoChooses = function(e) {
        if (computerPlaying == true) {
            return
        }
        if (gameOver == true) {
            return
        }
        let voldemort = document.getElementById(e.target.id);
        voldemort.classList.add("imageTwo");   
        console.log("Player Two chose " + e.target.id); 
        clickedBoxes[e.target.id] = "Voldemort"
        gameboard.removeEventListener("click", playerTwoChooses);
        whosTurn.innerText = "It is Harry Potter's Turn";
        whoIsWinning()
        gameboard.addEventListener("click", playerOneChooses);
    };
    gameboard.addEventListener("click", playerOneChooses)
};


//COMPUTER PLAYER OPTION//
function withComputerPlayerGamePlay() {
    computerPlaying == true
    let gameOptions = ["tl", "tm", "tr", "ml", "mm", "mr", "bl", "bm", "br"];
    resetBoard();
    
    playerOneVersusComputerChooses = function(e) {
        if (gameOver == true) {
            return
        }
        let harryPotter = document.getElementById(e.target.id);
        harryPotter.classList.add("image");
        console.log("Player One against computer chose " + e.target.id);
        let playerChoice = e.target.id
        let whatsLeft = gameOptions.indexOf(e.target.id)
        gameOptions.splice(whatsLeft, 1)
        console.log(gameOptions)
        clickedBoxes[e.target.id] = "Harry Potter"
        whosTurn.innerText = "It is Voldemort's Turn";
        whoIsWinning() 
        gameboard.removeEventListener("click", playerOneVersusComputerChooses);
        computerChooses();   
    };

    function computerChooses () {
        if (gameOver == true) {
            return
        } 
        let computer = Math.floor(Math.random() * gameOptions.length);
        computerChoice = gameOptions[computer];
        console.log("The computer chose " + computerChoice); 
        let voldemort = document.getElementById(computerChoice);
        voldemort.classList.add("imageTwo"); 
        clickedBoxes[computerChoice] = "Voldemort"
        let whatsLeft = gameOptions.indexOf(computerChoice)
        gameOptions.splice(whatsLeft, 1)
        console.log(gameOptions)
        whosTurn.innerText = "It is Harry Potter's Turn"; 
        whoIsWinning()
        gameboard.addEventListener("click", playerOneVersusComputerChooses);
    };
    gameboard.addEventListener("click", playerOneVersusComputerChooses);
 };

 //RESET GAME//
 reset.addEventListener("click", resetBoard);
 function resetBoard () {
     whosTurn.innerText = null
     gameOver = false
     clickedBoxes = {
         tl: false,
         tm: false,
         tr: false,
         ml: false,
         mm: false,
         mr: false,
         bl: false,
         bm: false,
         br: false,
         };
     document.getElementById("tl").classList.remove("image", "imageTwo");
     document.getElementById("tm").classList.remove("image", "imageTwo");
     document.getElementById("tr").classList.remove("image", "imageTwo");
     document.getElementById("ml").classList.remove("image", "imageTwo");
     document.getElementById("mm").classList.remove("image", "imageTwo");
     document.getElementById("mr").classList.remove("image", "imageTwo");
     document.getElementById("bl").classList.remove("image", "imageTwo");
     document.getElementById("bm").classList.remove("image", "imageTwo");
     document.getElementById("br").classList.remove("image", "imageTwo");
     document.body.classList.remove("slytherin");
     document.body.classList.remove("gryffindor");
     let gameOptions = ["tl", "tm", "tr", "ml", "mm", "mr", "bl", "bm", "br"];
     gameboard.removeEventListener("click", playerTwoChooses);
     gameboard.removeEventListener("click", playerOneChooses);
     gameboard.removeEventListener("click", playerOneVersusComputerChooses);
     startGame()
  };
 
//DETERMINE WINNER//

function whoIsWinning () {
    if (clickedBoxes.tl === clickedBoxes.tm && clickedBoxes.tr === clickedBoxes.tm && clickedBoxes.tl == "Harry Potter") {
    displayResults("Harry Potter wins!");
    document.body.classList.add("gryffindor");
    } else if (clickedBoxes.tl === clickedBoxes.tm && clickedBoxes.tm === clickedBoxes.tr && clickedBoxes.tl == "Voldemort") {
    displayResults("Voldemort wins!")
    document.body.classList.add("slytherin");
    } else if (clickedBoxes.tl === clickedBoxes.mm && clickedBoxes.mm === clickedBoxes.br && clickedBoxes.br == "Harry Potter") {
    displayResults("Harry Potter wins!");
    document.body.classList.add("gryffindor");
    } else if (clickedBoxes.tl === clickedBoxes.mm && clickedBoxes.mm === clickedBoxes.br && clickedBoxes.tl == "Voldemort") {
    displayResults("Voldemort wins!")
    document.body.classList.add("slytherin");
    } else if (clickedBoxes["ml"] === clickedBoxes["mm"] && clickedBoxes.mm === clickedBoxes["mr"] && clickedBoxes["ml"] == "Harry Potter") {
    displayResults("Harry Potter wins!");
    document.body.classList.add("gryffindor");
    } else if (clickedBoxes["ml"] === clickedBoxes["mm"] && clickedBoxes.mm === clickedBoxes["mr"] && clickedBoxes["ml"] == "Voldemort") {
    displayResults("Voldemort wins!")
    document.body.classList.add("slytherin");
    } else if (clickedBoxes["bl"] === clickedBoxes["bm"] && clickedBoxes.bm === clickedBoxes["br"] && clickedBoxes["bl"] == "Harry Potter") {
    displayResults("Harry Potter wins!");
    document.body.classList.add("gryffindor");
    } else if (clickedBoxes["bl"] === clickedBoxes["bm"] && clickedBoxes.bm === clickedBoxes["br"] && clickedBoxes["bl"] == "Voldemort") {
    displayResults("Voldemort wins!")
    document.body.classList.add("slytherin");
    } else if (clickedBoxes["tl"] === clickedBoxes["ml"] && clickedBoxes.ml === clickedBoxes["bl"] && clickedBoxes["tl"] ==  "Harry Potter") {
    displayResults("Harry Potter wins!");
    document.body.classList.add("gryffindor");
    } else if (clickedBoxes["tl"] === clickedBoxes["ml"] && clickedBoxes.tl === clickedBoxes["bl"] && clickedBoxes["ml"] == "Voldemort") {
    displayResults("Voldemort wins!")
    document.body.classList.add("slytherin");
    } else if (clickedBoxes["tm"] === clickedBoxes["mm"] && clickedBoxes.mm === clickedBoxes["bm"] && clickedBoxes["bm"] ==  "Harry Potter") {
    displayResults("Harry Potter wins!");
    document.body.classList.add("gryffindor");
    } else if (clickedBoxes["tm"] === clickedBoxes["mm"] && clickedBoxes.mm === clickedBoxes["bm"] && clickedBoxes["bm"] ==  "Voldemort") {
    displayResults("Voldemort wins!")
    document.body.classList.add("slytherin");
    } else if (clickedBoxes["tr"] === clickedBoxes["mr"] && clickedBoxes.mr === clickedBoxes["br"] && clickedBoxes["mr"] == "Harry Potter") {
    displayResults("Harry Potter wins!");
    document.body.classList.add("gryffindor");
    } else if (clickedBoxes["tr"] === clickedBoxes["mr"] && clickedBoxes.mr === clickedBoxes["br"] && clickedBoxes["mr"] == "Voldemort") {
    displayResults("Voldemort wins!")
    document.body.classList.add("slytherin");
    } else if (clickedBoxes["tr"] === clickedBoxes["mm"] && clickedBoxes.mm === clickedBoxes["bl"] && clickedBoxes["tr"] == "Harry Potter") {
    displayResults("Harry Potter wins!");
    document.body.classList.add("gryffindor");
    } else if (clickedBoxes["tr"] === clickedBoxes["mm"] && clickedBoxes.mm === clickedBoxes["bl"] && clickedBoxes["tr"] == "Voldemort") {
    displayResults("Voldemort wins!")
    document.body.classList.add("slytherin");
    } else if (clickedBoxes.tr != false && clickedBoxes.tm != false && clickedBoxes.tr != false && clickedBoxes.ml != false && clickedBoxes.mm != false && clickedBoxes.rm != false && clickedBoxes.bl != false && clickedBoxes.bm != false && clickedBoxes.br != false) {
        displayResults("Tie Game... Play Again")
    }
};

    
    //DISPLAY RESULTS//
    function displayResults(results) {
        whosTurn.innerText = results;
        console.log(results)
        gameOver = true 
    };