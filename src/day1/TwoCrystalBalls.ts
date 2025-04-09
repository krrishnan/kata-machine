export default function two_crystal_balls(breaks: boolean[]): number {
    const jumpAmount = Math.floor(Math.sqrt(breaks.length));
    let i = jumpAmount;
    for (; i < breaks.length; i += jumpAmount) if (breaks[i]) break;
    let j = i - jumpAmount;
    for (; j <= i; ++j) if (breaks[j]) return j;

    return -1;
}
