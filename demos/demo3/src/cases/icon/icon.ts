import {$, TurboIcon, icon, iconToggle, flexRow, button, randomColor} from "../../../../../build/turbodombuilder.esm";
import {box} from "../../demoBox/demoBox";
import "./icon.css";

const onLoadedLog = (prefix: string) =>
    (el: Element) => console.log(`[${prefix}] loaded`, el);

function iconTest1() {
    const icon4 = icon({icon: "share", type: "svg", iconColor: "#e91e63"});
    box("TurboIcon — Basics")
        .addSubBox("SVG", icon({icon: "link", type: "svg", onLoaded: onLoadedLog("svg")}))
        .addSubBox("Explicit ext (jpg) > type(svg)", icon({
            icon: "share.jpg",
            type: "svg",
            onLoaded: onLoadedLog("explicit-ext overrides type")
        }))
        .addSubBox("PNG", icon({icon: "photo", type: "png", onLoaded: onLoadedLog("png")}))
        .addSubBox("SVG + iconColor", icon4)
        .addContent(button({
            text: "Toggle color", onClick: () => icon4.iconColor = randomColor()
        }));
}

function iconTest2() {
    box("TurboIcon — directory")
        .addSubBox('dir: "assets"', icon({directory: "assets", icon: "share", type: "svg"}))
        .addSubBox('dir: "assets/"', icon({directory: "assets/", icon: "share", type: "svg"}))
        .addSubBox('dir: "" + path in icon', icon({directory: "", icon: "assets/share", type: "svg"}));
}

function iconTest3() {
    const dyn = icon({icon: "share", type: "svg", onLoaded: onLoadedLog("dynamic")});
    box("TurboIcon — dynamic updates")
        .addSubBox("start", dyn)
        .addContent(button({text: "icon=link", onClick: () => dyn.icon = "link"}))
        .addContent(button({text: "type=jpg", onClick: () => dyn.type = "jpg"}))
        .addContent(button({text: "type=svg", onClick: () => dyn.type = "svg"}))
        .addContent(button({text: "dir=assets/icons", onClick: () => dyn.directory = "assets/icons"}));
}

function iconTest4() {
    const names = ["share", "link", "chevron-top", "chevron-left"];
    const racer = icon({icon: "share", type: "svg", onLoaded: onLoadedLog("race")});

    box("TurboIcon — async race")
        .addSubBox("racer", racer)
        .addContent(button({
            text: "Start race",
            onClick: () => {
                let i = 0;
                const id = setInterval(() => {
                    racer.icon = names[i % names.length];
                    racer.type = i % 2 ? "svg" : "jpg";
                    i++;
                    if (i > 12) clearInterval(id);
                }, 100);
            }
        }));
}

function iconTest5() {
    const badType = icon({icon: "share", type: "tiff"});
    box("TurboIcon — errors")
        .addSubBox("missing svg (expect console error)", icon({icon: "i-do-not-exist", type: "svg"}))
        .addContent(button({
            text: "Create bad type",
            onClick: () => {
                try {
                    (badType as any).type = "tiff";
                } catch (e) {
                    console.warn("[bad type] caught expected error:", e);
                }
            }
        }));
}

function iconTest6() {
    TurboIcon.config.customLoaders["data"] = () => {
        const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        el.setAttribute("viewBox", "0 0 24 24");
        el.innerHTML = `<circle cx="12" cy="12" r="8"></circle>`;
        el.style.width = "24px";
        el.style.height = "24px";
        return el;
    };

    box("TurboIcon — custom loader")
        .addSubBox('type="data"', icon({icon: "ignored-payload", type: "data", iconColor: "tomato"}));
}

function iconTest7() {
    const reUser = icon({icon: "photo", type: "jpg"});
    box("TurboIcon — image reuse")
        .addSubBox("re-user", reUser)
        .addContent(button({
            text: "flip jpg/png/jpg",
            onClick: (e, el) => {
                reUser.type = reUser.type === "jpg" ? "png" : "jpg";
                reUser.icon = reUser.icon === "photo" ? "photo2" : "photo";
            }
        }));
}

function iconTest8() {
    box("TurboIconToggle")
        .addSubBox("click me", iconToggle({
            icon: "link",
            toggleOnClick: true, onToggle: (v) => console.log("toggle:", v)
        }));
}

export function setupIconTests() {
    iconTest1();
    iconTest2();
    iconTest3();
    iconTest4();
    iconTest5();
    iconTest6();
    iconTest7();
    iconTest8();
}