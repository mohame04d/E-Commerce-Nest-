import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCartItemsDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './cart.schema';
import { Model } from 'mongoose';
import { Product } from 'src/product/product.schema';
import { Coupon } from 'src/Coupon/coupon.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModule: Model<Cart>,
    @InjectModel('Product') private readonly productModule: Model<Product>,
    @InjectModel('Coupon') private readonly couponModule: Model<Coupon>,
  ) {}

  async create(product_id: string, user_id: string) {

  const product = await this.productModule.findById(product_id);

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  if (product.quantity <= 0) {
    throw new NotFoundException('Product out of stock');
  }

  let cart = await this.cartModule.findOne({ user: user_id });

  if (!cart) {
    cart = await this.cartModule.create({
      user: user_id,
      cartItems: [],
      totalPrice: 0
    });
  }

  const itemIndex = cart.cartItems.findIndex(
    item => item.productId.toString() === product_id
  );

  if (itemIndex > -1) {
    cart.cartItems[itemIndex].quantity += 1;
  } else {
    cart.cartItems.push({
      productId: product._id,
      quantity: 1,
      color: ''
    });
  }

  // calculate total price
  let total = 0;

  const populatedCart = await cart.populate(
    'cartItems.productId',
    'price priceAfterDiscount'
  );


for (const item of populatedCart.cartItems) {
  const product = await this.productModule.findById(item.productId);
  if (!product) {
    throw new NotFoundException('Product not found');
  }
  total += item.quantity * product.priceAfterDiscount;
}

  populatedCart.totalPrice = total;

  await populatedCart.save();

  return {
    message: "Product added to cart",
    data: populatedCart
  };
}
  async applyCoupon(user_id: string, couponName: string) {
    const cart = await this.cartModule.findOne({ user: user_id });
    const coupon = await this.couponModule.findOne({ name: couponName });

    if (!cart) {
      throw new NotFoundException('Not Found Cart');
    }
    if (!coupon) {
      throw new HttpException('Invalid coupon', 400);
    }
    const isExpired = new Date(coupon.ExpireDate) > new Date();
    if (!isExpired) {
      throw new HttpException('Invalid coupon', 400);
    }

    const ifCouponAlredyUsed = cart.coupons.findIndex(
      (item) => item.name === couponName,
    );
    if (ifCouponAlredyUsed !== -1) {
      throw new HttpException('Coupon alredy used', 400);
    }

    if (cart.totalPrice <= 0) {
      throw new HttpException('You have full discount', 400);
    }

    cart.coupons.push({ name: coupon.name, couponId: coupon._id.toString() });
    cart.totalPrice = cart.totalPrice - coupon.discount;
    await cart.save();

    return {
      status: 200,
      message: 'Coupon Applied',
      data: cart,
    };
  }

  async findOne(user_id: string) {
    const cart = await this.cartModule
      .findOne({ user: user_id })
      .populate('cartItems.productId', 'price title description')
      .select('-__v');
    if (!cart) {
      throw new NotFoundException(
        `You don't hava a cart please go to add prducts`,
      );
    }

    return {
      status: 200,
      message: 'Found Cart',
      data: cart,
    };
  }

  async update(
    productId: string,
    user_id: string,
    updateCartItemsDto: UpdateCartItemsDto,
  ) {
    const cart = await this.cartModule
      .findOne({ user: user_id })
    const product = await this.productModule.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!cart) {
      const result = await this.create(productId, user_id);
      return result;
    }

    const indexProductUpdate = cart.cartItems.findIndex(
      (item) => item.productId._id.toString() === productId.toString(),
    );

    if (indexProductUpdate === -1) {
      throw new NotFoundException('Not Found any product in cart');
    }

    // update color
    if (updateCartItemsDto.color) {
      cart.cartItems[indexProductUpdate].color = updateCartItemsDto.color;
    }
    // update quantity
    if (updateCartItemsDto.quantity > product.quantity) {
      throw new NotFoundException('Not Found quantity on this product');
    }

    let total = 0;

for (const item of cart.cartItems) {
  const product = await this.productModule.findById(item.productId);
  if (!product) {
    throw new NotFoundException('Product not found');
  }
  total += item.quantity * product.priceAfterDiscount;
}

cart.totalPrice = total;
    await cart.save();
    return {
      status: 200,
      message: 'Product Updated',
      data: cart,
    };
  }

  async remove(productId: string, user_id: string) {
    const cart = await this.cartModule
      .findOne({ user: user_id })
    if (!cart) {
      throw new NotFoundException('Not Found Cart');
    }
    const indexProductUpdate = cart.cartItems.findIndex(
      (item) => item.productId.toString() === productId.toString(),
    );
    if (indexProductUpdate === -1) {
      throw new NotFoundException('Not Found any product in cart');
    }

    // eslint-disable-next-line
    // @ts-ignore
    cart.cartItems = cart.cartItems.filter(
      (item, index) => index !== indexProductUpdate,
    );

    let total = 0;

for (const item of cart.cartItems) {
  const product = await this.productModule.findById(item.productId);
  if (!product) {
    throw new NotFoundException('Product not found');
  }
  total += item.quantity * product.priceAfterDiscount;
}
    await cart.save();

    return {
      status: 200,
      message: 'Deleted Product',
      data: cart,
    };
  }

  // ===== For Admin ======== \\

  async findOneForAdmin(userId: string) {
    const cart = await this.cartModule
      .findOne({ user: userId })
      .populate('cartItems.productId', 'price title description');
    if (!cart) {
      throw new NotFoundException('Not Found Cart');
    }
    return {
      status: 200,
      message: 'Found Cart',
      data: cart,
    };
  }

  async findAllForAdmin() {
    const carts = await this.cartModule
      .find()
      .select('-__v')
      .populate(
        'cartItems.productId user coupons.couponId',
        'name email expireDate price title description',
      );
    return {
      status: 200,
      message: 'Found All Carts',
      length: carts.length,
      data: carts,
    };
  }
}