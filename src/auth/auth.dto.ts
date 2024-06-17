/* eslint-disable prettier/prettier */
export class AuthResponseDto {
  token: string;
  expiresIn: number;
  user: {
    id: number;
    email: string;
    name: string;
    password: string;
    cpf: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
