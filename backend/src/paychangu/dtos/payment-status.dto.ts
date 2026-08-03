export class PaymentStatusDto {
  reference: string;
  status: string;
  amount: number;
  paidAt?: Date;
  message: string;
}
