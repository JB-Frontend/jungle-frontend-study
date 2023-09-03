function solution(numbers) {
    const length = numbers.length;
  
    // 뒷 큰수가 모두 존재하지 않는 것으로 가정하고 정답 배열은 -1로 설정.
    const answer = Array.from({length}, () => -1);
    const stack = [];

    // numbers 순회
    for (let i = length - 1; i >= 0; i--) {
        // 스택의 꼭대기 부터 계속 뒷큰수 찾아나감.
        while (stack.length !== 0 && numbers[i] >= stack.at(-1)) {
          stack.pop();
        }
      
        // 뒷큰수가 존재할 시
        if (stack.length !== 0) {
          answer[i] = stack.at(-1);
        }
      
        // 다음 숫자를 위해 현재 숫자를 스택에 푸시
        stack.push(numbers[i]);
    }
  
    return answer;
}