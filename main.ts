//% color=#404040 weight=100 icon="\uf1ad"
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
    //% block="직각 건물 속성 정하기 | 가로x끝:$width 세로z끝:$length 높이:$height 층높이:$floorHeight 바닥외부블록:$floorOuterBlock 바닥내부블록:$floorInnerBlock 기둥블록:$pillarBlock 벽블록:$wallBlock 지붕블록:$roofBlock 지붕형태:$roofType 지붕한계높이:$roofLimit 창문만들기:$windowEnabled 창문블록:$windowBlock 창문길이:$windowLength 창문간격:$windowGap"
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
    //% weight=200
    
    export function 직각건물속성정하기(
        width: number = 20,
        length: number = 20,
        height: number = 20,
        floorHeight: number = 4,
        roofLimit: number = 0,
        floorOuterBlock: number = 4,
        floorInnerBlock: number = 5,
        pillarBlock: number = 17,
        wallBlock: number = 5,
        roofBlock: number = 251,
        roofType: number = 1,
        windowEnabled: boolean = true,
        windowBlock: number = 20,
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

    // 지붕 형태 선택기
    //% shim=TD_ID
    //% blockId=roofTypePicker
    //% block="$type"
    //% blockHidden=true
    //% type.fieldEditor="numberdropdown"
    //% type.fieldOptions.decompileLiterals=true
    //% type.fieldOptions.data='[["평면", 1], ["삼각형", 2], ["피라미드형(ㅁ만 가능)", 3], ["돔형(정사각형ㅁ만 가능)", 4]]'
    //% type.defl=1
    export function __roofTypePicker(type: number): number {
        return type;
    }

    /**
     * ㅁ형(정사각형) 건물을 생성하는 명령블록
     */
    //% block="ㅁ형 건물 생성"
    //% blockId=building_create_square
    //% weight=190
    export function ㅁ형건물생성(): void {
        ㅁ건물생성(가로x시작, 가로x끝, 세로z시작, 세로z끝, 높이, 층높이, 지붕한계높이, 바닥외부블록, 바닥내부블록, 기둥블록, 벽블록, 지붕블록, 지붕형태)
    }

    /**
     * ㄱ형(L자형) 건물을 생성하는 명령블록
     */
    //% block="ㄱ형 건물 생성"
    //% blockId=building_create_l_shape
    //% weight=180
    export function ㄱ형건물생성(): void {
        ㄱ건물생성(가로x시작, 가로x끝, 세로z시작, 세로z끝, 높이, 층높이, 지붕한계높이, 바닥외부블록, 바닥내부블록, 기둥블록, 벽블록, 지붕블록, 지붕형태)
    }

    /**
     * ㄷ형(U자형) 건물을 생성하는 명령블록
     */
    //% block="ㄷ형 건물 생성"
    //% blockId=building_create_u_shape
    //% weight=170
    export function ㄷ형건물생성(): void {
        ㄷ건물생성(가로x시작, 가로x끝, 세로z시작, 세로z끝, 높이, 층높이, 지붕한계높이, 바닥외부블록, 바닥내부블록, 기둥블록, 벽블록, 지붕블록, 지붕형태)
    }

    /**
     * 건물을 지우는 명령블록
     */
    //% block="직각 건물 지우기"
    //% blockId=building_clear
    //% weight=160
    export function 건물지우기(): void {
        for (let index = 0; index <= 높이 + 지울_높이; index++) {
            blocks.fill(
                Block.Air,
                positions.add(player.position(), pos(1, index, 1)),
                positions.add(player.position(), pos(가로x끝, index, 세로z끝)),
                FillOperation.Replace
            )
        }
    }

    // ===== 내부 헬퍼 함수들 =====

    // ㅁ형 건물 생성
    function ㅁ건물생성(가로x시작: number, 가로x끝: number, 세로z시작: number, 세로z끝: number, 높이: number, 층높이: number, 지붕한계높이: number, 바닥블록외부: number, 바닥블록내부: number, 기둥블록: number, 벽블록: number, 지붕블록: number, 지붕형태: number) {
        let playerPos = player.position()
        
        if (지붕형태 == 4) {
            if (가로x끝 == 세로z끝) {
                곡면지붕ㅁ(지붕블록, 가로x시작, 가로x끝, 세로z시작, 세로z끝, 높이, playerPos)
            } else {
                player.say("돔형 지붕을 만들려면 가로와 세로가 같아야 합니다.")
            }
        }
        
        // 벽 생성 (외곽선)
        blocks.fill(
            벽블록,
            positions.add(playerPos, pos(가로x시작, 0, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z끝)),
            FillOperation.Outline
        )
        
        // 바닥 외부 블록
        blocks.fill(
            바닥블록외부,
            positions.add(playerPos, pos(가로x시작, 0, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 0, 세로z끝)),
            FillOperation.Replace
        )
        
        // 바닥 내부 블록
        blocks.fill(
            바닥블록내부,
            positions.add(playerPos, pos(가로x시작 + 1, 0, 세로z시작 + 1)),
            positions.add(playerPos, pos(가로x끝 - 1, 0, 세로z끝 - 1)),
            FillOperation.Replace
        )
        
        // 창문 생성
        if (ㄷ창문_만들기_조절) {
            ㄷ의_ㅁ창문(가로x시작, 세로z시작, 가로x끝, 세로z끝, 0, playerPos)
        } else {
            ㅁ창문(가로x시작, 세로z시작, 가로x끝, 세로z끝, 0, playerPos)
        }
        
        // 다층 건물 처리
        층높이합계 = 0
        if (0 < 층높이) {
            층높이합계 += 층높이 + 1
            while (층높이합계 < 높이) {
                if (ㄷ창문_만들기_조절) {
                    ㄷ의_ㅁ창문(가로x시작, 세로z시작, 가로x끝, 세로z끝, 층높이합계, playerPos)
                } else {
                    ㅁ창문(가로x시작, 세로z시작, 가로x끝, 세로z끝, 층높이합계, playerPos)
                }
                blocks.fill(
                    바닥블록내부,
                    positions.add(playerPos, pos(가로x시작 + 1, 층높이합계, 세로z시작 + 1)),
                    positions.add(playerPos, pos(가로x끝 - 1, 층높이합계, 세로z끝 - 1)),
                    FillOperation.Replace
                )
                층높이합계 += 층높이 + 1
            }
        }
        
        // 기둥 생성
        blocks.fill(
            기둥블록,
            positions.add(playerPos, pos(가로x시작, 1, 세로z시작)),
            positions.add(playerPos, pos(가로x시작, 높이, 세로z시작)),
            FillOperation.Replace
        )
        blocks.fill(
            기둥블록,
            positions.add(playerPos, pos(가로x끝, 1, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z시작)),
            FillOperation.Replace
        )
        blocks.fill(
            기둥블록,
            positions.add(playerPos, pos(가로x시작, 1, 세로z끝)),
            positions.add(playerPos, pos(가로x시작, 높이, 세로z끝)),
            FillOperation.Replace
        )
        blocks.fill(
            기둥블록,
            positions.add(playerPos, pos(가로x끝, 1, 세로z끝)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z끝)),
            FillOperation.Replace
        )
        
        // 지붕 생성
        if (지붕형태 == 1) {
            평면지붕ㅁ(지붕블록, 가로x시작, 가로x끝, 세로z시작, 세로z끝, 높이, playerPos)
        } else if (지붕형태 == 2) {
            삼각지붕가로ㅁ(지붕블록, 가로x시작, 가로x끝, 세로z시작, 세로z끝, 높이, playerPos)
        } else if (지붕형태 == 3) {
            피라미드지붕ㅁ(지붕블록, 가로x시작, 가로x끝, 세로z시작, 세로z끝, 높이, playerPos)
        }
    }

    // ㄱ형 건물 생성
    function ㄱ건물생성(가로x시작: number, 가로x끝: number, 세로z시작: number, 세로z끝: number, 높이: number, 층높이: number, 지붕한계높이: number, 바닥블록외부: number, 바닥블록내부: number, 기둥블록: number, 벽블록: number, 지붕블록: number, 지붕형태: number) {
        let playerPos = player.position()
        
        가로12 = (가로x끝 - 가로x시작 + 1) / 2
        세로12 = (세로z끝 - 세로z시작 + 1) / 2
        
        // 전체 외곽 생성
        blocks.fill(
            벽블록,
            positions.add(playerPos, pos(가로x시작, 0, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z끝)),
            FillOperation.Outline
        )
        
        // 바닥 외부 블록
        blocks.fill(
            바닥블록외부,
            positions.add(playerPos, pos(가로x시작, 0, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 0, 세로z끝)),
            FillOperation.Replace
        )
        
        // 바닥 내부 블록
        blocks.fill(
            바닥블록내부,
            positions.add(playerPos, pos(가로x시작 + 1, 0, 세로z시작 + 1)),
            positions.add(playerPos, pos(가로x끝 - 1, 0, 세로z끝 - 1)),
            FillOperation.Replace
        )
        
        // 창문 생성
        ㄱ창문(가로x시작, 세로z시작, 가로x끝, 세로z끝, 0, playerPos)
        
        // 다층 건물 처리
        층높이합계 = 0
        if (0 < 층높이) {
            층높이합계 += 층높이 + 1
            while (층높이합계 < 높이) {
                ㄱ창문(가로x시작, 세로z시작, 가로x끝, 세로z끝, 층높이합계, playerPos)
                blocks.fill(
                    바닥블록내부,
                    positions.add(playerPos, pos(가로x시작 + 1, 층높이합계, 세로z시작 + 1)),
                    positions.add(playerPos, pos(가로x끝 - 1, 층높이합계, 세로z끝 - 1)),
                    FillOperation.Replace
                )
                층높이합계 += 층높이 + 1
            }
        }
        
        // 기둥 생성
        blocks.fill(
            기둥블록,
            positions.add(playerPos, pos(가로x시작, 1, 세로z시작)),
            positions.add(playerPos, pos(가로x시작, 높이, 세로z시작)),
            FillOperation.Replace
        )
        blocks.fill(
            기둥블록,
            positions.add(playerPos, pos(가로x끝, 1, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z시작)),
            FillOperation.Replace
        )
        blocks.fill(
            기둥블록,
            positions.add(playerPos, pos(가로x시작, 1, 세로z끝)),
            positions.add(playerPos, pos(가로x시작, 높이, 세로z끝)),
            FillOperation.Replace
        )
        blocks.fill(
            기둥블록,
            positions.add(playerPos, pos(가로x끝, 1, 세로z끝)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z끝)),
            FillOperation.Replace
        )
        
        // ㅁ형 내부 구조 생성
        ㅁ건물생성(가로x시작, Math.round(가로12), 세로z시작, Math.round(세로12), 높이, 층높이, 지붕한계높이, 바닥외부블록, 바닥내부블록, 기둥블록, 벽블록, 지붕블록, 1)
        
        // 지붕 생성
        if (지붕형태 == 1) {
            평면지붕ㅁ(지붕블록, 가로x시작, 가로x끝, 세로z시작, 세로z끝, 높이, playerPos)
        } else if (지붕형태 == 2) {
            let 가로12_rounded = Math.round(가로12)
            let 세로12_rounded = Math.round(세로12)
            if (세로12_rounded < 가로12_rounded) {
                삼각지붕세로ㅁ(지붕블록, 가로x시작, 가로x끝, 세로12_rounded, 세로z끝, 높이, playerPos)
                삼각지붕가로ㅁ(지붕블록, 가로12_rounded, 가로x끝, 세로z시작, 세로z끝, 높이, playerPos)
            } else {
                삼각지붕가로ㅁ(지붕블록, 가로12_rounded, 가로x끝, 세로z시작, 세로z끝, 높이, playerPos)
                삼각지붕세로ㅁ(지붕블록, 가로x시작, 가로x끝, 세로12_rounded, 세로z끝, 높이, playerPos)
            }
        }
        
        // L자 모양을 위한 내부 공간 제거
        blocks.fill(
            Block.Air,
            positions.add(playerPos, pos(가로x시작, 0, 세로z시작)),
            positions.add(playerPos, pos(Math.round(가로12) - 1, 높이, Math.round(세로12) - 1)),
            FillOperation.Replace
        )
    }

    function ㄷ건물생성(가로x시작: number, 가로x끝: number, 세로z시작: number, 세로z끝: number, 높이: number, 층높이: number, 지붕한계높이: number, 바닥블록외부: number, 바닥블록내부: number, 기둥블록: number, 벽블록: number, 지붕블록: number, 지붕형태: number) {
        let playerPos = player.position()
        
        가로12 = (가로x끝 - 가로x시작 + 1) / 2
        세로13 = Math.round((세로z끝 - 세로z시작 + 1) / 3)
        세로13지점 = 세로z시작 + 세로13 - 1
        세로23지점 = 세로z끝 - 세로13 + 1
        
        // 전체 외곽 생성
        blocks.fill(
            벽블록,
            positions.add(playerPos, pos(가로x시작, 0, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z끝)),
            FillOperation.Outline
        )
        
        // 바닥 외부 블록
        blocks.fill(
            바닥블록외부,
            positions.add(playerPos, pos(가로x시작, 0, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 0, 세로z끝)),
            FillOperation.Replace
        )
        
        // 바닥 내부 블록
        blocks.fill(
            바닥블록내부,
            positions.add(playerPos, pos(가로x시작 + 1, 0, 세로z시작 + 1)),
            positions.add(playerPos, pos(가로x끝 - 1, 0, 세로z끝 - 1)),
            FillOperation.Replace
        )
        
        // 창문 생성
        ㄷ창문(가로x시작, 세로z시작, 가로x끝, 세로z끝, 0, playerPos)
        
        // 다층 건물 처리
        층높이합계 = 0
        if (0 < 층높이) {
            층높이합계 += 층높이 + 1
            while (층높이합계 < 높이) {
                ㄷ창문(가로x시작, 세로z시작, 가로x끝, 세로z끝, 층높이합계, playerPos)
                blocks.fill(
                    바닥블록내부,
                    positions.add(playerPos, pos(가로x시작 + 1, 층높이합계, 세로z시작 + 1)),
                    positions.add(playerPos, pos(가로x끝 - 1, 층높이합계, 세로z끝 - 1)),
                    FillOperation.Replace
                )
                층높이합계 += 층높이 + 1
            }
        }
        
        // 기둥 생성
        blocks.fill(
            기둥블록,
            positions.add(playerPos, pos(가로x시작, 1, 세로z시작)),
            positions.add(playerPos, pos(가로x시작, 높이, 세로z시작)),
            FillOperation.Replace
        )
        blocks.fill(
            기둥블록,
            positions.add(playerPos, pos(가로x끝, 1, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z시작)),
            FillOperation.Replace
        )
        blocks.fill(
            기둥블록,
            positions.add(playerPos, pos(가로x시작, 1, 세로z끝)),
            positions.add(playerPos, pos(가로x시작, 높이, 세로z끝)),
            FillOperation.Replace
        )
        blocks.fill(
            기둥블록,
            positions.add(playerPos, pos(가로x끝, 1, 세로z끝)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z끝)),
            FillOperation.Replace
        )
        
        // 중앙 사각형 구조 생성
        ㄷ창문_만들기_조절 = true
        ㅁ건물생성(가로x시작, Math.round(가로12), 세로13지점, 세로23지점, 높이, 층높이, 지붕한계높이, 바닥외부블록, 바닥내부블록, 기둥블록, 벽블록, 지붕블록, 1)
        ㄷ창문_만들기_조절 = false
        
        // 지붕 생성
        if (지붕형태 == 1) {
            평면지붕ㅁ(지붕블록, 가로x시작, 가로x끝, 세로z시작, 세로z끝, 높이, playerPos)
        } else if (지붕형태 == 2) {
            let 가로12_rounded = Math.round(가로12)
            let 세로13지점_rounded = Math.round(세로13지점)
            let 세로23지점_rounded = Math.round(세로23지점)
            
            if (가로12_rounded < 세로13지점_rounded) {
            삼각지붕가로ㅁ(지붕블록, 가로12_rounded, 가로x끝, 세로z시작, 세로z끝, 높이, playerPos)
            삼각지붕세로ㅁ(지붕블록, 가로x시작, 가로x끝, 세로z시작, 세로13지점_rounded, 높이, playerPos)
            삼각지붕세로ㅁ(지붕블록, 가로x시작, 가로x끝, 세로23지점_rounded, 세로z끝, 높이, playerPos)                
            } else {
                삼각지붕세로ㅁ(지붕블록, 가로x시작, 가로x끝, 세로z시작, 세로13지점_rounded, 높이, playerPos)
                삼각지붕세로ㅁ(지붕블록, 가로x시작, 가로x끝, 세로23지점_rounded, 세로z끝, 높이, playerPos)
                삼각지붕가로ㅁ(지붕블록, 가로12_rounded, 가로x끝, 세로z시작, 세로z끝, 높이, playerPos)
            }
        }
        
        // ㄷ자 모양을 위한 내부 공간 제거
        blocks.fill(
            Block.Air,
            positions.add(playerPos, pos(가로x시작, 0, 세로13지점 + 1)),
            positions.add(playerPos, pos(Math.round(가로12) - 1, 높이, 세로23지점 - 1)),
            FillOperation.Replace
        )
    }

    // ===== 지붕 생성 함수들 =====

    function 평면지붕ㅁ(지붕블록: number, 가로x시작: number, 가로x끝: number, 세로z시작: number, 세로z끝: number, 높이: number, playerPos: Position) {
        blocks.fill(
            지붕블록,
            positions.add(playerPos, pos(가로x시작, 높이, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z끝)),
            FillOperation.Replace
        )
    }

    function 삼각지붕가로ㅁ(지붕블록: number, 가로x시작: number, 가로x끝: number, 세로z시작: number, 세로z끝: number, 높이: number, playerPos: Position) {
        index = 0
        가로길이 = 가로x끝 - 가로x시작 + 1
        반복 = 가로길이
        if (지붕한계높이 <= 0) {
            반복 = 반복 / 2
        } else if (지붕한계높이 <= 반복 / 2) {
            반복 = 지붕한계높이
        } else {
            반복 = 반복 / 2
        }
        
        for (let index2 = 0; index2 < 반복; index2++) {
            blocks.fill(
                지붕블록,
                positions.add(playerPos, pos(가로x시작 + index, 높이 + index, 세로z시작)),
                positions.add(playerPos, pos(가로x끝 - index, 높이 + index, 세로z끝)),
                FillOperation.Replace
            )
            blocks.fill(
                Block.Air,
                positions.add(playerPos, pos(가로x시작 + (1 + index), 높이 + index, 세로z시작 + 1)),
                positions.add(playerPos, pos(가로x끝 - 1 - index, 높이 + index, 세로z끝 - 1)),
                FillOperation.Replace
            )
            index += 1
        }
        index += -1
        blocks.fill(
            지붕블록,
            positions.add(playerPos, pos(가로x시작 + index, 높이 + index, 세로z시작)),
            positions.add(playerPos, pos(가로x끝 - index, 높이 + index, 세로z끝)),
            FillOperation.Replace
        )
    }

    function 삼각지붕세로ㅁ(지붕블록: number, 가로x시작: number, 가로x끝: number, 세로z시작: number, 세로z끝: number, 높이: number, playerPos: Position) {
        index = 0
        세로길이 = 세로z끝 - 세로z시작 + 1
        반복 = 세로길이
        if (지붕한계높이 <= 0) {
            반복 = 반복 / 2
        } else if (지붕한계높이 <= 반복 / 2) {
            반복 = 지붕한계높이
        } else {
            반복 = 반복 / 2
        }
        
        for (let index2 = 0; index2 < 반복; index2++) {
            blocks.fill(
                지붕블록,
                positions.add(playerPos, pos(가로x시작, 높이 + index, 세로z시작 + index)),
                positions.add(playerPos, pos(가로x끝, 높이 + index, 세로z끝 - index)),
                FillOperation.Replace
            )
            blocks.fill(
                Block.Air,
                positions.add(playerPos, pos(가로x시작 + 1, 높이 + index, 세로z시작 + (1 + index))),
                positions.add(playerPos, pos(가로x끝 - 1, 높이 + index, 세로z끝 - 1 - index)),
                FillOperation.Replace
            )
            index += 1
        }
        index += -1
        blocks.fill(
            지붕블록,
            positions.add(playerPos, pos(가로x시작, 높이 + index, 세로z시작 + index)),
            positions.add(playerPos, pos(가로x끝, 높이 + index, 세로z끝 - index)),
            FillOperation.Replace
        )
    }

    function 피라미드지붕ㅁ(지붕블록: number, 가로x시작: number, 가로x끝: number, 세로z시작: number, 세로z끝: number, 높이: number, playerPos: Position) {
        index = 0
        가로길이 = 가로x끝 - 가로x시작
        세로길이 = 세로z끝 - 세로z시작
        if (세로길이 >= 가로길이) {
            반복 = 가로길이 + 1
        } else {
            반복 = 세로길이 + 1
        }
        if (지붕한계높이 <= 0) {
            반복 = 반복 / 2
        } else if (지붕한계높이 <= 반복 / 2) {
            반복 = 지붕한계높이
        } else {
            반복 = 반복 / 2
        }
        
        for (let index2 = 0; index2 < 반복; index2++) {
            blocks.fill(
                지붕블록,
                positions.add(playerPos, pos(가로x시작 + index, 높이 + index, 세로z시작 + index)),
                positions.add(playerPos, pos(가로x끝 - index, 높이 + index, 세로z끝 - index)),
                FillOperation.Replace
            )
            blocks.fill(
                Block.Air,
                positions.add(playerPos, pos(index + (가로x시작 + 1), 높이 + index, index + (세로z시작 + 1))),
                positions.add(playerPos, pos(가로x끝 - 1 - index, 높이 + index, 세로z끝 - 1 - index)),
                FillOperation.Replace
            )
            index += 1
        }
        index += -1
        blocks.fill(
            지붕블록,
            positions.add(playerPos, pos(가로x시작 + index, 높이 + index, 세로z시작 + index)),
            positions.add(playerPos, pos(가로x끝 - index, 높이 + index, 세로z끝 - index)),
            FillOperation.Replace
        )
    }

    function 곡면지붕ㅁ(지붕블록: number, 가로x시작: number, 가로x끝: number, 세로z시작: number, 세로z끝: number, 높이: number, playerPos: Position) {
        곡면지붕ㅁ중심 = (가로x끝 - 가로x시작) / 2 + 1
        곡면지붕ㅁ반지름 = (가로x끝 - 가로x시작) / 2 + 0
        
        shapes.sphere(
            지붕블록,
            positions.add(
                positions.add(playerPos, pos(곡면지붕ㅁ중심, 0, 곡면지붕ㅁ중심)),
                pos(0, 높이 + 1, 0)
            ),
            곡면지붕ㅁ반지름,
            ShapeOperation.Outline
        )
        
        // 구체 하단부 제거
        // 1사분면 (+X, +Z)
        blocks.fill(
            Block.Air,
            positions.add(
                positions.add(
                    positions.add(playerPos, pos(곡면지붕ㅁ중심, 0, 곡면지붕ㅁ중심)),
                    pos(0, 높이, 0)
                ),
                pos(0, -1, 0)
            ),
            positions.add(
                positions.add(
                    positions.add(playerPos, pos(곡면지붕ㅁ중심, 0, 곡면지붕ㅁ중심)),
                    pos(0, 높이, 0)
                ),
                pos(곡면지붕ㅁ반지름, -1 * 곡면지붕ㅁ반지름, 곡면지붕ㅁ반지름)
            ),
            FillOperation.Replace
        )
        
        // 2사분면 (-X, +Z)
        blocks.fill(
            Block.Air,
            positions.add(
                positions.add(
                    positions.add(playerPos, pos(곡면지붕ㅁ중심, 0, 곡면지붕ㅁ중심)),
                    pos(0, 높이, 0)
                ),
                pos(0, -1, 0)
            ),
            positions.add(
                positions.add(
                    positions.add(playerPos, pos(곡면지붕ㅁ중심, 0, 곡면지붕ㅁ중심)),
                    pos(0, 높이, 0)
                ),
                pos(-1 * 곡면지붕ㅁ반지름, -1 * 곡면지붕ㅁ반지름, 곡면지붕ㅁ반지름)
            ),
            FillOperation.Replace
        )
        
        // 3사분면 (-X, -Z)
        blocks.fill(
            Block.Air,
            positions.add(
                positions.add(
                    positions.add(playerPos, pos(곡면지붕ㅁ중심, 0, 곡면지붕ㅁ중심)),
                    pos(0, 높이, 0)
                ),
                pos(0, -1, 0)
            ),
            positions.add(
                positions.add(
                    positions.add(playerPos, pos(곡면지붕ㅁ중심, 0, 곡면지붕ㅁ중심)),
                    pos(0, 높이, 0)
                ),
                pos(-1 * 곡면지붕ㅁ반지름, -1 * 곡면지붕ㅁ반지름, -1 * 곡면지붕ㅁ반지름)
            ),
            FillOperation.Replace
        )
        
        // 4사분면 (+X, -Z)
        blocks.fill(
            Block.Air,
            positions.add(
                positions.add(
                    positions.add(playerPos, pos(곡면지붕ㅁ중심, 0, 곡면지붕ㅁ중심)),
                    pos(0, 높이, 0)
                ),
                pos(0, -1, 0)
            ),
            positions.add(
                positions.add(
                    positions.add(playerPos, pos(곡면지붕ㅁ중심, 0, 곡면지붕ㅁ중심)),
                    pos(0, 높이, 0)
                ),
                pos(곡면지붕ㅁ반지름, -1 * 곡면지붕ㅁ반지름, -1 * 곡면지붕ㅁ반지름)
            ),
            FillOperation.Replace
        )
        
        // 지붕 바닥면 생성
        blocks.fill(
            지붕블록,
            positions.add(playerPos, pos(가로x시작, 높이, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z끝)),
            FillOperation.Replace
        )
    }
    
    // ===== 창문 생성 함수들 =====

    function ㅁ창문(가로x시작: number, 세로z시작: number, 가로x끝: number, 세로z끝: number, 창문설치높이: number, playerPos: Position) {
        if (!창문_만들기) return
        
        창문_위치_합 = 창문_간격 + 2
        
        // 가로 방향 창문
        if (가로x창문_수 == 0) {
            blocks.fill(
                창문_블록,
                positions.add(playerPos, pos(가로x끝 / 2 - 창문_길이 / 2, 창문설치높이 + 2, 세로z시작)),
                positions.add(playerPos, pos(가로x끝 / 2 + 창문_길이 / 2, 창문설치높이 + 3, 세로z시작)),
                FillOperation.Replace
            )
        } else {
            for (let index2 = 0; index2 < 가로x끝; index2++) {
                if (창문_위치_합 + 창문_길이 <= 가로x끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(창문_위치_합, 창문설치높이 + 2, 세로z시작)),
                        positions.add(playerPos, pos(창문_위치_합 + 창문_길이, 창문설치높이 + 3, 세로z시작)),
                        FillOperation.Replace
                    )
                }
                if (가로x끝 - 창문_위치_합 + 0 >= 가로x끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x끝 - 창문_위치_합 - 창문_길이 + 1, 창문설치높이 + 2, 세로z시작)),
                        positions.add(playerPos, pos(가로x끝 - 창문_위치_합 + 1, 창문설치높이 + 3, 세로z시작)),
                        FillOperation.Replace
                    )
                    창문_위치_합 += 창문_길이 + 창문_간격 * 2
                }
            }
        }
        
        // 반대편 벽에 복사
        blocks.clone(
            positions.add(playerPos, pos(가로x시작, 1, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z시작)),
            positions.add(playerPos, pos(가로x시작, 1, 세로z끝)),
            CloneMask.Replace,
            CloneMode.Normal
        )
        
        // 세로 방향 창문
        창문_위치_합 = 창문_간격 + 2
        if (세로z창문_수 == 0) {
            blocks.fill(
                창문_블록,
                positions.add(playerPos, pos(가로x시작, 창문설치높이 + 2, 세로z끝 / 2 - 창문_길이 / 2)),
                positions.add(playerPos, pos(가로x시작, 창문설치높이 + 3, 세로z끝 / 2 + 창문_길이 / 2)),
                FillOperation.Replace
            )
        } else {
            for (let index2 = 0; index2 < 세로z끝; index2++) {
                if (창문_위치_합 + 창문_길이 <= 세로z끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 2, 창문_위치_합)),
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 3, 창문_위치_합 + 창문_길이)),
                        FillOperation.Replace
                    )
                }
                if (세로z끝 - 창문_위치_합 + 0 >= 세로z끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 2, 세로z끝 - 창문_위치_합 - 창문_길이 + 1)),
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 3, 세로z끝 - 창문_위치_합 + 1)),
                        FillOperation.Replace
                    )
                    창문_위치_합 += 창문_길이 + 창문_간격 * 2
                }
            }
        }
        
        // 반대편 벽에 복사
        blocks.clone(
            positions.add(playerPos, pos(가로x시작, 1, 세로z시작)),
            positions.add(playerPos, pos(가로x시작, 높이, 세로z끝)),
            positions.add(playerPos, pos(가로x끝, 1, 세로z시작)),
            CloneMask.Replace,
            CloneMode.Normal
        )
    }

    function ㄱ창문(가로x시작: number, 세로z시작: number, 가로x끝: number, 세로z끝: number, 창문설치높이: number, playerPos: Position) {
        if (!창문_만들기) return
        
        창문_위치_합 = 창문_간격 + 2
        
        // 가로 방향 창문 (뒷벽)
        if (가로x창문_수 == 0) {
            blocks.fill(
                창문_블록,
                positions.add(playerPos, pos(가로x끝 / 2 - 창문_길이 / 2, 창문설치높이 + 2, 세로z끝)),
                positions.add(playerPos, pos(가로x끝 / 2 + 창문_길이 / 2, 창문설치높이 + 3, 세로z끝)),
                FillOperation.Replace
            )
        } else {
            for (let index2 = 0; index2 < 가로x끝; index2++) {
                if (창문_위치_합 + 창문_길이 <= 가로x끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(창문_위치_합, 창문설치높이 + 2, 세로z끝)),
                        positions.add(playerPos, pos(창문_위치_합 + 창문_길이, 창문설치높이 + 3, 세로z끝)),
                        FillOperation.Replace
                    )
                }
                if (가로x끝 - 창문_위치_합 + 0 >= 가로x끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x끝 - 창문_위치_합 - 창문_길이 + 1, 창문설치높이 + 2, 세로z끝)),
                        positions.add(playerPos, pos(가로x끝 - 창문_위치_합 + 1, 창문설치높이 + 3, 세로z끝)),
                        FillOperation.Replace
                    )
                    창문_위치_합 += 창문_길이 + 창문_간격 * 2
                }
            }
            // 앞벽 창문 (ㄱ자 특별 처리)
            창문_위치_합 = 창문_간격 + 2
            for (let index2 = 0; index2 < 가로x끝; index2++) {
                if (가로x끝 - 창문_위치_합 - 2 >= 가로x끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x끝 - 창문_위치_합 - 창문_길이 + 1, 창문설치높이 + 2, 세로z시작)),
                        positions.add(playerPos, pos(가로x끝 - 창문_위치_합 + 1, 창문설치높이 + 3, 세로z시작)),
                        FillOperation.Replace
                    )
                    창문_위치_합 += 창문_길이 + 창문_간격 * 2
                }
            }
        }
        
        // 세로 방향 창문 (오른쪽 벽)
        창문_위치_합 = 창문_간격 + 2
        if (세로z창문_수 == 0) {
            blocks.fill(
                창문_블록,
                positions.add(playerPos, pos(가로x끝, 창문설치높이 + 2, 세로z끝 / 2 - 창문_길이 / 2)),
                positions.add(playerPos, pos(가로x끝, 창문설치높이 + 3, 세로z끝 / 2 + 창문_길이 / 2)),
                FillOperation.Replace
            )
        } else {
            for (let index2 = 0; index2 < 세로z끝; index2++) {
                if (창문_위치_합 + 창문_길이 <= 세로z끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x끝, 창문설치높이 + 2, 창문_위치_합)),
                        positions.add(playerPos, pos(가로x끝, 창문설치높이 + 3, 창문_위치_합 + 창문_길이)),
                        FillOperation.Replace
                    )
                }
                if (세로z끝 - 창문_위치_합 + 0 >= 세로z끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x끝, 창문설치높이 + 2, 세로z끝 - 창문_위치_합 - 창문_길이 + 1)),
                        positions.add(playerPos, pos(가로x끝, 창문설치높이 + 3, 세로z끝 - 창문_위치_합 + 1)),
                        FillOperation.Replace
                    )
                    창문_위치_합 += 창문_길이 + 창문_간격 * 2
                }
            }
            // 왼쪽 벽 창문 (ㄱ자 특별 처리)
            창문_위치_합 = 창문_간격 + 2
            for (let index2 = 0; index2 < 세로z끝; index2++) {
                if (세로z끝 - 창문_위치_합 - 2 >= 세로z끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 2, 세로z끝 - 창문_위치_합 - 창문_길이 + 1)),
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 3, 세로z끝 - 창문_위치_합 + 1)),
                        FillOperation.Replace
                    )
                    창문_위치_합 += 창문_길이 + 창문_간격 * 2
                }
            }
        }
    }

    function ㄷ창문(가로x시작: number, 세로z시작: number, 가로x끝: number, 세로z끝: number, 창문설치높이: number, playerPos: Position) {
        if (!창문_만들기) return
        
        창문_위치_합 = 창문_간격 + 2
        
        // 가로 방향 창문 (앞쪽 벽)
        if (가로x창문_수 == 0) {
            blocks.fill(
                창문_블록,
                positions.add(playerPos, pos(가로x끝 / 2 - 창문_길이 / 2, 창문설치높이 + 2, 세로z시작)),
                positions.add(playerPos, pos(가로x끝 / 2 + 창문_길이 / 2, 창문설치높이 + 3, 세로z시작)),
                FillOperation.Replace
            )
        } else {
            for (let index2 = 0; index2 < 가로x끝; index2++) {
                if (창문_위치_합 + 창문_길이 <= 가로x끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(창문_위치_합, 창문설치높이 + 2, 세로z시작)),
                        positions.add(playerPos, pos(창문_위치_합 + 창문_길이, 창문설치높이 + 3, 세로z시작)),
                        FillOperation.Replace
                    )
                }
                if (가로x끝 - 창문_위치_합 >= 가로x끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x끝 - 창문_위치_합 - 창문_길이 + 1, 창문설치높이 + 2, 세로z시작)),
                        positions.add(playerPos, pos(가로x끝 - 창문_위치_합 + 1, 창문설치높이 + 3, 세로z시작)),
                        FillOperation.Replace
                    )
                    창문_위치_합 += 창문_길이 + 창문_간격 * 2
                }
            }
        }
        
        // 반대편 벽에 복사
        blocks.clone(
            positions.add(playerPos, pos(가로x시작, 1, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z시작)),
            positions.add(playerPos, pos(가로x시작, 1, 세로z끝)),
            CloneMask.Replace,
            CloneMode.Normal
        )
        
        // 세로 방향 창문 (ㄷ자 양쪽 벽)
        창문_위치_합 = 창문_간격 + 2
        if (세로z창문_수 == 0) {
            blocks.fill(
                창문_블록,
                positions.add(playerPos, pos(가로x시작, 창문설치높이 + 2, 세로z끝 / 2 - 창문_길이 / 2)),
                positions.add(playerPos, pos(가로x시작, 창문설치높이 + 3, 세로z끝 / 2 + 창문_길이 / 2)),
                FillOperation.Replace
            )
        } else {
            for (let index2 = 0; index2 < 세로z끝; index2++) {
                if (창문_위치_합 + 창문_길이 + 1 <= 세로13지점) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 2, 창문_위치_합)),
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 3, 창문_위치_합 + 창문_길이)),
                        FillOperation.Replace
                    )
                }
                if (세로z끝 - 창문_위치_합 - 1 >= 세로23지점) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 2, 세로z끝 - 창문_위치_합 - 창문_길이 + 1)),
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 3, 세로z끝 - 창문_위치_합 + 1)),
                        FillOperation.Replace
                    )
                    창문_위치_합 += 창문_길이 + 창문_간격 * 2
                }
            }
            // 오른쪽 벽 창문
            창문_위치_합 = 창문_간격 + 2
            for (let index2 = 0; index2 < 세로z끝; index2++) {
                if (창문_위치_합 + 창문_길이 <= 세로z끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x끝, 창문설치높이 + 2, 창문_위치_합)),
                        positions.add(playerPos, pos(가로x끝, 창문설치높이 + 3, 창문_위치_합 + 창문_길이)),
                        FillOperation.Replace
                    )
                }
                if (세로z끝 - 창문_위치_합 >= 세로z끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x끝, 창문설치높이 + 2, 세로z끝 - 창문_위치_합 - 창문_길이 + 1)),
                        positions.add(playerPos, pos(가로x끝, 창문설치높이 + 3, 세로z끝 - 창문_위치_합 + 1)),
                        FillOperation.Replace
                    )
                    창문_위치_합 += 창문_길이 + 창문_간격 * 2
                }
            }
        }
    }

    function ㄷ의_ㅁ창문(
        가로x시작: number,
        세로z시작: number,
        가로x끝: number,
        세로z끝: number,
        창문설치높이: number,
        playerPos: Position
    ) {
        if (!창문_만들기) return;

        // 가로 방향 창문 (앞쪽 벽)
        창문_위치_합 = 창문_간격 + 2;
        if (가로x창문_수 == 0) {
            blocks.fill(
                창문_블록,
                positions.add(playerPos, pos(가로x끝 / 2 - 창문_길이 / 2, 창문설치높이 + 2, 세로z시작)),
                positions.add(playerPos, pos(가로x끝 / 2 + 창문_길이 / 2, 창문설치높이 + 3, 세로z시작)),
                FillOperation.Replace
            );
        } else {
            for (let index2 = 0; index2 < 가로x끝; index2++) {
                if (창문_위치_합 + 창문_길이 <= 가로x끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(창문_위치_합, 창문설치높이 + 2, 세로z시작)),
                        positions.add(playerPos, pos(창문_위치_합 + 창문_길이, 창문설치높이 + 3, 세로z시작)),
                        FillOperation.Replace
                    );
                }
                if (가로x끝 - 창문_위치_합 >= 가로x끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x끝 - 창문_위치_합 - 창문_길이 + 1, 창문설치높이 + 2, 세로z시작)),
                        positions.add(playerPos, pos(가로x끝 - 창문_위치_합 + 1, 창문설치높이 + 3, 세로z시작)),
                        FillOperation.Replace
                    );
                    창문_위치_합 += 창문_길이 + 창문_간격 * 2;
                }
            }
        }

        // 반대편 벽에 복사
        blocks.clone(
            positions.add(playerPos, pos(가로x시작, 1, 세로z시작)),
            positions.add(playerPos, pos(가로x끝, 높이, 세로z시작)),
            positions.add(playerPos, pos(가로x시작, 1, 세로z끝)),
            CloneMask.Replace,
            CloneMode.Normal
        );

        // 세로 방향 창문 (ㄷ자 양쪽 벽)
        창문_위치_합 = 창문_간격 + 2;
        if (세로z창문_수 == 0) {
            blocks.fill(
                창문_블록,
                positions.add(playerPos, pos(가로x시작, 창문설치높이 + 2, 세로z끝 / 2 - 창문_길이 / 2)),
                positions.add(playerPos, pos(가로x시작, 창문설치높이 + 3, 세로z끝 / 2 + 창문_길이 / 2)),
                FillOperation.Replace
            );
        } else {
            for (let index2 = 0; index2 < 세로z끝; index2++) {
                if (창문_위치_합 + 창문_길이 + 1 <= 세로13지점) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 2, 창문_위치_합)),
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 3, 창문_위치_합 + 창문_길이)),
                        FillOperation.Replace
                    );
                }
                if (세로z끝 - 창문_위치_합 - 1 >= 세로23지점) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 2, 세로z끝 - 창문_위치_합 - 창문_길이 + 1)),
                        positions.add(playerPos, pos(가로x시작, 창문설치높이 + 3, 세로z끝 - 창문_위치_합 + 1)),
                        FillOperation.Replace
                    );
                    창문_위치_합 += 창문_길이 + 창문_간격 * 2;
                }
            }
            // 오른쪽 벽 창문
            창문_위치_합 = 창문_간격 + 2;
            for (let index2 = 0; index2 < 세로z끝; index2++) {
                if (창문_위치_합 + 창문_길이 <= 세로z끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x끝, 창문설치높이 + 2, 창문_위치_합)),
                        positions.add(playerPos, pos(가로x끝, 창문설치높이 + 3, 창문_위치_합 + 창문_길이)),
                        FillOperation.Replace
                    );
                }
                if (세로z끝 - 창문_위치_합 >= 세로z끝 / 2) {
                    blocks.fill(
                        창문_블록,
                        positions.add(playerPos, pos(가로x끝, 창문설치높이 + 2, 세로z끝 - 창문_위치_합 - 창문_길이 + 1)),
                        positions.add(playerPos, pos(가로x끝, 창문설치높이 + 3, 세로z끝 - 창문_위치_합 + 1)),
                        FillOperation.Replace
                    );
                    창문_위치_합 += 창문_길이 + 창문_간격 * 2;
                }
            }
        }
    }

    // 자동으로 계산되는 매개변수들
    let 원형반지름 = 0
    let 원형높이 = 0
    let 원형층높이 = 0
    let 원형지붕한계높이 = 0
    let 원형바닥외부블록 = 0
    let 원형바닥내부블록 = 0
    let 원형벽블록 = 0
    let 원형지붕블록 = 0
    let 원형지붕형태 = 0
    let 원형건축중심: Position = null
    let 원형벽건축index = 0
    let 원형층높이합계 = 0
    let 원형원뿔꼭대기위치: Position = null

    /**
     * 원형 건물 속성을 정하고 자동 계산을 수행하는 명령블록
     */
    //% block="원형 건물 속성 정하기 | 반지름:$radius 높이:$height 층높이:$floorHeight 지붕한계높이:$roofLimit 바닥외부블록:$floorOuterBlock 바닥내부블록:$floorInnerBlock 벽블록:$wallBlock 지붕블록:$roofBlock 지붕형태:$roofType"
    //% radius.defl=4
    //% radius.min=3 radius.max=50
    //% height.defl=10
    //% height.min=3 height.max=100
    //% floorHeight.defl=4
    //% floorHeight.min=3 floorHeight.max=10
    //% roofLimit.defl=0
    //% roofLimit.min=0 roofLimit.max=50
    //% floorOuterBlock.shadow=minecraftBlock
    //% floorOuterBlock.defl=Block.Cobblestone
    //% floorInnerBlock.shadow=minecraftBlock
    //% floorInnerBlock.defl=Block.BlockOfQuartz
    //% wallBlock.shadow=minecraftBlock
    //% wallBlock.defl=Block.PlanksOak
    //% roofBlock.shadow=minecraftBlock
    //% roofBlock.defl=Block.LightGrayConcrete
    //% roofType.shadow="circularRoofTypePicker"
    //% roofType.defl=1
    //% roofType.min=1 roofType.max=3
    //% weight=100
    
    export function 원형건물속성정하기(
        radius: number = 4,
        height: number = 10,
        floorHeight: number = 4,
        roofLimit: number = 0,
        floorOuterBlock: number = 4,
        floorInnerBlock: number = 155,
        wallBlock: number = 5,
        roofBlock: number = 251,
        roofType: number = 1
    ): void {
        
        // 인수값들을 변수에 할당
        원형반지름 = radius
        원형높이 = height
        원형층높이 = floorHeight
        원형지붕한계높이 = roofLimit
        원형바닥외부블록 = floorOuterBlock
        원형바닥내부블록 = floorInnerBlock
        원형벽블록 = wallBlock
        원형지붕블록 = roofBlock
        원형지붕형태 = roofType

        // 자동 계산 수행
        원형벽건축index = 0
        원형층높이합계 = 0
    }

    // 원형 지붕 형태 선택기
    //% shim=TD_ID
    //% blockId=circularRoofTypePicker
    //% block="$type"
    //% blockHidden=true
    //% type.fieldEditor="numberdropdown"
    //% type.fieldOptions.decompileLiterals=true
    //% type.fieldOptions.data='[["평면", 1], ["원뿔형", 2], ["돔형", 3]]'
    //% type.defl=1
    export function __circularRoofTypePicker(type: number): number {
        return type;
    }

    /**
     * 원형 건물을 생성하는 명령블록
     */
    //% block="원형 건물 생성"
    //% blockId=circular_building_create
    //% weight=90
    export function 원형건물생성(): void {
        원형건물_내부생성(원형반지름, 원형높이, 원형층높이, 원형지붕한계높이, 원형바닥외부블록, 원형바닥내부블록, 원형벽블록, 원형지붕블록, 원형지붕형태)
    }

    /**
     * 원형 건물을 지우는 명령블록
     */
    //% block="원형 건물 지우기"
    //% blockId=circular_building_clear
    //% weight=80
    export function 원형건물지우기(): void {
        let playerPos = player.position()
        
        // 바닥 지우기
        blocks.fill(
            Block.Air,
            positions.add(playerPos, pos(원형반지름, -1, 원형반지름)),
            positions.add(playerPos, pos(-1 * 원형반지름, -1, -1 * 원형반지름)),
            FillOperation.Replace
        )
        
        // 건물 전체 지우기
        for (let index = 0; index <= 원형높이 + 원형반지름; index++) {
            blocks.fill(
                Block.Air,
                positions.add(playerPos, pos(원형반지름, index, 원형반지름)),
                positions.add(playerPos, pos(-1 * 원형반지름, index, -1 * 원형반지름)),
                FillOperation.Replace
            )
        }
    }

    // ===== 내부 헬퍼 함수들 =====

    function 원형건물_내부생성(
        반지름: number, 
        높이: number, 
        층높이: number, 
        지붕한계높이: number, 
        바닥블록외부: number, 
        바닥블록내부: number, 
        벽블록: number, 
        지붕블록: number, 
        지붕형태: number
    ) {
        원형건축중심 = player.position()
        
        // 돔형 지붕 먼저 생성 (다른 구조물 위에 올라가야 함)
        if (지붕형태 == 3) {
            원형돔지붕생성(지붕블록, 반지름, 높이)
        }
        
        // 바닥 외부 원형
        shapes.circle(
            바닥블록외부,
            원형건축중심,
            반지름,
            Axis.Y,
            ShapeOperation.Replace
        )
        
        // 바닥 내부 원형
        shapes.circle(
            바닥블록내부,
            원형건축중심,
            반지름 - 1,
            Axis.Y,
            ShapeOperation.Replace
        )
        
        // 벽 생성
        원형벽건축index = 0
        for (let index = 0; index < 높이 - 1; index++) {
            원형벽건축index += 1
            shapes.circle(
                벽블록,
                positions.add(원형건축중심, pos(0, 원형벽건축index, 0)),
                반지름,
                Axis.Y,
                ShapeOperation.Outline
            )
        }
        
        // 다층 건물 처리
        원형층높이합계 = 0
        if (0 < 층높이) {
            원형층높이합계 += 층높이 + 1
            while (원형층높이합계 < 높이) {
                shapes.circle(
                    바닥블록내부,
                    positions.add(원형건축중심, pos(0, 원형층높이합계, 0)),
                    반지름,
                    Axis.Y,
                    ShapeOperation.Replace
                )
                원형층높이합계 += 층높이 + 1
            }
        }
        
        // 지붕 생성
        if (지붕형태 == 1) {
            원형평면지붕생성(지붕블록, 반지름, 높이)
        } else if (지붕형태 == 2) {
            원형원뿔지붕생성(지붕블록, 반지름, 높이, 지붕한계높이)
        }
    }

    // ===== 지붕 생성 함수들 =====

    function 원형평면지붕생성(지붕블록: number, 반지름: number, 높이: number) {
        shapes.circle(
            지붕블록,
            positions.add(원형건축중심, pos(0, 높이, 0)),
            반지름,
            Axis.Y,
            ShapeOperation.Replace
        )
    }

    function 원형원뿔지붕생성(지붕블록: number, 반지름: number, 높이: number, 지붕한계높이: number) {
        for (let index = 0; index <= 반지름 + 1; index++) {
            if (지붕한계높이 <= 0 || 지붕한계높이 > index) {
                shapes.circle(
                    지붕블록,
                    positions.add(
                        positions.add(원형건축중심, pos(0, 높이, 0)),
                        pos(0, index, 0)
                    ),
                    반지름 - index,
                    Axis.Y,
                    ShapeOperation.Replace
                )
                원형원뿔꼭대기위치 = positions.add(
                    positions.add(원형건축중심, pos(0, 높이, 0)),
                    pos(0, index - 1, 0)
                )
            }
        }
        blocks.place(지붕블록, 원형원뿔꼭대기위치)
    }

    function 원형돔지붕생성(지붕블록: number, 반지름: number, 높이: number) {
        // 구체 생성
        shapes.sphere(
            지붕블록,
            positions.add(원형건축중심, pos(0, 높이, 0)),
            반지름,
            ShapeOperation.Outline
        )
        
        // 구체 하단부 제거 (4사분면으로 나누어서)
        // 1사분면 (+X, +Z)
        blocks.fill(
            Block.Air,
            positions.add(
                positions.add(원형건축중심, pos(0, 높이, 0)),
                pos(0, -1, 0)
            ),
            positions.add(
                positions.add(원형건축중심, pos(0, 높이, 0)),
                pos(반지름, -1 * 반지름, 반지름)
            ),
            FillOperation.Replace
        )
        
        // 2사분면 (-X, +Z)
        blocks.fill(
            Block.Air,
            positions.add(
                positions.add(원형건축중심, pos(0, 높이, 0)),
                pos(0, -1, 0)
            ),
            positions.add(
                positions.add(원형건축중심, pos(0, 높이, 0)),
                pos(-1 * 반지름, -1 * 반지름, 반지름)
            ),
            FillOperation.Replace
        )
        
        // 3사분면 (-X, -Z)
        blocks.fill(
            Block.Air,
            positions.add(
                positions.add(원형건축중심, pos(0, 높이, 0)),
                pos(0, -1, 0)
            ),
            positions.add(
                positions.add(원형건축중심, pos(0, 높이, 0)),
                pos(-1 * 반지름, -1 * 반지름, -1 * 반지름)
            ),
            FillOperation.Replace
        )
        
        // 4사분면 (+X, -Z)
        blocks.fill(
            Block.Air,
            positions.add(
                positions.add(원형건축중심, pos(0, 높이, 0)),
                pos(0, -1, 0)
            ),
            positions.add(
                positions.add(원형건축중심, pos(0, 높이, 0)),
                pos(반지름, -1 * 반지름, -1 * 반지름)
            ),
            FillOperation.Replace
        )
    }







}