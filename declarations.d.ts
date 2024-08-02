export interface UserWalletmodel {
    email: string;
    password: string;
    address: string;
    merchantID: string;
  
    wallet: [
      {
        currencyName: string;
        currencySymbol: string;
        type: "fiat" | "crypto";
        currencyAmount: number;
        pendingAmount:number;
      }
    ];
    save: any;
  }

  export interface WalletOptions {
    currencyName: string;
    currencySymbol: string;
    type: "fiat" | "crypto";
    currencyAmount: number;
  }
  