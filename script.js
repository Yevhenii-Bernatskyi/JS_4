(function(window) {

    const SortLib = {};

    let comparisons = 0; //порів
    let swapsOrMoves = 0; //обміни/переміщення
    let undefinedCount = 0; // колво undefined
    let lastSortMethodName = "";

    //нулл це заміна undefined
    function GetForCompareValue(item) {
        if (item === null) {
            return 0;
        }
        return item;
    }

    //готуємо масив, міняємо undefined на null, рахуємо кількість undefined
    function prepareArrayAndResetStats(inputArray, methodName) {
        comparisons = 0;
        swapsOrMoves = 0;
        undefinedCount = 0;
        lastSortMethodName = methodName;

        const arr = [];

        for (let i = 0; i < inputArray.length; i++) {
            if (inputArray[i] === undefined) {
                undefinedCount++;
                arr.push(null);
            } else {
                arr.push(inputArray[i]);
            }
        }
        return arr;
    }
    
    // 1. метод бульбашки
    SortLib.bubbleSort = function(inputArray, ascending = true) {
        const arr = prepareArrayAndResetStats(inputArray, "BubbleSort");
        const n = arr.length;
        let swapped;

        for (let i = 0; i < n - 1; i++) {
            swapped = false;

            for (let j = 0; j < n - 1 - i; j++) {
                comparisons++;
                const val1 = GetForCompareValue(arr[j]);
                const val2 = GetForCompareValue(arr[j+1]);
                
                let shouldSwap = false;

                if (ascending) {
                    if (val1 > val2) shouldSwap = true;
                } else {
                    if (val1 < val2) shouldSwap = true;
                }

                if (shouldSwap) {
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                    swapsOrMoves++;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
        return arr;
    };

    // 2. метод вибору
    SortLib.selectionSort = function(inputArray, ascending = true) {
        const arr = prepareArrayAndResetStats(inputArray, "SelectionSort");
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            let minMaxIdx = i;

            for (let j = i + 1; j < n; j++) {
                comparisons++;
                const currentVal = GetForCompareValue(arr[j]);
                const minMaxVal = GetForCompareValue(arr[minMaxIdx]);

                if (ascending) {
                    if (currentVal < minMaxVal) minMaxIdx = j;
                } else {
                    if (currentVal > minMaxVal) minMaxIdx = j;
                }
            }

            if (minMaxIdx !== i) {
                [arr[i], arr[minMaxIdx]] = [arr[minMaxIdx], arr[i]];
                swapsOrMoves++;
            }
        }
        return arr;
    };

    // 3. метод  вставки
    SortLib.insertionSort = function(inputArray, ascending = true) {
        const arr = prepareArrayAndResetStats(inputArray, "InsertionSort");
        const n = arr.length;

        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            
            const keyVal = GetForCompareValue(key);

            while (j >= 0) {
                comparisons++;
                const currentArrJVal = GetForCompareValue(arr[j]);
                let conditionMet;
                if (ascending) {
                    conditionMet = currentArrJVal > keyVal;
                } else {
                    conditionMet = currentArrJVal < keyVal;
                }

                if (conditionMet) {
                    arr[j + 1] = arr[j];
                    swapsOrMoves++;
                    j--;
                } else {
                    break; 
                }
            }

            if (arr[j + 1] !== key) {
                arr[j + 1] = key;
            }
        }
        return arr;
    };


    // 4. Шелла
    SortLib.shellSort = function(inputArray, ascending = true) {
        const arr = prepareArrayAndResetStats(inputArray, "ShellSort");
        const n = arr.length;
        
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = arr[i];
                let j = i;
                const tempVal = GetForCompareValue(temp);

                while (j >= gap) {
                    comparisons++;
                    const arrJGapVal = GetForCompareValue(arr[j-gap]);
                    let conditionMet;
                    if (ascending) {
                        conditionMet = arrJGapVal > tempVal;
                    } else {
                        conditionMet = arrJGapVal < tempVal;
                    }

                    if (conditionMet) {
                        arr[j] = arr[j - gap];
                        swapsOrMoves++;
                        j -= gap;
                    } else {
                        break;
                    }
                }
                if (arr[j] !== temp) {
                     arr[j] = temp;
                }
            }
        }
        return arr;
    };

    // 5. Швидке
    SortLib.quickSort = function(inputArray, ascending = true) {
        const arr = prepareArrayAndResetStats(inputArray, "QuickSort");

        function partition(low, high) {
            const pivotVal = GetForCompareValue(arr[Math.floor((low + high) / 2)]);
            let i = low - 1;
            let j = high + 1;

            while (true) {
                do {
                    i++;
                    comparisons++; 
                } while (ascending ? GetForCompareValue(arr[i]) < pivotVal : GetForCompareValue(arr[i]) > pivotVal);
                
                do {
                    j--;
                    comparisons++;
                } while (ascending ? GetForCompareValue(arr[j]) > pivotVal : GetForCompareValue(arr[j]) < pivotVal);

                if (i >= j) {
                    return j;
                }
                [arr[i], arr[j]] = [arr[j], arr[i]];
                swapsOrMoves++;
            }
        }

        function quickSortRecursive(low, high) {
            if (low < high) {
                let pi = partition(low, high);
                quickSortRecursive(low, pi);
                quickSortRecursive(pi + 1, high);
            }
        }

        if (arr.length > 1) {
            quickSortRecursive(0, arr.length - 1);
        }
        return arr;
    };


    SortLib.getSortInfo = function() {
        if (!lastSortMethodName) {
            return "Інформація про сортування відсутня.";
        }
        let info = `${lastSortMethodName}: Порівнянь - ${comparisons}, Переміщень/Обмінів - ${swapsOrMoves}.`;
        if (undefinedCount > 0) {
            info += ` Знайдено та оброблено ${undefinedCount} undefined-елементів.`;
        }
        return info;
    };

    window.SortLib = SortLib;
})(window);


function createArray(length) {
    const arr = [];

    for (let i = 0; i < length; i++) {
            arr.push(Math.floor(Math.random() * 100) - 50);
    }

    return arr;
}

console.log("Демонстрація");

// 1. без undefined
const denseArray = createArray(100); 
console.log("=== нерозріджений (100 елементів) ===");
console.log("нерозріджений масив:", denseArray);

let sortedDense;
 
sortedDense = SortLib.bubbleSort([...denseArray], true);
console.log("Bubble Sort:", sortedDense.slice(0, 20));
console.log(SortLib.getSortInfo());

sortedDense = SortLib.selectionSort([...denseArray], false);
console.log("Selection Sort:", sortedDense.slice(0, 20));
console.log(SortLib.getSortInfo());

sortedDense = SortLib.insertionSort([...denseArray], true);
console.log("Insertion Sort:", sortedDense.slice(0, 20));
console.log(SortLib.getSortInfo());

sortedDense = SortLib.shellSort([...denseArray], false);
console.log("Shell Sort:", sortedDense.slice(0, 20));
console.log(SortLib.getSortInfo());

sortedDense = SortLib.quickSort([...denseArray], true);
console.log("Quick Sort:", sortedDense.slice(0, 20));
console.log(SortLib.getSortInfo());


// 2. з undefined
const sparseArray = createArray(100);
sparseArray[5] = undefined;
sparseArray[15] = undefined;
sparseArray[30] = undefined;
sparseArray[50] = undefined;

console.log("=== розріджений масив (100 елементів) ===");
console.log("розріджений масив:", sparseArray.map(x => x === undefined ? 'undef' : x));

let sortedSparse;

sortedSparse = SortLib.bubbleSort([...sparseArray], true);
console.log("Bubble Sort:", sortedSparse.map(x => x === null ? 'null(was undef)' : x));
console.log(SortLib.getSortInfo());

sortedSparse = SortLib.selectionSort([...sparseArray], false);
console.log("Selection Sort:", sortedSparse.map(x => x === null ? 'null(was undef)' : x).slice(0, 20));
console.log(SortLib.getSortInfo());

sortedSparse = SortLib.insertionSort([...sparseArray], true);
console.log("Insertion Sort:", sortedSparse.map(x => x === null ? 'null(was undef)' : x).slice(0, 20));
console.log(SortLib.getSortInfo());

sortedSparse = SortLib.shellSort([...sparseArray], false);
console.log("Shell Sort:", sortedSparse.map(x => x === null ? 'null(was undef)' : x).slice(0, 20));
console.log(SortLib.getSortInfo());

sortedSparse = SortLib.quickSort([...sparseArray], true);
console.log("Quick Sort:", sortedSparse.map(x => x === null ? 'null(was undef)' : x).slice(0, 20));
console.log(SortLib.getSortInfo());
