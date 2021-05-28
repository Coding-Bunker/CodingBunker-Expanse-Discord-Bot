import colors from "ansi-colors";

// Metodi da utilizzare per loggare nella console
export const info = (message: string) => {
  console.log(`${colors.green("[INFO]")} ${message}`)
};

export const warn = (message: string) => {
  console.log(`${colors.yellow("[WARN]")} ${message}`)
};

// TODO: Qual'è il type per le eccezioni?
/**@fabry-js: Nessuno, in JS/TS non esistono type per eccezioni specifiche,
 * abbiamo solo il generic Error(),
 * odio Java.
 */
export const error = (message: string, error: any) => {
  console.log(`${colors.red("[ERR]")} ${message}\n${error.message}`)
};
