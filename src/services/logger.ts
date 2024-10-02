enum LogColour {
  Red = 91,
  Green = 92,
  Yellow = 93,
  Blue = 94
}

export function error(message: string) {
  print(message, LogColour.Red);
}

export function warning(message: string) {
  print(message, LogColour.Yellow);
}

export function success(message: string) {
  print(message, LogColour.Green);
}

export function info(message: string) {
  print(message, LogColour.Blue);
}

function print(message: string, colour: LogColour) {
  console.log(`[${colour}m[ForestForge] ${message}[0m`);
}
