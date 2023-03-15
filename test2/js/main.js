document.addEventListener('DOMContentLoaded', () => {
    const regionsData = [
        {
            name: 'north-america',
            number: 'none',
            closestServSpot: 'east-usa',
            latency: 21,
            time: 0.2,
            clientLatency: 0
        },
        {
            name: 'south-america',
            number: 'none',
            closestServSpot: 'west-usa',
            latency: 181,
            time: 1.81,
            clientLatency: 0
        },
        {
            name: 'europe',
            number: 'none',
            closestServSpot: 'germany',
            latency: 31,
            time: 0.31,
            clientLatency: 0
        },
        {
            name: 'asia',
            number: 'none',
            closestServSpot: 'singapore',
            latency: 71,
            time: 0.7,
            clientLatency: 0
        },
        {
            name: 'oceania',
            number: 'none',
            closestServSpot: 'singapore',
            latency: 93,
            time: 1,
            clientLatency: 0
        }
    ];
    //'west-usa', 'east-usa', 'germany', 'singapore'
    const latencyMatrix = [
        [51, 181, 141, 143, 179],
        [21, 139, 82, 232, 207],
        [101, 174, 31, 296, 255],
        [226, 367, 250, 70, 92]
    ]
    const message = document.querySelector('.storage-example__description');
    let clientObjectStorage;
    let regionCounter = 0;

    renderUserNumberIcons();
    
    function renderUserNumberIcons() {
        const regionBlock = document.querySelectorAll('.region');

        document.querySelectorAll('.users-number').forEach((el,ind) => {
            el.addEventListener('click', (e) => {
                let num = e.target.dataset.number;
                regionsData[ind].number = num;
    
                el.remove();
    
                let lowNumberIcon = document.createElement('div');
                lowNumberIcon.classList.add('users-icon');
                lowNumberIcon.innerHTML = `
                <img src="./assets/icons/small.png" alt="low users">
                <div class="mask">
                    <img src="./assets/icons/small_mask.png" alt="low users mask">
                </div>`;
                regionBlock[ind].append(lowNumberIcon);
    
                if (num == 'medium' || num == 'large') {
                    let mediumNumberIcon = document.createElement('div');
                    mediumNumberIcon.classList.add('users-icon');
                    mediumNumberIcon.innerHTML = `
                    <img src="./assets/icons/medium.png" alt="medium users">
                    <div class="mask">
                        <img src="./assets/icons/medium_mask.png" alt="medium users mask">
                    </div>`;
                    regionBlock[ind].append(mediumNumberIcon);
                }
                if (num == 'large') {
                    let largeNumberIcon = document.createElement('div');
                    largeNumberIcon.classList.add('users-icon');
                    largeNumberIcon.innerHTML = `
                    <img src="./assets/icons/large.png" alt="large users">
                    <div class="mask">
                        <img src="./assets/icons/large_mask.png" alt="large users mask">
                    </div>`;
                    regionBlock[ind].append(largeNumberIcon);
                }
    
                regionCounter++
                if (regionCounter == 2) {
                    document.querySelector('.storage-example__description > span').style.display = 'inline';
                    document.querySelector('.storage-example__description > span').addEventListener('click', () => {
                        document.querySelectorAll('.users-number').forEach(el => el.remove());
                        secondStage();
                    });
                } else if (regionCounter == 5) {
                    secondStage();
                }
            });
        });
    }

    function secondStage() {
        const spotsForServer = ['west-usa', 'east-usa', 'germany', 'singapore'];
        message.innerHTML = 'Choose minimum two additional spots for ByteCloud and press <span style="opacity: 0.5; display: inline;">Start</span>';
        regionCounter = 0;

        spotsForServer.forEach(el => {
            const serverSpot = document.createElement('div');

            serverSpot.classList.add('server-spot');
            serverSpot.setAttribute('data-server', el);

            const serverSpotImage = document.createElement('img');
            serverSpotImage.src = "./assets/icons/circle_empty.png";
            serverSpotImage.alt = "server spot";
            serverSpotImage.classList.add('server-spot-image', 'server-spot-image_hover');

            serverSpotImage.addEventListener('click', (e) => {
                serverSpotImage.classList.remove('server-spot-image_hover');
                if (serverSpotImage.getAttribute('src') == './assets/icons/circle_empty.png') {
                    if(regionCounter == 0) {
                        serverSpotImage.src = "./assets/icons/server.png";
                        clientObjectStorage = serverSpotImage.parentElement.dataset.server;
                        regionCounter++;
                    } else if(regionCounter == 2) {
                        serverSpotImage.src = "./assets/icons/server_ByteCloud.png";
                        regionCounter++;
                        document.querySelector('.storage-example__description span').style.opacity = '1';
                        document.querySelector('.storage-example__description > span').addEventListener('click', thirdStage);
                    } else if (regionCounter == 3) {
                        serverSpotImage.src = "./assets/icons/server_ByteCloud.png";
                        regionCounter++;
                        thirdStage();
                    } else {
                        serverSpotImage.src = "./assets/icons/server_ByteCloud.png";
                        regionCounter++;
                    }
                }
            });

            serverSpot.append(serverSpotImage);
            document.querySelector('.storage-example').append(serverSpot);
        });
    }

    function thirdStage() {
        message.style.visibility = 'hidden';
        document.querySelectorAll('.server-spot').forEach(el => {
            if (el.contains(document.querySelector('img.server-spot-image_hover'))) {
                let name = el.dataset.server;
                if (name == "east-usa") {
                    regionsData[0].closestServSpot = 'west-usa';
                    regionsData[0].latency = 51;
                    regionsData[0].time = 0.5;
                } else if (name == "west-usa") {
                    regionsData[1].closestServSpot = 'east-usa';
                    regionsData[1].latency = 139;
                    regionsData[1].time = 1.4;
                } else if (name == 'singapore') {
                    regionsData[3].closestServSpot = 'germany';
                    regionsData[3].latency = 296;
                    regionsData[3].time = 3;
                    regionsData[4].closestServSpot = 'germany';
                    regionsData[4].latency = 255;
                    regionsData[4].time = 2.5;
                } else if (name == 'germany') {
                    regionsData[2].closestServSpot = 'east-usa';
                    regionsData[2].latency = 82;
                    regionsData[2].time = 0.8;
                }
                el.remove();
            }
        });

        const wrapperForArcs = document.createElement('div');
        wrapperForArcs.setAttribute('data-arc-wrapper', 'wrapper');
        document.querySelector('.storage-example').append(wrapperForArcs);

        regionsData.forEach(el => {
            if (el.number == 'low') {
                renderArcs(el.closestServSpot, el.name, 'small', wrapperForArcs);
            } else if (el.number == 'medium') {
                renderArcs(el.closestServSpot, el.name, 'small', wrapperForArcs);
                renderArcs(el.closestServSpot, el.name, 'medium', wrapperForArcs);
            } else if (el.number == 'large') {
                renderArcs(el.closestServSpot, el.name, 'small', wrapperForArcs);
                renderArcs(el.closestServSpot, el.name, 'medium', wrapperForArcs);
                renderArcs(el.closestServSpot, el.name, 'large', wrapperForArcs);
            }

            document.querySelectorAll(`[data-region="${el.name}"] .mask`).forEach(mask => {
                mask.style.width = '100%';
                mask.style.animation = `anim-loading ${el.latency * 10 * 1.5}ms linear`;
            });

            const currentRegion = document.querySelector(`[data-region="${el.name}"]`);
            if (currentRegion.contains(document.querySelector(`[data-region="${el.name}"] .mask`))){
                const regionTimeMessage = document.createElement('div');
                regionTimeMessage.classList.add('region-time-message');
                regionTimeMessage.textContent = `latency: ${el.latency} ms`;
                currentRegion.append(regionTimeMessage);
                setTimeout(() => {
                    regionTimeMessage.textContent = `time: ${el.time} sec`;
                }, el.latency * 10 * 1.5);
            }
        });

        timeoutBetweenStages('latency', fourthStage);
    }

    function fourthStage() {
        document.querySelectorAll('[data-arc-wrapper] img').forEach(el => el.remove());

        const wrapperForArcs = document.querySelector('[data-arc-wrapper]');

        regionsData.forEach((el,ind) => {
            if (el.number == 'low') {
                renderArcs(clientObjectStorage, el.name, 'small', wrapperForArcs);
            } else if (el.number == 'medium') {
                renderArcs(clientObjectStorage, el.name, 'small', wrapperForArcs);
                renderArcs(clientObjectStorage, el.name, 'medium', wrapperForArcs);
            } else if (el.number == 'large') {
                renderArcs(clientObjectStorage, el.name, 'small', wrapperForArcs);
                renderArcs(clientObjectStorage, el.name, 'medium', wrapperForArcs);
                renderArcs(clientObjectStorage, el.name, 'large', wrapperForArcs);
            }

            const currentRegion = document.querySelector(`[data-region="${el.name}"]`);
            if (currentRegion.contains(document.querySelector(`[data-region="${el.name}"] .mask`))){
                const regionTimeMessage = document.querySelector(`[data-region="${el.name}"] .region-time-message`);

                clientObjectStorage == 'west-usa' ? el.clientLatency = latencyMatrix[0][ind] : null;
                clientObjectStorage == 'east-usa' ? el.clientLatency = latencyMatrix[1][ind] : null;
                clientObjectStorage == 'germany' ? el.clientLatency = latencyMatrix[2][ind] : null;
                clientObjectStorage == 'singapore' ? el.clientLatency = latencyMatrix[3][ind] : null;

                let regionDelay = el.clientLatency;
                let regionTime = regionDelay / 100;

                regionTimeMessage.textContent = `latency: ${regionDelay} ms`;
                setTimeout(() => {
                    regionTimeMessage.textContent = `time: ${regionTime} sec`;
                }, regionDelay * 10 * 1.5);

                document.querySelectorAll(`[data-region="${el.name}"] .mask`).forEach(mask => {
                    mask.style.cssText = '';
                    setTimeout(() => {
                        mask.style.width = '100%';
                        mask.style.animation = `anim-loading ${regionDelay * 10 * 1.5}ms linear`;
                    }, 200);
                });
            }
        });

        timeoutBetweenStages('clientLatency', finalStage);
    }

    function finalStage() {
        const resultsTable = document.querySelector('.results-table__overlay');
        resultsTable.style.display = 'block';
        document.querySelector('.storage-example').style.filter = 'blur(2px)';


        //sort regions from large to small for render final table
        const filteredDataArr = regionsData.filter(el => el.number == 'medium');
        regionsData.forEach(el => {
            if (el.number == 'large') {
                filteredDataArr.unshift(el);
            } else if (el.number == 'low') {
                filteredDataArr.push(el);
            }
        });

        const byteCloudColumn = document.querySelectorAll('.results-table__column');
        filteredDataArr.forEach(el => {
            if (el.number != 'none') {
                new ResultItem(el.name, el.latency, byteCloudColumn[0]).render();
                new ResultItem(el.name, el.clientLatency, byteCloudColumn[1]).render();
            }
        });

        document.querySelector('.results-table__reloud-msg span').addEventListener('click', () => document.location.reload());
    }

    //click event animations
    document.addEventListener('click', e => {
        const waves = document.createElement('div');
        waves.style.cssText = `left: ${e.pageX}px; top: ${e.pageY}px`
        waves.classList.add('click-circle');
        document.querySelector('body').append(waves);
        setInterval(() => waves.remove(), 750);
    });
    
    //delay between stages
    function timeoutBetweenStages(delay, stage) {
        let timeOut = [];
        regionsData.forEach(el => {
            el.number != 'none' ? timeOut.push(el[`${delay}`]) : null;
        });
        setTimeout(stage, Math.max(...timeOut) * 10 * 1.5 + 300);
    }

    //function for render arcs.png
    function renderArcs(regionWithServer, regionTarget, number, parentElement) {
        const image = document.createElement('img');
        image.src = `./assets/arcs/arc_${regionWithServer}_${regionTarget}_${number}.png`;
        image.classList.add('server-spot-arc');
        parentElement.append(image);
    }

    class ResultItem {
        constructor(regionName, latency, parent, number) {
            this.regionName = regionName;
            this.latency = latency;
            this.time = latency / 100;
            this.parentElement = parent;
            this.number = number;
        }
        
        render(){
            let rate = Math.floor(5.5 - this.latency / 100);
            let video;
            if (this.latency > 200) {
                video = '480p';
            } else if (this.latency > 100) {
                video = '1080p full HD';
            } else {
                video = '4K/2160p Ultra HD';
            }
            const tableItem = document.createElement('div');
            tableItem.classList.add('results-table__item');
            tableItem.innerHTML = `
            <div class="results-table__item-header">
                <span>${this.regionName}</span>
                <div class="rate">
                    <img src="./assets/icons/star_${rate >= 5 ? 'filled' : 'empty'}.png" alt="star">
                    <img src="./assets/icons/star_${rate >= 4 ? 'filled' : 'empty'}.png" alt="star">
                    <img src="./assets/icons/star_${rate >= 3 ? 'filled' : 'empty'}.png" alt="star">
                    <img src="./assets/icons/star_${rate >= 2 ? 'filled' : 'empty'}.png" alt="star">
                    <img src="./assets/icons/star_filled.png" alt="star">
                </div>
            </div>
            <div class="results-table__item-body">
                <div class="results-table__item-latency">Latency: ${this.latency} ms</div>
                <div class="results-table__item-time">Download time: ${this.time} sec</div>
                <div class="results-table__item-video">Video streaming ${video}</div>
            </div>`;
            this.parentElement.append(tableItem);
        }
    }
});