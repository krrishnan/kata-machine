function weakSort(arr: number[], low: number, high: number) {
    let idx = low - 1;
    const pivot = arr[high];
    for (let i = low; i < high; i++) {
        if (arr[i] <= pivot) {
            idx++;
            const temp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = temp;
        }
    }

    idx++;
    arr[high] = arr[idx];
    arr[idx] = pivot;

    return idx;
}
function qs(arr: number[], low: number, high: number): void {
    if (low >= high) return;
    const pivotIndex = weakSort(arr, low, high);
    qs(arr, low, pivotIndex - 1);
    qs(arr, pivotIndex + 1, high);
}
export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
