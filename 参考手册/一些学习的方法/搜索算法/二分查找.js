//数组必须为有序
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

function binarySearch(sortedArray, target) {
    if (!Array.isArray(sortedArray) || typeof target !== 'number') {
        return -1; // 非法输入，返回-1
    }

    let low = 0;
    let high = sortedArray.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const guess = sortedArray[mid];

        if (guess === target) {
            return mid; // 找到目标值，返回索引
        }

        if (guess > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return -1; // 未找到目标值，返回-1
}

console.log(binarySearch(arr, 19), "win");












