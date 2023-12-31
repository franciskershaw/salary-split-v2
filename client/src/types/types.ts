export interface User {
  userInfo: {
    _id: string;
    username: string;
    name: string;
    monthlySalary: number;
    payDaytransactions: string[];
    accounts: string[];
    balanceAccount?: string;
    billsAccount?: string;
  };
  accessToken: string;
}
