export function changeCounterValue(counterDirection, currentValue, counterStep) {
  if (counterDirection === '+') {
    return currentValue + counterStep;
  }
  if (counterDirection === '-' && currentValue > 1) {
    return currentValue - counterStep;
  }
  if (currentValue === 1) {
    return 1;
  }
}
