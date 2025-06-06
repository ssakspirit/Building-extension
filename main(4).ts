namespace building {
    // enum 지붕형태 관련 코드 전체 삭제

    const COBBLESTONE = 4;
    const IRON_BLOCK = 42;
    const LOG_OAK = 17;
    const PLANKS_OAK = 5;
    const LIGHT_GRAY_CONCRETE = 251;
    const GLASS = 20;

    // 자동으로 계산되는 매개변수들
    let 가로x끝 = 0
    let 세로z끝 = 0
    let 높이 = 0
    let 층높이 = 0
    let 지붕한계높이 = 0
    let 바닥외부블록 = 0
    let 바닥내부블록 = 0
    let 기둥블록 = 0
    let 벽블록 = 0
    let 지붕블록 = 0
    let 지붕형태 = 0
    let 창문_만들기 = false
    let 창문_블록 = 0
    let 창문_길이 = 0
    let 창문_간격 = 0
    let 가로x시작 = 0
    let 세로z시작 = 0
    let ㄷ창문_만들기_조절 = false
    let 층높이합계 = 0
    let 가로12 = 0
    let 세로13 = 0
    let 세로13지점 = 0
    let 세로23지점 = 0
    let index = 0
    let 가로길이 = 0
    let 세로길이 = 0
    let 반복 = 0
    let 창문_위치_합 = 0
    let 가로x창문_수 = 0
    let 세로z창문_수 = 0
    let 곡면지붕ㅁ중심 = 0
    let 곡면지붕ㅁ반지름 = 0
    let 지울_높이 = 0
    let 세로12 = 0
    let floorHeightSum = 0
    let windowAdjustment = false

    /**
     * 건물 속성을 정하고 자동 계산을 수행하는 명령블록
     */
    //% block="건물 속성 정하기 || 가로x끝:$width 세로z끝:$length 높이:$height 층높이:$floorHeight 지붕한계높이:$roofLimit | 바닥외부블록:$floorOuterBlock 바닥내부블록:$floorInnerBlock 기둥블록:$pillarBlock 벽블록:$wallBlock 지붕블록:$roofBlock 지붕형태:$roofType | 창문만들기:$windowEnabled 창문블록:$windowBlock 창문길이:$windowLength 창문간격:$windowGap"
    //% width.defl=20
    //% width.min=5 width.max=100
    //% length.defl=20
    //% length.min=5 length.max=100
    //% height.defl=20
    //% height.min=5 height.max=100
    //% floorHeight.defl=4
    //% floorHeight.min=3 floorHeight.max=10
    //% roofLimit.defl=0
    //% roofLimit.min=0 roofLimit.max=50
    //% floorOuterBlock.shadow=minecraftBlock
    //% floorOuterBlock.defl=Block.Cobblestone
    //% floorInnerBlock.shadow=minecraftBlock
    //% floorInnerBlock.defl=Block.PlanksOak
    //% pillarBlock.shadow=minecraftBlock
    //% pillarBlock.defl=Block.LogOak
    //% wallBlock.shadow=minecraftBlock
    //% wallBlock.defl=Block.PlanksOak
    //% roofBlock.shadow=minecraftBlock
    //% roofBlock.defl=Block.LightGrayConcrete
    //% roofType.shadow="roofTypePicker"
    //% roofType.defl=1
    //% roofType.min=1 roofType.max=4
    //% roofType.enum="지붕형태"
    //% windowEnabled.defl=true
    //% windowBlock.shadow=minecraftBlock
    //% windowBlock.defl=Block.Glass
    //% windowLength.defl=2
    //% windowLength.min=1 windowLength.max=10
    //% windowGap.defl=2
    //% windowGap.min=1 windowGap.max=10
    //% expandableArgumentMode="toggle"
    //% weight=100
    export function 건물속성정하기(
        width: number = 20,
        length: number = 20,
        height: number = 20,
        floorHeight: number = 4,
        roofLimit: number = 0,
        floorOuterBlock: number = COBBLESTONE,
        floorInnerBlock: number = PLANKS_OAK,
        pillarBlock: number = LOG_OAK,
        wallBlock: number = PLANKS_OAK,
        roofBlock: number = LIGHT_GRAY_CONCRETE,
        roofType: number = 1,
        windowEnabled: boolean = true,
        windowBlock: number = GLASS,
        windowLength: number = 2,
        windowGap: number = 2
    ): void {
        
        // 인수값들을 변수에 할당
        가로x끝 = width
        세로z끝 = length
        높이 = height
        층높이 = floorHeight
        지붕한계높이 = roofLimit
        바닥외부블록 = floorOuterBlock
        바닥내부블록 = floorInnerBlock
        기둥블록 = pillarBlock
        벽블록 = wallBlock
        지붕블록 = roofBlock
        지붕형태 = roofType
        창문_만들기 = windowEnabled
        창문_블록 = windowBlock
        창문_길이 = windowLength
        창문_간격 = windowGap

        // 자동 계산 수행
        가로x시작 = 1
        세로z시작 = 1
        창문_길이 += -1
        가로x창문_수 = Math.floor((가로x끝 - 창문_간격 - 4) / (창문_간격 + 창문_길이))
        세로z창문_수 = Math.floor((세로z끝 - 창문_간격 - 4) / (창문_간격 + 창문_길이))
        ㄷ창문_만들기_조절 = false
        
        if (가로x끝 <= 세로z끝) {
            지울_높이 = 가로x끝
        } else {
            지울_높이 = 세로z끝
        }
    }

    //% shim=TD_ID
    //% blockId=roofTypePicker
    //% block="$type"
    //% blockHidden=true
    //% type.fieldEditor="numberdropdown"
    //% type.fieldOptions.decompileLiterals=true
    //% type.fieldOptions.data='[["평면", 1], ["삼각형", 2], ["피라미드형", 3], ["돔형", 4]]'
    //% type.defl=1
    export function __roofTypePicker(type: number): number {
        return type;
    }
}