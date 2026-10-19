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

    let x = Math.random() * (TANK_W - 150);
    let y = Math.random() * (TANK_H - 100);

    let vx = Math.random() < 0.5 ? 1 : -1;
    let vy = Math.random() < 0.5 ? (Math.random() < 0.5 ? 1 : -1) : 0;

    let normalSpeed = 2;
    let speed = normalSpeed;
    let boosted = false;
    let boostTimer = null;

    img.style.left = x + "px";
    img.style.top = y + "px";

    function faceDirection() {
        img.style.transform = vx < 0 ? "scaleX(-1)" : "scaleX(1)";
    }
    faceDirection();

    img.addEventListener("click", () => {
        if (!boosted) {
            boosted = true;
            speed = normalSpeed * 3;

            boostTimer = setTimeout(() => {
                speed = normalSpeed;
                boosted = false;
            }, 3000);
        } else {
            clearTimeout(boostTimer);
            boostTimer = setTimeout(() => {
                speed = normalSpeed;
                boosted = false;
            }, 3000);
        }
    });

    function scheduleDirectionChange() {
        const delay = (Math.floor(Math.random() * 6 + 2)) * 1000;
        setTimeout(() => {
            if (Math.random() < 0.5) {
                vx = Math.random() < 0.5 ? 1 : -1;
                vy = Math.random() < 0.5 ? (Math.random() < 0.5 ? 1 : -1) : 0;
                faceDirection();
            }
            scheduleDirectionChange();
        }, delay);
    }
    scheduleDirectionChange();

    FISH_LIST.push({ img, x, y, vx, vy, speed, normalSpeed, boosted });
    TANK.appendChild(img);
}

for (let i = 0; i < NUM_FISH; i++) {
    createFish();
    console.log("Fish created");
}

function animate() {
    FISH_LIST.forEach(f => {
        f.x += f.vx * f.speed;
        f.y += f.vy * f.speed;

        if (f.x < 0) {
            f.x = 0;
            f.vx = 1;
        }
        if (f.x + 150 > TANK_W) {
            f.x = TANK_W - 150;
            f.vx = -1;
        }
        if (f.y < 0) {
            f.y = 0;
            f.vy = Math.abs(f.vy);
        }
        if (f.y + 100 > TANK_H) {
            f.y = TANK_H - 100;
            f.vy = -Math.abs(f.vy);
        }

        f.img.style.left = f.x + "px";
        f.img.style.top = f.y + "px";
    });

    requestAnimationFrame(animate);
}

animate();
