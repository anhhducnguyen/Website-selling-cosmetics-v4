// src/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { VnpayController } from './vnpay.controller';

@Module({
  controllers: [VnpayController],
})
export class PaymentModule {}
