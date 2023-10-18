/**
 * 시간 초과 풀이
 * @param {*} order 
 * @returns 
 */
function solution(order) {
    let main = [...order.map((item, i) => i + 1)];
    let sub = [];
    let truck = [];
    
    // 지금 들어갈 박스의 인덱스.
    let boxIndex = 0;
    
    for (let i = 0; i < order.length; i ++) {
      const nowBox = main.shift();
      
      if(nowBox === order[boxIndex]) {
        truck.push(nowBox);
        boxIndex += 1;
      }else {
        // 현재 메인 벨트의 제일 앞에 있는 상자가 순서에 맞지 않는 상자일 때.
        // 서브 벨트의 제일 앞에 있는 상자를 확인.
        if (sub[sub.length - 1] === order[boxIndex]) {
          let n = sub.pop();
          truck.push(n);
          boxIndex ++;
        }
        
        sub.push(nowBox);
      }  
    }
    
    let len = sub.length;
    
    for (let j = 0; j < len; j++) {
      const nowBox = sub.pop();
      
      if(nowBox === order[boxIndex]) {
        truck.push(nowBox);
        boxIndex ++;
      }else {
        break;
      }
    }
    
    return truck.length;
  }

/**
 * 정답 풀이
 * @param {*} order 
 * @returns 
 */
function solution (order) {
    const sub = [];
    const truck = [];
    // 메인 컨테이너는 1 박스부터 order.length 만큼 존재함.
    let containerBox = 1;
    let boxIndex = 0;
    
    
    while(containerBox <= order.length + 1) {
      
      // 서브 컨테이너 벨트에 있는 경우
      if(sub.length !== 0 && order[boxIndex] === sub.at(-1)) {
        truck.push(sub.pop());
        boxIndex += 1;
        continue;
      }
      
      // 메인 컨테이너 벨트에 있는 경우
      if(containerBox === order[boxIndex]) {
        truck.push(containerBox);
        containerBox += 1;
        boxIndex += 1;
        continue;
      }
          
      sub.push(containerBox);
      containerBox += 1;
    }
    
    return truck.length;
  }