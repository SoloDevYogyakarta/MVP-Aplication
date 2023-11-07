import { SparepartService } from './sparepart-service';

describe('SparepartService', () => {
  let service: SparepartService;

  beforeEach(() => {
    service = new SparepartService();
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());
});
