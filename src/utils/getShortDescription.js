export default function getShortDescription(description, position) {
  const pos = description.indexOf(' ', position);
  return pos === -1 ? description : `${description.slice(0, pos)}...`;
}
