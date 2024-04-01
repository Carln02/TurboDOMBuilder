import {addStylesheet} from "../../../turbo-functions/style-manipulation/add-stylesheet";
import {css} from "../../../turbo-functions/style-manipulation/css";

const dropdownStylesheet = css`
    turbo-dropdown {
        position: relative;
    }

    turbo-dropdown > :first-child {
        width: 100%;
        height: 100%;
    }

    turbo-dropdown > :nth-child(2) {
        position: absolute;
        top: calc(100% + 0.4em);
        left: 0;

        min-width: calc(100% - 2 * 0.1em);
        max-width: 200%;
        background-color: white;

        display: flex;
        flex-direction: column;
        border: solid 0.1em #5e5e5e;
        border-radius: 0.4em;

        overflow: hidden;
        z-index: 1;
    }

    turbo-dropdown-entry {
        width: 100%;
        padding: 0.5em 0.7em;
    }

    turbo-dropdown-entry:hover {
        background-color: #d7d7d7;
    }

    turbo-dropdown-entry:not(:last-child) {
        border-bottom: solid 0.1em #bdbdbd;
    }
`;

addStylesheet(dropdownStylesheet);
