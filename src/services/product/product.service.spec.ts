import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());
});
