# 마인크래프트 건축 블록 확장

이 확장은 마인크래프트 에듀케이션 에디션에서 다양한 모양의 건물을 쉽게 만들 수 있는 블록들을 제공합니다.

## 기능

### 직각 건물
- **ㅁ(정사각형)** 모양 건물 만들기
- **ㄱ(기역)** 모양 건물 만들기
- **ㄷ(디귿)** 모양 건물 만들기

### 원형 건물
- **원형(○)** 모양 건물 만들기

### 공통 기능
- 다양한 설정 가능 (크기, 층높이, 블록 종류 등)
- 자동 창문 생성
- 다층 건물 지원
- 다양한 지붕 형태

## 사용 방법

1. 마인크래프트 에듀케이션 에디션 프로젝트에 이 확장을 추가하세요
2. 도구상자에서 **건축** 카테고리를 선택하세요
3. 필요한 설정을 조정하세요
4. 월드에 건물을 배치하세요

## 직각 건물 설정

### 건물 속성 정하기
먼저 "직각 건물 속성 정하기" 블록으로 기본 설정을 합니다.

#### 크기 설정
- **가로x끝**: 건물의 가로 크기 (5-100 블록)
- **세로z끝**: 건물의 세로 크기 (5-100 블록)
- **높이**: 건물의 높이 (5-100 블록)
- **층높이**: 각 층의 높이 (3-10 블록, 0이면 단층)

#### 블록 종류
- **바닥외부블록**: 바닥 테두리에 사용할 블록
- **바닥내부블록**: 바닥 내부에 사용할 블록
- **기둥블록**: 모서리 기둥에 사용할 블록
- **벽블록**: 벽에 사용할 블록
- **지붕블록**: 지붕에 사용할 블록

#### 지붕 형태
1. **평면**: 단순한 평평한 지붕
2. **삼각형**: 삼각형 모양의 지붕
3. **피라미드형**: 피라미드 모양의 지붕 (ㅁ 모양만 가능)
4. **돔형**: 돔 형태의 지붕 (ㅁ 모양에서 가로와 세로가 같을 때만 가능)

#### 창문 설정
- **창문만들기**: 창문 설치 여부 (true/false)
- **창문블록**: 창문에 사용할 블록
- **창문길이**: 각 창문의 길이 (1-10 블록)
- **창문간격**: 창문 사이의 간격 (1-10 블록)

#### 기타 설정
- **지붕한계높이**: 지붕의 최대 높이 제한 (0-50 블록, 0이면 제한 없음)

### 건물 생성
속성을 설정한 후 원하는 건물 모양을 선택합니다. 건물이 완성되는 시간동안 움직이면 안됩니다:

- **ㅁ형 건물 생성**: 정사각형/직사각형 건물
- **ㄱ형 건물 생성**: L자 모양 건물
- **ㄷ형 건물 생성**: U자 모양 건물

### 건물 제거
- **직각 건물 지우기**: 생성된 건물을 제거, 건축을 시작한 위치에서 실행.

## 원형 건물 설정

### 건물 속성 정하기
먼저 "원형 건물 속성 정하기" 블록으로 기본 설정을 합니다.

#### 크기 설정
- **반지름**: 건물의 반지름 (3-50 블록)
- **높이**: 건물의 높이 (3-100 블록)
- **층높이**: 각 층의 높이 (3-10 블록, 0이면 단층)

#### 블록 종류
- **바닥외부블록**: 바닥 테두리에 사용할 블록
- **바닥내부블록**: 바닥 내부에 사용할 블록
- **벽블록**: 벽에 사용할 블록
- **지붕블록**: 지붕에 사용할 블록

#### 지붕 형태
1. **평면**: 단순한 평평한 지붕
2. **원뿔형**: 원뿔 모양의 지붕
3. **돔형**: 돔 형태의 지붕

#### 기타 설정
- **지붕한계높이**: 지붕의 최대 높이 제한 (0-50 블록, 0이면 제한 없음)

### 건물 생성
- **원형 건물 생성**: 원형 건물 생성, 플레이어 위치가 바닥면 중심, 건설 중 움직여도 됨.

### 건물 제거
- **원형 건물 지우기**: 생성된 원형 건물을 제거, 건설을 시작한 위치에서 실행해야 함.

## 사용 팁

### 건물 배치
- 건물은 플레이어가 서 있는 위치를 기준으로 생성됩니다
- 충분한 공간이 있는 곳에서 사용하세요

### 층 높이 설정
- 층높이를 0으로 설정하면 단층 건물이 됩니다
- 층높이를 설정하면 자동으로 다층 건물이 생성되고 각 층에 바닥과 창문이 추가됩니다

### 창문 배치 (직각 건물만)
- 창문은 벽의 2-3 블록 높이에 자동으로 배치됩니다
- 창문 개수는 벽의 길이와 창문 설정에 따라 자동 계산됩니다

### 지붕 형태별 특징
- **평면 지붕**: 모든 건물 모양에서 사용 가능
- **삼각형/원뿔 지붕**: 건물의 한 방향으로 경사
- **피라미드/돔 지붕**: 중앙에서 모든 방향으로 경사

### ㄱ형, ㄷ형 건물 특징
- **ㄱ형**: 전체 크기의 절반씩 잘린 L자 모양
- **ㄷ형**: 세로를 3등분하여 가운데 부분이 뚫린 U자 모양

## 권장 설정값

### 작은 집
```
가로x끝: 10, 세로z끝: 10, 높이: 8
층높이: 0 (단층)
창문길이: 2, 창문간격: 2
```

### 아파트 건물
```
가로x끝: 20, 세로z끝: 15, 높이: 25
층높이: 4 (다층)
창문길이: 1, 창문간격: 1
```

### 성곽
```
가로x끝: 30, 세로z끝: 30, 높이: 15
층높이: 0, 지붕형태: 평면
창문길이: 1, 창문간격: 3
```

## 라이선스

MIT

## 지원 대상

* PXT/minecraft 용
(패키지 검색을 위한 메타데이터입니다.)