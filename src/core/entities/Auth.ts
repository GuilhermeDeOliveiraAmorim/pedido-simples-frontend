export interface LoginInputDto {
  login: {
    email: string;
    password: string;
  };
  user_type: "customer" | "restaurant";
}

export interface LoginOutputDto {
  access_token: string;
  content_message: string;
  id: string;
  name: string;
  success_message: string;
}

export interface RequestLoginChangeInputDto {
  change_type: string;
  login: {
    email: string;
    password: string;
  };
  new_value: string;
  user_type: "customer" | "restaurant";
}

export interface RequestLoginChangeOutputDto {
  success_message: string;
  content_message: string;
}

export interface ConfirmLoginChangeInputDto {
  confirmation_token: string;
}

export interface ConfirmLoginChangeOutputDto {
  id: string;
  name: string;
  access_token: string;
  success_message: string;
  content_message: string;
}
