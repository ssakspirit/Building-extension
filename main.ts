declare const enum Block {
    //% blockIdentity="blocks.block" enumval=0 block="Air"
    Air = 0,
    //% blockIdentity="blocks.block" enumval=4 block="Cobblestone"
    Cobblestone = 4,
    //% blockIdentity="blocks.block" enumval=5 block="Oak Planks"
    OakPlanks = 5,
    //% blockIdentity="blocks.block" enumval=17 block="Jungle Log"
    JungleLog = 17,
    //% blockIdentity="blocks.block" enumval=20 block="Glass"
    Glass = 20,
    //% blockIdentity="blocks.block" enumval=236 block="Light Gray Concrete"
    LightGrayConcrete = 236
}

declare const enum RoofType {
    //% block="평면"
    Flat = 1,
    //% block="삼각형"
    Triangle = 2,
    //% block="피라미드"
    Pyramid = 3,
    //% block="돔형"
    Dome = 4
}

declare const enum FillOperation {
    Replace,
    Outline
}

declare class Position {
    constructor(x: number, y: number, z: number);
}

declare namespace positions {
    function createWorld(x: number, y: number, z: number): Position;
}

declare namespace blocks {
    function block(block: Block): number;
    function fill(block: number, from: Position, to: Position, operation: FillOperation): void;
    function place(block: number, pos: Position): void;
}

declare namespace player {
    function say(message: string): void;
}

/**
 * Custom blocks for Minecraft
 */

//% weight=100 color=#0fbc11 icon="\uf1ad"
//% block="Building"
namespace building {
    // Constants
    const AIR = Block.Air;
    const COBBLESTONE = Block.Cobblestone;
    const BLOCK_OF_QUARTZ = Block.Glass; // Quartz block is not available, using glass as alternative
    const LOG_JUNGLE = Block.JungleLog;
    const PLANKS_OAK = Block.OakPlanks;
    const LIGHT_GRAY_CONCRETE = Block.LightGrayConcrete;

    // Global variables
    let 층높이합계 = 0;
    let ㄷ창문_만들기_조절 = false;
    let 세로z시작 = 0;
    let 가로x시작 = 0;
    let 창문_간격 = 0;
    let 창문_길이 = 0;
    let 창문_블록 = 0;
    let 창문_만들기 = false;
    let 지붕형태 = 0;
    let 지붕블록 = 0;
    let 벽블록 = 0;
    let 기둥블록 = 0;
    let 바닥내부블록 = 0;
    let 바닥외부블록 = 0;
    let 지붕한계높이 = 0;
    let 층높이 = 0;
    let 높이 = 0;
    let 세로z끝 = 0;
    let 가로x끝 = 0;
    let 가로12 = 0;
    let 세로13 = 0;
    let 세로13지점 = 0;
    let 세로23지점 = 0;
    let index = 0;
    let 가로길이 = 0;
    let 세로길이 = 0;
    let 반복 = 0;

    // Helper function to create position
    function pos(x: number, y: number, z: number): Position {
        return positions.createWorld(x, y, z);
    }

    //% block="Create square building width:$width length:$length height:$height floor height:$floorHeight||floor block:$floorBlock wall block:$wallBlock pillar block:$pillarBlock roof block:$roofBlock roof type:$roofType windows:$windowEnabled window block:$windowBlock window length:$windowLength window gap:$windowGap roof limit:$roofLimit"
    //% width.min=5 width.max=100 width.defl=20
    //% length.min=5 length.max=100 length.defl=20
    //% height.min=5 height.max=100 height.defl=20
    //% floorHeight.min=3 floorHeight.max=10 floorHeight.defl=4
    //% floorBlock.shadow=minecraftBlock
    //% floorBlock.defl=Block.Cobblestone
    //% wallBlock.shadow=minecraftBlock
    //% wallBlock.defl=Block.OakPlanks
    //% pillarBlock.shadow=minecraftBlock
    //% pillarBlock.defl=Block.JungleLog
    //% roofBlock.shadow=minecraftBlock
    //% roofBlock.defl=Block.LightGrayConcrete
    //% roofType.defl=RoofType.Flat
    //% windowEnabled.defl=true
    //% windowBlock.shadow=minecraftBlock
    //% windowBlock.defl=Block.Glass
    //% windowLength.min=1 windowLength.max=10 windowLength.defl=2
    //% windowGap.min=1 windowGap.max=10 windowGap.defl=2
    //% roofLimit.min=0 roofLimit.max=50 roofLimit.defl=0
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    export function createSquareBuilding(
        width: number,
        length: number,
        height: number,
        floorHeight: number,
        floorBlock: number = COBBLESTONE,
        wallBlock: number = PLANKS_OAK,
        pillarBlock: number = LOG_JUNGLE,
        roofBlock: number = LIGHT_GRAY_CONCRETE,
        roofType: RoofType = RoofType.Flat,
        windowEnabled: boolean = true,
        windowBlock: number = BLOCK_OF_QUARTZ,
        windowLength: number = 2,
        windowGap: number = 2,
        roofLimit: number = 0
    ) {
        const x = 1;
        const z = 1;
        // Calculate end coordinates
        let endX = x + width - 1;
        let endZ = z + length - 1;

        // Build main structure
        blocks.fill(
            wallBlock,
            pos(x, 0, z),
            pos(endX, height, endZ),
            FillOperation.Outline
        );

        // Build floor
        blocks.fill(
            floorBlock,
            pos(x, 0, z),
            pos(endX, 0, endZ),
            FillOperation.Replace
        );

        // Add pillars
        blocks.fill(
            pillarBlock,
            pos(x, 1, z),
            pos(x, height, z),
            FillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            pos(endX, 1, z),
            pos(endX, height, z),
            FillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            pos(x, 1, endZ),
            pos(x, height, endZ),
            FillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            pos(endX, 1, endZ),
            pos(endX, height, endZ),
            FillOperation.Replace
        );

        // Add windows if enabled
        if (windowEnabled) {
            addWindows(x, z, endX, endZ, height, windowBlock, windowLength, windowGap);
        }

        // Add roof based on type
        switch (roofType) {
            case RoofType.Flat:
                buildFlatRoof(roofBlock, x, endX, z, endZ, height);
                break;
            case RoofType.Triangle:
                buildTriangularRoof(roofBlock, x, endX, z, endZ, height, roofLimit);
                break;
            case RoofType.Pyramid:
                buildPyramidRoof(roofBlock, x, endX, z, endZ, height, roofLimit);
                break;
            case RoofType.Dome:
                if (width % 2 === 1) {
                    buildDomeRoof(roofBlock, x, endX, z, endZ, height);
                } else {
                    player.say("Dome roof requires odd width and length");
                }
                break;
        }
    }

    //% block="ㄱ자 건물 만들기 가로:$width 세로:$length 높이:$height 층높이:$floorHeight||바닥블록:$floorBlock 벽블록:$wallBlock 기둥블록:$pillarBlock 지붕블록:$roofBlock 지붕형태:$roofType 창문설치:$windowEnabled 창문블록:$windowBlock 창문길이:$windowLength 창문간격:$windowGap 한계 지붕 높이:$roofLimit"
    //% width.min=5 width.max=100 width.defl=20
    //% length.min=5 length.max=100 length.defl=20
    //% height.min=5 height.max=100 height.defl=20
    //% floorHeight.min=3 floorHeight.max=10 floorHeight.defl=4
    //% floorBlock.shadow=minecraftBlock
    //% floorBlock.defl=Block.Cobblestone
    //% wallBlock.shadow=minecraftBlock
    //% wallBlock.defl=Block.OakPlanks
    //% pillarBlock.shadow=minecraftBlock
    //% pillarBlock.defl=Block.JungleLog
    //% roofBlock.shadow=minecraftBlock
    //% roofBlock.defl=Block.LightGrayConcrete
    //% roofType.defl=RoofType.Flat
    //% windowEnabled.defl=true
    //% windowBlock.shadow=minecraftBlock
    //% windowBlock.defl=Block.Glass
    //% windowLength.min=1 windowLength.max=10 windowLength.defl=2
    //% windowGap.min=1 windowGap.max=10 windowGap.defl=2
    //% roofLimit.min=0 roofLimit.max=50 roofLimit.defl=0
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    export function ㄱ자건물(
        width: number,
        length: number,
        height: number,
        floorHeight: number,
        floorBlock: number = COBBLESTONE,
        wallBlock: number = PLANKS_OAK,
        pillarBlock: number = LOG_JUNGLE,
        roofBlock: number = LIGHT_GRAY_CONCRETE,
        roofType: RoofType = RoofType.Flat,
        windowEnabled: boolean = true,
        windowBlock: number = BLOCK_OF_QUARTZ,
        windowLength: number = 2,
        windowGap: number = 2,
        roofLimit: number = 0
    ) {
        const x = 1;
        const z = 1;
        // Calculate dimensions
        let endX = x + width - 1;
        let endZ = z + length - 1;
        let halfWidth = Math.floor(width / 2);
        let halfZ = Math.floor(length / 2);

        // Build main structure
        blocks.fill(
            wallBlock,
            pos(x, 0, z),
            pos(endX, height, endZ),
            FillOperation.Outline
        );

        // Build floor
        blocks.fill(
            floorBlock,
            pos(x, 0, z),
            pos(endX, 0, endZ),
            FillOperation.Replace
        );

        // Add pillars
        blocks.fill(
            pillarBlock,
            pos(x, 1, z),
            pos(x, height, z),
            FillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            pos(endX, 1, z),
            pos(endX, height, z),
            FillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            pos(x, 1, endZ),
            pos(x, height, endZ),
            FillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            pos(endX, 1, endZ),
            pos(endX, height, endZ),
            FillOperation.Replace
        );

        // Remove blocks to create ㄱ shape
        blocks.fill(
            AIR,
            pos(x, 0, z),
            pos(x + halfWidth - 1, height, z + halfZ - 1),
            FillOperation.Replace
        );

        // Add windows if enabled
        if (windowEnabled) {
            addWindows(x, z, endX, endZ, height, windowBlock, windowLength, windowGap);
        }

        // Add roof based on type
        switch (roofType) {
            case RoofType.Flat:
                buildFlatRoof(roofBlock, x, endX, z, endZ, height);
                break;
            case RoofType.Triangle:
                buildTriangularRoof(roofBlock, x + halfWidth, endX, z, endZ, height, roofLimit);
                buildTriangularRoof(roofBlock, x, endX, z + halfZ, endZ, height, roofLimit);
                break;
        }
    }

    //% block="ㄷ자 건물 만들기 가로:$width 세로:$length 높이:$height 층높이:$floorHeight||바닥블록:$floorBlock 벽블록:$wallBlock 기둥블록:$pillarBlock 지붕블록:$roofBlock 지붕형태:$roofType 창문설치:$windowEnabled 창문블록:$windowBlock 창문길이:$windowLength 창문간격:$windowGap 한계 지붕 높이:$roofLimit"
    //% width.min=5 width.max=100 width.defl=20
    //% length.min=5 length.max=100 length.defl=20
    //% height.min=5 height.max=100 height.defl=20
    //% floorHeight.min=3 floorHeight.max=10 floorHeight.defl=4
    //% floorBlock.shadow=minecraftBlock
    //% floorBlock.defl=Block.Cobblestone
    //% wallBlock.shadow=minecraftBlock
    //% wallBlock.defl=Block.OakPlanks
    //% pillarBlock.shadow=minecraftBlock
    //% pillarBlock.defl=Block.JungleLog
    //% roofBlock.shadow=minecraftBlock
    //% roofBlock.defl=Block.LightGrayConcrete
    //% roofType.defl=RoofType.Flat
    //% windowEnabled.defl=true
    //% windowBlock.shadow=minecraftBlock
    //% windowBlock.defl=Block.Glass
    //% windowLength.min=1 windowLength.max=10 windowLength.defl=2
    //% windowGap.min=1 windowGap.max=10 windowGap.defl=2
    //% roofLimit.min=0 roofLimit.max=50 roofLimit.defl=0
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    export function ㄷ자건물(
        width: number,
        length: number,
        height: number,
        floorHeight: number,
        floorBlock: number = COBBLESTONE,
        wallBlock: number = PLANKS_OAK,
        pillarBlock: number = LOG_JUNGLE,
        roofBlock: number = LIGHT_GRAY_CONCRETE,
        roofType: RoofType = RoofType.Flat,
        windowEnabled: boolean = true,
        windowBlock: number = BLOCK_OF_QUARTZ,
        windowLength: number = 2,
        windowGap: number = 2,
        roofLimit: number = 0
    ) {
        const x = 1;
        const z = 1;
        // Calculate dimensions
        let endX = x + width - 1;
        let endZ = z + length - 1;
        let thirdWidth = Math.floor(width / 3);

        // Build main structure
        blocks.fill(
            wallBlock,
            pos(x, 0, z),
            pos(endX, height, endZ),
            FillOperation.Outline
        );

        // Build floor
        blocks.fill(
            floorBlock,
            pos(x, 0, z),
            pos(endX, 0, endZ),
            FillOperation.Replace
        );

        // Add pillars
        blocks.fill(
            pillarBlock,
            pos(x, 1, z),
            pos(x, height, z),
            FillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            pos(endX, 1, z),
            pos(endX, height, z),
            FillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            pos(x, 1, endZ),
            pos(x, height, endZ),
            FillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            pos(endX, 1, endZ),
            pos(endX, height, endZ),
            FillOperation.Replace
        );

        // Remove blocks to create ㄷ shape
        blocks.fill(
            AIR,
            pos(x, 0, z + thirdWidth),
            pos(Math.floor(width / 2) - 1, height, z + 2 * thirdWidth - 1),
            FillOperation.Replace
        );

        // Add windows if enabled
        if (windowEnabled) {
            addWindows(x, z, endX, endZ, height, windowBlock, windowLength, windowGap);
        }

        // Add roof based on type
        switch (roofType) {
            case RoofType.Flat:
                buildFlatRoof(roofBlock, x, endX, z, endZ, height);
                break;
            case RoofType.Triangle:
                buildTriangularRoof(roofBlock, x, endX, z, z + thirdWidth - 1, height, roofLimit);
                buildTriangularRoof(roofBlock, x, endX, z + 2 * thirdWidth + 1, endZ, height, roofLimit);
                break;
        }
    }

    // Helper function to add windows
    function addWindows(startX: number, startZ: number, endX: number, endZ: number, height: number, windowBlock: number, windowLength: number, windowGap: number) {
        let windowY = 2;
        while (windowY < height) {
            // Add windows on all sides
            for (let x = startX + windowGap; x <= endX - windowGap - windowLength; x += windowLength + windowGap) {
                blocks.fill(
                    windowBlock,
                    pos(x, windowY, startZ),
                    pos(x + windowLength, windowY + 1, startZ),
                    FillOperation.Replace
                );
                blocks.fill(
                    windowBlock,
                    pos(x, windowY, endZ),
                    pos(x + windowLength, windowY + 1, endZ),
                    FillOperation.Replace
                );
            }
            for (let z = startZ + windowGap; z <= endZ - windowGap - windowLength; z += windowLength + windowGap) {
                blocks.fill(
                    windowBlock,
                    pos(startX, windowY, z),
                    pos(startX, windowY + 1, z + windowLength),
                    FillOperation.Replace
                );
                blocks.fill(
                    windowBlock,
                    pos(endX, windowY, z),
                    pos(endX, windowY + 1, z + windowLength),
                    FillOperation.Replace
                );
            }
            windowY += 4;
        }
    }

    // Helper functions for roof types
    function buildFlatRoof(roofBlock: number, startX: number, endX: number, startZ: number, endZ: number, height: number) {
        blocks.fill(
            roofBlock,
            pos(startX, height, startZ),
            pos(endX, height, endZ),
            FillOperation.Replace
        );
    }

    function buildTriangularRoof(roofBlock: number, startX: number, endX: number, startZ: number, endZ: number, height: number, roofLimit: number) {
        let roofHeight = roofLimit > 0 ? roofLimit : Math.floor((endX - startX + 1) / 2);
        for (let y = 0; y < roofHeight; y++) {
            blocks.fill(
                roofBlock,
                pos(startX + y, height + y, startZ),
                pos(endX - y, height + y, endZ),
                FillOperation.Replace
            );
        }
    }

    function buildPyramidRoof(roofBlock: number, startX: number, endX: number, startZ: number, endZ: number, height: number, roofLimit: number) {
        let width = endX - startX + 1;
        let length = endZ - startZ + 1;
        let roofHeight = roofLimit > 0 ? roofLimit : Math.floor(Math.min(width, length) / 2);

        for (let y = 0; y < roofHeight; y++) {
            blocks.fill(
                roofBlock,
                pos(startX + y, height + y, startZ + y),
                pos(endX - y, height + y, endZ - y),
                FillOperation.Replace
            );
        }
    }

    function buildDomeRoof(roofBlock: number, startX: number, endX: number, startZ: number, endZ: number, height: number) {
        let radius = Math.floor((endX - startX) / 2);
        let centerX = startX + radius;
        let centerZ = startZ + radius;

        for (let y = 0; y <= radius; y++) {
            let circleRadius = Math.floor(Math.sqrt(radius * radius - y * y));
            for (let x = -circleRadius; x <= circleRadius; x++) {
                for (let z = -circleRadius; z <= circleRadius; z++) {
                    if (x * x + z * z <= circleRadius * circleRadius) {
                        blocks.place(
                            roofBlock,
                            pos(centerX + x, height + y, centerZ + z)
                        );
                    }
                }
            }
        }
    }

    function ㄷ (가로x시작: number, 가로x끝: number, 세로z시작: number, 세로z끝: number, 높이: number, 층높이: number, 지붕한계높이: number, 바닥블록외부: number, 바닥블록내부: number, 기둥블록: number, 벽블록: number, 지붕블록: number, 지붕형태: number) {
        가로12 = Math.floor((가로x끝 - 가로x시작 + 1) / 2);
        세로13 = Math.floor((세로z끝 - 세로z시작 + 1) / 3);
        세로13지점 = 세로z시작 + 세로13 - 1;
        세로23지점 = 세로z끝 - 세로13 + 1;
        // ... rest of the function ...
    }

    function 피라미드지붕ㅁ (지붕블록: number, 가로x시작: number, 가로x끝: number, 세로z시작: number, 세로z끝: number, 높이: number) {
        index = 0;
        가로길이 = 가로x끝 - 가로x시작;
        세로길이 = 세로z끝 - 세로z시작;
        if (세로길이 >= 가로길이) {
            반복 = Math.floor((가로길이 + 1) / 2);
        } else {
            반복 = Math.floor((세로길이 + 1) / 2);
        }
        // ... rest of the function ...
    }
} 