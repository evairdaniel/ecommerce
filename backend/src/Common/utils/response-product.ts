import { ResponseProductDto } from 'src/modules/product/dto/response-product.dto';
import { ProductDocument } from 'src/modules/product/product.schema';

export function productResponse(product: ProductDocument): ResponseProductDto {
  return {
    id: product._id.toString(),
    name: product.name,
    price: product.price,
    quantity: product.quantity,
  };
}
