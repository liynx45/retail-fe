interface IUser {
    id: string;
    username: string;
    role: number;
    email?: string;
    password: string;
    user_info?: IUserInfo;
    user_token?: IUserToken;
    create_at: Date;
    transaction: ITransaction[];
    notif: INotification[];
  }
  
  interface IUserInfo {
    id: string;
    first_name: string;
    last_name?: string;
    profile?: string;
    users: IUser;
    userId: string;
  }
  
  interface IUserToken {
    id: string;
    access_Token?: string;
    refresh_token?: string;
    login_at?: Date;
    users: IUser;
    userId: string;
  }
  
  interface IRoom {
    id: string;
    no_room: number;
    status: number;
    add_at: Date;
    cost?: number;
    price: number;
    expire_rent?: Date;
    room_info?: IRoomInfo;
    facilityId: string[];
    facility: IFacility[];
    room_image: IRoomImage[];
    transactionId: string[];
    transaction: ITransaction[];
  }
  
  interface IRoomInfo {
    id: string;
    name: string;
    desc?: string;
    wide?: number;
    long?: number;
    type: string;
    update_at?: string;
    roomId: string;
    rooms: IRoom;
  }
  
  interface IRoomImage {
    id: string;
    url: string;
    roomId: string;
    rooms: IRoom;
  }
  
  interface ICategory {
    id: string;
    name: string;
    facility: IFacility[];
  }
  
  interface IFacility {
    id: string;
    name: string;
    cost: number;
    status: boolean;
    roomId: string[];
    rooms: IRoom[];
    category?: ICategory;
    categoryId?: string;
  }
  
  interface ITransaction {
    id: string;
    code: string;
    total_amount: number;
    date: Date;
    expire: Date;
    status: number;
    payment: string;
    userId: string;
    users: IUser;
    roomId: string[];
    rooms: IRoom[];
  }
  
  interface INotification {
    id: string;
    message: string;
    type: string;
    send_at: Date;
    read: boolean;
    path?: string;
    required: boolean;
    userId: string;
    users: IUser;
  }
  
  interface ICompanyInfo {
    id: string;
    name: string;
    alamat: string;
    no: number;
    owner: string;
    banner: IBannerCompany[];
  }
  
  interface IBannerCompany {
    id: string;
    url: string;
    companyId: string;
    company: ICompanyInfo;
  }
  
  export {
    IUser,
    IUserInfo,
    IUserToken,
    IRoom,
    IRoomInfo,
    IRoomImage,
    ICategory,
    IFacility,
    ITransaction,
    INotification,
    ICompanyInfo,
    IBannerCompany
  };
  