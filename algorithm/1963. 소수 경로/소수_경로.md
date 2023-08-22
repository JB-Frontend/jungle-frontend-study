# 백준 1963 - 소수 경로

# ✅ 문제

<aside>
💡 소수를 유난히도 좋아하는 창영이는 게임 아이디 비밀번호를 4자리 ‘소수’로 정해놓았다. 어느 날 창영이는 친한 친구와 대화를 나누었는데:

- “이제 슬슬 비번 바꿀 때도 됐잖아”
- “응 지금은 1033으로 해놨는데... 다음 소수를 무엇으로 할지 고민중이야"
- “그럼 8179로 해”
- “흠... 생각 좀 해볼게. 이 게임은 좀 이상해서 비밀번호를 한 번에 한 자리 밖에 못 바꾼단 말이야. 예를 들어 내가 첫 자리만 바꾸면 8033이 되니까 소수가 아니잖아. 여러 단계를 거쳐야 만들 수 있을 것 같은데... 예를 들면... 1033 1733 3733 3739 3779 8779 8179처럼 말이야.”
- “흠...역시 소수에 미쳤군. 그럼 아예 프로그램을 짜지 그래. 네 자리 소수 두 개를 입력받아서 바꾸는데 몇 단계나 필요한지 계산하게 말야.”
- “귀찮아”

그렇다. 그래서 여러분이 이 문제를 풀게 되었다. 입력은 항상 네 자리 소수만(1000 이상) 주어진다고 가정하자. 주어진 두 소수 A에서 B로 바꾸는 과정에서도 항상 네 자리 소수임을 유지해야 하고, ‘네 자리 수’라 하였기 때문에 0039 와 같은 1000 미만의 비밀번호는 허용되지 않는다.

</aside>

# ✅ 조건

| 시간 제한 | 메모리 제한 |
| --- | --- |
| 2 초 | 256 MB |

# ✅ 입력

<aside>
💡 첫 줄에 test case의 수 T가 주어진다. 다음 T줄에 걸쳐 각 줄에 1쌍씩 네 자리 소수가 주어진다.

</aside>

# ✅ 출력

<aside>
💡 각 test case에 대해 두 소수 사이의 변환에 필요한 최소 회수를 출력한다. 불가능한 경우 Impossible을 출력한다.

</aside>

# ✅ 풀이

```jsx
let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().trim().split("\n");

const T = Number(input.shift());
const pairs = input.map(item => item.split(" "));
const visited = {};
const demicals = {};
const [dx, dy] = [[1,-1,0,0], [0,0,-1,0]];

const isDemical = (num) => {
    if(num === 1) return false;
    if(num === 2) return true;

    for (let i = 2; i < num; i ++) {
        if(num % i === 0) {
            return false;
        }
    }

    return true;
}

const BFS = (start, end) => {
    const queue = [[start, 0]];

    visited[start] = true;

    while (queue) {
        let nowElem = queue.shift();
        let nowStr = nowElem[0];

        if(nowStr === end) return nowElem[1];

        for (let i = 0; i < 4; i ++) {
            for (let j = 0; j < 10; j ++) {
                let temp = nowStr.slice(0, i) + j + nowStr.slice(i+1, nowStr.length);
                
                if(!visited[temp] && demicals[temp] && temp >= 1000) {
                    visited[temp] = true;
                    queue.push([temp, nowElem[1] + 1]);
                }
            }
        }
    }
}

pairs.forEach(item => {
    const [start, end] = item;

    for (let i = 1000; i <= 10000; i ++) {
        visited[i] = false;
        
        if(isDemical(i)) {
            demicals[i] = true;
        }
    }   

    let result = BFS(start, end);

    return result >= 0 ? console.log(result) : console.log("Impossible");
});
```

start로 주어진 소수를 시작으로 end에 도달할 때까지 거치는 소수의 수를 출력해주었다. 

비밀번호는 1000보다 크고 10000보다 작기 때문에 에라토스테네스의 체를 쓰지 않아도 시간 제한에 걸리지 않는다. (BUT *`O*(*n* log log *n*)`과 `O(N)`은 차이가 큼. 개선 필요.)

BFS를 사용해서 네자리 수를 0 ~ 9까지 바꿔가며, 해당하는 수가 1000보다 큰 소수인지 그리고 방문하지 않았던 소수인지를 판별해주었다. 

end에 도달했을 때 cnt 값이 거쳐온 소수의 개수를 뜻한다.

- JS로 소수를 찾는 알고리즘 구현.
    - BUT 에라토스테네스의 체 구현 X.
- JS로 BFS 알고리즘 구현.