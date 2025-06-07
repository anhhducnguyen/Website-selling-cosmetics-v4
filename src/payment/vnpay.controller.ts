import { Controller, Post, Get, Query, HttpStatus } from '@nestjs/common';
import {
  VNPay,
  ignoreLogger,
  ProductCode,
  VnpLocale,
  dateFormat,
  HashAlgorithm,
  ReturnQueryFromVNPay,
} from 'vnpay';

@Controller({
  path: 'payment',
  version: '1',
})
export class VnpayController {
  private readonly vnpay = new VNPay({
    tmnCode: process.env.VNP_TMN_CODE!,
    secureSecret: process.env.VNP_SECRET_KEY!,
    vnpayHost: process.env.VNP_URL!,
    testMode: true,
    hashAlgorithm: HashAlgorithm.SHA512,
    loggerFn: ignoreLogger,
  });

  @Post('create-qr')
  async createQr() {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const vnpayResponse = await this.vnpay.buildPaymentUrl({
        vnp_Amount: 50000 * 100,
        vnp_IpAddr: '127.0.0.1',
        vnp_TxnRef: Date.now().toString(),
        vnp_OrderInfo: 'Thanh toán đơn hàng #123456',
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: 'http://localhost:3000/api/v1/payment/return',
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date()),
        vnp_ExpireDate: dateFormat(tomorrow),
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo URL thanh toán thành công!',
        data: vnpayResponse,
      };
    } catch (error) {
      console.error('Lỗi tạo QR thanh toán:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Tạo URL thanh toán thất bại!',
      };
    }
  }

  @Get('return')
  paymentReturn(@Query() query: Record<string, string>) {
    const isValid = this.vnpay.verifyReturnUrl(query as ReturnQueryFromVNPay);

    if (isValid) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Thanh toán thành công!',
        data: query,
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Chữ ký không hợp lệ!',
        data: query,
      };
    }
  }
}
