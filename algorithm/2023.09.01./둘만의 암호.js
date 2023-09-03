function solution(s, skip, index) {
    // 알파벳 배열로 만들기
    const abc = "abcdefghijklmnopqrstuvwxyz".split("");
    // skip을 제외한 알파벳 배열 만들기
    for (let i = 0; i < skip.length; i++) {
        const idx = abc.indexOf(skip[i]);
        if (idx > -1) abc.splice(idx, 1);
    }
    // s를 반복문을 돌며 바뀔 인덱스를 찾고, 그 인덱스에 해당하는 abc배열의 값을 answerArray에 저장
    const answerArray = [];
    for (let i = 0; i < s.length; i++) {
        let changeAlphabetIdx = abc.indexOf(s[i]) + index;
        // 인덱스가 abc 배열의 인덱스를 넘어서면 그 값만큼 뺌
        while (changeAlphabetIdx >= abc.length) {
            changeAlphabetIdx -= abc.length;
        }
        answerArray.push(abc[changeAlphabetIdx]);
        // console.log(answerArray);
    }
    return answerArray.join("");
}
