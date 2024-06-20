/* eslint-disable prettier/prettier */
export class AuthResponseDto {
  token: string;
  expiresIn: number;
  user: {
    cpf: string;
    email: string;
    name: string;
    password: string;
    phone?: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
