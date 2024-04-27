export class GameService {
    /**
     * Check if window has property alt
     *
     * @type {boolean}
     * @private
     */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    private static valid: boolean = window['alt'] !== undefined;

    /**
     * Listen to event
     *
     * @param {string} eventName
     * @param {(...args: any[]) => void} listener
     */
    public static on(
        eventName: string,
        listener: (...args: any[]) => void
    ): void {
        if (this.valid && 'alt' in window) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            alt.on(eventName, listener);
        }
    }

    /**
     * Unsubscribe from event
     *
     * @param {string} eventName
     * @param {(...args: any[]) => void} listener
     */
    public static off(
        eventName: string,
        listener: (...args: any[]) => void
    ): void {
        if (this.valid && 'alt' in window) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            alt.off(eventName, listener);
        }
    }


    /**
     * Emit event to client
     *
     * @param {string} eventName
     * @param args
     */
    public static emit(eventName: string, ...args: any[]): void {
        if (this.valid && 'alt' in window) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            alt.emit(eventName, ...args);
        } else {
            this.consoleLog(eventName, args);
        }
    }

    /**
     * Print auth the emit events
     *
     * @param {string} eventName
     * @param args
     * @private
     */
    private static consoleLog(eventName: string, ...args: any[]): void {
        console.log(`game-Service: Emit Event - ${eventName}`);
        console.log(
            `game-Service: Params for Event - ${JSON.stringify(args)
                .replace('[', '')
                .replace(']', '')}`
        );
    }
}
