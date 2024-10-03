import {TurboEventManagerStateProperties} from "../turboEventManager.types";

declare global {
    interface HTMLElement {
        lockTurboEventManagerOn: (e: Event) => (boolean | TurboEventManagerStateProperties);

        bypassTurboEventManager(): this;
    }
}

export {};