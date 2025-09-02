/**
 * @description Object representing options passed to the ToolManager's setTool() function.
 * @property select - Indicate whether to visually select the tool on all toolbars, defaults to true
 * @property activate - Indicate whether to fire activation on the tool when setting it, defaults to true
 * @property setAsNoAction - Indicate whether the tool will also be set as the tool for ClickMode == none, defaults
 * to true if the click mode is left.
 */
type SetToolOptions = {
    select?: boolean,
    activate?: boolean,
    setAsNoAction?: boolean,
};

export {SetToolOptions};