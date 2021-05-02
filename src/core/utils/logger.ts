// Beautify mette da la possibilità di colorare i log rapidamente
const beautify = require("beautify.log").default;

// Metodi da utilizzare per loggare nella console
module.exports = {
    info(message: String) {
        beautify.log(`{fgGreen}[INFO] {reset}${message}`);
    },

    warn(message: String) {
        beautify.log(`{fgYellow}[WARN] {reset}${message}`);
    },

    // TODO: Qual'è il type per le eccezioni?
    error(message: String, error: any) {
        beautify.log(`{fgRed}[ERROR] {reset}${message}\n${error}`);
    },
}
