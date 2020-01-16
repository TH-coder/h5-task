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
                startBtn.addEventListener("click", () => {
                    this.run();
                })
                lottery.appendChild(startBtn);
            }
            const itemDiv = document.createElement("div");
            itemDiv.className = "lottery-item";
            itemDiv.innerText = item.name;
            const obj = {
                node: itemDiv,
                percent: item.percent || undefined
            }
            items.push(obj);
            lottery.appendChild(itemDiv);
        })
        container.appendChild(lottery);

        this.items[7] = items[2];
        this.items[6] = items[4];
        this.items[5] = items[7];
        this.items[4] = items[6];
        this.items[3] = items[5];
        this.items[2] = items[3];
        this.items[1] = items[0];
        this.items[0] = items[1];

        let restItemTotal = 0;
        const rest = this.items.reduce((sum, item, index) => {
            if (item.percent || item.percent === 0) {
                item.percent = item.percent * 100;
                sum -= item.percent;
            } else {
                restItemTotal++;
            }
            item.index = index;
            return sum
        }, 10000)

        this.items.filter(item => !item.percent && item.percent !== 0).forEach((item) => item.percent = Math.round(rest / restItemTotal))

        this.items.reduce((sum, item) => {
            item.floor = sum;
            item.ceil = sum + item.percent;
            return sum + item.percent;
        }, 0)

    }
    items = [];
    onRun = false;

    run() {
        if (this.onRun) return;
        this.onRun = true;
        let times = 100,
            num,
            interval = 500;

        const random = Math.floor(Math.random() * 10000);

        num = this.items.filter(item=>item.floor<=random && random<item.ceil)[0].index;

        const fn = () => {
            times--;
            this.items.forEach(element => {
                element.node.className = "lottery-item";
            });
            this.items[times % 8].node.className = "lottery-item active";
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