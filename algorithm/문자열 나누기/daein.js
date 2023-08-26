// 83.3 / 100 failed 시간초과
function solution(s) {
    let answer = 0;
    let rest = 0;
    let sliceValue = 0;
    let word = s;
    let x = "";

    while (word.length > 1) {
        x = word[0];
        for (const i of word) {
            if (i === x) rest += 1;
            else rest -= 1;

            sliceValue += 1;

            if (rest === 0) {
                answer += 1;
                word = word.slice(sliceValue);
                sliceValue = 0;
                break;
            }
        }
    }
    if (word.length === 1) answer += 1;

    return answer;
}
