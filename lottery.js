

class Lottery {
    constructor(container, data) {
        const lottery = document.createElement("div");
        const items = [];
        lottery.className = "lottery";
        data.forEach((item, index) => {
            if (index === 4) {
                const startBtn = document.createElement("div");
                startBtn.className = "lottery-item lottery-start";
                startBtn.innerText = "开始";
                startBtn.addEventListener("click",()=>{
                    this.run();
                })
                lottery.appendChild(startBtn);
            }
            const itemDiv = document.createElement("div");
            itemDiv.className = "lottery-item";
            itemDiv.innerText = item.name;
            items.push(itemDiv);
            lottery.appendChild(itemDiv);
        })

        this.items[7] = items[2];
        this.items[6] = items[4];
        this.items[5] = items[7];
        this.items[4] = items[6];
        this.items[3] = items[5];
        this.items[2] = items[3];
        this.items[1] = items[0];
        this.items[0] = items[1];

        container.appendChild(lottery);
    }
    items = [];
    onRun = false;

    run() {
        if(this.onRun)return;
        this.onRun = true;
        let times = 100,
            num = Math.floor(Math.random() * 8),
            interval = 500;

        const fn = () => {
            times--;
            this.items.forEach(element => {
                element.className = "lottery-item";
            });

            this.items[times % 8].className = "lottery-item active";
            if (times > 40 && interval > 100) {
                interval -= 30;
            }

            if (times < 10) {
                interval += 30;
            }
            if (times <= num) {
                clearTimeout(timer);
                setTimeout(() => {
                    const hoverItems = document.querySelector(".lottery-item.active");
                    this.onRun = false;
                    alert(`恭喜你获得${hoverItems.innerHTML}`)
                }, 1000)
                return
            }
            clearTimeout(timer);
            timer = setTimeout(fn, interval)
        }

        let timer = setTimeout(fn, interval);
    }
}
