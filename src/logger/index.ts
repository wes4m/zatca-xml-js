
const LOGGING = process.env.LOGGING == "1";
 
export const log = (type: string, source: string, message: string) => {
    if (!LOGGING) return;
    console.log(`\x1b[33m${new Date().toLocaleString()}\x1b[0m: [\x1b[36m${source} ${type}\x1b[0m] ${message}`);
}