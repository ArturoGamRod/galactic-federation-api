import Point from "../core/models/Point";
import GetLocation from "../core/useCases/getLocation";

test('should calculate location for scenario 1', () => {

  const sat1 = new Point(-500,-200);
  const sat2 = new Point(100,-100);
  const sat3 = new Point(500,100);

  const getLocationUseCase = new GetLocation(sat1,sat2,sat3);

  const distances = [562.69,532.83,775.39];
  const location:Point | null = getLocationUseCase.getLocation(distances);
  
  expect(location != null && location.x == -248.28 && location.y == 303.26).toBe(true);
});



test('should calculate location for scenario 2', () => {

  const sat1 = new Point(100,0);
  const sat2 = new Point(-100,0);
  const sat3 = new Point(0,-100);

  const getLocationUseCase = new GetLocation(sat1,sat2,sat3);

  const distances = [100,100,100];
  const location:Point | null = getLocationUseCase.getLocation(distances);
  
  expect(location != null && location.x == 0 && location.y == 0).toBe(true);
});