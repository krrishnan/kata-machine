export default function bubble_sort(arr: number[]): void {
    let end = arr.length - 1;

    while (end > 0) {
        for (let i = 0; i < end; ++i) {
            if (arr[i] > arr[i + 1]) {
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
        end -= 1;
    }
}
