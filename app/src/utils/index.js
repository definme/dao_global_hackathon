export function shortenAddress(address) {
  return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`
}

export function percentage(partialValue, totalValue) {
  return Number((100 * partialValue) / totalValue).toFixed(1)
}
