export class GameService {
    private static targetFramework: string = '';
    private static events: Map<string, Set<(...args: any[]) => void>> = new Map();
    private static instance: GameService;

    constructor() {
        if (typeof (window as any)['alt'] !== "undefined") {
            GameService.targetFramework = 'altv';
        } else if (typeof (window as any)['nuiTargetGame'] !== "undefined") {
            GameService.targetFramework = 'fivem';

            window.addEventListener("message", function (event) {
                const { eventName, ...params } = event.data;

                const listeners = GameService.events.get(eventName);
                if (!listeners) return;

                for (const listener of listeners) {
                    listener(...Object.values(params));
                }
            })
        }
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new GameService();
        }
        return this.instance;
    }

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
        if (GameService.targetFramework === 'altv') {
            alt.on(eventName, listener);
        } else if (GameService.targetFramework === 'fivem') {
            const listeners = GameService.events.get(eventName) ?? new Set();
            listeners.add(listener);
            GameService.events.set(eventName, listeners);
        }
    }

    public static off(
        eventName: string,
        listener: (...args: any[]) => void
    ): void {
        if (GameService.targetFramework === 'altv') {
            alt.off(eventName, listener);
        } else if (GameService.targetFramework === 'fivem') {
            const listeners = GameService.events.get(eventName);
            if (!listeners) return;

            listeners.delete(listener);

            if (!listeners.size) {
                GameService.events.delete(eventName);
            }
        }
    }

    /**
     * Emit event to client
     *
     * @param {string} eventName
     * @param args
     */
    public static emit(eventName: string, ...args: any[]): void {
        if (GameService.targetFramework === 'altv') {
            alt.emit(eventName, ...args);
        } else if (GameService.targetFramework === 'fivem') {
            const getParentResourceName = (window as Window & { GetParentResourceName?: () => string }).GetParentResourceName;
            if (!getParentResourceName) return;

            fetch(`https://${getParentResourceName()}/${eventName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(args),
            }).catch((_) => {})
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

GameService.getInstance();