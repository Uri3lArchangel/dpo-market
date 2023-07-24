-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(512) NOT NULL,
    `email` VARCHAR(512) NOT NULL,
    `addedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isAccredited` BOOLEAN NOT NULL DEFAULT false,
    `totalCoinsAssetValue` VARCHAR(255) NOT NULL DEFAULT '0',
    `activeOrders` BOOLEAN NOT NULL DEFAULT false,
    `isDebtOfferActive` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equity` (
    `equityID` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `walletAddress` VARCHAR(1024) NOT NULL,
    `totalAmountInvested` VARCHAR(255) NOT NULL DEFAULT '0',
    `totalTokensToReceive` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Equity_userID_key`(`userID`),
    PRIMARY KEY (`equityID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Debt` (
    `debtID` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `walletAddress` VARCHAR(1024) NOT NULL,
    `totalNotesOwned` INTEGER NOT NULL DEFAULT 0,
    `totalFaceValue` VARCHAR(255) NOT NULL,
    `maturityPeriodInDays` INTEGER NULL,
    `maturityDate` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Debt_userID_key`(`userID`),
    PRIMARY KEY (`debtID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Market` (
    `marketName` VARCHAR(191) NOT NULL,
    `primaryMarketState` ENUM('OPEN', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    `primaryMarketProgress` VARCHAR(255) NOT NULL DEFAULT '0',
    `secondaryMarketState` ENUM('OPEN', 'CLOSED') NOT NULL DEFAULT 'CLOSED',

    UNIQUE INDEX `Market_marketName_key`(`marketName`),
    PRIMARY KEY (`marketName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,

    UNIQUE INDEX `Orders_orderId_key`(`orderId`),
    UNIQUE INDEX `Orders_userID_key`(`userID`),
    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BuyOrder` (
    `position` INTEGER NOT NULL AUTO_INCREMENT,
    `buyOrderId` INTEGER NOT NULL,
    `coin` CHAR(255) NOT NULL,
    `amount` VARCHAR(255) NOT NULL,
    `price` VARCHAR(255) NOT NULL,
    `total` VARCHAR(255) NOT NULL,
    `amountLeftToBeComplete` VARCHAR(255) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `BuyOrder_position_key`(`position`),
    UNIQUE INDEX `BuyOrder_buyOrderId_key`(`buyOrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SellOrder` (
    `position` INTEGER NOT NULL AUTO_INCREMENT,
    `sellOrderId` INTEGER NOT NULL,
    `coin` CHAR(255) NOT NULL,
    `amount` VARCHAR(255) NOT NULL,
    `price` VARCHAR(255) NOT NULL,
    `total` INTEGER NOT NULL DEFAULT 0,
    `amountLeftToBeComplete` VARCHAR(255) NOT NULL,
    `completed` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `SellOrder_position_key`(`position`),
    UNIQUE INDEX `SellOrder_sellOrderId_key`(`sellOrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `coinName` VARCHAR(255) NULL,
    `walletOwnerID` INTEGER NOT NULL,
    `amount` VARCHAR(191) NOT NULL,
    `valueInUSD` VARCHAR(191) NOT NULL,
    `contractAddress` VARCHAR(1024) NOT NULL,

    UNIQUE INDEX `Wallet_coinName_key`(`coinName`),
    UNIQUE INDEX `Wallet_walletOwnerID_key`(`walletOwnerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DPOPRICE` (
    `order` INTEGER NOT NULL AUTO_INCREMENT,
    `price` VARCHAR(255) NOT NULL DEFAULT '1',
    `direction` ENUM('UP', 'DOWN') NULL,

    UNIQUE INDEX `DPOPRICE_order_key`(`order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Equity` ADD CONSTRAINT `Equity_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Debt` ADD CONSTRAINT `Debt_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BuyOrder` ADD CONSTRAINT `BuyOrder_buyOrderId_fkey` FOREIGN KEY (`buyOrderId`) REFERENCES `Orders`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SellOrder` ADD CONSTRAINT `SellOrder_sellOrderId_fkey` FOREIGN KEY (`sellOrderId`) REFERENCES `Orders`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_walletOwnerID_fkey` FOREIGN KEY (`walletOwnerID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
