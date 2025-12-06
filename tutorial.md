# 건물 만들기 튜토리얼

## 소개 @unplugged

Building Extension을 사용하여 마인크래프트에서 멋진 건물을 만들어봅시다!

## 단계 1

먼저 플레이어가 "건물"이라고 채팅하면 정사각형 건물을 만들도록 해볼게요.

``||player:on chat command||`` 블록을 추가하세요.

```blocks
player.onChat("건물", function () {

})
```

## 단계 2

이제 ``||building:정사각형 건물 만들기||`` 블록을 추가하여 간단한 집을 만들어봅시다.

크기를 10x10, 높이 8로 설정하세요.

```blocks
player.onChat("건물", function () {
    building.createSquareBuilding(
        pos(0, 0, 0),
        10,
        10,
        8,
        PLANKS_OAK,
        PLANKS_SPRUCE,
        STONE,
        BRICK_BLOCK,
        BuildingRoofType.Flat,
        3,
        1
    )
})
```

## 단계 3 @unplugged

잘했어요! 이제 게임에서 "건물"이라고 입력하면 집이 만들어집니다.

다른 모양도 시도해보세요!

## 완료! @unplugged

축하합니다! Building Extension 사용법을 배웠습니다.

이제 다양한 크기와 모양의 건물을 만들어보세요!
