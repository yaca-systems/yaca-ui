export class GameService {
    private static targetFramework: string = '';
    private static events: Map<string, any> = new Map();
    private static instance: GameService;

    constructor() {
        if (typeof (window as any)['alt'] !== "undefined") {
            GameService.targetFramework = 'altv';
        } else if (typeof (window as any)['nuiTargetGame'] !== "undefined") {
            GameService.targetFramework = 'fivem';

            window.addEventListener("message", function (event) {
                const { eventName, ...params } = event.data;

                const eventData = GameService.events.get(eventName);
                if (!eventData) return;

                eventData(...Object.values(params));
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
            GameService.events.set(eventName,listener);
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
            fetch(`https://${GetParentResourceName()}/${eventName}`, {
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