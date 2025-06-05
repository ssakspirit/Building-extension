declare const enum BuildingBlock {
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

declare const enum BuildingFillOperation {
    Replace = 0,
    Outline = 1
}

declare class Position {
    constructor(x: number, y: number, z: number);
}

declare namespace positions {
    function createWorld(x: number, y: number, z: number): Position;
}

declare namespace blocks {
    function block(block: BuildingBlock): number;
    function fill(block: number, from: Position, to: Position, operation: BuildingFillOperation): void;
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
    let floorHeightSum = 0;
    let windowAdjustment = false;

    //% block="Create square building width:$width length:$length height:$height floor height:$floorHeight||floor block:$floorBlock wall block:$wallBlock pillar block:$pillarBlock roof block:$roofBlock roof type:$roofType windows:$windowEnabled window block:$windowBlock window length:$windowLength window gap:$windowGap roof limit:$roofLimit"
    //% width.min=5 width.max=100 width.defl=20
    //% length.min=5 length.max=100 length.defl=20
    //% height.min=5 height.max=100 height.defl=20
    //% floorHeight.min=3 floorHeight.max=10 floorHeight.defl=4
    //% floorBlock.shadow=minecraftBlock
    //% floorBlock.defl=BuildingBlock.Cobblestone
    //% wallBlock.shadow=minecraftBlock
    //% wallBlock.defl=BuildingBlock.OakPlanks
    //% pillarBlock.shadow=minecraftBlock
    //% pillarBlock.defl=BuildingBlock.JungleLog
    //% roofBlock.shadow=minecraftBlock
    //% roofBlock.defl=BuildingBlock.LightGrayConcrete
    //% roofType.defl=RoofType.Flat
    //% windowEnabled.defl=true
    //% windowBlock.shadow=minecraftBlock
    //% windowBlock.defl=BuildingBlock.Glass
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
        floorBlock: number = blocks.block(BuildingBlock.Cobblestone),
        wallBlock: number = blocks.block(BuildingBlock.OakPlanks),
        pillarBlock: number = blocks.block(BuildingBlock.JungleLog),
        roofBlock: number = blocks.block(BuildingBlock.LightGrayConcrete),
        roofType: RoofType = RoofType.Flat,
        windowEnabled: boolean = true,
        windowBlock: number = blocks.block(BuildingBlock.Glass),
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
            positions.createWorld(x, 0, z),
            positions.createWorld(endX, height, endZ),
            BuildingFillOperation.Outline
        );

        // Build floor
        blocks.fill(
            floorBlock,
            positions.createWorld(x, 0, z),
            positions.createWorld(endX, 0, endZ),
            BuildingFillOperation.Replace
        );

        // Add pillars
        blocks.fill(
            pillarBlock,
            positions.createWorld(x, 1, z),
            positions.createWorld(x, height, z),
            BuildingFillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            positions.createWorld(endX, 1, z),
            positions.createWorld(endX, height, z),
            BuildingFillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            positions.createWorld(x, 1, endZ),
            positions.createWorld(x, height, endZ),
            BuildingFillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            positions.createWorld(endX, 1, endZ),
            positions.createWorld(endX, height, endZ),
            BuildingFillOperation.Replace
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
    //% floorBlock.defl=BuildingBlock.Cobblestone
    //% wallBlock.shadow=minecraftBlock
    //% wallBlock.defl=BuildingBlock.OakPlanks
    //% pillarBlock.shadow=minecraftBlock
    //% pillarBlock.defl=BuildingBlock.JungleLog
    //% roofBlock.shadow=minecraftBlock
    //% roofBlock.defl=BuildingBlock.LightGrayConcrete
    //% roofType.defl=RoofType.Flat
    //% windowEnabled.defl=true
    //% windowBlock.shadow=minecraftBlock
    //% windowBlock.defl=BuildingBlock.Glass
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
        floorBlock: number = blocks.block(BuildingBlock.Cobblestone),
        wallBlock: number = blocks.block(BuildingBlock.OakPlanks),
        pillarBlock: number = blocks.block(BuildingBlock.JungleLog),
        roofBlock: number = blocks.block(BuildingBlock.LightGrayConcrete),
        roofType: RoofType = RoofType.Flat,
        windowEnabled: boolean = true,
        windowBlock: number = blocks.block(BuildingBlock.Glass),
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
            positions.createWorld(x, 0, z),
            positions.createWorld(endX, height, endZ),
            BuildingFillOperation.Outline
        );

        // Build floor
        blocks.fill(
            floorBlock,
            positions.createWorld(x, 0, z),
            positions.createWorld(endX, 0, endZ),
            BuildingFillOperation.Replace
        );

        // Add pillars
        blocks.fill(
            pillarBlock,
            positions.createWorld(x, 1, z),
            positions.createWorld(x, height, z),
            BuildingFillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            positions.createWorld(endX, 1, z),
            positions.createWorld(endX, height, z),
            BuildingFillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            positions.createWorld(x, 1, endZ),
            positions.createWorld(x, height, endZ),
            BuildingFillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            positions.createWorld(endX, 1, endZ),
            positions.createWorld(endX, height, endZ),
            BuildingFillOperation.Replace
        );

        // Remove blocks to create ㄱ shape
        blocks.fill(
            blocks.block(BuildingBlock.Air),
            positions.createWorld(x, 0, z),
            positions.createWorld(x + halfWidth - 1, height, z + halfZ - 1),
            BuildingFillOperation.Replace
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
    //% floorBlock.defl=BuildingBlock.Cobblestone
    //% wallBlock.shadow=minecraftBlock
    //% wallBlock.defl=BuildingBlock.OakPlanks
    //% pillarBlock.shadow=minecraftBlock
    //% pillarBlock.defl=BuildingBlock.JungleLog
    //% roofBlock.shadow=minecraftBlock
    //% roofBlock.defl=BuildingBlock.LightGrayConcrete
    //% roofType.defl=RoofType.Flat
    //% windowEnabled.defl=true
    //% windowBlock.shadow=minecraftBlock
    //% windowBlock.defl=BuildingBlock.Glass
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
        floorBlock: number = blocks.block(BuildingBlock.Cobblestone),
        wallBlock: number = blocks.block(BuildingBlock.OakPlanks),
        pillarBlock: number = blocks.block(BuildingBlock.JungleLog),
        roofBlock: number = blocks.block(BuildingBlock.LightGrayConcrete),
        roofType: RoofType = RoofType.Flat,
        windowEnabled: boolean = true,
        windowBlock: number = blocks.block(BuildingBlock.Glass),
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
            positions.createWorld(x, 0, z),
            positions.createWorld(endX, height, endZ),
            BuildingFillOperation.Outline
        );

        // Build floor
        blocks.fill(
            floorBlock,
            positions.createWorld(x, 0, z),
            positions.createWorld(endX, 0, endZ),
            BuildingFillOperation.Replace
        );

        // Add pillars
        blocks.fill(
            pillarBlock,
            positions.createWorld(x, 1, z),
            positions.createWorld(x, height, z),
            BuildingFillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            positions.createWorld(endX, 1, z),
            positions.createWorld(endX, height, z),
            BuildingFillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            positions.createWorld(x, 1, endZ),
            positions.createWorld(x, height, endZ),
            BuildingFillOperation.Replace
        );
        blocks.fill(
            pillarBlock,
            positions.createWorld(endX, 1, endZ),
            positions.createWorld(endX, height, endZ),
            BuildingFillOperation.Replace
        );

        // Remove blocks to create ㄷ shape
        blocks.fill(
            blocks.block(BuildingBlock.Air),
            positions.createWorld(x, 0, z + thirdWidth),
            positions.createWorld(Math.floor(width / 2) - 1, height, z + 2 * thirdWidth - 1),
            BuildingFillOperation.Replace
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
                    positions.createWorld(x, windowY, startZ),
                    positions.createWorld(x + windowLength, windowY + 1, startZ),
                    BuildingFillOperation.Replace
                );
                blocks.fill(
                    windowBlock,
                    positions.createWorld(x, windowY, endZ),
                    positions.createWorld(x + windowLength, windowY + 1, endZ),
                    BuildingFillOperation.Replace
                );
            }
            for (let z = startZ + windowGap; z <= endZ - windowGap - windowLength; z += windowLength + windowGap) {
                blocks.fill(
                    windowBlock,
                    positions.createWorld(startX, windowY, z),
                    positions.createWorld(startX, windowY + 1, z + windowLength),
                    BuildingFillOperation.Replace
                );
                blocks.fill(
                    windowBlock,
                    positions.createWorld(endX, windowY, z),
                    positions.createWorld(endX, windowY + 1, z + windowLength),
                    BuildingFillOperation.Replace
                );
            }
            windowY += 4;
        }
    }

    // Helper functions for roof types
    function buildFlatRoof(roofBlock: number, startX: number, endX: number, startZ: number, endZ: number, height: number) {
        blocks.fill(
            roofBlock,
            positions.createWorld(startX, height, startZ),
            positions.createWorld(endX, height, endZ),
            BuildingFillOperation.Replace
        );
    }

    function buildTriangularRoof(roofBlock: number, startX: number, endX: number, startZ: number, endZ: number, height: number, roofLimit: number) {
        let roofHeight = roofLimit > 0 ? roofLimit : Math.floor((endX - startX + 1) / 2);
        for (let y = 0; y < roofHeight; y++) {
            blocks.fill(
                roofBlock,
                positions.createWorld(startX + y, height + y, startZ),
                positions.createWorld(endX - y, height + y, endZ),
                BuildingFillOperation.Replace
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
                positions.createWorld(startX + y, height + y, startZ + y),
                positions.createWorld(endX - y, height + y, endZ - y),
                BuildingFillOperation.Replace
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
                            positions.createWorld(centerX + x, height + y, centerZ + z)
                        );
                    }
                }
            }
        }
    }
} 