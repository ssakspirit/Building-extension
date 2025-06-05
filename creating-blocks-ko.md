# Minecraft용 블록 정의하기

이 문서는 pxt-minecraft용 확장에서 블록을 만드는 방법에 대한 간단한 가이드를 제공합니다. 블록 정의에 대한 전체 문서는 MakeCode 문서의 [블록 정의하기](https://makecode.com/defining-blocks)를 참조하세요. MakeCode 플레이그라운드(https://makecode.com/playground)를 사용하여 샘플과 블록 정의 코드를 빠르게 시도해볼 수 있습니다. 에디터 목록에서 Minecraft를 선택하면 에디터에서 블록이 어떻게 보이는지 확인할 수 있습니다.

## 카테고리 만들기

확장의 모든 블록은 네임스페이스 안에 위치해야 합니다. 확장의 네임스페이스를 선택할 때는 이미 존재하는 네임스페이스(`blocks` 등)나 사용자 변수 이름과 충돌할 수 있는 일반적인 단어(`item` 등)는 피하세요.

이름을 정했다면, 다음과 같이 카테고리의 아이콘, 표시 이름, 색상을 설정할 수 있습니다:

```ts
//% block="커스텀"
//% color="#eb4034"
//% icon="\uf007"
namespace custom {

}
```

위 코드에서 `block` 주석은 카테고리 이름을 설정하는 데 사용됩니다.

### 아이콘 선택하기

카테고리 아이콘은 FontAwesome 5를 사용합니다. 특정 아이콘의 올바른 값을 찾으려면:

1. https://fontawesome.com/v5/search?o=r&m=free&f=classic 방문
2. 마음에 드는 아이콘을 찾아 클릭하세요. 무료 티어와 "classic" 아이콘 세트(브랜드가 아닌)에서 선택해야 합니다.
3. 아이콘 코드 스니펫 위에 유니코드 문자 코드가 있습니다(예: `f0ad`)
4. 해당 코드를 복사하고 앞에 `\u`를 붙여서 아이콘 주석에 설정하세요(예: `icon="\uf007"`)

## 블록 정의하기

모든 블록은 TypeScript 함수로 정의됩니다. 함수 정의 위에 특별한 `//%` 주석을 사용하여 블록의 모양을 제어합니다. 모든 블록은 다음 주석을 가져야 합니다:

1. `blockId` - 블록의 ID를 설정합니다. 각 블록마다 고유해야 하며 다른 확장과의 충돌을 방지하기 위해 확장 이름을 포함해야 합니다.
2. `block` - 블록에 나타날 단어와 인수를 제어할 수 있습니다.

```ts
namespace custom {
    //% blockId=my_extension_example_block
    //% block="내 예제 블록"
    export function exampleBlock() {

    }
}
```

### 인수 추가하기

블록을 정의하는 함수가 인수를 받는 경우, MakeCode는 사용자가 값을 끌어다 놓을 수 있는 입력을 블록에 추가합니다. `block` 주석을 사용하여 이러한 인수가 나타나는 위치를 제어할 수 있습니다.

`block` 주석에서 인수를 참조할 때는 함수 정의에서 사용한 인수 이름 앞에 `$`를 붙입니다:

```ts
namespace custom {
    //% blockId=my_extension_example_block_with_args
    //% block="이 블록은 숫자 $myNum와 불리언 $myBool을 가집니다"
    export function exampleBlockWithArgs(myNum: number, myBool: boolean) {

    }
}
```

### 선택적 인수

블록은 선택적 인수도 가질 수 있습니다. 이러한 인수는 기본적으로 숨겨져 있으며 사용자에게 블록을 확장할 수 있는 `+` 버튼을 제공합니다. 이 선택적 인수 버튼이 나타날 위치를 정의하려면 블록 주석에서 `||`를 사용하세요:

```ts
namespace custom {
    //% blockId=my_extension_example_block_with_optional_args
    //% block="이 블록은 숫자 $myNum를 가집니다 ||그리고 선택적 불리언 $optionalBoolean도 있습니다"
    export function exampleBlockWithOptionalArgs(myNum: number, optionalBoolean?: boolean) {

    }
}
```

## 일반적인 Minecraft 인수 타입

기본적으로 MakeCode는 기본 타입의 인수에 대해 올바른 블록을 추론합니다. 문자열, 숫자, 불리언은 블록에서 올바르게 렌더링되기 위해 추가 주석이 필요하지 않습니다.

하지만 많은 인수 타입에는 값을 선택하기 위한 UI를 제공하는 "그림자" 블록이 있습니다.

### 블록, 아이템, 몹 타입

블록, 아이템, 몹은 모두 내부적으로 숫자로 표현됩니다. `shadow` 주석을 추가하면 사용자에게 기본 숫자 블록 대신 값을 선택할 수 있는 그리드 선택기가 제공됩니다.

다음 예제는 일반적인 숫자 타입에 대한 그림자 블록과 기본값을 설정하는 방법을 보여줍니다:

```ts
namespace custom {
    //% blockId=my_extension_name_mob_argument
    //% block="몹 인수 $mob"
    //% mob.shadow=minecraftAnimal
    //% mob.defl=AnimalMob.Squid
    export function mobArgument(mob: number) {

    }

    //% blockId=my_extension_name_monster_argument
    //% block="몬스터 인수 $monster"
    //% monster.shadow=minecraftMonster
    //% monster.defl=MonsterMob.Skeleton
    export function monsterArgument(monster: number) {

    }

    //% blockId=my_extension_name_block_argument
    //% block="블록 인수 $blockArg"
    //% blockArg.shadow=minecraftBlock
    //% blockArg.defl=Block.DiamondBlock
    export function blockArgument(blockArg: number) {

    }

    //% blockId=my_extension_name_item_argument
    //% block="아이템 인수 $item"
    //% item.shadow=minecraftItem
    //% item.defl=Item.GoldIngot
    export function itemArgument(item: number) {

    }
}
```

이 예제에서는 열거형 타입(예: `Block`, `AnimalMob` 등) 대신 인수 타입으로 `number`를 사용한다는 점에 주의하세요.

### 위치 타입

Minecraft 내에 존재하는 다양한 위치 형식에 대한 그림자 블록도 정의할 수 있습니다. 숫자 타입과 달리 이러한 그림자 블록에는 기본값을 설정할 수 없습니다.

다음 예제는 다양한 위치 타입에 대한 올바른 그림자 값을 보여줍니다:

```ts
namespace custom {
    //% blockId=my_extension_name_relative_position_argument
    //% block="상대 위치 인수 $relPos"
    //% relPos.shadow=minecraftCreatePosition
    export function relativePositionArgument(relPos: Position) {

    }

    //% blockId=my_extension_name_world_position_argument
    //% block="월드 위치 인수 $worldPos"
    //% worldPos.shadow=minecraftCreateWorldPosition
    export function worldPositionArgument(worldPos: Position) {

    }

    //% blockId=my_extension_name_camera_position_argument
    //% block="카메라 위치 인수 $camPos"
    //% camPos.shadow=minecraftCreatePositionCamera
    export function cameraPositionArgument(camPos: Position) {

    }

    //% blockId=my_extension_name_local_position_argument
    //% block="로컬 위치 인수 $localPos"
    //% localPos.shadow=minecraftCreatePositionLocal
    export function localPositionArgument(localPos: Position) {

    }
}
```

## 일반적인 블록 모양

### 명령문

아무것도 반환하지 않는 모든 블록은 기본적으로 명령문입니다. 명령문 블록은 이벤트 블록 안에 배치될 수 있습니다.

### 리포터

값을 반환하는 함수는 자동으로 리포터 블록으로 변환됩니다. 이러한 블록은 둥글거나 육각형이며 다른 블록의 인수로 전달될 수 있습니다.

리포터 블록을 만들 때는 항상 함수에 반환 타입을 명시적으로 나열하는 것이 좋습니다.

### 이벤트

다른 함수를 인수로 받는 함수는 이벤트 블록으로 변환됩니다. 이벤트 블록은 최상위 블록이며 그 안에 명령문을 배치할 수 있습니다. 항상 최상위에 있으며 다른 이벤트 안에 배치될 수 없습니다.

이벤트 블록에는 다음과 같은 제한이 있습니다:

1. 값을 반환할 수 없습니다
2. 마지막 인수로 함수를 받아야 합니다
3. 선택적 인수를 가질 수 없습니다
4. 함수 인수는 하나만 가질 수 있습니다

```ts
namespace custom {
    //% blockId=my_extension_name_simple_event
    //% block="블록 인수 $blockArg를 가진 이벤트"
    //% blockArg.shadow=minecraftBlock
    export function simpleEvent(blockArg: number, handler: () => void) {

    }
}
```

#### 콜백 인수가 있는 이벤트

때로는 이벤트 블록에서 사용자의 코드에 인수를 전달하는 것이 유용할 수 있습니다.

예를 들어, 블록이 배치될 때마다 사용자 코드를 실행하는 이벤트를 만든다면 블록의 타입을 사용자에게 변수로 전달하고 싶을 수 있습니다.

블록에 끌어다 놓을 수 있는 콜백 인수를 추가하려면 함수 인수의 타입을 매개변수를 포함하도록 변경하고 다른 인수와 마찬가지로 블록 문자열 안에서 참조하세요. 또한 `draggableParameters=reporter` 주석을 추가해야 합니다:

```ts
namespace custom {
    //% blockId=my_extension_name_event_with_callback_argument
    //% block="끌어다 놓을 수 있는 콜백 매개변수 $block를 가진 이벤트"
    //% draggableParameters=reporter
    export function eventWithCallbackArgument(handler: (block: number) => void) {

    }
}
```

#### 도킹 가능한 이벤트

`handlerStatement` 주석을 추가하여 이벤트를 명령문으로 만들 수 있습니다.

```ts
namespace custom {
    //% blockId=my_extension_name_dockable_event
    //% block="블록 인수 $blockArg를 가진 도킹 가능한 이벤트"
    //% blockArg.shadow=minecraftBlock
    //% handlerParameter=1
    export function dockableEvent(blockArg: number, handler: () => void) {

    }
} 