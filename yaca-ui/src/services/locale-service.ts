class LocaleService {
    private static locales: Record<string, string> = {};

    /**
     * Adds a locale message for given key
     * @param {string} key key - Key for locale message
     * @param {string} msg msg - Message for key
     */
    static AddLocale(key: string, msg: string): void {
        if (typeof key !== 'string' || typeof msg !== 'string') {
            throw new Error("Key and message must be strings");
        }

        if (!Object.prototype.hasOwnProperty.call(this.locales, key)) {
            this.locales[key] = msg;
        } else {
            throw new Error(`Locale with key ${key} already exists`);
        }
    }

    /**
     * To get locale from key. If key is not present, an error message will be returned
     * @param {string} key key - Key for wanted locale
     * @returns {string} - Locale message
     */
    static GetLocale(key: string): string {
        if (!Object.prototype.hasOwnProperty.call(this.locales, key)) {
            return "Error: Unknown key: " + key;
        }

        return this.locales[key];
    }
}

export default LocaleService;