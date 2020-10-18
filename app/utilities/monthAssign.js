'use strict';

function generate(arr) {
    const randomShuffle = Math.floor(Math.random() * 10000) + 2500;
    let index1, index2;
    
    for (let i = 0; i < randomShuffle; i++) {
        index1 = Math.floor(Math.random() * arr.length);
        index2 = Math.floor(Math.random() * arr.length);
        if (index1 !== index2) {
            [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
        }
    }
    if (arr.length !== days) {
        return 'error';
    } else {
        arr.unshift(days);
        return arr;
    }
}

//const days = 31;
//
//let arr = ['_JanuaryA'];
//
//for (let i = 0; i < 10; i++) {
//    arr.push('_JanuaryC');
//    arr.push('_JanuaryB');
//    arr.push('_JanuaryA')
//}
//
//const days = 29
//
//let arr = [];
//
//for (let i = 0; i < 9; i++) {
//    arr.push('_FebruaryA');
//}
//for (let i = 0; i < 10; i++) {
//    arr.push('_FebruaryB');
//    arr.push('_FebruaryC');
//}

const days = 31;

let arr = ['_MarchA'];

for (let i = 0; i < 10; i++) {
    arr.push('_MarchA');
    arr.push('_MarchB');
    arr.push('_MarchC');
}

//const days = 30;
//
//let arr = [];
//
//for (let i = 0; i < 10; i++) {
//    arr.push('_AprilA');
//    arr.push('_AprilB');
//    arr.push('_AprilC');
//}



console.log(generate(arr));