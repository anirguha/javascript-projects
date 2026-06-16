document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

function convertToCamelCase(text) {
  const [text1, text2] = text.split('_');
  return `${text1}${text2[0].toUpperCase()}${text2.slice(1)}`;
}

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;

  for (const [i, word] of text.split('\n').entries()) {
    const camelCaseWord = convertToCamelCase(word.trim());
    console.log(`${camelCaseWord.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});

const flights = `_Delayed_Departure;fao93766109;txl2133758440;11:25
  +_Arrival;bru0943384722;fao93766109;11:45
  +_Delayed_Arrival;hel7439299980;fao93766109;12:05
  +_Departure;fao93766109;lis2323639855;12:30`;

for (const flight of flights.split('\n')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${from.slice(0, 3).toUpperCase()} to ${to
    .slice(0, 3)
    .toUpperCase()} (${time.replace(':', 'h')})`.padStart(36);
  console.log(output);
}
