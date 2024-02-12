import { Test, TestingModule } from '@nestjs/testing';
import { LabsController } from './labs.controller';
import { LabsService } from './labs.service';
import { LabsFilterDto } from "./dto/labs-dto";
import { JwtModule } from "@nestjs/jwt";


jest.mock('./labs.service');

const mockLabsService = {
  getLabsAll: jest.fn(),
};

describe('LabsController', () => {
  let controller: LabsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [LabsController],
      providers: [
        {
          provide: LabsService,
          useValue: mockLabsService,
        },
      ],
    }).compile();

    controller = module.get<LabsController>(LabsController);
  });

  it('should return all labs filtered by subject', async () => {
    // Arrange
    const filter: LabsFilterDto = {
      subject: 'Математика',
    };
    const expectedLabs =
      {
        subject: 'Математика'
      }

    mockLabsService.getLabsAll.mockImplementation((filter) => {
      expect(filter).toEqual(expectedLabs);
      return expectedLabs;
    });

    // Act
    const actualLabs = await controller.getAll(filter);

    // Assert
    expect(actualLabs).toEqual(expectedLabs);
  });
});
