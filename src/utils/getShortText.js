export default function gSetShortText(text, positionToCut) {
  const pos = text.indexOf(' ', positionToCut);
  return pos === -1 ? text : `${text.slice(0, pos)}...`;
}
