import { HistoryService } from './history-service';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    service = new HistoryService();
  });

  it('should to be defined', () => expect(service).toBeDefined());

  it('render correctly', () => expect(service).toMatchSnapshot());
});
