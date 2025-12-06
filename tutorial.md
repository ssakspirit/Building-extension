# 건물 만들기 튜토리얼

## 소개 @unplugged

Building Extension을 사용하여 마인크래프트에서 멋진 건물을 쉽게 만들어봅시다!

## 단계 1

먼저 플레이어가 "1"이라고 채팅하면 건물을 만들도록 해볼게요.

``||player:on chat command||`` 블록을 작업 공간에 추가하세요.

```blocks
player.onChat("1", function () {

})
```

## 단계 2

이제 ``||building:직각 건물 속성 정하기||`` 블록을 추가하여 건물의 크기와 재료를 설정합니다.

```blocks
player.onChat("1", function () {
    building.직각건물속성정하기(
        10,
        10,
        12,
        4,
        0,
        COBBLESTONE,
        PLANKS_OAK,
        LOG_OAK,
        PLANKS_OAK,
        LIGHT_GRAY_CONCRETE,
        1,
        true,
        GLASS,
        2,
        2
    )
})
```

## 단계 3

건물 속성을 정했으니, 이제 ``||building:ㅁ형 건물 생성||`` 블록을 추가하여 실제로 건물을 만들어봅시다!

```blocks
player.onChat("1", function () {
    building.직각건물속성정하기(
        10,
        10,
        12,
        4,
        0,
        COBBLESTONE,
        PLANKS_OAK,
        LOG_OAK,
        PLANKS_OAK,
        LIGHT_GRAY_CONCRETE,
        1,
        true,
        GLASS,
        2,
        2
    )
    building.ㅁ형건물생성()
})
```

## 단계 4 @unplugged

완벽합니다! 이제 게임에서 "1"이라고 입력하면 멋진 집이 만들어집니다.

다른 모양도 시도해볼까요?

## 단계 5

이번에는 "2"라고 채팅하면 더 큰 건물을 만들어봅시다.

새로운 ``||player:on chat command||`` 블록을 추가하고, 크기를 더 크게 설정하세요.

```blocks
player.onChat("2", function () {
    building.직각건물속성정하기(
        20,
        15,
        20,
        5,
        0,
        STONE,
        PLANKS_SPRUCE,
        COBBLESTONE,
        STONE_BRICKS,
        BRICK_BLOCK,
        1,
        true,
        GLASS,
        2,
        3
    )
    building.ㅁ형건물생성()
})
```

## 단계 6 @unplugged

ㄱ형이나 ㄷ형 건물도 만들 수 있습니다!

``||building:ㅁ형 건물 생성||`` 대신 ``||building:ㄱ형 건물 생성||`` 또는 ``||building:ㄷ형 건물 생성||``을 사용해보세요.

## 단계 7

만든 건물이 마음에 들지 않나요? ``||building:직각 건물 지우기||`` 블록으로 간단히 지울 수 있습니다.

```blocks
player.onChat("0", function () {
    building.건물지우기()
})
```

## 단계 8 @unplugged

원형 건물도 만들 수 있습니다!

``||building:원형 건물 속성 정하기||``와 ``||building:원형 건물 생성||`` 블록을 사용해보세요.

## 단계 9

원형 건물을 만들어봅시다!

```blocks
player.onChat("3", function () {
    building.원형건물속성정하기(
        8,
        12,
        4,
        0,
        COBBLESTONE,
        PLANKS_OAK,
        LOG_OAK,
        LIGHT_GRAY_CONCRETE,
        1
    )
    building.원형건물생성()
})
```

## 단계 10

원형 건물도 ``||building:원형 건물 지우기||`` 블록으로 지울 수 있습니다.

```blocks
player.onChat("00", function () {
    building.원형건물지우기()
})
```

## 완료! @unplugged

축하합니다! Building Extension의 기본 사용법을 모두 배웠습니다.

이제 다양한 크기, 재료, 모양의 건물을 자유롭게 만들어보세요!

**팁:**
- 가로x끝, 세로z끝으로 건물 크기 조절
- 층높이로 각 층의 높이 설정
- 다양한 블록으로 재료 변경
- ㅁ형, ㄱ형, ㄷ형으로 다양한 모양 시도!
- 지붕형태를 바꿔서 평면, 삼각형, 피라미드, 돔형 지붕 시도!
- 원형 건물로 탑이나 성 만들기!
