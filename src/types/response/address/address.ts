// types/address.ts hoặc types/response/address/address.ts

export interface AddressRequest {
  addressLine1: string;
  addressLine2?: string;
  province: string;
  district: string;
  ward: string;
  defaultAddress: boolean;
}

export interface AddressResponse {
  addressId: number;
  addressLine1: string;
  addressLine2?: string;
  province: string;
  district: string;
  ward: string;
  defaultAddress: boolean;
}

export interface AddressListResponse {
  result: AddressResponse[];
  code?: number;
  message?: string;
}

export interface SingleAddressResponse {
  result: AddressResponse;
  code?: number;
  message?: string;
}

export interface DeleteAddressResponse {
  result: string;
  code?: number;
  message?: string;
}