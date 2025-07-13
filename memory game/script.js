function maingame() {
    var tapin = 0;
    var start = document.getElementById("startButton");
    var mainjeux = document.getElementById("mainjeux");
    if (start) start.remove();
    mainjeux.innerHTML = "";

    let para = document.createElement("p");
    para.innerHTML = "Bienvenue dans le jeu !";
    mainjeux.appendChild(para);

    let tap = document.createElement("p");
    tap.innerHTML = "Appuyez sur le bouton pour commencer !";
    mainjeux.appendChild(tap);

    let button = document.createElement("button");
    button.innerHTML = "Commencer";
    mainjeux.appendChild(button);

    let tapinDisplay = document.createElement("p");
    tapinDisplay.innerHTML = "Tappin: " + tapin;
    mainjeux.appendChild(tapinDisplay);

    button.onclick = function () {
        button.remove();
        mainjeux.innerHTML = "";
        mainjeux.appendChild(tapinDisplay);

        let images = [
            "images/pieceBlack_border00.png",
            "images/pieceBlack_border03.png",
            "images/pieceBlack_border06.png",
            "images/pieceBlack_border09.png",
            "images/pieceBlack_border12.png",
            "images/pieceBlack_border15.png"
        ];

        let gameImages = images.concat(images);

        for (let i = gameImages.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [gameImages[i], gameImages[j]] = [gameImages[j], gameImages[i]];
        }

        let cards = [];
        let flipped = [];
        let matched = [];

        gameImages.forEach((src, idx) => {
            let img = document.createElement("img");
            img.src = src;
            img.dataset.src = src;
            img.dataset.idx = idx;
            img.className = "memory-card";
            img.style.width = "100px";
            img.style.margin = "10px";
            img.style.cursor = "pointer";
            cards.push(img);
            mainjeux.appendChild(img);
        });

        setTimeout(() => {
            cards.forEach(card => {
                card.src = "menu-images/images.jpg";
                card.onclick = function () {
                    if (
                        flipped.length < 2 &&
                        !flipped.includes(card) &&
                        !matched.includes(card)
                    ) {
                        card.src = card.dataset.src;
                        flipped.push(card);
                        tapin++;
                        tapinDisplay.innerHTML = "Tappin: " + tapin;

                        if (flipped.length === 2) {
                            cards.forEach(c => c.style.pointerEvents = "none");
                            setTimeout(() => {
                                if (flipped[0].dataset.src === flipped[1].dataset.src) {
                                    flipped[0].style.visibility = "hidden";
                                    flipped[1].style.visibility = "hidden";
                                    matched.push(flipped[0], flipped[1]);

                                    if (matched.length === cards.length) {
                                        if (!mainjeux.querySelector('.end-message')) {
                                            let scoreMessage = document.createElement("p");
                                            scoreMessage.innerHTML = "Bravo! tu as essaye : " + tapin + " fois !";
                                            mainjeux.appendChild(scoreMessage);

                                            while (mainjeux.children.length > 1) {
                                                mainjeux.removeChild(mainjeux.lastChild);
                                            }

                                            let endMessage = document.createElement("p");
                                            endMessage.id = "end-message";
                                            endMessage.style.fontFamily = '"Sixtyfour Convergence", sans-serif';
                                            endMessage.style.fontWeight = "400";
                                            endMessage.style.fontStyle = "normal";

                                            if (tapin >= 20) {
                                                endMessage.innerHTML = "you have a bad memory you need to get better";
                                                mainjeux.appendChild(endMessage);

                                                let badJobImg = document.createElement("img");
                                                badJobImg.src = "menu-images/badjob.png";
                                                badJobImg.alt = "Try Again!";
                                                badJobImg.style.display = "block";
                                                badJobImg.style.margin = "20px auto";
                                                badJobImg.style.width = "80%";
                                                badJobImg.style.maxWidth = "500px";
                                                mainjeux.appendChild(badJobImg);

                                            } else {
                                                endMessage.innerHTML = "you have a good memory";
                                                mainjeux.appendChild(endMessage);

                                                let goodJobImg = document.createElement("img");
                                                goodJobImg.src = "menu-images/goodjob.png";
                                                goodJobImg.alt = "Good Job!";
                                                goodJobImg.style.display = "block";
                                                goodJobImg.style.margin = "20px auto";
                                                goodJobImg.style.width = "80%";
                                                goodJobImg.style.maxWidth = "500px";
                                                mainjeux.appendChild(goodJobImg);
                                            }
                                            let restartButton = document.createElement("button");
                                            restartButton.innerHTML = "Recommencer";
                                            let exit = document.createElement("button");
                                            exit.innerHTML = "Quitter";
                                            mainjeux.appendChild(restartButton);
                                            mainjeux.appendChild(exit);
                                            restartButton.onclick = function () {
                                                mainjeux.innerHTML = "";
                                                maingame();
                                            };
                                            exit.onclick = function () {
                                                window.location.href = "index.html";
                                            };
                                        }
                                    }
                                } else {
                                    flipped[0].src = "menu-images/images.jpg";
                                    flipped[1].src = "menu-images/images.jpg";
                                }
                                flipped = [];
                                cards.forEach(c => {
                                    if (!matched.includes(c)) c.style.pointerEvents = "auto";
                                });
                            }, 1000);
                        }
                    }
                };
            });
        }, 3000);
    };
}


