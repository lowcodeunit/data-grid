/**
 * Model for cell actions, such as button click
 */
export class CellAction {
    /**
     * cell action handler, like a function
     */
    public ActionHandler: Function;

    /**
     * action label
     */
    public ActionLabel?: string;

    /**
     * params to pass to action handler
     */
    public ActionParams?: Array<string>;

    /**
     * action type, such as button or href
     */
    public ActionType: string;

    /**
     * tooltip for action
     */
    public ActionTooltip?: string;
}