import "./managerBypassing.types";
import {TurboEventManager} from "../turboEventManager";
import {TurboEventManagerStateProperties} from "../turboEventManager.types";
import {callOnce} from "../../../domBuilding/decorators/callOnce";

function setupTurboEventManagerBypassing(eventManager: TurboEventManager) {
    HTMLElement.prototype.lockTurboEventManagerOn = (e: Event) => false;

    const bypassManager = function (this: HTMLElement, e: Event) {
        const bypassingResult: boolean | TurboEventManagerStateProperties = this.lockTurboEventManagerOn(e);

        if (typeof bypassingResult == "boolean") eventManager.setLockState(this, {
            enabled: bypassingResult,
            preventDefaultWheel: bypassingResult,
            preventDefaultMouse: bypassingResult,
            preventDefaultTouch: bypassingResult
        });

        else eventManager.setLockState(this, {
            enabled: bypassingResult.enabled || false,
            preventDefaultWheel: bypassingResult.preventDefaultWheel || false,
            preventDefaultMouse: bypassingResult.preventDefaultMouse || false,
            preventDefaultTouch: bypassingResult.preventDefaultTouch || false,
        });
    };

    HTMLElement.prototype.bypassTurboEventManager = function _bypassTurboEventManager<T extends HTMLElement>(this: T): T {
        this.addListener("mousedown", (e: Event) => bypassManager.call(this, e));
        this.addListener("touchstart", (e: Event) => bypassManager.call(this, e));
        return this;
    };

    callOnce(HTMLElement.prototype, "bypassTurboEventManager");
}

export {setupTurboEventManagerBypassing};