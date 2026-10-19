//JS page for Fish Tank
const NUM_FISH = 7;
const TANK = document.getElementById("tank");
const TANK_W = TANK.clientWidth;
const TANK_H = TANK.clientHeight;
const FISH_LIST = [];

const FISH_IMAGES = [
    "fish1.png",
    "fish2.png",
    "fish3.png",
    "fish4.png",
    "fish5.png"
];

function createFish() {
    const img = document.createElement("img");
    img.className = "fish";

    img.src = FISH_IMAGES[Math.floor(Math.random() * FISH_IMAGES.length)];

    const fish = {
        img: img,
        x: Math.random() * (TANK_W - 150),
        y: Math.random() * (TANK_H - 100),
        vx: 1,
        vy: 0,
        normalSpeed: 2,
        speed: 2,
        boosted: false,
        boostTimer: null,

        faceDirection() {
            if (this.vx < 0) {
                this.img.style.transform = "scaleX(-1)";
            } else {
                this.img.style.transform = "scaleX(1)";
            }
        }
    };

    // random initial direction
    if (Math.random() < 0.5) fish.vx = -1;
    if (Math.random() < 0.5) fish.vy = Math.random() < 0.5 ? 1 : -1;

    fish.faceDirection();

    img.style.left = fish.x + "px";
    img.style.top = fish.y + "px";

    // CLICK → SPEED BOOST
    img.addEventListener("click", () => {
        if (!fish.boosted) {
            fish.boosted = true;
            fish.speed = fish.normalSpeed * 3;

            fish.boostTimer = setTimeout(() => {
                fish.speed = fish.normalSpeed;
                fish.boosted = false;
                fish.boostTimer = null;
            }, 3000);
        } else {
            clearTimeout(fish.boostTimer);
            fish.boostTimer = setTimeout(() => {
                fish.speed = fish.normalSpeed;
                fish.boosted = false;
                fish.boostTimer = null;
            }, 3000);
        }
    });

    // RANDOM DIRECTION CHANGE (2–8 seconds)
    function scheduleDirectionChange() {
        const delay = (Math.floor(Math.random() * 6 + 2)) * 1000;

        setTimeout(() => {
            if (Math.random() < 0.5) {

                // new vx
                if (Math.random() < 0.5) {
                    fish.vx = 1;
                } else {
                    fish.vx = -1;
                }

                // new vy
                if (Math.random() < 0.5) {
                    fish.vy = Math.random() < 0.5 ? 1 : -1;
                } else {
                    fish.vy = 0;
                }

                fish.faceDirection();
            }

            scheduleDirectionChange();
        }, delay);
    }

    scheduleDirectionChange();

    FISH_LIST.push(fish);
    TANK.appendChild(img);
}

for (let i = 0; i < NUM_FISH; i++) {
    createFish();
}

function animate() {
    FISH_LIST.forEach(fish => {

        fish.x += fish.vx * fish.speed;
        fish.y += fish.vy * fish.speed;

        // left wall
        if (fish.x < 0) {
            fish.x = 0;
            fish.vx = 1;
            fish.faceDirection();
        }

        // right wall
        if (fish.x + 150 > TANK_W) {
            fish.x = TANK_W - 150;
            fish.vx = -1;
            fish.faceDirection();
        }

        // top wall
        if (fish.y < 0) {
            fish.y = 0;
            if (fish.vy < 0) fish.vy = 1;
        }

        // bottom wall
        if (fish.y + 100 > TANK_H) {
            fish.y = TANK_H - 100;
            if (fish.vy > 0) fish.vy = -1;
        }

        fish.img.style.left = fish.x + "px";
        fish.img.style.top = fish.y + "px";
    });

    requestAnimationFrame(animate);
}

animate();
