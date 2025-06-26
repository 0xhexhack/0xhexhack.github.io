// Credits: modified from https://codepen.io/atunnecliffe/pen/BaZyLR

const textarea = document.getElementById("term");
const load = document.getElementById("load");
const text = "welcome to HexHack";
const hexdump = "  2a 2a 2a 2a 2a 2a 2a 2a  2a 2a 2a 2a 2a 2a 2a 2a  |****************|";

const disableAnimation = Boolean(
  matchMedia("(prefers-reduced-motion)").matches || // some people are triggered by excessive motion
  localStorage.getItem('visited') || // do not show animation to people who have already seen it
  location.pathname !== '/' || // it be kinda annoying when people look at blog and have to go through animation
  document.referrer !== '' // if someone clicks on homepage from a blog, would be weird to show an animation
);

if(!disableAnimation) {
    load.style.display = "initial";
    document.body.classList.add("no-scroll");
    runner(0);
}

function runner(i) {
    textarea.append(text.charAt(i));
    i++;
    setTimeout(
        () => {
            if (i < text.length) {
                runner(i);
            } else {
                textarea.append("\n");
                setTimeout(() => feedbacker(0), 1000);
            }
        },
        // prompt typing speed (in ms)
        Math.floor(Math.random() * 200) + 1
    );
}

function feedbacker(i) {
    if (i == 8) {
        textarea.innerHTML += "00000080  2a 2a 2a 2a 2a 2a 2a <span style='color:#ca1928'>48  65 78 48 61 63 6b</span> 2a 2a  |*****<span style='color:#ca1928'>HexHack</span>****|<br>";
    } else if (i == 9) {
        textarea.innerHTML += "00000090  2a 2a 2a 2a 2a 2a 2a 2a  <span style='color:#ca1928'>54 49 4d 54 41 4c</span> 2a 2a  |*****<span style='color:#ca1928'>at TIMTAL</span>**|<br>";
    } else {
        textarea.append(leftPad(Number(i).toString(16).toUpperCase(), 7, '0') + '0' + hexdump + "\n");
    }
    
    // scrolling not necessary
    // window.scrollTo(0, document.body.scrollHeight);
    
    i++;
    // output speed (in ms)
    let time = Math.floor(Math.random() * 4) + 1;
    setTimeout(
        () => {
            let textHeight = getTextHeight();
            let paddingHeight = parseFloat(getComputedStyle(load)["padding"]) * 2;
            if (i < 71 && i < (window.innerHeight - paddingHeight) / textHeight - 3) {
                // stop once screen is filled
                feedbacker(i);
            } else {
                // clear splash screen and show Home page
                textarea.append("Starting now...\n");
                setTimeout(
                    () => {
                        load.style.animation = "1s linear both fade-out";
                        document.body.classList.remove("no-scroll");
                        setTimeout(() => load.style.display = "none", 1000);
                    },
                    2000
                );
                window.localStorage.setItem('visited', true);
            }
        },
        time
    );
}

function leftPad(content, len, pad=' ') {
    if (content.length >= len) return content;
    return pad.repeat(len - content.length) + content;
}

function getTextHeight() {
    return document.getElementById("splash-hack-zero-for-reference").clientHeight;
}
