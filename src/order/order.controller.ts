import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
  Req,
  UnauthorizedException,
  NotFoundException,
  UseGuards,
  Query,
  Headers,
  Get,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { OrderService } from './order.service';
import { AcceptOrderCashDto, CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/user/guard/auth.gard';
import { Roles } from 'src/user/decorators/user.decorators';
import { Request } from 'express';

@Controller('cart/checkout')
export class OrderCheckoutController {
  constructor(private readonly orderService: OrderService) {}

  //  @docs   User Can Create Order and Checkout session
  //  @Route  POST /api/v1/cart/checkout/:paymentMethodType?success_url=https://ecommerce-nestjs.com&cancel_url=https://ecommerce-nestjs.com
  //  @access Private [User]
  @Post(':paymentMethodType')
  @Roles(['user'])
  @UseGuards(AuthGuard)
  create(
    @Param('paymentMethodType') paymentMethodType: 'card' | 'cash',
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    createOrderDto: CreateOrderDto,
    @Req() req,
    @Query() query,
  ) {
    if (!['card', 'cash'].includes(paymentMethodType)) {
      throw new NotFoundException('No payment method found');
    }
    const {
      success_url = 'https://ecommerce-nestjs.com',
      cancel_url = 'https://ecommerce-nestjs.com',
    } = query;

    const dataAfterPayment = {
      success_url,
      cancel_url,
    };

    const user_id = req.user._id;
    return this.orderService.create(
      user_id,
      paymentMethodType,
      createOrderDto,
      dataAfterPayment,
    );
  }

  //  @docs   Admin Can Update Order payment cash
  //  @Route  PATCH /api/v1/cart/checkout/:orderId/cash
  //  @access Private [User]
  @Patch(':orderId/cash')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  updatePaidCash(
    @Param('orderId') orderId: string,
    @Body(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
    updateOrderDto: AcceptOrderCashDto,
  ) {
    return this.orderService.updatePaidCash(orderId, updateOrderDto);
  }
}

@Controller('checkout/session')
export class CheckoutCardController {
  constructor(private readonly orderService: OrderService) {}

  //  @docs   Webhook paid order true auto
  //  @Route  PATCH /api/v1/checkout/session
  //  @access Private [Stripe]
  @Post()
  updatePaidCard(
    @Headers('stripe-signature') sig,
    @Req() request: RawBodyRequest<Request>,
  ) {
    const endpointSecret = process.env.STRIPE_WEBHOCK_ENDPOINT || "";

    const payload = request.rawBody;

    return this.orderService.updatePaidCard(payload, sig, endpointSecret);
  }
}

@Controller('order/user')
export class OrderForUserController {
  constructor(private readonly orderService: OrderService) {}

  //  @docs   User Can get all order
  //  @Route  GET /api/v1/order/user
  //  @access Private [User]
  @Get()
  @Roles(['user'])
  @UseGuards(AuthGuard)
  findAllOrdersOnUser(@Req() req) {
    const user_id = req.user._id;
    return this.orderService.findAllOrdersOnUser(user_id);
  }
}
@Controller('order/admin')
export class OrderForAdminController {
  constructor(private readonly orderService: OrderService) {}

  //  @docs   Admin Can get all order
  //  @Route  GET /api/v1/order/admin
  //  @access Private [Admin]
  @Get()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findAllOrders() {
    return this.orderService.findAllOrders();
  }
  //  @docs   Admin Can get all order
  //  @Route  GET /api/v1/order/admin/:userId
  //  @access Private [Admin]
  @Get(':userId')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findAllOrdersByUserId(@Param('userId') userId: string) {
    return this.orderService.findAllOrdersOnUser(userId);
  }
}

/*
stripe login
stripe listen --forward-to localhost:3000/api/v1/checkout/session
*/